<?php

namespace App\Http\Controllers;

use App\Http\Requests\Courses\SearchRequest;
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

    private function findNextLesson($currentId, $num = 0)
    {
        if ($num >= Courses::count()) {
            return false;
        }

        $searchId = $currentId + 1;
        $query = Courses::has('lessons')->with('lessons')->find($searchId);

        if (! $query) {
            $this->findNextLesson($searchId, $num + 1);
        }

        return $query;
    }

    private function parseDurationType($duration)
    {
        if ($duration >= 3600) {
            $hours = floor($duration / 3600);
            $minutes = floor(($duration % 3600) / 60);
            $formattedLength = sprintf('%dh %dm', $hours, $minutes);
        } elseif ($duration >= 60) {
            $minutes = floor($duration / 60);
            $seconds = $duration % 60;
            $formattedLength = sprintf('%dm %ds', $minutes, $seconds);
        } else {
            $formattedLength = sprintf('%ds', $duration);
        }

        return $formattedLength;
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

        $totalDuration = $course->lessons->map(function ($item) {
            $length = parseInt($item->length);

            if (str_contains($item->length, 'minute')) {
                return $length * 60;
            }

            if (str_contains($item->length, 'hour')) {
                return $length * 3600;
            }

            return $length;
        })->reduce(fn ($first, $second) => $first + $second, 0);

        $totalDuration = $this->parseDurationType($totalDuration);

        $next = $this->findNextLesson($course->id);

        return Inertia::render('Authed/Courses/Detail', [
            'course' => $course,
            'randomCourses' => Courses::has('lessons')->with('lessons')->limit(4)->inRandomOrder()->get(),
            'lesson' => $lessons,
            'nextCourseId' => $next->id ?? false,
            'nextLessonId' => $next ? $next->lessons->first()->id : false,
            'totalDuration' => $totalDuration,
        ]);
    }

    private function lessonSearch(SearchRequest $searchRequest)
    {
        return Courses::with(['lessons' => fn ($q) => $q->where('title', 'LIKE', "%{$searchRequest->search}%")])
            ->where('id', $searchRequest->course_id)
            ->get()
            ->filter(fn ($item) => count($item->lessons->toArray()) > 0)
            ->map(fn ($item) => $item->lessons)
            ->values()
            ->flatten();
    }

    public function search(SearchRequest $request)
    {
        if (isset($request->type) && $request->type === 'lesson') {
            return $this->lessonSearch($request);
        }

        $courses = Courses::has('lessons')->with('lessons')->where('title', 'LIKE', "%{$request->search}%")->limit(20)->get();

        return $courses;
    }
}
