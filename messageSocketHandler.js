function handleSocketMessage(str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ СОКЕТА');
    str = str.replace(/'/g, '');
    str = str.replace(/OVER\f/g, "");
    
    let request = str.split('#')[0];
    let value = str.substring(request.length + 1);
    value = value.replace(/ /g, "").replace(/[\r\n]/gm, '');//.slice(0, -1);

    switch (request) {
        case 'GetNewBlock':
            console.log('--- МЫ ПОЛУЧАЕМ БЛОК');
            minerInfo.block = JSON.parse(value);
            console.log('ГОТОВЫЙ ДЛЯ ОТПРАВКИ БЛОК:');
            console.log(minerInfo.block);

            if (minerInfo.isMiningActivated && !minerInfo.isMining)
                initializeWorkers();
        break;
        case 'SendHash':
            let data = JSON.parse(value);
            let result = data['result'];
            let code = data['code'];
            let difficulty = data['difficulty'];
            let x = data['x'];
            let y = data['y'];

            if (minerInfo.blockX != x || minerInfo.blockY != y)
                break;

            if (code == 202) {
                for (let i = 0; i < workers.length; i++) {
                    workers[i].postMessage('GetBlockDifficulty#' + difficulty);
                }
            }

            if (result || code >= 204) {
                
                for (let i = 0; i < workers.length; i++) {
                    workers[i].postMessage('StopMining#' + true);
                }
                
                minerInfo.block = null;
                minerInfo.changeWorkersActivity(false);
            }

            minerInfo.sendMessageToUnity('GetEnergy#' + MESSAGE_SPLITTER);
        break;
    }
}

function initializeWorkers() {
    minerInfo.changeWorkersActivity(true);
    
    minerInfo.sendMessageToUnity('StartMining#' + minerInfo.isStealth);
    
    if (workers == null || workers.length == 0) {
        workers = [];

        console.log('КОЛИЧЕСТВО ВОРКЕРОВ: ' + minerInfo.threadsCount);

        for (let i = 0; i < minerInfo.threadsCount; i++) {
            let worker = new Worker("worker.js");
            worker.addEventListener('message', (ctx) => {
                let index = i;
                handleWorkerMessage(index, ctx.data);
            });
            workers.push(worker);
            workers[i].postMessage('GetNewBlock#' + JSON.stringify(minerInfo.block) + '^' + i);
        }
    } else {
        for (let i = 0; i < workers.length; i++) {
            workers[i].postMessage('GetNewBlock#' + JSON.stringify(minerInfo.block) + '^' + i);
        }
    }
}