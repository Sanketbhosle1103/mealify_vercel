import React from "react";

const RecipeCard = ({ title, image, description, recipeLink }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      {/* Recipe Image */}
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        {/* Recipe Title */}
        <div className="font-bold text-xl mb-2 text-center" >{title}</div>
        {/* Short Description */}
        <p className="text-gray-700 text-base text-center">{description}</p>
      </div>
      <div className="px-6 flex justify-center mb-4">
        {/* Button to View Full Recipe */}
        <a
          href={recipeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
