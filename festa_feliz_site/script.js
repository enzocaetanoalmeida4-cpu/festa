// Menu responsivo
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuToggle.setAttribute("aria-expanded", aberto);
  menuToggle.textContent = aberto ? "✕" : "☰";
});

menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Impede a escolha de uma data que já passou.
const campoData = document.getElementById("dataFesta");
const hoje = new Date();
const dataLocal = new Date(hoje.getTime() - hoje.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
campoData.min = dataLocal;

// Formulário: monta uma mensagem e abre o WhatsApp.
document.getElementById("formOrcamento").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const data = document.getElementById("dataFesta").value;
  const convidados = document.getElementById("convidados").value;
  const tema = document.getElementById("tema").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !telefone) {
    document.getElementById("feedback").textContent = "Preencha seu nome e WhatsApp para continuar.";
    return;
  }

  const dataFormatada = data
    ? new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR")
    : "Ainda não definida";

  const texto = `Olá! Gostaria de solicitar um orçamento para uma festa infantil.%0A%0A` +
    `Nome: ${nome}%0AWhatsApp: ${telefone}%0AData: ${dataFormatada}%0A` +
    `Convidados: ${convidados || "Não informado"}%0ATema: ${tema || "A definir"}%0A` +
    `Detalhes: ${mensagem || "Não informado"}`;

  // Troque o número abaixo pelo WhatsApp comercial, com código do país e DDD.
  const numeroDaEmpresa = "5511999999999";
  window.open(`https://wa.me/${numeroDaEmpresa}?text=${texto}`, "_blank", "noopener,noreferrer");
});

document.getElementById("ano").textContent = new Date().getFullYear();
