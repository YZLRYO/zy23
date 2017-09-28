var input_field_name = new Array("name","email","phone","zipcode","password","confirmedPassword")
var valid_pattern = new Array(/^\w+([-+.]\w+)*$/,/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,/^\d{3}-\d{3}-\d{4}$/,/^\d{5}$/)
var input_value = new Array()
var curent_value = new Array()
var alert = new Array()
var alert_flag = 0
var update_flag = 0

window.onload = function() {
	for(var i=0;i<input_field_name.length;i++){
		input_value[i] = document.getElementById(input_field_name[i])
		curent_value[i] = document.getElementById("current"+input_field_name[i])
		alert[i] = document.getElementById(input_field_name[i]+"Alert")
	}

	var submit = document.getElementById("submit")
	submit.onclick = function(){
		validate()
		if(alert_flag>0){
			do_alert(alert_flag)
		}else if(update_flag>0){
			do_update(update_flag)
		}else{
			do_clear()
		}
	}
	
}

function validate(){
	//validate the input matches the required pattern and the password matches
	alert_flag = 0
	update_flag = 0
	for(var i=0;i<input_field_name.length-2;i++){
		if(input_value[i].value){
			if(!input_value[i].value.match(valid_pattern[i])){
				alert_flag+=Math.pow(2,i)
			}else{
				if(input_value[i].value != curent_value[i].innerHTML){
					update_flag+=Math.pow(2,i)
				}
			}
		}			
	}
	if(input_value[5].value||input_value[4].value){
		if(input_value[4].value!=input_value[5].value){
			alert_flag+=Math.pow(2,5)
		}else{
			if(input_value[4].value != curent_value[4].innerHTML){
				update_flag+=Math.pow(2,5)+Math.pow(2,4)
			}
		}
	}
}

function do_alert(alert_flag){
	//show the hidden alert information when validation fails
	for(var i=0;i<input_field_name.length;i++){
		alert[i].style = "display: none"
	}
	var j = 1
	var count = 0
	while(j<=alert_flag){
		if((j&alert_flag)!=0){
			alert[count].style = "color: red"
		}
		j*=2
		count++
	}
}

function do_update(update_flag){
	// update the current value with the correct input
	var j = 1
	var count = 0
	var string = "Updated field: </br>"
	while(j<=update_flag){
		if((j&update_flag)!=0){
			string+=input_field_name[count]+": "+curent_value[count].innerHTML+" => "+input_value[count].value+"</br>"
			curent_value[count].innerHTML = input_value[count].value
			
		}
		j*=2
		count++
	}	
	do_clear()
	var notification = document.getElementById("notification")
	notification.style="color: blue"
	notification.innerHTML = string
}

function do_clear(){
	// clear alerts and update infomations
	for(var i=0;i<input_field_name.length;i++){
		alert[i].style = "display: none"
		input_value[i].value = null
	}
	var notification = document.getElementById("notification")
	notification.style = "display: none"
}