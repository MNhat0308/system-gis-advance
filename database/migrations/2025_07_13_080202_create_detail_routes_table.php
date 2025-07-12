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
        Schema::create('detail_routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id');
            $table->text('inbound_desc')->nullable();
            $table->text('outbound_desc')->nullable();
            $table->integer('num_of_seats')->nullable();
            $table->text('org')->nullable();
            $table->integer('distance')->nullable();
            $table->integer('time_of_trip')->nullable();
            $table->text('operation_time')->nullable();
            $table->text('total_trip')->nullable();
            $table->text('tickets')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_routes');
    }
};
