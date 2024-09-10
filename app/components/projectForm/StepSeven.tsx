


const StepSeven = () => (
    <div className="bg-gray-900 p-6 rounded-md">
      <h2 className="text-2xl font-bold">Contact Details</h2>
      <div className="mt-6 space-y-4">
        <input type="text" placeholder="Your Name *" className="w-full bg-gray-800 py-3 rounded-md text-white" />
        <input type="text" placeholder="Company" className="w-full bg-gray-800 py-3 rounded-md text-white" />
        <input type="email" placeholder="Your Email *" className="w-full bg-gray-800 py-3 rounded-md text-white" />
        <input type="text" placeholder="Phone (Recommended)" className="w-full bg-gray-800 py-3 rounded-md text-white" />
        <textarea placeholder="A description of your project" className="w-full bg-gray-800 py-3 rounded-md text-white"></textarea>
      </div>
    </div>
  );
  
export default StepSeven;