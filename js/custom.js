//Input validation: Searches any error corresponding to this field's "name"
function applyInputErrors(inputToCheck, errorsList) {
	var matchingError = errorsList[$(inputToCheck).attr("name")];

	if (matchingError) {
		//If there IS an error on this input, add styling and error text
		resetInputErrors($(inputToCheck)); //Remove existing errors
		$(inputToCheck).addClass("has-error");
		$(inputToCheck)
			.parent()
			.find("p.errorp")
			.html("<span class='error-text'>" + matchingError + "</span>");
	}
}

//Input validation: Reset errors shown on input
//Called when input is focused and when a new error is being applied
function resetInputErrors(inputToReset) {
	$(inputToReset).removeClass("has-error");
	$(inputToReset).siblings("span.error-text").remove();
}

jQuery(document).ready(function ($) {
	$(document).foundation();

	var $slider = $(".main-slider");
	var $sliderfade = $(".slide-fade");
	var $story = $(".story-slider");
	var $storyYear = $(".story-year");
	var $attorneys = $(".attorneys-slider");
	var $approach = $(".approach-blocks");
	var $scrollbar = $(".js-scrollbar");
	var $history = $(".history-slider");
	var $commitment = $(".commitment-slider");
	var $tabs = $(".js-tabs");
	var $accordion = $(".js-accordion");
	var $accordionAlt = $(".js-accordion-alt");
	var $totalSlide = $(".js-total-slide");
	var $currentSlide = $(".js-current-slide");

	$("#nav").mmenu(
		{
			extensions: ["position-right"],
			scrollBugFix: true,
			navbar: {
				title: "",
			},
		},
		{
			clone: true,
		}
	);

	console.log("js test 3");

	$slider
		.on("init", function (event, slick) {
			$currentSlide.text(slick.currentSlide + 1);

			$totalSlide.text(slick.slideCount);

			if ($totalSlide.text().length < 2) {
				$totalSlide.text(slick.slideCount);
			} else {
				$totalSlide.text(slick.slideCount);
			}
		})

		.slick({
			fade: true,
			arrows: false,
			autoplay: false,
			autoplaySpeed: 4800,
			infinite: true,
			pauseOnHover: false,
			slidesToShow: 1,
		})
		.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
			$(".js-current-slide").text(nextSlide + 1);
			$(".slick-current .animation").each(function () {
				$(this).removeClass("animated");
				$(this).removeAttr("style");
				$(this).removeAttr("data-delay");
			});
		})
		.on("afterChange", function (event, slick, currentSlide, nextSlide) {
			$(".slick-current .animation").each(function () {
				var animation = $(this).attr("data-animation");
				var iteration = $(this).attr("data-iteration");
				var duration = $(this).attr("data-duration");
				var delay = $(this).attr("data-delay");
				$(this).addClass("animated");
				$(this).css({
					visibility: "visible",
					"animation-duration": duration,
					"animation-name": animation,
					"animation-delay": delay,
					"animation-iteration-count": iteration,
				});
			});
		});

	$(".js-slider-left").click(function () {
		$(".main-slider").slick("slickPrev");
	});

	$(".js-slider-right").click(function () {
		$(".main-slider").slick("slickNext");
	});

	// Apply visibility: visible to the current slick slide
	$(".main-slider .slick-slide.slick-current").css("visibility", "visible");

	$story.slick({
		fade: true,
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 4800,
		asNavFor: $storyYear,
	});

	$sliderfade.slick({
		fade: true,
		arrows: false,
		infinite: true,
		slidesToShow: 1,
	});

	$storyYear.slick({
		fade: true,
		infinite: true,
		slidesToShow: 1,
		asNavFor: $story,
	});

	$attorneys.slick({
		fade: false,
		autoplay: true,
		infinite: true,
		slidesToShow: 1,
	});

	$approach.slick({
		arrows: false,
		fade: false,
		autoplay: true,
		infinite: true,
		slidesToShow: 1,
	});

	$history.slick({
		infinite: true,
		slidesToShow: 4,
		autoplay: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	$commitment.slick({
		fade: true,
		autoplay: true,
		slidesToShow: 1,
	});

	$scrollbar.mCustomScrollbar({
		scrollButtons: { enable: true },
	});

	var $href = $("li.is-active a", $tabs).attr("href");
	$($href).fadeIn().siblings().hide();
	$("li a", $tabs).click(function (event) {
		event.preventDefault();
		$(this).parent("li").addClass("is-active").siblings("li").removeClass("is-active");
		var $href = $(this).attr("href");
		$($href).fadeIn().siblings().hide();
	});

	$(window).resize(function () {
		var $href = $("li.is-active a", $tabs).attr("href");
		$($href).fadeIn().siblings().hide();
	});

	$("li article", $accordion).not("li.is-active article").slideUp();
	// $( 'li.is-active article', $accordion ).slideDown();
	$("li > a", $accordion).click(function (event) {
		event.preventDefault();
		$(this).parent("li").toggleClass("is-active").siblings("li").removeClass("is-active");
		$("li article", $accordion).slideUp();
		$("li.is-active article", $accordion).slideDown();

		var self = this;
		setTimeout(function () {
			theOffset = $(self).offset();
			$("body,html").animate({ scrollTop: theOffset.top - 150 });
		}, 200);
	});

	$("li article", $accordionAlt).not("li.is-active article").slideUp();
	// $( 'li.is-active article', $accordionAlt ).slideDown();
	$("li > div > a", $accordionAlt).click(function (event) {
		event.preventDefault();
		$(this).parents("li").toggleClass("is-active").siblings("li").removeClass("is-active");
		$("li article", $accordionAlt).slideUp();
		$("li.is-active article", $accordionAlt).slideDown();

		var self = this;
		setTimeout(function () {
			theOffset = $(self).offset();
			$("body,html").animate({ scrollTop: theOffset.top - 150 });
		}, 800);
	});

	$(".js-map").click(function (event) {
		event.preventDefault();
		var $map = $(this).attr("href");
		$($map).fadeIn();
		$(this).parent(".address").hide();
	});

	$(".js-map-close").click(function (event) {
		event.preventDefault();
		$(this).parent(".map").hide();
		$(this).parent(".map").siblings(".address").fadeIn();
	});

	$(window).scroll(function () {
		if ($(window).scrollTop() >= 50) {
			$(".header").addClass("is-fixed");
		} else {
			$(".header").removeClass("is-fixed");
		}
	});

	$(".toggle a").click(function (event) {
		event.preventDefault();
		$(".header .nav").toggleClass("is-active").removeClass("is-children");
		$(this).parent().toggleClass("is-active");
		$("body, html").toggleClass("is-active");
		$(".header .nav > div > ul > li.has-children").removeClass("is-active");
	});

	$(".slider-explore").click(function (event) {
		event.preventDefault();
		var $scroll = $(this).parents(".slider").height();
		$("html, body").animate({ scrollTop: $scroll + "px" });
	});

	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return elemBottom <= docViewBottom && elemTop >= docViewTop;
	}

	$(".animate").each(function () {
		if (isScrolledIntoView(this) === true) {
			var animation = $(this).attr("data-animation");
			var iteration = $(this).attr("data-iteration");
			var duration = $(this).attr("data-duration");
			var delay = $(this).attr("data-delay");
			$(this).addClass("animated");
			$(this).css({
				visibility: "visible",
				"animation-duration": duration,
				"animation-name": animation,
				"animation-delay": delay,
				"animation-iteration-count": iteration,
			});
		}
	});

	// header search
	$("a.header-search, .close-it a").click(function () {
		$(".search-bar").slideToggle();
		$("#popsearch").focus();
		$("a.header-search, .close-it a").toggleClass("open");
		return false;
	});

	$(window).scroll(function () {
		$(".animate").each(function () {
			if (isScrolledIntoView(this) === true) {
				var animation = $(this).attr("data-animation");
				var iteration = $(this).attr("data-iteration");
				var duration = $(this).attr("data-duration");
				var delay = $(this).attr("data-delay");
				$(this).addClass("animated");
				$(this).css({
					visibility: "visible",
					"animation-duration": duration,
					"animation-name": animation,
					"animation-delay": delay,
					"animation-iteration-count": iteration,
				});
			}
		});
	});

	/////////////////////////////////
	// Contact Form Error Checking //
	/////////////////////////////////

	//Define constraints for form error checking here; please see: https://validatejs.org/
	var constraints = {
		//Each is the "name" field of the input!
		name: {
			presence: { message: "^Please enter your name" },
		},
		email: {
			presence: { message: "^Please enter your email address" },
			email: { message: "^Invalid email address" },
		},
		phone: {
			presence: { message: "^Please enter your phone number" },
			format: {
				pattern: "^[0-9/-]+$",
				message: "^Phone number can only contain numbers and dashes",
			},
			length: {
				minimum: 7,
				tooShort: "^Please enter at least %{count} characters",
			},
		},
	};

	$(".contact-form").submit(function (event) {
		//On form submit, run validate.js on the form using defined constraints
		errors = validate($(this), constraints);

		//If errors are found, prevent form submission and provide feedback
		if (errors) {
			event.preventDefault();

			$(this)
				.find("input")
				.each(function () {
					//Loop through inputs on the form, finding any error corresponding to this field's "name"
					applyInputErrors($(this), errors);
				});
		}
	});

	$(".contact-form input").on("focusout", function (event) {
		//"Live validation" - Validates form input when it loses focus
		errors = validate($(this).closest("form"), constraints);

		//Look for matching errors specific to this input
		applyInputErrors($(this), errors);
	});

	//Remove input error when it is focused
	$("input").on("focusin", function (event) {
		resetInputErrors($(this));
	});
});

jQuery(window).on("load", function () {
	// Apply visibility: visible to the current slick slide
	$(".main-slider .slick-slide.slick-current").css("visibility", "visible");
});
