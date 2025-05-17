// Dados do cardápio
const cardapioData = {
    combos: [
        { name: "Prazeres da Carne", description: "1 Espetinho de Alcatra, 1 Espetinho de Filé, Farofa/Vinagrete", serves: 2, price: 25 },
        { name: "Olímpico", description: "2 Medalhões de carne, 1 queijo coalho, 1 pão prime", serves: 2, price: 45 },
        { name: "Menos é mais", description: "2 Espetinhos mistos com farofa e salada, 1 pão de alho e batata frita", serves: 2, price: 40 },
        { name: "Degustação", description: "1 espetinho misto + Filé + Alcatra + Frango, 1 pão de alho e batata frita", serves: 2, price: 65 },
        { name: "Vegetariano", description: "2 Coalhos, pão de alho e batata frita", serves: 2, price: 40 },
        { name: "Titânico", description: "1 Medalhão de cada, 1 pão prime e batata frita", serves: 2, price: 60 },
        { name: "Brazzêro", description: "1 espetinho de cada, 2 pães prime, 2 queijos, 2 pães de alho, 2 batatas fritas", serves: 4, price: 120 }
    ],
    comidas: [
        { name: "Espetinho de Frango", description: "Espetinho de Frango de 100g", serves: 1, price: 13 },
        { name: "Espetinho de Alcatra", description: "Espetinho de Alcatra de 100g", serves: 1, price: 13 },
        { name: "Espetinho de Cupim", description: "Espetinho de Cupim de 100g", serves: 1, price: 13 },
        { name: "Espetinho de Filé", description: "Espetinho de Contra-filé de 100g", serves: 1, price: 13 },
        { name: "Espetinho Misto", description: "Carne + frango + queijo", serves: 1, price: 13 },
        { name: "Medalhão de Frango", description: "Medalhão de frango envolvido com bacon (sem pele) de 150g", serves: 1, price: 15 },
        { name: "Medalhão de Carne", description: "Medalhão de carne envolvido com bacon (sem pele) de 150g", serves: 1, price: 15 },
        { name: "Medalhão Romeu e Julieta", description: "Medalhão de queijo coalho com goiabada envolvida com bacon", serves: 1, price: 15 },
        { name: "Pé Duro", description: "1 pão de alho com um churrasco a escolher com vinagrete, molho da casa e queijo maçaricado", serves: 1, price: 25 },
        { name: "Pão Prime", description: "1/2 pão de alho com Linguiça Toscana", serves: 1, price: 10 },
        { name: "Pão de Alho", description: "Pão de alho com recheio da casa", serves: 1, price: 10 },
        { name: "Queijo Coalho", description: "Espetinho de queijo coalho com orégano", serves: 1, price: 10 },
        { name: "Batata Frita", description: "Porção com sabor caseiro do Brazzêro", serves: 2, price: 15 },
        { name: "Farofa e Salada", description: "Farofa/Vinagrete com tempero artesanal", serves: 1, price: 3 }
    ],
    bebidas: [
        { name: "Cerveja em lata", description: "Lata 350ml", price: 5 },
        { name: "Cerveja Litrinho", description: "Litrinho", price: 5 },
        { name: "Cerveja LongNeck", description: "Long Neck", price: 10 },
        { name: "Refrigerante Litro", description: "Refrigerante 1L", price: 8 },
        { name: "Refrigerante Lata", description: "Lata 350ml", price: 5 },
        { name: "Água com ou Sem Gás", description: "Garrafa 500ml", price: 3 },
        { name: "Caipirinha", description: "Cachaça, limão, açúcar, gelo", price: 10 },
        { name: "Caipirosca", description: "Vodka, limão, açúcar, gelo", price: 10 },
        { name: "Cuba Libre", description: "Rum, limão, Coca-Cola, gelo", price: 10 },
        { name: "Daiquiri", description: "Rum, limão, açúcar, gelo", price: 10 },
        { name: "Daiquiri Red", description: "Rum, morango, açúcar, gelo", price: 15 }
    ]
};

// Função para criar um card de produto
function createProductCard(product, category) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-name', product.name);
    card.setAttribute('data-price', product.price);
    card.setAttribute('data-category', category);
    
    // Determinar se o produto tem informação de porções
    const hasServes = product.hasOwnProperty('serves');
    
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${product.name}</h3>
        </div>
        <div class="card-body">
            <p class="card-description">${product.description}</p>
            <div class="card-info">
                ${hasServes ? `<span class="card-serves">Serve: ${product.serves} ${product.serves > 1 ? 'pessoas' : 'pessoa'}</span>` : ''}
                <span class="card-price">R$ ${product.price.toFixed(2)}</span>
            </div>
            <div class="card-actions">
                <div class="card-select">
                    <input type="checkbox" id="select-${category}-${product.name.replace(/\s+/g, '-').toLowerCase()}" class="product-select">
                    <label for="select-${category}-${product.name.replace(/\s+/g, '-').toLowerCase()}">Selecionar</label>
                </div>
                <div class="card-quantity">
                    <label>Quantidade:</label>
                    <div class="quantity-control">
                        <button type="button" class="quantity-btn decrease">-</button>
                        <input type="number" class="quantity-input" value="0" min="0" max="99">
                        <button type="button" class="quantity-btn increase">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Função para preencher os containers com os cards
function populateProductContainers() {
    const combosContainer = document.getElementById('combos-container');
    const comidasContainer = document.getElementById('comidas-container');
    const bebidasContainer = document.getElementById('bebidas-container');
    
    // Limpar os containers
    if (combosContainer) combosContainer.innerHTML = '';
    if (comidasContainer) comidasContainer.innerHTML = '';
    if (bebidasContainer) bebidasContainer.innerHTML = '';
    
    // Preencher combos
    if (combosContainer) {
        cardapioData.combos.forEach(combo => {
            const card = createProductCard(combo, 'combos');
            combosContainer.appendChild(card);
        });
    }
    
    // Preencher comidas
    if (comidasContainer) {
        cardapioData.comidas.forEach(comida => {
            const card = createProductCard(comida, 'comidas');
            comidasContainer.appendChild(card);
        });
    }
    
    // Preencher bebidas
    if (bebidasContainer) {
        cardapioData.bebidas.forEach(bebida => {
            const card = createProductCard(bebida, 'bebidas');
            bebidasContainer.appendChild(card);
        });
    }
    
    // Adicionar event listeners para os botões de quantidade
    setupQuantityButtons();
    setupCheckboxes();
}

// Função para configurar os botões de quantidade
function setupQuantityButtons() {
    // Botões de diminuir quantidade
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 0) {
                input.value = value - 1;
                
                // Se a quantidade for zero, desmarcar o checkbox
                if (parseInt(input.value) === 0) {
                    const checkbox = this.closest('.card-actions').querySelector('.product-select');
                    checkbox.checked = false;
                }
            }
        });
    });
    
    // Botões de aumentar quantidade
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
            
            // Se a quantidade for maior que zero, marcar o checkbox
            if (parseInt(input.value) > 0) {
                const checkbox = this.closest('.card-actions').querySelector('.product-select');
                checkbox.checked = true;
            }
        });
    });
    
    // Inputs de quantidade
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            // Garantir que o valor seja um número positivo
            let value = parseInt(this.value);
            if (isNaN(value) || value < 0) {
                this.value = 0;
            }
            
            // Atualizar o estado do checkbox
            const checkbox = this.closest('.card-actions').querySelector('.product-select');
            checkbox.checked = parseInt(this.value) > 0;
        });
    });
}

// Função para configurar os checkboxes
function setupCheckboxes() {
    document.querySelectorAll('.product-select').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const quantityInput = this.closest('.card-actions').querySelector('.quantity-input');
            
            if (this.checked && parseInt(quantityInput.value) === 0) {
                quantityInput.value = 1;
            } else if (!this.checked && parseInt(quantityInput.value) > 0) {
                quantityInput.value = 0;
            }
        });
    });
}

// NOVA FUNÇÃO: Carregar imagens na galeria (versão estática)
function loadGalleryImages() {
    const galeriaContainer = document.getElementById('galeria-container');
    if (!galeriaContainer) return;
    
    // Lista estática de imagens da galeria
    // IMPORTANTE: Adicione ou remova imagens desta lista conforme necessário
    const galleryImages = [
        // Exemplo: { src: 'img/espetinho-alcatra.jpg', alt: 'Espetinho de Alcatra' },
        // Adicione suas imagens aqui no formato { src: 'caminho/para/imagem.jpg', alt: 'Texto Alternativo' }
        // Por enquanto, usaremos a logo e o QR code como exemplos
        { src: 'img/01.jpg', alt: 'Um Pé Duro de respeito!' },
        { src: 'img/02.jpg', alt: 'Caipirinha e geladinha!' }
        { src: 'img/03.jpg', alt: 'Gelada não... além!' }
    ];
    
    // Se não houver imagens, mostrar mensagem
    if (galleryImages.length === 0) {
        galeriaContainer.innerHTML = '<p class="sem-imagens">Nenhuma imagem disponível no momento. Volte em breve!</p>';
        return;
    }
    
    // Limpar o container
    galeriaContainer.innerHTML = '';
    
    // Adicionar cada imagem à galeria
    galleryImages.forEach(image => {
        const galeriaItem = document.createElement('div');
        galeriaItem.className = 'galeria-item';
        
        galeriaItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}">
        `;
        
        galeriaContainer.appendChild(galeriaItem);
    });
    
    // Adicionar mensagem de instrução para o administrador do site
    if (galleryImages.length <= 2) {
        const mensagemAdmin = document.createElement('div');
        mensagemAdmin.className = 'galeria-mensagem';
        mensagemAdmin.innerHTML = `
            <p>Para adicionar mais imagens à galeria, edite o arquivo js/script.js</p>
            <p>Procure pela variável "galleryImages" e adicione novas imagens seguindo o formato:</p>
            <pre>{ src: 'img/nome-da-imagem.jpg', alt: 'Texto Alternativo' }</pre>
        `;
        galeriaContainer.appendChild(mensagemAdmin);
    }
}

// Função para abrir o modal de pedido
function openOrderModal() {
    const modal = document.getElementById('modal-pedido');
    modal.style.display = 'block';
    
    // Preencher o resumo do pedido
    updateOrderSummary();
}

// Função para fechar o modal de pedido
function closeOrderModal() {
    const modal = document.getElementById('modal-pedido');
    modal.style.display = 'none';
}

// Função para atualizar o resumo do pedido
function updateOrderSummary() {
    const itensPedidoContainer = document.getElementById('itens-pedido');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    // Limpar o container
    itensPedidoContainer.innerHTML = '';
    
    let subtotal = 0;
    let hasItems = false;
    
    // Selecionar todos os produtos com quantidade > 0
    document.querySelectorAll('.card').forEach(card => {
        const quantityInput = card.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value);
        
        if (quantity > 0) {
            hasItems = true;
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));
            const itemSubtotal = price * quantity;
            subtotal += itemSubtotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'item-pedido';
            itemElement.innerHTML = `
                <span class="item-nome">${name}</span>
                <span class="item-quantidade">${quantity}x</span>
                <span class="item-subtotal">R$ ${itemSubtotal.toFixed(2)}</span>
            `;
            
            itensPedidoContainer.appendChild(itemElement);
        }
    });
    
    // Se não houver itens, mostrar mensagem
    if (!hasItems) {
        const mensagemElement = document.createElement('div');
        mensagemElement.className = 'sem-itens';
        mensagemElement.textContent = 'Nenhum item selecionado. Selecione itens no cardápio para fazer seu pedido.';
        itensPedidoContainer.appendChild(mensagemElement);
        
        // Desabilitar botão de confirmar pedido
        const btnConfirmarPedido = document.getElementById('confirmar-pedido');
        if (btnConfirmarPedido) {
            btnConfirmarPedido.disabled = true;
        }
    } else {
        // Habilitar botão de confirmar pedido
        const btnConfirmarPedido = document.getElementById('confirmar-pedido');
        if (btnConfirmarPedido) {
            btnConfirmarPedido.disabled = false;
        }
    }
    
    // Atualizar subtotal e total
    subtotalElement.textContent = subtotal.toFixed(2);
    totalElement.textContent = subtotal.toFixed(2); // Por enquanto, total = subtotal
}

// Função para enviar pedido via WhatsApp
function sendOrderWhatsApp() {
    const phoneNumber = '5571999387740';
    let message = '🍖 *PEDIDO BRAZZÊRO ESPETINHOS* 🍖\n\n';
    
    // Adicionar itens do pedido
    let hasItems = false;
    document.querySelectorAll('.item-pedido').forEach(item => {
        hasItems = true;
        const nome = item.querySelector('.item-nome').textContent;
        const quantidade = item.querySelector('.item-quantidade').textContent;
        const subtotal = item.querySelector('.item-subtotal').textContent;
        
        message += `*${nome}* - ${quantidade} - ${subtotal}\n`;
    });
    
    // Se não houver itens, mostrar alerta e não prosseguir
    if (!hasItems) {
        alert('Selecione pelo menos um item para fazer o pedido.');
        return;
    }
    
    // Adicionar total
    message += `\n*Total: R$ ${document.getElementById('total').textContent}*`;
    
    // Adicionar número da mesa, se selecionado
    const mesaCheckbox = document.getElementById('opcao-mesa');
    if (mesaCheckbox && mesaCheckbox.checked) {
        const mesaSelect = document.getElementById('numero-mesa');
        if (mesaSelect && mesaSelect.value) {
            message += `\n\n*Mesa: ${mesaSelect.value}*`;
        } else {
            alert('Selecione o número da mesa.');
            return;
        }
    }
    
    // Adicionar observações, se houver
    const observacoes = document.getElementById('obs-pedido').value;
    if (observacoes && observacoes.trim() !== '') {
        message += `\n\n*Observações:* ${observacoes}`;
    }
    
    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Criar o link do WhatsApp
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir o link em uma nova janela
    window.open(whatsappLink, '_blank');
    
    // Fechar o modal após enviar o pedido
    setTimeout(() => {
        closeOrderModal();
        alert('Pedido enviado com sucesso! Redirecionando para o WhatsApp...');
    }, 500);
}

// Função para rolar até a seção de pagamento
function scrollToPagamento() {
    const pagamentoSection = document.getElementById('pagamento');
    if (pagamentoSection) {
        pagamentoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Função para copiar o código PIX
function copyPixCode() {
    const pixCodeElement = document.getElementById('pix-code-estatico');
    if (pixCodeElement) {
        pixCodeElement.select();
        document.execCommand('copy');
        
        // Feedback visual
        const btnCopiar = document.getElementById('copiar-pix-estatico');
        if (btnCopiar) {
            const originalText = btnCopiar.textContent;
            btnCopiar.textContent = 'Copiado!';
            btnCopiar.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                btnCopiar.textContent = originalText;
                btnCopiar.style.backgroundColor = '';
            }, 2000);
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Preencher os containers com os cards
    populateProductContainers();
    
    // Carregar imagens na galeria
    loadGalleryImages();
    
    // Botão de fazer pedido
    const btnFazerPedido = document.getElementById('btn-fazer-pedido');
    if (btnFazerPedido) {
        btnFazerPedido.addEventListener('click', openOrderModal);
    }
    
    // Botão de pagar com PIX
    const btnPagar = document.getElementById('btn-pagar');
    if (btnPagar) {
        btnPagar.addEventListener('click', scrollToPagamento);
    }
    
    // Link de pagamento no menu
    const linkPagamento = document.querySelector('nav a.pagar-btn');
    if (linkPagamento) {
        linkPagamento.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToPagamento();
        });
    }
    
    // Botão de fechar modal
    const fecharModal = document.querySelector('.fechar-modal');
    if (fecharModal) {
        fecharModal.addEventListener('click', closeOrderModal);
    }
    
    // Fechar modal ao clicar fora dele
    const modal = document.getElementById('modal-pedido');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeOrderModal();
            }
        });
    }
    
    // Checkbox de mesa
    const mesaCheckbox = document.getElementById('opcao-mesa');
    const mesaSelect = document.getElementById('numero-mesa');
    
    if (mesaCheckbox && mesaSelect) {
        mesaCheckbox.addEventListener('change', function() {
            mesaSelect.disabled = !this.checked;
            if (this.checked) {
                mesaSelect.focus();
            }
        });
    }
    
    // Botão de revisar pedido
    const btnRevisarPedido = document.getElementById('revisar-pedido');
    if (btnRevisarPedido) {
        btnRevisarPedido.addEventListener('click', function() {
            closeOrderModal();
        });
    }
    
    // Botão de confirmar pedido
    const btnConfirmarPedido = document.getElementById('confirmar-pedido');
    if (btnConfirmarPedido) {
        btnConfirmarPedido.addEventListener('click', function() {
            sendOrderWhatsApp();
        });
    }
    
    // Botão de copiar código PIX
    const btnCopiarPix = document.getElementById('copiar-pix-estatico');
    if (btnCopiarPix) {
        btnCopiarPix.addEventListener('click', copyPixCode);
    }
});
