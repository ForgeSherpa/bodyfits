<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainers extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function courses()
    {
        return $this->hasMany(Courses::class, 'trainer_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'trainer_user', 'user_id', 'trainer_id');
    }

    protected function photo(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? "trainers/{$value}" : "trainers/default.png"
        );
    }
}
