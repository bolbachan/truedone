var Filter = kendo.observable({

	allList:[],
	checkedListIds:[],
	checkedListNames:'',
	isVisibleDatapicker: false,
	isVisibleDoctypesBox: false,
	pageCount: 0,
	page:1,
	selectedDate:'все',

	init:function (list) {
		var self = this;
		this.set('checkedListIds', list);
		this.allList = list;
		this.updateDoctypes();
		$(document).on('click','.pageItem', function() {
			$('.pageItem').removeClass('selected');
			$(this).addClass('selected');
			Grid.set('params.page', $(this).data('id'));
			self.set('page', $(this).data('id'));
			Grid.update();
		});

		$(document).on('click','.k-header', function() {
			var currentSort = Grid.get('params.sort_by');
			var newSort = $(this).data('field');
			if (newSort == currentSort) {
				if (Grid.get('params.direction') == false) Grid.set('params.direction', -1);
				else Grid.set('params.direction', false);
			} else {
				Grid.set('params.sort_by', newSort);
				Grid.set('params.direction', false);
			}

			//self.set('page', $(this).data('id'));
			Grid.update();
		});
	},

	choiceDoctype:function (e) {
		var val = $(e.delegateTarget).data('id');
		if ( (this.checkedListIds.indexOf(val) < 0) && (val != '') )
		{ // добавить в список
				this.checkedListIds.push($(e.delegateTarget).data('id'));
				$('li[data-id =' + val + '] div').show();
		} else if (val != '')
		{  // удалить из списка
				this.checkedListIds.splice(this.checkedListIds.indexOf(val), 1);
				$('li[data-id =' + val + '] div').hide();
		} else if (this.checkedListIds.length == 0)
		{  // добавить все
			this.set('checkedListIds', this.allList);
			$('#doctypesBox li div').show();
		} else
		{  // удалить все
			this.set('checkedListIds', []);
			$('#doctypesBox li div').hide();
		}


		this.updateDoctypes();
	},

	updateDoctypes:function () {
		var tempList = '';
		$(this.checkedListIds).each(function (i, elem) {
			if (i > 0) tempList += ', ';
			tempList += $('[data-id =' + elem + ']').text();

		})
		if (this.checkedListIds.length == this.allList.length)
		{
			this.set('checkedListNames', 'все')
			Grid.set('params.doc_type', false);
		}
		else {
			this.set('checkedListNames', tempList);
			Grid.set('params.doc_type', this.get('checkedListIds'));
		}
		Grid.update();
	},

	visibleDoctypesBox:function (val) {
		if (this.isVisibleDoctypesBox == true) this.set('isVisibleDoctypesBox', false);
		else this.set('isVisibleDoctypesBox', true);
	},

	visibleDatepicker:function (val) {
		if (this.isVisibleDatapicker == true) {
			this.set('isVisibleDatapicker', false);
			datePicker.DatePickerHide();
		}
		else {
			this.set('isVisibleDatapicker', true);
			datePicker.DatePickerShow();
		}
	},

	setLimit:function (e) {
		var val = $(e.delegateTarget).data('id');
		Grid.set('params.limit', val);
		Grid.update();
	},

	pageLeft:function (e) {
		$(".pageItem[data-id='" + (this.get('page') - 1) + "']").click();
	},

	pageRight:function (e) {
		$(".pageItem[data-id='" + (this.get('page') + 1) + "']").click();
	},

	setPageCount:function (total) {
		var count = total / Grid.get('params.limit');
		this.set('pageCount', count.toFixed());
	},

	makePager:function () {
		var html = '';
		var page =  this.get('page');
		var count = this.get('pageCount');
		var from = 1;
		var to = (count > 20)? 21 : count;

		if ( (page > 10) && (count > 20) ){
			from = page - 10;
			to = page + 10;
		}
		if (to > count) {
			from = from - (to - count);
			to = count;
		}

		for (var i = from; i < to; i++) {
			if (i == this.get('page')) html += '<li class="pageItem selected" data-id="' + i + '">' + i + '</li>';
			else        html += '<li class="pageItem" data-id="' + i + '">' + i + '</li>';
		}

		if (html == '') $('.pager').hide();
		else $('.pager').show();
		return html;
		//if (i == this.get('currentPage'))
	}

});
