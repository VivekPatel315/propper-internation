$(document).ready(function() {
	$(".has-child").hover(function() {
			$("body").addClass("hovering")
	}, 

	function() {
			$("body").removeClass("hovering")
	}); 
	
	$(".humberg-menu").click(function() {
			$("body").toggleClass("menu-open");
	});   
	
	$(".nav-menu .nav-item.has-child .menu-arrow").click(function(e) {
		const $parent = $(this).parent(".nav-item");
		$(this).closest(".nav-menu").toggleClass("submenu-open"), $parent.toggleClass("open-submenu")
	});

	$('.search-icon').click (function () {
		$('.search-bar').slideToggle();
	})

	$('.owl-carousel.banner-carousel').owlCarousel({
		margin: 0,
		loop: true,
		dots: true,
		autoplay: true,
		items: 1
	})

	$('.owl-carousel.announcement-carousel').owlCarousel({
		margin: 0,
		loop: true,
		dots: false,
		items: 1,
		autoplay: true
	})	


	$('.owl-carousel.trusted-carousel').owlCarousel({
		margin: 0,
		loop: true,
		dots: false,
		items: 3,
		autoplay: true,
		responsive:{
			0:{
					items:1
			},
			768:{
					items:2
			},
			1280:{
					items:3
			}
    }
	});

	$('.owl-carousel.category-carousel').owlCarousel({
		margin: 20,
		loop: true,
		dots: true,
		nav: true,
		items: 3,
		autoplay: false,
		loop: false,
		responsive:{
			0:{
					items:1
			},
			768:{
					items:2
			},
			1024:{
					items:3
			}
    }
	});

	
});

$(window).on('scroll', function () {
    $('body').toggleClass('hovering header-fix', $(window).scrollTop() > 1);
});
		
		