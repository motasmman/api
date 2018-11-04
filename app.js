function showTime() {

		
	
	var now = new Date(),

		hours = now.getHours(),
		minutes = now.getMinutes(),
		seconds = now.getSeconds();
	if (hours < 10) {
		hours = '0' + hours
	}
	if (minutes < 10) {
		minutes = '0' + minutes
	}
	if (seconds < 10) {
		seconds = '0' + seconds
	}


	document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;

}

window.onload = function () {

	

	setInterval(showTime, 500);
};








var key = "911c6b6800a91c9cb87b8fcca1acca2f";

if(navigator.geolocation){

	navigator.geolocation.getCurrentPosition(function(position){
		//getting the Longitude and Latitude
		var myLat = position.coords.latitude;
		var myLong = position.coords.longitude;

		//Creating API address based off long / lat
		var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + myLat + "&lon="+myLong + "&APPID=" + key;

		//This goes here so that it will have the correct URL (based off order)
		$.getJSON(url, function(data){
			var weather = JSON.stringify(data.weather[0].description);
			var location = JSON.stringify(data.name);

			//Slice to get rid of quotes in name
			weather = weather.slice(1,-1);
			weather = upperFirstLetter(weather);
			location = location.slice(1,-1);
			
			var tempF = JSON.stringify(Math.round((data.main.temp * 9)/5 - 459.67));
			var tempC = JSON.stringify(Math.round(data.main.temp - 273.15));

			$('#location').html(location);
			$('#currentWeather').html(weather);
			$('#temp').html(tempF + ' &deg; <button id = "units">F</button>');

			$("body").on('click', '#units',  function() {
   				if ($(this).text() == "F") {
      				$("#temp").html(tempC + " &deg; <button id='units'>C</button>");
    					} else {
      				$("#temp").html(tempF + " &deg; <button id='units'>F</button>");
    			} 
  			});
			
			//Code to choose the icon to display	
			if(weather == "Scattered Clouds" || weather == "Broken Clouds" || weather == "Clouds" || weather == "Few Clouds"){
				$(".icon").html('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
			}			
			else if(weather == "Shower Rain" || weather == "Rain"){
				$(".icon").html('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
			}
			else if(weather == "Thunderstorm"){
				$(".icon").html('<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>');
			}else if(weather == "Snow"){
				$(".icon").html('<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>');			
			}else{
				$(".icon").html('<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>');
			}	
		});
	});
}

function upperFirstLetter(str){
	var splitStr = str.toLowerCase().split(' ');
	   for (var i = 0; i < splitStr.length; i++) {
	       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	   }
	   return splitStr.join(' '); 
	}
	
	