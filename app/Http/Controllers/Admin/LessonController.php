<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LessonsRequest;
use App\Models\Courses;
use App\Models\Lessons;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    use ToastTrait;

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Authed/Admin/Lessons/Form');
    }

    private function redirectBack($request)
    {
        if ($request->from) {
            return to_route('admin.courses.show', $request->from);
        }

        $this->cast('Previous Course Not Found. Redirecting to List.', 'error');

        return to_route('admin.courses.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\LessonsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LessonsRequest $request)
    {
        Lessons::create($request->validated());

        $this->cast('Lesson Created!', 'success');

        return $this->redirectBack($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lessons  $lessons
     * @return \Illuminate\Http\Response
     */
    public function show(Lessons $lessons)
    {
        return Inertia::render('Authed/Admin/Lessons/Detail', [
            'data' => $lessons->with('course'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Lessons  $lessons
     * @return \Illuminate\Http\Response
     */
    public function edit(Lessons $lessons)
    {
        return Inertia::render('Authed/Admin/Lessons/Form', [
            'lesson' => $lessons->with('course'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\LessonsRequest  $request
     * @param  \App\Models\Lessons  $lessons
     * @return \Illuminate\Http\Response
     */
    public function update(LessonsRequest $request, Lessons $lessons)
    {
        $lessons->update($request->validated());

        $this->cast('Lesson updated', 'success');

        return $this->redirectBack($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lessons  $lessons
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lessons $lessons)
    {
        $lessons->delete();

        $this->deleted('Lesson');
    }

    public function check(Request $request)
    {
        if (! $request->from) {
            return response()->json(['check' => false], 400);
        }

        $find = Courses::where('id', $request->from)->first();

        if (! $find) {
            return response()->json(['check' => false], 404);
        }

        return response()->json(['check' => true]);
    }
}
