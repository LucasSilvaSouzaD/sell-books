const readline = require('readline');
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const functionToPromise = (func, ...args) => {
    return new Promise(resolve => func(...args, resolve))
}

const questionFunc = terminal.question.bind(terminal);
const questionAsync = msg => functionToPromise(questionFunc, `${msg}\n`)
// critérios de venda
const critery = [
    { 'prcBook': 0.25, 'prcFixed': 7.50 },
    { 'prcBook': 0.50, 'prcFixed': 2.50 },
    { 'prcBook': 0.65, 'prcFixed': 1.50 },
]

function totalArray(array) {
    return array.map((item) => item.total)
}

function hasDuplicate(array) {
    return array.filter((e, i, a) => a.indexOf(e) !== i)
}


const criteryCalculator = async (qtdBooks, arrayCritery) => {
    const totalCriterys = arrayCritery.map(critery => Object.assign(critery, { total: (critery.prcBook * qtdBooks) + critery.prcFixed }))
    
    // separar o retorno dos calculos em matriz
    const criteryTotals = await totalArray(totalCriterys);

    // retornar o duplicado caso tenha
    const hasRepeatCritery = await hasDuplicate(criteryTotals);

    // máximo do retorno
    const maxMatriz = await Math.max.apply(null, criteryTotals );

    // caso tenha o valor repetido retorna ele, se não retorna o máximo dos critério
    const criteryFix = hasRepeatCritery.length > 0 ? hasRepeatCritery[0] : maxMatriz

    return console.log(`final: ${criteryFix}`)
}

    ;
(async function main() {
    try {
        const qtdBooks = await questionAsync('Digite a quantidade de livros que deseja comprar:');
        return await criteryCalculator(qtdBooks, critery);
        // console.log(result)
    } catch (error) {
        console.log(error);
    } finally {
        terminal.close()
    }

})()
