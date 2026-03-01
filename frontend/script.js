const apiUrl = "http://localhost:3000/produtos";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lista-produtos")) {
    carregarProdutos();
  }

  if (document.getElementById("lista-estatisticas")) {
    carregarEstatisticas();
  }
});


async function carregarProdutos() {
  try {
    const res = await fetch(apiUrl);
    const produtos = await res.json();

    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    lista.innerHTML = "";

    produtos.forEach(p => {
      const li = document.createElement("li");

      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.marginBottom = "10px";

      li.innerHTML = `
        <div>
          <strong>${p.nome}</strong><br>
          R$ ${parseFloat(p.preco).toFixed(2)}<br>
          <small>${p.descricao || ""}</small>
        </div>
        <div>
          <button onclick="editarProduto(${p.id})">Editar</button>
          <button onclick="deletarProduto(${p.id})">Apagar</button>
        </div>
      `;

      lista.appendChild(li);
    });

  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}


async function carregarEstatisticas() {
  try {
    const res = await fetch(apiUrl);
    const produtos = await res.json();

    const total = document.getElementById("total-produtos");
    const lista = document.getElementById("lista-estatisticas");

    if (!total || !lista) return;

    total.textContent = `Total de produtos cadastrados: ${produtos.length}`;

    lista.innerHTML = "";

    produtos.forEach(p => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${p.nome}</strong><br>
        R$ ${parseFloat(p.preco).toFixed(2)}<br>
        <small>${p.descricao || ""}</small>
      `;

      lista.appendChild(li);
    });

  } catch (erro) {
    console.error("Erro:", erro);
    document.getElementById("total-produtos").textContent =
      "Erro ao conectar com o servidor.";
  }
}

function editarProduto(id) {
  window.location.href = `editar.html?id=${id}`;
}

async function cadastrarProduto() {
  const nome = document.getElementById("nome").value.trim();
  const preco = parseFloat(document.getElementById("preco").value);
  const descricao = document.getElementById("descricao").value.trim();

  if (!nome || isNaN(preco)) {
    alert("Preencha nome e preço corretamente!");
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
    console.error("Erro ao cadastrar:", erro);
    alert("Erro ao cadastrar produto.");
  }
}


async function deletarProduto(id) {
  if (!confirm("Tem certeza que deseja apagar?")) return;

  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });

    alert("Produto deletado!");
    carregarProdutos();

  } catch (erro) {
    console.error("Erro ao deletar:", erro);
    alert("Erro ao deletar produto.");
  }
}