'use client';

import { useState } from 'react';
import { auth } from '../../lib/firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordReset, setPasswordReset] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '/dashboard';
        } catch (error: any) {
            setError(getFriendlyErrorMessage(error.code));
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('Please enter your email address first.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setPasswordReset(true);
        } catch (error: any) {
            setError(getFriendlyErrorMessage(error.code));
        }
    };

    return (
        <div className='mt-2'>
            <Header isDarkMode={false} />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white text-black border border-black">
                    <h1 className="text-4xl md:text-6xl font-sans leading-tight mb-10 text-center">Login</h1>
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
                        <button
                            type="submit"
                            className="p-3 rounded-lg transition-colors duration-200 ease-in-out shadow-md bg-white border border-black text-black hover:bg-gray-200"
                        >
                            Login
                        </button>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleForgotPassword}
                            className="text-blue-600 hover:underline"
                        >
                            Forgot your password?
                        </button>
                        {passwordReset && (
                            <p className="text-green-500 mt-4">Password reset email sent! Check your inbox.</p>
                        )}
                    </div>
                    <p className="mt-6 text-center">
                        Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function getFriendlyErrorMessage(code: string): string {
    switch (code) {
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/user-disabled':
            return 'User account is disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}
