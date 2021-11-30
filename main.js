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

// filtrar e calcular critério de venda
const calcCritery = async (qtdBooks, arrayCritery) => {
    const totalCriterys = arrayCritery.map(critery => Object.assign(critery, { total: (critery.prcBook * qtdBooks) + critery.prcFixed }))
    console.log(totalCriterys)

    const totals = totalCriterys.map((critery) => critery.total)
    const removeNumberRep = [... new Set(totals)]

    let difference = removeNumberRep.filter(x => !totals.includes(x));
    console.log(difference)
        // const criteryFilter = await arrayCritery.filter(item => qtdBooks >= item.qtdMinimum && qtdBooks <= item.qtdMaximum);
    // return criteryFilter ? criteryFilter[0].prcBook * qtdBooks + criteryFilter[0].prcFixed
    //     : parseInt(qtdBooks) > 10 ? qtdBooks * offerAboveTen
    //         : oneBook;
}

    ;
(async function main() {
    try {
        const qtdBooks = await questionAsync('Digite a quantidade de livros que deseja comprar:');
        const result = await calcCritery(qtdBooks, critery);
        console.log(result)
    } catch (error) {
        console.log(error);
    } finally {
        terminal.close()
    }

})()
