
const FEEDBACK_URL = 'https://script.google.com/macros/s/AKfycbzJ47LMSwAJWW9XtYsMswegAGZ613xFrfKQfybAnkDSTlSxTQyhKqNEgiNIRlwQhQLJ/exec';

const notyf = new Notyf({
  duration: 3500,
  position: { x: 'right', y: 'top' }
});

// Preenche nome salvo ao carregar
document.addEventListener('DOMContentLoaded', () => {
  const nomeSalvo = localStorage.getItem('feedback_nome');
  if (nomeSalvo) {
    document.getElementById('feedbackName').value = nomeSalvo;
  }
});

document.getElementById('sendFeedback').addEventListener('click', async () => {
  const nomeInput = document.getElementById('feedbackName');
  const comentarioInput = document.getElementById('feedbackMessage');

  const nome = nomeInput.value.trim();
  const comentario = comentarioInput.value.trim();

  if (!nome || !comentario) {
    notyf.error('Preencha nome e comentário');
    return;
  }

  // Salva nome no localStorage
  localStorage.setItem('feedback_nome', nome);

  const payload = new URLSearchParams({
    nome: nome,
    comentario: comentario,
    data: new Date().toLocaleString()
  });

  try {
    await fetch(FEEDBACK_URL, {
      method: 'POST',
      body: payload
    });

    comentarioInput.value = '';

    const modal = bootstrap.Modal.getInstance(
      document.getElementById('feedbackModal')
    );
    modal.hide();

    notyf.success('Feedback enviado com sucesso. Obrigado por contribuir');

    // Recarrega os feedbacks após o envio
    carregarFeedbacks();
  } catch (err) {
    console.error(err);
    notyf.error('Erro ao enviar feedback');
  }
});

let ordemFeedback = 'new'; // padrão de ordenação

// Função para carregar e ordenar feedbacks
async function carregarFeedbacks() {
  try {
    const res = await fetch(FEEDBACK_URL);
    let dados = await res.json();

    if (ordemFeedback === 'old') {
      dados = dados.slice().reverse(); // Inverte a ordem para mostrar os mais antigos primeiro
    }

    const container = document.getElementById('feedbackList');
    container.innerHTML = ''; // Limpa os feedbacks atuais

    dados.forEach(item => {
      const card = document.createElement('div');

      card.innerHTML = `
        <div class="comment-card">
          <div class="comment-avatar">
            ${item.nome.slice(0, 2).toUpperCase()}
          </div>

          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-name">${item.nome}</span>
              <span class="comment-date">${item.data}</span>
            </div>

            <div class="comment-text">
              ${item.comentario}
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error('Erro ao carregar feedbacks', err);
  }
}

// Alteração de ordenação ao clicar nos botões
document.querySelectorAll('.feedback-order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.feedback-order-btn')
      .forEach(b => b.classList.remove('is-active'));

    btn.classList.add('is-active');
    ordemFeedback = btn.dataset.order; // Atualiza o estado de ordenação

    carregarFeedbacks(); // Carrega feedbacks na nova ordem
  });
});

// Carrega os feedbacks ao inicializar a página
carregarFeedbacks();

