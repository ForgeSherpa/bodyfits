<?php

namespace App\Http\Controllers\Admin;

trait ToastTrait
{
    public function cast($message, $status)
    {
        session()->flash('message', $message);
        session()->flash('status', $status);
    }

    public function edited($name)
    {
        $this->cast("$name Edited Successfully", 'success');
    }

    public function deleted($name)
    {
        $this->cast("$name Deleted Successfully", 'success');
    }
}
