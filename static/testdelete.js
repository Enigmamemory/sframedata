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

    $('#delsel').click(function() {

	console.log("attempting to remove entry")
	
	var deleting = $("#getname :selected")

	$.ajax({

	    url:"/deldbentry/",
	    type: "POST",
	    data: deleting,
	    success: function(response){
		console.log(response);
		deleting.remove();
	    },
	    error: function(error) {
		console.log(error);
	    }
	    
	});

    });
    
});
