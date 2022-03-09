import axios from 'axios';


export const fetchData = async (signal,url,passState,onLoad) => {
    try {
        const data = await axios.get(url,signal);
        passState(data.data)
        onLoad(false);
    }
    catch(err) {
        console.log(err);
    }
}