import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/Header/SearchBar';
import List from '../components/List';
import Current from '../components/Current';
const Notes = ({ session }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/notes');
        setNotes(res.data.data);
        setCurrentNote(res.data.data[0]);
      } catch (err) { console.log(err.message) }
    }
    fetchNotes();
  }, []);
  const notesList = notes.map(note => { return (
    <li className='p-3 border-b border-gray-300 cursor-pointer dark:border-gray-600' key={ note._id } onClick={ () => { setCurrentNote(note) } }>
      <span>
        { note.author }
      </span>
      <br/>
      <span className='text-gray-500'>
        { new Date(note.createdAt).toLocaleDateString('fr-FR') }
      </span>
      <br/>
      <span>
        { note.note.substr(0, 26) }
      </span>
    </li>
  ) });
  return (
    <>
      <Header invisible={ true } image={ session.user.image }>
        <SearchBar invisible={ true} />
      </Header>
      <main className='flex w-screen h-[calc(100vh-66px)] dark:text-white dark:bg-gray-900'>
        <List list={ notesList } />
        <Current content={ currentNote } />
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
export default Notes;