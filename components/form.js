'use client';
import { useState } from 'react';
import Register from '@/service/register';

export default function RegisterPages() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const Getname = (first, last) => {
    setFirstName(first);
    setLastName(last);
    setName(`${first} ${last}`);
  };

  const GetEmail = (email) => {
    setEmail(email);
  };

  const GetPassword = (password) => {
    setPassword(password);
  };

  const GetConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  const onSubmit = (e) => handleSubmit(e);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Les mots de passe ne correspondent pas");
      return;
    }
            
    try {
      const { response, result } = await Register({name, email, password });

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(result.user));
        document.location.href = "/login";
      } else {
        console.log("Erreur lors de l'inscription", result.error);
      }
    } catch (error) {
      console.log("Erreur rÃ©seau", error);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-100">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  required
                  autoComplete="given-name"
                  onChange={(e) => Getname(e.target.value, lastName)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-100">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  required
                  autoComplete="family-name"
                  onChange={(e) => Getname(firstName, e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                onChange={(e) => GetEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                onChange={(e) => GetPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-confirm" className="block text-sm/6 font-medium text-gray-100">
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                required
                autoComplete="new-password"
                onChange={(e) => GetConfirmPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}