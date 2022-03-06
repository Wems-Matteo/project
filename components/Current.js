import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import Trash from '../public/trash.svg';
const Current = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [response, setResponse] = useState('');
  const router = useRouter();
  useEffect(() => setIsVisible(false), [content]);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!response) Swal.fire('Sauvegarde impossible', 'Le champ est vide', 'error')
    const res = await axios.put(`/api${ router.asPath }`, { params: { text: content.note || content.suggestion, response } });
    if (res.data) Swal.fire('Sauvegardé avec succès', '', 'success');
    content.response = response;
  }
  const handleDelete = async () => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      icon: 'warning',
      confirmButtonColor: 'red',
      confirmButtonText: 'Supprimer'
    }).then(async res =>  { if (res.isConfirmed) {
      const res = await axios.delete(`/api${ router.asPath }`, { data: { text: content.note || content.suggestion } });
      if (res.data) Swal.fire({
        title: 'Supprimé avec succès',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => location.reload());
    } });
  }
  return (
  <div className='relative m-2 w-screen'>
    <span className='p-2'>
      Créé par { content?.author ?? 'Inconnu' }
    </span>
    <br/>
    <span className='p-5'>
      Le { new Date(content?.createdAt).toLocaleDateString('fr-FR') }
    </span>
    <br/>
    <div className='p-2 pt-5 break-all'>
      { content?.note || content?.suggestion }
    </div>
    <div className='fixed top-16 right-2'>
    { content?.response ? !isVisible ? (
      <button className='p-2 mt-5 mr-2 bg-gray-200 cursor-pointer text-sky-500 rounded outline-0 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600' onClick={ () => setIsVisible(true) }>
        Afficher la réponse
      </button>
    ) : (
      <p className='p-3 m-2 mt-5 w-96 h-36 bg-gray-200 rounded outline-0 break-words resize-none dark:bg-gray-700'>
        { content?.response }
      </p>
    ) : !isVisible && content ? (
      <button className='p-2 mt-5 mr-2 bg-gray-200 cursor-pointer text-sky-500 rounded outline-0 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600' onClick={ () => setIsVisible(true) }>
        Répondre
      </button>
    ) : content ? (
      <form className='flex flex-col items-end' onSubmit={ e => handleSubmit(e) }>
        <textarea className='p-3 m-2 mt-5 w-96 h-36 bg-gray-200 rounded outline-0 break-words resize-none dark:bg-gray-700' placeholder='Réponse' onChange={ e => setResponse(e.target.value) }>
        </textarea>
        <input className='p-2 mt-2 mr-2 w-20 bg-gray-200 cursor-pointer text-sky-500 rounded outline-0 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600' type='submit' value='Envoyer' />
      </form>
    ) : '' }
    </div>
    { content ? (
      <button className='p-2 fixed bottom-5 right-5 bg-red-500 rounded' onClick={ e => handleDelete(e) }>
        <div className='ml-[3.5px] flex'>
          <Image alt='Image' height='48' src={ Trash } width='48' />
        </div>
      </button>
    ) : '' }
  </div>
  )
};
export default Current;