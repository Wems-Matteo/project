import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import SearchBar from '../../components/Header/SearchBar';
const Cocktail = ({ session }) => {
  const [alcohol, setAlcohol] = useState('');
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    ingredients = ingredients.split(', ');
    setPrice(price.replace(',', '.'));
    if (!name || !ingredients || !price) return Swal.fire('Sauvegarde impossible', 'Un champ ou plus sont vides !', 'error');
    const res = await axios.post('/api/alcohols', { params: { alcohol, drink: { name, ingredients, price } } });
    if (res.data) Swal.fire('Sauvegardé avec succès', '', 'success');
    setAlcohol('');
    setName('');
    setIngredients('');
    setPrice('');
}
  return (
    <>
      <Header image={ session.user.image } invisible={ true }>
        <SearchBar invisible={ true } />
      </Header>
      <main className='w-screen h-[calc(100vh-67px)] dark:text-white dark:bg-gray-900'>
        <form className='flex flex-col items-center' onSubmit={ e => handleSubmit(e) }>
          <h1 className='m-4 mt-6 text-3xl'>
            Nouveau cocktail
          </h1>
          <input className='p-3 mt-4 mb-2 w-96 text-2xl bg-gray-200 rounded outline-0 dark:bg-gray-700' placeholder='Alcool principal' type='text' value={ alcohol } onChange={ e => setAlcohol(e.target.value) } />
          <input className='p-3 m-3 w-96 text-xl bg-gray-200 rounded outline-0 dark:bg-gray-700' placeholder='Nom du cocktail' type='text' value={ name } onChange={ e => setName(e.target.value) } />
          <textarea className='p-3 m-3 w-96 h-54 bg-gray-200 rounded outline-0 break-words resize-none dark:bg-gray-700' placeholder='Ingrédients' value={ ingredients } onChange={ e => setIngredients(e.target.value) }>
          </textarea>
          <input className='p-3 m-3 w-96 bg-gray-200 rounded outline-0 dark:bg-gray-700' placeholder='Prix du cocktail' type='number' value={ price } onChange={ e => setPrice(e.target.value) } />
          <input className='p-2 mt-3 bg-gray-200 cursor-pointer text-sky-500 rounded outline-0 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600' type='submit' value='Sauvegarder' />
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
export default Cocktail;