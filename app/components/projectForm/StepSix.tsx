  
  const StepSix = () => (
    <div className="bg-gray-900 p-6 rounded-md">
      <h2 className="text-2xl font-bold">Rank your priorities.</h2>
      <p className="mt-2">Which of these are important to you? (Select at least one)</p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {['Budget Friendly', 'Development Time', 'Future Scalability', 'Communication'].map(option => (
          <button key={option} className="w-full bg-gray-800 py-3 rounded-md">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
export default StepSix;