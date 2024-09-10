'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/solid'; // Ensure you have Heroicons installed

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-50 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1 hover:scale-105"
    >
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
}
