'use client';
import { useState } from 'react';
import Link from 'next/link'
import Register from '@/service/register';
import { StarIcon } from '@heroicons/react/20/solid';

export default function RegisterPages() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

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
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const { response, result } = await Register({ name, email, password });

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(result.user));
        document.location.href = "/login";
      } else {
        setError(result.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setError("Erreur réseau, veuillez réessayer");
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center bg-white px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/" className="mx-auto flex w-fit items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-lg bg-teal-700">
            <StarIcon aria-hidden="true" className="size-5 text-amber-400" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            MDS<span className="text-teal-700">Avis</span>
          </span>
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-slate-900">
          Crée ton compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-red-100">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-slate-700">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  required
                  autoComplete="given-name"
                  onChange={(e) => Getname(e.target.value, lastName)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-slate-700">
                Nom
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  required
                  autoComplete="family-name"
                  onChange={(e) => Getname(firstName, e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-slate-700">
              Adresse email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                onChange={(e) => GetEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-slate-700">
              Mot de passe
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                onChange={(e) => GetPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-confirm" className="block text-sm/6 font-medium text-slate-700">
              Confirmer le mot de passe
            </label>
            <div className="mt-2">
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                required
                autoComplete="new-password"
                onChange={(e) => GetConfirmPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-700 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              S'inscrire
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-slate-500">
          Déjà un compte ?{' '}
          <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-600">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}