<?php

namespace App\Http\Controllers;

use App\Models\Courses;
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
        $courses = Courses::with(['trainer', 'categories'])->paginate($request->per_page ?? 3);

        if ($request->wantsJson()) {
            return $courses;
        }

        return Inertia::render('Authed/Courses/Courses', [
            'courses' => $courses
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function show(Courses $courses)
    {
        $course = $courses->with(['trainer', 'lessons'])->first();

        return Inertia::render('Authed/Courses/Detail', [
            'course' => $course
        ]);
    }

    public function search(Request $request)
    {
        $request->validate(['search' => 'required']);

        $courses = Courses::with(['trainer', 'categories'])->where('title', 'LIKE', "%{$request->search}%")->get();

        return $courses;
    }
}
