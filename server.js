const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json()); // para trabalhar com json no express é necessario essa expressão

async function somaArray(pArray) {
    const filtraArray = pArray.filter(elemento => typeof elemento === 'number');
    const somaFiltro = filtraArray.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
    return somaFiltro;
}

app.post('/soma', async (req,res) => {
    try {
        const {arraySoma} = req.body;
        const resultadoSoma = await somaArray(arraySoma);

        res.status(201).json({resultado: `O resultado da soma do array é ${resultadoSoma}`});
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