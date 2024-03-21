// Importa a função necessária do SDK que você precisa
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js";

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDN0WlEmtMlHzUq45yCek0pbEeltOQwgg4",
    authDomain: "data-base-80fab.firebaseapp.com",
    databaseURL: "https://data-base-80fab-default-rtdb.firebaseio.com",
    projectId: "data-base-80fab",
    storageBucket: "data-base-80fab.appspot.com",
    messagingSenderId: "249880587688",
    appId: "1:249880587688:web:6334bec1e1691c02f9c19d",
    measurementId: "G-YB2GS3ZKQ5"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Função para retornar os dados da tabela "pecas" com base no código
function getDadosDaTabelaPecasPorCode(code) {
    // Referência ao nó "pecas"
    const database = getDatabase();
    const pecasRef = ref(database, 'pecas');

    // Recuperar os dados uma vez
    return get(pecasRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const dados = snapshot.val();
                // Procura pelo dado com o código especificado
                for (const key in dados) {
                    if (dados[key].code === code) {
                        return dados[key];
                    }
                }
                console.log("Nenhum dado encontrado com o código especificado.");
                return null;
            } else {
                console.log("Nenhum dado encontrado na tabela 'pecas'.");
                return null;
            }
        })
        .catch((error) => {
            console.error("Erro ao recuperar os dados da tabela 'pecas':", error);
            return null;
        });
}

const btn = document.querySelector("#send");
btn.addEventListener("click", function(e){

    e.preventDefault();

    const name = document.querySelector("#name");
    const preco = document.querySelector("#preco");
    const desconto = document.querySelector("#desconto");
    const value = name.value;
    const x = parseInt(preco.value);
    const y = parseInt(desconto.value);
    const z = x - y;

    const porcentagem = (y/x) * 100;
    document.getElementById("x").innerText = x;
    // document.getElementById("y").innerText = y;
    document.getElementById("z").innerText = z;
    document.getElementById("porcentagem").innerText = porcentagem.toFixed(0);
    console.log(value);
    console.log(x);
    console.log(y);
    console.log(z);
    console.log(porcentagem.toFixed(2), "%")

    // Exemplo de uso da função para obter os dados da tabela "pecas" com base no código
const codigoProcurado = parseInt(value);
getDadosDaTabelaPecasPorCode(codigoProcurado)
    .then((dados) => {
        if (dados) {
            // Atribui os dados a variáveis individuais
            const code = dados.code;
            const location = dados.location;
            const descricao = dados.peca;
            const url = `assets/img/${code}.png`;

            // Use as variáveis conforme necessário
            console.log("Código:", code);
            console.log("Localização:", location);
            console.log("Descrição:", descricao);

            document.getElementById("codigo").innerText = code;
            // document.getElementById("localizacao").innerText = location;
            document.getElementById("descricao").innerText = descricao;
            document.getElementById("img").src = url;
        } 
    });
});

document.getElementById('salvarBotao').addEventListener('click', function() {
    // Obtém a referência para a div
    const div = document.getElementById('minhaDiv');

    // Cria um canvas temporário
    const canvas = document.createElement('canvas');
    canvas.width = div.offsetWidth;
    canvas.height = div.offsetHeight;

    // Obtém o contexto 2D do canvas
    const ctx = canvas.getContext('2d');

    // Desenha o conteúdo da div no canvas
    const htmlContent = div.innerHTML;

    // Desenha o conteúdo HTML da div no canvas
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Obtém a URL da imagem a partir do canvas
        const dataURL = canvas.toDataURL('image/png');

        // Cria um elemento <a> para fazer o download da imagem
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'conteudoDaDiv.png';
        link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(htmlContent)));
});