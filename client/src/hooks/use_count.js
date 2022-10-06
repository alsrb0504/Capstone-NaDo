const { useState } = require("react");

const useCount = (initValue) => {
  const [count, setCount] = useState(initValue);

  const Increase = () => setCount(count + 1);
  const Decrease = () => setCount(count - 1 >= 0 ? count - 1 : 0);

  return [count, Increase, Decrease];
};

export default useCount;
