let lastHashSent = Date.now();
let hashGroup = '';

function handleWorkerMessage(workerIndex, str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ ВОРКЕРА');
    str = str.replace(/'/g, "");

    let request = str.split('#')[0];
    let value = str.substring(request.length + 1);

    switch (request) {
        case 'SendHash':
            if (minerInfo.block == null)
                return;
            
            let hash = value;
            sendHash('SendHash#' + minerInfo.difficulty + ':' + hash + ':' + minerInfo.blockX + ':' + minerInfo.blockY + ':' + minerInfo.isStealth + ':' + minerInfo.block.Id + MESSAGE_SPLITTER);
        break;
        case 'GetBlockDifficulty':
            workers[workerIndex].postMessage('GetBlockDifficulty#' + minerInfo.difficulty);
            break;
        case 'GetNewBlock':
            workers[workerIndex].postMessage('GetNewBlock#' + JSON.stringify(minerInfo.block) + '^' + workerIndex);
            break;
    }
}

let maxCount = 100;
let count = 0;

function sendHash(hashMessage) {
    if (count < maxCount) {
        hashGroup += hashMessage;
        count++;
    }
    
    if ((Date.now() - lastHashSent) / 1000 > .2) {
        socket.send(hashGroup);
        hashGroup = '';

        console.log('ВОРКЕРЫ ОТОСЛАЛИ ' + count + ' ШАР');

        socket.send('GetEnergy#' + MESSAGE_SPLITTER);
        lastHashSent = Date.now();
        count = 0;
    }
}