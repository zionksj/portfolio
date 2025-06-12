(function() {
    emailjs.init("o3Ovpc6G4yayRaZkq");
})();

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg ${
        isError ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name) {
                showMessage('Por favor, preencha seu nome', true);
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showMessage('Por favor, insira um email válido', true);
                return;
            }
            
            if (!message) {
                showMessage('Por favor, escreva uma mensagem', true);
                return;
            }

            const templateParams = {
                from_name: name,
                from_email: email, // ✅ Correto agora
                message: message
            };

            try {
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;

                await emailjs.send(
                    "service_bthcs38",      // Seu Service ID
                    "template_2t4ddhi",     // Seu Template ID
                    templateParams
                );

                showMessage('Mensagem enviada com sucesso!');
                clearForm();
            } catch (error) {
                console.error('Erro:', error);
                showMessage('Erro ao enviar mensagem. Tente novamente mais tarde.', true);
            } finally {
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.textContent = 'Enviar';
                submitButton.disabled = false;
            }
        });

        ['name', 'email', 'message'].forEach(id => {
            document.getElementById(id).addEventListener('input', function() {
                const errorMessages = document.querySelectorAll('.bg-red-500');
                errorMessages.forEach(msg => msg.remove());
            });
        });
    }
});
