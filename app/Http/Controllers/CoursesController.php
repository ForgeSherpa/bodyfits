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
        $category = Categories::with('courses')->paginate($request->per_page ?? 5);

        if ($request->wantsJson()) {
            return $category;
        }

        return Inertia::render('Authed/Courses/Courses', [
            'courses' => $category
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function show(Courses $courses, Lessons $lessons)
    {
        return Inertia::render('Authed/Courses/Detail', [
            'course' => $courses->load('trainer', 'lessons'),
            'randomCourses' => Courses::limit(4)->inRandomOrder()->get(),
            'lesson' => $lessons,
            'nextCourseId' => Courses::find($courses->id + 1)->exists() ? $courses->id + 1 : null
        ]);
    }

    public function search(Request $request)
    {
        if (isset($request->type) && $request->type === "lesson") {
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
