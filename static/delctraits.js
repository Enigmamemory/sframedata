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
    
    $('#seetrait').click(function() {
	console.log("!");
	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});

	$.ajax({

	    url:"/loadtraits/",
	    type: "POST",
	    data: items,
	    success: function(response2) {
		console.log(response2);
		updatetraits(response2.traits);
	    },
	    error: function(error2){
		console.log(error2);
		
	    }
		    
	});
    });

    function updatetraits(traits){
	var mlen = traits.length;
	$(".trait").empty();
	for (var i=0; i < mlen; i++){
	    $(".trait").append(
		$('<option></option>').val(traits[i]).html(traits[i])
	    );
	}
    }

    $('#delsel').click(function() {

	console.log("attempting to remove entry")
	
	var deleting = $("#gettraits :selected")
	var trait = $("#gettraits :selected").text()
	var name = $("#getname :selected").text()

	$.ajax({

	    url:"/deletectrait/",
	    type: "POST",
	    data: {"name":name,"trait":trait},
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
