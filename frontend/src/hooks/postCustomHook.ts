import { useState } from "react";
import { Objeto } from "../interfaces/IForm";
import Swal from 'sweetalert2'

type ApiResponse = {
    success: boolean;
    data: any;
};

const usePostFetch = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [response] = useState<ApiResponse>({
        success: false,
        data: null,
    });

    const postApi = async (url: string, object: Objeto) => {
        setIsLoading(true);
        setError("");
        
        try {
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(object),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setIsLoading(true);
            Swal.fire({
                text: 'Sucesso',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        } catch (error) {
            setIsLoading(false);
            setError("Ocorreu algum erro");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonText: 'Cool'
            })
        }
    };

    return { isLoading, error, response, postApi };
};

export default usePostFetch;
