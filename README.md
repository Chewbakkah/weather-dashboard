# weather-dashboard

This website showcases skills learned during module 6 of The Coding Bootcamp at UT Austin. Javascript was used to write the functions that enable the website to provide weather results for any US city. 

## How Weather Dashboard Is Used
The user should enter a city and state that they wish to see the forecast for. Then hit the arrow icon to execute. The app logs past searches and clicking on them will display the weather for that city. The app also has a clear search feature that will remove the old city searches.

## Failsafes
At this time I have not figured out how to return an error when an invalid city is searched. The API I used to get location data returns the closest guess to what it thinks is the desired city instead.

## Additional Features
* I found the API given to be lacking in one main feature. It would give weather for a city, but not always the exact city you wanted. If you searched Cleveland you would get Ohio. But what if you wanted Cleveland TX? There didn't seem to be a way to specify that. So, I did use a more complicated API provided by the same company. The API called "One Call API" enabled me to specify map coordinates instead of a city name. To get the coordinates of a US city I used a second API called geoapify. This allowed me to get more precise data for my app.
* I also used an app through unsplash to get background photos for my app that centered around a weather theme. These are displayed at random.
* Other items I included were low/high temps for the future weather. 6-Day weather instead of 5, to round out a full week of weather forecast. Textual references to the day of the week for future weather rather than dates (this was much more complicated). A 5 category ranking on the UV index color chart, and finally an option to clear the past search results.



Live Link:
https://chewbakkah.github.io/weather-dashboard/
![weather](https://user-images.githubusercontent.com/92648393/147398968-12e49f0b-90af-4032-8e70-d3c1f72faf8a.JPG)
