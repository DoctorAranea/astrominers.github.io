// let result = 1;
let isGoingOn = true;
// const intervalID = setInterval(work, 1000);

this.addEventListener('message', (ctx) => {
    console.log('получил ' + ctx.data);
});

function mine() {
    

    while (isGoingOn) {



        // result = result * 2;
        // console.log("result=", result);
        // if(result >= 32) clearInterval(intervalID);
    }
}

mine();

self.postMessage('блины');