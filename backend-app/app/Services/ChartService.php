<?php
namespace App\Services;

use Carbon\Carbon;
use Morilog\Jalali\Jalalian;

class ChartService
{
    public static function daily($data)
    {
        $response = [
            'id' => 'daily'
        ];
        $now = now()->format('H');
        $j = 0;
        for ($i=0; $i <= $now; $i = $j)
        {
            $j = $i+2;
            $downloadAvg = $data->whereBetween('time', [Carbon::createFromFormat('H', $i)->format('h:i:s'), Carbon::createFromFormat('H', $j)->format('h:i:s')])->avg('download');
            $uploadAvg = $data->whereBetween('time', [Carbon::createFromFormat('H', $i)->format('h:i:s'), Carbon::createFromFormat('H', $j)->format('h:i:s')])->avg('upload');
            $pingAvg = $data->whereBetween('time', [Carbon::createFromFormat('H', $i)->format('h:i:s'), Carbon::createFromFormat('H', $j)->format('h:i:s')])->avg('ping');
            $packetLossAvg = $data->whereBetween('time', [Carbon::createFromFormat('H', $i)->format('h:i:s'), Carbon::createFromFormat('H', $j)->format('h:i:s')])->avg('packet_loss');
            $response['data']['download'][] = [
                'name' => $i.'-'.$j,
                'value' => round($downloadAvg ?? 0, 2),
            ];
            $response['data']['upload'][] = [
                'name' => $i.'-'.$j,
                'value' => round($uploadAvg ?? 0, 2),
            ];
            $response['data']['ping'][] = [
                'name' => $i.'-'.$j,
                'value' => round($pingAvg ?? 0, 2),
            ];
            $response['data']['packet_loss'][] = [
                'name' => $i.'-'.$j,
                'value' => round($packetLossAvg ?? 0, 2),
            ];
        }

        return $response;
    }

    public static function weekly($data)
    {
        $response = [
            'id' => 'weekly'
        ];
        for ($i=6; $i >= 0; $i--)
        {
            $downloadAvg = $data->where('date', Carbon::now()->subDays($i)->toDateString())->avg('download');
            $uploadAvg = $data->where('date', Carbon::now()->subDays($i)->toDateString())->avg('upload');
            $pingAvg = $data->where('date', Carbon::now()->subDays($i)->toDateString())->avg('ping');
            $packetLossAvg = $data->where('date', Carbon::now()->subDays($i)->toDateString())->avg('packet_loss');
            $response['data']['download'][] = [
                'name' => Jalalian::now()->subDays($i)->format('%D %A'),
                'value' => round($downloadAvg ?? 0, 2),
            ];
            $response['data']['upload'][] = [
                'name' => Jalalian::now()->subDays($i)->format('%D %A'),
                'value' => round($uploadAvg ?? 0, 2),
            ];
            $response['data']['ping'][] = [
                'name' => Jalalian::now()->subDays($i)->format('%D %A'),
                'value' => round($pingAvg ?? 0, 2),
            ];
            $response['data']['packet_loss'][] = [
                'name' => Jalalian::now()->subDays($i)->format('%D %A'),
                'value' => round($packetLossAvg ?? 0, 2),
            ];
        }

        return $response;
    }

    public static function monthly($data)
    {
        $response = [
            'id' => 'monthly'
        ];
        $now = Jalalian::now()->format('d');

        for ($i=$now-1; $i > 0; $i--)
        {
            $date = Jalalian::fromFormat('Y-m-d H:i:s', Jalalian::now()->subDays($i))->toCarbon()->format('Y-m-d');
            $downloadAvg = $data->where('date', $date)->whereBetween('time', ['00:00:00', '23:59:59'])->avg('download');
            $uploadAvg = $data->where('date', $date)->whereBetween('time', ['00:00:00', '23:59:59'])->avg('upload');
            $pingAvg = $data->where('date', $date)->whereBetween('time', ['00:00:00', '23:59:59'])->avg('ping');
            $packetLossAvg = $data->where('date', $date)->whereBetween('time', ['00:00:00', '23:59:59'])->avg('packet_loss');
            $response['data']['download'][] = [
                'name' => Jalalian::fromDateTime($date)->format('M-d'),
                'value' => round($downloadAvg ?? 0, 2),
            ];
            $response['data']['upload'][] = [
                'name' => Jalalian::fromDateTime($date)->format('M-d'),
                'value' => round($uploadAvg ?? 0, 2),
            ];
            $response['data']['ping'][] = [
                'name' => Jalalian::fromDateTime($date)->format('M-d'),
                'value' => round($pingAvg ?? 0, 2),
            ];
            $response['data']['packet_loss'][] = [
                'name' => Jalalian::fromDateTime($date)->format('M-d'),
                'value' => round($packetLossAvg ?? 0, 2),
            ];
        }

        return $response;
    }

    public static function year($data)
    {
        $response = [
            'id' => 'yearly'
        ];
        $now = Jalalian::now()->format('m');
        $start = Jalalian::fromFormat('Y-m-d H:i:s', Jalalian::now())->toCarbon()->format('Y-m').'-01';
        $end = Jalalian::fromFormat('Y-m-d H:i:s', Jalalian::now())->toCarbon()->format('Y-m').'-30';

        for ($i=0; $i < $now; $i++, $start = Jalalian::fromFormat('Y-m-d H:i:s', Jalalian::now()->subMonths($i))->toCarbon()->format('Y-m').'-01',
            $end = Jalalian::fromFormat('Y-m-d H:i:s', Jalalian::now()->subMonths($i))->toCarbon()->format('Y-m').'-30')
        {
            $downloadAvg = $data->whereBetween('date', [$start, $end])->avg('download');
            $uploadAvg = $data->whereBetween('date', [$start, $end])->avg('upload');
            $pingAvg = $data->whereBetween('date', [$start, $end])->avg('ping');
            $packetLossAvg = $data->whereBetween('date', [$start, $end])->avg('packet_loss');
            $response['data']['download'][] = [
                'name' => Jalalian::fromDateTime($start)->format('%B'),
                'value' => round($downloadAvg ?? 0, 2),
            ];
            $response['data']['upload'][] = [
                'name' => Jalalian::fromDateTime($start)->format('%B'),
                'value' => round($uploadAvg ?? 0, 2),
            ];
            $response['data']['ping'][] = [
                'name' => Jalalian::fromDateTime($start)->format('%B'),
                'value' => round($pingAvg ?? 0, 2),
            ];
            $response['data']['packet_loss'][] = [
                'name' => Jalalian::fromDateTime($start)->format('%B'),
                'value' => round($packetLossAvg ?? 0, 2),
            ];
        }

        return $response;
    }

}