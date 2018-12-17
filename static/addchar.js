$(function() {

    $("#addconfirm").click(function() {

	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});

	$.ajax({

	    url:"/addchar/add/",
	    type:"POST",
	    data:items,
	    success: function(response) {
		console.log(response);
	    },
	    error: function(error){
		console.log(error)
	    }
	    
	});
	
    })
    
});
