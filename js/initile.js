var started = false;
var check1 = false;
var check2 = false;
var check3 = false;
window.onload = function() {
	document.getElementById("start").addEventListener("mouseover", function() {
		if (started == false) {
			cheat = false;
			started = true;
			document.getElementById("warn").textContent = " ";
			times = 1;
			start();	
		} else {
			times++;
		}
	});
	function start() {
		started = true;
		var wall = document.getElementsByClassName("wall");
		for(var i = 0; i < wall.length; i++) {
			wall[i].addEventListener("mouseover", function(){
				if (started == true) {
					this.style.backgroundColor = "red";
					document.getElementById("warn").textContent = "You Lost!";
					started = false;

				}
			});
			wall[i].addEventListener("mouseout", function(){
				this.style.backgroundColor = "#ded6d6";
			});
			if (started) {
					document.getElementById("c1").addEventListener("mouseover", function(){
						check1 = true;
					});
					document.getElementById("c2").addEventListener("mouseover", function(){
						check2 = true;
					});
					document.getElementById("c3").addEventListener("mouseover", function(){
						check3 = true;
					});
			}
		}
		document.getElementById("end").addEventListener("mouseover", function(){
			if(started == true&&check1 == true&&check2 == true&&check3 == true){
				document.getElementById("warn").textContent = "You Win!";
				cheat = false;
				started = false;
				check1 = check2 = check3 = false;
			} else if(started == true) {
				document.getElementById("warn").textContent = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
				cheat = false;
				started = false;
				check1 = check2 = check3 = false;
			}
		})
	}
}
