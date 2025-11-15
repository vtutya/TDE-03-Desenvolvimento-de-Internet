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
const botaoLimparHistorico = document.getElementById("limpar")

const KEY_LOCAL_STORAGE = "historicoDeBusca"  // chave para o LocalStorage


// Quando clicar no botao de PESQUISAR
procurarBotao.addEventListener("click", () => {
    const nomePais = paisInput.value.trim();
    if (nomePais) {
        buscarPais(nomePais);
    }
});

//Quando clicar no botao de LIMPAR HISTORICO
botaoLimparHistorico.addEventListener("click", limparHistorico);

// Quando a lista de historicco for clicada
historicoBusca.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {  // Verifica se o elemento clicado é um item da lista
        const nomePais = event.target.textContent; // Pega o nome do país do item clicado
        buscarPais(nomePais);
    }
});


// Quando carrega a página pela primeira vez
document.addEventListener("DOMContentLoaded", carregarHistorico);


// funcao para buscar dados na API
async function buscarPais(nomePais){
    const URL_API = `https://restcountries.com/v3.1/name/${nomePais}`;
    
    try {
        const resposta = await fetch(URL_API);

        if (!resposta.ok) {
            throw new Error("Erro na requisição" + resposta.status);
    }
    
    const dados = await resposta.json();
    displayPaisInfo(dados[0]);
    salvarHistorico(dados[0].name.common);

} catch (error){
    console.error("Erro ao buscar país:", error);
    infoPais.innerHTML = "<p>País não encontrado. Tente novamente.</p>";
    }
}


// funcao para exibir os dados no html 

function displayPaisInfo(pais){
    const populacao = pais.population.toLocaleString('pt-BR');

    const capital = pais.capital ? pais.capital[0] : "N/A";

    const infoHtml = `
        <h3>${pais.name.common}</h3>
        <img src="${pais.flags.png}" alt="Bandeira de ${pais.name.common}">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>População:</strong> ${populacao}</p>
    `;

    infoPais.innerHTML = infoHtml;
}

// funcao para gerenciar o historico de busca
function pegarHistorico(){

    const historicco = localStorage.getItem(KEY_LOCAL_STORAGE);

    return historicco ? JSON.parse(historicco) : [];
}


// funcao para salvar um novo item no historico
function salvarHistorico(nomePais){
    const historico = pegarHistorico();

    const filtrarHistorico = historico.filter(item => item.toLowerCase() !== nomePais.toLowerCase());

    filtrarHistorico.unshift(nomePais);

    const novoHistorico = filtrarHistorico.slice(0, 5);

    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(novoHistorico));

    carregarHistorico();
}

// funcao para carregar o historico 
function carregarHistorico(){

    const historico = pegarHistorico();

    historicoBusca.innerHTML = "";

    historico.forEach(nomePais => {
        const li = document.createElement("li");
        li.textContent = nomePais;
        historicoBusca.appendChild(li);
    });
}

// funcao para limpar o historico
function limparHistorico(){
    localStorage.removeItem(KEY_LOCAL_STORAGE);
    carregarHistorico();
}






