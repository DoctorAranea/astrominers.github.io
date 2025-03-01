function handleSocketMessage(str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ СОКЕТА');
    str = str.replace(/'/g, '');
    
    let request = str.split('#')[0];
    let value = str.split('#')[1];
    value = value.replace(/ /g, "").replace(/[\r\n]/gm, '').slice(0, -1);

    switch (request) {
        case 'GetShareDifficulty':
            console.log('--- МЫ ПОЛУЧАЕМ СЛОЖНОСТЬ');
            difficulty = value;
            console.log('СЛОЖНОСТЬ РАВНА: ' + difficulty);
        break;
        case 'GetNewBlock':
            console.log('--- МЫ ПОЛУЧАЕМ БЛОК');
            block = JSON.parse(value);
            console.log('ГОТОВЫЙ ДЛЯ ОТПРАВКИ БЛОК:');
            console.log(block);

            if (workers != null)
                workers = [];

		    for (let i = 0; i < 1; i++) {
                let worker = new Worker("worker.js");
                worker.addEventListener('message', (ctx) => {
                    let index = i;
                    handleWorkerMessage(index, ctx.data);
                });
                workers.push(worker);
                workers[i].postMessage('GetNewBlock#' + difficulty + ';' + JSON.stringify(block));
            }
        break;
        case 'SendHash':
            let data = JSON.parse(value);
            let result = data['Item1'];
            let code = data['Item2'];
            if (result || code >= 204) {
                sendMessageToWorkers('StopMining#' + true);
            }
        break;
    }
}