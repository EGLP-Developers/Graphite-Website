function search(inp, con){
	for(let child of con.children){
		child.style.display = (child.text.toLowerCase().includes(inp.value.toLowerCase()) ? "flex" : "none");
	}
}

function removeArrayElement(array, value){
	let removed = [];

	for(let i = 0; i < array.length; i++){ 
		if (array[i] === value) { 
			removed.push(array[i]);
			array.splice(i, 1); 
			i--; 
		}
	}

	return removed;
}

Object.filter = function( obj, predicate) {
	let result = {}, key;

	for (key in obj) {
		if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
			result[key] = obj[key];
		}
	}

	return result;
};
			
function getHexColor(int){
	return "#"+ ('000000' + ((int)>>>0).toString(16)).slice(-6);;
}

function hexToDecimal(hex){
	return parseInt(hex.replace("#", ""), 16);
}

function formatSize(size){
	if(size < 1024*1024){
		return Math.round(size/1024) + " KiB";
	}else if(size < 1024*1024*1024){
		return Math.round(size/1024/1024) + " MiB";
	}else{
		return Math.round(size/1024/1024/1024) + " GiB";
	}
}

function getTimestamp(s) {
	function pad(n, z) {
		z = z || 2;
		return ('00' + n).slice(-z);
	}

	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;

	return (parseInt(hrs) == 0 ? "" : pad(hrs) + ':') + pad(mins) + ':' + pad(secs);
}

function getDuration(time) {
	let out = "";
	time -= time % 1000;
	time /= 1000;
	let secs = time % 60;
	time = (time - secs) / 60;
	let mins = time % 60;
	time = (time - mins) / 60;
	let hours = time % 24;
	time = (time - hours) / 24;
	let days = time % 7;
	time = (time - days) / 7;
	let weeks = time;

	if(weeks != 0) out += weeks + "w";
	if(days != 0) out += days + "d";
	if(hours != 0) out += hours + "h";
	if(mins != 0) out += mins + "m";
	if(secs != 0) out += secs + "s";
	return out.trim();
}

function getFriendlyDuration(time) {
	let out = "";
	time -= time % 1000;
	time /= 1000;
	let secs = time % 60;
	time = (time - secs) / 60;
	let mins = time % 60;
	time = (time - mins) / 60;
	let hours = time % 24;
	time = (time - hours) / 24;
	let days = time % 7;
	time = (time - days) / 7;
	let weeks = time;

	if(weeks != 0) out += weeks + " week" + (weeks > 1 ? "s " : " ");
	if(days != 0) out += days + " day" + (days > 1 ? "s " : " ");
	if(hours != 0) out += hours + " hour" + (hours > 1 ? "s " : " ");
	if(mins != 0) out += mins + " minute" + (mins > 1 ? "s " : " ");
	if(secs != 0) out += secs + " second" + (secs > 1 ? "s " : " ");
	return out.trim();
}

function HSVtoRGB(h, s, v) {
	let r, g, b, i, f, p, q, t;
	if (arguments.length === 1) {
		s = h.s, v = h.v, h = h.h;
	}
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}
	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);
	return (r & 0xff) << 16 | (g & 0xff) << 8 | b & 0xff;
}
			
function setRegexInputFilter(textbox, regex) {
	setInputFilter(textbox, function(value) { return regex.test(value); });
}

function setInputFilter(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
		textbox.addEventListener(event, function() {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			}
		});
	});
}

function isValidHexColor(color){
	return /^#[0-9A-F]{6}$/i.test(color.startsWith("#") ? color : "#" + color);
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function getUUID() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

function getShortUUID() {
	var firstPart = (Math.random() * 46656) | 0;
	var secondPart = (Math.random() * 46656) | 0;
	firstPart = ("000" + firstPart.toString(36)).slice(-3);
	secondPart = ("000" + secondPart.toString(36)).slice(-3);
	return firstPart + secondPart;
}

function base64ToArrayBuffer(base64) {
	var binary_string = window.atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array(len);
	for (var i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

function download(data, filename, type) {
	var file = new Blob([data], {type: type});
	if (window.navigator.msSaveOrOpenBlob)
		window.navigator.msSaveOrOpenBlob(file, filename);
	else {
		var a = document.createElement("a"),
				url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

function isColor(strColor){
	var s = new Option().style;
	s.color = strColor;
	return s.color == strColor;
}

function checkCondition(condition, errorReturnText){
	if(condition) showAlert(errorReturnText, true);
	return condition;
}