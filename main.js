// let canvas = document.getElementById("canvas");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// canvas.style.background = "#19172C";

// let g = canvas.getContext("2d");


// let circles = [];

// for (var i = 0; i < 10; i++) 
// {
//     let rX = Math.random() * window.innerWidth;
//     let rY = Math.random() * window.innerHeight;
//     let rR = Math.random() * 50 + 10;

//     let circle = new Circle(rX, rY, rR, "white");
//     circles.push(circle);
//     circles[i].draw(g);
// }

let url = window.location.href;
let paramsStr = url.split('?')[1];
let params = new URLSearchParams(paramsStr);

for (let pair of params.entries()) 
{
    let name = pair[0];
    let value = pair[1];

    document.write(name + "=" + value + '; ');
 }