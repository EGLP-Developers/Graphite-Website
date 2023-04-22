<?php

	$TOPGG_VOTE_SECRET = getenv("GRAPHITE_TOPGG_VOTE_SECRET");
	$DISCORDBOTLISTCOM_VOTE_SECRET = getenv("GRAPHITE_DISCORDBOTLISTCOM_VOTE_SECRET");
	$DISCORDSCOM_VOTE_SECRET = getenv("GRAPHITE_DISCORDSCOM_VOTE_SECRET");

	class Tools {

		static function isValidJSON($str) {
			json_decode($str);
			return json_last_error() == JSON_ERROR_NONE;
		}

		static function writeInt($sock, $int){
			socket_write($sock, chr($int >> 24));
			socket_write($sock, chr($int >> 16));
			socket_write($sock, chr($int >> 8));
			socket_write($sock, chr($int));
		}

		static function readInt($sock){
			$b1 = ord(socket_read($sock, 1));
			$b2 = ord(socket_read($sock, 1));
			$b3 = ord(socket_read($sock, 1));
			$b4 = ord(socket_read($sock, 1));
			return ($b1 << 24) + ($b2 << 16) + ($b3 << 8) + $b4;
		}

		static function writeString($sock, $str){
			$str = !isset($str) ? "" : $str;
			Tools::writeInt($sock, strlen($str));
			socket_write($sock, $str);
		}

		static function readString($sock){
			$len = Tools::readInt($sock);
			$str = "";
			socket_recv($sock, $str, $len, MSG_WAITALL);
			return $str=="" ? null : $str;
		}

		static function deleteFolder($rootPath){
			foreach(new DirectoryIterator($rootPath) as $fileToDelete){
				if($fileToDelete->isDot()) continue;
				if ($fileToDelete->isFile())
					unlink($fileToDelete->getPathName());
				if ($fileToDelete->isDir())
					deleteFolder($fileToDelete->getPathName());
			}
			rmdir($rootPath);
		}

	}

	class WebsiteEndpoint {

		static function makeRequest($requestType, $requestData = null) {
			$key = getenv("GRAPHITE_WEBSITE_ENDPOINT_KEY");
			if($requestData == null) $requestData = (object) null;
			$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
			if(socket_connect($sock, '127.0.0.1', intval(getenv("GRAPHITE_WEBSITE_ENDPOINT_PORT")))){
				Tools::writeString($sock, $key);
				$arr = array();
				$arr["type"] = $requestType;
				$arr["data"] = $requestData;
				Tools::writeString($sock, json_encode($arr));
				return json_decode(Tools::readString($sock), true);
			}else{
				return null;
			}
		}

	}
?>
