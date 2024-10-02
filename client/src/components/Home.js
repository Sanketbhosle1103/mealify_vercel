import React, { useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  // Hardcoded Meal Plans
  const mealPlans = [
    {
      id: 1,
      title: "Weight Loss Plan",
      description:
        "A balanced meal plan aimed at weight loss with delicious recipes.",
      price: "$29.99/month",
    },
    {
      id: 2,
      title: "Muscle Gain Plan",
      description:
        "Designed for those looking to gain muscle with high-protein meals.",
      price: "$34.99/month",
    },
    {
      id: 3,
      title: "Gluten-Free Plan",
      description:
        "Perfect for those with gluten intolerance, featuring safe and tasty meals.",
      price: "$29.99/month",
    },
    {
      id: 4,
      title: "Vegan Plan",
      description:
        "A plant-based meal plan with a variety of nutrient-rich recipes.",
      price: "$24.99/month",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Turner",
      feedback:
        "This app helped me maintain a balanced diet and meet my weight loss goals. The meal plans are easy to follow and the recipes are delicious.",
      title: "Health Enthusiast",
    },
    {
      name: "David Rodriguez",
      feedback:
        "I struggled with meal planning for my gluten-free diet, but this app has made it so simple. The custom plans fit my dietary needs perfectly.",
      title: "Gluten-Free User",
    },
    {
      name: "Emily Foster",
      feedback:
        "The personalized meal suggestions have been a game-changer for me. I’ve seen significant progress in my fitness journey.",
      title: "Fitness Enthusiast",
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(
      (currentTestimonialIndex + 1) % testimonials.length
    );
  };

  const previousTestimonial = () => {
    setCurrentTestimonialIndex(
      (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Button Component
  const Button = ({ children }) => (
    <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition">
      {children}
    </button>
  );

  // SubHead Component
  const SubHead = ({ color, title }) => (
    <h2 className={`text-${color} font-semibold text-lg uppercase`}>
      {title}
    </h2>
  );

  // SectionHead Component
  const SectionHead = ({ color, title }) => (
    <h2 className={`text-${color} text-3xl font-bold my-4`}>{title}</h2>
  );

  return (
    <div>
      <Navbar />
      {/* Main Content Wrapper */}
      <div className="pt-16">
        {/* Hero Section */}
        <div
          className="bg-fixed bg-cover bg-center pt-40 pb-6 md:pb-40 xl:h-screen md:flex items-center justify-between"
          style={{ backgroundImage: `url('/images/nutrition_hero.jpg')` }}
        >
          {/* <div className="px-4 md:px-10">
            <h2
              className="text-white text-extraLarge md:text-[50px] md:leading-none md:w-[80%] xl:w-[70%] font-bold uppercase py-16"
              style={{ fontFamily: "'Teko', sans-serif", position: "absolute", top: "45px", left: "800px", width:"500px",fontSize:"30px" }}
            >
              Create Your Perfect Meal Plan for a Healthy Life.
            </h2>
          </div> */}
        </div>

        {/* Meal Plan Section */}
        <div className="lg:flex items-center justify-between xl:my-10">
          <div className="px-3 lg:w-1/2">
            <img
              className="block mx-auto"
              src="/images/meal_plan.png"
              alt="Personalized Meal Plan"
            />
          </div>
          <div className="py-10 px-4 md:px-10 lg:w-1/2">
            <div className="flex items-center">
              <div className="h-[2px] w-[100px] bg-orange"></div>
              <SubHead color="main" title="About Our Meal Plans" />
            </div>
            <SectionHead color="black" title="Personalized Plans for Every Diet" />
            <p className="text-base text-blackGray">
              Create your custom meal plan based on your dietary restrictions,
              preferences, and health goals. Whether you're vegan, gluten-free, or
              looking to gain muscle, we have a plan for you.
            </p>
            <div className="my-10">
              <Button>
                <Link to="/calories" className="md:px-2">
                  Start Planning
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Recipe Suggestions Section */}
        <div className="bg-fixed bg-cover bg-center pb-10">
          <div className="px-5">
            <div className="flex items-center">
              <div className="h-[2px] w-[100px] bg-white"></div>
              <SubHead color="main" title="Recipe Suggestions" />
            </div>
            <div className="lg:flex items-center justify-between">
              <SectionHead color="white" title="Delicious Recipes for Your Meal Plan" />
              <div className="lg:w-3/12">
                <Button>
                  <Link to="/recipes" className="md:px-2">
                    Explore Recipes
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="md:flex justify-center">
            <RecipeCard
              title="Vegan Buddha Bowl"
              description="A hearty vegan bowl packed with fresh veggies, grains, and a tangy dressing."
              recipeLink="/recipes/vegan-buddha-bowl"
              image="/images/vegan_buddha_bowl.jpg"
            />
            <RecipeCard
              title="Gluten-Free Pancakes"
              description="Fluffy pancakes made with almond flour, perfect for a gluten-free breakfast."
              recipeLink="/recipes/gluten-free-pancakes"
              image="/images/gluten_free_pancakes.jpg"
            />
            <RecipeCard
              title="High-Protein Smoothie"
              description="A refreshing smoothie packed with protein for your post-workout recovery."
              recipeLink="/recipes/high-protein-smoothie"
              image="/images/smoothie.jpg"
            />
          </div>
        </div>

        {/* Our Plans Section */}
        <div className="bg-white pb-10 px-5">
          <div className="flex justify-center mb-10">
            <div>
              <div className="flex items-center">
                <div className="h-1 w-24 bg-orange-500 rounded-md mx-2"></div>
                <SubHead color="main" title="Choose Your Plan" />
              </div>
              <SectionHead color="black" title="Select a Plan that Fits Your Goals" />
            </div>
          </div>
          <div className="md:flex justify-center">
            <ul className="list-disc list-inside space-y-6 md:space-y-0 md:flex md:space-x-8">
              {mealPlans.map((plan) => (
                <li
                  key={plan.id}
                  className="bg-white p-5 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  <h3 className="text-lg font-semibold">{plan.title}</h3>
                  <p>{plan.description}</p>
                  <p className="font-bold text-orange-500">{plan.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
