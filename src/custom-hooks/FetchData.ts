import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';

export const useGetData = () => {
    const [characterData, setData] = useState<[]>([]);

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {characterData, getData:handleDataFetch}
}