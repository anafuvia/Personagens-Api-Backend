// =====================================
//   NOSSA API DE PERSONAGENS
//   Feita com Node.js + Express

//   Agora as fotos NÃO são mais baixadas automaticamente.
//   Elas são inseridas manualmente na pasta:

//   data/fotos/
// =====================================



// express → cria o servidor
const express = require("express");

//cors → permite o front-end acessar a API
const cors = require("cors");

//fs → mexer com arquivos (não está sendo usado aqui diretamente)
const fs = require("fs");

//path → ajuda a montar caminhos de pasta
const path = require("path");

//personagens.json → arquivo com os dados (tipos + fotos)
const personagens = require("./data/perso.json");

//Cria o servidor (app)
const app = express();

//Define a porta (3000)
const PORT = 3000;

//Ativa o CORS (senão o front não consegue acessar)
app.use(cors());

//===================================
//SERVIR ARQUIVOS ESTÁTICOS
//===================================

//"TUDO que estiver na pasta data/fotos pode ser acessado pela URL /fotos"
app.use(
    "/fotos", //rota pública
    express.static(
        path.join(__dirname, "data/fotos")
        //caminho real da pasta no servidor
    )
);

//===================================
// FUNÇÃO AUXILIAR
//===================================

//pega um array
// escolhe um item aleatório
function sortear(array) {
    //gerar um número aleatório entre 0 e o tamanho do array
    const i = Math.floor(Math.random() * array.length)
    //Math.random() gerar um número aleatório entre 0 e 1
    //array.length pega o tamanho do array (5 itens )
    //Math.floor arrendondar o numero para baixo

    //retorna o item sorteado
    return array[i];
}

//===================================
// ROTAS API
//===================================

//===================================
// ROTA 1 - Personagem aleatório
//===================================

//http://localhost:3000/api/personagens/aleatorio

app.get("/api/personagens/aleatorio", (req, res) => {
    //pegar todas as fotos de todas as raças
    // Object.values pega os valores do objeto
    // flat transforma tudo em um único array
    const todasAsFotos = Object.values(personagens).flat();

    //sortear uma foto aleatória
    const item = sortear(todasAsFotos)

    //Responder para o cliente em formato JSON
    res.json({
        //status da resposta
        status: "sucess",
        //URL da imagem que foi sorteada
        message: `http://10.106.208.37:${PORT}/fotos/${item}`
    });
});

//===================================
// ROTA 2 - personagem por tipo
//===================================
//http://localhost:3000/api/personagens/:tipo

app.get("/api/personagens/:tipo", (req, res) => {

    //pega o parâmetro da URL (ex. batman)
    const tipo = req.params.tipo.toLowerCase();

    //verifica se esse tipo existe no JSON
    if (!personagens[tipo]){
        res.status(404).json({
            //status de erro
            status: "error",
            //mensagem explicando o problema
            message: `Tipo "${tipo}" não encontrado`
        });
        //encerra a execução da rota
        return;
    }
    //sortear uma foto do tipo solicitada
    const item = sortear(personagens[tipo]);
    //retorna a resposta em JSON
    res.json({
        //status de sucesso
        status: "sucess",
        //URL da imagem sorteada
        message: `http://10.106.208.37:${PORT}/fotos/${item}`
    });

});
//===================================
// INICIA O SERVIDOR
//===================================
//iniciar o servidor express
app.listen(PORT, '0.0.0.0',() => {
    console.log(`🚀 Servidor rodando em http://10.106.208.37:${PORT}`);
    console.log(`📂 Coloque as fotos manualmente em: data/fotos/`);
   
})
