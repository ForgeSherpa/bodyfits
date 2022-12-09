<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Http\Requests\UpdateProfileRequest;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Authed/Admin/Dashboard');
    }

    public function updateProfile(UpdateProfileRequest $updateProfileRequest)
    {
        (new UserController)->updateProfileOnly($updateProfileRequest);

        return to_route('admin.dashboard')->with([
            'message' => 'Profile Updated Successfully',
            'status' => 'success',
        ]);
    }
}
