import axios from 'axios';

export const fetchData = async (signal,url,passState,onLoad) => {
    try {
        const data = await axios.get(url,signal);
        passState(data.data);
        onLoad(false);
    }
    catch(err) {
        console.log(err);
    }
}

export const putData = async (url,updatedData) => {
    try {
        const data = await axios.put(url,updatedData);
        console.log(data);
    }
    catch(err) {
        console.log(err);
    }
}