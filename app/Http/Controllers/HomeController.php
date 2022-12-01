<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Trainers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $trainers = Trainers::paginate($request->per_page ?? 3);
        $courses = Courses::limit(4)->inRandomOrder()->get();

        if ($request->wantsJson()) {
            return $trainers;
        }

        return Inertia::render('Home', compact('trainers', 'courses'));
    }
}
