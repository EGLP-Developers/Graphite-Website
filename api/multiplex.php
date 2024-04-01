<?php
include "../website-data/globals.php";
$res = WebsiteEndpoint::makeRequest("multiplex");

header("Content-Type: application/json");
if ($res != null) {
	echo json_encode($res);
} else {
	echo "[]";
}
