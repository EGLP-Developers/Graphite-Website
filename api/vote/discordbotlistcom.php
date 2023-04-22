<?php
	include_once "../../website-data/globals.php";

	if(!isset($_SERVER["HTTP_AUTHORIZATION"]) || !isset($_GET["bot"])) {
		echo "Access denied";
		return;
	}

	$token = $_SERVER["HTTP_AUTHORIZATION"];

	if($token != $DISCORDBOTLISTCOM_VOTE_SECRET) {
		echo "Access denied";
		return;
	}

	$userID = $_POST["id"];

	WebsiteEndpoint::makeRequest("vote", array("vote_source" => "discordbotlistcom", "bot" => $_GET["bot"], "userID" => $userID, "vote_secret" => $DISCORDBOTLISTCOM_VOTE_SECRET));
?>
