import { useState } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import SearchBar from '../../components/Header/SearchBar';
const Note = ({ session }) => {
  const [note, setNote] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    if (!note) return Swal.fire('Sauvegarde impossible', 'Le champ est vide', 'error');
    const res = await axios.post('/api/notes', { params: { author: session.user.email, note } });
    if (res.data) Swal.fire('Sauvegardé avec succès', '', 'success');
    setNote('');
  }
  return (
    <>
      <Header image={ session.user.image } invisible={ true }>
        <SearchBar invisible={ true } />
      </Header>
      <main className='w-screen h-[calc(100vh-67px)] dark:text-white dark:bg-gray-900'>
        <form className='flex flex-col items-center' onSubmit={ e => handleSubmit(e) }>
          <h1 className='m-4 mt-6 text-3xl'>
            Nouvelle note
          </h1>
          <textarea className='p-3 m-2 mt-5 w-96 h-48 bg-gray-200 rounded outline-0 break-words resize-none dark:bg-gray-700' placeholder='Note' value={ note } onChange={ e => setNote(e.target.value) }>
          </textarea>
          <input className='p-2 mt-2 bg-gray-200 cursor-pointer text-sky-500 rounded outline-0 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600' type='submit' value='Sauvegarder' />
        </form>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect : {
    destination: '/signin',
    permanent: false
  }}
  return { props: { session } }
}
export default Note;