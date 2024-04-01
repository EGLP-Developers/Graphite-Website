<?php
include "../website-data/globals.php";
$res = WebsiteEndpoint::makeRequest("commands");

header("Content-Type: application/json");
if ($res != null) {
	echo json_encode($res);
} else {
	echo "[]";
}
