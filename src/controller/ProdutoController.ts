import type { Request, Response } from "express";
import Produto from "../model/Produto.js";
import type { ProdutoDTO } from "../interface/ProdutoDTO.js";


class ProdutoController extends Produto {

   static async todos(req: Request, res: Response): Promise<Response> {
    try {
        const listaProdutos: Array<ProdutoDTO> = await Produto.listarProdutos() ?? [];

        return res.status(200).json(listaProdutos);

    } catch (error) {
        console.error(`Erro ao consultar modelo. ${error}`);
        return res.status(500).json({ mensagem: "Não foi possível acessar a lista de Produtos." });
    }
}
static async produto(req: Request, res: Response): Promise<Response> {
    try {
        const idProduto: number = parseInt(req.params.idProduto as string);

        if (isNaN(idProduto) || idProduto <= 0) {
            return res.status(400).json({ mensagem: "ID incorreto" });
        }

        const produto: ProdutoDTO | null = await Produto.listarProduto(idProduto);

        if (produto === null) {
            return res.status(200).json({ mensagem: "Nenhum produto encontrado com o ID fornecido" });
        }

        return res.status(200).json(produto);

    } catch (error) {
        console.error(`Erro ao consultar modelo. ${error}`);
        return res.status(500).json({ mensagem: "Não foi possível acessar a lista de produtos." });
    }
}

   
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
           
            const dadosRecebidosProduto: ProdutoDTO = req.body;

          
            const camposObrigatorios = ["marca", "nome", "preco","situacao"] as const;

           
            const camposInvalidos = camposObrigatorios.filter(campo => {
            const valor = dadosRecebidosProduto[campo];
            return valor === undefined || valor === null || valor === "";
            });

            

            if (camposInvalidos.length > 0) {
                return res.status(400).json({
                    mensagem: `Os seguintes campos são obrigatórios e não podem estar vazios: ${camposInvalidos.join(", ")}.`
                });
            }

            
            const respostaModelo = await Produto.cadastrarProduto(dadosRecebidosProduto);

            
            if (respostaModelo) {
               
                return res.status(201).json({ mensagem: "Produto cadastrado com sucesso." });
            } else {
              
                return res.status(400).json({ mensagem: "Erro ao cadastrar Produto." });
            }
        } catch (error) {
            
            console.error(`Erro no modelo. ${error}`);

            
            return res.status(500).json({ mensagem: "Não foi possível inserir o novo Produto." });
        }
    }

   
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
           
            const idProduto: number = parseInt(req.params.idProduto as string);

           
            if (isNaN(idProduto) || idProduto <= 0) {
                return res.status(400).json({ mensagem: "ID incorreto" });
            }

          
            const respostaModelo = await Produto.removerProduto(idProduto);

         
            if (respostaModelo) {
              
                return res.status(200).json({ mensagem: "Produto removido com sucesso!" });
            } else {
               
                return res.status(400).json({ mensagem: "Não foi possível remover o Produto, verifique se as informações foram passadas corretamente." });
            }
        } catch (error) {
           
            console.error(`Erro no modelo. ${error}`);

           
            return res.status(500).json({ mensagem: "Não foi possível remover o produto." });
        }
    }
}

export default ProdutoController;