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
		console.log("attempting to show moves");
		$.ajax({

		    url:"/loadmoves/",
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
            },
            error: function(error) {
                console.log(error);
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
	console.log("attempting to display move info")
	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});

	$.ajax({

	    url:"/getmoveinfo/",
	    type: "POST",
	    data: items,
	    success: function(response) {
                console.log(response);
		showmoves(response);
            },
            error: function(error) {
                console.log(error);
            }

	});
    });

    function showmoves(stats){
	var keys = Object.keys(stats);
	var values = Object.values(stats);
	$('#showmoves').empty();
	for (var i = 0; i < keys.length; i++) {
	    console.log(keys[i] + ": " + values[i]);
	    if (keys[i] == "active" || keys[i] == "recovery" || keys[i] == "startup") {
		$('#showmoves').prepend(
		    $('<p>').prepend(
			keys[i] + ": " + values[i]
		    )
		);
	    }
	    else {
		$('#showmoves').append(
		    $('<p>').append(
			keys[i] + ": " + values[i]
		    )
		);
	    }
	}
	console.log("tried to show stats");
    }
    
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
		console.log("attempting to show moves");
		$.ajax({

		    url:"/loadmoves2/",
		    type: "POST",
		    data: items,
		    success: function(response2) {
			console.log(response2);
			updatemoves2(response2.moves);
		    },
		    error: function(error2){
			console.log(error2);

		    }
		    
		});
            },
            error: function(error) {
                console.log(error);
            }
	    
	    
	});
	
    });

    function updatemoves2(moves){
	var mlen = moves.length;
	$(".move2").empty();
	for (var i=0; i < mlen; i++){
	    $(".move2").append(
		$('<option></option>').val(moves[i]).html(moves[i])
	    );
	}
    }

    $('#movename2').click(function() {
	console.log("attempting to display move info")
	var items = $("form :input").map(function(index, elm) {
	    return {name: elm.name, type:elm.type, value: $(elm).val()};
	});

	$.ajax({

	    url:"/getmoveinfo2/",
	    type: "POST",
	    data: items,
	    success: function(response) {
                console.log(response);
		showmoves2(response);
            },
            error: function(error) {
                console.log(error);
            }

	});
    });

    function showmoves2(stats){
	var keys = Object.keys(stats);
	var values = Object.values(stats);
	$('#showmoves2').empty();
	for (var i = 0; i < keys.length; i++) {
	    console.log(keys[i] + ": " + values[i]);
	    if (keys[i] == "active" || keys[i] == "recovery" || keys[i] == "startup") {
		$('#showmoves2').prepend(
		    $('<p>').prepend(
			keys[i] + ": " + values[i]
		    )
		);
	    }
	    else {
		$('#showmoves2').append(
		    $('<p>').append(
			keys[i] + ": " + values[i]
		    )
		);
	    }
	}
	console.log("tried to show stats");
    }
    
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


