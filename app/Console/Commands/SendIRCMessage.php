<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\IRCService;

class SendIRCMessage extends Command
{
    protected $signature = 'irc:send {user} {message}';
    protected $description = 'Send a message to the IRC channel';

    protected $ircService;

    public function __construct(IRCService $ircService)
    {
        parent::__construct();
        $this->ircService = $ircService;
    }

    public function handle()
    {
        $user = $this->argument('user');
        $message = $this->argument('message');
        $this->ircService->sendMessageToUser($user, $message);
        $this->info('Message sent to IRC channel.');
    }
}
