<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class Setup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'setup {--init}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Setting up BodyFits Projects in a matter of seconds.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("Note: It's highly encouraged to start this project in Docker Container.");
        $this->info('Setting Up...');
        $this->info('BodyFits by Kelompok 2: Albet, Vincent, Wira, Delvin, Atnan, Jeffry');
        if ($this->option('init')) {
            Artisan::call('key:generate');
            Artisan::call('migrate:photo');
            $this->info("Done, You can start installing Node dependencies by running 'yarn'.");
        }

        Artisan::call('migrate:fresh --seed');

        return Command::SUCCESS;
    }
}
