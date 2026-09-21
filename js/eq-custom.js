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

	$('.owl-carousel.testimonials-carousel').owlCarousel({
		margin: 20,
		loop: false,
		dots: true,
		nav: false,
		items: 3,
		autoplay: false,
		loop: true,
		responsive:{
			0:{
					items:1,
					autoplay: true
			},
			768:{
					items:2,
					autoplay: true
			},
			1024:{
					items:3,
					autoplay: false
			}
    }
	});

	

	
	var currentCategory = 0;
	var totalCategories = $('.category-panel').length;
	var autoplayDelay = 5000;
	var autoplayTimer = null;

	$('.product-carousel').each(function () {
		$(this).owlCarousel({
			loop: false,
			items: 4,
			slideBy: 1,
			margin: 20,
			nav: true,
			dots: false,
			autoplay: false,
			smartSpeed: 600,
			responsive: {
				0: {
						items: 1
				},
				576: {
						items: 2
				},
				768: {
						items: 3
				},
				1024: {
						items: 4
				}
			}
		});
	});

	function getCarousel(categoryIndex) {
	return $('.category-panel')
		.eq(categoryIndex)
		.find('.product-carousel');
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearTimeout(autoplayTimer);
			autoplayTimer = null;
		}
  }

	function switchCategory(categoryIndex, position) {
		stopAutoplay();
			
		if (categoryIndex >= totalCategories) {
			categoryIndex = 0;
		}

		if (categoryIndex < 0) {
			categoryIndex = totalCategories - 1;
		}

		$('.category-panel').removeClass('active');

		$('.category-tab').removeClass('active');

		var panel = $('.category-panel').eq(categoryIndex);
		
		panel.addClass('active');
		$('.category-tab')
				.eq(categoryIndex)
				.addClass('active');

		var carousel = getCarousel(categoryIndex);
		
		carousel.trigger(
			'refresh.owl.carousel'
		);

		var owl = carousel.data('owl.carousel');

		if (owl) {
			var productCount = owl.items().length;
			var visibleItems = owl.settings.items;
			var lastPosition = Math.max( 0, productCount - visibleItems );

			if (position === 'last') {
				carousel.trigger(
					'to.owl.carousel',
					[lastPosition, 600, true]
				);
			} else {
				carousel.trigger(
					'to.owl.carousel',
					[position || 0, 600, true]
				);
			}
		}

		startAutoplay();
	}

	function nextCategory() {
		var next = currentCategory + 1;

		if (next >= totalCategories) {
			next = 0;
		}
	
		switchCategory(next, 0);
	}

	function previousCategory() {
		var previous = currentCategory - 1;

		if (previous < 0) {
			previous = totalCategories - 1;
		}
        
		switchCategory(previous, 'last');
  }

	$('.product-carousel').on(
		'click',
		'.owl-next',
		function () {
			var carousel = $(this).closest('.product-carousel');
			if (
					!carousel.closest('.category-panel').hasClass('active')
			) {
					return;
			}
			
			stopAutoplay();

			var owl = carousel.data('owl.carousel');

			if (!owl) {
				return;
			}

			var currentPosition = owl.relative(owl.current());
			var productCount = owl.items().length;
			var visibleItems = owl.settings.items;
			var lastPosition = Math.max( 0, productCount - visibleItems );

			if (currentPosition >= lastPosition) {
				nextCategory();
			} else {
				carousel.trigger(
					'next.owl.carousel'
				);
					startAutoplay();
			}
		}
	);

	$('.product-carousel').on(
		'click',
		'.owl-prev',
		function () {
			var carousel = $(this).closest('.product-carousel');
			if (
					!carousel.closest('.category-panel').hasClass('active')
			) {
				return;
			}

			stopAutoplay();

			var owl = carousel.data('owl.carousel');

			if (!owl) {
				return;
			}
	
			var currentPosition = owl.relative(owl.current());

			if (currentPosition <= 0) {
				previousCategory();
			} else {
				carousel.trigger(
					'prev.owl.carousel'
				);
				startAutoplay();
			}
		}
	);

	$('.category-tab').on(
		'click',
		function () {
			var index = $('.category-tab').index(this);

			if (index === currentCategory) {
				return;
			}

			switchCategory(index, 0);
		}
	);

	function startAutoplay() {
		stopAutoplay();
		
		autoplayTimer = setTimeout(
			function () {
				var carousel = getCarousel(currentCategory);
				var owl = carousel.data('owl.carousel');

				if (!owl) {
					return;
				}

				var currentPosition = owl.relative(owl.current());
				var productCount = owl.items().length;
				var visibleItems = owl.settings.items;
				var lastPosition = Math.max(0, productCount - visibleItems );

				if (
					currentPosition >= lastPosition
				) {
					nextCategory();
				} else {
					carousel.trigger(
						'next.owl.carousel'
					);

					startAutoplay();
				}

			},

			autoplayDelay
		);	
	}	
    
	startAutoplay();

});
 

$(window).on('scroll', function () {
    $('body').toggleClass('hovering header-fix', $(window).scrollTop() > 1);
});
		
		