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

    public function BookAppointment($appid,$depname,$appdate)
    {
        $exists= Booking::where('appointment_id',$appid)->exists();

        if(!$exists)
        {
            $booking = Booking::create([
                "appointment_id" => $appid,
                "department_name" => $depname,
                "appointment_date" => $appdate,
                "username" => auth()->user()->name,
                "user_id" => auth()->user()->id
            ]);

            Appointment::where("id",$appid)->update(['taken'=>1]);

            return "Booking Saved Successfully";
        }

        return "Booking already exists";
    }
}
