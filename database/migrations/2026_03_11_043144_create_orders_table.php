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
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id')->autoIncrement();
            $table->unsignedBigInteger('request_id')->nullable(); // kolom request_id di orders
            $table->foreign('request_id')->references('request_id')->on('requests')->onDelete('cascade');
            $table->unsignedBigInteger('product_id'); // kolom product_id di orders
            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');
            $table->unsignedBigInteger('user_id'); // kolom user_id di orders
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->enum('status', ['ordered', 'process', 'checking', 'finished'])->default('ordered');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
