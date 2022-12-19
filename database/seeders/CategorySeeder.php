<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lists = ['Cardio Training', 'Strength Training', 'Yoga Practice', 'Martial Arts Training'];

        foreach ($lists as $list) {
            Categories::create(['name' => $list]);
        }
    }
}
