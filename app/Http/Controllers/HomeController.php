<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Trainers;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $trainers = Trainers::paginate($request->per_page ?? 3);
        $courses = Courses::with('lessons')->limit(4)->inRandomOrder()->get();
        $daysStreak = null;
        $daysMissed = null;

        if (auth()->hasUser()) {
            $user = User::find(auth()->user()->id);
            $lastVisit = Carbon::parse($user->last_course_visit);

            if ($lastVisit->isYesterday() || $lastVisit->isToday()) {
                $now = $user->initial_streak;
                $daysStreak = $lastVisit->diffInDays($now);
            } else {
                $daysMissed = Carbon::now()->diffInDays($user->last_course_visit);
            }
        }


        if ($request->wantsJson()) {
            return $trainers;
        }

        return Inertia::render('Home', compact('trainers', 'courses', 'daysStreak', 'daysMissed'));
    }
}
