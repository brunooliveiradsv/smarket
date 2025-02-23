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
    "Creme de barbear Bozzano", "Absorvente Always", "Fraldas descartáveis Pampers", "Papel higiênico Neve", "Cotonete Johnson’s",
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


function adicionarItem() {
    let itemInput = document.getElementById("itemInput");
    let qtddInput = document.getElementById("qtddInput");
    let precoInput = document.getElementById("precoInput");
    let lista = document.getElementById("listaCompras");
    let totalPreco = document.getElementById("totalPreco");
    
    let itemNome = itemInput.value.trim();
    let quantidade = parseInt(qtddInput.value);
    let preco = parseFloat(precoInput.value.replace(/[^0-9,]/g, "").replace(",", "."));
    
    if (!itemNome || isNaN(quantidade) || isNaN(preco) || quantidade <= 0 || preco <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }
    
    let precoTotalItem = quantidade * preco;
    
    let li = document.createElement("li");
    li.innerHTML = `${itemNome} - ${quantidade}x R$${preco.toFixed(2).replace(".", ",")} = R$${precoTotalItem.toFixed(2).replace(".", ",")} 
        <button class='remove' onclick='removerItem(this, ${precoTotalItem})'><i class="fa-solid fa-trash"></i></button>`;
    lista.appendChild(li);
    
    atualizarTotal(precoTotalItem);
    
    itemInput.value = "";
    qtddInput.value = "";
    precoInput.value = "";
}

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
    let valor = input.value.replace(/[^0-9,]/g, "").replace(/,(?=.*?,)/g, "");
    if (valor) {
        input.value = `R$${valor}`;
    } else {
        input.value = "";
    }
}

function filtrarSugestoes() {
    let input = document.getElementById("itemInput");
    let listaSugestoes = document.getElementById("sugestoes");
    let filtro = input.value.toLowerCase().trim();
    
    listaSugestoes.innerHTML = "";
    if (filtro === "") {
        listaSugestoes.style.display = "none";
        return;
    }

    let sugestoesFiltradas = produtosPredefinidos.filter(produto => produto.toLowerCase().startsWith(filtro));

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
    let totalPreco = document.getElementById("totalPreco");
    
    let itemNome = itemInput.value.trim();
    let quantidade = parseInt(qtddInput.value);
    let preco = parseFloat(precoInput.value.replace(/[^0-9,]/g, "").replace(",", "."));
    
    if (!itemNome || isNaN(quantidade) || isNaN(preco) || quantidade <= 0 || preco <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }
    
    let precoTotalItem = quantidade * preco;
    
    let li = document.createElement("li");
    li.innerHTML = `${itemNome} - ${quantidade}x R$${preco.toFixed(2).replace(".", ",")} = R$${precoTotalItem.toFixed(2).replace(".", ",")} 
        <button class='remove' onclick='removerItem(this, ${precoTotalItem})'><i class="fa-solid fa-trash"></i></button>`;
    lista.appendChild(li);
    
    atualizarTotal(precoTotalItem);
    
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

// Função para formatar o valor como moeda
function formatarMoeda(input) {
    let valor = input.value.replace(/[^0-9,]/g, "").replace(/,(?=.*?,)/g, "");
    if (valor) {
        input.value = `R$${valor}`;
    } else {
        input.value = "";
    }
}

// Função para filtrar sugestões de produtos
function filtrarSugestoes() {
    let input = document.getElementById("itemInput");
    let listaSugestoes = document.getElementById("sugestoes");
    let filtro = input.value.toLowerCase().trim();
    
    listaSugestoes.innerHTML = "";
    if (filtro === "") {
        listaSugestoes.style.display = "none"; // Oculta se o filtro estiver vazio
        return;
    }

    let sugestoesFiltradas = produtosPredefinidos.filter(produto => produto.toLowerCase().startsWith(filtro));

    if (sugestoesFiltradas.length === 0) {
        listaSugestoes.style.display = "none"; // Oculta se não houver sugestões
        return;
    }

    sugestoesFiltradas.forEach(produto => {
        let item = document.createElement("div");
        item.innerText = produto;
        item.onclick = () => {
            input.value = produto;
            listaSugestoes.innerHTML = "";
            listaSugestoes.style.display = "none"; // Oculta sugestões após selecionar
        };
        listaSugestoes.appendChild(item);
    });

    listaSugestoes.style.display = "block"; // Exibe sugestões
}

