import { useDispatch } from 'react-redux';
import { updateList } from '../../actions/list.actions';
const List = ({ invisible = false, list }) => {
  const dispatch = useDispatch();
  if (!invisible) {
    list.sort((a, b) => a.alcohol > b.alcohol ? 1 : -1);
    console.log('list333', list);
    list = [...new Set(list)];
    list = list.map(each => { return (
      <li className='px-3' key={ each._id }>
        <button onClick={ () => dispatch(updateList(each)) }>
          { each.alcohol }
        </button>
      </li>
    ) })
  } else list = undefined;
  return (
    <>
      {list ? (
        <ul className='flex p-2 border-b border-gray-300 dark:border-gray-600'>
          { list }
        </ul>
      ) : ''}
    </>
  );
}
export default List;
