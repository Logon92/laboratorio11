// APARTADO B
const extraerBtn = document.getElementById("extraerBtn");
const htmlInput = document.getElementById("htmlInput");
const resultado = document.getElementById("resultado");

export const pintarExtraerBtn = () => {
    if (
        !(extraerBtn instanceof HTMLButtonElement) ||
        !(htmlInput instanceof HTMLTextAreaElement) ||
        !(resultado instanceof HTMLDivElement)
    ) {
        console.error("Algún elemento del DOM no es del tipo esperado o no existe.");
        return;
    }

    extraerBtn.addEventListener("click", () => {
        const contenido = htmlInput.value;
        const regexImg = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;

        let match;
        const urls: string[] = [];

        while ((match = regexImg.exec(contenido)) !== null) {
            urls.push(match[1]);
        }

        if (urls.length === 0) {
            resultado.innerHTML = "<p class='text-danger'>No se encontraron imágenes.</p>";
            return;
        }

        resultado.innerHTML = urls
            .map(url => `<div><a href="${url}" target="_blank">${url}</a></div>`)
            .join("");
    });
};
