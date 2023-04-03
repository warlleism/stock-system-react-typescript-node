import { useContext, useEffect, useState } from 'react'
import { Objeto } from '../../interfaces/IForm';
import useGetFetch from '../../hooks/getCustomHook';
import usePostFetch from '../../hooks/postCustomHook';
import useDeleteFetch from '../../hooks/deleteCustomHook';
import './style.scss'
import useUpdateFetch from '../../hooks/updateCustomHook';

type CategoryOption = "Selecione..." | "Hardware" | "Software" | "Periférico" | "Smartphone" | "Cadeira Gamer" | "TV";

const Product = () => {

    const defaultForm: Objeto = {
        nome: '',
        categoria: '',
        preco: 0,
        quantidade: 0
    }

    const [id, setId] = useState<number | null>(null)
    const [formulario, setFormulario] = useState<Objeto>(defaultForm)
    const [newContent, setNewContent] = useState<boolean>(false);
    const [deletar, setDelete] = useState<boolean>(false);
    const [editar, setEditar] = useState<boolean>(false);
    const [type, setType] = useState<'cadastrar' | 'editar'>('cadastrar')

    const { deleteApi } = useDeleteFetch();
    const { reload, postApi } = usePostFetch()
    const { updateApi } = useUpdateFetch()
    const { data } = useGetFetch('http://localhost:3003/all', reload);

    const categoryOptions: CategoryOption[] = [
        "Selecione...",
        "Hardware",
        "Software",
        "Periférico",
        "Smartphone",
        "Cadeira Gamer",
        "TV"
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
                    id !== null
                        ?
                        <div className='modal-confirm-delete'>
                            <div>
                                <span className="material-symbols-outlined">
                                    warning
                                </span>
                                <div>
                                    <div>Deletar Produto</div>
                                    <div>Está ação não pode ser desfeita. Tem certeza?</div>
                                </div>
                            </div>
                            <div className='buttons'>
                                <button onClick={() => {
                                    setDelete(false)
                                    setEditar(false)
                                    setNewContent(false)
                                    setId(null)
                                }}>Cancelar</button>
                                <button onClick={() => {
                                    deleteApi('http://localhost:3003/delete', id)
                                    setDelete(false)
                                    setId(null)
                                }}>Deletar</button>
                            </div>
                        </div>
                        :
                        false
                }
                {
                    newContent
                        ?
                        type == 'cadastrar'
                            ?
                            <div className='container-input-new-content'>
                                <span className="material-symbols-outlined close" onClick={() => {
                                    setFormulario(defaultForm)
                                    setDelete(false)
                                    setEditar(false)
                                    setNewContent(false)
                                }}>
                                    close
                                </span>

                                <div className='container-input-title'>
                                    <div>Cadastrar</div>
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Nome:</label>
                                    <input value={formulario.nome} onChange={(event) => handlerInput(event)} type="text" name='nome' />
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
                                    <input onChange={(event) => handlerInput(event)} type="number" value={formulario.preco} name='preco' />
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Quantidade:</label>
                                    <input onChange={(event) => handlerInput(event)} type="number" value={formulario.quantidade} name='quantidade' />
                                </div>

                                <div className='buttom'>
                                    <button disabled={filterForm()} onClick={() => postApi('http://localhost:3003/create', formulario)}>Enviar</button>
                                    <button onClick={() => setFormulario(defaultForm)}>Limpar</button>
                                    <button onClick={() => {
                                        setDelete(false)
                                        setEditar(false)
                                        setNewContent(false)
                                    }}>Cancelar
                                    </button>
                                </div>
                            </div>
                            :
                            <div className='container-input-new-content'>
                                <span className="material-symbols-outlined close" onClick={() => {
                                    setFormulario(defaultForm)
                                    setDelete(false)
                                    setEditar(false)
                                    setNewContent(false)
                                }}>
                                    close
                                </span>
                                <div className='container-input-title'>
                                    <div>Editar</div>
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Nome:</label>
                                    <input onChange={(event) => handlerInput(event)} value={formulario.nome} type="text" name='nome' />
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
                                    <input onChange={(event) => handlerInput(event)} type="number" value={formulario.preco} name='preco' />
                                </div>
                                <div className='container-input-create-item-child'>
                                    <label>Quantidade:</label>
                                    <input onChange={(event) => handlerInput(event)} type="number" value={formulario.quantidade} name='quantidade' />
                                </div>
                                <div className='buttom'>
                                    <button disabled={filterForm()} onClick={() => updateApi('http://localhost:3003/update', formulario)}>Enviar</button>
                                    <button onClick={() => setFormulario(defaultForm)}>Limpar</button>
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
                                                    <div className='deletar operacoes' onClick={() => setId(e.id)}>
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
                                                        setFormulario(e)
                                                    }}>
                                                    </div>
                                                    :
                                                    false
                                            }
                                            <div>{e.codigo}</div>
                                            <div>{e.nome}</div>
                                            <div>{e.categoria}</div>
                                            <div>R${e.preco}</div>
                                            <div>{e.quantidade}</div>
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