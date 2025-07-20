'use client';

import css from './SignUpPage.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import { RegisterRequest } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';
  
const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (formdata: FormData) => {
    try {
      const formValues = Object.fromEntries(formdata) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        setUser({ ...res, avatar: '' })
        router.push('/profile');
      } else {
        setError ('Invalid email or password')
      }
    } catch (error) {
      console.log('error', error);
      setError(('Invalid email or password'))
      
    }
  }

    return (
        <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form action={handleSubmit} className={css.form}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

    <p className={css.error}>Error</p>
        </form>
        
        {error && <p>{error}</p>}
</main>

    )
}

export default SignUp