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
    const criteryTotals = await totalArray(totalCriterys);
    const hasRepeatCritery = await hasDuplicate(criteryTotals);
    const maxMatriz = await Math.max.apply(null, criteryTotals );
    const criteryFix = hasRepeatCritery.length > 0 ? hasRepeatCritery[0] : maxMatriz

    return console.log(`final: ${criteryFix}`)
}

    ;
(async function main() {
    try {
        const qtdBooks = await questionAsync('Digite a quantidade de livros que deseja comprar:');

        return await criteryCalculator(qtdBooks, critery);
    } catch (error) {
        console.log(error);
    } finally {
        terminal.close()
    }

})()
