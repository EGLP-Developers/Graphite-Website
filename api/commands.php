<?php
	include "../website-data/globals.php";
	$res = WebsiteEndpoint::makeRequest("commands");

	header("Content-Type: application/json");
	if($res != null) {
		file_put_contents(__DIR__ . "/commands.json", json_encode($res));
		echo json_encode($res);
	}else {
		echo file_get_contents(__DIR__ . "/commands.json");
	}
?>