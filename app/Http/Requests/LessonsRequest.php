<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LessonsRequest extends FormRequest
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
            'course_id' => ['required', 'exists:courses'],
            'type' => ['required', Rule::in(["text", "video"])],
            'content' => ['required_if:type,text', 'min:10', 'string'],
            'link' => ['required_if:type,video', 'string', 'url'],
            'length' => ['string', 'required', 'regex:/[0-9]/']
        ];
    }
}
