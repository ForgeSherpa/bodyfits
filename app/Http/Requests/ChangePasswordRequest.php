<?php

namespace App\Http\Requests;

use App\Rules\CheckOldPassword;
use App\Rules\NoSamePassword;
use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'old_password' => ['required', 'min:8', 'string', new CheckOldPassword()],
            'new_password' => ['required', 'confirmed', 'min:8', new NoSamePassword()],
        ];
    }
}
