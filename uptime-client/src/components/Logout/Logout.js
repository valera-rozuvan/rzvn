import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Wrapper from '../Wrapper';
import WrapperNoMargin from '../WrapperNoMargin';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'SET_EMAIL', data: '' });
      dispatch({ type: 'SET_AUTHORIZATION_CODE', data: '' });
      dispatch({ type: 'SET_AUTH_TOKEN', data: '' });
      dispatch({ type: 'SET_NONCE', data: '' });

      dispatch({ type: 'SET_IS_LOGGED_IN', data: false });

      navigate('/');
    }, 1.5 * 1000);
  }, [navigate, dispatch]);

  return (
    <WrapperNoMargin>
      <Wrapper>
        Logging out...
      </Wrapper>
    </WrapperNoMargin>
  );
}

export default Logout;
