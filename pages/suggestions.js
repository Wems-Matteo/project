import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/Header/SearchBar';
import List from '../components/List';
import Current from '../components/Current';
const Suggestions = ({ session }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [currentSuggestion, setCurrentSuggestion] = useState({});
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get('/api/suggestions');
        setSuggestions(res.data.data);
        setCurrentSuggestion(res.data.data[0]);
      } catch (err) { console.log(err.message) }
    }
    fetchSuggestions();
  }, []);
  const suggestionsList = suggestions.map(suggestion => { return (
    <li className='p-3 border-b border-gray-300 cursor-pointer dark:border-gray-600' key={ suggestion._id } onClick={ () => { setCurrentSuggestion(suggestion) } }>
      <span>
        { suggestion.author }
      </span>
      <br/>
      <span className='text-gray-500'>
        { new Date(suggestion.createdAt).toLocaleDateString('fr-FR') }
      </span>
      <br/>
      <span>
        { suggestion.suggestion.substr(0, 26) }
      </span>
    </li>
  ) });
  return (
    <>
      <Header invisible={ true } image={ session.user.image }>
        <SearchBar invisible={ true} />
      </Header>
      <main className='flex w-screen h-[calc(100vh-67px)] dark:text-white dark:bg-gray-900'>
        <List list={ suggestionsList } />
        <Current content={ currentSuggestion } />
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect : {
    destination: '/signin',
    permanent: false
  } }
  return { props: { session } }
}
export default Suggestions;