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
            CREATE TABLE IF NOT EXISTS `rst_feedback` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `cid` VARCHAR(128) NULL,
                `isp` VARCHAR(128) NULL,
                `score` INT NULL,
                `created_at` DATETIME NULL,
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
        //
    }
};
