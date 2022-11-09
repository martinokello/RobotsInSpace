# RobotsInSpace

My Program:

Uses .net core 3.1, Mvc, Angular 8, JQuery, AutoMapper, Ioc, Moq includes Command Pattern, and MVC patterns:

It is a 3 tier architecture separating Web, Business and Tests to their own libraries.
I thought of other areas like entering robot instructions via stream, so they are executed against such.
My Application directly uses the Command Pattern which holds an Execute Method, and an ExecuteFromStream method for future enhancements,
Which I both unit tested and passed.

However the application uses Execute, called from Angular client side and posts via an Angular Service a list of robots and Plane.

The Home Controller consumes this and passes the data to the actual Rover Management Environment which is a separate tier of Business Logic.

Aside from that I do dependency injection of AutoMapper into the Controller, to help Map my view models to Domain models

The business tier is where most of the work gets done, and Chose an Enum to represent Orientation, N, E, S, W, while Move forward just does that..

The unit tests all pass, while my UI is a little tricky and needs more time. I used JQuery’s Dom Manipulation to draw a grid, and to place robots. The UI, takes
Input from the user accordingly, and posted to the server via Angular HttpClient.

The response is returned, but for some reason doesn’t mirror the unit tests. During tests, I gave instruction to each robot, using Moc Frameworks and got a result that is stored in the Robot as it’s final Position and Destination.

When I post the data to Server, the results are expected to Mirror the  unit tests, but the data never seems to change inside the robot in terms of position and orientation having executed against the same code. I think I am beginning to take too much time trying to work out why, so will have to submit my code and review later.

The GUI is simple and JQuery driven to manipulate the DOM. I first place the robots on the grid plane, give them instructions and Bearings, then post to the server.

The response is got back, but it appears the robots still have the same positions and orientations. I have put in so much effort, and at this point, I am beginning to take too much time trying to figure out what the unit tests have failed to capture. So will just submit my work with apologies.
