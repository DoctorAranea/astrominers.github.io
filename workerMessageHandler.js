function handleWorkerMessage(workerIndex, str) {
    str = str.replace(/'/g, "");

    let request = str.split('#')[0];
    let value = str.split('#')[1];

    switch (request) {
        case 'GetNewBlock':
            console.log('--- МЫ ПЕРЕДАЁМ ВОРКЕРУ БЛОК');
            workers[workerIndex].postMessage('GetNewBlock#' + JSON.stringify(block));
        break;
    }
}