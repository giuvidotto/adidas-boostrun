<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMailContato;

class ApiController extends Controller
{ 
    public function send(Request $request)
    {
        Mail::to("contato@prodsports.com.br")->send(new SendMailContato((object) $request));

        return response()->json([
            'status' => true,
        ]);
    }

    public function teste()
    {
        $requestData = array("nome" => "Caio Augusto" , "email" => "caio@afrontadigital.com.br" , "mensagem" => "TESTE TESTE TESTE");

        Mail::to("contato@prodsports.com.br")->send(new SendMailContato((object) $requestData));

        return response()->json([
            'data' => array(),
        ]);
    }

}