function handleUnityMessage(str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ UNITY');
    str = str.replace(/'/g, '');
    str = str.replace(/\f/g, "");
    
    let request = str.split('#')[0];
    let value = str.split('#')[1];
    value = value.replace(/ /g, "").replace(/[\r\n]/gm, '').slice(0, -1);

    switch (request) {
        case 'GetBlockDifficulty':
            console.log('--- МЫ ПОЛУЧАЕМ СЛОЖНОСТЬ');
            minerInfo.difficulty = value;
            console.log('СЛОЖНОСТЬ РАВНА: ' + minerInfo.difficulty);
            for (let i = 0; i < workers.length; i++) {
                //console.log('ОТПРАВЛЯЮ СЛОЖНОСТЬ ВОРКЕРУ ' + i);
                workers[i].postMessage('GetShareDifficulty#' + minerInfo.difficulty);
            }
        break;
        case 'StopMining':
            console.log('ПРИНУДИТЕЛЬНАЯ ОСТАНОВКА ВОРКЕРОВ!!!');
            
            for (let i = 0; i < workers.length; i++) {
                workers[i].postMessage('StopMining#' + true);
            }
        break;
    }
}