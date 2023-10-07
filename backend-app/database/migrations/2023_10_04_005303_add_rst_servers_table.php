<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sql = "
            CREATE TABLE IF NOT EXISTS `rst_servers` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `name` VARCHAR(128) NOT NULL,
                `location` VARCHAR(45) NOT NULL,
                `url` VARCHAR(256) NOT NULL,
                PRIMARY KEY (`id`))
            ENGINE = InnoDB;
        ";
        DB::connection()
            ->getPdo()
            ->exec($sql);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rst_servers');
    }
};
