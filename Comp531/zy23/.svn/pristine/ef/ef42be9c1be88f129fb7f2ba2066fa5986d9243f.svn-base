var imageGroup=new Array(
	["https://www.conncoll.edu/media/major-images/Art.jpg","https://dms.hallco.org/web/wp-content/uploads/art.jpg"],
	["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj3AwperEctfg-qt4m6FmFjX_C5AvBCLpoP1TyJqtGpLqj9zTqSg",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj-ZrnNzX5uOgxSr2uuAzQ2G5x-nanJaKILNzCRCAUDCmaCbgslA"],
	["https://www.sandiego.org/-/media/images/sdta-site/hero-gallery-rotators-645-x-340/regions/downtown/san-diego-convention-center-skyline.jpg?bc=black&amp;h=340&amp;w=453&amp;c=1",
	"http://www.visitcalifornia.com/sites/default/files/styles/welcome_image/public/VC_SeaWorldSanDiego_Supplied_SW5_0771_Final_1280x640.jpg","https://www.sparefoot.com/moving/wp-content/uploads/2017/02/san-diego-2.jpg"],
	["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sywIKJ7wogGRWUCFXnUvIJPcIHQf2LMfT4Unhsw_O0BptXY9wA",
	"https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2017/01/04104645/houston-texas-1280x800.jpg"])

var imageContainer=new Array()
var buttonContainer=new Array()
var executeContainer=new Array()
var intervalContainer=new Array()

function random(){
	//Get a random number for interval 
	return Math.floor(Math.random()*4+1)*1000
}

window.onload = function() {
	function next_picture(k) {
		//Get the next picture in imageGroup
		var j = 1
		var num = imageGroup[k].length
		return function() {
			imageContainer[k].src = imageGroup[k][(j++)%num]
		}
	}

	for(var i=0;i<4;i++){
		//Set object for each image post
		imageContainer[i] = document.getElementById("image"+i)
		buttonContainer[i] = document.getElementById("button"+i)
		executeContainer[i] = next_picture(i)
		intervalContainer[i] = setInterval(executeContainer[i],random());
		buttonContainer[i].onclick = check_click(i)
	}		
}

function check_click(i){
	return  function execute_click(){
		//Handle click on button to stop and start
		if(buttonContainer[i].value=="Stop"){
			buttonContainer[i].value="Start"
			clearInterval(intervalContainer[i]);
		}else{
			intervalContainer[i] = setInterval(executeContainer[i],random());
			buttonContainer[i].value="Stop"
		}		
	}
}


