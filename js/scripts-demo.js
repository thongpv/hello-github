loadSideBar();
loadComponent('tag-input');

function loadSideBar() {
  $.ajax({
    type: "GET",
    url: 'components/sidebar.html',
    data: {},
    dataType: "html",
    success: function (response) {
      document.getElementById("dm-sidebar").innerHTML = response;
    }
  });
}

function loadComponent(_file) {
  $.ajax({
    type: "GET",
    url: 'components/' + _file + '.html',
    data: {},
    dataType: "html",
    success: function (response) {
      console.log('Load js [' + _file + '] ...');
      document.getElementById("dm-main").innerHTML = response;

      jsLoad(_file);
      console.log('Load js complete!')

      // INIT
      encodeHTML();
    }
  });
}

function jsLoad(jsName) {
  switch(jsName) {
    case 'input':
      clearable();
      break;
    case 'input-number':
      clearable();
      autoGroupInputNumber();
      break;
    case 'select2':
      addCSS('sources/select2/select2.min.css');
      addJS('sources/select2/select2.min.js');
      select2();
      select2Flag();
      $('.select_2').addClass('select2');
      $('.select_2').removeClass('select_2');
      $('.select_2-flag').addClass('select2-flag');
      $('.select_2-flag').removeClass('select_2-flag');
      break;
    case 'select-bootstrap':
      addCSS('sources/bootstrap-multiselect/bootstrap-multiselect.css');
      addJS('sources/bootstrap-multiselect/bootstrap-multiselect.js');
      multiSelectBootstrap('bstrapSlc_custom');
      multiSelectBootstrapAdv('bstrapSlc_advance');
      break;
    case 'colorpicker':
      addCSS('sources/bootstrap-colorpicker/bootstrap-colorpicker.min.css');
      addJS('sources/bootstrap-colorpicker/bootstrap-colorpicker.min.js');
      colorpicker();
      $('.input-group-addon_').addClass('input-group-addon');
      $('.input-group-addon_').removeClass('input-group-addon_');
      break;
    case 'tag-input':
      addCSS('sources/tagsinput/jquery.tagsinput.min.css');
      addJS('sources/tagsinput/jquery.tagsinput.js');
      tagsinput();
      $('.tagsinput_').addClass('tagsinput');
      $('.tagsinput_').removeClass('tagsinput_');
      break;
    default:
      // code block
  }
}

function clearable() {
  $('.clearable input[type=text]').on('focus, blur', function() {
    var valClear = $(this).val();
    if(valClear.length) {
      $('.clearable-del').fadeIn();
    } else {
      $('.clearable-del').fadeOut();
    }
  });

  $('.clearable-del').on('click', function() {
    $(this).prev().val('');
    $(this).fadeOut();
  });
}

function autoGroupInputNumber() {
  validateNumber('.group--number:not(".disabled") input[type="text"]');
  
  var intervalLow;
  $('.group--number:not(".disabled") .number__low').on('mousedown', function() {
    var _self = this;
    var valInput = +($(_self).next().val());
    if(valInput > 0) {
      $(_self).next().val(valInput - 1);
      intervalLow = setInterval(function() {
        if($(_self).next().val() > 0) {
          $(_self).next().val(+$(_self).next().val() - 1);
        }
      }, 100);
    }
  });

  $('.group--number:not(".disabled") .number__low').on('mouseup', function() {
    clearInterval(intervalLow);
  });

  var intervalMore;
  $('.group--number:not(".disabled") .number__more').on('mousedown', function() {
    var _self = this;
    var valInput = +($(_self).prev().val());
    $(_self).prev().val(valInput + 1);
    intervalMore = setInterval(function() {
      $(_self).prev().val(+$(_self).prev().val() + 1);
    }, 100);
  });

  $('.group--number:not(".disabled") .number__more').on('mouseup', function() {
    clearInterval(intervalMore);
  });

  $('.group--number:not(".disabled") .number__low, .group--number:not(".disabled") .number__more').on('mouseleave', function() {
    clearInterval(intervalLow);
    clearInterval(intervalMore);
  });
}

function validateNumber(el) {
  $(el).bind('keypress', function(e){
		var keyCode = (e.which)?e.which:event.keyCode
		return !(keyCode>31 && (keyCode<48 || keyCode>57)); 
  });
}

function encodeHTML() {
  $('.encodeHTML').each(function(i, value) {
    var codeHTML = $(value).html();
    $(value).text(codeHTML);
  });
}

function select2() {
  $('.select2').select2();
}

function addCSS(src) {
  $("head").append($("<link rel='stylesheet' href='" + src + "' type='text/css' />"));
}

function addJS(src) {
  $("body").append($("<script src='" + src + "'></script>"));
}

function select2Flag() {
  if ($('.select2').length) $('.select2').select2();

  if ($('.select2-flag').length) {
    getFlagsSelect2('.select2-flag');
    $('.select2-flag').select2({
      placeholder: "What currency do you use?", //placeholder
      templateResult: setCurrency,
      templateSelection: setCurrency,
      maximumSelectionLength: 2
    });
  }
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

function multiSelectBootstrap(eleID) {
  $('#' + eleID).multiselect({
    templates: {
      li: '<li class="checkList"><label class="wrap-custom-box"> one<input type="checkbox" checked="checked"><span class="checkmark-ckb"></span></label></li>'
    }
  });

  $('#' + eleID + ' + div .multiselect-container .wrap-custom-box').each(function (index) {
    $(this).append('<span class="checkmark-ckb"></span>');

    $(this).click(function (e) {
      e.stopPropagation();
    });
  });
}

function multiSelectBootstrapAdv(eleID) {
  $('#' + eleID).multiselect({
    templates: { 
      li: '<li class="checkList"><label class="wrap-custom-box"> one<input type="checkbox" checked="checked"><span class="checkmark-ckb"></span></label></li>'
    },
    enableClickableOptGroups: true,
    enableCollapsibleOptGroups: true,
    enableFiltering: true,
    includeSelectAllOption: true
  });

  $('#' + eleID + ' + div .multiselect-container .wrap-custom-box').each(function (index) {
    $(this).append('<span class="checkmark-ckb"></span>');

    $(this).click(function (e) {
        e.stopPropagation();
    });
  });
}

function colorpicker() {
  $('.colorpicker-init').colorpicker();
}

function tagsinput() {
  $('.tagsinput').tagsInput({
    defaultText: 'keywords'
  });
}