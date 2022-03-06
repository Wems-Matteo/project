import { useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { getSession, providers } from 'next-auth/client';
import Button from '../components/auth/Button';
import Beams from '../public/beams.jpg'
const SignIn = ({ providers, session }) => {
  useEffect(() => { if (session) return Router.push('/') }, [session]);
  return (
    <>
      <Image alt='Image' layout='fill' src={ Beams } />
      <div className='w-full h-full'>  
        <div className='p-4 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col z-1  bg-white border border-gray-300 rounded'>
          <span className='flex justify-center mb-5'>
            Connectez-vous
          </span>
          <Button backgroundColor='#3b5998' provider={providers.facebook} />
          <Button backgroundColor='#171515' provider={providers.github} />
          <Button backgroundColor='#bbd' provider={providers.google} />
        </div>
      </div>
    </>
  );
}
SignIn.getInitialProps = async context => {
  return {
    providers: await providers(context),
    session: await getSession(context)
  }
}
export default SignIn;