const apiUrl = 'http://192.168.0.108:3000/produtos';

document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('listaProdutos');
  const inputPesquisa = document.getElementById('pesquisa');
  let produtos = [];

  // Buscar os produtos da API
  async function carregarProdutos() {
    try {
      const response = await fetch(apiUrl);
      produtos = await response.json();
      renderizarLista(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  // Renderizar a lista com ID incluído
  function renderizarLista(produtosFiltrados) {
    lista.innerHTML = '';
    produtosFiltrados.forEach(produto => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>ID:</strong> ${produto.id}<br>
        <span class="produto-nome"><strong>Nome:</strong> ${produto.nome}</span><br>
        <span class="produto-valor"><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</span><br>
        <span class="produto-quantidade"><strong>Quantidade:</strong> ${produto.quantidade}</span>
        <hr>
      `;
      lista.appendChild(li);
    });
  }

  // Filtro de pesquisa
  inputPesquisa.addEventListener('input', () => {
    const termo = inputPesquisa.value.toLowerCase();
    const filtrados = produtos.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
    renderizarLista(filtrados);
  });

  carregarProdutos();
});
