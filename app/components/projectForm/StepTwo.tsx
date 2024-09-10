const StepTwo = () => (
    <div className="bg-gray-900 p-6 rounded-md">
      <h2 className="text-2xl font-bold">When are you looking to start?</h2>
      <div className="mt-6 space-y-4">
        {['ASAP', 'In the next month', '1 to 2 months from now', '3 to 6 months from now', 'Not sure yet'].map(option => (
          <button key={option} className="w-full bg-gray-800 py-3 rounded-md">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
  export default StepTwo;