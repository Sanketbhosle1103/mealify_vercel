const mealPlan = `
  **Monday**
  * **Breakfast:** Oatmeal with berries and nuts (350 calories, 15g protein, 10g fat, 50g carbs)
  * **Lunch:** Lentil soup with brown rice (400 calories, 20g protein, 10g fat, 60g carbs)
  * **Evening Snack:** Apple with peanut butter (250 calories, 10g protein, 15g fat, 20g carbs)
  * **Dinner:** Vegan shepherd's pie with mashed potatoes (450 calories, 25g protein, 20g fat, 55g carbs)

  **Tuesday**
  * **Breakfast:** Tofu scramble with vegetables (300 calories, 20g protein, 10g fat, 30g carbs)
  * **Lunch:** Quinoa salad with chickpeas and vegetables (400 calories, 25g protein, 15g fat, 50g carbs)
  * **Evening Snack:** Banana smoothie with plant-based milk (250 calories, 10g protein, 10g fat, 40g carbs)
  * **Dinner:** Vegetable curry with roti (450 calories, 20g protein, 20g fat, 50g carbs)

  **Wednesday**
  * **Breakfast:** Vegan pancakes with fruit compote (350 calories, 15g protein, 10g fat, 50g carbs)
  * **Lunch:** Leftover vegetable curry with brown rice (400 calories, 20g protein, 10g fat, 60g carbs)
  * **Evening Snack:** Trail mix with nuts, seeds, and dried fruit (250 calories, 10g protein, 15g fat, 20g carbs)
  * **Dinner:** Vegan tacos with black beans and salsa (450 calories, 25g protein, 20g fat, 55g carbs)

  **Thursday**
  * **Breakfast:** Chickpea omelet with spinach (300 calories, 20g protein, 10g fat, 30g carbs)
  * **Lunch:** Lentil tacos with avocado (400 calories, 25g protein, 15g fat, 50g carbs)
  * **Evening Snack:** Popcorn with nutritional yeast (250 calories, 10g protein, 10g fat, 40g carbs)
  * **Dinner:** Vegan shepherd's pie with roasted vegetables (450 calories, 20g protein, 20g fat, 50g carbs)

  **Friday**
  * **Breakfast:** Smoothie bowl with fruit, plant-based milk, and granola (350 calories, 15g protein, 10g fat, 50g carbs)
  * **Lunch:** Leftover vegan shepherd's pie (400 calories, 20g protein, 10g fat, 60g carbs)
  * **Evening Snack:** Fruit salad with coconut milk (250 calories, 10g protein, 15g fat, 20g carbs)
  * **Dinner:** Vegetable biryani with tofu (450 calories, 25g protein, 20g fat, 55g carbs)

  **Saturday**
  * **Breakfast:** Vegan breakfast burrito with beans, vegetables, and salsa (350 calories, 15g protein, 10g fat, 50g carbs)
  * **Lunch:** Chana masala with roti (400 calories, 20g protein, 10g fat, 60g carbs)
  * **Evening Snack:** Rice cakes with hummus (250 calories, 10g protein, 15g fat, 20g carbs)
  * **Dinner:** Vegan sushi with brown rice (450 calories, 25g protein, 20g fat, 55g carbs)

  **Sunday**
  * **Breakfast:** Tofu scramble with vegetables and avocado (300 calories, 20g protein, 10g fat, 30g carbs)
  * **Lunch:** Leftover vegan sushi (400 calories, 20g protein, 10g fat, 60g carbs)
  * **Evening Snack:** Apple with cinnamon and almond butter (250 calories, 10g protein, 15g fat, 20g carbs)
  * **Dinner:** Vegetable pasta with marinara sauce (450 calories, 25g protein, 20g fat, 55g carbs)
`;

const separateMeals = (mealPlanText) => {
    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const days = mealPlanText.split(/\*\*\s*([A-Za-z]+)\s*\*\*/g);
    const mealDetails = [];

    for (let i = 1; i < days.length; i += 2) {
        const dayName = days[i].trim();
        if (!validDays.includes(dayName)) continue; // Filter out invalid day names
        
        const mealsText = days[i + 1].trim();

        const mealTypes = {
            breakfast: {
                meal: "",
                macros: {}
            },
            lunch: {
                meal: "",
                macros: {}
            },
            eveningSnack: {
                meal: "",
                macros: {}
            },
            dinner: {
                meal: "",
                macros: {}
            }
        };

        mealsText.split('\n').forEach(meal => {
            const mealComponents = meal.match(/(?:\*\s*)?(?:(?:\*\*.+\*\*\s*)?)(.*)\s*\((\d+)\s*calories,\s*(\d+)g\s*protein,\s*(\d+)g\s*fat,\s*(\d+)g\s*carbs\)/);
            if (mealComponents) {
                const [_, mealName, calories, protein, fat, carbs] = mealComponents;

                if (meal.includes("Breakfast")) {
                    mealTypes.breakfast.meal = mealName.trim();
                    mealTypes.breakfast.macros = { calories: parseInt(calories), protein: parseInt(protein), fat: parseInt(fat), carbs: parseInt(carbs) };
                } else if (meal.includes("Lunch")) {
                    mealTypes.lunch.meal = mealName.trim();
                    mealTypes.lunch.macros = { calories: parseInt(calories), protein: parseInt(protein), fat: parseInt(fat), carbs: parseInt(carbs) };
                } else if (meal.includes("Evening Snack")) {
                    mealTypes.eveningSnack.meal = mealName.trim();
                    mealTypes.eveningSnack.macros = { calories: parseInt(calories), protein: parseInt(protein), fat: parseInt(fat), carbs: parseInt(carbs) };
                } else if (meal.includes("Dinner")) {
                    mealTypes.dinner.meal = mealName.trim();
                    mealTypes.dinner.macros = { calories: parseInt(calories), protein: parseInt(protein), fat: parseInt(fat), carbs: parseInt(carbs) };
                }
            }
        });

        mealDetails.push({
            day: dayName,
            meals: mealTypes
        });
    }

    return mealDetails;
};

const mealsSeparated = separateMeals(mealPlan);
console.log(JSON.stringify(mealsSeparated, null, 2));
