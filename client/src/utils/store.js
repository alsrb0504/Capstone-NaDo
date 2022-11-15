const { persistor } = require('../store/store');

const ClearStore = () => {
  persistor.purge();
};

// eslint-disable-next-line import/prefer-default-export
export { ClearStore };
