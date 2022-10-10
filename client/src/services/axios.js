const { default: axios } = require("axios");

const AxiosSetting = () => {
  // axios.defaults.baseURL =
  axios.defaults.withCredentials = true;
};

export default AxiosSetting;
