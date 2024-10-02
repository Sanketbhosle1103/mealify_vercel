import React, { useState, useEffect } from "react";

const GamificationComponent = ({ points, setPoints }) => {
    const [badges, setBadges] = useState([]);
    const [progress, setProgress] = useState(0);
    const [milestones] = useState([100, 250, 500]); // Point milestones for badges

    // Reward tiers based on points
    const rewards = [
        { points: 100, reward: "10% off your next meal plan" },
        { points: 250, reward: "Free healthy recipe eBook" },
        { points: 500, reward: "Exclusive access to a nutrition webinar" },
    ];

    // Effect to check badges and update progress when points change
    useEffect(() => {
        checkBadges(points);
        updateProgress(points);
    }, [points]);

    // Effect to manage daily points earning
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
        const lastEarnedDate = localStorage.getItem("lastEarnedDate");

        // Check if points can be earned today
        if (lastEarnedDate !== today) {
            earnDailyPoints(50); // Points to earn each day
            localStorage.setItem("lastEarnedDate", today); // Update last earned date
        }
    }, []);

    const checkBadges = (totalPoints) => {
        milestones.forEach((milestone) => {
            if (totalPoints >= milestone && !badges.includes(`Milestone ${milestone} points`)) {
                setBadges((prevBadges) => [...prevBadges, `Milestone ${milestone} points`]);
            }
        });
    };

    const updateProgress = (totalPoints) => {
        setProgress((totalPoints / 1000) * 100); // Assuming 1000 is the target for full progress
    };

    const earnDailyPoints = (newPoints) => {
        setPoints((prevPoints) => prevPoints + newPoints); // Update points in the parent component
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            {/* Project Heading */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to Mealify!</h1>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Gamification Dashboard</h2>

            {/* Rewards Section */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Rewards Based on Points:</h3>
                <p className="text-gray-600 mb-2">Earn exciting rewards as you accumulate points!</p>
                <ul className="space-y-2">
                    {rewards.map((reward, index) => (
                        <li key={index} className={`p-2 rounded-lg ${points >= reward.points ? "bg-green-200" : "bg-gray-300"}`}>
                            <span className={`${points >= reward.points ? "text-green-700 font-bold" : "text-gray-500"}`}>
                                {reward.points} Points: {reward.reward}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <h3 className="text-xl text-center text-gray-700 mb-2">
                Your Points: <span className="text-blue-600">{points}</span>
            </h3>
            <p className="text-center text-gray-600 mb-4">Track your progress and earn rewards as you engage!</p>

            {/* Badges Section */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Badges Earned:</h3>
                <p className="text-gray-600 mb-2">Collect badges as you reach important milestones!</p>
                <ul className="space-y-2">
                    {badges.map((badge, index) => (
                        <li key={index} className="bg-yellow-300 p-2 rounded-lg transition-transform transform hover:scale-105 hover:shadow-md">
                            {badge}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Progress Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress:</h3>
                <p className="text-gray-600 mb-2">Visualize your progress towards the ultimate goal!</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{progress.toFixed(0)}%</h3>
                <div className="bg-gray-300 h-4 rounded-full overflow-hidden">
                    <div
                        className="bg-green-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default GamificationComponent;
