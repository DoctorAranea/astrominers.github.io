let result = 1;
const intervalID = setInterval(work, 1000);

function work() {
    result = result * 2;
    console.log("result=", result);
    if(result >= 32) clearInterval(intervalID);
}

this.addEventListener('message', (ctx) => {
    console.log('ВОРКЕР получил ' + ctx.data);
});

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