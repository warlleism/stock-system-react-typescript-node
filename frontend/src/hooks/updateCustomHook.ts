import { useState } from "react";

type ApiResponse = {
    success: boolean;
    data: any;
};

const usePostFetch = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [response, setResponse] = useState<ApiResponse>({
        success: false,
        data: null,
    });

    const postApi = async (url: string, object: []) => {
        setIsLoading(true);
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
            setIsLoading(false);
            setResponse({ success: true, data: responseData });
        } catch (error) {
            setIsLoading(false);
            setError("Ocorreu algum erro");
        }
    };

    return { isLoading, error, response, postApi };
};

export default usePostFetch;
