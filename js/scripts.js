$(document).ready(function() {
	// INIT
	backToTop();
	new WOW().init();

	// FUNCTION
	toggleMenuMobile();
	tableAliCustom();
});

function backToTop() {
	if ($('#back_to_top').length) {
	    var scrollTrigger = 100, // px
	        backToTop = function () {
	            var scrollTop = $(window).scrollTop();
	            if (scrollTop > scrollTrigger) {
	                $('#back_to_top').fadeIn();
	            } else {
	                $('#back_to_top').fadeOut();
	            }
	        };
	    backToTop();
	    $(window).on('scroll', function () {
	        backToTop();
	    });
	    $('#back_to_top').on('click', function (e) {
	        e.preventDefault();
	        $('html,body').animate({
	            scrollTop: 0
	        }, 700);
	    });
	}
}

function select2() {
    $('.select2').select2();
}

// data-toggle: push-menu - over-menu
function toggleMenuMobile() {
	$('.sidebar-toggle').on('click', function() {
		var _data_toggle = $(this).attr('data-toggle');
		if(_data_toggle == "push-menu") {
			$('body').toggleClass('open-menu open-menu--push');
		} 
		else if( _data_toggle == "over-menu") {
			
			$('.blind-wall-menu').toggleClass('open');
		}
	});
}


function tableAliCustom() {
	$('.table-ali-custom .row-select').on('change', function() {
		if( $(this).is(":checked") ) {
			$(this).parent().parent().parent().addClass('row-selected');
		}
		else
			$(this).parent().parent().parent().removeClass('row-selected');
	});
}