const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8081;

app.use(express.json()); // para trabalhar com json no express é necessario essa expressão

async function validaNome(pNome) {
    if (!isNaN(pNome)) {
        throw new Error("Nome inválido, tente novamente!");
    } else {
        if (pNome.length < 3) {
            throw new Error("O nome deve ter no minimo 3 caracteres");
        }
        return pNome;
    }
}

async function validaEmail(pEmail) {
    if (!isNaN(pEmail)) {
        throw new Error("Email inválido, tente novamente!");
    } else {
        if (!pEmail.includes("@")) {
            throw new Error("O email deve ter @");
        }
        return pEmail;
    }
}

async function validaSenha(pSenha) {
    if (pSenha.length < 4) {
        throw new Error("Sua senha deve ter no minimo 4 caracteres");
    }
    return pSenha;
}

app.post("/usuarios", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const nomeValidado = await validaNome(nome);
        const emailValidado = await validaEmail(email);
        const senhaValidado = await validaSenha(senha);

        let conteudo = [];
        const usuario = { nomeValidado, emailValidado, senhaValidado };
        const nomeArquivo = "conteudo.json";

        if (fs.existsSync(nomeArquivo)) {
            conteudo = JSON.parse(fs.readFileSync(nomeArquivo, "utf-8"));
        }
        conteudo.push(usuario);
        fs.writeFileSync(nomeArquivo, JSON.stringify(conteudo, null, 2), "utf-8");

        res.status(201).json({ message: "Arquivo .json criado!" });
    } catch (error) {
        res.status(500).json({message: `Ocorreu um erro ao processar a requisição`,errorMessage: error.message,});
    }
});

app.use((req, res) => {
    res.status(404).send("Pagina não encontrada");
});

app.listen(PORT, () => {
    console.log(`Servidor respondendo em: http://localhost:${PORT}`);
});
