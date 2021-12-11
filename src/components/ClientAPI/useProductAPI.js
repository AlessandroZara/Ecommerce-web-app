import axios from "axios";
import { useState } from "react";

function useProductAPI(){
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState(undefined);
    const [error,setError] = useState(undefined);

    const fetchProduct = async(name) => {
        try {
            setLoading(true)
            setError(undefined)
            const result = await axios ({
                baseURL: 'https://www.thecocktaildb.com/api',
                url:'json/v1/1/search.php',
                method:'GET',
                headers:{Accept: '*/*'},
                params:{f:name},
            })
            //debagger
            setData(result.data.drinks)
            return result.data.drinks
        } catch (error) {
            console.log(error)
            setError(error)
            throw error;
        } finally {setLoading(false)}
    }

    return {
        fetchProduct,
        loading,
        data,
        error
    }
}

export default useProductAPI