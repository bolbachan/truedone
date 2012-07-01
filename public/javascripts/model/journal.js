function  Journal ()
{


}

Journal.prototype.update = function(filterData){
    $.ajax({
        url: '/ajax/test',
        type: "get",
        data: $.toJSON(data),
        success: function(response)
        {
            var d = $.secureEvalJSON(response);
            var qqq = d.metrics[0];
            a= 9;

        }

    });

}