<?php
	include_once "../../website-data/globals.php";

	WebsiteEndpoint::makeRequest("vote", array("vote_source" => "beta", "bot" => $_GET["bot"], "userID" => $_GET["user"]));
?>
