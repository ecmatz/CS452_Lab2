CS 452 Lab 2 -- Animation and Interaction
Ethan Matzek
9/21/23

For this lab, I began by creating a simple shape using the techniques we used in
class, (setting up canvas, creating vertex and fragment shaders, and drawing the shape.
I made a shape with 5 vertices, although it definitely is not a normal looking
pentagon. I also made sure to separate my init, draw, and setup functions to make the program
more modular and to make animation easier on myself. I then followed along with the slides from class
and implemented rotation via a button, using the rotation formula we learned.
After making sure that was working, I created the mouse movement just as we did in class,
with the slides helping me out when I got lost. The primary challenge for me with this lab was
coming up with the velocity and acceleration. I started by copying the wasd movement we did in class,
knowing I'd have to tweak it to meet he requirements. The first change I made was implementing a global
variable called direction, which kept track of the direction using the wasd keypresses, instead of updating
velocity like we did in class. I then created another variable, acceleration, and initialized it to 1.
I created a function called move, which I called in the draw shape function (so it would happen over and over)
which updated the shapes clipX or ClipY each anim frame based on the velocity multiplied by acceleration.
Acceleration I implemented through an increase and decrease function which either increased it by one, or decrease it by one.
In the decrease function, I had to add a check for if the acceleration was less than 0 that I would set it to 0 (to prevent direction change).
I then added the buttons for these two functions, and messed around testing the result.
