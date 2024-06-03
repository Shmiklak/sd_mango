<?php

namespace App\Providers;

use App\oAuth\OsuProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->bootOsuSocialite();
    }

    private function bootOsuSocialite() {
        $socialite = $this->app->make('Laravel\Socialite\Contracts\Factory');
        $socialite->extend('osu', function($app) use ($socialite) {
            $config = $app['config']['services.osu'];
            return $socialite->buildProvider(OsuProvider::class, $config);
        });
    }
}
