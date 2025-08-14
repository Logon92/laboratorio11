import { validarIBAN } from './motor';
import { pintarExtraerBtn } from './ui';

document.addEventListener('DOMContentLoaded', () => {
    pintarExtraerBtn();
    document.getElementById("validarBtn")?.addEventListener("click", () => {
        const inputElement = document.getElementById("floatingInput");
        if (inputElement instanceof HTMLInputElement) {
            const input = inputElement.value;
            validarIBAN(input);
        } else {
            console.error("El elemento no es un input HTML válido");
        }
    });
});
