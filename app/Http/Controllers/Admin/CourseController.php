<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCoursesRequest;
use App\Http\Requests\UpdateCoursesRequest;
use App\Models\Categories;
use App\Models\Courses;
use App\Models\Trainers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

        if ($request->search) {
            $courses = $this->setSearchableModel($model)
                ->addSearch('title', $request->search)
                ->addSearch('description', $request->search)
                ->search('admin.courses.index');
        }

        if ($request->wantsJson()) {
            return $courses;
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
        $photo = $request->photo;
        $data = $request->except('photo');

        if ($photo && trim($photo) !== '') {
            $name = time() . $photo->getClientOriginalName();
            Storage::putFileAs('images/courses', $photo, $name);
            $data['photo'] = $name;
        }

        Courses::create($data);

        return $this->created('admin.courses.index', 'Course');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Courses  $courses
     * @return \Illuminate\Http\Response
     */
    public function show(Courses $courses, Request $request)
    {
        $model = $courses->lessons();
        $lessons = $model->paginate($request->per_page ?? 5);

        if ($request->search) {
            $lessons = $this->setSearchableModel($model)
                ->addSearch('title', $request->search)
<<<<<<< HEAD
                ->search('admin.courses.show');
=======
                ->search("admin.courses.show", ['courses' => $courses->id]);
        }

        if ($request->wantsJson()) {
            return $lessons;
>>>>>>> b6aed13 (lupa anying kalau course make foto)
        }

        return Inertia::render('Authed/Admin/Courses/Detail', [
            'data' => $courses->load(['trainer', 'categories']),
            'lessons' => $lessons,
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
            'course' => $courses->load(['trainer', 'categories']),
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
        $data = $request->except('photo');

        $photo = $request->photo;

        // handle kalau ada foto.
        if ($photo && trim($photo) !== '') {
            $name = time() . $photo->getClientOriginalName();
            Storage::putFileAs('images/profiles', $photo, $name);
            $data['photo'] = $name;
            if ($courses->photo && trim($courses->photo) !== '') {
                Storage::delete('images/courses/' . $courses->photo);
            }
        }

        $courses->update($data);

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
