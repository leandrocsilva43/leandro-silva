document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successMessage = document.getElementById('successMessage');
    
    // Contador de caracteres
    messageInput.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        if (length > 500) {
            this.value = this.value.substring(0, 500);
            charCount.textContent = 500;
            charCount.style.color = '#e74c3c';
        } else if (length > 450) {
            charCount.style.color = '#f39c12';
        } else {
            charCount.style.color = '#495057';
        }
    });
    
    // Validação em tempo real
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    
    // Validação do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulação de envio
            simulateSubmit();
        } else {
            // Scroll para o primeiro erro
            const firstError = form.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Funções de validação
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');
        
        if (!name) {
            showError(nameInput, errorElement, 'Por favor, informe seu nome');
            return false;
        }
        
        if (name.length < 3) {
            showError(nameInput, errorElement, 'O nome deve ter pelo menos 3 caracteres');
            return false;
        }
        
        if (!/^[a-zA-ZÀ-ÿ\s']+$/.test(name)) {
            showError(nameInput, errorElement, 'O nome deve conter apenas letras');
            return false;
        }
        
        showSuccess(nameInput, errorElement);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (!email) {
            showError(emailInput, errorElement, 'Por favor, informe seu email');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(emailInput, errorElement, 'Por favor, informe um email válido');
            return false;
        }
        
        showSuccess(emailInput, errorElement);
        return true;
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        const errorElement = document.getElementById('messageError');
        
        if (!message) {
            showError(messageInput, errorElement, 'Por favor, escreva sua mensagem');
            return false;
        }
        
        if (message.length < 10) {
            showError(messageInput, errorElement, 'A mensagem deve ter pelo menos 10 caracteres');
            return false;
        }
        
        showSuccess(messageInput, errorElement);
        return true;
    }
    
    // Funções auxiliares
    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorElement.style.color = '#e74c3c';
    }
    
    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.innerHTML = '<i class="fas fa-check-circle"></i> Campo válido';
        errorElement.style.color = '#27ae60';
    }
    
    function simulateSubmit() {
        // Mostrar loading
        submitBtn.disabled = true;
        loadingSpinner.style.display = 'block';
        submitBtn.querySelector('.btn-text').textContent = 'Enviando...';
        
        // Simular delay de envio
        setTimeout(() => {
            // Esconder loading
            submitBtn.disabled = false;
            loadingSpinner.style.display = 'none';
            submitBtn.querySelector('.btn-text').textContent = 'Enviar Mensagem';
            
            // Mostrar mensagem de sucesso
            successMessage.classList.add('show');
            
            // Limpar formulário
            form.reset();
            charCount.textContent = '0';
            
            // Remover classes de validação
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('error', 'success');
            });
            
            const errors = form.querySelectorAll('.error-message');
            errors.forEach(error => {
                error.innerHTML = '';
            });
            
            // Scroll para mensagem de sucesso
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Esconder mensagem após 5 segundos
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
        }, 1500);
    }
    
    // Validação automática ao sair dos campos
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.id === 'name') validateName();
            if (this.id === 'email') validateEmail();
            if (this.id === 'message') validateMessage();
        });
    });
});