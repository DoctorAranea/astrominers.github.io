function handleWorkerMessage(workerIndex, str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ ВОРКЕРА');
    str = str.replace(/'/g, "");

    let request = str.split('#')[0];
    let value = str.split('#')[1];

    switch (request) {
        case 'SendHash':
            let hash = value;
            socket.send('SendHash#' + minerInfo.difficulty + ':' + minerInfo.username + ':' + hash + '\f');
        break;
    }
}