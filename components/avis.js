'use client';
import { useEffect, useState } from 'react';
import { StarIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { API_URL } from '@/service/api'
import Link from 'next/link';

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5" aria-label={`Note : ${rating} sur 5`}>
            {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon
                    key={i}
                    aria-hidden="true"
                    className={`size-4 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
                />
            ))}
        </div>
    );
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Il y a 1 jour';
    if (diffDays < 30) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Avis() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await fetch(`${apiUrl}/avis`);

                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des avis');
                }

                const data = await response.json();
                setReviews(data);

            } catch (err) {
                console.log(err);
                setError("Impossible de charger les avis pour le moment.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-pretty text-slate-900 sm:text-4xl">
                        Les avis de la communauté
                    </h2>
                    <p className="mt-6 text-lg/8 text-slate-500">
                        Des avis vérifiés, laissés par des étudiants et anciens élèves, pour t&apos;aider à choisir
                        ton école en toute confiance.
                    </p>
                    <Link
                        href="/avis/nouveau"
                        className="mt-8 inline-flex rounded-md bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                    >
                        Laisser un avis
                    </Link>
                </div>

                {loading && (
                    <p className="text-sm text-slate-500 xl:col-span-2">Chargement des avis...</p>
                )}

                {error && (
                    <p className="text-sm text-red-600 xl:col-span-2">{error}</p>
                )}

                {!loading && !error && reviews.length === 0 && (
                    <p className="text-sm text-slate-500 xl:col-span-2">
                        Aucun avis pour le moment. Sois le premier à en laisser un !
                    </p>
                )}

                {!loading && !error && reviews.length > 0 && (
                    <ul role="list" className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:col-span-2">
                        {reviews.map((review) => (
                            <li
                                key={review.id}
                                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100"
                            >
                                <div className="flex items-center gap-x-4">
                                    <UserCircleIcon
                                        aria-hidden="true"
                                        className="size-12 text-slate-300"
                                    />
                                    <div>
                                        <h3 className="text-base/6 font-semibold text-slate-900">
                                            {review.name}
                                        </h3>
                                        {review.identite && (
                                            <p className="text-sm/6 font-semibold text-teal-700">
                                                {review.identite}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <StarRating rating={review.rating} />
                                    <span className="text-xs text-slate-400">
                                        {formatDate(review.date)}
                                    </span>
                                </div>
                                <p className="mt-4 text-sm/6 text-slate-600">{review.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}