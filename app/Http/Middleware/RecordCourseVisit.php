<?php

namespace App\Http\Middleware;

use App\Models\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;

class RecordCourseVisit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = User::find(auth()->user()->id);

        $lastStreak = Carbon::parse($user->last_course_visit);

        if (! $user->initial_streak) {
            $user->update(['initial_streak' => Carbon::now()->toDate(), 'last_course_visit' => Carbon::now()->toDate()]);
        } elseif (! ($lastStreak->isYesterday() || $lastStreak->isToday())) {
            $user->update(['last_course_visit' => Carbon::now()->toDate(), 'initial_streak' => Carbon::now()->toDate()]);
        } else {
            $user->update(['last_course_visit' => Carbon::now()->toDate()]);
        }

        return $next($request);
    }
}
