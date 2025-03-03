function handleUnityMessage(str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ UNITY');
    str = str.replace(/'/g, '');
    
    let request = str.split('#')[0];
    let value = str.split('#')[1];
    value = value.replace(/ /g, "").replace(/[\r\n]/gm, '').slice(0, -1);

    switch (request) {
        case 'StopMining':
            console.log('ПРИНУДИТЕЛЬНАЯ ОСТАНОВКА ВОРКЕРОВ!!!');
            
            for (let i = 0; i < workers.length; i++) {
                workers[i].postMessage('StopMining#' + true);
            }
        break;
    }
}