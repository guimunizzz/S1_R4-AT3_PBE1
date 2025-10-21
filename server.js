const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json()); // para trabalhar com json no express é necessario essa expressão

async function validaNome(pNome) {
    if (pNome.trim().length === 0) { // trim para tirar os espaços como no mysql
        throw new Error('Reveja o nome digitado!');
    }
    return pNome;
}


async function validaNumeros(pNotas) {
    if (pNotas.some(elemento => typeof elemento != 'number')) { //parametro "some" para verificar se existe 1 elemento que nao seja number
        throw new Error('Revise o array de média');
    }
    return pNotas;
}

async function mediaNotas(pNotas) {
    const notasValidadas = await validaNumeros(pNotas);
    const soma = notasValidadas.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0); // reduce funciona como se fosse o +=, soma o acumulador com o valor atual

    return soma / notasValidadas.length;
}

async function aprovacaoNotas(mediaNotas) {
    if (mediaNotas > 6) {
        return "aprovada";
    }
    return "aprovada"
}

app.post('/alunos', async (req,res) => {
    try {
        const {nome, notas} = req.body;

        const nomeValidado = await validaNome(nome)
        const resultadoMedia = await mediaNotas(notas);
        const resultadoAprovacao = await aprovacaoNotas(resultadoMedia)

        res.status(201).json({resultado: `Olá ${nomeValidado}, o resultado da media de suas notas é: ${resultadoMedia}, e você foi ${resultadoAprovacao}!`})
    } catch (error) {
        res.status(500).json({message: `Ocorreu um erro ao processar a requisição`, errorMessage: error.message});
    }
})


app.use((req, res) => {
    res.status(404).send("Pagina não encontrada");
})

app.listen(PORT, ()=> {
    console.log(`Servidor respondendo em: http://localhost:${PORT}`);
})
