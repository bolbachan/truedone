var Grid = kendo.observable({

	params: {
		from_date: false,
		to_date:   false,
		doc_type:  false,
		sort_by:   false,
		direction: false,
		limit:     20,
		page:      1,
	},

	remove:function (e) {
		if (confirm("Are you sure you want to delete this document?")) {
			var options = {
				id:$(e.delegateTarget).data('id'),
				type:$(e.delegateTarget).data('type'),
			}
			documents.remove(options);
		}
	},

	edit:function (e) {
		var options = {
			id:$(e.delegateTarget).data('id'),
			type:$(e.delegateTarget).data('type'),
		}
		documents.edit(options);
	},

	update:function (e) {
		documents.update();
	},

	// конвертирует Unix Timestamp в Date time
	dateUnix:function (data) {
		var theDate = new Date(data * 1000);
		return theDate.format('mm.dd.yyyy');
	},


});
