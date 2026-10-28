const express = require("express");
const path = require("path");
const rotasClientes = require("./src/routes/clienteRoutes");
const formatos = require("./src/helpers/formatos");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Deixa as funções de formatação disponíveis em todas as views
Object.assign(app.locals, formatos);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.redirect("/clientes"));
app.use("/clientes", rotasClientes);

app.use((req, res) => res.status(404).send("Página não encontrada."));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Erro interno do servidor.");
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
