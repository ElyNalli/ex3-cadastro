function formatarCpf(cpf) {
  return String(cpf).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function formatarCep(cep) {
  return String(cep).replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(iso) {
  const [ano, mes, dia] = String(iso).split("-");
  return `${dia}/${mes}/${ano}`;
}

module.exports = { formatarCpf, formatarCep, formatarMoeda, formatarData };
