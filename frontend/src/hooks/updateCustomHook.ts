import { useState, useContext } from "react";
import { Context } from '../context/provider';
import { Objeto } from "../interfaces/IForm";
import Swal from "sweetalert2";

type ApiResponse = {
    success: boolean;
    data: any;
};

const useUpdateFetch = () => {

    const { reload, setReload } = useContext(Context)
    const [error, setError] = useState("");
    const [response, setResponse] = useState<ApiResponse>({
        success: false,
        data: null,
    });

    const updateApi = async (url: string, object: Objeto) => {
        setReload(true);
        setError("");
        setResponse({ success: false, data: null });

        try {
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(object),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            setReload(false);
            setResponse({ success: true, data: responseData });
            Swal.fire({
                text: 'Sucesso',
                icon: 'success',
                confirmButtonText: 'Confirmar'
            })
        } catch (error) {
            setReload(false);
            setError("Ocorreu algum erro");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Confirmar'
            })
        }
    };

    return { reload, error, response, updateApi };
};

export default useUpdateFetch;
