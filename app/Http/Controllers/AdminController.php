<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function edit_team() {
        $members = Member::all();
        return Inertia::render('Admin/EditTeam', [
            'members' => $members
        ]);
    }
}
