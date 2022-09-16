<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['Login','Register']]);
    }

    public function Register(Request $request)
    {
        $user = User::where('email', $request['email'])->first();

        if ($user) {
            $respone["status"] = 0;
            $respone["message"] = "Email already exists!";
            $respone["code"] = 409;

            return response()->json($respone);
        }

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);

        $respone["status"] = 1;
        $respone["message"] = "User Registered Successfully";
        $respone["code"] = 200;

        return response()->json($respone);
    }

    public function Login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (!JWTAuth::attempt($credentials)) {
                $respone["status"] = 0;
                $respone["code"] = 401;
                $respone["data"] = null;
                $respone["message"] = "Wrong Email or Password";

                return response()->json($respone);
            }
        } catch (JWTException $ex) {
            $respone["code"] = 500;
            $respone["data"] = null;
            $respone["message"] = "Cannot Generate Token";

            return response()->json($respone);
        }

        // $user = auth()->user();
        $token = auth()->attempt($credentials);

        $respone["token"] = $token;
        $respone["status"] = 1;
        $respone["code"] = 200;
        $respone["message"] = "Login Successful";
        // $respone["role"] = auth()->user()->role;
        // $respone["id"] = auth()->user()->id;
        // $respone["name"] = auth()->user()->name;
        // $respone["email"] = auth()->user()->email;

        return response()->json($respone);
    }

    public function GetUser()
    {
        $res["id"] = auth()->user()->id;
        $res["name"] = auth()->user()->name;
        $res["email"] = auth()->user()->email;
        $res["role"] = auth()->user()->role;

        return response()->json($res);
    }
}
