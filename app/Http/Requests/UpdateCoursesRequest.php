<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCoursesRequest extends FormRequest
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
            'title' => ['required', 'string', Rule::unique('courses')->ignore($this->route('courses'))],
            'description' => ['required', 'string'],
            'trainer_id' => ['required', 'exists:trainers,id'],
            'category_id' => ['required', 'exists:categories,id'],
            'photo' => ['nullable', 'mimes:jpg,png,webp', 'max:4096']
        ];
    }
}
