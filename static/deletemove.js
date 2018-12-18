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

    $('#seemove').click(function() {
	console.log("!");
	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});

	$.ajax({

	    url:"/loadmoves3/",
	    type: "POST",
	    data: items,
	    success: function(response2) {
		console.log(response2);
		updatemoves(response2.moves);
	    },
	    error: function(error2){
		console.log(error2);
		
	    }
		    
	});
    });
    
    function updatenames2(names){
	var nlen = names.length;
	for (var i=0; i < nlen; i++){
	    $(".name").append(
		$('<option></option>').val(names[i]).html(names[i])
	    );
	}
    }
    
    function updatemoves(moves){
	var mlen = moves.length;
	$(".move1").empty();
	for (var i=0; i < mlen; i++){
	    $(".move1").append(
		$('<option></option>').val(moves[i]).html(moves[i])
	    );
	}
    }

    $('#delsel').click(function() {

	console.log("attempting to remove entry")
	
	var deleting = $("#getmove :selected")
	var input = $("#getmove :selected").text()
	var name = $("#getname :selected").text()

	$.ajax({

	    url:"/deldbmove/",
	    type: "POST",
	    data: {"name":name,"input":input},
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
