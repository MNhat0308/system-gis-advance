<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('buses', function (Blueprint $table) {
            $table->id();
            $table->string('plate_number')->unique();
            $table->integer('capacity')->default(50);
            $table->string('model')->nullable();
            $table->enum('status', ['active', 'maintenance', 'inactive'])->default('active');
            $table->geometry('current_location')->nullable(); // optional live GPS
            $table->foreignId('assigned_route_id')->nullable()->constrained('routes')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('buses');
    }
};
