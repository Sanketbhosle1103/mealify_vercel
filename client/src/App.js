import "./App.css";
// import React from 'react';
import React, { useState } from "react";
import Login from "./components/Login";
import Signin from "./components/Signin";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { UserContextProvider } from "./Usercontext";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewProfile from "./components/ViewProfile";
import UpdateProfile from "./components/UpdateProfile";
import GenerateRecipe from "./components/GenerateRecipe";
import MealPlan from "./components/RecipeVisualization";
import NutritionDashboard from "./components/NutritionDashboard";
import GenerateCalories from "./components/GenerateCalories";
import GamificationComponent from "./components/GamificationComponent";

function App() {

  const [points, setPoints] = useState(0);

    const updatePoints = (newPoints) => {
        setPoints((prevPoints) => prevPoints + newPoints);
    };

  return (
    <div>
      <UserContextProvider>
        {/* <Router> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/visualize" element={<MealPlan />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<NutritionDashboard />} />
            <Route path="/gamification" element={<GamificationComponent points={points} setPoints={setPoints} />}/>
            <Route path="/generate" element={<GenerateRecipe />} />
            <Route path="/calories" element={<GenerateCalories updatePoints={updatePoints}  />} />
            <Route path="/view-profile" element={<ViewProfile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            {/* <Route path="/account/:subpage/:action" element={<Account />} /> */}
          </Route>
        </Routes>
        {/* </Router> */}
      </UserContextProvider>
    </div>
  );
}

export default App;
