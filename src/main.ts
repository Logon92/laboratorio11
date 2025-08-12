import { validarIBAN } from './motor';
import { pintarExtraerBtn } from './ui';

document.addEventListener('DOMContentLoaded', () => {
    pintarExtraerBtn();
    document.getElementById("validarBtn")?.addEventListener("click", () => {
        const input = (document.getElementById("floatingInput") as HTMLInputElement).value;
        validarIBAN(input);
    });
});
