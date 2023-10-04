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
            CREATE TABLE IF NOT EXISTS `rst_results` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `cid` VARCHAR(128) NOT NULL,
                `uuid` VARCHAR(128) NOT NULL,
                `date` DATE NOT NULL,
                `time` TIME NOT NULL,
                `duration` TIME NULL,
                `type` ENUM('multi', 'single') NOT NULL DEFAULT 'multi',
                `servers` JSON NULL,
                `ip` VARCHAR(15) NOT NULL,
                `isp` VARCHAR(128) NULL,
                `country` VARCHAR(2) NULL,
                `city` VARCHAR(45) NULL,
                `lat` VARCHAR(45) NULL,
                `lon` VARCHAR(45) NULL,
                `ping` FLOAT NULL,
                `download` FLOAT NULL,
                `upload` FLOAT NULL,
                `jitter` FLOAT NULL,
                PRIMARY KEY (`id`),
                UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE)
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
        Schema::dropIfExists('rst_results');
    }
};
