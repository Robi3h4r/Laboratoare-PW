document.addEventListener('DOMContentLoaded', () => {
    
    const elementeLista = document.querySelectorAll('#education ol li');

   
    const listaEducatieArray = Array.from(elementeLista).map(li => li.textContent.trim());

    
    console.log("Array educație:", listaEducatieArray);
});