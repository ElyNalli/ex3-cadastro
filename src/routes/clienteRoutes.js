const express = require("express");
const controller = require("../controllers/clienteController");

const router = express.Router();

router.get("/", controller.listar);
router.get("/novo", controller.formNovo);
router.post("/", controller.criar);
router.get("/:id/editar", controller.formEditar);
router.post("/:id/editar", controller.atualizar);
router.post("/:id/excluir", controller.excluir);

module.exports = router;
