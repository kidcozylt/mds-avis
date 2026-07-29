'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { API_URL } from '@/service/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Une erreur est survenue');
        return;
      }

      setMessage("Un email de réinitialisation t'a été envoyé si ce compte existe.");
    } catch (err) {
      console.error(err);
      setError('Erreur réseau, veuillez réessayer');
    } finally {
      setLoading(false);
    }
  };

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
          Mot de passe oublié ?
        </h2>
        <p className="mt-2 text-center text-sm/6 text-slate-500">
          Indique ton email, on t&apos;envoie un lien pour le réinitialiser.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-red-100">
            {error}
          </p>
        )}

        {message && (
          <p className="mb-4 rounded-md bg-teal-50 px-3 py-2 text-sm text-teal-700 ring-1 ring-teal-100">
            {message}
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
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-teal-700 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:opacity-60"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-slate-500">
          Tu te souviens de ton mot de passe ?{' '}
          <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-600">
            Connecte-toi
          </Link>
        </p>
      </div>
    </div>
  );
}