<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Courses;
use App\Models\Lessons;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $category = Categories::with(['courses' => fn ($q) => $q->with('lessons')->whereHas('lessons')])->paginate($request->per_page ?? 5);

        if ($request->wantsJson()) {
            return $category;
        }

        return Inertia::render('Authed/Courses/Courses', [
            'courses' => $category,
        ]);
    }

    private function parseInt($string)
    {
        return preg_replace('/[^0-9]/', '', $string);
    }

    private function findNextLesson($currentId)
    {
        $searchId = $currentId + 1;
        $query = Courses::with('lessons')->whereHas('lessons')->find($searchId);
        if (! $query) {
            return $this->findNextLesson($searchId + 1);
        }

        return $query;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function show(Courses $courses, Lessons $lessons)
    {
        $course = $courses->load('trainer', 'lessons');

        $totalDuration = $course->lessons->map(fn ($item) => $this->parseInt($item->length))->reduce(function ($first, $second) {
            return $first + $second;
        }, 0);

        $next = $this->findNextLesson($course->id);

        return Inertia::render('Authed/Courses/Detail', [
            'course' => $course,
            'randomCourses' => Courses::with('lessons')->limit(4)->inRandomOrder()->get(),
            'lesson' => $lessons,
            'nextCourseId' => $next->id,
            'nextLessonId' => $next->lessons->first()->id,
            'totalDuration' => $totalDuration.'m',
        ]);
    }

    public function search(Request $request)
    {
        if (isset($request->type) && $request->type === 'lesson') {
            $request->validate(['course_id' => 'required|exists:courses,id']);

            return Courses::with(['lessons' => fn ($q) => $q->where('title', 'LIKE', "%{$request->search}%")])
                ->where('id', $request->course_id)
                ->get()
                ->filter(fn ($item) => count($item->lessons->toArray()) > 0)
                ->map(fn ($item) => $item->lessons)
                ->values()
                ->flatten();
        }

        $courses = Courses::where('title', 'LIKE', "%{$request->search}%")->limit(20)->get();

        return $courses;
    }
}
