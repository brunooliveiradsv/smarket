function handleCredentialResponse(response) {
    if (response.credential) {
        const user = jwt_decode(response.credential); // Decodificando o JWT do Google
        const userId = user.sub; // ID único do usuário

        // Armazenar o ID do usuário no localStorage
        localStorage.setItem('userId', userId);
        
        // Oculta a tela de login
        document.getElementById("login").style.display = "none";
        
        // Exibe a tela principal (home)
        document.getElementById("home").style.display = "block";

        // Carregar a lista de compras do usuário logado
        carregarListaCompras(userId);
    } else {
        alert("Falha no login. Tente novamente.");
    }
}

function carregarListaCompras(userId) {
    const listaSalva = JSON.parse(localStorage.getItem(`listaCompras_${userId}`)) || [];

    // Preencher a lista de compras na tela
    listaSalva.forEach(item => {
        let lista = document.getElementById("listaCompras");
        let li = document.createElement("li");
        li.innerHTML = `${item.nome} - ${item.quantidade}x R$${item.preco.toFixed(2).replace(".", ",")} = R$${item.precoTotal.toFixed(2).replace(".", ",")}
            <button class='remove' onclick='removerItem(this, ${item.precoTotal})'><i class="fa-solid fa-trash"></i></button>`;
        lista.appendChild(li);
    });

    // Atualizar o total
    atualizarTotal(listaSalva.reduce((acc, item) => acc + item.precoTotal, 0));
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "869208647497-6iqbee4t38ppfs4nu144fachalo630cl.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled", shape: "pill", size: "large" }  // Atributos de personalização
    );
    google.accounts.id.prompt(); // Também exibe o diálogo do One Tap
};

function deslogarApp() {
    // Desconectar o usuário do Google
    google.accounts.id.disableAutoSelect();

    // Exibir a tela de login
    document.getElementById("home").style.display = "none";
    document.getElementById("login").style.display = "block";
}

const produtosPredefinidos = [
    // Alimentos básicos
    "Arroz", "Feijão", "Macarrão", "Óleo", "Açúcar", "Sal", "Leite", "Pão", "Café", "Farinha", "Carne", "Frango", "Peixe",
    "Margarina Qualy", "Queijo", "Presunto", "Refrigerante Coca-Cola", "Suco Del Valle", "Bolacha", "Manteiga Aviação", "Creme de leite Nestlé", 
    "Leite condensado Moça", "Achocolatado Nescau", "Achocolatado Toddy", "Toddynho", "Maionese Hellmann’s", "Ketchup Heinz", "Mostarda Hemmer",
    "Molho de tomate Pomarola", "Vinagre Castelo", "Molho shoyu Sakura", "Pimenta Tabasco", "Fermento Royal", "Mel", "Granola", "Aveia Quaker",
    "Iogurte Danone", "Requeijão Catupiry", "Batata", "Cebola", "Alho", "Tomate", "Cenoura", "Beterraba", "Alface", "Brócolis", "Couve", "Abobrinha",
    "Chuchu", "Repolho", "Espinafre", "Pepino", "Pimentão", "Abacaxi", "Banana", "Maçã", "Laranja", "Limão", "Morango", "Uva", "Mamão", "Pera", 
    "Melancia", "Manga", "Kiwi", "Maracujá", "Ameixa", "Coco",

    // Congelados e industrializados
    "Hambúrguer Sadia", "Nuggets Perdigão", "Pizza congelada Seara", "Lasanha congelada Sadia", "Batata frita congelada McCain", "Salsicha Perdigão",
    "Linguiça Toscana", "Peito de peru Sadia", "Mortadela Ceratti", "Salmão", "Bacalhau", "Camarão", "Caranguejo", "Siri", "Lula", "Atum enlatado Gomes da Costa", 
    "Sardinha enlatada Coqueiro",

    // Padaria e confeitaria
    "Pão francês", "Pão de forma Pullman", "Pão integral Wickbold", "Pão de hambúrguer", "Pão de hot dog", "Bolo Bauducco", "Torta", "Biscoito",
    "Bolacha recheada Oreo", "Chocolate Nestlé", "Chocolate Lacta", "Chocolate Garoto", "Barra de cereal Nutry", "Bala Fini", "Chiclete Trident",
    "Sorvete Kibon", "Doce de leite Viçosa", "Geleia Queensberry",

    // Bebidas
    "Água mineral Crystal", "Água com gás Perrier", "Suco natural Do Bem", "Suco em pó Tang", "Chá Matte Leão", "Chá de camomila Twinings",
    "Chá verde Lipton", "Cerveja Heineken", "Cerveja Skol", "Vinho Casillero del Diablo", "Vodka Smirnoff", "Whisky Johnnie Walker",
    "Rum Bacardi", "Tequila José Cuervo", "Energético Red Bull",

    // Higiene pessoal
    "Sabonete Dove", "Shampoo Pantene", "Condicionador Seda", "Creme hidratante Nivea", "Desodorante Rexona", "Pasta de dente Colgate",
    "Escova de dente Oral-B", "Fio dental Johnson & Johnson", "Enxaguante bucal Listerine", "Aparelho de barbear Gillette",
    "Creme de barbear Bozzano", "Absorvente Always", "Fraldas descartáveis Pampers", "Papel higiênico Neve", "Cotonete",
    "Perfume Natura", "Lenço umedecido Huggies",

    // Limpeza
    "Detergente Ypê", "Sabão em pó Omo", "Sabão líquido Ariel", "Amaciante Downy", "Água sanitária Qboa", "Desinfetante Pinho Sol",
    "Multiuso Veja", "Limpador de vidro Vidrex", "Esponja Scotch-Brite", "Pano de prato", "Pano de chão", "Balde", "Vassoura",
    "Rodo", "Saco de lixo Embalixo", "Luvas de limpeza Scotch-Brite", "Desengordurante Veja",

    // Pet Shop
    "Ração para cachorro Pedigree", "Ração para gato Whiskas", "Petiscos para cães Doguitos", "Areia para gato Pipicat",
    "Shampoo para pet Sanol", "Coleira", "Brinquedo para pet",

    // Papelaria
    "Caderno Tilibra", "Caneta Bic", "Lápis Faber-Castell", "Borracha Mercur", "Apontador", "Régua", "Tesoura Mundial",
    "Cola Tenaz", "Marcador de texto Stabilo", "Folha sulfite Chamex",

    // Eletrônicos e acessórios
    "Pilhas Duracell", "Carregador de celular Samsung", "Fone de ouvido JBL", "Bateria portátil Anker",
    "Mouse Logitech", "Teclado Redragon", "Papel fotográfico HP",

    // Automotivos
    "Óleo de motor Castrol", "Fluido de freio Bosch", "Lava autos 3M", "Cera automotiva Meguiar's", "Pano de microfibra Vonixx",

    // Outros
    "Bombril", "Vela", "Isqueiro Bic", "Carvão", "Esquenta marmita", "Papel alumínio Wyda", "Papel filme Wyda", "Filtro de café Melitta"
];

function removerItem(botao, precoTotalItem) {
    botao.parentElement.remove();
    atualizarTotal(-precoTotalItem);
}

function atualizarTotal(valor) {
    let totalPreco = document.getElementById("totalPreco");
    let totalAtual = parseFloat(totalPreco.innerText.replace(",", ".")) || 0;
    totalPreco.innerText = (totalAtual + valor).toFixed(2).replace(".", ",");
}

function formatarMoeda(input) {
    let valor = input.value.replace(/[^\d,]/g, '').replace(',', '.');
    if (valor) {
        let valorFormatado = parseFloat(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        input.value = valorFormatado;
    } else {
        input.value = '';
    }
}

// Evento de pressionamento de tecla para adicionar o item ao pressionar "Enter"
document.getElementById('precoInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Impede a ação padrão do Enter
        adicionarItem();  // Chama a função de adicionar item
    }
});

// Função de adicionar item à lista
function adicionarItem() {
    let itemInput = document.getElementById("itemInput");
    let qtddInput = document.getElementById("qtddInput");
    let precoInput = document.getElementById("precoInput");
    let lista = document.getElementById("listaCompras");
    let userId = localStorage.getItem('userId'); // Pega o ID do usuário logado

    let itemNome = itemInput.value.trim();
    let quantidade = parseInt(qtddInput.value);
    let preco = parseFloat(precoInput.value.replace(/[^0-9,]/g, "").replace(",", "."));

    if (!itemNome || isNaN(quantidade) || isNaN(preco) || quantidade <= 0 || preco <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    let precoTotalItem = quantidade * preco;

    // Adicionar o item à lista
    let li = document.createElement("li");
    li.innerHTML = `${itemNome} - ${quantidade}x R$${preco.toFixed(2).replace(".", ",")} = R$${precoTotalItem.toFixed(2).replace(".", ",")} 
        <button class='remove' onclick='removerItem(this, ${precoTotalItem})'><i class="fa-solid fa-trash"></i></button>`;
    lista.appendChild(li);

    // Atualizar o total
    atualizarTotal(precoTotalItem);

    // Salvar o item na lista de compras do usuário
    let listaCompras = JSON.parse(localStorage.getItem(`listaCompras_${userId}`)) || [];
    listaCompras.push({
        nome: itemNome,
        quantidade: quantidade,
        preco: preco,
        precoTotal: precoTotalItem
    });
    localStorage.setItem(`listaCompras_${userId}`, JSON.stringify(listaCompras));

    itemInput.value = "";
    qtddInput.value = "";
    precoInput.value = "";
}

// Função para remover o item e atualizar o total
function removerItem(botao, precoTotalItem) {
    botao.parentElement.remove();
    atualizarTotal(-precoTotalItem);
}

// Função para atualizar o total
function atualizarTotal(valor) {
    let totalPreco = document.getElementById("totalPreco");
    let totalAtual = parseFloat(totalPreco.innerText.replace(",", ".")) || 0;
    totalPreco.innerText = (totalAtual + valor).toFixed(2).replace(".", ",");
}

// Função para filtrar sugestões de produtos
function filtrarSugestoes() {
function filtrarSugestoes() {
    let input = document.getElementById("itemInput");
    let listaSugestoes = document.getElementById("sugestoes");
    let filtro = input.value.toLowerCase().trim();

    listaSugestoes.innerHTML = "";
    if (filtro === "") {
        listaSugestoes.style.display = "none";
        return;
    }

    let sugestoesFiltradas = produtosPredefinidos.filter(produto =>
        produto.toLowerCase().startsWith(filtro) &&
        !itemAdicionado(produto) // Filtra produtos já adicionados
    );

    if (sugestoesFiltradas.length === 0) {
        listaSugestoes.style.display = "none";
        return;
    }

    sugestoesFiltradas.forEach(produto => {
        let item = document.createElement("div");
        item.innerText = produto;
        item.onclick = () => {
            input.value = produto;
            listaSugestoes.innerHTML = "";
            listaSugestoes.style.display = "none";
        };
        listaSugestoes.appendChild(item);
    });

    listaSugestoes.style.display = "block";
}

function itemAdicionado(produto) {
    let lista = document.getElementById("listaCompras");
    for (let li of lista.children) {
        if (li.innerText.includes(produto)) {
            return true; // Produto já adicionado
        }
    }
    return false;
}

function excluirTodos() {
    let lista = document.getElementById("listaCompras");
    lista.innerHTML = "";

    // Reseta os campos de entrada
    document.getElementById("itemInput").value = "";
    document.getElementById("qtddInput").value = "";
    document.getElementById("precoInput").value = "";

    // Reseta o total para 0
    atualizarTotal(-parseFloat(document.getElementById("totalPreco").innerText.replace(",", ".")));
}


