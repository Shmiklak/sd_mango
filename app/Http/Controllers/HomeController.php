<?php

namespace App\Http\Controllers;

use App\Models\Beatmap;
use App\Models\Member;
use App\Models\User;
use App\Services\OsuApi;
use Carbon\Carbon;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Render home page
     * @return \Inertia\Response
     */
    public function index() {
        return Inertia::render('Home');
    }

    /**
     * Render team page
     * @return \Inertia\Response
     */
    public function team() {
        $members = Member::orderBy('username', 'asc')->get();
        return Inertia::render('Team', ['members' => $members]);
    }

    /**
     * Render queue page
     * @return \Inertia\Response
     */
    public function queue(Request $request) {

        $query = Beatmap::query();

        if (auth()->user()) {
            if ($request->has('map_style') && $request->get('map_style') !== 'all') {
                $query = $query->where('map_style', $request->get('map_style'));
            }
            if ($request->has('status') && $request->get('status') !== 'default') {
                $query = $query->where('status', $request->get('status'));
            } else {
                $query = $query->whereNotIn('status', ['INVALID', 'HIDDEN'])->whereDoesntHave('responses', function($q) {
                    $q->where('nominator_id', auth()->user()->id)->where('status', 'UNINTERESTED');
                });
            }
            $beatmaps = $query->orderBy('id', 'desc')->paginate(12)->withQueryString();
        } else {
            $beatmaps = [];
        }

        return Inertia::render('Queue', ['beatmaps' => $beatmaps, 'title' => 'Queue']);
    }

    /**
     * Render queue page with user requests only
     * @return \Inertia\Response
     */

    public function my_requests(Request $request) {

        if (auth()->user()) {
            $query = Beatmap::query()->where('request_author', auth()->user()->id);

            if ($request->has('map_style') && $request->get('map_style') !== 'all') {
                $query = $query->where('map_style', $request->get('map_style'));
            }
            if ($request->has('status') && $request->get('status') !== 'default') {
                $query = $query->where('status', $request->get('status'));
            } else {
                $query = $query->whereNotIn('status', ['INVALID', 'HIDDEN']);
            }

            $beatmaps = $query->orderBy('id', 'desc')->paginate(12)->withQueryString();
        } else {
            $beatmaps = null;
        }

        return Inertia::render('Queue', ['beatmaps' => $beatmaps, 'title' => 'My Requests']);
    }

    /**
     * Render request form
     * @return \Inertia\Response
     */
    public function send_request() {
        return Inertia::render('SendRequest');
    }

    public function send_request_post(Request $request) {
        $this->validate($request, [
            'beatmap_link' => 'required|url',
            'comments' => 'sometimes',
            'map_style' => 'required'
        ]);

        if (auth()->user()->isRestricted()) {
            throw ValidationException::withMessages([
                'beatmap_link' => 'Your profile has been banned from using this website.'
            ]);
        }

        $request_timer = Carbon::now()->subHours(24);

        $previous_request = Beatmap::where('request_author', auth()->user()->id)->where('created_at', '>=', $request_timer)->first();

        if ($previous_request !== null) {
            throw ValidationException::withMessages([
                'beatmap_link' => 'You cannot submit more than one beatmap per day. Please try again later.'
            ]);
        }

        $parsed_url = parse_url($request->get('beatmap_link'));
        $beatmap_id = explode('/', $parsed_url['path'])[2];

        if (Beatmap::where('beatmapset_id', $beatmap_id)->exists()) {
            throw ValidationException::withMessages([
                'beatmap_link' => 'This beatmap has already been requested before. If you believe this is an error please contact Shmiklak.'
            ]);
        }

        try {
            $beatmap_data = (new OsuApi())->getBeatmapset($beatmap_id);
        } catch (ClientException $exception) {
            throw ValidationException::withMessages([
                'beatmap_link' => 'Could not find the beatmap. If you believe this is an error please contact Shmiklak.'
            ]);
        }

        $beatmap = Beatmap::create([
            'request_author' => auth()->user()->id,
            'comment' => $request->get('comments'),
            'map_style' => $request->get('map_style'),
            'beatmapset_id' => $beatmap_id,
            'title' => $beatmap_data["title"],
            'artist' => $beatmap_data["artist"],
            'creator' => $beatmap_data["creator"],
            'cover' => $beatmap_data["covers"]["card"],
            'genre' => $beatmap_data["genre"]["name"],
            'language' => $beatmap_data["language"]["name"],
            'bpm' => $beatmap_data['bpm']
        ]);

        return redirect()->route('queue')->with(['success' => true]);
    }

    public function queue_request($id) {
        $beatmap = Beatmap::with('responses')->with('responses.nominator')->with('author')->findOrFail($id);
        $nominators = User::where('elevated_access', 1)->get(['id', 'username']);
        return Inertia::render('QueueRequest', ['beatmap' => $beatmap, 'nominators' => $nominators]);
    }
}
