var score = 0;
var time = 30;
var on = false;
var light = 0;
var t1;
var t2;
window.onload = function(){
	document.getElementById("start").onclick = function() {
		if (on == true) {
			on = false;
			end();
		} else if (on == false) {
			on = true;
		t1 = setInterval(onPlay, 1000);
	    t2 = setTimeout(end, 30000);
		document.getElementById("message").value = "Playing";
		document.getElementById("time").value = time;
		document.getElementById("score").value = score;
		var moles = document.getElementsByClassName("moles");
		var random = Math.random()*60;
		light = Math.floor(random);
		moles[light].style.backgroundColor = "red";
		for (var i = 0; i < moles.length; i++) {
			moles[i].onclick = function(i) {
				if (on = true)
				if (this.value - 1 == light) {
					score++;
					moles[this.value - 1].style.backgroundColor = "white";
					var newone;
					do {
						newone = Math.floor(Math.random()*60);
					} while (newone == this.value - 1);
					moles[newone].style.backgroundColor = "red";
					light = newone;
				} else {
					score--;
				}
				document.getElementById("score").value = score;				
			}
		}
	}
	}
	function onPlay() {
		time--;
		document.getElementById("time").value = time;
	}
	function end() {
		document.getElementById("message").value = "Game Over";
		document.getElementById("time").value = 0;	
		alert("Your score:" + score);
		clearInterval(t1);
		clearTimeout(t2);
		on = false;
		time = 30;
		score = 0;
	}
}
