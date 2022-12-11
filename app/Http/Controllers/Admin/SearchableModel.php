<?php

namespace App\Http\Controllers\Admin;

trait SearchableModel
{
    protected $model, $currentModel;

    function setSearchableModel($model)
    {
        $this->model = $model;
        return $this;
    }

    function addSearch($field, $keyword)
    {
        if (!$this->currentModel) {
            $this->currentModel = $this->model->where($field, 'LIKE', "%$keyword%");
            return $this;
        }

        $this->currentModel = $this->model->orWhere($field, 'LIKE', "%$keyword%");
        return $this;
    }

    function search()
    {
        return $this->currentModel->paginate(request()->per_page ?? 5)->withPath(route("admin.feedback.index", ['search' => request()->search]));
    }
}
