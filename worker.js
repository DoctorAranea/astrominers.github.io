const MESSAGE_SPLITTER = 'OVER\f';

//console.log('-------------- ВОРКЕР ЗАПУЩЕН --------------');
let id = -1;
let isActivated = false;
let isGoingOn = false;
let energy = 0;
let difficulty = 0;
let block;

const chars = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'yo',
    'ж': 'zh',
    'з': 'z',
    'и': 'ee',
    'й': 'y',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'oo',
    'ф': 'f',
    'х': 'kh',
    'ц': 'c',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'shya',
    'ъ': 'uwu',
    'ы': 'i',
    'ь': 'nya',
    'э': 'e',
    'ю': 'yoo',
    'я': 'ya',
    '№': '#'
}

//console.log('-------------- ВОРКЕР ' + id + ' ПОДПИСАЛСЯ НА СООБЩЕНИЯ --------------');
this.addEventListener('message', (ctx) => {
    if (id == 0) console.log('СРАБОТАЛ ОБРАБОТЧИК СООБЩЕНИЙ ОТ HTML У ВОРКЕРОВ');

    let str = ctx.data;
    str = str.replace(/'/g, "");

    let request = str.split('#')[0];
    let value = str.substring(request.length + 1);

    switch (request) {
        case 'RemoveDifficulty':
            if (id == 0) console.log('--- ВОРКЕРЫ ОЧИСТИЛИ СЛОЖНОСТЬ ');
            difficulty = 0;
        break;
        case 'GetEnergy':
            if (id == 0) console.log('--- ВОРКЕРЫ ПОЛУЧИЛИ ЭНЕРГИЮ ' + value);
            energy = value;
        break;
        case 'GetBlockDifficulty':
            if (id == 0) console.log('--- ВОРКЕРЫ ПОЛУЧИЛИ СЛОЖНОСТЬ ' + value);
            difficulty = value;
        break;
        case 'GetNewBlock':
            let fBlock = value.replace(/ /g, "").replace(/[\r\n]/gm, '');
            let split = fBlock.split('^');

            if (id == -1)
                id = split[1];

            if (id == 0) console.log('--- ВОРКЕРЫ ПОЛУЧАЮТ ИНФОРМАЦИЮ ');

            block = JSON.parse(split[0]);
            isGoingOn = true;
            break;
        case 'StopMining':
            if (id == 0) console.log('--- ВОРКЕРЫ ОСТАНАВЛИВАЮТ МАЙНИНГ ');

            isGoingOn = false;
            block = null;
            isActivated = false;

            if (id == 0) console.log('-------------- ВОРКЕРЫ ОЖИДАЮТ БЛОК --------------');
        break;
        case 'Stop':
            if (id == 0) console.log('--- ВОРКЕРЫ ВЫКЛЮЧАЮТСЯ');

            isGoingOn = false;
            block = null;
            isActivated = false;

            clearInterval(mineIntervalID);
            clearInterval(blockIntervalID);
            clearInterval(difficultyIntervalID);
        break;
        default:
            console.log('ПРИШЛА КОМАНДА ' + request + ' И ВОРКЕРЫ НЕ ЗНАЮТ ЧТО С НЕЙ ДЕЛАТЬ: ' + id);
        break;
    }
});

console.warn('-------------- ИНИЦИАЛИЗАЦИЯ ВОРКЕРА --------------');

var blockIntervalID = setInterval(getBlock, 1000);
var difficultyIntervalID = setInterval(getDifficulty, 1000);
var mineIntervalID = setInterval(mine, 1);

function getBlock() {
    if (isGoingOn && block == null)
        self.postMessage('GetNewBlock#' + true);
}

function getDifficulty() {
    if (isGoingOn && difficulty == 0)
        self.postMessage('GetBlockDifficulty#' + true);
}

function mine() {
    if (!isGoingOn || block == null || difficulty == 0)
    {
        return;
    }

    // if (energy < 100)
    //     return;

    if (!isActivated) {
        //if (id == 0) console.log('-------------- ВОРКЕРЫ ЗАПУСТИЛИ МАЙНИНГ --------------');
        // console.log('Я ПОЛУЧИЛ БЛОК, АЛЛИЛУЯ!', block);
        isActivated = true;
    }

    let nonce = '';
    for(let i = 0; i < 19; i++) 
        nonce += Math.floor(Math.random() * 10);

    generateHash(nonce);
}

function generateHash(nonce) {
    let data = getBlockData(nonce);
    let hash = sha256(data);
    
    let hashDecem = BigInt('0x' + hash);
    if (hashDecem % BigInt(difficulty.toString()) == BigInt('0')) {
        self.postMessage('SendHash#' + hash);
    }
}

function getBlockData(nonce) {
    let str = `${block.Id}${block.Data}${block.CreatedOn}${block.User}${block.PreviousHash}${block.Reward}${nonce}`;
    str = str.toLowerCase();

    let fStr = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        let newChar = chars[char];
        if (newChar != null) {
            fStr += newChar;
        } else {
            fStr += char;
        }
    }

    return fStr;
}

function sha256(value) {
    function rightRotate(value, amount) {
        return (value>>>amount) | (value<<(32 - amount));
    };
    
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; // Used as a counter across the whole file
    var result = ''

    var words = [];
    var asciiBitLength = value[lengthProperty]*8;
    
    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    var hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    /*/
    var hash = [], k = [];
    var primeCounter = 0;
    //*/

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
            k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
        }
    }
    
    value += '\x80' // Append Ƈ' bit (plus zero padding)
    while (value[lengthProperty]%64 - 56) value += '\x00' // More zero padding
    for (i = 0; i < value[lengthProperty]; i++) {
        j = value.charCodeAt(i);
        if (j>>8) return; // ASCII check: only accept characters in range 0-255
        words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
    words[words[lengthProperty]] = (asciiBitLength)
    
    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
        var oldHash = hash;
        // This is now the undefinedworking hash", often labelled as variables a...g
        // (we have to truncate as well, otherwise extra entries at the end accumulate
        hash = hash.slice(0, 8);
        
        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            // Expand the message into 64 words
            // Used below if 
            var w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e&hash[5])^((~e)&hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                    )|0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
            
            hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1)|0;
        }
        
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i])|0;
        }
    }
    
    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i]>>(j*8))&255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};