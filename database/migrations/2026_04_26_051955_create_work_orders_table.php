<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('work_orders', function (Blueprint $table) {
            $table->id('wo_id');
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')
                ->references('order_id') // Nama primary key asli di tabel orders
                ->on('orders')
                ->onDelete('cascade')->unique(); // Pastikan order_id unik di work_orders
            $table->enum('status_pengerjaan', ['none','process', 'finished'])->default('none'); // Contoh status pengerjaan
            $table->string('ukuran')->nullable(); 
            $table->string('bahan')->nullable(); 
            $table->string('finishing')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_orders');
    }
};
