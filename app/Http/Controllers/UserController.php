<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Requests\ChangePasswordRequest;
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

    public function changeName(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string']
        ]);

        User::find(auth()->user()->id)->update($data);

        return to_route('profile.index')->with([
            'message' => 'Profile Name changed!',
            'status' => 'success'
        ]);
    }

    public function changeEmail(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'unique:users,email'],
        ]);

        User::find(auth()->user()->id)->update($data);

        return to_route('profile.index')->with([
            'message' => 'Profile Email changed!',
            'status' => 'success'
        ]);
    }

    public function changePhoto(Request $request)
    {
        $data = $request->validate([
            'photo' => ['required', 'image', 'mimes:png,jpg,webp', 'max:4096']
        ]);

        $name = time() . $request->photo->getClientOriginalName();
        Storage::putFileAs('images/profiles', $request->photo, $name);
        $data['photo'] = $name;

        $user = auth()->user();

        if ($user->photo && trim($user->photo) !== '') {
            Storage::delete('images/' . $user->photo);
        }

        User::find(auth()->user()->id)->update($data);

        return to_route('profile.index')->with([
            'message' => 'Profile Picture changed!',
            'status' => 'success'
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
