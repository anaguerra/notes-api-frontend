import axios from "axios";
//const baseUrl = 'https://jsonplaceholder.typicode.com/posts'
const baseUrl = 'http://localhost:3001/api/notes'

export const create = ({content, important}, {token}) => {
    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }

    return axios
     .post(baseUrl, { content, important}, config)
     .then(response => {
        const { data } = response;
        return data;
     });
};

export const getAll = () => {
    return axios.get(baseUrl)
        .then((response) => {
            const {data} = response;
            return data;
        });
};
