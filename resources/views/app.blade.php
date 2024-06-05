<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#EA564B">

        <meta name="description" content="#sd_mango is a team of Beatmap Nominators united to promote the beatmaps YOU like. sd_mango's goal is to reconnect the playerbase with the ranked section once again by promoting a variety of simple jump or stream maps, including highly difficult mechanics focused maps designed for top players to push their limits."/>
        <meta name="keywords" content="osu, sd_mango, beatmap nominators, bn, modding, mapping, osu queue, osumod, osu beatmaps, osu!, dean peppy herbert, sotarks, log off now"/>
        <meta property="og:title" content="#sd_mango" />
        <meta property="og:site_name" content="#sd_mango" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ request()->url() }}" />
        <meta property="og:image" content="{{ asset('static/assets/images/banner.png') }}" />
        <meta property="og:image:alt" content="{{ asset('static/assets/images/banner.png') }}" />
        <meta property="og:description" content="#sd_mango is a team of Beatmap Nominators united to promote the beatmaps YOU like. sd_mango's goal is to reconnect the playerbase with the ranked section once again by promoting a variety of simple jump or stream maps, including highly difficult mechanics focused maps designed for top players to push their limits." />
        <meta http-equiv="content-language" content="EN">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
