import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/snake11.png";
import { FaClock, FaStar, FaQuestionCircle } from "react-icons/fa";

const Level2 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [level2Selection, setLevel2Selection] = useState(null);
  const [deck, setDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(null);
  const [selectedCards1, setSelectedCards1] = useState({});
  const [selectedCards2, setSelectedCards2] = useState({});
  const [selectedCards3, setSelectedCards3] = useState({});
  const [selectedCards4, setSelectedCards4] = useState({});
  const [selectedCards5, setSelectedCards5] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [starCount, setStarCount] = useState(0);

  // useEffect(() => {
  //   const level2Result = JSON.parse(localStorage.getItem("level2Result")) || [];
  //   if (level2Result) setLevel2Selection(level2Result);
  // }, []);

  const initialDeck = [
    { id: 1, text: "Secure Respiration and Airway" },
    { id: 2, text: "Admit the patient" },
    { id: 3, text: "Start IVF with NS/5D" },
    { id: 4, text: "Inj. Tetanus Toxoid" },
    { id: 5, text: "Secure Airway" },
    { id: 6, text: "Avoid I/V cannula insertion in case of Haemotoxic bite" },
    { id: 7, text: "Avoid any IM or IV injections" },
    { id: 8, text: "Start Antibiotics immediately" },
    { id: 9, text: "Sedate with Diazepam" },
    { id: 10, text: "10 WBCT" },
    { id: 11, text: "20 WBCT" },
    { id: 12, text: "PT, INR" },
  ];

  const correctSequence = [
    { id: 1, text: "Secure Respiration and Airway" },
    { id: 2, text: "Admit the patient" },
    { id: 3, text: "Start IVF with NS/5D" },
    { id: 4, text: "Inj. Tetanus Toxoid" },
    { id: 11, text: "20 WBCT" },
  ];

  // Shuffle function
  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);

  }, [])
  // Set shuffled deck on mount
  useEffect(() => {
    if (!location.state?.prev) {
      alert("You are not allowed to access Level 2!");
      navigate("/level1"); // Redirect to home or another page
    }
    console.log(location.state.prev + '-' + 2);//1-2
    const shuffledDeck = shuffleDeck([...initialDeck]);
    setDeck(shuffledDeck);
  }, []);

  const selectCard = (card, boxSetter) => {
    if (!card || !card.text) return;
    boxSetter(card);
    const newDeck = deck.filter((c) => c.id !== card.id);
    setDeck(newDeck);
    setDeckIndex(newDeck.length > 0 ? 0 : null);
  };

  const showNextCard = () => {
    if (deckIndex === null) setDeckIndex(0);
    else if (deckIndex < deck.length - 1) setDeckIndex(deckIndex + 1);
    else setDeckIndex(0);
  };

  useEffect(() => {
    if (
      selectedCards1.text &&
      selectedCards2.text &&
      selectedCards3.text &&
      selectedCards4.text &&
      selectedCards5.text
    ) {
      checkSequence();
    }
  }, [
    selectedCards1,
    selectedCards2,
    selectedCards3,
    selectedCards4,
    selectedCards5,
  ]);

  const checkSequence = () => {
    const selectedCards = [
      selectedCards1.text,
      selectedCards2.text,
      selectedCards3.text,
      selectedCards4.text,
      selectedCards5.text,
    ];

    const correctCards = correctSequence.map((card) => card.text);
    const isCorrect = selectedCards.every((selectedCard) =>
      correctCards.includes(selectedCard)
    );

    if (isCorrect) {
      setShowSuccessPopup(true);
      localStorage.setItem("level2Result", JSON.stringify(selectedCards));
    } else {
      setShowWrongPopup(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel2();
  };

  const resetGame = () => {
    setSelectedCards1({});
    setSelectedCards2({});
    setSelectedCards3({});
    setSelectedCards4({});
    setSelectedCards5({});
    setDeck(shuffleDeck([...initialDeck])); // Shuffle deck on reset
    setShowSuccessPopup(false);
    setShowWrongPopup(false);
  };

  const handleCompleteLevel2 = (path = "/level3") => {
    const completedLevels = {
      level1: true,
      level2: true,
      level3: false,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    setCompletedLevels(completedLevels);
    navigate(path, { state: { prev: location.state.prev + '-' + 2 } });
  };

  // const codeSelection = () => {
  //   const level2Result = JSON.parse(localStorage.getItem("level2Result")) || [];
  //   for (let i = 0; i < level2Result.length; i++) {
  //     if (level2Result[i] === "X") {
  //       return false;
  //     }
  //   }
  //   return true;
  //   // console.log(level2Result);
  // };

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
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {/* <div className="flex items-center gap-2 cursor-pointer">
<FaClock className="text-slate-50 text-xl sm:text-2xl" />

<h2 className="text-xl text-blue-600 font-bold">
 {countdown} s
</h2>
</div> */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      <div className="m-6">
        <h2 className="text-2xl font-bold text-slate-50 mx-auto">
          How would you like to manage the patient initially?
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
        {deck.map((card) => (
          <div
            key={card.id}
            className="border w-48 h-32 border-blue-500 p-4 bg-gray-100 rounded-lg text-center cursor-pointer hover:bg-gray-200 flex justify-center items-center"
            onClick={() =>
              selectCard(
                card,
                !selectedCards1.text
                  ? setSelectedCards1
                  : !selectedCards2.text
                    ? setSelectedCards2
                    : !selectedCards3.text
                      ? setSelectedCards3
                      : !selectedCards4.text
                        ? setSelectedCards4
                        : setSelectedCards5
              )
            }
          >
            <p>{card.text}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-center text-3xl font-bold text-slate-50">
          Select Correct Options
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-4">
        {[
          selectedCards1,
          selectedCards2,
          selectedCards3,
          selectedCards4,
          selectedCards5,
        ].map((card, idx) => (
          <div
            key={idx}
            className="border-2 border-blue-400 w-60 h-32 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() =>
              handleBoxClick(
                card,
                [
                  setSelectedCards1,
                  setSelectedCards2,
                  setSelectedCards3,
                  setSelectedCards4,
                  setSelectedCards5,
                ][idx]
              )
            } // Use appropriate boxSetter
          >
            <p className="text-md text-center">{card.text}</p>
          </div>
        ))}
      </div>

      {/* {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Correct!
              </h2>
              {codeSelection() ? (
                <button
                  onClick={() => handleCompleteLevel2("/level4")} // Redirect to Level 4
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Sign of Envenomation
                </button>
              ) : (
                <button
                  onClick={() => handleCompleteLevel2("/level5")} // Redirect to Level 5
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  No Sign of Envenomation
                </button>
              )}
            </div>
          </div>
        )} */}

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-amber-600 mb-4">
              Your choices are correct
            </h2>
            <button
              onClick={() => handleCompleteLevel2("/level3")}
              className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
            >
              Start specific management
            </button>
          </div>
        </div>
      )}

      {showWrongPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Your choices are incorrect
            </h2>
            {/* <p className="mb-6">You have selected the wrong sequence.</p> */}
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-md"
              onClick={resetGame}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level2;