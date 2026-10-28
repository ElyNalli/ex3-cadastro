const form = document.getElementById("form-cliente");

function soDigitos(v) {
  return v.replace(/\D/g, "");
}

function cpfValido(cpf) {
  cpf = soDigitos(cpf);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += Number(cpf[i]) * (t + 1 - i);
    if (((soma * 10) % 11) % 10 !== Number(cpf[t])) return false;
  }
  return true;
}

// Máscaras
function mascaraCpf(v) {
  v = soDigitos(v).slice(0, 11);
  return v
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function mascaraCep(v) {
  v = soDigitos(v).slice(0, 8);
  return v.replace(/^(\d{5})(\d)/, "$1-$2");
}

const cpf = document.getElementById("cpf");
const cep = document.getElementById("cep");

cpf.addEventListener("input", () => (cpf.value = mascaraCpf(cpf.value)));
cep.addEventListener("input", () => (cep.value = mascaraCep(cep.value)));
cpf.value = mascaraCpf(cpf.value);
cep.value = mascaraCep(cep.value);

const regras = {
  nome: (v) =>
    v.trim().length >= 3 ? "" : "Informe o nome completo (mínimo 3 letras).",
  email: (v) =>
    /^\S+@\S+\.\S+$/.test(v.trim()) ? "" : "Digite um e-mail válido.",
  cpf: (v) => (cpfValido(v) ? "" : "CPF inválido."),
  data_nascimento: (v) => {
    if (!v) return "Informe a data de nascimento.";
    const data = new Date(v + "T00:00:00");
    if (isNaN(data) || data > new Date() || data.getFullYear() < 1900)
      return "Informe uma data válida.";
    return "";
  },
  cep: (v) => (soDigitos(v).length === 8 ? "" : "O CEP deve ter 8 números."),
  categoria: (v) => (v ? "" : "Selecione uma categoria."),
  limite_credito: (v) =>
    v !== "" && Number(v) >= 0 ? "" : "Informe um valor maior ou igual a zero.",
};

function validarCampo(campo) {
  const mensagem = regras[campo.name](campo.value);
  const aviso = campo.parentElement.querySelector(".invalid-feedback");
  campo.classList.toggle("is-invalid", mensagem !== "");
  aviso.textContent = mensagem;
  return mensagem === "";
}

const campos = form.querySelectorAll("input, select");

campos.forEach((campo) =>
  campo.addEventListener("blur", () => validarCampo(campo)),
);

form.addEventListener("submit", (evento) => {
  let tudoOk = true;
  campos.forEach((campo) => {
    if (!validarCampo(campo)) tudoOk = false;
  });
  if (!tudoOk) {
    evento.preventDefault();
    form.querySelector(".is-invalid").focus();
  }
});
