<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\Feedback;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Authed/Admin/Dashboard', [
            'feedbacks' => Feedback::whereDate('created_at', Carbon::now())->count(),
            'users' => User::whereBetween('created_at', [now()->subWeek(), now()])->count()
        ]);
    }

    public function updateProfile(UpdateProfileRequest $updateProfileRequest)
    {
        $data = $updateProfileRequest->all();

        $photo = $updateProfileRequest->photo;

        $user = User::find(auth()->user()->id);

        // handle kalau ada foto.
        if ($photo && trim($photo) !== '') {
            autoRemovePhoto($user->photo);
            $name = time() . $photo->getClientOriginalName();
            Storage::putFileAs('images/profiles', $photo, $name);
            $data['photo'] = $name;
        }

        User::find(auth()->user()->id)->update($data);

        return to_route('admin.dashboard')->with([
            'message' => 'Profile Updated Successfully',
            'status' => 'success',
        ]);
    }
}
