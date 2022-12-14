<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Notes;
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

    public function addNotes(Request $request)
    {
        $request->validate(['note' => ['required', 'string'], 'date' => ['required', 'date']]);

        Notes::create(['note' => $request->note, 'user_id' => auth()->user()->id, 'date' => $request->date]);
    }

    public function editNote(Request $request)
    {
        $validated = $request->validate(['note' => ['required', 'string'], 'date' => ['required', 'date']]);
        $notes = Notes::where('user_id', auth()->user()->id)->whereDate('date', $request->date);
        $notes->update($validated);
    }

    public function deleteNote(Request $request)
    {
        $request->validate(['date' => ['required', 'date']]);
        $notes = Notes::where('user_id', auth()->user()->id)->whereDate('date', $request->date);
        $notes->delete();
    }

    public function findNotes(Request $request)
    {
        $note = Notes::where('user_id', auth()->user()->id)->whereDate('date', $request->date)->first();

        if ($request->wantsJson()) {
            if (!$note) {
                return response()->json(['message' => 'Data not found', 'status' => 404], 404);
            };

            return $note;
        }
    }

    public function viewNotes(Request $request)
    {
        if ($request->wantsJson()) {
            return Notes::where('user_id', auth()->user()->id)->get();
        }
    }
}
