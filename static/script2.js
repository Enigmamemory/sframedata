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
    
    var shownames = document.getElementById("shownames")
    
    $('#test').click(function() {
        $.ajax({
            url: '/DBtestButton',
            type: 'GET',
            success: function(response) {
                console.log(response);
		updatenames(response.names);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    function updatenames(names) {
	shownames.innerHTML = names;
    }

    
    $('#charname').click(function() {
	console.log("!");

	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});
	
	$.ajax({

	    url:"DBtest/getone/",
	    type: "POST",
	    data: items,
	    success: function(response) {
                console.log(response);
		showstats(response);
            },
            error: function(error) {
                console.log(error);
            }
	    
	    
	});
	
    });

    $('#charname2').click(function() {
	console.log("!!");

	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});
	
	$.ajax({

	    url:"DBtest/gettwo/",
	    type: "POST",
	    data: items,
	    success: function(response) {
                console.log(response);
		showstats2(response);
            },
            error: function(error) {
                console.log(error);
            }
	    
	    
	});
	
    });

    function showstats(stats){
	var keys = Object.keys(stats);
	var values = Object.values(stats);
	$('#showstats').empty();
	for (var i = 0; i < keys.length; i++) {
	    console.log(keys[i] + ": " + values[i]);
	    $('#showstats').append(
		$('<p>').append(
		    keys[i] + ": " + values[i]
		)
	    );
	}
	console.log("tried to show stats");
    }

    function showstats2(stats){
	var keys = Object.keys(stats);
	var values = Object.values(stats);
	$('#showstats2').empty();
	for (var i = 0; i < keys.length; i++) {
	    console.log(keys[i] + ": " + values[i]);
	    $('#showstats2').append(
		$('<p>').append(
		    keys[i] + ": " + values[i]
		)
	    );
	}
	console.log("tried to show stats");
    }
    
});


