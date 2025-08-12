import {bancos} from './modelo'

export const validarIBAN = (value: string): boolean => {
    const patron = /^(?<codigoPais>[A-Z]{2})(?<digitoControl>\d{2})(?<codigoBanco>\d{4})(?<codigoSucursal>\d{4})(?<digitoControl2>\d{2})(?<numeroCuenta>\d{10})$/;
    const coincidencia = patron.exec(value.replace(/\s|-/g, ''));

    const setText = (id: string, texto: string) => {
        const el = document.getElementById(id);
        if (el instanceof HTMLElement) el.textContent = texto;
    };

    if (coincidencia) {
        const { codigoBanco, codigoSucursal, digitoControl2, numeroCuenta } = coincidencia.groups ?? {};
        const nombreBanco = bancos[codigoBanco] || "Banco desconocido";

        setText("formato", "El IBAN está bien formado");
        setText("validez", "El IBAN es válido");
        setText("banco", `Banco: ${nombreBanco}`);
        setText("sucursal", `Código sucursal: ${codigoSucursal}`);
        setText("control", `Dígito de control: ${digitoControl2}`);
        setText("cuenta", `Número de cuenta: ${numeroCuenta}`);

        return true;
    } 

    // Si no coincide, limpiar campos
    setText("formato", "El IBAN NO está bien formado");
    ["validez","banco","sucursal","control","cuenta"].forEach(id => setText(id, ""));
    return false;
};
