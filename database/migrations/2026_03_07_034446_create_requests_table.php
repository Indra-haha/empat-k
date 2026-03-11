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
        Schema::create('requests', function (Blueprint $table) {
            $table->id('request_id')->autoIncrement(); // kolom request_id sebagai primary key
            $table->unsignedBigInteger('user_id'); // kolom user_id di requests
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('product_id'); // kolom product_id di requests
            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->string('upload_img')->nullable();
            $table->enum('status', ['requested', 'process', 'finished'])->default('requested');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
