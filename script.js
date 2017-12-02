/* "Stardate" Application by Nick Kirkpatrick, http://cvramen.com */

var firstdate = new Date(2015,9,11); // The day the journal entries began
var today = new Date(); // Date object containing the time the page loads
var one_day = 1000*60*60*24; // Number of milliseconds in one day

currentday_i = Math.floor((today - firstdate) / one_day); // Number of days that have passed since the first day of entries

/* create a Date object that is the current date at midnight */
var midnighttoday = new Date();
midnighttoday.setHours(0);
midnighttoday.setMinutes(0);
midnighttoday.setSeconds(0);
midnighttoday.setMilliseconds(0);
/* The milliseconds of the current day minus the milliseconds of the current day at midnight. Then divide it by the number of milliseconds in one full day. This tells you what percentage of the current day has passed.*/
var portionday = ((today - midnighttoday) / one_day);
var portionday_short = Math.round(portionday * 100);

var portionday_rounder = portionday_short % 5; // Round the current percentage of the day up to the nearest .05. This is just aesthetic.
if (portionday_rounder != 0) {
	if (portionday_rounder < 3) {
		portionday_short = (portionday_short - portionday_rounder);
	} else {
		portionday_short = (portionday_short + (5 - portionday_rounder));
	}
}

/* Array containing the names of the months */
var tmonth = new Array();
tmonth[0] = "January";
tmonth[1] = "February";
tmonth[2] = "March";
tmonth[3] = "April";
tmonth[4] = "May";
tmonth[5] = "June";
tmonth[6] = "July";
tmonth[7] = "August";
tmonth[8] = "September";
tmonth[9] = "October";
tmonth[10] = "November";
tmonth[11] = "December";

/* Array containing the names of the days of the week */
var tday = new Array();
tday[0]=  "Sunday";
tday[1] = "Monday";
tday[2] = "Tuesday";
tday[3] = "Wednesday";
tday[4] = "Thursday";
tday[5] = "Friday";
tday[6] = "Saturday";


$(document).ready(function() {
/* set Cartesian coordinates to 0 */
var x = 0;
var y = 0;

/* This while loop produces a table with "Stardates" and their corresponding Gregorian dates */
while (x <= currentday_i) { //count the number of days that have passed since the initial day
	
	var broll = Number(firstdate) + (one_day*x);
	var wii = new Date();
	wii.setTime(broll);
		
	var dmonth = tmonth[wii.getMonth()]; // name of current month
	var dday = tday[wii.getDay()]; // name of current day
	var gregorian = dmonth + " " + wii.getDate() + ", " + wii.getFullYear(); // display date in Gregorian time in format e.g. "January 1, 2000"

	if (x % 2 == 0) { // use modulus division to alternate colors of table row
		colorrow = "fbf6b1";
	} else {
		colorrow = "defdd2";
	}
	
	var display_portionday = "";
	if (x == currentday_i) {
		display_portionday = "." + portionday_short;
	}
	
		
		/* Math involving sine functions and exponents */
		var wok = Math.abs((Math.sin(Math.pow(x,.59)*Math.PI)*6 + Math.PI * Math.pow(x,.2))); // best described as a mix of a curved line and a sine wave
		var sec = Math.pow((wok/28),2) * wok; // My research into this function showed that the amount y could increase (for each iteration of x) is anywhere between 0 to 28. This is a mechanism I set up to limit the higher numbers in that range. The higher numbers (e.g. 23, 24, 25, 26, 27, 28) appear less often. 
		y = y + sec + 1; // Increase y by the amount we have calculated. The "+ 1" at the end is to guarantee that y increases by at least 1 each iteration
		y = Math.floor(y); // y needs to be a whole number
		var star = y + 4271; // starting Stardates at 4272; just personal preference
		/* Display Stardate and Gregorian date in format e.g. "Stardate: 2236 Gregorian Date: January 1, 2000 Saturday" */
		var crow ="<tr style='background-color:#"+colorrow+";'><td class='label'>Stardate:</td><td class='data'><a href='"+star+".wav' target='_blank'>"+star+display_portionday+"</a></td><td class='label' id='labelg'>Gregorian Date:</td><td class='data'>"+gregorian+"</td><td class='dayweek'>"+dday+"</td></tr>";
		$("#leg").prepend(crow);
		x++;

}

});