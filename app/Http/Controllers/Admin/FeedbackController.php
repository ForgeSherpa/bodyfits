<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index(Request $request)
    {
        $feedback = Feedback::orderBy('status')
            ->orderByDesc('id')
            ->groupBy('status', 'id')
            ->paginate($request->per_page ?? 5);

        if ($request->wantsJson()) {
            return $feedback;
        }

        return Inertia::render('Authed/Admin/Feedback', [
            'data' => $feedback
        ]);
    }

    public function detail(Feedback $feedback)
    {
        return Inertia::render('Authed/Admin/Feedback', [
            'singleData' => $feedback
        ]);
    }

    public function closeDetail()
    {
        return to_route('admin.feedback.index');
    }
}
