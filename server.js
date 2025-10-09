const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json()); // para trabalhar com json no express é necessario essa expressão

app.post('/soma', async (req,res) => {
    try {
        

        res.status(201).json({resultado: `Olá ${nome}, o resultado da media de suas notas é: ${resultadoMedia}, e você foi ${resultadoAprovacao}!`})
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