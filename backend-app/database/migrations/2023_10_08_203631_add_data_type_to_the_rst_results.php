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
            ALTER TABLE `rst_results` ADD COLUMN `data_type` enum('trusted','untrusted')  NULL DEFAULT 'untrusted'  COMMENT '';
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
        Schema::table('the_rst_results', function (Blueprint $table) {
            //
        });
    }
};
