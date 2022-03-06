import { signIn } from 'next-auth/client';
const Button = ({ backgroundColor, provider }) => {
  return (
    <button className='p-2 m-2 text-white rounded' onClick={ () => signIn(provider.id) } style={ { backgroundColor } }>
      Se connecter avec { provider.name }
    </button>
  );
}
export default Button;