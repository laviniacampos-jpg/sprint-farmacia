import type { PedidoDTO } from "../interface/PedidosDTO.js"; 
import { DatabaseModel } from "./DatabaseModel.js";
const database = new DatabaseModel().pool; 

class PedidoVenda {

    
    private idPedido: number = 0;
    private idCliente: number;
    private idProduto: number;
    private dataPedido: Date;
    private valorPedido: number;
    private situacao: boolean = true;

    
    constructor(_idCliente: number, _idProduto :number, _dataPedido: Date, _valorPedido: number) {
        this.idCliente = _idCliente;
        this.idProduto = _idProduto;
        this.dataPedido = _dataPedido;
        this.valorPedido = _valorPedido;
    }

    
    public getIdPedido(): number {
        return this.idPedido;
    }

   
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

   
    public getIdCliente(): number {
        return this.idCliente;
    }

    
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

  
    public getIdProduto(): number {
        return this.idProduto;
    }

   
    public setIdProduto(idProduto: number): void {
        this.idProduto = idProduto;
    }

   
    public getDataPedido(): Date {
        return this.dataPedido;
    }

    
    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

  
    public getValorPedido(): number {
        return this.valorPedido;
    }

    
    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }

   
    public getSituacao(): boolean {
        return this.situacao;
    }

   
    public setSituacao(_situacao: boolean): void {
        this.situacao = _situacao;
    }

   
    static async listarPedidosVenda(): Promise<Array<PedidoDTO> | null> {
        try {
            
            let listaDePedidos: Array<PedidoDTO> = [];

            
            const querySelectPedidos = `
                SELECT
                    pv.id_pedido,
                    pv.id_cliente,
                    c.nome AS nome_cliente,
                    pv.id_produto,
                    ca.marca AS marca_produto
                    pv.data_pedido,
                    pv.valor_pedido,
                    pv.situacao
                FROM pedidos_venda pv
                JOIN clientes c ON pv.id_cliente = c.id_cliente
                JOIN produto ca ON pv.id_produto = ca.id_produto
                WHERE pv.situacao = TRUE;
            `;

            
            const respostaBD = await database.query(querySelectPedidos);

           
            respostaBD.rows.forEach((pedidoBD) => {
               
                const dto: PedidoDTO = {
                    idPedido: pedidoBD.id_pedido,             
                    idCliente: pedidoBD.id_cliente,           
                    nomeCliente: pedidoBD.nome_cliente,      
                    idProduto: pedidoBD.id_produto,               
                    marcaProduto: pedidoBD.marca_produto,         
                    dataPedido: pedidoBD.data_pedido,         
                    valorPedido: pedidoBD.valor_pedido,       
                    situacao: pedidoBD.situacao             
                };

                
                listaDePedidos.push(dto);
            });

           
            return listaDePedidos;
        } catch (error) {
          
            console.error(`Erro na consulta com o banco de dados.`, error);

            
            return null;
        }
    }

    
    static async listarPedido(idPedido: number): Promise<PedidoDTO | null> {
        try {
           
            let pedidoVenda: PedidoDTO | null = null;

            
            const querySelectPedidos = `
                SELECT
                    pv.id_pedido,
                    pv.id_cliente,
                    c.nome AS nome_cliente,
                    pv.id_produto,
                    ca.marca AS marca_produto,
                    pv.data_pedido,
                    pv.valor_pedido,
                    pv.situacao
                FROM pedidos_venda pv
                JOIN clientes c ON pv.id_cliente = c.id_cliente
                JOIN produto ca ON pv.id_produto = ca.id_produto
                WHERE pv.id_pedido = $1;
            `;

            
            const respostaBD = await database.query(querySelectPedidos, [idPedido]);

           
            respostaBD.rows.forEach((pedidoBD) => {
    
                const dto: PedidoDTO = {
                    idPedido: pedidoBD.id_pedido,            
                    idCliente: pedidoBD.id_cliente,           
                    nomeCliente: pedidoBD.nome_cliente,       
                    idProduto: pedidoBD.id_carro,              
                    marcaProduto: pedidoBD.marca_carro,           
                    dataPedido: pedidoBD.data_pedido,        
                    valorPedido: pedidoBD.valor_pedido,      
                    situacao: pedidoBD.situacao               
                };

               
                pedidoVenda = dto;
            });

            
            return pedidoVenda;
        } catch (error) {
           
            console.error(`Erro na consulta com o banco de dados. ${error}`);

           
            return null;
        }
    }

  
    static async cadastrarPedido(pedido: PedidoDTO): Promise<boolean> {
        try {
           
            const queryInsertPedido = `INSERT INTO pedidos_venda (id_cliente, id_produto, data_pedido, valor_pedido)
                                VALUES
                                ($1, $2, $3, $4)
                                RETURNING id_pedido;`;

    
            const respostaBD = await database.query(queryInsertPedido, [
                pedido.idProduto,                       
                pedido.idCliente,                     
                new Date(pedido.dataPedido),         
                pedido.valorPedido                   
            ]);

          
            if (respostaBD.rows.length > 0) {
              
                console.info(`Pedido de venda cadastrado com sucesso. ID: ${respostaBD.rows[0].id_pedido}`);

                
                return true;
            }

            return false;
        } catch (error) {
           
            console.error(`Erro na consulta ao banco de dados. ${error}`);

           
            return false;
        }
    }

    static async removerPedido(idPedido: number): Promise<boolean> {
        try {
           
            const queryRemovePedido = `UPDATE pedidos_venda SET situacao=false WHERE id_pedido=$1;`;

            
            const repostaBD = await database.query(queryRemovePedido, [
                idPedido    
            ]);

           
            if (repostaBD.rowCount != 0) {
                console.info(`Pedido removido com sucesso.`);

               
                return true;
            }

            
            return false;
        } catch (error) {
           
            console.error(`Erro na consulta com o banco de dados. ${error}`);

          
            return false;
        }
    }
}

export default PedidoVenda;