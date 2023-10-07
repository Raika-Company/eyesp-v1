<?php

namespace App\Http\Controllers;

use App\Models\RstFeedback;
use App\Models\RstReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function report(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'cid' => 'required',
                'isp' => 'required',
                'province' => 'required',
                'city' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'data' => [],
                    'message' => $validator->messages()
                ]);
            }

            if (RstReport::InsertReport($request)) {
                return response()->json([
                    'status' => true,
                    'data' => [],
                    'message' => 'thank you. information was recorded!'
                ]);
            }

            return response()->json([
                'status' => false,
                'data' => [],
                'message' => 'something went wrong'
            ]);

        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }

    public function feedback(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'cid' => 'required',
                'isp' => 'required',
                'score' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'data' => [],
                    'message' => $validator->messages()
                ]);
            }

            if (RstFeedback::InsertFeedback($request)) {
                return response()->json([
                    'status' => true,
                    'data' => [],
                    'message' => 'thank you. information was recorded!'
                ]);
            }

            return response()->json([
                'status' => false,
                'data' => [],
                'message' => 'something went wrong'
            ]);

        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'data' => [],
                'message' => $e->getMessage()
            ]);
        }
    }
}
