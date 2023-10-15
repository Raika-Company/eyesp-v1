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
            CREATE TABLE IF NOT EXISTS `rst_thresholds` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `isp` VARCHAR(128) NULL,
                `download` FLOAT NULL,
                `upload` FLOAT NULL,
                `speed_avg` FLOAT NULL,
                `ping` FLOAT NULL,
                `packet_loss` FLOAT NULL,
                `total_quality` FLOAT NULL,
                `created_at` DATETIME NULL,
                PRIMARY KEY (`id`))
            ENGINE = InnoDB
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
