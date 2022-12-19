<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Traits\ToastTrait;
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

    private function parseLength(LessonsRequest $request): string
    {
        $plural = $request->isPlural ? "s" : "";
        return $request->length . " {$request->duration}{$plural}";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\LessonsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LessonsRequest $request)
    {
        $data = $request->validated();

        $data['length'] = $this->parseLength($request);
        Lessons::create($data);

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
            'data' => $lessons->load('course'),
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
        $data = $lessons->load('course')->toArray();
        $data['isPlural'] = str_ends_with($data['length'], 's');
        $data['duration'] = strtolower(explode(' ', $data['length'])[1]);
        $data['duration'] = $data['isPlural'] ? substr($data['duration'], 0, -1) : $data['duration'];
        $data['length'] = parseInt($data['length']);

        return Inertia::render('Authed/Admin/Lessons/Form', [
            'lesson' => $data,
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
        $data = $request->validated();
        $data['length'] = $this->parseLength($request);

        $lessons->update($data);

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
        if (!$request->from) {
            return response()->json(['check' => false], 400);
        }

        $find = Courses::where('id', $request->from)->first();

        if (!$find) {
            return response()->json(['check' => false], 404);
        }

        return response()->json(['check' => true]);
    }
}
