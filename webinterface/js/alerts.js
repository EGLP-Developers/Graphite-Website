/*jshint esversion: 8 */
var head = document.getElementsByTagName('HEAD')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';  
link.type = 'text/css';
link.href = 'js/css/alerts.css';  
head.appendChild(link);

let waiting = false;
let secs = 3;

function showAlert(msg, isError) {
	if(waiting) return;
	waiting = true;

	let c = document.getElementById("snackbar");
	if(isError != null && isError) c.classList.add("error");
	c.innerText = msg;
	c.classList.add("show");

	setTimeout(function(){ 
		waiting = false;
		c.classList.remove("show");
		c.classList.remove("error");
	}, secs * 1000);
}