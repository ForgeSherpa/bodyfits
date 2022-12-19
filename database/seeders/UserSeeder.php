<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email' => 'agung@mail.com',
            'password' => bcrypt('agung12345'),
            'name' => 'Agung Suragung',
            'role' => User::ROLE_ADMIN,
        ]);
        User::create([
            'email' => 'albet@mail.com',
            'password' => bcrypt('albet12345'),
            'name' => 'Albet Novendo',
            'role' => User::ROLE_USER,
        ]);
    }
}
