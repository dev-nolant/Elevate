const StepThree = () => (
    <div className="bg-gray-900 p-6 rounded-md">
      <h2 className="text-2xl font-bold">Which platforms are you interested in?</h2>
      <p className="mt-2">Select all that apply.</p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {['Mobile App', 'Web', 'Other', 'Not Sure'].map(option => (
          <button key={option} className="w-full bg-gray-800 py-3 rounded-md">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
  export default StepThree;