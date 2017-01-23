/* */ 
var tc = require('./termcolor').define();
console.green("this is green");
console.cyan({hoge: "foobar"}, "multi args? N.P.");
console.log(tc.colors);
console.eblue("blue color, to stderr");
console.eyellow(["yellow color", "to stderr"], "of course, any value is acceptable");
var red = tc.red("red string");
var purple = tc.purple("purple string");
console.log(red, purple);
console.color("green", "text with green color");
console.ecolor("red", "text with red color", "to stderr");
console.bold("hoge");
console.bold("green", "BOLD GREEN");
console.purpleB("with B");
console.eyellowB("e [color] B");
