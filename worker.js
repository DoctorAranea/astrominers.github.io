// let result = 1;
// const intervalID = setInterval(work, 1000);
let isGoingOn = true;
let block;

this.addEventListener('message', (ctx) => {
    str = str.replace(/'/g, "");

    let request = str.split('#')[0];
    let value = str.split('#')[1];

    switch (request) {
        case 'GetNewBlock':
            console.log('--- ВОРКЕР ПОЛУЧАЕТ БЛОК');
            block = JSON.parse(value);
        break;
    }
});

function mine() {
    self.postMessage('GetNewBlock#\f');

    while (block == null) { }

    while (isGoingOn) {
        console.log('Я ПОЛУЧИЛ БЛОК, АЛЛИЛУЯ!' + ' ' + block);
        break;

        // result = result * 2;
        // console.log("result=", result);
        // if(result >= 32) clearInterval(intervalID);
    }
}

mine();