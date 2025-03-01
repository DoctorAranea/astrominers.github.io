function handleSocketMessage(str) {
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
        break;
    }
}