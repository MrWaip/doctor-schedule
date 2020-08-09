import Axios from 'axios';

const client = Axios.create({
  baseURL: 'http://localhost:3080/api',
});

export { client };
