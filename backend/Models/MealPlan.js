const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mealPlan: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  dietaryRestrictions: {
    type: Object,
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
}, { timestamps: true });

const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

module.exports = MealPlan;
