function win(){
	var btn = document.getElementById("button")
	var title = document.getElementById("title")
	if(btn.innerHTML=="Click Me!"){
		title.style="color: green"
		btn.style="margin-left: 45%; margin-top: 30%"
		btn.innerHTML="Play Again!"
	}else{
		title.style="display: none"
		btn.innerHTML="Click Me!"
		btn.style="margin-left: 45%; margin-top: 30%"
	}
}

function random(){
	return Math.floor(Math.random()*50)
}

window.onload = function() {

	var btn = document.getElementById("button")

	btn.onmouseover = function(e) {
		if((btn.innerHTML=="Click Me!")&&(!e.shiftKey)){
			btn.style="margin-left: " + random() + "%; " +"margin-top: " + random() + "%" 
		}
	}	
}
