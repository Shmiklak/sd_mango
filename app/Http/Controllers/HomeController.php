<?php

namespace App\Http\Controllers;

use App\Models\Beatmap;
use App\Models\Member;
use App\Services\OsuApi;
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
        $members = Member::all();
        return Inertia::render('Team', ['members' => $members]);
    }

    /**
     * Render queue page
     * @return \Inertia\Response
     */
    public function queue() {
        $beatmaps = Beatmap::orderBy('id', 'desc')->paginate(12);
        return Inertia::render('Queue', ['beatmaps' => $beatmaps]);
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
            'comments' => 'sometimes'
        ]);

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
}
