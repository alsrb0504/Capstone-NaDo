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

  // 홈으로 이동하는 함수.
  const MoveHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return { HandleMove, MoveHome };
};

export default useMove;
