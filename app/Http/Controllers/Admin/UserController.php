<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\RestoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    use ToastTrait, SearchableModel;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $model = User::orderBy('role')
            ->orderByDesc('id')
            ->groupBy('role', 'id')
            ->withTrashed();

        $users = $model->paginate($request->per_page ?? 5);

        if ($request->search) {
            $users = $this->setSearchableModel($model)
                ->addSearch('email', $request->search)
                ->addSearch('name', $request->search)
                ->search('admin.users.index');
        }

        if ($request->wantsJson()) {
            return $users;
        }

        return Inertia::render('Authed/Admin/Users/Users', [
            'data' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Authed/Admin/Users/Form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        $photo = $request->photo;
        $data = $request->except(['password_confirmation', 'photo']);

        if ($photo && trim($photo) !== '') {
            $name = time() . $photo->getClientOriginalName();
            Storage::putFileAs('images/profiles', $photo, $name);
            $data['photo'] = $name;
        }

        User::create($data);

        return $this->created('admin.users.index', 'User');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return Inertia::render('Authed/Admin/Users/Detail', [
            'data' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return Inertia::render('Authed/Admin/Users/Form', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(User $user, UpdateUserRequest $updateUserRequest)
    {
        $data = $updateUserRequest->except(['password', 'password_confirmation']);

        $photo = $updateUserRequest->photo;

        // handle kalau ada foto.
        if ($photo && trim($photo) !== '') {
            $name = time() . $photo->getClientOriginalName();
            Storage::putFileAs('images/profiles', $photo, $name);
            $data['photo'] = $name;
            if ($user->photo && trim($user->photo) !== '') {
                Storage::delete('images/' . $user->photo);
            }
        }

        if ($updateUserRequest->password && trim($updateUserRequest->password) !== '') {
            $data['password'] = bcrypt($updateUserRequest->password);
        }

        $user->update($data);

        return $this->edited('admin.users.index', 'User');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return $this->deleted("User");
    }

    public function restoreUser(RestoreUserRequest $restoreUserRequest)
    {
        $user = User::withTrashed()->find($restoreUserRequest->validated()['user_id']);
        if ($user->trashed()) {
            $user->restore();
        }

        $this->cast("User restored!", "success");
    }
}
