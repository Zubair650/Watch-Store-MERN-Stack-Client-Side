import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useWatches = () => {
    const { refetch, data: watches = [] } = useQuery({
        queryKey: ['watches'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/watches`);
            return response.json();
        },
    })
    return [ watches, refetch]
    
    // const [watches, setWatches] = useState([]);
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetch('http://localhost:5000/watches')
    //         .then(res => res.json())
    //         .then(data => {
    //             setWatches(data)
    //             setLoading(false)
    //         }
    //         );
    // }, [])
    // return [watches, loading]
}
export default useWatches;