import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const MealPlan = () => {
  const mealPlan = [
    {
      meal: "Grilled Chicken with Quinoa and Veggies",
      description:
        "A high-protein, balanced meal with grilled chicken, quinoa, and a mix of fiber-rich vegetables.",
      ingredients: [
        "150g Grilled Chicken Breast",
        "1 cup Cooked Quinoa",
        "1/2 cup Steamed Broccoli",
        "1/2 cup Roasted Bell Peppers",
        "1 tbsp Olive Oil",
        "Spices: garlic powder, salt, pepper",
      ],
      instructions: [
        "Grill the chicken breast until fully cooked.",
        "Cook the quinoa as per package instructions.",
        "Steam the broccoli and roast the bell peppers in olive oil.",
        "Serve the chicken with quinoa and veggies on the side.",
      ],
      cookingTime: "30 minutes",
      nutritionalValue: {
        calories: 500,
        protein: 45,
        carbs: 55,
        fats: 12,
      },
    },
    {
      meal: "Avocado and Tofu Salad",
      description:
        "A refreshing salad with healthy fats from avocado and plant-based protein from tofu.",
      ingredients: [
        "100g Firm Tofu",
        "1 Avocado",
        "1 cup Mixed Greens (Spinach, Arugula)",
        "1/4 cup Cherry Tomatoes",
        "1 tbsp Olive Oil",
        "1 tbsp Lemon Juice",
      ],
      instructions: [
        "Pan-fry the tofu until golden brown.",
        "Slice the avocado and toss it with the mixed greens and cherry tomatoes.",
        "Drizzle with olive oil and lemon juice, then top with fried tofu.",
      ],
      cookingTime: "15 minutes",
      nutritionalValue: {
        calories: 350,
        protein: 15,
        carbs: 20,
        fats: 25,
      },
    },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen py-10 px-5">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-12">
          Personalized Meal Plan
        </h1>
        <div className="grid gap-10 md:grid-cols-2">
          {mealPlan.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
            >
              {/* Meal Title */}
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                {meal.meal}
              </h2>
              <p className="text-gray-700 mb-4">{meal.description}</p>

              {/* Ingredients & Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {meal.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    Instructions
                  </h3>
                  <ol className="list-decimal list-inside text-gray-600">
                    {meal.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Cooking Time */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-indigo-600">
                  Cooking Time:{" "}
                  <span className="text-indigo-800">{meal.cookingTime}</span>
                </h3>
              </div>

              {/* Nutritional Value Chart */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-indigo-600 mb-4">
                  Nutritional Value Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      {
                        name: "Calories",
                        value: meal.nutritionalValue.calories,
                      },
                      {
                        name: "Protein",
                        value: meal.nutritionalValue.protein,
                      },
                      {
                        name: "Carbs",
                        value: meal.nutritionalValue.carbs,
                      },
                      {
                        name: "Fats",
                        value: meal.nutritionalValue.fats,
                      },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart for Macro Breakdown */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-indigo-600 mb-4">
                  Macronutrient Composition
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Protein", value: meal.nutritionalValue.protein },
                        { name: "Carbs", value: meal.nutritionalValue.carbs },
                        { name: "Fats", value: meal.nutritionalValue.fats },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {COLORS.map((color, idx) => (
                        <Cell key={`cell-${idx}`} fill={color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlan;