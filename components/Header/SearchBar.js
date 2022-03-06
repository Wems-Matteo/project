import Image from 'next/image';
import Search from '../../public/search.svg';
const SearchBar = ({ invisible = false, research, setResearch }) => {
  return (
    <div className={ `flex basis-1/3 justify-center ${ invisible ? 'invisible' : '' }` }>
      <form className='p-2 flex w-[300px] h-[50px] bg-gray-200 rounded dark:bg-gray-700' onSubmit={ e => e.preventDefault() }>
        <label className='mt-[6.5px]'>
          <Image alt='Image' src={Search} />
        </label>
        <input className='ml-2 w-72 font-5xl bg-inherit outline-0' placeholder='Rechercher' type='text' value={ research } onChange={e => setResearch(e.target.value)}/>
      </form>
    </div>
  );
}
export default SearchBar;