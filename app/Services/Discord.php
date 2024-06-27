<?php

namespace App\Services;

use Atakde\DiscordWebhook\DiscordWebhook;
use Atakde\DiscordWebhook\Message\MessageFactory;

class Discord {
    public static function sendMessage($response) {
        if (!env('APP_DEBUG')) {
            $messageFactory = new MessageFactory();
            $embedMessage = $messageFactory->create('embed');
            $embedMessage->setTitle($response->request->artist . " - " . $response->request->title . " (mapped by " . $response->request->creator . ")");
            $embedMessage->setDescription($response->nominator->username . " has marked this beatmap as " . $response->status);
            $embedMessage->setUrl("https://osu.ppy.sh/beatmapsets/" . $response->request->beatmapset_id);
            $embedMessage->setColor($response->matchingColor());
            $embedMessage->setThumbnailUrl("https://assets.ppy.sh/beatmaps/" . $response->request->beatmapset_id . "/covers/list.jpg");
            $embedMessage->setAuthorName($response->nominator->username);
            $embedMessage->setAuthorUrl("https://osu.ppy.sh/users/" . $response->nominator->osu_id);
            $embedMessage->setAuthorIcon("https://a.ppy.sh/" . $response->nominator->osu_id);


            $webhook = new DiscordWebhook($embedMessage);
            $webhook->setWebhookUrl(env("DISCORD_WEBHOOK"));
            $webhook->send();
        }
    }
}
