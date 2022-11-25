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
        return $this->hasOne(Trainers::class, 'trainer_id');
    }

    public function lessons()
    {
        return $this->belongsTo(Lessons::class, 'course_id');
    }

    public function categories()
    {
        return $this->hasOne(Categories::class, 'category_id');
    }
}
