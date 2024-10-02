import React, { useState, useEffect, useCallback } from "react";

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

  // Memoized function to check badges
  const checkBadges = useCallback(
    (totalPoints) => {
      milestones.forEach((milestone) => {
        if (
          totalPoints >= milestone &&
          !badges.includes(`Milestone ${milestone} points`)
        ) {
          setBadges((prevBadges) => [
            ...prevBadges,
            `Milestone ${milestone} points`,
          ]);
        }
      });
    },
    [milestones, badges] // dependencies for checkBadges
  );

  // Memoized function to earn daily points
  const earnDailyPoints = useCallback(
    (newPoints) => {
      setPoints((prevPoints) => prevPoints + newPoints); // Update points in the parent component
    },
    [setPoints]
  );

  const updateProgress = useCallback((totalPoints) => {
    setProgress((totalPoints / 1000) * 100); // Assuming 1000 is the target for full progress
  }, []);

  // Effect to check badges and update progress when points change
  useEffect(() => {
    checkBadges(points);
    updateProgress(points);
  }, [points, checkBadges, updateProgress]);

  // Effect to manage daily points earning
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const lastEarnedDate = localStorage.getItem("lastEarnedDate");

    // Check if points can be earned today
    if (lastEarnedDate !== today) {
      earnDailyPoints(50); // Points to earn each day
      localStorage.setItem("lastEarnedDate", today); // Update last earned date
    }
  }, [earnDailyPoints]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      return (
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        {/* Display Progress */}
        <div>
          <h3>Your Progress: {progress}%</h3>
          <div className="bg-gray-300 h-4 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Display Rewards */}
        <div>
          <h3>Available Rewards</h3>
          <ul>
            {rewards.map((reward, index) => (
              <li key={index}>
                {reward.points} Points: {reward.reward}
              </li>
            ))}
          </ul>
        </div>
      </div>
      );
    </div>
  );
};

export default GamificationComponent;
