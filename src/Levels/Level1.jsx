import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaQuestionCircle, FaStar } from "react-icons/fa";
import backgroundImage from "../assets/images/snake11.png";
import videoFile from "../assets/videos/How_to_Immobilize_like_a_fractured_limb.mp4";

const Level1 = ({ setCompletedLevels }) => {
  const location = useLocation();
  const navigate = useNavigate(); // For navigation to next level
  const [deck, setDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(null); // Track the current deck index
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [selectedCards3, setSelectedCards3] = useState({});
  const [selectedCards4, setSelectedCards4] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [result, SetResult] = useState([]);
  const [sc, setsc] = useState(0);
  const [starCount, setStarCount] = useState(0);
  // const [countdown, setCountdown] = useState(3000);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const handleCompleteLevel1 = () => {
    // Mark level 1 as completed
    const completedLevels = { level1: true };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    setCompletedLevels(completedLevels);
    // Automatically navigate to level 2
    navigate("/level2", { state: { prev: '1' } });
  };
  // Function to toggle the Help Button Dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);

  }, [])
  useEffect(() => {
    // Save the current level path to localStorage
    localStorage.setItem("currentLevel", location.pathname);

    // Retrieve current level from localStorage on reload
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel); // Navigate to the saved level if it's different
    }
  }, [location, navigate]);

  const initialDeck = [
    { id: 1, text: "Reassure" },
    { id: 2, text: "Apply tourniquets tightly to occlude blood flow" },
    { id: 3, text: "Immobilize like a fractured limb" },
    { id: 4, text: "Apply suction at wound site" },
    { id: 5, text: "Apply turmeric/antiseptic ointment to local wound" },
    { id: 6, text: "Make an incision at the bite site" },
    {
      id: 7,
      text: "Consult traditional healers, because they are locally accessible",
    },
    { id: 8, text: "Go to nearest Govt. hospital" },
    { id: 9, text: "Tell the doctor of any emergent sign" },
    { id: 10, text: "Try to capture the snake or take a picture of the snake" },
  ];

  const correctSequence = [
    { id: 1, text: "Reassure" },
    { id: 3, text: "Immobilize like a fractured limb" },
    { id: 8, text: "Go to nearest Govt. hospital" },
    { id: 9, text: "Tell the doctor of any emergent sign" },
  ];

  useEffect(() => {
    setDeck(initialDeck); // Set the first card as the initial card
  }, []);

  // Shuffles and sets the deck on initial load and when game is reset
  useEffect(() => {
    const shuffledDeck = shuffle([...initialDeck]);
    setDeck(shuffledDeck);
  }, []);

  useEffect(() => {
    if (
      selectedCards1.text !== undefined &&
      selectedCards2.text !== undefined &&
      selectedCards3.text !== undefined &&
      selectedCards4.text !== undefined
    ) {
      res();
    }
  }, [selectedCards1, selectedCards2, selectedCards3, selectedCards4]);

  // Function to select a card from the deck
  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    boxSetter(card); // Set the selected card in the respective box

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

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // let x = 0;
  // const getRandomObject = () => {
  //   const randomIndex = Math.floor(Math.random() * initialDeck.length);
  //   return initialDeck[randomIndex];
  // };

  // const initialfun = () => {
  //   setDeck(getRandomObject());
  // };

  const getText1 = () => {
    if (deck.text === undefined) {
      alert("Please select the card from the deck");
    } else {
      // console.log(deck);
      SetResult((prevResult) => [...prevResult, deck]);
      setSelectedCards1(deck);
      setDeck(initialDeck[1]); // Move to the next card in the deck
      // initialfun();
      // Remove selected card from deck
      // const remainingDeck = deck.filter((card) => card.id !== deck.id);
      // setDeck(remainingDeck);

      // handleBoxClick(deck, setSelectedCards2, setSelectedCards3, setSelectedCards4);
    }
  };

  const getText2 = () => {
    if (deck.text === undefined) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards2(deck);
      SetResult((prevResult) => [...prevResult, deck]);
      setDeck(initialDeck[2]); // Move to the next card in the deck
      // initialfun();
      // Remove selected card from deck
      // const remainingDeck = deck.filter((card) => card.id !== deck.id);
      // setDeck(remainingDeck);

      // handleBoxClick(setSelectedCards1, deck, setSelectedCards3, setSelectedCards4);
    }
  };

  const getText3 = () => {
    if (deck.text === undefined) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards3(deck);
      SetResult((prevResult) => [...prevResult, deck]);
      setDeck(initialDeck[3]); // Move to the next card in the deck
      // initialfun();
      // Remove selected card from deck
      // const remainingDeck = deck.filter((card) => card.id !== deck.id);
      // setDeck(remainingDeck);

      // handleBoxClick(setSelectedCards1, setSelectedCards2, deck, setSelectedCards4); // Remove the arguments here
    }
  };

  const getText4 = () => {
    if (deck.text === undefined) {
      alert("Please select the card from the deck");
    } else {
      setSelectedCards4(deck);
      SetResult((prevResult) => [...prevResult, deck]);
      setDeck({}); // No more cards left in the deck after 4 selections
      // initialfun();
      // Remove selected card from deck
      // const remainingDeck = deck.filter((card) => card.id !== deck.id);
      // setDeck(remainingDeck);

      // handleBoxClick(setSelectedCards1, setSelectedCards2, setSelectedCards3 , deck); // Remove the arguments here
    }
  };

  const res = () => {
    // Create an array of selected cards
    const selectedCards = [
      selectedCards1.text,
      selectedCards2.text,
      selectedCards3.text,
      selectedCards4.text,
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
      localStorage.setItem("level1Result", JSON.stringify(selectedCards));
    } else {
      console.log("incorrect");
      setShowWrongPopup(true); // Show wrong popup
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);

    handleCompleteLevel1();
  };

  const resetGame = () => {
    // setCountdown(3000);
    // Reset the selected cards
    setSelectedCards1({});
    setSelectedCards2({});
    setSelectedCards3({});
    setSelectedCards4({});
    setDeck(initialDeck); // Reset to the first card in the deck
    // setDeckIndex(null); // Reset deck index

    // // Reshuffle the deck
    // const reshuffledDeck = shuffle(Array.from(initialDeck.entries()));
    // setDeck(reshuffledDeck);
  };

  // Function to handle click on a selected box
  const handleBoxClick = (card, boxSetter) => {
    if (!card || !card.text) return; // Ignore empty clicks
    // Add the card back to the deck
    setDeck((prevDeck) => [...prevDeck, card]);
    // Reset the respective selected card to empty
    boxSetter({});
  };

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
        {/* <div className="flex items-center gap-2 cursor-pointer">
          <FaClock className="text-slate-50 text-xl sm:text-2xl" />
        </div> */}

        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>

      {isDropdownVisible && (
        <>
          <div className="dropdown absolute top-12 right-4 bg-white rounded-lg text-center">
            {/* <FaCaretUp className="absolute top-10 right-4"/> */}
            <p className="text-black text-base font-bold">How to Immobilize like a fractured limb?</p>
            <video className="rounded-b-lg" width="320" height="240" controls>
              <source src={videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </>
      )}
      <div className="m-6">
        <h2 className="text-2xl font-bold text-slate-50 mx-auto">
          You have come across a patient of Snake Bite. Now choose appropriate actions.
        </h2>
      </div>

      {/* Deck Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-10 items-center w-full max-w-screen-md mx-auto">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-full h-20 sm:h-24 md:h-32 border-blue-500 p-2 sm:p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200 flex justify-center items-center"
            onClick={() =>
              selectCard(
                card,
                !selectedCards1.text
                  ? setSelectedCards1
                  : !selectedCards2.text
                    ? setSelectedCards2
                    : !selectedCards3.text
                      ? setSelectedCards3
                      : setSelectedCards4
              )
            }
          >
            <p className="text-sm sm:text-md">{card.text}</p>
          </div>
        ))}
      </div>

      {/* Selected Boxes */}
      <div className="text-xl w-full h-30">
        <div>
          <h2 className="text-center text-3xl font-bold text-slate-50">
            Select Correct options
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[selectedCards1, selectedCards2, selectedCards3, selectedCards4].map(
            (card, idx) => (
              <div
                key={idx}
                className="border-2 border-blue-400 w-40 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() =>
                  handleBoxClick(
                    card,
                    [
                      setSelectedCards1,
                      setSelectedCards2,
                      setSelectedCards3,
                      setSelectedCards4,
                    ][idx]
                  )
                } // Use appropriate boxSetter
              >
                <p className="text-sm text-center">{card.text}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Success Popup for Correct Sequence */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm text-center">
            <h2 className="text-lg sm:text-2xl font-bold text-amber-600 mb-4">
              Your choices are correct
            </h2>
            <button
              className="bg-amber-950 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md"
              onClick={handleSuccessClose}
            >
              Proceed to the next level
            </button>
          </div>
        </div>
      )}

      {/* Wrong Popup for Incorrect Sequence */}
      {showWrongPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm text-center">
            <h2 className="text-lg sm:text-2xl font-bold text-red-400 mb-4">
              Your choices are incorrect
            </h2>
            {/* <p className="mb-4 sm:mb-6">You have selected the wrong option.</p> */}
            <button
              className="bg-red-400 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md"
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

export default Level1;