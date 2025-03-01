
console.log('-------------- ВОРКЕР ЗАПУЩЕН --------------');
let isGoingOn = true;
let block;

console.log('-------------- ВОРКЕР ПОДПИСАЛСЯ НА СООБЩЕНИЯ --------------');
this.addEventListener('message', (ctx) => {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ HTML');
    let str = ctx.data;
    str = str.replace(/'/g, "");

    let request = str.split('#')[0];
    let value = str.split('#')[1];

    switch (request) {
        case 'GetNewBlock':
            console.log('--- ВОРКЕР ПОЛУЧАЕТ БЛОК');
            let fBlock = value.replace(/ /g, "").replace(/[\r\n]/gm, '').slice(0, -1);
            block = JSON.parse(fBlock);
            startMining();
        break;
        default:
            console.log('ПРИШЛА КОМАНДА ' + request + ' И Я НЕ ЗНАЮ ЧТО С НЕЙ ДЕЛАТЬ');
        break;
    }
});

function startMining() {
    console.log('-------------- ВОРКЕР ЗАПУСТИЛ МАЙНИНГ --------------');
    while (isGoingOn) {
        console.log('Я ПОЛУЧИЛ БЛОК, АЛЛИЛУЯ!' + ' ' + block);
        break;
    }
}

// self.postMessage('блины');

// console.log('-------------- ВОРКЕР ЗАПУЩЕН --------------');
// let isGoingOn = true;
// let block;

// console.log('-------------- ВОРКЕР ПОДПИСАЛСЯ НА СООБЩЕНИЯ --------------');
// self.addEventListener('message', (str) => {
//     console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ HTML');
//     str = str.replace(/'/g, "");

//     let request = str.split('#')[0];
//     let value = str.split('#')[1];

//     switch (request) {
//         case 'GetNewBlock':
//             console.log('--- ВОРКЕР ПОЛУЧАЕТ БЛОК');
//             block = JSON.parse(value);
//             startMining();
//         break;
//         default:
//             console.log('ПРИШЛА КОМАНДА ' + request + ' И Я НЕ ЗНАЮ ЧТО С НЕЙ ДЕЛАТЬ');
//         break;
//     }
// });

// function requestBlock() {
//     console.log('-------------- ВОРКЕР ОЖИДАЕТ БЛОК --------------');
//     self.postMessage('GetNewBlock#\f');
// }

// function startMining() {
//     console.log('-------------- ВОРКЕР ЗАПУСТИЛ МАЙНИНГ --------------');
//     while (isGoingOn) {
//         console.log('Я ПОЛУЧИЛ БЛОК, АЛЛИЛУЯ!' + ' ' + block);
//         break;
//     }
// }

// requestBlock();