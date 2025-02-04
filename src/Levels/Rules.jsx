
import { useNavigate } from "react-router-dom";

function Rules() {
    const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    navigate("/level1"); // Navigates to Level 1
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col border-1 m-2 bg-gray-100 rounded-xl mb-10">
        <h2 className="text-center text-4xl my-4">Rules of the Snake Bite Game</h2>
        <div className="m-5 text-center text-xl">A patient of snake bite needs your urgent help.
          <div>As the game progresses, you will come across different situations which you need to handle correctly by selecting Rulesropriate ones from given options.</div>
        </div>
        <div className="m-5 text-center text-xl">
          <div>There are possibilities like no envenomations, haemotoxic envenomation or neurotoxic envenomation.</div>
          <div>In case of them, these are different clinical scenarios leading to different management paths.</div>
          <div>By completing each path successfully, you will get a star.</div>
          <div>Collect all the stars to complete the game.</div>
        </div>
      </div>
      <button
      className="border-2 bg-green-400 border-green-700 hover:bg-green-500 hover:border-green-900 hover:scale-102 p-1 rounded flex justify-center items-center w-40 m-auto cursor-pointer"
      onClick={handleClick}
      >Start Playing</button>
    </>
  )
}

export default Rules