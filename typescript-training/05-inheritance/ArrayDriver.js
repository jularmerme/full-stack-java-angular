"use strict";
exports.__esModule = true;
var shape_1 = require("./shape");
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
var myShape = new shape_1.Shape(10, 15);
var myCircle = new Circle_1.Circle(5, 10, 20);
var myRectangle = new Rectangle_1.Rectangle(0, 0, 3, 7);
// Declare an array of Shapes
var theShapes = [];
// Add the shapes to the array
theShapes.push(myShape);
theShapes.push(myCircle);
theShapes.push(myRectangle);
for (var _i = 0, theShapes_1 = theShapes; _i < theShapes_1.length; _i++) {
    var shape = theShapes_1[_i];
    console.log(shape.getInfo());
}
