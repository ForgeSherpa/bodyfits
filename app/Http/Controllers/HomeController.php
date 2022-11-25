<?php

namespace App\Http\Controllers;

use App\Models\Trainers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $trainers = Trainers::paginate($request->per_page ?? 3);

        if ($request->wantsJson()) {
            return $trainers;
        }

        return Inertia::render('Home', compact('trainers'));
    }
}
