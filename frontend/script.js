const apiUrl = "http://localhost:3000/produtos";

async function carregarProdutos() {
  try {
    const res = await fetch(apiUrl);
    const produtos = await res.json();

    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    lista.innerHTML = "";

    produtos.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${p.nome} - R$ ${p.preco}
        <button onclick="deletarProduto(${p.id})">Apagar</button>
      `;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

async function carregarEstatisticas() {
  const total = document.getElementById("total-produtos");
  const lista = document.getElementById("lista-estatisticas");

  if (!total || !lista) return;

  try {
    const res = await fetch(apiUrl);
    const produtos = await res.json();

    total.textContent = `Total de produtos cadastrados: ${produtos.length}`;

    lista.innerHTML = "";
    produtos.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.nome;
      lista.appendChild(li);
    });
  } catch (erro) {
    total.textContent = "Erro ao conectar com o servidor.";
    console.error(erro);
  }
}

async function cadastrarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const descricao = document.getElementById("descricao").value;

  if (!nome || !preco) {
    alert("Preencha nome e preço!");
    return;
  }

  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, preco, descricao })
    });

    alert("Produto cadastrado com sucesso!");
    window.location.href = "index.html";
  } catch (erro) {
    alert("Erro ao cadastrar produto.");
    console.error(erro);
  }
}

async function deletarProduto(id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    alert(data.mensagem);
    carregarProdutos();
  } catch (erro) {
    console.error("Erro ao deletar:", erro);
    alert("Erro ao deletar produto.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lista-produtos")) {
    carregarProdutos();
  }

  if (document.getElementById("total-produtos")) {
    carregarEstatisticas();
  }
});