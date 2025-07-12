<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('route_variants', function (Blueprint $table) {
            $table->geometry('path_line')->nullable(); // geometry(MultiLineString)
        });
    }

    public function down(): void
    {
        Schema::table('route_variants', function (Blueprint $table) {
            $table->dropColumn('path_line');
        });
    }
};
