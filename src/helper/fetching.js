import axios from 'axios';

export const fetchData = async (signal,url,passState) => {
    try {
        const data = await axios.get(url,signal);
        passState(data.data)
    }
    catch(err) {
        console.log(err);
    }
}