document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DARK MODE ---
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeBtn.textContent = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

   
    const ora = new Date().getHours();
    const salut = document.getElementById('salut-header');
    if (ora >= 6 && ora < 12) salut.textContent = "Bună dimineața! Bine ai venit.";
    else if (ora >= 12 && ora < 18) salut.textContent = "Bună ziua! Bine ai venit.";
    else salut.textContent = "Bună seara! Bine ai venit.";

    
    const titluri = document.querySelectorAll('main h2');
    titluri.forEach(h2 => {
        h2.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            
          
            let frate = this.nextElementSibling;
            while (frate) {
                frate.classList.toggle('hidden');
                frate = frate.nextElementSibling;
            }
        });
    });

    
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('feedback-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nume = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mesaj = document.getElementById('message').value;

        if (nume.length < 2) {
            feedback.textContent = "Nume prea scurt!";
            feedback.style.color = "red";
        } else if (!email.includes('@')) {
            feedback.textContent = "Email invalid (lipsește @)!";
            feedback.style.color = "red";
        } else if (mesaj.length < 10) {
            feedback.textContent = "Mesajul trebuie să aibă minim 10 caractere!";
            feedback.style.color = "red";
        } else {
            feedback.textContent = "Mesaj trimis cu succes! ";
            feedback.style.color = "green";
            form.reset();
        }
    });
});