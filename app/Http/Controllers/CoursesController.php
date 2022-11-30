<?php

namespace App\Http\Controllers;

use App\Models\Categories;
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
    public function show(Courses $courses)
    {
        return Inertia::render('Authed/Courses/Detail', [
            'course' => $courses->load('trainer', 'lessons')
        ]);
    }

    public function search(Request $request)
    {
        $courses = Courses::where('title', 'LIKE', "%{$request->search}%")->limit(20)->get();

        return $courses;
    }
}
