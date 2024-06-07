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

    public function matchingColor() {
        switch ($this->status) {
            case "ACCEPTED":
                return 0x00ff00;
            case "INVALID":
                return 0xA80A0A;
            case "MODDED":
                return 0x10D4E6;
            case "RECHECKED":
                return 0xE21FCF;
            case "NOMINATED":
                return 0x8C1FE2;
            case "UNINTERESTED":
                return 0xA0A0A0;
        }
    }
}
