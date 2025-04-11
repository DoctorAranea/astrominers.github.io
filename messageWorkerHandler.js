let lastHashSent = Date.now();
let hashGroup = '';

function handleWorkerMessage(workerIndex, str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ ВОРКЕРА');
    str = str.replace(/'/g, "");

    let request = str.split('#')[0];
    let value = str.substring(request.length + 1);

    switch (request) {
        case 'SendHash':
            let hash = value;
            sendHash('SendHash#' + minerInfo.difficulty + ':' + hash + ':' + minerInfo.blockX + ':' + minerInfo.blockY + ':' + minerInfo.isStealth + MESSAGE_SPLITTER);
        break;
        case 'GetBlockDifficulty':
            workers[workerIndex].postMessage('GetBlockDifficulty#' + minerInfo.difficulty);
            break;
        case 'GetNewBlock':
            workers[workerIndex].postMessage('GetNewBlock#' + JSON.stringify(minerInfo.block) + '^' + workerIndex);
            break;
    }
}

function sendHash(hashMessage) {
    hashGroup += hashMessage;
    
    if ((Date.now() - lastHashSent) / 1000 > 5) {
        socket.send(hashGroup);
        hashGroup = '';
        lastHashSent = Date.now();
    }
}