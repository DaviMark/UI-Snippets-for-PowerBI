
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("menuToggle");
    const content = document.getElementById("content");
    const btnDoc = document.getElementById("btnDocumentacao");
    const btnComp = document.getElementById("btnComponentes");
    const componentsMenu = document.getElementById("componentsMenu");

    const openSidebarAndComponents = () => {
      sidebar.classList.add("open");
      content.classList.add("shifted");
      document.body.classList.add("sidebar-open");
      toggleBtn.classList.add("active");
      const collapse = new bootstrap.Collapse(componentsMenu, { toggle: false });
      collapse.show();
    };

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("open");
      content.classList.toggle("shifted");
      document.body.classList.toggle("sidebar-open");
      toggleBtn.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        content.classList.remove("shifted");
        document.body.classList.remove("sidebar-open");
        toggleBtn.classList.remove("active");
      }
    });

    [btnDoc, btnComp].forEach(btn => btn.addEventListener("click", openSidebarAndComponents));

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