<?php

namespace App\oAuth;

use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\ProviderInterface;
use Laravel\Socialite\Two\User;
use Illuminate\Support\Arr;
class OsuProvider extends AbstractProvider implements ProviderInterface {

    const CHAT_READ = 'chat.read'; // Allows read chat messages on a user's behalf.
    const CHAT_WRITE = 'chat.write'; // Allows sending chat messages on a user's behalf.
    const CHAT_WRITE_MANAGE = 'chat.write_manage'; // Allows joining and leaving chat channels on a user's behalf.
    const DELEGATE = 'delegate'; // Allows acting as the owner of a client.
    const FORUM = 'forum.write'; // Allows creating and editing forum posts on a user's behalf.
    const FRIENDS = 'friends.read'; // Allows reading of the user's friend list.
    const IDENTIFY = 'identify'; // Allows reading of the public profile of the user (/me).
    const PUBLIC_DATA = 'public'; // Allows reading of publicly available data on behalf of the user.

    protected $scopes = [
        self::PUBLIC_DATA,
        self::IDENTIFY
    ];

    protected $scopeSeparator = ' ';

    protected function getAuthUrl($state)
    {
        return $this->buildAuthUrlFromBase('https://osu.ppy.sh/oauth/authorize', $state);
    }

    protected function getTokenUrl()
    {
        return 'https://osu.ppy.sh/oauth/token';
    }

    public function getAccessToken($code)
    {
        $response = $this->getHttpClient()->post($this->getTokenUrl(), [
            'headers' => ['Authorization' => 'Basic ' . base64_encode($this->clientId . ':' . $this->clientSecret)],
            'body'    => [
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'code' => $this->getTokenFields($code),
                'grant_type' => 'authorization_code',
                'redirect_uri' => $this->redirectUrl
            ],
        ]);

        return $this->parseAccessToken($response->getBody());
    }

    protected function getTokenFields($code)
    {
        return Arr::add(
            parent::getTokenFields($code), 'grant_type', 'authorization_code'
        );
    }

    protected function getUserByToken($token)
    {
        $response = $this->getHttpClient()->get('https://osu.ppy.sh/api/v2/me', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    protected function formatScopes(array $scopes, $scopeSeparator = ' ')
    {
        return implode($scopeSeparator, $scopes);
    }

    protected function mapUserToObject(array $user)
    {
        return (new User)->setRaw($user)->map([
            'id'       => $user['id'],
            'nickname' => $user['username']
        ]);
    }
}
