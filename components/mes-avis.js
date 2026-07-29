'use client';
import { useEffect, useState } from 'react';
import { StarIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { PencilIcon, TrashIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { API_URL } from '@/service/api';

// --- Composants utilitaires ---

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

// Sélecteur d'étoiles cliquable pour le mode édition
function StarRatingInput({ rating, onChange }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((value) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => onChange(value)}
                    className="p-0.5"
                    aria-label={`Donner la note de ${value} sur 5`}
                >
                    <StarIcon
                        aria-hidden="true"
                        className={`size-5 ${value <= rating ? 'text-amber-400' : 'text-slate-200'} hover:text-amber-300`}
                    />
                </button>
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

export default function MesAvis() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Etat pour l'édition en cours
    const [editingId, setEditingId] = useState(null);
    const [editRating, setEditRating] = useState(5);
    const [editDescription, setEditDescription] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [actionError, setActionError] = useState(null);

    const apiUrl = API_URL;

    const getToken = () => {
        if (typeof document === 'undefined') return null;

        const match = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='));

        return match ? match.split('=')[1] : null;
    };

    const fetchMesAvis = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await fetch(`${apiUrl}/mes-avis`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                throw new Error("Tu dois être connecté pour voir tes avis.");
            }
            if (!response.ok) {
                throw new Error('Erreur lors du chargement de tes avis');
            }

            const data = await response.json();
            setReviews(data);
            setError(null);
        } catch (err) {
            console.log(err);
            setError(err.message || 'Impossible de charger tes avis pour le moment.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMesAvis();
    }, []);

    const startEditing = (review) => {
        setActionError(null);
        setEditingId(review.id);
        setEditRating(review.rating);
        setEditDescription(review.description);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setActionError(null);
    };

    const saveEdit = async (id) => {
        try {
            setSaving(true);
            setActionError(null);
            const token = getToken();
            const response = await fetch(`${apiUrl}/avis/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    rating: editRating,
                    description: editDescription,
                }),
            });

            if (!response.ok) {
                throw new Error("La modification de l'avis a échoué.");
            }

            const updated = await response.json();
            setReviews((prev) =>
                prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
            );
            setEditingId(null);
        } catch (err) {
            console.log(err);
            setActionError(err.message || "La modification a échoué.");
        } finally {
            setSaving(false);
        }
    };

    const deleteReview = async (id) => {
        const confirmed = window.confirm('Supprimer définitivement cet avis ?');
        if (!confirmed) return;

        try {
            setDeletingId(id);
            setActionError(null);
            const token = getToken();
            const response = await fetch(`${apiUrl}/avis/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("La suppression de l'avis a échoué.");
            }

            setReviews((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.log(err);
            setActionError(err.message || 'La suppression a échoué.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-pretty text-slate-900 sm:text-4xl">
                        Mes avis
                    </h2>
                    <p className="mt-6 text-lg/8 text-slate-500">
                        Retrouve ici tous les avis que tu as publiés. Tu peux les modifier ou les
                        supprimer à tout moment.
                    </p>
                    <a
                        href="/avis/nouveau"
                        className="mt-8 inline-flex rounded-md bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                    >
                        Laisser un nouvel avis
                    </a>
                </div>

                {loading && (
                    <p className="text-sm text-slate-500 xl:col-span-2">Chargement de tes avis...</p>
                )}

                {error && (
                    <p className="text-sm text-red-600 xl:col-span-2">{error}</p>
                )}

                {!loading && !error && reviews.length === 0 && (
                    <p className="text-sm text-slate-500 xl:col-span-2">
                        Tu n&apos;as pas encore laissé d&apos;avis.
                    </p>
                )}

                {!loading && !error && reviews.length > 0 && (
                    <ul role="list" className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:col-span-2">
                        {reviews.map((review) => {
                            const isEditing = editingId === review.id;
                            const isDeleting = deletingId === review.id;

                            return (
                                <li
                                    key={review.id}
                                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100"
                                >
                                    <div className="flex items-center justify-between gap-x-4">
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

                                        {!isEditing && (
                                            <div className="flex shrink-0 items-center gap-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => startEditing(review)}
                                                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-teal-700"
                                                    aria-label="Modifier l'avis"
                                                >
                                                    <PencilIcon className="size-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteReview(review.id)}
                                                    disabled={isDeleting}
                                                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-red-600 disabled:opacity-50"
                                                    aria-label="Supprimer l'avis"
                                                >
                                                    <TrashIcon className="size-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {isEditing ? (
                                        <div className="mt-4 space-y-3">
                                            <StarRatingInput
                                                rating={editRating}
                                                onChange={setEditRating}
                                            />
                                            <textarea
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                rows={4}
                                                className="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm/6 text-slate-900 focus:border-teal-700 focus:outline-none"
                                            />
                                            {actionError && (
                                                <p className="text-xs text-red-600">{actionError}</p>
                                            )}
                                            <div className="flex items-center gap-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => saveEdit(review.id)}
                                                    disabled={saving}
                                                    className="inline-flex items-center gap-x-1 rounded-md bg-teal-700 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
                                                >
                                                    <CheckIcon className="size-3.5" />
                                                    {saving ? 'Enregistrement...' : 'Enregistrer'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelEditing}
                                                    disabled={saving}
                                                    className="inline-flex items-center gap-x-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                                >
                                                    <XMarkIcon className="size-3.5" />
                                                    Annuler
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mt-4 flex items-center justify-between">
                                                <StarRating rating={review.rating} />
                                                <span className="text-xs text-slate-400">
                                                    {formatDate(review.date)}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-sm/6 text-slate-600">
                                                {review.description}
                                            </p>
                                            {isDeleting && (
                                                <p className="mt-2 text-xs text-slate-400">
                                                    Suppression en cours...
                                                </p>
                                            )}
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}