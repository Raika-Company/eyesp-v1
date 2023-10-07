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
            CREATE TABLE IF NOT EXISTS `rst_isp_stats` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `isp` VARCHAR(128) NOT NULL,
                `clients` INT NULL,
                `speed_average` FLOAT NULL,
                `download_speed_average` FLOAT NULL,
                `upload_speed_average` FLOAT NULL,
                `packet_loss` FLOAT NULL,
                `ping_average` FLOAT NULL,
                `total_quality_average` FLOAT NULL,
                `disturbance` INT NULL,
                `date` DATETIME NULL,
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
