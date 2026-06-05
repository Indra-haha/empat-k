<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::statement("ALTER TABLE work_orders MODIFY COLUMN status_pengerjaan ENUM('none', 'process', 'finished', 'rejected') DEFAULT 'none'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE work_orders MODIFY COLUMN status_pengerjaan ENUM('none', 'process', 'finished') DEFAULT 'none'");
    }
};