<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    use ToastTrait;
    use SearchableModel;

    public function index(Request $request)
    {
        $model = Feedback::orderBy('status')
            ->orderByDesc('id')
            ->groupBy('status', 'id');

        $feedback = $model->paginate($request->per_page ?? 5);

        if ($request->search) {
            $feedback = $this->setSearchableModel($model)
                ->addSearch('title', $request->search)
                ->search('admin.feedback.index');
        }

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

        if (! $internal) {
            $this->cast('Marked as read!', 'success');
        }
    }

    public function detail(Feedback $feedback)
    {
        $data = clone $feedback->load(['user' => fn ($q) => $q->withTrashed()]);

        $this->markAsRead($feedback, true);

        return Inertia::render('Authed/Admin/Feedback/Detail', [
            'data' => $data,
        ]);
    }

    public function delete(Feedback $feedback)
    {
        $feedback->delete();
        $this->deleted('Feedback');
    }
}
