<?php

namespace App\Services;

class IRCService
{
    protected $socket;
    protected $server;
    protected $port;
    protected $nickname;
    protected $password;

    public function __construct($server, $port, $nickname, $password)
    {
        $this->server = $server;
        $this->port = $port;
        $this->nickname = $nickname;
        $this->password = $password;

        $this->connect();
        $this->login();
    }

    protected function connect()
    {
        // $this->socket = fsockopen($this->server, $this->port);
        // if (!$this->socket) {
        //     throw new \Exception("Could not connect to IRC server.");
        // }
    }

    protected function login()
    {
        // if ($this->password) {
        //     $this->sendData("PASS {$this->password}");
        // }
        // $this->sendData("USER {$this->nickname} 0 * :{$this->nickname}");
        // $this->sendData("NICK {$this->nickname}");
    }

    public function sendMessageToChannel($channel, $message)
    {
        // $this->sendData("JOIN {$channel}");
        // $this->sendData("PRIVMSG {$channel} :{$message}");
    }

    public function sendMessageToUser($user, $message)
    {
        // $this->sendData("PRIVMSG {$user} :{$message}");
    }

    protected function sendData($data)
    {
        // fwrite($this->socket, $data . "\r\n");
    }

    public function __destruct()
    {
        // fclose($this->socket);
    }
}
