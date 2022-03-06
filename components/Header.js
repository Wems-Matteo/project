import { useState } from 'react';
import { signOut } from 'next-auth/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DarkMode from './Header/DarkMode';
import List from './Header/List';
import Plus from '../public/plus.svg';
const Header = ({ children, invisible = false, image, list }) => {
  const path = useRouter().pathname;
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  let navigation = ['Accueil', 'Suggestions', 'Notes'];
  navigation = navigation.map(each => { return (
    <Link href={ each == 'Accueil' ? '/' : `/${each.toLowerCase()}` } key={ each }>
      <a className={ each == 'Accueil' && path == '/' ? 'text-black dark:text-white' : path == `/${each.toLowerCase()}` ? 'text-black dark:text-white' : '' }>
        { each }
      </a>
    </Link>
  )});
  return (
    <header className='dark:text-white dark:bg-gray-800'>
      <div className='py-2 flex flex-row items-center border-b border-gray-300 dark:border-gray-600'>
        <nav className='flex basis-1/3 justify-around text-gray-500'>
          { navigation }
        </nav>
        { children }
        <div className='basis-1/3'>
          <div className='flex flex-row-reverse'>
            <div className='relative mr-5 flex items-center cursor-pointer z-50' onClick={ () => { setShowProfileOptions(!showProfileOptions); setShowCreateOptions(false) } }>
              <Image alt='Image' className='rounded-full' height='50' src={ image } width='50' />
              <ul className={ `absolute top-[66px] right-5 w-[200px] bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 ${ showProfileOptions ? '' : 'invisible' }` }>
                <li className='p-2 rounded cursor-pointer hover:text-black hover:bg-red-200' onClick={ () => signOut() }>
                  Se déconnecter
                </li>
              </ul>
            </div>
            <div className='flex items-center mr-5'>
              <DarkMode />
            </div>
            <div className='mr-5 flex text-white bg-green-500 rounded'>
              <button className='p-2 mr-[5px] flex items-center' onClick={ () => { setShowCreateOptions(!showCreateOptions); setShowProfileOptions(false) } }>
                <Image alt='Image' src={ Plus } />
                { ' ' }
                Créer
              </button>
            </div>
            <ul className={ `absolute top-[74px] right-40 w-[200px] bg-white border border-gray-300 rounded z-50 dark:bg-gray-700 dark:border-gray-600 ${showCreateOptions ? '' : 'invisible'}` }>
              <li className='p-2 hover:bg-gray-100 dark:hover:bg-gray-500'>
                <Link href='/new/cocktail'>
                  <a>
                    Nouveau cocktail
                  </a>
                </Link>
              </li>
              <hr className='h-[1px] border-gray-300 dark:border-gray-600'/>
              <li className='p-2 hover:bg-gray-100 dark:hover:bg-gray-500'>
                <Link href='/new/note'>
                  <a>
                    Nouvelle note
                  </a>
                </Link>
              </li>
              <hr className='h-[1px] border-gray-300 dark:border-gray-600'/>
              <li className='p-2 hover:bg-gray-100 dark:hover:bg-gray-500'>
                <Link href='/new/suggestion'>
                  <a>
                    Nouvelle suggestion
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <List invisible={ invisible } list={ list } />
    </header>
  );
}
export default Header;