'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Info from '../components/Info';
import Footer from '../components/Footer';
import '../globals.css';

const initialJobs = [
  { title: 'No Open Positions', location: 'Remote', postDate: '2024-08-26' },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [sortOrder, setSortOrder] = useState('asc');

  const sortJobsByDate = () => {
    const sortedJobs = [...jobs].sort((a, b) => {
        const dateA: number = new Date(a.postDate).getTime();
        const dateB: number = new Date(b.postDate).getTime();

      return sortOrder === 'asc'
        ? dateA - dateB
        : dateB - dateA;
    });

    setJobs(sortedJobs);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50"></div>

      {/* Header and Info */}
      <Info className="relative top-0 left-0 right-0 z-10 invert" />
      <Header isDarkMode={false} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden mt-20 mb-32">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
            <h1 className="text-4xl md:text-5xl font-semibold flex items-center justify-center">
              Careers
            </h1>
          </div>
          <div className="p-8">
            <div className="flex justify-between items-center">
              <p className="text-lg md:text-xl text-gray-700">Available Positions</p>
              <button
                className="text-blue-500 hover:underline"
                onClick={sortJobsByDate}
              >
                Sort by Date {sortOrder === 'asc' ? '↓' : '↑'}
              </button>
            </div>
            <table className="min-w-full mt-6 table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Job Title</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Post Date</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{job.title}</td>
                      <td className="px-4 py-2">{job.location}</td>
                      <td className="px-4 py-2">{job.postDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-center text-gray-700">
                      We are not currently looking for new hires. Please check back later for career opportunities.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
