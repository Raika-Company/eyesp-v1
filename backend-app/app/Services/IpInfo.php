<?php
namespace App\Services;

class IpInfo {

	private $base_url = "http://ip-api.com/json";
    private $ip;

	public function __construct($ip) {
        $this->ip = $ip;
	}

    public function GetInfo()
    {
        $client = new \GuzzleHttp\Client(['verify' => false]);
        $result = $client->get($this->base_url.'/'.$this->ip);
        return json_decode($result->getBody()->getContents());
    }

	/* protected function Do_API_Call($method, $params = array()) {

		$qp = array("api_key=" . $this->api_key);
		foreach ($params as $k => $v) {
			$qp[] = $k . "=" . urlencode($v);
		}

		$url = $this->base_url . $method . "?" . implode("&", $qp);

		if (!$jdata = @file_get_contents($url)) {
			throw new Exception("{$method}: unable to fetch URL: {$url}");
		}

		if (!$data = @json_decode($jdata)) {
			throw new Exception("{$method}: error decoding server response");
		}

		if (isset($data->error)) {
			//throw new DBIP_Client_Exception("{$method}: server reported an error: {$data->error}");
		}

		return $data;

	}

	public function Get_Ip_Info($addr) {

		return $this->Do_API_Call("addrinfo", array("addr" => $addr));

	} */

}

?>