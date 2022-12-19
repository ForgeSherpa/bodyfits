<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\ManageAccount\{ChangeEmailRequest, ChangeNameRequest, ChangePhotoRequest};
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Authed/Profiles');
    }

    public function changeName(ChangeNameRequest $request)
    {
        User::find(auth()->user()->id)->update($request->validated());

        return to_route('profile.index')->with([
            'message' => 'Profile Name changed!',
            'status' => 'success',
        ]);
    }

    public function changeEmail(ChangeEmailRequest $request)
    {
        User::find(auth()->user()->id)->update($request->validated());

        return to_route('profile.index')->with([
            'message' => 'Profile Email changed!',
            'status' => 'success',
        ]);
    }

    public function changePhoto(ChangePhotoRequest $request)
    {
        $user = auth()->user();

        autoRemovePhoto($user->photo);

        $name = time() . $request->photo->getClientOriginalName();
        Storage::putFileAs('images/profiles', $request->photo, $name);
        $data['photo'] = $name;

        User::find(auth()->user()->id)->update($data);

        return to_route('profile.index')->with([
            'message' => 'Profile Picture changed!',
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
        $user = User::find(auth()->user()->id);

        autoRemovePhoto($user->photo);

        $user->update(['photo' => null]); // as we used soft delete. It's better to put the image to null.

        $user->delete();

        return (new AuthenticatedSessionController())->destroy(request())->with([
            'message' => 'Account Deleted',
            'status' => 'success',
        ]);
    }
}
