<?php

namespace App\Http\Controllers\Admin;

trait ToastTrait
{
    public function cast($message, $status)
    {
        session()->flash('message', $message);
        session()->flash('status', $status);
    }

    function edited($url, $name)
    {
        return to_route($url)->with([
            'message' => "$name edited Successfully",
            'status' => 'success'
        ]);
    }

    function deleted($name)
    {
        $this->cast("$name Deleted Successfully", "success");
    }

    function created($url, $name)
    {
        return to_route($url)->with([
            'message' => "$name Created Successfully",
            'status' => 'success'
        ]);
    }
}
