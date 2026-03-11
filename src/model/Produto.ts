import type { ProdutoDTO } from "../interface/ProdutoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";
const database = new DatabaseModel().pool;

class Produto {
    private idProduto: number = 0;
    private nome: string;
    private marca: string;
    private preco: number;
    private situacao: boolean = true;

    constructor(_nome: string, _marca: string, _preco: number) {
        this.nome = _nome;
        this.marca = _marca;
        this.preco = _preco;
    }

    public getIdProduto(): number {
        return this.idProduto;
    }

    public setIdProduto(idProduto: number): void {
        this.idProduto = idProduto;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getMarca(): string {
        return this.marca;
    }

    public setMarca(marca: string): void {
        this.marca = marca;
    }

    public getPreco(): number {
        return this.preco;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }

    static async listarProdutos(): Promise<Array<ProdutoDTO> | null> {
    try {
        const query = `
            SELECT id_produto, nome, marca, preco, situacao
            FROM produto
            WHERE situacao = TRUE;
        `;
        const respostaBD = await database.query(query);

        let lista: Array<ProdutoDTO> = respostaBD.rows.map((produtoBD) => ({
            idProduto: produtoBD.id_produto,
            nome: produtoBD.nome,
            marca: produtoBD.marca,
            preco: produtoBD.preco,
            situacao: produtoBD.situacao
        }));

        return lista;
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        return null;
    }
}
    
   static async listarProduto(idProduto: number): Promise<ProdutoDTO | null> {
    try {
        const query = `
            SELECT id_produto, nome, marca, preco, situacao
            FROM produto
            WHERE id_produto = $1;
        `;
        const respostaBD = await database.query(query, [idProduto]);

        if (respostaBD.rows.length > 0) {
            const produtoBD = respostaBD.rows[0];
            return {
                idProduto: produtoBD.id_produto,
                nome: produtoBD.nome,
                marca: produtoBD.marca,
                preco: produtoBD.preco,
                situacao: produtoBD.situacao
            };
        }
        return null;
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        return null;
    }
}
static async cadastrarProduto(produto: ProdutoDTO): Promise<boolean> {
    try {
        const query = `
            INSERT INTO produto (nome, marca, preco)
            VALUES ($1, $2, $3)
            RETURNING id_produto;
        `;

        const respostaBD = await database.query(query, [
            produto.nome,
            produto.marca,
            produto.preco
        ]);

        return respostaBD.rows.length > 0;

    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        return false;
    }
}

   static async removerProduto(idProduto: number): Promise<boolean> {
    try {
        const query = 'UPDATE produto SET situacao = FALSE WHERE id_produto = $1;';
        
      const respostaBD: any = await database.query(query, [idProduto]);

if (respostaBD.rowCount > 0) {
    console.info("Produto removido com sucesso.");
    return true;
}

return false;
        return false;

    } catch (error) {
        console.error("Erro ao remover produto:", error);
        return false;
    }
}
    
}

export default Produto;
