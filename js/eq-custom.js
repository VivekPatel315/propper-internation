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
});

$(window).on('scroll', function () {
    $('body').toggleClass('hovering header-fix', $(window).scrollTop() > 1);
});
		
		