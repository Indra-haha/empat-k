<?php

return [

    'driver' => 'bcrypt',

    'bcrypt' => [
        'rounds' => 12,
    ],

    'argon' => [
        'memory' => 1024,
        'time' => 2,
        'threads' => 2,
    ],

];
