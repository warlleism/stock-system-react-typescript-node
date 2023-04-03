import { useState, useEffect } from 'react';

interface FetchState {
    data: | null;
    isLoading: boolean;
    error: Error | null;
}

function useGetFetch(url: string): FetchState {

    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch(url)
                    .then((res) => res.json())
                    .then((data) => setData(data))
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error('Ocorreu um erro'));
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
}

export default useGetFetch;
