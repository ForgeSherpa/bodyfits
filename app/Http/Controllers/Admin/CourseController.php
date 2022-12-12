<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCoursesRequest;
use App\Http\Requests\UpdateCoursesRequest;
use App\Models\Categories;
use App\Models\Courses;
use App\Models\Trainers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    use SearchableModel, ToastTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $model = Courses::with(['trainer', 'categories'])->orderByDesc('id');

        $courses = $model->paginate($request->per_page ?? 5);

        if ($request->wantsJson()) {
            return $courses;
        }

        if ($request->search) {
            $courses = $this->setSearchableModel($model)
                ->addSearch('title', $request->search)
                ->addSearch('description', $request->search)
                ->search();
        }

        return Inertia::render('Authed/Admin/Courses/Courses', [
            'data' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Authed/Admin/Courses/Form', [
            'trainers' => Trainers::all(),
            'categories' => Categories::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCoursesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCoursesRequest $request)
    {
        Courses::create($request->validated());

        return $this->created('admin.courses.index', 'Course');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function show(Courses $courses)
    {
        return Inertia::render('Authed/Admin/Courses/Detail', [
            'data' => $courses->load(['lessons', 'trainer', 'categories']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function edit(Courses $courses)
    {
        return Inertia::render('Authed/Admin/Courses/Form', [
            'course' => $courses,
            'trainers' => Trainers::all(),
            'categories' => Categories::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCoursesRequest  $request
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCoursesRequest $request, Courses $courses)
    {
        $courses->update($request->validated());

        return $this->edited('admin.courses.index', 'Course');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function destroy(Courses $courses)
    {
        if ($courses->loadCount('lessons')->lessons_count > 0) {
            $courses->lessons()->delete(); // delete semua course nya dulu
        }

        $courses->delete();

        $this->deleted('Course');
    }
}
