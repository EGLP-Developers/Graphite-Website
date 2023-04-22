<?php
	$url = "https://discord.com/api/oauth2/authorize?response_type=code&client_id=" . getenv("GRAPHITE_BOT_ID") . "&scope=identify%20guilds&prompt=none&redirect_uri=" . getenv("GRAPHITE_WEBSITE_URL") . "/login";
	if(!empty($_GET["state"])) {
		$url .= "&state=" . urlencode($_GET["state"]);
	}
	header("Location: " . $url);
?>
