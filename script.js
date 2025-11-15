// "Ouvir" eventos (cliques).

//Pegar o valor do input.

//Chamar a API (fazer a requisição).

//Receber os dados (JSON).

//Manipular o DOM (colocar os dados no HTML).

//Salvar e ler do LocalStorage.

const procurarBotao = document.getElementById("botao-busca")
const paisInput = document.getElementById("pais")
const infoPais = document.getElementById("informacoes-paises")
const historicoBusca = document.getElementById("historico-pesquisa")
const limparHistorico = document.getElementById("limpar")

const KEY_LOCAL_STORAGE = "historicoDeBusca"  // chave para o LocalStorage


// Quando clicar no botao de PESQUISAR
procurarBotao.addEventListener("click", () => {
    const nomePais = paisInput.value.trim();
    if (nomePais) {
        buscarPais(nomePais);
    }
});

//Quando clicar no botao de LIMPAR HISTORICO
limparHistorico.addEventListener("click", limparHistorico);

// Quando a lista de historicco for clicada
historicoBusca.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {  // Verifica se o elemento clicado é um item da lista
        const nomePais = event.target.textContent; // Pega o nome do país do item clicado
    }
});


// Quando carrega a página pela primeira vez
document.addEventListener("DOMContentLoaded", historicoBusca);


// funcao para buscar dados na API
async function buscarPais(nomePais){
    


}




