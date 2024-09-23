import { Shape } from './Shape';
import { Circle } from './Circle';
import { Rectangle } from './Rectangle';

let myCircle = new Circle(5, 10, 20);
let myRectangle = new Rectangle(0, 0, 3, 7);

// Declare an array of Shapes
let theShapes: Shape[] = [];

// Add the shapes to the array
theShapes.push(myCircle);
theShapes.push(myRectangle);

for (let shape of theShapes) {
  console.log(shape.getInfo());
  console.log(shape.calculateArea());
  console.log();
}
