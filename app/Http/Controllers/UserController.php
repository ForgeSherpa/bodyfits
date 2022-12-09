<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Authed/Profiles');
    }

    public function updateProfileOnly($updateProfileRequest)
    {
        $data = $updateProfileRequest->all();

        $photo = $updateProfileRequest->photo;

        $user = User::find(auth()->user()->id);

        // handle kalau ada foto.
        if ($photo && trim($photo) !== "") {
            $name = time() . $photo->getClientOriginalName();
            Storage::putFileAs('images/profiles', $photo, $name);
            $data['photo'] = $name;
            if ($user->photo && trim($user->photo) !== "") {
                Storage::delete('images/' . $user->photo);
            }
        }

        User::find(auth()->user()->id)->update($data);
    }

    public function updateProfile(UpdateProfileRequest $updateProfileRequest)
    {
        $this->updateProfileOnly($updateProfileRequest);

        return to_route('profile')->with([
            'message' => 'Profile Updated Successfully',
            'status' => 'success',
        ]);
    }

    public function changePassword(ChangePasswordRequest $changePasswordRequest)
    {
        User::find(auth()->user()->id)->update(['password' => bcrypt($changePasswordRequest->new_password)]);

        return (new AuthenticatedSessionController())->destroy($changePasswordRequest)->with([
            'message' => 'Change Password Success, Logging out!',
            'status' => 'success',
        ]);
    }

    public function deleteAccount()
    {
        User::find(auth()->user()->id)->delete();

        return (new AuthenticatedSessionController())->destroy(request())->with([
            'message' => 'Account Deleted',
            'status' => 'success',
        ]);
    }
}
