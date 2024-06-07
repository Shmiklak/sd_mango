<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\IRCService;

class IRCServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(IRCService::class, function ($app) {
            $config = $app['config']['irc'];
            return new IRCService(
                $config['server'],
                $config['port'],
                $config['nickname'],
                $config['password']
            );
        });
    }

    public function boot()
    {
        //
    }
}
