'use client';
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface UseFetchReturn<T = unknown> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refresh: () => void;
    setData: React.Dispatch<React.SetStateAction<T | null>>;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const useFetch = <T = unknown>(
    url: string,
    method: Method = 'GET',
    options: Record<string, unknown> = {}
): UseFetchReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshIndex, setRefreshIndex] = useState<number>(0);

    const optionString = JSON.stringify(options);
    const requestOptions = useMemo(() => {
        const opts = { ...options };
        // For POST/PUT/PATCH ensure opts.data is always present
        if (
            (method === 'POST' || method === 'PUT' || method === 'PATCH') &&
            !('data' in opts)
        ) {
            opts.data = {};
        }
        return opts;
    }, [method, optionString]);

    useEffect(() => {
        let canceled = false;
        const apiCall = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data: response } = await axios({
                    url,
                    method,
                    ...requestOptions,
                });

                if (response && !response.success && response.message) {
                    toast.error(response.message);
                }
                if (!canceled) {
                    setData(response);
                }
            } catch (err) {
                if (!canceled) {
                    const errorMessage = err instanceof Error ? err.message : 'Request failed in apiCall';
                    setError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            apiCall();
        }

        return () => {
            canceled = true;
        };
    }, [url, method, refreshIndex, requestOptions]);

    const refresh = () => setRefreshIndex((v) => v + 1);

    return { data, loading, error, refresh, setData, setError };
};

export default useFetch;