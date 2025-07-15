const GenderSelection = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Gender
      </label>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded-full checked:bg-purple-600 checked:border-transparent"
          />
          <label htmlFor="male" className="ml-2 block text-sm text-gray-700">
            Male
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded-full checked:bg-purple-600 checked:border-transparent"
          />
          <label htmlFor="female" className="ml-2 block text-sm text-gray-700">
            Female
          </label>
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
