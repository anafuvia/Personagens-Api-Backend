// =====================================
//   NOSSA API DE CACHORROS
//   Feita com Node.js + Express

//   Agora as fotos NÃO são mais baixadas automaticamente.
//   Elas devem existir manualmente na pasta:

//   data/fotos/
// =====================================

//Importar o framework Express para criar o servidor
const express = require("express");
//Importar o CORS para permitir requisições de outros domínios (ex: front-end)
const cors = require("cors");
//importa o módulo de arquivos do Node
const fs = require("fs");
//importar utilidades para trabalhar com caminhos de arquivos
const path = require("path");
//importar o arquivo JSON que contém as raças e fotos
const personagens = require("./data/perso.json");
//criar a aplicação Express
const app = express();
//definir a porta onde o servidor irá rodar
const PORT = 3000;
//habilitar o uso de CORs na aplicação
app.use(cors());

//===================================
//SERVIR ARQUIVOS ESTÁTICOS
//===================================

//Aqui estamos dizenso para o Express:
//"TUDOOOOOOOO que estiver na pasta data/fotos pode ser acessado pela URL /fotos"
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

//Função que recebe um array e retorna um item aleatório dele
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
// ROTA 1 - Cachorro aleatório
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
// ROTA 2 - Cachorro por raça
//===================================
//http://localhost:3000/api/personagens/:raca

app.get("/api/personagens/:tipo", (req, res) => {

    //pega o parâmetro da URL (ex. husky)
    const tipo = req.params.tipo.toLowerCase();

    //verifica se essa raça existe no JSON
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
    //sortear uma foto da raça solicitada
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