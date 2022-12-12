<?php

namespace App\Http\Controllers\Admin;

trait SearchableModel
{
    protected $model;

    protected $currentModel;

    public function setSearchableModel($model)
    {
        $this->model = $model;

        return $this;
    }

    public function addSearch($field, $keyword)
    {
        if (! $this->currentModel) {
            $this->currentModel = $this->model->where($field, 'LIKE', "%$keyword%");

            return $this;
        }

        $this->currentModel = $this->model->orWhere($field, 'LIKE', "%$keyword%");

        return $this;
    }

    public function search($path, $parameters = [])
    {
        return $this->currentModel->paginate(request()->per_page ?? 5)->withPath(route($path, array_merge($parameters, ['search' => request()->search])));
    }
}
