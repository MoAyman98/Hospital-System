<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Booking;
use App\Models\Department;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;
use Illuminate\Support\Facades\Auth;


class SectionController extends Controller

{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }
    //
    public function GetSpecilizations()
    {
        return Department::all();
    }

    public function GetAppointments($id)
    {
        $appointments= Appointment::where('department_id',$id)->get();
        return response()->json($appointments);
    }

    public function BookAppointment(Request $request)
    {
        $exists= Booking::where('appointment_id',($request->id))->exists();

        if(!$exists)
        {
            // $booking = Booking::create([
            //     "appointment_id" => $request->id,
            //     "department_name" => $request->department_name,
            //     "appointment_date" => $request->appointment_date,
            //     "username" => auth()->user()->name,
            //     "user_id" => auth()->user()->id
            // ]);
            $booking = new Booking();
            $booking->appointment_id = $request->id;
            $booking->department_name = $request->department_name;
            $booking->appointment_date = $request->appointment_date;
            $booking->username = auth()->user()->name;
            $booking->user_id = auth()->user()->id;

            $booking->save();

            Appointment::where("id",$request->id)->update(['taken'=>1]);

            return response()->json("Booking Saved Successfully");
        }
        else {
            return response()->json("Booking already exists");
        }
    }

    public function GetBookings()
    {
        $role = auth()->user()->role;

        if($role==1)
        {
            return Booking::all();
        }

        return "You are not welcome here";
    }
}
