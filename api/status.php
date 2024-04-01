<?php
include "../website-data/globals.php";
$res = WebsiteEndpoint::makeRequest("status");
$response = array();
$response["online"] = $res != null;
$response["bots"] = (object) $res;

header("Content-Type: application/json");
echo json_encode($response);
