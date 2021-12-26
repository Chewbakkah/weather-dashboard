# weather-dashboard

This website showcases skills learned during module 4 of The Coding Bootcamp at UT Austin. Javascript was used to write the functions that enable the website to provide a quiz consisting of dynamically created elements. 

## How the CodingQuiz Is Used
The user should enter a user name and hit start. If no user name is given then it will be requested at the end of the game as well. Answering questions correctly will cause the user's score to increase, while answering incorrectly will cause them to lose time on the clock. At the end the user's score and user name is recorded in local storage. A top 10 high scores list is provided. I limited this to 10 scores to keep the list from growing too long.

## Failsafes
In order to pass the user's info to the local storage a user name is required. This isn't forced on start, but is forced at the end before they can see the scoreboard.

## Javascript Used
* Let/Const/Var Variables
* document query selector
* JSON.parse and JSON.stringify
* Math.floor and Math.random
* classList.add/remove
* For/While Loops
* If/Else Statements
* getElementById


Live Link:
https://chewbakkah.github.io/weather-dashboard/
