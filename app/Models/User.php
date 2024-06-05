<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'osu_id',
        'username',
        'osu_token',
        'osu_refresh_token'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
    ];

    public function requests() {
        return $this->hasMany(Beatmap::class, 'request_author');
    }

    public function responses() {
        return $this->hasMany(NominatorResponse::class, 'nominator_id');
    }

    public function hasElevatedAccess() {
        return $this->elevated_access;
    }

    public function hasAdminAccess() {
        return $this->admin_access;
    }
}
