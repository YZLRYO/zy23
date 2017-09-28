var createApp = function(canvas,highScore,winRate) { 
	var c = canvas.getContext("2d")
	var indication = document.getElementById("indication")
	var level = diffculty
	var playerDeck = [3,3,4,4,6,6,7,7,8,8,9,10,13,"fog","horn"]
	var aiDeck = [3,3,4,4,6,6,7,7,8,8,9,10,13,"fog","horn"]
	var explainText = { 3 : "Strength: 3", 4 : "Strength: 4", 6 : "Strength: 6", 7 : "Strength: 7", 8 : "Strength: 8", 9 : "Strength: 9", 10 : "Strength: 10", 13 : "Strength: 13",
		"fog" : "Play on your enermy's row (3 up rows) to reduce all units on that row to 1", "horn" : "Play on your own row (3 below rows ) to double the strength of all units on that row"
	}
	function pickCard(i,deck,hand){
		var index=0
		for(var k=0;k<i;k++){
			index=Math.floor(100*Math.random())%deck.length
			hand[k]=deck[index]
			deck.splice(index,1)
		}
	}
	var cards = []
	var aiCards = []
	pickCard(10,playerDeck,cards)
	pickCard(10,aiDeck,aiCards)
	c.font = "20px Arial"
	var strength = [0,0,0,0,0,0]
	var board = [[],[],[],[],[],[]]

	// Parameters for canvas drawing
	var handHeight=canvas.height/6
	var boardHeight=canvas.height*2/3
	var boardWidth=canvas.width/3*2
	var sCardHeight=boardHeight/6
	var sCardWidth=boardWidth/10
	var sideHeight=canvas.height*2/3
	var sideWidth=canvas.width/10
	var cardWidth=canvas.width/12
	var cardHeight=handHeight*0.9
	var passX=canvas.width/10
	var passY=canvas.height/2
	var passRadius=passX*0.6
	var crownX=[canvas.width/15,canvas.width/15*2,canvas.width/15,canvas.width/15*2]
	var crownY=[canvas.height/4,canvas.height/4,canvas.height/4*3,canvas.height/4*3]
	var rCrown=canvas.width/30*0.9
	var img = document.getElementById("pic")
	var passAI=0
	var passPlayer=0
	var playCard=0
	var cardSelect=0
	var playerWon=0
	var AIWon=0
	var endFlag=0
	var endGame=0

	var paint = {
		// Paint tools used to paint various parts on the canvas including hand, card, board, count, border, pass button and banner
		paintAll: function(){
			this.drawHand()
			this.drawBoard()
			this.drawBoardCard()
			this.drawCount()
			this.drawBorder()
			this.drawCard()
			this.drawPass()
			this.drawCrown()
		},
		drawHand: function(){		
			c.fillStyle="gray"
			c.fillRect(0, 0, canvas.width, handHeight)
			c.fillRect(0, handHeight*5, canvas.width, handHeight)
		},
		drawBoard: function(){
			c.fillStyle="#ffd41b"
			c.fillRect(boardWidth/2, handHeight, boardWidth, boardHeight)		
		},
		drawBoardCard: function(){
			for(var i=0;i<board.length;i++){
				for(var j=0;j<board[i].length;j++){
					c.fillStyle="white"
					c.fillRect(canvas.width-(1+j+0.05)*sCardWidth, (i+0.05)*sCardHeight+handHeight, sCardWidth*0.9, sCardHeight*0.9)
					c.fillStyle="black"
					c.font="20px Arial"
					c.fillText(board[i][j],boardWidth/2*3-(1+j-0.35)*sCardWidth, (i+0.55)*sCardHeight+handHeight)
				}
			}
		},
		drawCount: function(){
			c.fillStyle="green"
			c.fillRect(boardWidth/2-sideWidth, handHeight, sideWidth, sideHeight)
			c.fillStyle="black"
			c.font="20px Arial"
			for(var j=0;j<strength.length;j++){	
				c.fillText(strength[j],boardWidth/2-0.3*sideWidth, handHeight+(j+0.55)*sideHeight/6);
			}
			c.fillText("Total:",boardWidth/2-0.9*sideWidth, handHeight+sideHeight/6)
			c.fillText("Total:",boardWidth/2-0.9*sideWidth, handHeight+4*sideHeight/6)
			c.font="40px Arial"
			c.fillText(strength[0]+strength[1]+strength[2],boardWidth/2-0.9*sideWidth, handHeight+(1.65)*sideHeight/6);
			c.fillText(strength[3]+strength[4]+strength[5],boardWidth/2-0.9*sideWidth, handHeight+(4.65)*sideHeight/6);	
		},
		drawBorder: function(){
			// Draw border
			c.fillStyle="black"
			c.fillRect(boardWidth/2, handHeight+boardHeight/6*1, boardWidth, 1)
			c.fillRect(boardWidth/2, handHeight+boardHeight/6*2, boardWidth, 1)
			c.fillRect(boardWidth/2-sideWidth, handHeight+boardHeight/6*3, boardWidth+sideWidth, 1)
			c.fillRect(boardWidth/2, handHeight+boardHeight/6*4, boardWidth, 1)
			c.fillRect(boardWidth/2, handHeight+boardHeight/6*5, boardWidth, 1)
		},
		drawCard: function(){
			c.font="20px Arial"	
			for(var i = 0; i < cards.length; i++){
				c.fillStyle="white"
				c.fillRect(canvas.width-(i+1)*cardWidth, handHeight*5.05, cardWidth*0.95, cardHeight)
				c.fillStyle="black"
				c.fillText(cards[i],canvas.width-(i+0.6)*cardWidth,handHeight*5.5)
			}
			
			for(var i = 0; i < aiCards.length; i++){
				c.fillStyle="black"
				c.fillRect(canvas.width-(i+1)*cardWidth, handHeight*0.05, cardWidth*0.95, cardHeight)
			}
			c.font="15px Arial"	
			c.fillText("Player Card #: "+cards.length,0.06*cardWidth,handHeight*5.5)
			c.fillText("COM Card #: "+aiCards.length,0.06*cardWidth,handHeight*0.5)
		},
		drawPass: function(){
			c.fillStyle="white"
			c.fillRect(passX-1.5*passRadius, passY-3*passRadius, passRadius*3.5, 6*passRadius)
			c.fillStyle="blue"
			c.beginPath()
			c.arc(passX*0.9,passY,passRadius,0,2*Math.PI,false)
			c.closePath()
			c.fill()
			c.fillStyle="black"
			c.font="20px Arial"
			c.fillText("Pass",passX-0.7*passRadius,passY)
			c.font="40px Arial"			
			if(passAI==1){
				c.fillText("Passed",passX-1.2*passRadius,passY-1.5*passRadius)
			}
			if(passPlayer==1){
				c.fillText("Passed",passX-1.2*passRadius,passY+2*passRadius)
			}			
		},
		drawCrown: function(){
			for(var k=0;k<4;k++){
				if((playerWon>=1)&&(k==2)){
					c.fillStyle="red"
				}else if((AIWon>=1)&&(k==0)){
					c.fillStyle="red"
				}else if((playerWon==2)&&(k==3)){
					c.fillStyle="red"
				}else if((AIWon==2)&&(k==1)){
					c.fillStyle="red"
				}else{
					c.fillStyle="gray"
				}
				
				c.beginPath()
				c.arc(crownX[k],crownY[k],rCrown,0,2*Math.PI,false)
				c.closePath()
				c.fill()
			}			
		},
		fillExplain: function(){
			c.fillStyle="black"
			c.font="20px Arial"
			c.fillText(instruction,3/4*canvas.width, handHeight)
		},
		drawBanner: function(){
			c.fillStyle="white"
			c.fillRect(0, canvas.height/4, canvas.width, canvas.height/2)
			c.fillStyle="black"
			c.font="20px Arial"
			var AIstrength=strength[0]+strength[1]+strength[2]
			var Playerstrength=strength[3]+strength[4]+strength[5]
			c.fillText("Your Strength: "+Playerstrength,canvas.width/2*0.8, canvas.height/4*1.2)
			c.fillText("COM Strength: "+AIstrength,canvas.width/2*0.8, canvas.height/4*1.4)
	
			if(Playerstrength>AIstrength){
				playerWon++
				c.fillText("You win the round",canvas.width/2*0.8, canvas.height/4*1.6)
			}else if(AIstrength>Playerstrength){
				AIWon++
				c.fillText("Com win the round",canvas.width/2*0.8, canvas.height/4*1.6)
			}else{
				playerWon++
				AIWon++
				c.fillText("Tie",canvas.width/2*0.8, canvas.height/4*1.6)
			}
			c.fillText("Click anywhere on board to continue",canvas.width/2*0.8, canvas.height/4*1.8)			
		}

	}

	function endRound(){
		// Clear cards on the borad and count
		for(var i=0;i<strength.length;i++){
			if(strength[i]>0){
				board[i].splice(0,board[i].length)
			}
			strength[i]=0;
		}
		passAI=0
		passPlayer=0
	}

	var restart = function(){
		// Restart a game
		endRound()
		playerDeck = [3,3,4,4,6,6,7,7,8,8,9,10,13,"fog","horn"]
		aiDeck = [3,3,4,4,6,6,7,7,8,8,9,10,13,"fog","horn"]
		cards = []
		aiCards = []
		pickCard(10,playerDeck,cards)
		pickCard(10,aiDeck,aiCards)
		AIWon=0
		playerWon=0
		level = diffculty
		paint.paintAll()
		endGame=0	
	}

	paint.paintAll()

	function action(event) {
		// Trigger the click event action including emphasize card select, detect action, put card on board and pass.
		if(endGame==1){
			return {}
		}
		var mouseX = event.clientX
		var mouseY = event.clientY
		paint.paintAll()

		function redrawCard(i){
			if(i==-1){
				return {}
			}
			c.fillStyle="red"
			c.fillRect(canvas.width-(i+1)*cardWidth, handHeight*5.05, cardWidth*0.95, cardHeight)
			c.fillStyle="black"
			c.font="20px Arial"
			c.fillText(cards[i],canvas.width-(i+0.6)*cardWidth,handHeight*5.5)
			playCard=1	
			cardSelect=i
		}

		function detectCard(){
			var index=Math.floor((canvas.width-mouseX)/cardWidth)
			return (index>=cards.length)?-1:index
		}

		function detectPass(){
			return ((mouseX>passX-passRadius)&&(mouseX<passX+passRadius)&&(mouseY>passY-passRadius)&&(mouseY<passY+passRadius))
		}

		function detectBoard(){
			if((mouseX<boardWidth/2)||(mouseX>boardWidth/2*3)||(mouseY<handHeight)||(mouseY>boardHeight+handHeight)){
				return -1
			}else{
				return Math.floor((mouseY-handHeight)/(boardHeight/6))
			}
		}

		function playCardExe(cards,cardindex,position,flag){
			var cardValue=cards[cardindex]
			if((cardValue=="fog")&&((3-position>=0)^flag)){

				for(var i=0;i<board[position].length;i++){
					board[position][i]-=board[position][i]-1
				}
				strength[position]=board[position].length
			}else if((cardValue=="horn")&&((3-position<=0)^flag)){
				for(var i=0;i<board[position].length;i++){
					board[position][i]*=2
				}
				strength[position]*=2
			}else if((cardValue!="fog")&&((3-position<=0)^flag)){
				board[position][board[position].length]=cardValue
				strength[position]+=cardValue
			}else{
				return -1
			}
			cards.splice(cardindex,1)
			return 0
		}

		function aiPass(){
			// Check situation for COM to decide whether to pass
			if(aiCards.length==0){
				return true
			}
			var AIStrength=strength[0]+strength[1]+strength[2]
			var playerStrength=strength[3]+strength[4]+strength[5]
			if((level=="medium")||(level=="easy")){
				if(((playerStrength-AIStrength>20)&&(playerWon==0))||((playerStrength-AIStrength<0)&&(passPlayer==1)&&(playerWon<=1))){
					return true
				}
			}else if((level=="hard")){
				if(((playerWon==0)&&(AIWon==0))&&(((passPlayer==1)&&(playerStrength<AIStrength))||((playerStrength-AIStrength)>=10)  )  ){
					return true
				}else if((playerWon==0)&&(AIWon==1)){
					if(aiCards.length>=cards.length){
						return true
					}else if(playerStrength-AIStrength>10){
						return true
					}else{
						if((playerStrength-AIStrength)>aiCards.length*6){
							return true
						}
					}
				}else if((playerWon==1)&&(AIWon==0)){
					if(playerStrength-AIStrength<0){
						return true
					}
				}	
			}
			return false
		}

		function aiPlay(){
			// Check situation for COM to decide which and where the card to play
			if((passAI==1)||(aiPass())){
				passAI=1
				return
			}
			var position=Math.floor(Math.random()*123)%3
			var card=Math.floor(Math.random()*100)%aiCards.length
			if(level=="easy"){
				position=Math.floor(Math.random()*123)%3
				card=Math.floor(Math.random()*100)%aiCards.length
				if(aiCards[card]=="fog"){
					position+=3
				}
			}else if(level=="medium"){
				card=Math.floor(Math.random()*100)%aiCards.length
				position=Math.floor(Math.random()*123)%3
				if(aiCards[card]=="fog"){
					var max=0
					position=3
					for(var i=3;i<strength.length;i++){
						if(strength[i]-board[i].length>=max){
							max=strength[i]-board[i].length
							position=i
						}
					}
				}
				if(aiCards[card]=="horn"){
					var max=0
					position=0
					for(var i=0;i<strength.length-3;i++){
						if(strength[i]>=max){
							max=strength[i]
							position=i
						}
					}
					if(max==0){
						if(aiCards.length>2){
							var seed=100
							while((aiCards[card]=="fog")||(aiCards[card]=="horn")){
								card=Math.floor(Math.random()*seed++)%aiCards.length
							}
						}
					}
				}
			}else if(level=="hard"){
				card=Math.floor(Math.random()*100)%aiCards.length
				position=Math.floor(Math.random()*123)%3
				if(aiCards[card]=="fog"){
					var max=0
					position=3
					for(var i=3;i<strength.length;i++){
						if(strength[i]-board[i].length>=max){
							max=strength[i]-board[i].length
							position=i
						}
					}
				}
				if(aiCards[card]=="horn"){
					var max=0
					position=0
					for(var i=0;i<strength.length-3;i++){
						if(strength[i]>=max){
							max=strength[i]
							position=i
						}
					}
				}	
			}				
			playCardExe(aiCards,card,position,1)
		}

		if(endFlag==1){
			changeCookie("Strength",strength[3]+strength[4]+strength[5])
			endRound()
			paint.paintAll()
			endFlag=0
			if((AIWon==2)&&(playerWon==2)){
				window.alert("Tie!")
				endGame=1
				changeCookie("Game",0)
			}else if(AIWon==2){
				window.alert("You Lose!")
				endGame=1
				changeCookie("Game",0)
			}else if(playerWon==2){
				window.alert("You Win!")
				changeCookie("Won",0)
				changeCookie("Game",0)
				endGame=1
			}			
			highScore.innerHTML=getCookie("Strength")
			var rate=(getCookie("Won")==0)?0:Math.floor(100*getCookie("Won")/getCookie("Game"))
			winRate.innerHTML=rate+"%"
		}else if(mouseY>handHeight*5){
			var cardindex=detectCard()
			if(cardindex!=-1){
				indication.innerHTML=explainText[cards[cardindex]]
			}else{
				indication.innerHTML=""
			}
			redrawCard(cardindex)
		}else if(detectPass()){	
			passPlayer=1
			while(passAI!=1){
				aiPlay()
			}
			paint.paintAll()
			paint.drawBanner()
			endFlag=1
		}else if(playCard==1){
			var res=-1
			var p=detectBoard()
			if(p==-1){
				playCard=0
			}else{
				res=playCardExe(cards,cardSelect,p,0)
				playCard=0
				cardSelect=0	
			}			
			paint.paintAll()
			if(res!=-1){
				aiPlay()
				paint.paintAll()
			}
		}
	}

	canvas.addEventListener("click", action, false)
	return {
		restart: restart
	}
}