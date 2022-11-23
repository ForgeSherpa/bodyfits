<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'trainer_id', 'ranting_id'];

    public function trainer()
    {
        return $this->hasOne(Trainers::class, 'trainer_id');
    }

    public function lessons()
    {
        return $this->belongsTo(Lessons::class, 'course_id');
    }
}
