$(function(){

    $.ajax({

	url: '/DBtestLoad',
	type: 'GET',

	success: function(response){
	    console.log(response);
	    updatenames2(response.names);
	},
	error: function(error){
	    console.log(error);
	}
	
    });

    function updatenames2(names){
	var nlen = names.length;
	for (var i=0; i < nlen; i++){
	    $(".name").append(
		$('<option></option>').val(names[i]).html(names[i])
	    );
	}
    }

    $('#subtraits').click(function() {

	console.log("trying to add char traits")

	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});

	$.ajax({

	    url:"/ctraitsubmit/",
	    type: "POST",
	    data: items,
	    success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
	    
	});
	
    });
    
});
