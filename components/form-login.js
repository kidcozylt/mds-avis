'use client';
import { useState } from 'react';
import Login from '@/service/login';
import { StarIcon } from '@heroicons/react/20/solid';

export default function LoginPages() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
        const { response, result } = await Login(data);
               console.log("réponse reçue :", response.ok, result);

        if (!response.ok || !result.jwt) {
            console.log("Erreur lors de la connexion");
            setError(result.error || "Identifiants incorrects");
            return;
        }

        console.log("Connexion réussie");
        document.cookie = `token=${result.jwt}; path=/`;
        document.location.href = '/avis';
        

    } catch (error) {
        console.log(error);
        setError("Erreur réseau, veuillez réessayer");
    }
    };

  return (
    <div className="flex min-h-full flex-col justify-center bg-white px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/" className="mx-auto flex w-fit items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-lg bg-teal-700">
            <StarIcon aria-hidden="true" className="size-5 text-amber-400" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            MDS<span className="text-teal-700">Avis</span>
          </span>
        </a>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-slate-900">
          Connecte-toi à ton compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-red-100">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={handleEmailChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-slate-700">
                Mot de passe
              </label>
              <div className="text-sm">
                <a href="/password-forgot" className="font-semibold text-teal-700 hover:text-teal-600">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-700 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Se connecter
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-slate-500">
          Pas encore de compte ?{' '}
          <a href="/register" className="font-semibold text-teal-700 hover:text-teal-600">
            Crée un compte gratuitement
          </a>
        </p>
      </div>
    </div>
  );
}