<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beatmap extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_author', 'comment', 'beatmapset_id',
        'title', 'artist', 'creator', 'cover', 'genre', 'language', 'bpm'
    ];
}
