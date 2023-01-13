import { useCallback } from 'react';

const { useNavigate } = require('react-router-dom');

const useMove = () => {
  const navigate = useNavigate();

  // 받은 인자(path)로 이동하는 함수.
  const HandleMove = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate],
  );

  const MoveHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const MoveBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return { HandleMove, MoveHome, MoveBack };
};

export default useMove;
