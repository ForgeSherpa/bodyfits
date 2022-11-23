<?php

namespace Database\Seeders;

use App\Models\Courses;
use App\Models\Trainers;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Courses::factory(20)->has(Trainers::factory(), 'lessons')->create();
    }
}
