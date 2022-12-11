<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrainersRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'job' => ['required', 'string'],
            'age' => ['required', 'numeric', 'min:18'],
            'nationality' => ['required', 'string'],
            'contact' => ['required', 'numeric', 'regex:[-]'],
            'description' => ['required', 'numeric'],
            'photo' => ['nullable', 'mimes:png,jpg,webp', 'max:4096'],
        ];
    }
}
