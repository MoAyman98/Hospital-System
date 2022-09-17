<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function GetBookings()
    {
        $role = auth()->user()->role;

        if($role==1)
        {
            return Booking::all();
        }

        return response()->json("You are not welcome here");
    }
}
