function picture() {
	document.createElement( "picture" );
}

function bgChange() {
	// if ($('html').hasClass('homepage')) {
	// $(".intro").waypoint(function(direction) {
	// 	if (direction === 'down') {
	// 		$("body").removeClass("dark");
	// 	}
	// 	else {
	// 		$("body").addClass("dark");
	// 	}
	// });
	// }
}

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

function scroll() {
	// Select all links with hashes
	$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					};
				});
			}
		}
	});

	//Grab our current Url
	var url = window.location.toString();
	//Remove anchor from url using the split
	url = url.split('#')[0];
}

function BGColor() {
	$(".BGColor").each(function(){
		$(this).css('background','#' + $(this).attr('data-color'));
	});
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
	BGColor();
	picture();
	animated();
	// bgChange();
	masonry();
	scroll();
  parallax();

	if ($("html").hasClass("no-touchevents")) {
	 $('.project-images').imagesRotation();
	}

	$.jInvertScroll(['.project-collage img']);

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


// $(window).on("load", function() {
// });
//
// $(window).on("resize", function() {
// });
