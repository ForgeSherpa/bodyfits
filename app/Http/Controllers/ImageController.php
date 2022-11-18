<?php

namespace App\Http\Controllers;

use League\Flysystem\Filesystem;
use League\Flysystem\Local\LocalFilesystemAdapter;
use League\Glide\Responses\LaravelResponseFactory;
use League\Glide\ServerFactory;

class ImageController extends Controller
{
    public function show($path)
    {
        $server = ServerFactory::create([
            'response' => new LaravelResponseFactory(app('request')),
            'source' => new Filesystem(new LocalFilesystemAdapter("../storage/app/images")),
            'cache' => new Filesystem(new LocalFilesystemAdapter("../storage/app/cache")),
            'cache_path_prefix' => 'cache',
            'base_url' => 'images'
        ]);

        return $server->getImageResponse($path, request()->all());
    }
}
