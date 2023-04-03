import { useEffect, useState } from 'react'
import useGetFetch from '../../hooks/getCustomHook';
import usePostFetch from '../../hooks/postCustomHook';
import { Objeto } from '../../interfaces/IForm';
import video from "../../image/icons/sucess.mp4";
import './style.scss'

type CategoryOption = "Selecione..." | "Hardware" | "Software" | "Periférico" | "Smartphone";

const Product = () => {

    const defaultForm: Objeto = {
        nome: '',
        categoria: '',
        preco: 0,
        quantidade: 0
    }

    const [formulario, setFormulario] = useState<Objeto>(defaultForm)
    const [newContent, setNewContent] = useState<boolean>(false);
    const [deletar, setDelete] = useState<boolean>(false);
    const [editar, setEditar] = useState<boolean>(false);
    const [type, setType] = useState<'cadastrar' | 'editar'>('cadastrar')

    const { isLoading, error, response, postApi } = usePostFetch()

    const { data } = useGetFetch('http://localhost:3003/all');

    const categoryOptions: CategoryOption[] = [
        "Selecione...",
        "Hardware",
        "Software",
        "Periférico",
        "Smartphone",
    ];

    function handlerInput(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        const { name, value } = event.target;

        setFormulario((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function filterForm() {
        if (formulario.nome == '' ||
            formulario.categoria == '' ||
            formulario.preco == 0 ||
            formulario.quantidade == 0) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        filterForm()
    }, [])

    return (
        <div className='content'>
            <div className='content-info'>
                <div>
                    Produtos
                </div>
                {
                    newContent
                        ?
                        type == 'cadastrar'
                            ?
                            <div className='container-input-new-content'>

                                <div className='container-input-title'>
                                    <div>Cadastrar</div>
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Nome:</label>
                                    <input onChange={(event) => handlerInput(event)} type="text" name='nome' />
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label htmlFor="category-select">Categoria:</label>
                                    <select
                                        id="category-select"
                                        name='categoria'
                                        value={formulario.categoria}
                                        onChange={(event) => handlerInput(event)}
                                    >
                                        {categoryOptions.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Preço:</label>
                                    <input onChange={(event) => handlerInput(event)}
                                        type="number" name='preco' />
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Quantidade:</label>
                                    <input onChange={(event) => handlerInput(event)}
                                        type="number" name='quantidade' />
                                </div>

                                <div className='buttom'>
                                    <button disabled={filterForm()} onClick={() => postApi('http://localhost:3003/create', formulario)}
                                    >Enviar</button>
                                    <button onClick={() => {
                                        setDelete(false)
                                        setEditar(false)
                                        setNewContent(false)
                                    }}>CANCELAR
                                    </button>
                                </div>
                            </div>
                            :
                            <div className='container-input-new-content'>
                                <div className='container-input-title'>
                                    <div>Editar</div>
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Nome:</label>
                                    <input onChange={(event) => handlerInput(event)} type="text" name='nome' />
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label htmlFor="category-select">Categoria:</label>
                                    <select
                                        id="category-select"
                                        name='categoria'
                                        value={formulario.categoria}
                                        onChange={(event) => handlerInput(event)}
                                    >
                                        {categoryOptions.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Preço:</label>
                                    <input onChange={(event) => handlerInput(event)}
                                        type="number" name='preco' />
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Quantidade:</label>
                                    <input onChange={(event) => handlerInput(event)}
                                        type="number" name='quantidade' />
                                </div>
                                <div className='buttom'>
                                    <button disabled={filterForm()}>Enviar</button>
                                    <button onClick={() => {
                                        setDelete(false)
                                        setEditar(false)
                                        setNewContent(false)
                                    }}>CANCELAR</button>
                                </div>
                            </div>
                        :
                        <div className='container-info-content-child'>
                            <div className='container-add-search-content'>
                                <div className='container-plus-trash'>
                                    <div className='container-plus-trash-first-child' onClick={() => {
                                        setType('cadastrar')
                                        setNewContent(true)
                                        setEditar(false)
                                        setDelete(false)
                                    }}>
                                        <span className="material-symbols-outlined">
                                            add
                                        </span>
                                        <div>NOVO</div>
                                    </div>
                                    <div className='container-trash-child'
                                        style={{ background: deletar ? "#425878" : "#022354" }}
                                        onClick={() => {
                                            setDelete(!deletar)
                                            setEditar(false)
                                        }}>
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span>
                                    </div>
                                    <div className='container-trash-child'
                                        style={{ background: editar ? "#425878" : "#022354" }}
                                        onClick={() => {
                                            setEditar(!editar)
                                            setDelete(false)

                                        }}>
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </div>
                                </div>
                                <div className='container-input-child'>
                                    <input onChange={(event) => handlerInput(event)} type="text" />
                                    <div>
                                        <span className="material-symbols-outlined">
                                            search
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='itens-tipo'>
                                <div>Código</div>
                                <div>Produto</div>
                                <div>Categoria</div>
                                <div>Preço</div>
                                <div>Estoque</div>
                            </div>
                            <div className='container-item-produto'>
                                {
                                    data?.map((e: any) =>
                                        <div className='item-produto' key={e.id}>
                                            {
                                                deletar
                                                    ?
                                                    <div className='deletar operacoes'>
                                                    </div>
                                                    :
                                                    false
                                            }
                                            {
                                                editar
                                                    ?
                                                    <div className='editar operacoes' onClick={() => {
                                                        setNewContent(true)
                                                        setType('editar')
                                                    }}>
                                                    </div>
                                                    :
                                                    false
                                            }
                                            <div>{e.codigo}</div>
                                            <div>{e.nome}</div>
                                            <div>{e.categoria}</div>
                                            <div>R${e.preco}</div>
                                            <div>{e.codigo}</div>
                                        </div>)
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Product;