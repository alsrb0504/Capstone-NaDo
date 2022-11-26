const { default: axios } = require('axios');

const baseURL = 'http://localhost:3001';

const AxiosSetting = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = true;
};

export { baseURL };
export default AxiosSetting;
