# RobotsInSpace

My Program:

Uses .net core 3.1, Mvc, Angular 8, JQuery, AutoMapper, Ioc, Moq includes Command Pattern, and MVC patterns:

It is a 3 tier architecture separating Web, Business and Tests to their own libraries.
I thought of other areas like entering robot instructions via stream, so they are executed against such.
My Application directly uses the Command Pattern which holds an Execute Method, and an ExecuteFromStream method for future enhancements,
Which I both unit tested and passed.

However the application uses Execute, called on the environment variable after posting from Angular client side, and posts via an Angular Service a list of robots and Plane.

The Home Controller consumes this and passes the data to the actual Rover Management Environment which is a separate tier of Business Logic.

Aside from that I do dependency injection of AutoMapper into the Controller, to help Map my view models to Domain models

The business tier is where most of the work gets done, and Chose an Enum to represent Orientation, N, E, S, W, while Move forward just does that..

The unit tests all pass, while my UI is a little tricky and needs more time. I used JQuery’s Dom Manipulation to draw a grid, and to place robots. The UI, takes
Input from the user accordingly, and posts to the server via angular's httpclient class. 

Using tests, I gave instruction to each robot, using Moc Frameworks and got a result that is stored in the Robot as it’s final Position and Destination.

When I post the data to Server, the results are expected to Mirror the  unit tests, and reflected inside the robot in terms of position and orientation having executed against the same code. I think I am beginning to take too much time. I surmmarised the product. And it all works perfectly. 

The GUI is simple and JQuery driven to manipulate the DOM. I first place the robots on the grid plane, give them instructions and Bearings, then post to the server.

The response is got back. I have put in so much effort, and at this point, I am beginning to take time, So will just submit my work with apologies.The product captures my thoughts into how the program should work. I wanted to use jpg images to repalce the text giving robot start positions and included the ui code though commented it out as styling would consume too much time.

So I plot the start and refresh on post back and plot the end location and orientation. 
