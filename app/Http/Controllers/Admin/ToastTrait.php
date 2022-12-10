<?php

namespace App\Http\Controllers\Admin;

trait ToastTrait
{
    function cast($message, $status)
    {
        session()->flash('message', $message);
        session()->flash('status', $status);
    }

    function edited($name)
    {
        $this->cast("$name Edited Successfully", "success");
    }

    function deleted($name)
    {
        $this->cast("$name Deleted Successfully", "success");
    }
}
