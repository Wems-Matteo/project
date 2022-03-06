const List = ({ list }) => (
  <div className='h-full w-56 border-r border-gray-300 dark:border-gray-600'>
    <ul className='flex flex-col-reverse'>
      { list }
    </ul>
  </div>
);
export default List;