<?php

namespace App\Http\Controllers;

use App\Models\Beatmap;
use App\Models\NominatorResponse;
use App\Services\Discord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class NominatorController extends Controller
{
    public function update_response(Request $request) {
        $this->validate($request, [
           'request_id' => 'required',
           'comment' => 'sometimes',
           'status' => 'required'
        ]);

        $nominator_id = auth()->user()->id;

        $response = NominatorResponse::where('nominator_id', $nominator_id)->where('request_id', $request->get('request_id'))->first();

        if ($request->status === 'REMOVE_MY_RESPONSE' && $response !== null) {
            $response->delete();
            $beatmap = Beatmap::find($request->get('request_id'));
            $beatmap->updateStatus();
            return redirect()->back();
        }

        if ($response !== null) {
            $response->status = $request->get('status');
            $response->comment = $request->get('comment');
        } else {
            $other_responses = NominatorResponse::where('request_id', $request->get('request_id'))->whereNotIn('status', ['INVALID', 'UNINTERESTED'])->count();
            if ($other_responses >= 2) {
                throw ValidationException::withMessages([
                    'request_id' => 'This beatmap had already been accepted by 2 nominators. Please ask one of them to either change their decision or select a different beatmap.'
                ]);
            } else {
                $response = new NominatorResponse();
                $response->request_id = $request->get('request_id');
                $response->nominator_id = $nominator_id;
                $response->comment = $request->get('comment');
                $response->status = $request->get('status');
            }
        }
        $response->save();

        $beatmap = Beatmap::find($request->get('request_id'));
        $beatmap->updateStatus();

        Discord::sendMessage($response);
        if ($request->get('status') === 'ACCEPTED') {
            Artisan::call("irc:send '{$beatmap->creator}' 'Hello! I am here to tell you that {$response->nominator->username} has accepted your [https://osu.ppy.sh/beatmapsets/{$beatmap->beatmapset_id} {$beatmap->artist} - {$beatmap->title}] beatmap on [https://sdmango.shmiklak.uz #sd_mango website]. You can contact this nominator for details. Please note, this is an automated message.'" );
        }

        return redirect()->back();
    }

    public function my_responses(Request $request) {

        if (auth()->user()) {
            $query = Beatmap::query()->whereHas('responses', function($q) {
                $q->where('nominator_id', auth()->user()->id);
            });

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

        return Inertia::render('Queue', ['beatmaps' => $beatmaps, 'title' => 'My Responses']);
    }
}
