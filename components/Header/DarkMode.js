import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMode } from '../../actions/user.actions';
const DarkMode = () => {
  const userData = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData.mode) document.querySelector('#checkbox').checked = true;
  }, [userData]);
  useEffect(() => {
    console.log(document.cookie)
    if (document.cookie.includes('dark=true')) {
      document.documentElement.classList.add('dark');
      document.querySelector('#checkbox').checked = true;
    }
  }, []);
  const handleMode = e => {
    dispatch(updateMode(e));
    if (e) {
      document.documentElement.classList.add('dark');
      document.cookie = 'dark=true';
    } else {
      document.documentElement.classList.remove('dark');
      document.cookie = 'dark=false';
    }
  }
  return <input id='checkbox' onChange={ e => handleMode(e.target.checked) } type='checkbox' value={ userData.mode } />
}
export default DarkMode;