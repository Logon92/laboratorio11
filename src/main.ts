import {bancos} from './modelo'


const validarIBAN = (value: string): boolean => {
    const patron = /^(?<codigoPais>[A-Z]{2})(?<digitoControl>\d{2})(?<codigoBanco>\d{4})(?<codigoSucursal>\d{4})(?<digitoControl2>\d{2})(?<numeroCuenta>\d{10})$/;
    
    const coincidencia = patron.exec(value.replace(/\s|-/g, ''));
    
    if (coincidencia) {
        const {codigoBanco, codigoSucursal, digitoControl2, numeroCuenta } = coincidencia.groups as any;

        (document.getElementById("formato") as HTMLElement).textContent = "El IBAN está bien formado";
        (document.getElementById("validez") as HTMLElement).textContent = "El IBAN es válido";

        const nombreBanco = bancos[codigoBanco] || "Banco desconocido";
        (document.getElementById("banco") as HTMLElement).textContent = `Banco: ${nombreBanco}`;
        (document.getElementById("sucursal") as HTMLElement).textContent = `Código sucursal: ${codigoSucursal}`;
        (document.getElementById("control") as HTMLElement).textContent = `Dígito de control: ${digitoControl2}`;
        (document.getElementById("cuenta") as HTMLElement).textContent = `Número de cuenta: ${numeroCuenta}`;

        return true;
    } else {
        (document.getElementById("formato") as HTMLElement).textContent = "El IBAN NO está bien formado";
        (document.getElementById("validez") as HTMLElement).textContent = "";
        (document.getElementById("banco") as HTMLElement).textContent = "";
        (document.getElementById("sucursal") as HTMLElement).textContent = "";
        (document.getElementById("control") as HTMLElement).textContent = "";
        (document.getElementById("cuenta") as HTMLElement).textContent = "";
        return false;
    }
};

document.getElementById("validarBtn")?.addEventListener("click", () => {
    const input = (document.getElementById("floatingInput") as HTMLInputElement).value;
    validarIBAN(input);
});


// APARTADO B
const extraerBtn = document.getElementById("extraerBtn") as HTMLButtonElement;
const htmlInput = document.getElementById("htmlInput") as HTMLTextAreaElement;
const resultado = document.getElementById("resultado") as HTMLDivElement;

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
        .map(
        url => `<div><a href="${url}" target="_blank">${url}</a></div>`
        )
        .join("");
});