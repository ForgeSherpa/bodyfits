<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Authed/Admin/Dashboard');
    }

    public function updateProfile(UpdateProfileRequest $updateProfileRequest)
    {
        $data = $updateProfileRequest->all();

        $photo = $updateProfileRequest->photo;

        $user = User::find(auth()->user()->id);

        // handle kalau ada foto.
        if ($photo && trim($photo) !== '') {
            $name = time() . $photo->getClientOriginalName();
            Storage::putFileAs('images/profiles', $photo, $name);
            $data['photo'] = $name;
            if ($user->photo && trim($user->photo) !== '') {
                Storage::delete('images/' . $user->photo);
            }
        }

        User::find(auth()->user()->id)->update($data);

        return to_route('admin.dashboard')->with([
            'message' => 'Profile Updated Successfully',
            'status' => 'success',
        ]);
    }
}
