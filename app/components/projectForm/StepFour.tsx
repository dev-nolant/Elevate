const StepFour = () => (
    <div className="bg-gray-900 p-6 rounded-md">
      <h2 className="text-2xl font-bold">Do you have specific technology requirements?</h2>
      <p className="mt-2">Most people can skip this, but if you have specific tools, please select below.</p>
      <div className="mt-6 grid grid-cols-4 gap-2">
        {['AWS', 'Android', 'Angular', 'Apache', 'Django', 'React', 'SQL', 'Node'].map(option => (
          <button key={option} className="w-full bg-gray-800 py-3 rounded-md">
            {option}
          </button>
        ))}
      </div>
    </div>
  );
export default StepFour;