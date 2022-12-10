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

        return Inertia::render('Authed/Admin/Feedback/Feedback', [
            'data' => $feedback,
        ]);
    }

    public function markAsRead(Feedback $feedback, $internal = false)
    {
        if ($feedback->status !== Feedback::FEEDBACK_READ) {
            $feedback->update(['status' => Feedback::FEEDBACK_READ]);
        }

        if (!$internal) {
            session()->flash('message', 'Marked as read!');
            session()->flash('status', 'success');
        }
    }

    public function detail(Feedback $feedback)
    {
        $data = clone $feedback->load('user');

        $this->markAsRead($feedback, true);

        return Inertia::render('Authed/Admin/Feedback/Detail', [
            'data' => $data
        ]);
    }
}
