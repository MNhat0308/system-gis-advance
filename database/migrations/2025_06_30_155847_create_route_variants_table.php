<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('route_variants', function (Blueprint $table) {
            $table->id();
            $table->string('route_id');
            $table->boolean('is_outbound');
            $table->string('name');
            $table->float('distance');
            $table->string('start_stop');
            $table->string('end_stop');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('route_variants');
    }
};
