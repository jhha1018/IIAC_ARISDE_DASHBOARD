$(document).ready(function(){
	
	token = $("#token").val();
	
	//$.ajaxSetup({beforeSend: function(xhr) {xhr.setRequestHeader('token', token);}});
	//contextPath = "http://localhost:38080";
	contextPath = "http://192.168.0.104:38080";
	sidebar_on = true; 
	let sidebar_breaker = document.getElementById("sidebar_Breaker");
	
	if(sidebar_breaker != null) {
		leftbar();
	}
	
	function leftbar(){
		sidebar_breaker.addEventListener('mouseover',function(){
			if(!sidebar_on) {
				$("#sidebar_Breaker").css({
				'opacity' : '1',
				'transition-duration' : '0.5s'
			})
			}
			
		})
		sidebar_breaker.addEventListener('mouseout',function(){
			if(!sidebar_on) {
				
				$("#sidebar_Breaker").css({
					'opacity' : '0.2',
					'transition-duration' : '0.5s'
				})
			}
		})
		$(".sidebar_Breaker").click(function(){
			if(sidebar_on == true) {
				$("#sidebar_Breaker").css({
				'border-radius' : '0 100px 100px 0',
				'right' : '-20px',
				'border-left-style' : 'groove',
				'opacity' : '0.2',
				'transition-duration':'1s'
				})
				
				$(".position_left").css({
					'left' : '-230px',
					'transition-duration':'2s'
				})
				$(".position_body").css({
					'margin-left' : '0px',
					'width' : '100%',
					'transition-duration':'2s'
				})
				$(".position_top").css({
					'margin-left' : '0px',
					'transition-duration':'2s'
				})
				sidebar_on = false;
			}else if(!sidebar_on) {
				$("#sidebar_Breaker").css({
				'border-radius' : '100px 0 0 100px',
				'right' : '0px',
				'border-left-style' : 'solid',
				'opacity' : '1',
				'transition-duration':'1s'
				})
				$(".position_left").css({
					'left' : '0px',
					'transition-duration':'2s'
				})
				$(".position_body").css({
					'margin-left' : '230px',
					'width' : ' calc(100% - 258px)',
					'transition-duration':'2s'
				})
				$(".position_top").css({
					'margin-left' : '230px',
					'transition-duration':'2s'
				})
				
				sidebar_on = true;
				
			}
			
			
		})
	}
	
		
})