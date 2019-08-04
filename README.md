# Train-Scheduler
This is a program that takes user input for a train name, desination, start time, and frequency of the train
and then displays onto a table, the train name, destination, frequency, the next arrival, and the minutes away from 
its next arrival.


https://nickgluch.github.io/Train-Scheduler/


The goal of this project was to have a way to put in a Train and information and its start time and frequency, and display that onto a table, and calculate the next time of its next arrival and how many minutes away the train is until that arrival.

My approach of this was to capture the needed information about the train and its start time and frequency and store that information into a database, and then create a new row for the train with that stored information and use moment.js to format the next arrival time, and to take in the current time and compare that to the arrival time to calculate how many minutes the next train arrival is.
