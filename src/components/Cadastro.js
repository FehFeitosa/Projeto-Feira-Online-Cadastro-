import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const CadastroContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex.weap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    backgrouns-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Cadastro = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.preco.value = onEdit.preco;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.preco.value
        ) {
            return toast.warn("Preencha todos os campos!")
        }

        if (onEdit) {
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                nome: user.nome.value,
                preco: user.preco.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
            await axios
            .post("http://localhost:8800", {
                nome: user.nome.value,
                preco: user.preco.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        user.nome.value = "";
        user.preco.value = "";

        setOnEdit(null);
        getUsers(); //atualização do grid
    };

    return (
        <CadastroContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome do Produto</Label>
                <Input name="nome" placeholder="Nome do Produto" className="nome"/>
            </InputArea>
            <InputArea>
            <Label>Preço</Label>
            <Input name="preco" placeholder="Preço" className="preco"/>
            </InputArea>

            <Button type="submit">CADASTRAR</Button>
        </CadastroContainer>
    );
};

export default Cadastro;