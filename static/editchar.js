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

	/*
	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});
	*/
	
	
	var name = $("#pickchar :selected")
	
	$.ajax({

	    url:"/editchoose/",
	    type: "POST",
	    data: name,
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

	/*
	$('#dynabutton').append(
	    $('<button>', {
		id: 'submitform',
		text: "Submit Changes"
	    })
	);
	*/

    }

    $('#submitform').click(function() {
	console.log("checking dynamic button response");

	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});
	
	$.ajax({

	    url:"/editsubmit/",
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
