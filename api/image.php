<?php
include "../website-data/globals.php";

if (!isset($_GET["id"])) {
	echo "Nope";
	die();
}

$res = WebsiteEndpoint::makeRequest("image", array("id" => $_GET["id"]));

if ($res != null) {
	header("Content-Type: image/png");
	echo base64_decode($res["image"]);
} else {
	echo "Error";
}
