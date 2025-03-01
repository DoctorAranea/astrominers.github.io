
console.log('-------------- ВОРКЕР ЗАПУЩЕН --------------');
let isActivated = false;
let isWaiting = false;
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
            let fBlock = value.replace(/ /g, "").replace(/[\r\n]/gm, '');
            console.log('--- ВОРКЕР ПАРСИТ БЛОК: ' + fBlock);
            block = JSON.parse(fBlock);
        break;
        default:
            console.log('ПРИШЛА КОМАНДА ' + request + ' И Я НЕ ЗНАЮ ЧТО С НЕЙ ДЕЛАТЬ');
        break;
    }
});

console.log('-------------- ВОРКЕР ОЖИДАЕТ БЛОК --------------');
const intervalID = setInterval(mine, 10);

function mine() {
    if (!isGoingOn) {
        clearInterval(intervalID);
    }
    
    if (block == null) {
        return;
    }

    if (!isActivated) {
        console.log('-------------- ВОРКЕР ЗАПУСТИЛ МАЙНИНГ --------------');
        console.log('Я ПОЛУЧИЛ БЛОК, АЛЛИЛУЯ!', block);
        isActivated = true;
    }

    let nonce = '';
    for(let i = 0; i < 19; i++) 
        nonce += Math.floor(Math.random() * 10);
    generateHash(nonce);
    clearInterval(intervalID);
}

function generateHash(nonce) {
    console.log('> Пытаюсь сгенерировать хэш на блок: ', block);
    console.log('> nonce: ', nonce);

    let data = getBlockData(nonce);
    console.log('> data: ', data);
    
    let hash = getSHA256Hash(data);
    console.log('> hash: ', hash);
}

function getBlockData(nonce) {
    return `'${block.Id}${block.Data}${block.CreatedOn}${block.User}${block.PreviousHash}${block.Reward}${nonce}'`;
}

const getSHA256Hash = async (input) => {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray
      .map((item) => item.toString(16).padStart(2, "0"))
      .join("");
    return hash;
  };


// self.postMessage('блины');

// console.log('-------------- ВОРКЕР ЗАПУЩЕН --------------');
// let isGoingOn = true;
// let block;

// console.log('-------------- ВОРКЕР ПОДПИСАЛСЯ НА СООБЩЕНИЯ --------------');
// this.addEventListener('message', (str) => {
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