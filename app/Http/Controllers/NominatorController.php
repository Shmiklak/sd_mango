<?php

namespace App\Http\Controllers;

use App\Models\Beatmap;
use App\Models\NominatorResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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

        if ($response !== null) {
            $response->status = $request->get('status');
            $response->comment = $request->get('comment');
        } else {
            $other_responses = NominatorResponse::where('request_id', $request->get('request_id'))->whereNot('status', 'REJECTED')->count();
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

        return redirect()->back();
    }
}
