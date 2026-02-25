export interface PedidoDTO {
    idPedido?: number,      
    idCliente: number,      
    idProduto: number,      
    dataPedido: Date,      
    valorPedido: number, 
    nomeCliente?: string,  
    marcaProduto?: string,   
    situacao?: boolean     
}