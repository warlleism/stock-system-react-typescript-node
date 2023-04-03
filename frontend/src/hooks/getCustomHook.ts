import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/provider';

interface FetchState {
    data: | Array<object> | null;
    reload: boolean;
    error: Error | null;
}

function useGetFetch(url: string, Loading: boolean): FetchState {

    const [data, setData] = useState<any>([]);
    const { reload, setReload } = useContext(Context)
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setReload(true)
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
                setReload(false);
            }
        };

        fetchData();
    }, [reload]);

    return { data, reload, error };
}

export default useGetFetch;
