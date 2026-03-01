const apiUrl = "http://localhost:3000/produtos";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let produtoOriginal = {};

// ==========================
// CARREGAR PRODUTO
// ==========================
async function carregarProduto() {
  if (!id) {
    alert("ID não encontrado!");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/${id}`);
    const produto = await res.json();

    if (!produto) {
      alert("Produto não encontrado!");
      window.location.href = "index.html";
      return;
    }

    produtoOriginal = produto;

    document.getElementById("nome").value = produto.nome || "";
    document.getElementById("preco").value = produto.preco || "";
    document.getElementById("descricao").value = produto.descricao || "";

  } catch (erro) {
    console.error("Erro ao carregar produto:", erro);
    alert("Erro ao carregar produto.");
  }
}

// ==========================
// ATUALIZAR PRODUTO
// ==========================
async function atualizarProduto(event) {
  event.preventDefault();

  const nomeInput = document.getElementById("nome").value.trim();
  const precoInput = document.getElementById("preco").value;
  const descricaoInput = document.getElementById("descricao").value.trim();

  const nome = nomeInput || produtoOriginal.nome;
  const preco = precoInput ? parseFloat(precoInput) : produtoOriginal.preco;
  const descricao = descricaoInput || produtoOriginal.descricao;

  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, preco, descricao })
    });

    alert("Produto atualizado com sucesso!");
    window.location.href = "index.html";

  } catch (erro) {
    console.error("Erro ao atualizar:", erro);
    alert("Erro ao atualizar produto.");
  }
}

// ==========================
document.addEventListener("DOMContentLoaded", carregarProduto);