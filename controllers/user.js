import { db } from "../db";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = 
    "INSERT INTO usuarios(`nome`, `preco`) VALUE(?)"; //inserir na tabela usuarios
    //recebe com parametro as informações de cada um
    const values = [
        req.body.nome,
        req.body.preco,
    ];
    //chamando o banco, passando os valores
    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto cadastrado com sucesso!");
    });
};
//cadastrar
export const updateUser = (req, res) => {
    const q = 
    "UPDATE usuarios SET `nome` = ?, `preco` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.preco,
    ];
    //edição
    db.query(q, [...values,req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto ataulizado com sucesso!")
    });
};
//deletar usuario
export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto deletado com sucesso!")
    });
};