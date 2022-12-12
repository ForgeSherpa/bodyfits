<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoriesRequest;
use App\Models\Categories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    use ToastTrait, SearchableModel;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $model = Categories::orderByDesc('id');

        $categories = $model->paginate($request->per_page ?? 5);

        if ($request->search) {
            $categories = $this->setSearchableModel($model)
                ->addSearch('name', $request->search)
                ->addSearch('nationality', $request->search)
                ->addSearch('job', $request->search)
                ->addSearch('contact', $request->search)
                ->search("admin.categories.index");
        }

        if ($request->wantsJson()) {
            return $categories;
        }

        return Inertia::render('Authed/Admin/Categories/Categories', [
            'data' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Authed/Admin/Categories/Form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CategoriesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoriesRequest $request)
    {
        Categories::create($request->validated());

        return $this->created('admin.categories.index', 'Category');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function edit(Categories $categories)
    {
        return Inertia::render('Authed/Admin/Categories/Form', [
            'category' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\CategoriesRequest  $request
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function update(CategoriesRequest $request, Categories $categories)
    {
        $categories->update($request->validated());

        return $this->edited('admin.categories.index', 'Category');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categories $categories)
    {
        $categories->delete();

        $this->deleted('Category');
    }
}
