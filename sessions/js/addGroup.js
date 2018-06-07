var modal = document.getElementById('createGroupModal');
var btn = document.getElementById('createGroup');
var span = document.getElementsByClassName("close")[0];

var applyModal = document.getElementById('applyGroupModal');
var applyBtn = document.getElementById('applyGroup');
var applySpan = document.getElementsByClassName("close")[1];

btn.onclick = function() {
	modal.style.display = "block";
}

applyBtn.onclick = function() {
	applyModal.style.display = "block";
}

span.onclick = function() {
	modal.style.display = "none";
}

applySpan.onclick = function() {
	applyModal.style.display = "none";
}


window.onclick = function(event) {
	if(event.target == modal) {
		modal.style.display = "none";
	} else if(event.target == applyModal) {
		applyModal.style.display = "none";
	}
}


