<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function trainer()
    {
        return $this->hasOne(Trainers::class, 'id', 'trainer_id');
    }

    public function lessons()
    {
        return $this->hasMany(Lessons::class, 'course_id', 'id');
    }

    public function categories()
    {
        return $this->hasOne(Categories::class, 'id', 'category_id');
    }
}
