'use client';

import { useState } from 'react';
import { auth } from '../../lib/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig'; // Assume you have Firestore setup
import Header from '../components/Header';
import Footer from '../components/Footer';

function getFriendlyErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/email-already-in-use':
            return 'This email is already associated with another account.';
        case 'auth/weak-password':
            return 'The password is too weak. Please choose a stronger password.';
        case 'auth/invalid-credential':
            return 'The provided credentials are invalid. Please try again.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!acceptPolicy) {
            setError('You must accept the privacy policy to register.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Set the user role in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: 'user', // Default role
            });

            // Redirect to dashboard after successful registration
            window.location.href = '/dashboard';
        } catch (error: any) {
            setError(getFriendlyErrorMessage(error.code));
        }
    };

    return (
        <div className='mt-2'>
            <Header isDarkMode={false}/>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white text-black border border-black">
                    <h1 className="text-4xl md:text-6xl font-sans leading-tight mb-10 text-center">
                        Register
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 border rounded-lg bg-gray-100 border-black text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 border rounded-lg bg-gray-100 border-black text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out"
                            required
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="privacyPolicy"
                                checked={acceptPolicy}
                                onChange={(e) => setAcceptPolicy(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="privacyPolicy" className="text-sm">
                                I accept the <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="p-3 rounded-lg transition-colors duration-200 ease-in-out shadow-md bg-white border border-black text-black hover:bg-gray-200"
                        >
                            Register
                        </button>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                    <p className="mt-6 text-center">
                        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
