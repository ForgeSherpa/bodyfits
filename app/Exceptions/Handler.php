<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);
        if (config('app.env') === "production") {
            if ($response->getStatusCode() === 429) {
                return back()->with([
                    'status' => 'error',
                    'message' => 'Too many request. Slow down!',
                ]);
            }

            if ($response->getStatusCode() === 500) {
                $log = config('app.env') !== 'production' ? json_encode($e) : '';

                return back()->with([
                    'status' => 'error',
                    'message' => 'Ups Something went wrong ' . $log,
                ]);
            }

            if ($response->getStatusCode() === 404) {
                return back()->with(['status' => 'error', 'message' => 'Page not found!']);
            }
        }

        return $response;
    }
}
