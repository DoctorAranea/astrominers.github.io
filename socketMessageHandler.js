function handleSocketMessage(str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ СОКЕТА');
    str = str.replace(/'/g, '');
    
    let request = str.split('#')[0];
    let value = str.split('#')[1];

    switch (request) {
        case 'GetNewBlock':
            console.log('--- МЫ ПОЛУЧАЕМ БЛОК');
            let fBlock = value.replace(/ /g, "").replace(/[\r\n]/gm, '').slice(0, -1);
            block = JSON.parse(fBlock);
            console.log('ГОТОВЫЙ ДЛЯ ОТПРАВКИ БЛОК:');
            console.log(block);

            if (workers != null) {
                workers = [];
            }
		    for (let i = 0; i < 1; i++) {
                let worker = new Worker("worker.js");
                worker.addEventListener('message', (ctx) => {
                    let index = i;
                    handleWorkerMessage(index, ctx.data);
                });
                workers.push(worker);
                workers[i].postMessage('GetNewBlock#' + JSON.stringify(block));
            }
        break;
    }
}