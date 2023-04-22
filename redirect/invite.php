<?php
	header("Location: https://discord.com/oauth2/authorize?client_id=" . getenv("GRAPHITE_BOT_ID") . "&scope=bot&permissions=8&scope=bot%20applications.commands");
?>
