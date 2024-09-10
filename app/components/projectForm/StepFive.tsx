const StepFive = () => (
    <div className="bg-gray-900 p-6 rounded-md">
      <h2 className="text-2xl font-bold">Do you require user interface design?</h2>
      <div className="mt-6 space-y-4">
        {['Yes', 'No, I already have mockups', 'Not applicable', 'Not sure yet'].map(option => (
          <button key={option} className="w-full bg-gray-800 py-3 rounded-md">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
export default StepFive;