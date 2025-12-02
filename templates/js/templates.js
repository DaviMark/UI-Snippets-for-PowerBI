document.addEventListener('DOMContentLoaded', function() {
    const templateCards = document.querySelectorAll('.template-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const templateCountSpan = document.getElementById('templateCount');
    const templateGrid = document.getElementById('templateGrid');

    // Adiciona uma mensagem de "Nenhum template encontrado"
    const noTemplatesMessage = document.createElement('div');
    noTemplatesMessage.id = 'noTemplatesMessage';
    noTemplatesMessage.innerHTML = '<i class="bi bi-x-octagon-fill me-2"></i> Nenhum template encontrado com os filtros aplicados.';
    templateGrid.parentNode.insertBefore(noTemplatesMessage, templateGrid.nextSibling);

    let currentFilter = 'todos';
    let currentSearchTerm = '';

    // Função para atualizar a contagem de templates visíveis
    function updateCount() {
        const visibleCards = Array.from(templateCards).filter(card => !card.classList.contains('hidden'));
        templateCountSpan.textContent = visibleCards.length;

        // Exibe ou oculta a mensagem de "Nenhum template encontrado"
        if (visibleCards.length === 0) {
            noTemplatesMessage.style.display = 'block';
        } else {
            noTemplatesMessage.style.display = 'none';
        }
    }

    // Função principal de filtragem
    function filterTemplates() {
        const searchTerm = currentSearchTerm.toLowerCase().trim();
        
        templateCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const tags = card.getAttribute('data-tags').toLowerCase();
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            
            // 1. Filtragem por Categoria
            const categoryMatch = currentFilter === 'todos' || category === currentFilter;

            // 2. Filtragem por Pesquisa (Título ou Tags)
            const searchMatch = searchTerm === '' || title.includes(searchTerm) || tags.includes(searchTerm);

            // Se ambos os filtros corresponderem, o card é exibido
            if (categoryMatch && searchMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        updateCount();
    }

    // Event Listeners para os botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');
            
            // Atualiza o filtro atual
            currentFilter = this.getAttribute('data-filter');
            
            // Aplica a filtragem
            filterTemplates();
        });
    });

    // Event Listener para o campo de pesquisa
    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value;
        filterTemplates();
    });

    // Inicializa a contagem e a filtragem ao carregar a página
    filterTemplates();
});


// --- Download PNG de qualquer template ---
document.addEventListener("click", function (e) {
    const btn = e.target.closest(".download-template");
    if (btn) {
        const imgSrc = btn.getAttribute("data-img");

        // cria o link para download
        const a = document.createElement("a");
        a.href = imgSrc;
        a.download = imgSrc.split("/").pop(); // nome automático
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
});


// Modal dos templates

// -------------------- Criar Modal Dinamicamente --------------------
document.addEventListener("DOMContentLoaded", function () {
    
    const modalHTML = `
    <div class="modal fade" id="templateModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Visualização do Template</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body text-center">
            <img id="modalImage" src="" class="img-fluid rounded shadow">
          </div>
        </div>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Listener global para botões .open-template
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".open-template");
        if (btn) {
            const imgSrc = btn.getAttribute("data-img");
            document.getElementById("modalImage").src = imgSrc;

            const modal = new bootstrap.Modal(document.getElementById("templateModal"));
            modal.show();
        }
    });
});


