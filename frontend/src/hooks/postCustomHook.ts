import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/provider';
import { Objeto } from "../interfaces/IForm";
import Swal from 'sweetalert2'

type ApiResponse = {
    success: boolean;
    data: any;
};

const usePostFetch = () => {

    const { reload, setReload } = useContext(Context)
    const [error, setError] = useState("");
    const [response] = useState<ApiResponse>({
        success: false,
        data: null,
    });

    const postApi = async (url: string, object: Objeto) => {
        setReload(true);
        setError("");

        try {
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(object),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            Swal.fire({
                text: 'Sucesso',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            setReload(false);
        } catch (error) {
            setReload(false);
            setError("Ocorreu algum erro");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Cool'
            })
        }
    };

    return { reload, error, response, postApi };
};

export default usePostFetch;
