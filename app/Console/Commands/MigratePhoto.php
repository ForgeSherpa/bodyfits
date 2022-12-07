<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MigratePhoto extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:photo {--move}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'A command to migrate a zip photo file to app storage.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        if (File::exists('storage/app/images')) {
            $this->error('Target folder already exists.');
            return Command::FAILURE;
        }

        $start = Carbon::now();
        $this->info('Migration begin.');

        if ($this->option('move')) {
            File::move('public/images', 'storage/app/images');
        } else {
            File::copyDirectory('public/images', 'storage/app/images');
        }

        $end = Carbon::now();
        $this->info("Migration finished in: " . $start->diffInMicroseconds($end) . " ms");
        return Command::SUCCESS;
    }
}
