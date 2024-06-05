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
        Schema::create('beatmaps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_author')->index();
            $table->text('comment')->nullable();
            $table->foreignId('beatmapset_id')->index();
            $table->string('title');
            $table->string('artist');
            $table->string('creator');
            $table->string('cover')->nullable();
            $table->string('genre')->nullable();
            $table->string('language')->nullable();
            $table->float('bpm')->nullable();
            $table->enum('status', [
                'PENDING',
                'INVALID',
                'ACCEPTED',
                'NOMINATED'
            ])->default('PENDING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beatmaps');
    }
};
