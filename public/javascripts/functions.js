function getCookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}

// форматирует дату по шаблону
function formatDate(formatDate, formatString) {
	var yyyy = formatDate.getFullYear();
	var yy = yyyy.toString().substring(2);
	var m = formatDate.getMonth() + 1;
	var mm = m < 10 ? "0" + m : m;
	var d = formatDate.getDate();
	var dd = d < 10 ? "0" + d : d;

	var h = formatDate.getHours();
	var hh = h < 10 ? "0" + h : h;
	var n = formatDate.getMinutes();
	var nn = n < 10 ? "0" + n : n;
	var s = formatDate.getSeconds();
	var ss = s < 10 ? "0" + s : s;

	formatString = formatString.replace(/yyyy/i, yyyy);
	formatString = formatString.replace(/yy/i, yy);
	formatString = formatString.replace(/mm/i, mm);
	formatString = formatString.replace(/m/i, m);
	formatString = formatString.replace(/dd/i, dd);
	formatString = formatString.replace(/d/i, d);
	formatString = formatString.replace(/hh/i, hh);
	formatString = formatString.replace(/h/i, h);
	formatString = formatString.replace(/nn/i, nn);
	formatString = formatString.replace(/n/i, n);
	formatString = formatString.replace(/ss/i, ss);
	formatString = formatString.replace(/s/i, s);

	return formatString;
}

// список для множественного выбора
$.fn.makeDropDownList = function (callback){
	var block = $(this).parent();

	var select = this;
	select.hide();

	var selectedDoctype = $('#selectedDoctype');
	selectedDoctype.text(select);

	var dropDownList = $('#dropDownList.template')
		.clone()
        .appendTo(block)
        .removeClass('template');

	var list = [];

	$('option', select).each(function(i, elem){
		var elem = $(elem);

		var li = $('<li data-id="' + elem.val() + '" data-bind="click: choiceDoctype"></li>')
			 .text(elem.text())
			 .appendTo($('ul', dropDownList))
			 .show();

		$('<div></div>')
			.appendTo(li)
			.show();

		if (elem.val() != '') list.push(elem.val());
	});


	callback(list);

}

// конвертирует Date в Unix timestamp

function toUnixTime(date) {
	return date.getTime() / 1000;
}

function toGETarray(arr) {
	var GETarray = '';
	var empty = true;
	$(arr).each(function(i, elem){
		if (elem != '')
		{
			GETarray += '&doc_type[]=' + elem;
			empty = false;
		}
	});
	return GETarray;
}
