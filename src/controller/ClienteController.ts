import type { ClienteDTO } from "../interface/ClienteDTO.js";
import Cliente from "../model/Cliente.js";
import type { Request, Response } from "express";


class ClienteController extends Cliente {

  
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            
            const listaClientes: Array<Cliente> | null = await Cliente.listarClientes();

           
            return res.status(200).json(listaClientes);
        } catch (error) {
           
            console.error(`Erro ao consultar modelo. ${error}`);

           
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de clientes." });
        }
    }

   
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            
            const dadosRecebidosCliente = req.body;

          
            const respostaModelo = await Cliente.cadastrarCliente(dadosRecebidosCliente);

            
            if (respostaModelo) {
               
                return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso." });
            } else {
             
                return res.status(400).json({ mensagem: "Erro ao cadastrar cliente." });
            }
        } catch (error) {
            
            console.error(`Erro no modelo. ${error}`);

          
            return res.status(500).json({ mensagem: "Não foi possível inserir o cliente" });
        }
    }

  
    static async cliente(req: Request, res: Response): Promise<Response> {
        try {
           
            const idCliente: number = parseInt(req.params.idCliente as string);

            if (isNaN(idCliente) || idCliente <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

            
            const respostaModelo = await Cliente.listarCliente(idCliente);

            
            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum cliente encontrado com o ID fornecido." });
            }

           
            return res.status(200).json(respostaModelo);
        } catch (error) {
         
            console.error(`Erro ao acesso o modelo. ${error}`);

          
            return res.status(500).json({ mensagem: "Não foi possível recuperar o cliente." });
        }
    }

    
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            
            const idCliente: number = parseInt(req.params.idCliente as string);

          
            if (isNaN(idCliente) || idCliente <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

           
            const respostaModelo: boolean = await Cliente.removerCliente(idCliente);

           
            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Cliente removido com sucesso." });
            } else {
               
                return res.status(400).json({ mensagem: "Não foi possível remover o cliente." });
            }
        } catch (error) {
           
            console.error(`Erro ao acessar modelo. ${error}`);
            
            return res.status(500).json({ mensagem: "Não foi possível remover o cliente." });
        }
    }
}

export default ClienteController;