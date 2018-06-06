
// The event handler function to compute the total cost
//function to determine if a field is blank


function checkPasswordIsValid(){
	sid = document.getElementById('password');
	var  re = /[0-9]/;
    if( ! re.test(sid.value)) {
		alert("Password must contain at least one digit");
		return false;
    }
	re = /[A-Z]/;
    if( ! re.test(sid.value)) {
		alert("Password must contain at least one uppercase letter");
		return false;
    }	
	re = /[a-z]/;
    if( ! re.test(sid.value)) {
		alert("Password must contain at least one lowercase letter");
		return false;
    }
	if( sid.value.length < 6) {
		alert("Password must have at least 6 characters");
		return false;
    }	
	return true;
}

function checkPasswordsMatch() {
	if (document.getElementById('password').value === document.getElementById('confirmPassword').value) {
		return true;
	}
	return false;
}

function checkUsername() {
	return true;//document.getElementById('username').value.length > 4;
}

function isBlank(inputField){
    if(inputField.type=="checkbox"){
		if(inputField.checked)
			return false;
		return true;
    }
    if (inputField.value == ""){
		return true;
    }
    return false;
}

function hasNoBlanks(e) {
	var requiredInputs = document.querySelectorAll(".required");
	$flag = true;
	for (var i=0; i < requiredInputs.length; i++){
		if( isBlank(requiredInputs[i]) ){
			makeRed(requiredInputs[i]);
			$flag = false;
		} else {
			makeClean(requiredInputs[i]);
		} 
	}
	return $flag;
}

//function to highlight an error through colour by adding css attributes tot he div passed in
function makeRed(inputDiv){
   	inputDiv.style.backgroundColor="#AA0000";
	//inputDiv.parentNode.style.backgroundColor="#AA0000";
	inputDiv.parentNode.style.color="#FFFFFF";		
}

//remove all error styles from the div passed in
function makeClean(inputDiv){
	inputDiv.parentNode.style.backgroundColor="#FFFFFF";
	inputDiv.parentNode.style.color="#000000";		
}

//the main function must occur after the page is loaded, hence being inside the wondow.onload event handler.
window.onload = function(){
    var myForm = document.getElementById("addForm");

    //all inputs with the class required are looped through 
    var requiredInputs = document.querySelectorAll(".required");

    for (var i=0; i < requiredInputs.length; i++){
		requiredInputs[i].onfocus = function(){
			this.style.backgroundColor = "#EEEE00";
		}
    }
    //on submitting the form, "empty" checks are performed on required inputs.
    myForm.onsubmit = function(e){
		if (!hasNoBlanks(e)) {
			alert("Missing required info.");
			e.preventDefault();
		} else if (!checkUsername()) {
		 	alert("Username must be more than 4 characters.");
		 	e.preventDefault();
		} else if (!checkPasswordIsValid()) {
			e.preventDefault();
		} else if (!checkPasswordsMatch()) {
			alert("Passwords don't match.");
			e.preventDefault();
		}
	}   
}