'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*(canvas.height/2-55)

		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"

		const dx = floorSpacing + windowHeight    
		const dy = windowSpacing + windowWidth
		const floors = Math.floor(blgHeight/dx)
		const rows = Math.floor(blgWidth/dy) - 1
		const range = (n, delta, x0) => Array(n).fill(1).map((_, i) => x0 + i * delta)
		range(floors, dx, floor - blgHeight + dx).forEach(y => {
		    range(rows, dy, windowSpacing).forEach(x => {
		    	if(Math.random()>0.4){
		    		c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
		    	}
		    })
		})
	}

	function sun(){
		var x=10
		var y=40
		return function drawSun() {
			c.clearRect(x-12,y-12,25,25)
			if(x==790){
				x=10
			}else{
				x=x+10
			}
			y=45-Math.random()*10
			c.fillStyle="red"
			c.beginPath()
			c.arc(x,y,10,0,2*Math.PI,false)
			c.closePath()
			c.fill()
		}

	}

	function car(){
		var x=0
		var y=460
		return function drawcar(){
			var floor = canvas.height/2
			var grad = c.createLinearGradient(0,floor,0,canvas.height)
			grad.addColorStop(0, "green")
			grad.addColorStop(1, "black")
			c.fillStyle=grad
			c.fillRect(0, floor, canvas.width, canvas.height)
			c.fillStyle="red"
			c.fillRect(x, y+20, 60, 10)

			c.fillStyle="yellow"
			c.beginPath()
			c.arc(x+10,y+30,5,0,2*Math.PI,false)
			c.closePath()
			c.fill()
			c.beginPath()
			c.arc(x+50,y+30,5,0,2*Math.PI,false)
			c.closePath()
			c.fill()
			if(x==740){
				x=0
			}else{
				x+=10
			}
			
		}
	}

	var sundraw = sun()
	var cardraw = car()
	setInterval(sundraw,50)
	setInterval(cardraw,150)


	
	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}


