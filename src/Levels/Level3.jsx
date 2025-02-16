import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/snake11.png";
import { FaClock, FaStar, FaQuestionCircle } from "react-icons/fa";

const Level3 = ({ setCompletedLevels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [his, setHis] = useState({});
  const [exam, setExam] = useState({});
  const [sc, setsc] = useState(0);
  const [box1, setBox1] = useState({});
  const [box2, setBox2] = useState({});
  const [box3, setBox3] = useState({});
  const [box4, setBox4] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [abc, setAbc] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedEnvenomationType, setSelectedEnvenomationType] = useState("");
  const [shuffledHistoryDeck, setShuffledHistoryDeck] = useState([]);
  const [shuffledExaminationDeck, setShuffledExaminationDeck] = useState([]);
  const [starCount, setStarCount] = useState(0);

  const handleCompleteLevel3 = (nextLevel) => {
    const completedLevels = {
      level1: true,
      level2: true,
      level3: true,
      level4: true,
    };
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
    const array = [box1.code, box2.code, box3.code, box4.code];
    localStorage.setItem("level3Result", JSON.stringify(array));
    const array1 = [box1.text, box2.text, box3.text, box4.text];
    localStorage.setItem("level3TextResult", JSON.stringify(array1));
    setCompletedLevels(completedLevels);
    navigate(nextLevel, { state: { prev: location.state.prev + '-' + 3 } });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("path")) || {};
    const trueCount = Object.values(data).filter(value => value === true).length;
    setStarCount(trueCount);

  }, [])

  useEffect(() => {
    if (!location.state?.prev) {
      alert("You are not allowed to access Level 3!");
      navigate("/level1"); // Redirect to home or another page
    }
    console.log(location.state.prev + '-' + 3);//1-2

    localStorage.setItem("currentLevel", location.pathname);
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel && savedLevel !== location.pathname) {
      navigate(savedLevel);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (box1 && box2 && box3 && box4) {
      checkrules(box1, box2, box3, box4);
    }
  }, [box1, box2, box3, box4]);

  const initialHistoryDeck = [
    { id: 1, text: "Painful Progressive Swelling", code: "H", type: "history" },
    {
      id: 2,
      text: "Continuous bleeding from bite site",
      code: "H",
      type: "history",
    },
    { id: 3, text: "Bleeding from the gum", code: "H", type: "history" },
    { id: 4, text: "Epistaxis", code: "H", type: "history" },
    { id: 5, text: "Vomiting", code: "H", type: "history" },
    { id: 6, text: "Haematemesis", code: "H", type: "history" },
    { id: 7, text: "Haemoptysis", code: "H", type: "history" },
    { id: 8, text: "Acute abdominal Pain", code: "H", type: "history" },
    { id: 9, text: "Bleeding per rectum", code: "H", type: "history" },
    { id: 10, text: "Low back pain", code: "H", type: "history" },
    { id: 11, text: "Declining urine output", code: "H", type: "history" },
    {
      id: 12,
      text: "Difficulty in focusing with eyelids feeling heavy",
      code: "N",
      type: "history",
    },
    { id: 13, text: "Diplopia", code: "N", type: "history" },
    {
      id: 14,
      text: "Progressive swelling and local pain",
      code: "N",
      type: "history",
    },
    {
      id: 15,
      text: "Numbness around lips and mouth",
      code: "N",
      type: "history",
    },
    {
      id: 16,
      text: "Paralysis noted early in the morning",
      code: "N",
      type: "history",
    },
    { id: 17, text: "Dyspnea", code: "N", type: "history" },
    { id: 18, text: "Dysphonia", code: "N", type: "history" },
    { id: 19, text: "Dysphagia", code: "N", type: "history" },
    {
      id: 20,
      text: "Acute pain abdomen starting from early in the morning",
      code: "N",
      type: "history",
    },
    {
      id: 21,
      text: "Unexplained throat/chest/joint pain",
      code: "N",
      type: "history",
    },
    { id: 22, text: "Salivation, Vomiting", code: "X", type: "history" },
  ];

  const initialExaminationDeck = [
    {
      id: 23,
      text: "Distinct bite mark with no swelling",
      code: "X",
      type: "exam",
    },
    {
      id: 24,
      text: "Local necrosis with rancid smell in a swollen limb with taught and shiny skin and skip lesions",
      code: "H",
      type: "exam",
    },
    {
      id: 25,
      text: "Significant Painful swelling involving the whole limb and extending onto the trunk",
      code: "H",
      type: "exam",
    },
    { id: 26, text: "Compartment Syndrome", code: "H", type: "exam" },
    {
      id: 27,
      text: "Tender enlargement of local lymph nodes",
      code: "H",
      type: "exam",
    },
    { id: 28, text: "Hypotension", code: "H", type: "exam" },
    {
      id: 29,
      text: "Petechiae, purpura and ecchymosis",
      code: "H",
      type: "exam",
    },
    { id: 30, text: "Asymmetrical pupil", code: "H", type: "exam" },
    {
      id: 31,
      text: "Parotid swelling, conjunctival edema, sub-conjunctival hemorrhage",
      code: "H",
      type: "exam",
    },
    { id: 32, text: "Ptosis", code: "N", type: "exam" },
    { id: 33, text: "Ophthalmoplegia", code: "N", type: "exam" },
    {
      id: 34,
      text: "Local necrosis and/or blistering",
      code: "N",
      type: "exam",
    },
    {
      id: 35,
      text: "Inability to swallow and aspiration of pooled secretions",
      code: "N",
      type: "exam",
    },
    { id: 36, text: "Cyanosis and altered sensorium", code: "N", type: "exam" },
    { id: 37, text: "Paradoxical respiration", code: "N", type: "exam" },
    { id: 38, text: "Dysarthria", code: "N", type: "exam" },
    {
      id: 39,
      text: "Ascending paralysis starting from early morning",
      code: "X",
      type: "exam",
    },
    {
      id: 40,
      text: "Unexplained respiratory distress in children in the presence of ptosis",
      code: "N",
      type: "exam",
    },
    {
      id: 41,
      text: "Sudden onset of Acute Flaccid Paralysis in a child",
      code: "N",
      type: "exam",
    },
    {
      id: 42,
      text: "Unexplained respiratory distress in children",
      code: "N",
      type: "exam",
    },
    {
      id: 43,
      text: "Mild swelling at bite site without progression",
      code: "X",
      type: "exam",
    },
    {
      id: 44,
      text: "Not enough signs or symptoms to diagnose poisonous snake bite",
      code: "X",
      type: "exam",
    },
  ];

  // Shuffle function
  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle decks on component mount and whenever the location changes
  useEffect(() => {
    const shuffledHistory = shuffle(initialHistoryDeck);
    const shuffledExam = shuffle(initialExaminationDeck);
    setShuffledHistoryDeck(shuffledHistory);
    setShuffledExaminationDeck(shuffledExam);
  }, [location]);

  const checkrules = (box1, box2, box3, box4) => {
    const boxes = [box1, box2, box3, box4];
    const allFilled = boxes.every((box) => box && Object.keys(box).length > 0);

    if (!allFilled) return; // Exit if not all boxes are filled

    const codes = boxes.map((box) => box.code);
    const types = boxes.map((box) => box.type);

    // Condition 1: All cards have the same code
    const allSameCode = codes.every((code) => code === codes[0]);

    // Condition 2: Max 3 cards from history and max 3 from examination
    const historyCount = types.filter((type) => type === "history").length;
    const examinationCount = types.filter((type) => type === "exam").length;

    const withinLimits = historyCount <= 3 && examinationCount <= 3;

    // Final check for success
    if (allSameCode && withinLimits) {
      // Set the envenomation type based on the code
      const envenomationType =
        codes[0] === "H"
          ? "Haemotoxic Envenomation"
          : codes[0] === "N"
            ? "Neurotoxic Envenomation"
            : "No Envenomation";

      setSelectedEnvenomationType(envenomationType);
      setShowSuccessPopup(true);
    } else {
      setAlertVisible(true);
    }
  };

  const res1 = (card) => {
    if (card.type === "history") {
      setBox1({});

      let newSelectedCards = [];
      for (let i = 0; i < selectedCards.length; i++) {
        if (selectedCards[i].id != card.id) {
          newSelectedCards.push(selectedCards[i]);
        }
      }
      setSelectedCards(newSelectedCards);
      const newCards = [...shuffledHistoryDeck, card];
      setShuffledHistoryDeck(newCards);
    } else if (card.type === "exam") {
      setBox1({});

      let newSelectedCards = [];
      for (let i = 0; i < selectedCards.length; i++) {
        if (selectedCards[i].id != card.id) {
          newSelectedCards.push(selectedCards[i]);
        }
      }
      setSelectedCards(newSelectedCards);
      const newCards = [...shuffledExaminationDeck, card];
      setShuffledExaminationDeck(newCards);
    }
    // setShuffledExaminationDeck((prevDeck) => [...prevDeck, card]);
    //   setSelectedCards((prevDeck) => 
    //     prevDeck.filter((c) => c.id !== card.id)
    // );
    //   setBox1({});
    //   const newCards = [...shuffledExaminationDeck, card];
    //   setShuffledExaminationDeck(newCards);
    // }

  };

  const res2 = (card) => {
    if (card.type === "history") {
      // setShuffledHistoryDeck((prevDeck) => [...prevDeck, card]);
      setSelectedCards((prevDeck) =>
        prevDeck.filter((c) => c.id !== card.id)
      );
      setBox2({});
      const newCards = [...shuffledHistoryDeck, card];
      setShuffledHistoryDeck(newCards);
    } else if (card.type === "exam") {
      // setShuffledExaminationDeck((prevDeck) => [...prevDeck, card]);
      setSelectedCards((prevDeck) =>
        prevDeck.filter((c) => c.id !== card.id)
      );
      setBox2({});
      const newCards = [...shuffledExaminationDeck, card];
      setShuffledExaminationDeck(newCards);
    }
  };

  const res3 = (card) => {
    // if (his && Object.keys(his).length > 0) {
    //   setBox3(his);
    //   setsc(sc + 1);
    //   checkrules(box1, box2, box3, box4);
    // }
    if (card.type === "history") {
      // setShuffledHistoryDeck((prevDeck) => [...prevDeck, card]);
      setSelectedCards((prevDeck) =>
        prevDeck.filter((c) => c.id !== card.id)
      );
      setBox3({});
      const newCards = [...shuffledHistoryDeck, card];
      setShuffledHistoryDeck(newCards);
    } else if (card.type === "exam") {
      // setShuffledExaminationDeck((prevDeck) => [...prevDeck, card]);
      setSelectedCards((prevDeck) =>
        prevDeck.filter((c) => c.id !== card.id)
      );
      setBox3({});
      const newCards = [...shuffledExaminationDeck, card];
      setShuffledExaminationDeck(newCards);
    }
  };

  const res4 = (card) => {
    // if (his && Object.keys(his).length > 0) {
    //   setBox4(his);
    //   setsc(sc + 1);
    //   checkrules(box1, box2, box3, box4);
    // }
    if (card.type === "history") {
      // setShuffledHistoryDeck((prevDeck) => [...prevDeck, card]);
      setSelectedCards((prevDeck) =>
        prevDeck.filter((c) => c.id !== card.id)
      );
      setBox4({});
      const newCards = [...shuffledHistoryDeck, card];
      setShuffledHistoryDeck(newCards);
    } else if (card.type === "exam") {
      // setShuffledExaminationDeck((prevDeck) => [...prevDeck, card]);
      setSelectedCards((prevDeck) =>
        prevDeck.filter((c) => c.id !== card.id)
      );
      setBox4({});
      const newCards = [...shuffledExaminationDeck, card];
      setShuffledExaminationDeck(newCards);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    handleCompleteLevel3();
  };

  const resetGame = () => {
    // Reset the boxes
    setBox1({});
    setBox2({});
    setBox3({});
    setBox4({});

    // Reset the selected cards and other related states
    setSelectedCards([]);
    setSelectedCategory(null);

    // Reset any alerts or triggers
    setAbc(false);
    setAlertVisible(false);
    setShowSuccessPopup(false);

    // Reshuffle decks
    setShuffledHistoryDeck(shuffle(initialHistoryDeck));
    setShuffledExaminationDeck(shuffle(initialExaminationDeck));

    console.log("Game has been reset!");
  };

  const codeSelection = () => {
    const level3Result = [box1.code, box2.code, box3.code, box4.code];
    for (let i = 0; i < level3Result.length; i++) {
      if (level3Result[i] === "X") {
        return false;
      }
      return true;
    }

    // console.log(level3Result);
  };

  const handleCardSelect = (card) => {
    // Check if the card is already selected
    const isCardSelected = selectedCards.some((c) => c.id === card.id);

    if (isCardSelected) {
      // If already selected, remove it
      setSelectedCards((prevCards) =>
        prevCards.filter((c) => c.id !== card.id)
      );

      // Add the card back to the appropriate deck
      if (card.type === "history") {
        setShuffledHistoryDeck((prevDeck) => [...prevDeck, card]);
      } else if (card.type === "exam") {
        setShuffledExaminationDeck((prevDeck) => [...prevDeck, card]);
      }
    } else if (selectedCards.length >= 4) {
      // Exceeded card limit
      setAbc(true); // Show alert for exceeding card limit
    } else {
      // Add the card to selectedCards
      const newCards = [...selectedCards, card];
      const historyCount = newCards.filter((c) => c.type === "history").length;
      const examinationCount = newCards.filter((c) => c.type === "exam").length;

      if (historyCount > 3 || examinationCount > 3) {
        setAbc(true); // Show alert for exceeding the max limit
      } else {
        // Update the selected cards and assign to boxes
        // console.log(newCards);

        setSelectedCards(newCards);

        // Remove the card from the appropriate deck
        if (card.type === "history") {
          setShuffledHistoryDeck((prevDeck) =>
            prevDeck.filter((c) => c.id !== card.id)
          );
          // console.log(newCards);

          // if (Object.keys(box1).length === 0){
          //    console.log('sds');

          // }


          if (Object.keys(box1).length === 0) setBox1(card);
          else if (Object.keys(box2).length === 0) setBox2(card);
          else if (Object.keys(box3).length === 0) setBox3(card);
          else if (Object.keys(box4).length === 0) setBox4(card);
        } else if (card.type === "exam") {
          setShuffledExaminationDeck((prevDeck) =>
            prevDeck.filter((c) => c.id !== card.id)
          );
          if (Object.keys(box1).length === 0) setBox1(card);
          else if (Object.keys(box2).length === 0) setBox2(card);
          else if (Object.keys(box3).length === 0) setBox3(card);
          else if (Object.keys(box4).length === 0) setBox4(card);
        }
      }
    }
  };

  const displayedCards =
    selectedCategory === "examination"
      ? shuffledExaminationDeck
      : shuffledHistoryDeck;

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
        <div className="flex items-center gap-2 cursor-pointer">
          <FaClock className="text-slate-50 text-xl sm:text-2xl" />

          {/*<h2 className="text-xl text-blue-600 font-bold">
           {countdown} s
          </h2>*/}
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaQuestionCircle className="text-slate-50 text-xl sm:text-2xl" />
          <span className="text-slate-50 text-sm sm:text-base">Help</span>
        </div>
      </div>
      {/* Tabs for History and Examination */}
      <p className="text-2xl font-bold text-slate-50 mx-auto text-center mt-6">
        Various findings related to Snake bite have been listed below. Select
        atleast one from history & examination considering one type of
        envenomation to go to next level
      </p>
      <div className="w-full h-auto flex justify-center items-center gap-4">
        <button
          onClick={() => setSelectedCategory("history")}
          className={`px-4 py-2 rounded-lg text-white font-bold ${selectedCategory === "history" ? "bg-amber-950" : "bg-amber-750"
            } hover:bg-amber-950 relative`}
        >
          History
          {selectedCategory === "history" && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-10 bg-white rounded-md"></div>
          )}
        </button>
        <button
          onClick={() => setSelectedCategory("examination")}
          className={`px-4 py-2 rounded-lg text-white font-bold ${selectedCategory === "examination" ? "bg-amber-950" : "bg-amber-750"
            } hover:bg-amber-950 relative`}
        >
          Examination
          {selectedCategory === "examination" && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-20 bg-white rounded-md"></div>
          )}
        </button>
      </div>

      <div className="w-full h-auto mt-6 flex flex-wrap justify-center gap-4">
        {displayedCards.map((card) => (
          <div
            key={card.id}
            className="border-2 border-blue-400 w-60 h-22 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleCardSelect(card)}
          >
            <p className="text-md text-center">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="text-xl w-full h-30">
        <div>
          <h2 className="text-center text-slate-50 text-lg font-bold mt-14">
            Select Correct options
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-4">
          <div
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={() => res1(box1)}
          >
            <p className="text-md text-center">{box1.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={() => res2(box2)}
          >
            <p className="text-md text-center">{box2.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={() => res3(box3)}
          >
            <p className="text-md text-center">{box3.text}</p>
          </div>
          <div
            className="border-2 border-blue-400 w-60 h-28 flex items-center justify-center bg-gray-100 rounded-lg shadow-md text-gray-700 transition-transform transform hover:scale-105"
            onClick={() => res4(box4)}
          >
            <p className="text-md text-center">{box4.text}</p>
          </div>
        </div>
      </div>

      {/* Success Popup for Correct Sequence */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            {/* <h2 className="text-lg font-semibold text-green-600 mb-4">
            Your choices are correct
            </h2> */}
            <p className="text-md text-amber-600 mb-4">
              You have selected: <strong>{selectedEnvenomationType}</strong>
            </p>
            {/* <button
              onClick={handleSuccessClose}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Proceed to the next level
            </button> */}
            {codeSelection() ? (
              <button
                onClick={() => handleCompleteLevel3("/level4")} // Redirect to Level 4
                className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
              >
                Proceed to the next level
              </button>
            ) : (
              <button
                onClick={() => handleCompleteLevel3("/level5")} // Redirect to Level 5
                className="mt-4 bg-amber-950 text-white px-4 py-2 rounded-lg "
              >
                Proceed to the next level
              </button>
            )}
          </div>
        </div>
      )}

      {/* Wrong Alert */}
      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Your selection is inconsistent with a single type of envenomation
            </h2>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={resetGame}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {abc && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">Alert!</h2>
            <p className="text-lg">
              Maximum 3 cards can be selected from a deck
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => {
                setAbc(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level3;
