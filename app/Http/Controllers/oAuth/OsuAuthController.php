<?php

namespace App\Http\Controllers\oAuth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\OsuApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use Mockery\Exception;

class OsuAuthController extends Controller
{
    public function redirectToProvider()
    {
        return Socialite::driver('osu')->redirect();
    }

    public function handleProviderCallback()
    {
        try {
            $osu_user = Socialite::driver('osu')->user();
            $user = User::where('osu_id', $osu_user->getId())->first();

            if ($user) {
                $user->username = $osu_user->getNickname();
                $user->save();
                Session::put('osu_access_token', $osu_user->token);
                Session::put('osu_refresh_token', $osu_user->osu_refresh_token);
                Auth::login($user);
                return redirect('/');
            } else {
                $new_user = User::create([
                    'osu_id' => $osu_user->getId(),
                    'username' =>  $osu_user->getNickname(),
                ]);
                Session::put('osu_access_token', $osu_user->token);
                Session::put('osu_refresh_token', $osu_user->osu_refresh_token);
                Auth::login($new_user);
                return redirect('/');
            }
        }
        catch (InvalidStateException $exception) {
            dd('osu! threw an error. Please try again or contact Shmiklak for help');
        }
    }

    public function handleLogout() {
        (new OsuApi())->revokeToken();
        Auth::logout();
        Session::forget('osu_access_token');
        Session::forget('osu_refresh_token');
        return redirect('/');
    }
}
