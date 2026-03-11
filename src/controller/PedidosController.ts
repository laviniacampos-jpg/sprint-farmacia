import type { Request, Response } from "express";
import Pedido from "../model/Pedido.js";
import type { PedidoDTO } from "../interface/PedidosDTO.js";

class PedidosController extends Pedido {



    static async novo(req: Request, res: Response): Promise<Response> {
        try {

          
            const dadosRecebidosPedido: PedidoDTO = req.body;

            
            if (!dadosRecebidosPedido) {
                return res.status(400).json({ mensagem: "Dados do pedido não enviados." });
            }

            const respostaModelo = await Pedido.cadastrarPedido(dadosRecebidosPedido);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar pedido." });
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o novo pedido." });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {

            const idPedido: number = parseInt(req.params.idPedido as string);

            if (isNaN(idPedido) || idPedido <= 0) {
                return res.status(400).json({ mensagem: "ID incorreto" });
            }

            const respostaModelo = await Pedido.removerPedido(idPedido);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Pedido de venda removido com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Não foi possível remover o pedido, verifique os dados." });
            }

        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível remover o pedido." });
        }
    }
}

export default PedidosController;