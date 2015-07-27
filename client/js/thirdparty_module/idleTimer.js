console.log("inside ng")
var app = angular.module("ngIdleTimer",[]);

app.provider("idleTimer", function () {
	var timer,orginalTime,extendSession,killSession,isCanceled = false;

	function addPopup(){
		var template = 	'<div id="idleTimerWrapper">'+
							'<div class="idleTimer_bg"></div>'+
							'<div class="idleTimer">'+
								'<div class="timerTitle">Do you want to continue?</div>'+
								'<div class="timerBody">'+
									'Your application will be automatically logged out in '+ 
									'<span id="remainingTime">100</span> seconds. If you want to continue,'+ 
									'click on "YES" button'+
								'</div>'+	
								'<div class="timerButton">'+
									'<button id="secondaryBtn" class="secondarybutton">No</button>'+
									'<button id="primaryBtn" class="primarybutton">Yes</button>'+
								'</div>'+
							'</div>'+
						'</div>';

		angular.element(document).find('body').append(template);

		document.getElementById("primaryBtn").addEventListener("click",function(){
			document.getElementById("idleTimerWrapper").style.display = "none";
			bindEvents();
			extendSession().then(function(res){
				if(res.status === "success"){
					console.log("Session Extended");
				}
			});
		});

		document.getElementById("secondaryBtn").addEventListener("click",function(){
			isCanceled = true;
			document.getElementById("idleTimerWrapper").style.display = "none";
		});
	}

	function openPopup(){
		removeEvents();
		document.getElementById("idleTimerWrapper").style.display = "block";	
	}

	function updateTimer(){
		timer = orginalTime;
	}

	function bindEvents(){
		document.addEventListener("mousemove",updateTimer);
		document.addEventListener('keypress',updateTimer);
	}

	function removeEvents(){
		document.removeEventListener("mousemove",updateTimer);
		document.removeEventListener('keypress',updateTimer);
	}

	function initilizeInterval(){
		var interval = 
	    	setInterval(function(){
	    		timer = timer-1000;
	    		if(timer <= alertTime && timer >= 0){
	    			if(!isCanceled){
	    				openPopup();
	    				document.getElementById("remainingTime").innerHTML = timer/1000;
	    			}	    			
	    		} else if(timer < 0){
	    			clearInterval(interval);
	    			removeEvents();
	    			document.getElementById("idleTimerWrapper").style.display = "none";
	    			killSession();
	    		}
	    	},1000);	
	}

  return {
    $get: function () {
      return {
      	 initilize : function(config){    	
			timer = orginalTime = config.idleTime*1000;
			alertTime =  config.alertTime*1000;
			extendSession = config.extendSession;  
			killSession = config.killSession;	
		},
      	watch : function(){
      		initilizeInterval();
      		addPopup();
    		bindEvents(); 
      	}
      };
    }
  };
});