'use client';

import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { API_URL } from '@/service/api';

export default function AvisPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/avis`);

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des avis');
        }

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les avis pour le moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Avis Clients</h1>
            <p className="mt-1 text-sm text-slate-500">
              Consultez les retours et évaluations enregistrés.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-900 font-bold"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-teal-700">
              <StarIcon aria-hidden="true" className="size-5 text-amber-400" />
            </span>
            <span>
              MDS<span className="text-teal-700">Avis</span>
            </span>
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600 ring-1 ring-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-slate-500 font-medium">
            Chargement des avis...
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id || review._id}
                  className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      {review.author || review.nom || 'Anonyme'}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <StarIcon className="size-4" />
                      <span className="text-sm font-medium text-slate-700">
                        {review.note || review.rating || 5}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    {review.commentaire || review.comment || review.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500">
                Aucun avis n&apos;a été trouvé pour le moment.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}