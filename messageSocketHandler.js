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
            initializeWorkers();
        break;
        case 'SendHash':
            let data = JSON.parse(value);
            let result = data['Item1'];
            let code = data['Item2'];

            if (code == 202) {
                for (let i = 0; i < workers.length; i++) {
                    workers[i].postMessage('GetBlockDifficulty#' + data['Item3']['Item1']);
                }
                // minerInfo.sendMessageToUnity('GetBlockDifficulty#' + MESSAGE_SPLITTER);
            }

            if (result || code >= 204) {
                for (let i = 0; i < workers.length; i++) {
                    workers[i].postMessage('StopMining#' + true);
                }
            }

            minerInfo.sendMessageToUnity('GetEnergy#' + MESSAGE_SPLITTER);
        break;
    }
}

function initializeWorkers() {
    minerInfo.sendMessageToUnity('StartMining#' + minerInfo.isStealth);

    if (workers == null || workers.length == 0) {
        workers = [];
        for (let i = 0; i < 100; i++) {
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