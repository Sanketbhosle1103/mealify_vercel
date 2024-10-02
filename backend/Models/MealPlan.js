const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  mealPlan: {
    type: Object, // You can customize this type based on your generated meal plan structure
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  dietaryRestrictions: {
    type: Object, // Change to Object to accommodate structured data
    required: true,
  },
  selectedCountry: {
    type: String,
    required: true,
  },
  selectedState: {
    type: String,
    required: true,
  },
  selectedCity: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
  },
  protein: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

module.exports = MealPlan;
