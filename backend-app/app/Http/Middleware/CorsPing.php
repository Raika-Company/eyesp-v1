<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsPing
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //header('Access-Control-Allow-Origin:*');
        //header('Access-Control-Allow-Origin:  http://127.0.0.1:5173');
        //header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin');
        //header('Access-Control-Allow-Methods:  POST, GET');
        return $next($request);
    }
}
