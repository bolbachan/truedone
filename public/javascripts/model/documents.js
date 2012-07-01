var Documents = function(onUpdate)
{
	this.onUpdate = onUpdate;
}


// формирует параметры запроса из json-подобного объекта
Documents.prototype.getUrl = function (params, requestType) {
	var url = '/api/';

	switch (requestType) {
		//case 'POST':
			//url += params.type + '/' + params.id;
			//break;
		case 'GET':
			url += 'documents/?';
			if (params != undefined) {
				url += 'page=' + params.page;
				url += '&limit=' + params.limit;
				if (params.from_date) url += '&from_date=' + params.from_date;
				if (params.to_date) url += '&to_date=' + params.to_date;
				if (params.doc_type) url += toGETarray(params.doc_type);
				if (params.sort_by) url += '&sort_by=' + params.sort_by;
				if (params.direction) url += '&direction=' + params.direction;
			}
			break;
		case 'EDIT':
			url += params.type + '/' + params.id + '/edit';
			break;
		case 'DELETE':
			url += params.type + '/' + params.id;
			break;
	}

	return url;
}



Documents.prototype.setOptions = function (options) {
	this.options = options;
}

Documents.prototype.update = function () {
	var self = this;
	$.ajax({
		url: self.getUrl(Grid.get('params'), 'GET'),
		type: 'GET',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('ACCESS_TOKEN', getCookie('at'));
		},
		success: function (response, ststus, xhr) {
			var total = xhr.getResponseHeader('X-Total-Documents');
			Filter.setPageCount(total);
			self.onUpdate(response);
		},
		statusCode: {403: function (req) {
			var location = req.getResponseHeader('AjaxLocation');
			window.location = '/';
		}},
		statusCode: {404: function (req) {
			$('#grid').html('<span class="empty">Данные отсутствуют. Уточните параметры фильтра.</span>');
			$('#pager').hide();
			Filter.setPageCount(0);
			Filter.set('page', 1);
			Grid.set('params.page', 1);
		}}

	});
}

Documents.prototype.remove = function (options) {
	var self = this;
	$.ajax({
		url:self.getUrl(options, 'DELETE'),
		type:'DELETE',
		beforeSend:function (xhr) {
			xhr.setRequestHeader('ACCESS_TOKEN', getCookie('at'));
		},
		success:function (response) {
			self.update(Grid.params);
		},
		statusCode:{403:function (req) {
			var location = req.getResponseHeader('AjaxLocation');
			window.location = '/';
		}},
	});
}

Documents.prototype.edit = function (options) {
	var self = this;
	$.ajax({
		url:self.getUrl(options, 'EDIT'),
		type:'GET',
		beforeSend:function (xhr) {
			xhr.setRequestHeader('ACCESS_TOKEN', getCookie('at'));
		},
		success:function (response) {
			self.update();
		},
		statusCode:{403:function (req) {
			var location = req.getResponseHeader('AjaxLocation');
			window.location = '/';
		}}

	});
}