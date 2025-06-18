function handleUnityMessage(str) {
    console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ UNITY');
    str = str.replace(/'/g, '');
    str = str.replace(/OVER\f/g, "");
    
    let request = str.split('#')[0];
    let value = str.substring(request.length + 1);
    value = value.replace(/ /g, "").replace(/[\r\n]/gm, '');//.slice(0, -1);

    switch (request) {
        case 'GetEnergy':
            console.log('--- МЫ ПОЛУЧАЕМ ЭНЕРГИЮ');
            minerInfo.energy = value;

            console.log('ЭНЕРГИЯ РАВНА: ' + minerInfo.energy);
            for (let i = 0; i < workers.length; i++) {
                workers[i].postMessage('GetEnergy#' + minerInfo.energy);
            }
        break;
        case 'GetBlockDifficulty':
            console.log('--- МЫ ПОЛУЧАЕМ СЛОЖНОСТЬ');
            minerInfo.difficulty = value;
            console.log('СЛОЖНОСТЬ РАВНА: ' + minerInfo.difficulty);

            for (let i = 0; i < workers.length; i++) {
                workers[i].postMessage('GetBlockDifficulty#' + minerInfo.difficulty);
            }
        break;
        case 'StopMining':
            console.log('ПРИНУДИТЕЛЬНАЯ ОСТАНОВКА ВОРКЕРОВ!!!');
            
            minerInfo.changeMiningActivity(false);
            
            for (let i = 0; i < workers.length; i++) {
                workers[i].postMessage('StopMining#' + true);
            }
            
            minerInfo.changeWorkersActivity(false);
            minerInfo.block = null;
        break;
        case 'StopWorkers':
            console.log('ВЫКЛЮЧЕНИЕ ВОРКЕРОВ!!!');
            
            minerInfo.changeMiningActivity(false);
            
            for (let i = 0; i < workers.length; i++) {
                workers[i].postMessage('Stop#' + true);
            }
            
            clearInterval(intervalGNB);
            minerInfo.changeWorkersActivity(false);
            minerInfo.block = null;
            workers = null;
        break;
    }
}