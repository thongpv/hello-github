$(document).ready(function() {
	// INIT
	backToTop();
	new WOW().init();
	toolTipBootstrap();

	// FUNCTION
	toggleMenuMobile();
	tableAliCustom();
	turnOffBlindMenu();
});

function toolTipBootstrap() {
	$('[data-toggle="tooltip"]').tooltip(); 
	$('[data-tooltip="tooltip"]').tooltip(); 
}

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
			$(this).closest('tr').addClass('row-selected');
		}
		else
			$(this).closest('tr').removeClass('row-selected');
	});
}

function select2() {
    $('.select2').select2();
}

// Select2 render flag
function getFlags() {
	return {"af":"Afghanistan","al":"Albania","dz":"Algeria","as":"American Samoa","ad":"Andorra","ao":"Angola","ai":"Anguilla","aq":"Antarctica","ag":"Antigua and Barbuda","ar":"Argentina","am":"Armenia","aw":"Aruba","au":"Australia","at":"Austria","az":"Azerbaijan","bs":"Bahamas","bh":"Bahrain","bd":"Bangladesh","bb":"Barbados","by":"Belarus","be":"Belgium","bz":"Belize","bj":"Benin","bm":"Bermuda","bt":"Bhutan","bo":"Bolivia","ba":"Bosnia and Herzegovina","bw":"Botswana","br":"Brazil","io":"British Indian Ocean Territory","vg":"British Virgin Islands","bn":"Brunei","bg":"Bulgaria","bf":"Burkina Faso","mm":"Myanmar","bi":"Burundi","kh":"Cambodia","cm":"Cameroon","ca":"Canada","cv":"Cape Verde","ky":"Cayman Islands","cf":"Central African Republic","td":"Chad","cl":"Chile","cn":"China","cx":"Christmas Island","cc":"Cocos Islands","co":"Colombia","km":"Comoros","cg":"Republic of the Congo","cd":"Democratic Republic of the Congo","ck":"Cook Islands","cr":"Costa Rica","hr":"Croatia","cu":"Cuba","cw":"Curacao","cy":"Cyprus","cz":"Czech Republic","dk":"Denmark","dj":"Djibouti","dm":"Dominica","do":"Dominican Republic","tl":"East Timor","ec":"Ecuador","eg":"Egypt","sv":"El Salvador","gq":"Equatorial Guinea","er":"Eritrea","ee":"Estonia","et":"Ethiopia","fk":"Falkland Islands","fo":"Faroe Islands","fj":"Fiji","fi":"Finland","fr":"France","pf":"French Polynesia","ga":"Gabon","gm":"Gambia","ge":"Georgia","de":"Germany","gh":"Ghana","gi":"Gibraltar","gr":"Greece","gl":"Greenland","gd":"Grenada","gu":"Guam","gt":"Guatemala","gg":"Guernsey","gn":"Guinea","gw":"Guinea-Bissau","gy":"Guyana","ht":"Haiti","hn":"Honduras","hk":"Hong Kong","hu":"Hungary","is":"Iceland","in":"India","id":"Indonesia","ir":"Iran","iq":"Iraq","ie":"Ireland","im":"Isle of Man","il":"Israel","it":"Italy","ci":"Ivory Coast","jm":"Jamaica","jp":"Japan","je":"Jersey","jo":"Jordan","kz":"Kazakhstan","ke":"Kenya","ki":"Kiribati","xk":"Kosovo","kw":"Kuwait","kg":"Kyrgyzstan","la":"Laos","lv":"Latvia","lb":"Lebanon","ls":"Lesotho","lr":"Liberia","ly":"Libya","li":"Liechtenstein","lt":"Lithuania","lu":"Luxembourg","mo":"Macau","mk":"Macedonia","mg":"Madagascar","mw":"Malawi","my":"Malaysia","mv":"Maldives","ml":"Mali","mt":"Malta","mh":"Marshall Islands","mr":"Mauritania","mu":"Mauritius","yt":"Mayotte","mx":"Mexico","fm":"Micronesia","md":"Moldova","mc":"Monaco","mn":"Mongolia","me":"Montenegro","ms":"Montserrat","ma":"Morocco","mz":"Mozambique","na":"Namibia","nr":"Nauru","np":"Nepal","nl":"Netherlands","an":"Netherlands Antilles","nc":"New Caledonia","nz":"New Zealand","ni":"Nicaragua","ne":"Niger","ng":"Nigeria","nu":"Niue","mp":"Northern Mariana Islands","kp":"North Korea","no":"Norway","om":"Oman","pk":"Pakistan","pw":"Palau","ps":"Palestine","pa":"Panama","pg":"Papua New Guinea","py":"Paraguay","pe":"Peru","ph":"Philippines","pn":"Pitcairn","pl":"Poland","pt":"Portugal","pr":"Puerto Rico","qa":"Qatar","re":"Reunion","ro":"Romania","ru":"Russia","rw":"Rwanda","bl":"Saint Barthelemy","ws":"Samoa","sm":"San Marino","st":"Sao Tome and Principe","sa":"Saudi Arabia","sn":"Senegal","rs":"Serbia","sc":"Seychelles","sl":"Sierra Leone","sg":"Singapore","sx":"Sint Maarten","sk":"Slovakia","si":"Slovenia","sb":"Solomon Islands","so":"Somalia","za":"South Africa","kr":"South Korea","ss":"South Sudan","es":"Spain","lk":"Sri Lanka","sh":"Saint Helena","kn":"Saint Kitts and Nevis","lc":"Saint Lucia","mf":"Saint Martin","pm":"Saint Pierre and Miquelon","vc":"Saint Vincent and the Grenadines","sd":"Sudan","sr":"Suriname","sj":"Svalbard and Jan Mayen","sz":"Swaziland","se":"Sweden","ch":"Switzerland","sy":"Syria","tw":"Taiwan","tj":"Tajikistan","tz":"Tanzania","th":"Thailand","tg":"Togo","tk":"Tokelau","to":"Tonga","tt":"Trinidad and Tobago","tn":"Tunisia","tr":"Turkey","tm":"Turkmenistan","tc":"Turks and Caicos Islands","tv":"Tuvalu","ae":"United Arab Emirates","ug":"Uganda","gb":"United Kingdom","ua":"Ukraine","uy":"Uruguay","us":"United States","uz":"Uzbekistan","vu":"Vanuatu","va":"Vatican","ve":"Venezuela","vn":"Vietnam","vi":"U.S. Virgin Islands","wf":"Wallis and Futuna","eh":"Western Sahara","ye":"Yemen","zm":"Zambia","zw":"Zimbabwe"};
}

function getFlagsSelect2(el_ID) {
    var options = '';
    var flags  = getFlags();
    var x;
    for (x in flags) {
        options += '<option value="'+x+'">'+flags[x]+'</option>';
    }
    $(el_ID).html(options);
}

function setCurrency (currency) {
    if (!currency.id) { return currency.text; }
    var $currency = $('<span class="ali-flag-slc ' + currency.element.value + '">' + currency.text + '</span>');
    return $currency;
};

// END: Select2 render flag

function turnOffBlindMenu() {
	$('.wrapper-content').on('click', function() {
		console.log(1);
		$('.open-menu--push').removeClass('open-menu--push open-menu');
	})
}