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
            $table->integer('request_author')->index();
            $table->text('comment')->nullable();
            $table->integer('beatmapset_id')->unique()->index();
            $table->string('title');
            $table->string('artist');
            $table->string('creator');
            $table->string('cover')->nullable();
            $table->string('genre')->nullable();
            $table->string('language')->nullable();
            $table->float('bpm')->nullable();
            $table->enum('status', [
                'NEW',
                'REJECTED',
                'ACCEPTED',
                'NOMINATED',
                'RANKED'
            ])->default('NEW');
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
