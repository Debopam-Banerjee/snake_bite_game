// AR (6)

import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert"; // Importing the CustomAlert component
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaStar, FaQuestionCircle } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";

const Level6 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deck, setDeck] = useState([]); // Track the deck of cards
  const [deckIndex, setDeckIndex] = useState(null); // Track the current deck index
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [selectedCards3, setSelectedCards3] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  // const [countdown, setCountdown] = useState(1000);
  const [level3Selection, setLevel3Selection] = useState(null);
  const [starCount, setStarCount] = useState(0)


  const handleCompleteLevel6 = () => {
    // Mark level 6 as completed
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
      level4: true,
      level5: true,
      level6: true,
      level7: true,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    const array = [];
    array.push(selectedCards1.text);
    array.push(selectedCards2.text);
    array.push(selectedCards3.text);

    console.log(array);
    localStorage.setItem("level6Result", JSON.stringify(array));
    setCompletedLevels(completedLevels);
    // console.log(level);

    // Navigate to level 7
    if (codeSelection()) {
      // Navigate to Level 7
      navigate("/level7", { state: { prev: location.state.prev + '-' + 6 } });
    } else {
      // Navigate to Level 8
      navigate("/level8");
    }
  };
  useEffect(() => {
    console.log(location.state?.prev);
    
    if (!location.state?.prev) {
      alert("You are not allowed to access Level 6!");
      navigate("/level1"); // Redirect to home or another page
    }

    // Save the current level path to localStorage
    localStorage.setItem("currentLevel", location.pathname);

    // Retrieve current level from localStorage on reload
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel); // Navigate to the saved level if it's different
    }
  }, [location, navigate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);
  }, [])

  const initialDeck = [
    { id: 1, text: "Inj. Adrenalin" },
    { id: 2, text: "0.25 ml" },
    { id: 3, text: "IM" },
    { id: 4, text: "1 ml" },
    { id: 5, text: "IV" },
    { id: 6, text: "SC" },
    { id: 7, text: "Inj. Hydrocortisone" },
    { id: 8, text: "Inj. Promethazine" },
    { id: 9, text: "Inj. Prochlorperazine" },
  ];

  // Correct sequence of cards
  const correctSequence = [
    { id: 1, text: "Inj. Adrenalin" },
    { id: 2, text: "0.25 ml" },
    { id: 3, text: "IM" },
  ];

  // Shuffle the deck when the component mounts
  // useEffect(() => {
  //   const shuffledDeck = shuffle(Array.from(initialDeck.entries()));
  //   setDeck(shuffledDeck);
  // }, []);

  // Function to shuffle the deck
  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Initialize shuffled deck when the component mounts
  useEffect(() => {
    setDeck(shuffle(initialDeck));
  }, []);

  // useEffect(() => {
  //   setDeck(initialDeck); // Set the first card as the initial card
  // }, []);

  useEffect(() => {
    if (
      selectedCards1.text !== undefined &&
      selectedCards2.text !== undefined &&
      selectedCards3.text !== undefined
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2, selectedCards3]);

  useEffect(() => {
    // Retrieve the selection from Level 2 from localStorage
    const level3Result = JSON.parse(localStorage.getItem("level3Result")) || [];
    if (level3Result) {
      setLevel3Selection(level3Result);
    }
  }, []);

  // useEffect(() => {
  //   if (countdown <= 0) {
  //     resetGame(); // Reload the page when countdown reaches zero
  //     return;
  //   }

  //   // Set the interval to decrease countdown every second (1000 ms)
  //   const timer = setInterval(() => {
  //     setCountdown((prev) => prev - 1);
  //   }, 1000);

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(timer);
  // }, [countdown]);

  // Shuffle function
  // const shuffle = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

  // function getRandomObject() {
  //   const randomIndex = Math.floor(Math.random() * initialDeck.length);
  //   return initialDeck[randomIndex];
  // }

  // const initialfun = () => {
  //   setDeck(getRandomObject());
  // };

  // const getText1 = () => {
  //   if (deck.text === undefined) {
  //     alert("Please select the card from the deck");
  //   } else {
  //     setSelectedCards1(deck);
  //     SetResult((prevResult) => [...prevResult, deck]);
  //     initialfun();
  //     // handleBoxClick(deck, setSelectedCards2, setSelectedCards3);
  //   }
  // };

  // const getText2 = () => {
  //   if (deck.text === undefined) {
  //     alert("Please select the card from the deck");
  //   } else {
  //     setSelectedCards2(deck);
  //     SetResult((prevResult) => [...prevResult, deck]);
  //     initialfun();
  //     // handleBoxClick(setSelectedCards1, deck, setSelectedCards3);
  //   }
  // };
  // const getText3 = () => {
  //   if (deck.text === undefined) {
  //     alert("Please select the card from the deck");
  //   } else {
  //     setSelectedCards3(deck);
  //     SetResult((prevResult) => [...prevResult, deck]);
  //     initialfun();
  //     // handleBoxClick(setSelectedCards1, setSelectedCards2, deck);
  //   }
  // };

  // Function to select a card from the deck
  const selectCard = (card) => {
    if (!card || !card.text) return;

    // Set the selected card in the respective empty box
    if (!selectedCards1.text) {
      setSelectedCards1(card);
    } else if (!selectedCards2.text) {
      setSelectedCards2(card);
    } else if (!selectedCards3.text) {
      setSelectedCards3(card);
    } else {
      console.log("All selections are filled.");
      return;
    }

    // Remove selected card from deck and show the next card
    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    if (newDeck.length > 0) {
      setDeckIndex(0); // Show the first card from the remaining deck
    } else {
      setDeckIndex(null); // No more cards left in the deck
    }
  };

  // Function to move to the next card in the deck
  const showNextCard = () => {
    if (deckIndex === null) {
      setDeckIndex(0); // Show the first card on the first click
    } else if (deckIndex < deck.length - 1) {
      setDeckIndex(deckIndex + 1); // Show the next card
    } else {
      setDeckIndex(0); // Reset to the first card when the deck ends
    }
  };

  // const res = () => {
  //   // console.log('sdsds');
  //   console.log(selectedCards1);
  //   console.log(selectedCards2);
  //   console.log(selectedCards3);

  //   if (
  //     selectedCards1.id === correctSequence[0].id &&
  //     selectedCards2.id === correctSequence[1].id &&
  //     selectedCards3.id === correctSequence[2].id
  //   ) {
  //     // console.log('correct');
  //     setShowSuccessPopup(true);
  //   } else {
  //     // console.log("incorrect");
  //     setShowWrongPopup(true); // Show wrong popup
  //   }

  //   // if(result.length>=3){
  //   //   console.log(result);

  //   // }
  // };

  const res = () => {
    // Create an array of selected cards
    const selectedCards = [
      selectedCards1.text,
      selectedCards2.text,
      selectedCards3.text,
    ];

    // Create an array of correct cards
    const correctCards = correctSequence.map((card) => card.text);

    // Check if all selected cards exist in the correct sequence (regardless of order)
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      console.log("correct");
      setShowSuccessPopup(true);
      localStorage.setItem("level6Result", JSON.stringify(selectedCards));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true); // Show wrong popup
    }
  };

  const handleBoxClick = () => {
    if (selectedCards1 && selectedCards2 && selectedCards3) {
      const userSequence = [selectedCards1, selectedCards2, selectedCards3];
      const correctSequenceIds = correctSequence.map((card) => card.id);
      const userSequenceIds = userSequence.map((card) => card.id);
      if (userSequenceIds.join(",") === correctSequenceIds.join(",")) {
        setShowSuccessPopup(true); // Show success popup
      } else {
        setShowWrongPopup(true); // Show wrong popup
      }
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel6();
  };

  const resetGame = () => {
    // setCountdown(1000);
    // Reset the selected cards
    setSelectedCards1({});
    setSelectedCards2({});
    setSelectedCards3({});
    setDeck(initialDeck); // Reset to the first card in the deck

    // Reshuffle the deck
    // const reshuffledDeck = shuffle(Array.from(initialDeck.entries()));
    // setDeck(reshuffledDeck);
  };

  const codeSelection = () => {
    const level3Result = JSON.parse(localStorage.getItem("level3Result")) || [];
    for (let i = 0; i < level3Result.length; i++) {
      if (level3Result[i] === "H") {
        return false;
      }
    }
    return true;
    // console.log(level3Result);
  };
  const res1 = (card) => {
    console.log(card);
    setSelectedCards1({});
    let newSelectedCards = [];
    const newCards = [...deck, card];
    setDeck(newCards);
    // setDeck(card);


  }
  const res2 = (card) => {
    console.log(card);
    setSelectedCards2({});
    let newSelectedCards = [];
    const newCards = [...deck, card];
    setDeck(newCards);
    // setDeck(card);


  }

  return (
    <div
      className="p-4 sm:p-6 flex flex-col items-center relative w-full h-full overflow-auto"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      
      {/* Star count on the top-left corner */}
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">{starCount}</span>
        </div>
      </div>

      {/* Icons on the top-right corner */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
{/*         <div className="flex items-center gap-2 cursor-pointer">
          <FaClock className="text-slate-50 text-xl sm:text-2xl" />

          <h2 className="text-xl text-blue-600 font-bold">
            {countdown}
          </h2>
        </div> */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-6 mb-3">
        {/* <h2 className="text-xl font-bold mx-auto mr-54">Choose card from deck</h2> */}
        <h2 className="text-2xl font-bold text-slate-50 mx-auto mr-50 text-center">
          {/* AVS reaction: */}
          5 mins after starting AVS, patient develops Anaphylactoid reactions.<br />{" "}
          Options available for management:
        </h2>
      </div>

      {/* Deck Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-4 mb-20 items-center mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-48 h-32 border-blue-500 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200 flex justify-center items-center"
            onClick={() => selectCard(card)} // Use selectCard to handle selection and removal
          >
            <p>{card.text}</p>
          </div>
        ))}
      </div>


      {/* Selected Boxes */}
      <div className="text-xl w-full h-30">
        <div>
          <h2 className="text-slate-50 text-center text-2xl font-bold">
            Select Correct options
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {/* {[selectedCards1, selectedCards2, selectedCards3].map((card, idx) => (
            <div
              key={idx}
              className="border-2 border-blue-400 w-60 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            >
              <p className="text-md text-center">{card.text}</p>
            </div>
          ))} */}
          <div
            // key={idx}
            className="border-2 border-blue-400 w-60 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={() => res1(selectedCards1)}
          >
            <p className="text-md text-center">{selectedCards1.text}</p>
          </div>
          <div
            // key={idx}
            className="border-2 border-blue-400 w-60 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={() => res2(selectedCards2)}
          >
            <p className="text-md text-center">{selectedCards2.text}</p>
          </div>
          <div
            // key={idx}
            className="border-2 border-blue-400 w-60 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
          >
            <p className="text-md text-center">{selectedCards3.text}</p>
          </div>
        </div>
      </div>

      {/* <div className="flex w-full mt-10">
          <h2 className="text-xl text-blue-600 font-bold">
            Time Remaining: {countdown} seconds
          </h2>
        </div> */}

      {/* Success Popup for Correct Sequence */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-amber-600 mb-4">
              Your choices are correct
            </h2>
            {codeSelection() ? (
              <button
                onClick={() => handleCompleteLevel6()}
                className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
              >
                Situation: Neurological sign
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleCompleteLevel6();
                    navigate("/level11", { state: { prev: location.state.prev + '-' + 6 } }); // Redirect to Level 11
                  }}
                  className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
                >
                  Situation 1: Initial WBCT result shows clotted
                </button>
                <button
                  onClick={() => {
                    handleCompleteLevel6();
                    navigate("/level12", { state: { prev: location.state.prev + '-' + 6 } }); // Redirect to Level 12
                  }}
                  className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
                >
                  Situation 2: Initial WBCT result shows not clotted
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Wrong Popup for Incorrect Sequence */}
      {showWrongPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Your choices are incorrect
            </h2>
            {/* <p className="mb-6">You have selected the wrong sequence.</p> */}
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setShowWrongPopup(false);
                resetGame();
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level6;
