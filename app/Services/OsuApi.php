<?php

namespace App\Services;

use GuzzleHttp\Client as GClient;
use Illuminate\Support\Facades\Session;

class OsuApi {
    private $baseUrl;
    private $client;
    public function __construct() {
        $this->baseUrl = "https://osu.ppy.sh/api/v2/";
        $this->client = new GClient();
    }

    private function get($url, $data = []) {
        $headers = [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . Session::get('osu_access_token'),
            'Accept-Language' => 'en'
        ];

        $res = $this->client->request('GET', $this->baseUrl. $url, [
            'headers' => $headers
        ]);

        $response = json_decode($res->getBody()->getContents(), true);

        return $response;
    }

    private function delete($url, $data = []) {
        $headers = [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . Session::get('osu_access_token'),
            'Accept-Language' => 'en'
        ];

        $res = $this->client->request('DELETE', $this->baseUrl . $url, [
            'headers' => $headers
        ]);

        $response = json_decode($res->getBody()->getContents());

        return $response;
    }

    public function revokeToken() {
        $this->delete('oauth/tokens/current');
    }

    public function getBeatmapset($beatmapset_id) {
        return $this->get('beatmapsets/'.$beatmapset_id);
    }
}
