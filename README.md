# TCM-MakeProject
Think.Code.Make: Make Project by Jake Kessinger &amp; Max Groppe

Our goal for this project is to create a baseball game where you try to dodge the fielders and hit the ball as far as you can. Before we begin, our goal is to create the ball movement, then add fielders, then create a way that the game ends when you lose, add a replay option, and improve the bells and whistles to make it more user-firendly and add pictures/sounds to make it fully immersive. 


At the beginning of our project, we used a base version of flappy bird to create the foundation for our project. This model had  a bird that could move up and 'gravity' that made the bird move down the y axis at a fixed rate. It also had pipes and a primitve collision detector that would reload the page. Because both group members play baseball for Emory and are avid baseball fans, we wanted to make a game that expanded on this base code. The first thing we did was create the baseball and fielders by finding .png files on the web and incorporating them into our code. We then added a baseball field as our background which was also the canvas. This process required re-sizing the images to fit the canvas and be of proper proportions. 

The next thing we wanted to do was alter the gap sizes between fielder gloves and make sure collision detection worked with our pictures. We then added a scoreboard that tracked when the ball would pass between the fielders gloves to add 10 feet to your 'hit' distance. Instead of wanting the page to immediately load into the game and reload the page when you lost, we added a main menu screen and game over screen with buttons that you click to play (again). We also added a second Y variable for the ball movement so that there was acceleration and an actual gravity force would act on the ball. 

The last few things we did were to add sounds to the game to make it more enjoyable and immersive. 

Our biggest struggle on this project was creating random distances between fielders within a range. Doing so would have made the game much more dynamic and changing throughout. We got extremely close to accomplishing this, but could not get it to function properly. 
