import { Router } from "express"; 
import type { Request, Response } from "express";
import ClienteController from "./controller/ClienteController.js";
import PedidoController from "./controller/PedidosController.js";
import ProdutoController from "./controller/ProdutoController.js";


const router = Router();

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});



router.get("/api/clientes", ClienteController.todos);
router.post("/api/clientes", ClienteController.novo);
router.get("/api/clientes/:idCliente", ClienteController.cliente);
router.delete("/api/clientes/remover/:idCliente", ClienteController.remover);



router.post("/api/pedidos", PedidoController.novo);
router.put("/api/pedidos/remover/:idPedido", PedidoController.remover);

router.get("/api/produtos", ProdutoController.todos);
router.get("/api/produtos/:idProduto", ProdutoController.produto);
router.post("/api/produtos",ProdutoController.novo);
router.delete("/api/produtos/remover/:idProduto",ProdutoController.remover);

export { router }; 