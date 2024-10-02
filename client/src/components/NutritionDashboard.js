import React, { useState,useContext } from "react";
import { UserContext } from "../Usercontext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom"; // Import Link
import Navbar from "./Navbar";

const NutritionDashboard = () => {
  const [userName, setUserName] = useState("User");
  const [currentWeight, setCurrentWeight] = useState(65); // Current weight
  const [targetWeight, setTargetWeight] = useState(70); // Target weight
  const [weightGoal, setWeightGoal] = useState("Gain"); // Options: Gain, Lose, Maintain
  const { user } = useContext(UserContext);
  // Hardcoded recent meals data
  const recentMeals = [
    { meal: "Oatmeal", calories: 300 },
    { meal: "Grilled Chicken", calories: 400 },
    { meal: "Salad", calories: 200 },
    { meal: "Protein Shake", calories: 150 },
    { meal: "Pasta", calories: 350 },
  ];

  // Hardcoded weight data for visualization
  const weightData = [
    { week: "Week 1", weight: 68 },
    { week: "Week 2", weight: 69 },
    { week: "Week 3", weight: 69 },
    { week: "Week 4", weight: 67 },
    { week: "Week 5", weight: 66 },
    { week: "Week 6", weight: 65 },
  ];

  // Hardcoded nutrient intake data
  const nutrientIntake = {
    calories: 2000,
    protein: 150, // in grams
    carbs: 300, // in grams
    fats: 70, // in gram
  };

  const getTagline = () => {
    if (weightGoal === "Gain") {
      return currentWeight < targetWeight
        ? "You're on track to reach your target weight!"
        : "You've reached your target weight! Keep up the good work!";
    } else if (weightGoal === "Lose") {
      return currentWeight > targetWeight
        ? "Keep pushing! You're getting closer to your goal!"
        : "You've reached your target weight! Maintain it well!";
    } else {
      return "You're maintaining your weight perfectly!";
    }
  };

  return (
    <div>
      <Navbar className="mb-10" />
      <div className="p-6 bg-gray-100 min-h-screen mt-10">
        <h1 className="text-3xl font-bold mb-4 mt-3">Welcome back, {user.name}!</h1>

        {/* Recent Meal Logs */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold">Recent Meals</h2>
          <ul className="list-disc pl-5">
            {recentMeals.map((meal, index) => (
              <li key={index}>
                {meal.meal}: <span className="font-bold">{meal.calories}</span>{" "}
                kcal
              </li>
            ))}
          </ul>
        </div>

        {/* Links for Actions */}
        <div className="flex space-x-4 mb-6">
          <Link to="/calories" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Generate Meal Plan 
          </Link>
          <Link to="/previous-meals" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            View Previously Generated Meals
          </Link>
          <Link to="/gamification" className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            View Points 
          </Link>
          <Link to="/update-profile" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Update User Profile
          </Link>
        </div>

        {/* Weight Visualization */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
          <h2 className="text-lg font-semibold">Weekly Weight Tracking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Current and Target Weight Display */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-6">
          <h2 className="text-lg font-semibold">Weight Goals</h2>
          <p className="text-xl font-bold">
            Current Weight: {currentWeight} kg
          </p>
          <p className="text-xl font-bold">Target Weight: {targetWeight} kg</p>
          <p className="mt-2 italic">{getTagline()}</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;
