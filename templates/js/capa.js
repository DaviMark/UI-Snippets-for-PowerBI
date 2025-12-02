/**
 * ========================================
 * SCRIPT DOS CARDS DE TEMPLATE
 * ========================================
 */

// Função para carregar preview de arquivo HTML
async function loadHTMLPreview(htmlPath, imgElement) {
    try {
        const response = await fetch(htmlPath);
        if (!response.ok) {
            throw new Error('Arquivo não encontrado');
        }
        
        const htmlContent = await response.text();
        
        // Cria um blob URL para o HTML
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        
        // Cria um iframe temporário para capturar a renderização
        const iframe = document.createElement('iframe');
        iframe.style.width = '1200px';
        iframe.style.height = '800px';
        iframe.style.border = 'none';
        iframe.style.position = 'absolute';
        iframe.style.left = '-9999px';
        document.body.appendChild(iframe);
        
        iframe.src = blobUrl;
        
        // Aguarda o carregamento do iframe
        iframe.onload = function() {
            // Usa html2canvas ou screenshot API se disponível
            // Por simplicidade, vamos usar uma técnica de renderização direta
            
            // Alternativa: usar o próprio HTML como preview
            // Aqui vamos apenas definir o src do iframe como preview
            imgElement.src = blobUrl;
            imgElement.style.objectFit = 'cover';
            
            // Remove o iframe temporário após um delay
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        };
        
    } catch (error) {
        console.error('Erro ao carregar preview:', error);
        // Define uma imagem de fallback ou placeholder
        imgElement.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231e2a3a"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23fff" font-family="Arial" font-size="16"%3EPreview não disponível%3C/text%3E%3C/svg%3E';
    }
}

// Função para carregar código HTML
async function loadHTMLCode(htmlPath) {
    try {
        const response = await fetch(htmlPath);
        if (!response.ok) {
            throw new Error('Arquivo não encontrado');
        }
        
        const htmlContent = await response.text();
        return htmlContent;
        
    } catch (error) {
        console.error('Erro ao carregar código:', error);
        return '<!-- Erro ao carregar o código HTML -->';
    }
}

// Função para copiar código para clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyNotification('Código copiado com sucesso!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// Fallback para navegadores antigos
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification('Código copiado com sucesso!');
    } catch (err) {
        console.error('Erro ao copiar:', err);
        showCopyNotification('Erro ao copiar código', true);
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar notificação de cópia
function showCopyNotification(message, isError = false) {
    // Remove notificação existente se houver
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${isError ? '#ef4444' : '#10b981'};
        color: white;
        padding: 14px 24px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Adicionar animações CSS para notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    
    // Carregar previews de todos os cards
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        const htmlPath = card.getAttribute('data-html');
        const previewImg = card.querySelector('.preview-image');
        
        if (htmlPath && previewImg) {
            loadHTMLPreview(htmlPath, previewImg);
        }
    });
    
    // Event listeners para botões
    document.addEventListener('click', async function(e) {
        
        // Botão Visualizar
        if (e.target.closest('.btn-view')) {
            const card = e.target.closest('.template-card');
            const htmlPath = card.getAttribute('data-html');
            
            if (htmlPath) {
                // Abre o HTML em nova aba
                window.open(htmlPath, '_blank');
            }
        }
        
        // Botão Copiar HTML
        if (e.target.closest('.btn-copy')) {
            const card = e.target.closest('.template-card');
            const htmlPath = card.getAttribute('data-html');
            
            let htmlCode = await loadHTMLCode(htmlPath);

                // remove <script>...</script>
                htmlCode = htmlCode.replace(/<script[\s\S]*?<\/script>/gi, '');

                // remove <script src="...">
                htmlCode = htmlCode.replace(/<script[^>]*src=["'][^"']*["'][^>]*><\/script>/gi, '');

                copyToClipboard(htmlCode);

        }
        
        // Botão Ver Código
        if (e.target.closest('.btn-code')) {
            const card = e.target.closest('.template-card');
            const htmlPath = card.getAttribute('data-html');
            const modal = document.getElementById('codeModal');
            const codeContent = document.getElementById('codeContent');
            
            if (htmlPath && modal && codeContent) {
                const htmlCode = await loadHTMLCode(htmlPath);
                
                // Escapa HTML para exibição
                const escapedCode = htmlCode
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
                
                codeContent.innerHTML = escapedCode;
                modal.classList.add('active');
                
                // Armazena o código original para cópia
                modal.setAttribute('data-original-code', htmlCode);
            }
        }
        
        // Fechar modal
        if (e.target.closest('.code-modal-close') || (e.target.classList.contains('code-modal') && e.target === e.currentTarget)) {
            const modal = document.getElementById('codeModal');
            if (modal) {
                modal.classList.remove('active');
            }
        }
        
        // Copiar código do modal
        if (e.target.closest('.btn-copy-code')) {
            const modal = document.getElementById('codeModal');
            const originalCode = modal.getAttribute('data-original-code');
            
            if (originalCode) {
                copyToClipboard(originalCode);
            }
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('codeModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        }
    });
});
