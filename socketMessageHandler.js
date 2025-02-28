function handleMessage(str) {
    str = str.replace(/'/g, "");
    
    let request = str.split('#')[0];
    let value = str.split('#')[1];

    switch (request) {
        case 'GetNewBlock':
            console.log('--- МЫ ПОЛУЧАЕМ БЛОК');
            block = JSON.parse(value);
        break;
    }
}