<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NominatorResponse extends Model
{
    use HasFactory;

    protected $fillable = [
      'nominator_id',
      'request_id',
      'comment',
      'status'
    ];

    public function nominator() {
        return $this->belongsTo(User::class, 'nominator_id');
    }

    public function request() {
        return $this->belongsTo(Beatmap::class, 'request_id');
    }
}
