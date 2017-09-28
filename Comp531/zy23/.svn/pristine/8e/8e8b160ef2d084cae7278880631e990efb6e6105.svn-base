'use strict'
var diffculty = "easy"
function getCookie(cname){
	var name = cname + "="
	var ca = document.cookie.split(';')
	var v = -1
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0){
			v = Number(c.substring(name.length,c.length))
		}
	}
	return v
}

function changeCookie(cname,value){
	var v = getCookie(cname)
	if(cname=="Strength"){
		if(value>v){
			document.cookie = cname+"="+value
		}
	}else{
		document.cookie = cname+"="+(v+1)
	}
}

window.onload = function() {
	var highScore = document.getElementById("highScore")
	var winRate = document.getElementById("winRate")
	if(getCookie("Strength")==-1){
		var d = new Date()
		d.setTime(d.getTime()+(1*24*60*60*1000))
		var expires = "expires="+d.toGMTString()	
		document.cookie = "Strength" + "=" + 0 + "; " + expires
		document.cookie = "Game" + "=" + 0 + "; " + expires
		document.cookie = "Won" + "=" + 0 + "; " + expires
	}
	highScore.innerHTML=getCookie("Strength")
	var rate=(getCookie("Won")==0)?0:Math.floor(100*getCookie("Won")/getCookie("Game"))
	winRate.innerHTML=rate+"%"
	var app = createApp(document.querySelector("canvas"),highScore,winRate)
	var insBtn = document.getElementById("instructionButton")
	var instruction = document.getElementById("instruction")
	var level1 = document.getElementById("diff1")
	var level2 = document.getElementById("diff2")
	var level3 = document.getElementById("diff3")
	var restart = document.getElementById("restart")	
	restart.onclick = app.restart
	insBtn.onclick = function() {
		if (insBtn.value == "Display Instruction") {
			instruction.style="display: block"
			insBtn.value = "Hide Instdruction"
		} else {
			instruction.style="display: none"
			insBtn.value = "Display Instruction"
		}
	}
	level1.onclick = function(){
		diffculty = "easy"
	}
	level2.onclick = function(){
		diffculty = "medium"
	}
	level3.onclick = function(){
		diffculty = "hard"
	}
}