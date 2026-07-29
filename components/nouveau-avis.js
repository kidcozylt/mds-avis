'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StarIcon from '@heroicons/react/20/solid/StarIcon';

function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
}

export default function NouvelAvisPage() {
    const router = useRouter();

    const [identite, setIdentite] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (rating === 0) {
            setError("Merci de donner une note");
            return;
        }

        setLoading(true);

        try {
            const token = getCookie('token');

            const headers = { 'Content-Type': 'application/json' };
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            const response = await fetch(`${apiUrl}/add/avis`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ identite, description, rating, name }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Une erreur est survenue");
                return;
            }

            router.push('/avis');

        } catch (error) {
            console.log(error);
            setError("Erreur réseau, veuillez réessayer");
        } finally {
            setLoading(false);
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
                    Laisser un avis
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
                        <label htmlFor="identite" className="block text-sm/6 font-medium text-slate-700">
                            École
                        </label>
                        <div className="mt-2">
                            <input
                                id="identite"
                                name="identite"
                                type="text"
                                required
                                placeholder="Ex : ESSEC Business School"
                                value={identite}
                                onChange={(e) => setIdentite(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-slate-700">
                            Ton nom (facultatif)
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Anonyme"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-700 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <span className="block text-sm/6 font-medium text-slate-700">
                            Note
                        </span>
                        <div className="mt-2 flex gap-1">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setRating(value)}
                                    onMouseEnter={() => setHoverRating(value)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="p-0.5"
                                    aria-label={`${value} étoile${value > 1 ? 's' : ''}`}
                                >
                                    <StarIcon
                                        aria-hidden="true"
                                        className={`size-7 ${
                                            (hoverRating || rating) >= value
                                                ? 'text-amber-400'
                                                : 'text-slate-200'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm/6 font-medium text-slate-700">
                            Ton avis
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                placeholder="Partage ton expérience : professeurs, campus, débouchés..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                            {loading ? 'Envoi en cours...' : "Publier l'avis"}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-slate-500">
                    <a href="/avis" className="font-semibold text-teal-700 hover:text-teal-600">
                        Retour aux avis
                    </a>
                </p>
            </div>
        </div>
    );
}