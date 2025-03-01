function handleWorkerMessage(workerIndex, str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ ВОРКЕРА');
    str = str.replace(/'/g, "");

    let request = str.split('#')[0];
    let value = str.split('#')[1];

    switch (request) {
        case 'SendHash':
            let hash = value;
            socket.send('SendHash#' + difficulty + ':' + minerName + ':' + hash + '\f');
        break;
        // case 'GetNewBlock':
        //     console.log('--- МЫ ПЕРЕДАЁМ ВОРКЕРУ БЛОК');
        //     workers[workerIndex].postMessage('GetNewBlock#' + JSON.stringify(block));
        // break;
    }
}