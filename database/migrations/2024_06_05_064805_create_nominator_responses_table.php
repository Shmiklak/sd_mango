<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nominator_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('nominator_id')->index();
            $table->foreignId('request_id')->index();
            $table->text('comment')->nullable();
            $table->enum('status', [
                'ACCEPTED',
                'MODDED',
                'RECHECKED',
                'NOMINATED',
                'INVALID',
                'UNINTERESTED'
            ])->default('ACCEPTED');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nominator_responses');
    }
};
