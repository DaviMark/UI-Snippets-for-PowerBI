const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("menuToggle");
const content = document.getElementById("content");
const btnDoc = document.getElementById("btnDocumentacao");
const btnComp = document.getElementById("btnComponentes");
const componentsMenu = document.getElementById("componentsMenu");

// Abre o menu lateral e o submenu de componentes
const openSidebarAndComponents = () => {
  sidebar.classList.add("open");
  content.classList.add("shifted");
  document.body.classList.add("sidebar-open");
  toggleBtn.classList.add("active");
  const collapse = new bootstrap.Collapse(componentsMenu, { toggle: false });
  collapse.show();
};

// Botão do menu
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("open");
  content.classList.toggle("shifted");
  document.body.classList.toggle("sidebar-open");
  toggleBtn.classList.toggle("active");
});

// Fecha o menu ao clicar fora
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
    content.classList.remove("shifted");
    document.body.classList.remove("sidebar-open");
    toggleBtn.classList.remove("active");
  }
});

// 👉 Redirecionamentos dos botões principais
btnComp.addEventListener("click", () => {
  window.location.href = "/src/pages/cards.html";
});

// 👉 Novo: redireciona para a página de documentação
btnDoc.addEventListener("click", () => {
  window.location.href = "/src/pages/como_usar.html";
});

// Mantém o sidebar aberto em telas grandes
window.addEventListener("resize", () => {
  if (window.innerWidth >= 992) {
    sidebar.classList.add("open");
    content.classList.add("shifted");
  }
});

// Botão para subir
// Seleciona o botão
let scrollTop = document.querySelector('.scroll-top');

// Mostra ou esconde o botão
function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }
}

// Voltar ao topo ao clicar
scrollTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Eventos
window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);