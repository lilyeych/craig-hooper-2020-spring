function animated() {
	window.requestAnimationFrame(function() {
		$(".animated").waypoint(function() {
			$(this.element).addClass($(this.element).data('animated'));
		}, { offset: '80%' });
	});
}

function masonry() {
	if ($('.homepage .project-list').length) {
    var $projectList = $('.project-list').masonry({
      itemSelector: '.project',
      transitionDuration: '0s',
      horizontalOrder: true
    });
  
    $projectList.imagesLoaded().progress( function() {
      $projectList.masonry('layout');
    });
  }
}

function parallax() {
  // media query event handler
  // if (matchMedia) {
  //   const mq = window.matchMedia("(min-width: 640px)");
  //   mq.addListener(WidthChange);
  //   WidthChange(mq);
  // }

  // media query change
  // function WidthChange(mq) {
  //   if (mq.matches) {
      $(".parallax").paroller({ factor: 0.05, factorXs: 0.05, factorSm: 0.15, type: 'foreground'});
    // } else {
    //   $(".parallax").paroller({ factor: 0, type: 'foreground'});
    // }
  // }
}

$(function() {
	animated();
	masonry();
	parallax();
	
	//flip homepage project images on hover
	if ($("html").hasClass("no-touchevents")) {
	 $('.project-images').imagesRotation();
	}

  $.jInvertScroll(['.project-collage img']);
  
  window.addEventListener("resize", function() {
    console.log("tessd");
    $.jInvertScroll(['.project-collage img']);
  });

	// $('.craig-2').on({ 'touchstart' : function(){ 
	// 	$('.craig-2 .blob-2').hide();
	// } });


//    $(".craig-2").on("touchstart", function(e) {
// 			$(".dot").hide();
// 	 });
	 
// 	 $(".craig-2").on("touchend", function(e) {
// 		$(".dot").show();
//  });

});