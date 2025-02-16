import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FinalResult13 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showStarPopup, setShowStarPopup] = useState(true);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);


  const pathA = ["level1Result", "level2Result", "level3Result", "level4Result", "level6Result", "level7Result", "level9Result", "level13Result"];
  const pathB = ["level1Result", "level2Result", "level3Result", "level4Result", "level6Result", "level7Result", "level10Result", "level9Result", "level13Result"];
  const pathC = ["level1Result", "level2Result", "level3Result", "level4Result", "level6Result", "level7Result", "level10Result", "level9Result", "level14Result", "level13Result"];

  const [allResults, setAllResults] = useState({});

  const isPathB = location.state?.isPathB ?? false;
  const isPathC = location.state?.isPathC ?? false;
  // const isPathA = location.state?.isPathA ?? false;

  const useDisplayPath = (isPathB, isPathC) => {
    return React.useMemo(() => {
      if (isPathC) return pathC;
      if (isPathB) return pathB;
      return pathA;
    }, [isPathB, isPathC]);
  };

  // Usage in the component
  const displayPath = useDisplayPath(isPathB, isPathC);






  const levelTitles = {
    level1Result: "You have come across a patient of Snake bite",
    level2Result: "Initial Management",
    level3Result: "Various findings related to Snake bite considering one type of envenomation",
    level4Result: "Options available for management",
    level6Result: "5 mins after starting AVS, patient develops Anaphylactoid. Options available for management",
    level7Result: "Neurological signs",
    level9Result: "Improving after 30 min",
    level10Result: "Not improving after 30 min",
    level13Result: "Improving",
    level14Result: "Not improving",
  };

  // Function to check if all values in "path" are true
  const areAllPathsTrue = () => {
    const pathData = JSON.parse(localStorage.getItem("path"));
    return pathData && Object.values(pathData).every(value => value === true);
  };

  const handlepopup = () => {
    setShowStarPopup(false);
  }

  useEffect(() => {
    const results = {
      level1Result: JSON.parse(localStorage.getItem("level1Result")),
      level2Result: JSON.parse(localStorage.getItem("level2Result")),
      level3Result: JSON.parse(localStorage.getItem("level3TextResult")),
      level4Result: JSON.parse(localStorage.getItem("level4Result")),
      level6Result: JSON.parse(localStorage.getItem("level6Result")),
      level7Result: JSON.parse(localStorage.getItem("level7Result")),
      level9Result: JSON.parse(localStorage.getItem("level9Result")),
      level10Result: JSON.parse(localStorage.getItem("level10Result")),
      level13Result: JSON.parse(localStorage.getItem("level13Result")),
      level14Result: JSON.parse(localStorage.getItem("level14Result")),
    };

    console.log("Results from localStorage:", results);
    setAllResults(results);
  }, []);

  // Function to handle Home button click
  const handleHomeClick = () => {
    if (areAllPathsTrue()) {
      navigate("/rules"); // Redirect to Rules.jsx if all paths are true
    } else {
      const pathData = localStorage.getItem("path");
      localStorage.clear();
      if (pathData !== null) {
        localStorage.setItem("path", pathData);
      }
      navigate("/level1");
    }
  };


  // Function to handle Exit button click
  const handleExitClick = () => {
    if (areAllPathsTrue()) {
      setShowCompletionPopup(true); // Show completion popup if all are true
    } else {
      setShowWarningPopup(true); // Otherwise, show warning popup
    }
  };

  // Function to confirm exit even after warning
  const confirmExit = () => {
    localStorage.clear(); // Clear all data from localStorage
    window.location.href = "https://google.com";
  };

  return (
    <>
      {showStarPopup ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" >
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm text-center">
            <h2 className="text-lg sm:text-2xl font-bold text-amber-600 mb-4">
              You completed one path and achieved one star.
            </h2>
            <button
              className="bg-amber-950 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md"
              onClick={handlepopup}
            >
              Got it!
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-blue-500 mb-6">Final Results</h2>
            <p className="text-lg text-gray-600 mb-4 font-semibold">
              The options you selected since Level 1
            </p>

            <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg">
              <ul>
                {displayPath.map((levelKey, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">
                      {levelTitles[levelKey] || levelKey.replace("Result", "")}:
                    </h3>
                    {allResults[levelKey] ? (
                      <p className="text-gray-600">{allResults[levelKey].join(", ")}</p>
                    ) : (
                      <p className="text-gray-400">No result found</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleHomeClick}
                className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-600 transition"
              >
                Home
              </button>
              <button
                onClick={handleExitClick}
                className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-blue-600 transition"
              >
                Exit
              </button>
            </div>
          </div>
          {showWarningPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <h2 className="text-lg font-bold text-red-600 mb-4">
                  You'll lose all your stars you collected, if you press Exit now!
                </h2>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={confirmExit}
                  >
                    Confirm Exit
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    onClick={() => setShowWarningPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )
      }
      {showCompletionPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-bold text-amber-600 mb-4">
              Congratulations! You have collected all the 8 stars and successfully completed the game.
            </h2>
            <p className="text-gray-600 mb-4">
              Now you can exit or you can start over again.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "https://google.com";
                }}
              >
                Exit
              </button>
              <button
                className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition"
                onClick={() => {
                  navigate("/rules");
                }}
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalResult13;
