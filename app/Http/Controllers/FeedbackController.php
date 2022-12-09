<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendFeedbackRequest;
use App\Models\Feedback;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index()
    {
        return Inertia::render('Authed/Feedback');
    }

    public function sendFeedback(SendFeedbackRequest $sendFeedbackRequest)
    {
        Feedback::create(array_merge($sendFeedbackRequest->validated(), ['user_id' => auth()->user()->id, 'status' => Feedback::FEEDBACK_UNREAD]));

        return to_route('feedback')->with([
            'message' => 'Feedback sended! Thanks for your concern.',
            'status' => 'success',
        ]);
    }
}
