const Cliente = require("../models/clienteModel");
const { validar, CATEGORIAS } = require("../validators/clienteValidator");
const SUCESSOS = {
  criado: "Cliente cadastrado com sucesso!",
  atualizado: "Cliente atualizado com sucesso!",
  excluido: "Cliente excluído com sucesso!",
};
const ERROS = {
  naoencontrado: "Cliente não encontrado.",
};

function renderForm(res, status, opcoes) {
  res
    .status(status)
    .render("clientes/form", { categorias: CATEGORIAS, ...opcoes });
}

// Traduz o erro do banco (CPF ou e-mail repetido) em mensagem amigável
function erroDeDuplicado(e) {
  const erros = {};
  if (e.code === "SQLITE_CONSTRAINT_UNIQUE") {
    if (e.message.includes("cpf"))
      erros.cpf = "Já existe um cliente com este CPF.";
    if (e.message.includes("email"))
      erros.email = "Já existe um cliente com este e-mail.";
  }
  return erros;
}

exports.listar = (req, res) => {
  const busca = (req.query.busca || "").trim();
  const pagina = parseInt(req.query.pagina) || 1;
  const resultado = Cliente.listar({ busca, pagina });

  res.render("clientes/lista", {
    ...resultado,
    busca,
    sucesso: SUCESSOS[req.query.sucesso] || null,
    erro: ERROS[req.query.erro] || null,
  });
};

exports.formNovo = (req, res) => {
  renderForm(res, 200, {
    titulo: "Novo cliente",
    acao: "/clientes",
    cliente: {},
    erros: {},
  });
};

exports.criar = (req, res, next) => {
  const { erros, dados } = validar(req.body);
  const opcoes = { titulo: "Novo cliente", acao: "/clientes", cliente: dados };

  if (Object.keys(erros).length)
    return renderForm(res, 400, { ...opcoes, erros });

  try {
    Cliente.criar(dados);
    res.redirect("/clientes?sucesso=criado");
  } catch (e) {
    const duplicado = erroDeDuplicado(e);
    if (Object.keys(duplicado).length)
      return renderForm(res, 409, { ...opcoes, erros: duplicado });
    next(e);
  }
};

exports.formEditar = (req, res) => {
  const cliente = Cliente.buscarPorId(req.params.id);
  if (!cliente) return res.redirect("/clientes?erro=naoencontrado");

  renderForm(res, 200, {
    titulo: "Editar cliente",
    acao: `/clientes/${cliente.id}/editar`,
    cliente,
    erros: {},
  });
};

exports.atualizar = (req, res, next) => {
  const id = req.params.id;
  if (!Cliente.buscarPorId(id))
    return res.redirect("/clientes?erro=naoencontrado");

  const { erros, dados } = validar(req.body);
  const opcoes = {
    titulo: "Editar cliente",
    acao: `/clientes/${id}/editar`,
    cliente: { id, ...dados },
  };

  if (Object.keys(erros).length)
    return renderForm(res, 400, { ...opcoes, erros });

  try {
    Cliente.atualizar(id, dados);
    res.redirect("/clientes?sucesso=atualizado");
  } catch (e) {
    const duplicado = erroDeDuplicado(e);
    if (Object.keys(duplicado).length)
      return renderForm(res, 409, { ...opcoes, erros: duplicado });
    next(e);
  }
};

exports.excluir = (req, res) => {
  const resultado = Cliente.excluir(req.params.id);
  if (resultado.changes === 0)
    return res.redirect("/clientes?erro=naoencontrado");
  res.redirect("/clientes?sucesso=excluido");
};
