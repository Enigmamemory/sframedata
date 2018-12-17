$(function() {

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

    $('#charname').click(function() {
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

    function updatemoves(moves){
	var mlen = moves.length;
	$(".move1").empty();
	for (var i=0; i < mlen; i++){
	    $(".move1").append(
		$('<option></option>').val(moves[i]).html(moves[i])
	    );
	}
    }

    $('#movename').click(function() {
	console.log("!");

	/*
	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});
	*/
	
	
	
	var name = $("#pickchar :selected").text()
	var input = $("#pickmove :selected").text()
	
	$.ajax({

	    url:"/movechoose/",
	    type: "POST",
	    data: {"name":name,"input":input},
	    success: function(response) {
                console.log(response);
		updateinput(response);
            },
            error: function(error) {
                console.log(error);
            }
	    
	});
	
    });

    function updateinput(stats) {
	var keys = Object.keys(stats);
	var values = Object.values(stats);
	$('#forminfo').empty();
	for (var i=0; i < keys.length; i++){
	    console.log(keys[i] + ": " + values[i]);
	    $('#forminfo').append(
		$('<p>').append(
		    keys[i] + ": "
		)
	    );
	    $('#forminfo').append(
		$('<input>', {
		    type: keys[i],
		    val: values[i],
		    name: keys[i]
		})
	    );
	}
    }

    $('#submitform').click(function() {
	console.log("checking submit button response");

	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});
	
	$.ajax({

	    url:"/movesubmit/",
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
