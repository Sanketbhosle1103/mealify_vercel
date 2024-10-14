const express = require("express");
const router = express.Router();
const MealPlan = require("../Models/MealPlan");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDBKaJCznbPCiiP3agJlxgTdSYLZ5BIU9U");

const separateMeals = (mealPlanText) => {
  console.log("Input to separateMeals:", mealPlanText); // Debug log
  const validDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
  ];

  const days = mealPlanText.split(/\*\*\s*([A-Za-z]+)\s*\*\*/g);
  console.log("Days split from input:", days); // Debug log

  const mealDetails = [];

  for (let i = 1; i < days.length; i += 2) {
    const dayName = days[i].trim();
    if (!validDays.includes(dayName)) {
      console.log(`Invalid day skipped: ${dayName}`); // Debug log
      continue; // Filter out invalid day names
    }

    const mealsText = days[i + 1].trim();
    console.log(`Meals for ${dayName}:`, mealsText); // Debug log

    const mealTypes = {
      breakfast: { meal: "", macros: {} },
      lunch: { meal: "", macros: {} },
      eveningSnack: { meal: "", macros: {} },
      dinner: { meal: "", macros: {} },
    };

    mealsText.split("\n").forEach((meal) => {
      console.log("Processing meal:", meal); // Debug log
      const mealComponents = meal.match(
        /(?:\*\s*)?(?:(?:\*\*.+\*\*\s*)?)(.*)\s*\((\d+)\s*calories,\s*(\d+)g\s*protein,\s*(\d+)g\s*fat,\s*(\d+)g\s*carbs\)/
      );
      if (mealComponents) {
        const [_, mealName, calories, protein, fat, carbs] = mealComponents;

        // Assigning meals based on the meal type
        if (meal.includes("Breakfast")) {
          mealTypes.breakfast.meal = mealName.trim();
          mealTypes.breakfast.macros = {
            calories: parseInt(calories),
            protein: parseInt(protein),
            fat: parseInt(fat),
            carbs: parseInt(carbs),
          };
        } else if (meal.includes("Lunch")) {
          mealTypes.lunch.meal = mealName.trim();
          mealTypes.lunch.macros = {
            calories: parseInt(calories),
            protein: parseInt(protein),
            fat: parseInt(fat),
            carbs: parseInt(carbs),
          };
        } else if (meal.includes("Evening Snack")) {
          mealTypes.eveningSnack.meal = mealName.trim();
          mealTypes.eveningSnack.macros = {
            calories: parseInt(calories),
            protein: parseInt(protein),
            fat: parseInt(fat),
            carbs: parseInt(carbs),
          };
        } else if (meal.includes("Dinner")) {
          mealTypes.dinner.meal = mealName.trim();
          mealTypes.dinner.macros = {
            calories: parseInt(calories),
            protein: parseInt(protein),
            fat: parseInt(fat),
            carbs: parseInt(carbs),
          };
        }
      } else {
        console.log("No meal components found for:", meal); // Debug log
      }
    });

    mealDetails.push({
      day: dayName,
      meals: mealTypes,
    });
  }

  console.log("Final Meal Details:", mealDetails); // Debug log
  return mealDetails;
};

router.post("/generate-mealplan", async (req, res) => {
  const {
    dietaryRestrictions,
    selectedCountry,
    selectedState,
    selectedCity,
    schedule,
    maintenanceCalorie,
    protein,
    fats,
    carbs,
  } = req.body;

  const mealPlanPrompt = `You are a nutrition expert.
  They have the following dietary restrictions: ${Object.entries(
    dietaryRestrictions
  )
    .filter(([_, v]) => v)
    .map(([k]) => k)
    .join(", ")}.
  The user lives in ${selectedCity}, ${selectedState}, ${selectedCountry}.
  You have to generate a meal plan for the user.
  They aim for a goal of ${protein} grams of protein, ${fats} grams of fat and ${carbs} grams of carbs.
  Calculate the total calories for the day based on the above macros.
  Provide a meal-plan for this much time period: ${schedule}.
  
  Incorporate ingredients that are locally available and commonly used in regional dishes.

  The format of the meal plan should include breakfast, lunch, evening snack and dinner. Just make sure that the total number of calories match the ${maintenanceCalorie} and the total macro nutrients match the user's requirements as well. Provide the macronutrients for each meal as well.
  
  Just give the data for the days required and nothing else meaning only give for the days specified
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const mealPlanResult = await model.generateContent(mealPlanPrompt);
    const generatedMealPlan = mealPlanResult.response.text().trim();

    // console.log(generatedMealPlan)
    const finalMeal = separateMeals(generatedMealPlan);
    console.log(finalMeal);

    // await MealPlan.create({
    //   userId: userid,
    //   mealPlan: generatedMealPlan,
    //   goal : maintenanceCalorie,
    //   dietaryRestrictions: JSON.stringify(dietaryRestrictions),
    //   selectedCountry,
    //   selectedState,
    //   selectedCity,
    //   schedule,
    //   protein,
    //   fats:req.body.fat,
    //   carbs
    // });

    res.json({ mealPlan: finalMeal });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the meal plan." });
  }
});

router.post("generate-recipe", async (req, res) => {
  const {
    mealType,
    calories,
    protein,
    carbs,
    fats,
    selectedCountry,
    selectedState,
    selectedCity,
    dietaryRestrictions,
  } = req.body;

  const recipePrompt = `You are a nutrition expert generating recipes for a user based on their location (${selectedCity}, ${selectedState}, ${selectedCountry}) and dietary preferences.
  
  They have the following dietary restrictions: ${Object.entries(
    dietaryRestrictions
  )
    .filter(([_, v]) => v)
    .map(([k]) => k)
    .join(", ")}.

  Suggest 2-3 recipes for ${mealType} with ${calories} calories, ${protein} grams of protein, ${fats} grams of fats and ${carbs} grams of carbs.
  
  Each recipe should include:
  - Meal name (preferably a local dish or something inspired by regional cuisine)
  - Ingredients (must include local ingredients)
  - Step-by-step instructions
  - Cooking time
  - Must match the nutritional values (calories, protein, carbs, and fats)`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const recipeResult = await model.generateContent(recipePrompt);
    const generatedRecipe = recipeResult.response.text().trim();

    console.log(generatedRecipe);

    res.json({ generatedRecipe });
  } catch (error) {
    console.error("Error generating recipes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the recipes." });
  }
});

router.get("/getmealplan/:id", async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ userId: req.params.id });
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
