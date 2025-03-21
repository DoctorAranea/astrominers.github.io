function handleWorkerMessage(workerIndex, str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ ВОРКЕРА');
    str = str.replace(/'/g, "");
    str = str.replace(/\f/g, "");

    let request = str.split('#')[0];
    let value = str.split('#')[1];

    switch (request) {
        case 'SendHash':
            let hash = value;
            socket.send('SendHash#' + minerInfo.difficulty + ':' + hash + ':' + minerInfo.blockX + ':' + minerInfo.blockY + ':' + minerInfo.isStealth + '\f');
        break;
        case 'GetBlockDifficulty':
            workers[workerIndex].postMessage('GetBlockDifficulty#' + minerInfo.difficulty);
            break;
        case 'GetNewBlock':
            workers[workerIndex].postMessage('GetNewBlock#' + JSON.stringify(minerInfo.block) + '^' + workerIndex);
            break;
    }
}