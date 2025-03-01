console.log('-------------- ВОРКЕР ЗАПУЩЕН --------------');
// let result = 1;
// const intervalID = setInterval(work, 1000);
let isGoingOn = true;
let block;

console.log('-------------- ВОРКЕР ПОДПИСАЛСЯ НА СООБЩЕНИЯ --------------');
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
    console.log('-------------- ВОРКЕР ОЖИДАЕТ БЛОК --------------');
    self.postMessage('GetNewBlock#\f');
    
    while (block == null) { }
    
    console.log('-------------- ВОРКЕР ЗАПУСТИЛ МАЙНИНГ --------------');
    while (isGoingOn) {
        console.log('Я ПОЛУЧИЛ БЛОК, АЛЛИЛУЯ!' + ' ' + block);
        break;

        // result = result * 2;
        // console.log("result=", result);
        // if(result >= 32) clearInterval(intervalID);
    }
}

mine();