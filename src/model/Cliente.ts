import type { ClienteDTO } from "../interface/ClienteDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; 

const database = new DatabaseModel().pool; 


class Cliente {

   
    private idCliente: number = 0;
    private nome: string;
    private cpf: string;
    private telefone: string;

    
    constructor(
        _nome: string,
        _cpf: string,
        _telefone: string
    ) {
        this.nome = _nome;
        this.cpf = _cpf;
        this.telefone = _telefone;
    }

    
    public getIdCliente(): number {
        return this.idCliente;
    }

   
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    
    public getNome(): string {
        return this.nome;
    }

   
    public setNome(nome: string): void {
        this.nome = nome;
    }

    
    public getCpf(): string {
        return this.cpf;
    }

   
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

   
    public getTelefone(): string {
        return this.telefone;
    }

    
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

  
    static async listarClientes(): Promise<Array<Cliente> | null> {
        try {
           
            let listaDeClientes: Array<Cliente> = [];

           
            const querySelectClientes = `SELECT * FROM clientes;`;

           
            const respostaBD = await database.query(querySelectClientes);

           
            respostaBD.rows.forEach((clienteBD) => {
                
                const novoCliente: Cliente = new Cliente(
                    clienteBD.nome,
                    clienteBD.cpf,
                    clienteBD.telefone
                );

              
                novoCliente.setIdCliente(clienteBD.id_cliente);

                
                listaDeClientes.push(novoCliente);
            });

          
            return listaDeClientes;
        } catch (error) {
          
            console.error(`Erro na consulta ao banco de dados. ${error}`);

           
            return null;
        }
    }

   
    static async cadastrarCliente(cliente: ClienteDTO): Promise<boolean> {
        try {
            
            const queryInsertCliente = `INSERT INTO clientes (nome, cpf, telefone)
                                VALUES
                                ($1, $2, $3)
                                RETURNING id_cliente;`;

            
            const respostaBD = await database.query(queryInsertCliente, [
                cliente.nome.toUpperCase(), 
                cliente.cpf,               
                cliente.telefone           
            ]);

        
            if (respostaBD.rows.length > 0) {
                
                console.info(`Cliente cadastrado com sucesso. ID: ${respostaBD.rows[0].id_cliente}`);

               
                return true;
            }

          
            return false;
        } catch (error) {
            
            console.error(`Erro na consulta ao banco de dados. ${error}`);

           
            return false;
        }
    }

  
    static async listarCliente(idCliente: number): Promise<Cliente | null> {
        try {
            
            const querySelectCliente = `SELECT * FROM clientes WHERE id_cliente=$1;`;

            
            const respostaBD = await database.query(querySelectCliente, [idCliente]);

            
            if (respostaBD.rowCount != 0) {
               
                const cliente: Cliente = new Cliente(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].cpf,
                    respostaBD.rows[0].telefone
                );

                
                cliente.setIdCliente(respostaBD.rows[0].id_cliente);

              
                return cliente;
            }

            
            return null;
        } catch (error) {
            
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);

            
            return null;
        }
    }

   
    static async removerCliente(idCliente: number): Promise<boolean> {
        try {
         
            const queryDeleteCliente = `UPDATE clientes SET situacao=FALSE WHERE id_cliente=$1;`;

           
            const respostaBD = await database.query(queryDeleteCliente, [idCliente]);

           
            if (respostaBD.rowCount != 0) {
               
                console.info(`Cliente removido com sucesso.`);
               
                return true;
            }

           
            return false;
        } catch (error) {
           
            console.error(`Erro ao remover cliente do banco de dados. ${error}`);
            
            return false;
        }
    }
}

export default Cliente;