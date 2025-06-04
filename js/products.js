 document.addEventListener('DOMContentLoaded', () => {
  const formAdd = document.getElementById('formAdd');
  const formEdit = document.getElementById('formEdit');
  const formDelete = document.getElementById('formDelete');

  // Adicionar
  formAdd.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('valor').value);
    const quantidade = parseInt(document.getElementById('quantia').value);

    const res = await fetch('http://192.168.0.108:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, preco, quantidade })
    });

    if (res.ok) alert('Produto adicionado com sucesso!');
    else alert('Erro ao adicionar produto');
    formAdd.reset();
  });

  // Editar
  formEdit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('edit-id').value);
    const nome = document.getElementById('edit-nome').value;
    const preco = parseFloat(document.getElementById('edit-valor').value);
    const quantidade = parseInt(document.getElementById('edit-quantia').value);

    const res = await fetch(`http://192.168.0.108:3000/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, preco, quantidade })
    });

    if (res.ok) alert('Produto atualizado!');
    else alert('Erro ao atualizar produto');
    formEdit.reset();
  });

  // Deletar
  formDelete.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('delete-id').value);
    const res = await fetch(`http://192.168.0.108:3000/produtos/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) alert('Produto excluído!');
    else alert('Erro ao excluir produto');
    formDelete.reset();
  });
});
