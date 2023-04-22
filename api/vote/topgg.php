<?php
	include_once "../../website-data/globals.php";

	if(!isset($_SERVER["HTTP_AUTHORIZATION"]) || $_SERVER["HTTP_AUTHORIZATION"] != $TOPGG_VOTE_SECRET || !isset($_GET["bot"])) {
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
	$isWeekend = $pD["isWeekend"] == "true";
	$real = $pD["type"] == "upvote";

	WebsiteEndpoint::makeRequest("vote", array("vote_source" => "topgg", "bot" => $_GET["bot"], "userID" => $userID, "isWeekend" => $isWeekend, "real" => $real, "vote_secret" => $TOPGG_VOTE_SECRET));
?>