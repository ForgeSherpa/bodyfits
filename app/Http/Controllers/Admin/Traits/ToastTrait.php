<?php

namespace App\Http\Controllers\Admin\Traits;

trait ToastTrait
{
    public function cast($message, $status)
    {
        session()->flash('message', $message);
        session()->flash('status', $status);
    }

    public function edited($url, $name)
    {
        return to_route($url)->with([
            'message' => "$name edited Successfully",
            'status' => 'success',
        ]);
    }

    public function deleted($name)
    {
        $this->cast("$name Deleted Successfully", 'success');
    }

    public function created($url, $name)
    {
        return to_route($url)->with([
            'message' => "$name Created Successfully",
            'status' => 'success',
        ]);
    }
}
