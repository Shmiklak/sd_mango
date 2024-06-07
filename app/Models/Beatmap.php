<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;

class Beatmap extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_author', 'comment', 'beatmapset_id',
        'title', 'artist', 'creator', 'cover', 'genre', 'language', 'bpm', 'map_style'
    ];

    protected $appends = [
        'total_accepted',
        'total_nominated'
    ];

    public function author() {
        return $this->belongsTo(User::class, 'request_author');
    }

    public function responses() {
        return $this->hasMany(NominatorResponse::class, 'request_id');
    }

    public function updateStatus() {
        $nominated_responses = $this->responses()->where('status', 'NOMINATED')->count();
        $accepted_responses = $this->responses()->whereIn('status',  ['ACCEPTED', 'MODDED', 'RECHECKED'])->count();
        $invalid_responses = $this->responses()->where('status',  'INVALID')->count();
        $uninterested_responses = $this->responses()->where('status',  'UNINTERESTED')->count();
        if ($nominated_responses > 0) {
            $this->status = 'NOMINATED';
        } else if ($accepted_responses > 0) {
            $this->status = 'ACCEPTED';
        } else if ($invalid_responses >= 2) {
            $this->status = 'INVALID';
        } else if ($uninterested_responses >= 8) {
            $this->status = 'HIDDEN';
        } else {
            $this->status = 'PENDING';
        }
        $this->save();
        $this->sendMessage();
    }

    public function sendMessage() {
        switch ($this->status) {
            case 'INVALID':
                Artisan::call("irc:send '{$this->author->username}' 'Hello! Unfortunately your request for [https://osu.ppy.sh/beatmapsets/{$this->beatmapset_id} {$this->artist} - {$this->title}] on [https://sdmango.shmiklak.uz #sd_mango website] has been marked as invalid. You can view your request\'s [https://sdmango.shmiklak.uz/queue/request/{$this->id} page] to see more details. Please note, this is an automated message.'" );
                break;
            case 'HIDDEN':
                Artisan::call("irc:send '{$this->author->username}' 'Hello! Unfortunately the majority of #sd_mango members are not interested in the beatmap you requested ([https://osu.ppy.sh/beatmapsets/{$this->beatmapset_id} {$this->artist} - {$this->title}]). You can view your request\'s [https://sdmango.shmiklak.uz/queue/request/{$this->id} page] to see more details. Please note, this is an automated message.'" );
                break;
        }
    }

    public function getTotalAcceptedAttribute() {
        return $this->responses()->whereIn('status',  ['ACCEPTED', 'MODDED', 'RECHECKED'])->count();
    }

    public function getTotalNominatedAttribute() {
        return $this->responses()->whereIn('status',  ['NOMINATED'])->count();
    }
}
