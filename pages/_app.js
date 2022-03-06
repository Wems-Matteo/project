import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider as NextAuthProvider} from 'next-auth/client';
import listReducer from '../reducers/list.reducer';
import userReducer from '../reducers/user.reducer';
import '../styles/globals.css';
const store = createStore(
  combineReducers({ listReducer, userReducer }),
  applyMiddleware(thunk)
);
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextAuthProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </NextAuthProvider>
    </Provider>
  );
}
export default MyApp;