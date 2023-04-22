<?php
	include_once "../../website-data/globals.php";

	if(!isset($_SERVER["HTTP_AUTHORIZATION"]) || $_SERVER["HTTP_AUTHORIZATION"] != $DISCORDSCOM_VOTE_SECRET || !isset($_GET["bot"])) {
		echo "Access denied";
		return;
	}

	$postData = file_get_contents('php://input');
	if(!Tools::isValidJSON($postData)) {
		echo "Access denied";
		return;
	}
	$pD = json_decode($postData, true);

	$userID = $pD["user"];
	$real = $pD["type"] == "vote";

	WebsiteEndpoint::makeRequest("vote", array("vote_source" => "discordscom", "bot" => $_GET["bot"], "userID" => $userID, "real" => $real, "vote_secret" => $DISCORDSCOM_VOTE_SECRET));
?>
