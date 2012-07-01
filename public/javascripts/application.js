$(document).ready(function(){


	documents = new Documents(function (data) {

		$("#grid div, #grid span").remove();
		//var data1 = data.toArray();

		$(data).each(function(i, elem){
			var theDate = new Date(elem.creation_date * 1000);
			elem.creation_date = theDate.format('dd.mm.yyyy');
			elem.type_name = $("#doc_type option[value='" + elem.type + "']").text();
		});

		grid = $("#grid").kendoGrid({
			dataSource: { data: data },
			groupable: true,
			//sortable: {
			//	mode: "multiple", // enables multi-column sorting
			//	allowUnsort: true
			//},
			pageable: false,
			columns:[
				{
					field: "creation_date",
					title: "Дата",
					width: 200
				},
				{
					field: "type",
					title: "Название документа",
					width: 200
				},
				{
					field: "document_number",
					title: "Номер документа",
					width: 200
				},
				{
					field: "contractor",
					title: "Название контрагента",
					width: 200
				},
				{
					field: "total",
					title: "Сумма",
					width: 200
				},
				{
					field: "responsible_person",
					title: "Ответственное лицо",
					width: 200
				},
			],
			rowTemplate: kendo.template($("#rowTemplate").html()),
		});

		$('[data-field =' + Grid.get('params.sort_by') + ']').addClass('selected');
		$('#pager').show();

		kendo.bind($('#grid'), Grid);

	});

	$('#doc_type').makeDropDownList(function (list) {
		kendo.bind($('.filter'), Filter);
		Filter.init(list);
	});
	$('body').click(function(elem){
		if ( (elem.target.localName != 'li') && (elem.target.localName != 'span') ) Filter.set('isVisibleDoctypesBox', false);
	});

	datePicker = $('.date').DatePicker({
		//flat:true,
		date:['2008-07-28', '2008-07-31'],
		//format
		position:'bottom',
		calendars:1,
		// locale: 'ru',
		mode:'range',
		starts:1,
		onChange: function(arr1, arr2){
			var from = new Date(arr1[0]);
			var to = new Date(arr1[1]);
			Filter.set('selectedDate', from.format('dd.mm.yyyy') + ' - ' + to.format('dd.mm.yyyy') );
			Grid.set('params.from_date', toUnixTime(from));
			Grid.set('params.to_date', toUnixTime(to));
			Grid.update();
		}
	});




});



Date.prototype.format = function (format) {
	return formatDate(this, format);
}
