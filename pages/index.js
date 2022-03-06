import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import SearchBar from '../components/Header/SearchBar';
import Drink from '../components/Drink';
const Home = ({ session }) => {
  const listData = useSelector(state => state.listReducer);
  const [headerList, setHeaderList] = useState([]);
  const [trueList, setTrueList] = useState([]);
  const [list, setList] = useState([]);
  const [research, setResearch] = useState('');
  const fetchAlcohols = async () => {
    try {
      const res = await axios.get('/api/alcohols');
      setHeaderList(res.data.data);
      setTrueList(res.data.data);
      setList(res.data.data);
    } catch (err) { console.log(err.message) }
  }
  let previousListData = listData;
  useEffect(() => {
    if (previousListData == listData && listData.alcohol !== 'Vodka') setList(listData);
    else fetchAlcohols();
    previousListData = listData;
  }, [listData]);
  useEffect(() => {
    const res = research.toLowerCase();
    if (res == '') setList(trueList);
    let drinks = trueList.map(each => each.drinks.map(drink => drink.name));
    let names;
    for (let i = 1; i < drinks.length; i++) names = drinks.reduce((a, b) => a.concat(b));
    let matches;
    if (names) matches = names?.filter(each => each.toLowerCase().includes(res));
    let drinks2 = trueList.map(each => each.drinks);
    let drinks3;
    for (let i = 0; i < drinks.length; i++) drinks3 = drinks2.reduce((a, b) => a.concat(b));
    drinks3 = drinks3?.filter(each => matches.includes(each.name));
    if (drinks3) setList([{ drinks: drinks3 }]);
  }, [research, trueList]);
  const handleDelete = async (alcohol, drink) => {
    try {
      const res = await axios.delete('/api/alcohols', { data: { alcohol, drink } });
      if (res.data) Swal.fire({
        title: 'Supprimé avec succès',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => location.reload());
    } catch (err) { console.log(err.message) }
  }
  const displayDrinkContent = drink => {
    Swal.fire({
      title: `<b><u>${ drink.name }</u></b>`,
      html: `Alcool: <b>${ drink.alcohol }</b><br/>Ingrédients: <b>${ drink.ingredients.join(', ') }</b><br/>Prix: <b>${ drink.price }</b> €`,
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Supprimer',
      cancelButtonColor: 'rgb(239 68 68)'
    }).then(res => { if (res.dismiss == Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        icon: 'warning',
        confirmButtonColor: 'red',
        confirmButtonText: 'Supprimer'
      }).then(res => { if (res.isConfirmed) handleDelete(drink.alcohol, drink.name) });
    } });
  }
  const drinks = list.map(each => each.drinks.map(drink => (
    <li className='py-2 grid grid-cols-4 cursor-pointer odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-600 dark:even:bg-gray-700' key={ drink.name } onClick={ () => displayDrinkContent(drink) }>
      <Drink drink={ drink } />
    </li>
  )));
  return (
    <>
      <Header image={ session.user.image } list={ headerList }  >
        <SearchBar setResearch={ setResearch } research={ research } />
      </Header>
      <main className='pt-5 w-screen h-[calc(100vh-108px)] dark:text-white dark:bg-gray-900'>
        <div className='mb-5 grid grid-cols-4'>
          <span className='flex justify-center'>
            Nom
          </span>
          <span className='flex justify-center'>
            Alcool
          </span>
          <span className='flex justify-center'>
            Ingrédients
          </span>
          <span className='flex justify-center'>
            Prix
          </span>
        </div>
        <ul>
          { drinks }
        </ul>
      </main>
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: {
    destination: '/signin',
    permanent: false
  } }
  return { props: { session } }
}
export default Home;