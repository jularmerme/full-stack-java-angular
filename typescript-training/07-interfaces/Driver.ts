import { Coach } from './Coach';
import { CricketCoach } from './CricketCoach';
import { GolfCoach } from './GolfCoach';

let myCricketCoach = new CricketCoach();
let myGolfCoach = new GolfCoach();

// declare an array for coaches ... initially empty
let coaches: Coach[] = [];

// Add the coaches to the array
coaches.push(myCricketCoach);
coaches.push(myGolfCoach);

for (let coach of coaches) {
  console.log(coach.getDailyWorkout());
}
