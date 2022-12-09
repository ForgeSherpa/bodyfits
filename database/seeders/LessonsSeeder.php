<?php

namespace Database\Seeders;

use App\Models\Lessons;
use Illuminate\Database\Seeder;

class LessonsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Lessons::factory(100)->create();
    }
}
