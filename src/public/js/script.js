$(document).ready(function() {
	$('body').hide();
	$('body').fadeIn(1000);
	
	/*  Get Links  */
	var linkString = $('abruzzi').text();

	/*  Clear Page  */
	$('abruzzi').empty();

	/*  Create Array from linkString  */
	var linkArray = linkString.split("\n");

	/*  Go thru Array  */
	var i;
	var count = 1;
	var open = false;
	var html = '';

	for(i in linkArray) {

		/*  Get line  */
		var line = jQuery.trim(linkArray[i]);

		// If line is empty, skip
		if(!line)
			continue;
		
		/* If starts with &p, must be a separator*/
		if(line.substr(0,1)=='p'){
			/*first line*/
			if(line.substr(1,1)!='1'){
				html = html + '</div></div>';
				open = false;
			}
			
			html = html + '<div id="'+line.substr(1,1)+'" class="separator">';
			count++;
			continue;
		}

		/* If it doesn't start with http,  must be a block title */
		else if(line.substr(0,4) != 'http') {
			if(count > 2 && open)
				html = html + '</div>';
			html = html + '<div class="block" style="display:none"><h1>' + line + '</h1><ul>';
			open=true;
			count++;
			continue;
		}

		/*  Split URL and Title  */
		var lineArray = line.split("|| ");
		var url = lineArray[0];
		var title = lineArray[1];
		var color = lineArray[2];

		/*  Add HTML code  */
		if(new_window)
			html = html + (color != null?'<li class="'+color+'">':'<li>')+'<a href="' + url + '" target="_blank">' + title + '</a></li>'
		else
			html = html + '<li><a href="' + url + '">' + title + '</a></li>'
	}

	/*  Add generated content to page  */
	html = html + '</ul></div></div>';
	$("#principal").append(html);
	$(".block").slideDown("slow");

	/*  Clock  */
	if(show_clock) {
		// Add empty '#clock' div
		$("#footer").append('<div id="clock" style="display:none;"></div>');

		// Update clock
		setInterval('updateClock()', 1000);
		
		$("#clock").fadeIn("slow");
	}
	/* Date */
	if(show_date) {
		// add date div
		$('#footer').append('<div id="date" style="display:none;"></div>');
		var months = new Array(
			'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'
		);
		var date = new Date();
		$('#date').append(date.getDate() + " " + months[date.getMonth()] + " " + (date.getYear()+1900));
		$("#date").fadeIn("slow");
		
	}
	/*dancer*/
	if(show_dancer) {
		$('#footer').append('<div style="display:none" class="anime-counter-animated mememe" id="Stats10_content"><div>');
		$("#Stats10_content").show("");
	}
	
	/*show search*/
	if(show_search){
		showSearch();
	}
});
function showSearch(){
	var search = '<div  class="searches" id="searches" style="display:none">';
	
	if(google)
		search += '<form id="search" method="get" action="http://www.google.com/search"><input type="text" id="g" name="q" size="35" maxlength="255" value="" placeholder="Buscar en Google" /></form>';
	if(yahoo)
		search += '<form id="search" method="get" action="http://search.yahoo.com/search"><input type="text" id="y" name="p" size="35" maxlength="255" value="" placeholder="Buscar en Yahoo" /></form>';
	if(wikipedia)
		search += '<form id="search" method="get" action="http://www.wikipedia.org/w/index.php"><input type="text" id="w" name="search" size="35" maxlength="255" value="" placeholder="Buscar en Wikipedia" /></form>';
	if(flickr)
		search += '<form id="search" method="get" action="http://www.flickr.com/search"><input type="text" id="da" name="q" size="35" maxlength="255" value="" placeholder="Buscar en Flickr" /></form>';
	if(deviantart)
		search += '<form id="search" method="get" action="http://browse.deviantart.com/"><input class="search" type="text" id="da" name="q" size="35" maxlength="255" value="" placeholder="Buscar en devianArt" /></form>';

	search += '</div>';
    
	$("#principal").append(search);
    
	if(focus_search) {
		$(document.getElementById ('searches').firstChild.firstChild).focus();
	}

	$("#searches").show('slow');
}
/*  Clock & Date */
function updateClock() {
	var currentTime = new Date ();
	var currentHours = currentTime.getHours ();
	var currentMinutes = currentTime.getMinutes ();
	var currentSeconds = currentTime.getSeconds ();

	// Pad the minutes and seconds with leading zeros, if required
	currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
	currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

	// Choose either "AM" or "PM" as appropriate
	var timeOfDay = (currentHours < 12) ? "AM" : "PM";

	// Convert an hours component of "0" to "12"
	currentHours = (currentHours == 0) ? 12 : currentHours;

	// Compose the string for display
	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

	// Fill '#clock' div with time
	$("#clock").html(currentTimeString);    
}