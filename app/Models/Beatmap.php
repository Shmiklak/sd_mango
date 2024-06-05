<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        $invalid_responses = $this->responses()->where('status',  'REJECTED')->count();
        if ($nominated_responses > 0) {
            $this->status = 'NOMINATED';
        } else if ($accepted_responses > 0) {
            $this->status = 'ACCEPTED';
        } else if ($invalid_responses > 0) {
            $this->status = 'REJECTED';
        } else {
            $this->status = 'PENDING';
        }

        $this->save();
    }

    public function getTotalAcceptedAttribute() {
        return $this->responses()->whereIn('status',  ['ACCEPTED', 'MODDED', 'RECHECKED'])->count();
    }

    public function getTotalNominatedAttribute() {
        return $this->responses()->whereIn('status',  ['NOMINATED'])->count();
    }
}
