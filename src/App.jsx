import { useEffect, useState } from "react";
import img_C1 from "./assets/c1.png";
import img_C2 from "./assets/c2.png";
import SplitScreen from "./layout/SplitScreen";

const TOTAL_CATPOP = [{ id: 1, name: "Tasr", country: "America", count: 0 }];
const LEADERBOARD = { totalCat: 0, totalCount: 0, leaderName: "Name" };
function App() {
  const [catpop, setCatpop] = useState(TOTAL_CATPOP);
  const [leader, setLeader] = useState();
  const [catName, setCatname] = useState("");
  const [catCountry, setCatCountry] = useState("");
  const [error, setError] = useState(false);
  const [catPic, setCatPic] = useState(img_C1);

  const handleChangeCatName = (e) => setCatname(e.target.value);
  const handleChangeCatCountry = (e) => setCatCountry(e.target.value);

  const handleReset = (catId) => {
    const catIndex = catpop.findIndex((cat) => cat.id === catId);
    if (catIndex !== -1) {
      const updatedCatpop = [...catpop];
      updatedCatpop[catIndex] = { ...updatedCatpop[catIndex], count: 0 };
      setCatpop(updatedCatpop);
    }
  };
  const handleIncreaseCount = (catId) => {
    const catIndex = catpop.findIndex((cat) => cat.id === catId);
    if (catIndex !== -1) {
      const updateCount = [...catpop];
      updateCount[catIndex] = {
        ...updateCount[catIndex],
        count: updateCount[catIndex].count + 1,
      };
      setCatPic(img_C2);
      setTimeout(() => {
        setCatPic(img_C1);
      }, 100);
      setCatpop(updateCount);
    }
  };
  const handleDecreaseCount = (catId) => {
    const catIndex = catpop.findIndex((cat) => cat.id === catId);
    if (catIndex != -1) {
      const updateCountCat = [...catpop];
      updateCountCat[catIndex] = {
        ...updateCountCat[catIndex],
        count: updateCountCat[catIndex].count - 1,
      };
      if (updateCountCat[catIndex].count >= 0) {
        setCatpop(updateCountCat);
      }
    }
  };

  const handleAddCat = (e) => {
    e.preventDefault();
    const isDuplicate = catpop.some(
      (cat) => cat.name === catName && cat.country === catCountry
    );

    if (isDuplicate) {
      console.log("Duplicate name and country found.");
      setError(true);
      return;
    }
    const newCatPop = [...catpop];
    newCatPop.push({
      id: newCatPop.length + 1,
      country: catCountry,
      name: catName,
      count: 0,
    });
    setError(false);
    setCatpop(newCatPop);
  };

  const handleDeleteCat = (Idcat) => {
    const newCatPop = [...catpop];
    const findCatIndex = newCatPop.findIndex((cat) => cat.id === Idcat);
    if (findCatIndex !== -1) {
      newCatPop.splice(findCatIndex, 1);
      setCatpop(newCatPop);
    }
  };
  
  
  const findTotalCount = () => {};
  const findLeader = () => {};
  const findHighestClick = () => {};
  return (
    <SplitScreen>
      {/******** Left Side  *********/}
      <>
        <div className="flex-1 flex flex-col p-[20px] text-center justify-center">
          {/******** Start Form ******/}
          <form className="flex flex-col gap-y-5 p-8 border border-gray-300 rounded-md h-full justify-center text-black">
            <h1 className="text-3xl text-white font-semibold italic">
              Join for Click Cat !!
            </h1>
            {/* Cat Name */}
            <input
              className="w-full p-2 border-2 border-slate-300 rounded-md"
              placeholder="cat"
              value={catName}
              onChange={handleChangeCatName}
            />
            {/* Cat Country */}
            <select
              className="w-full p-2  border-2 border-slate-300 rounded-md"
              value={catCountry}
              onChange={handleChangeCatCountry}
            >
              <option value="" disabled>
                select country
              </option>
              <option value="Thailand">Thailand</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            {/* Error */}
            {error ? (
              <p className="text-red-500">Duplicate name and country found.</p>
            ) : null}
            {/* Submit */}
            <button
              type="submit"
              className="bg-zinc-200 mt-4 p-2 rounded-xl text-xl text-black hover:bg-gray-700 hover:text-white"
              onClick={handleAddCat}
            >
              Join
            </button>
          </form>
          {/******** End Form ******/}
        </div>

        <div className="flex-1 flex flex-col p-[20px] text-center justify-center">
          {/******** Start DashBoard ******/}
          <div className="flex flex-col gap-y-5 p-8 border border-gray-300 rounded-md h-full justify-center">
            <div className="flex justify-evenly">
              <div>
                <h1 className="text-3xl font-semibold italic">Total Cat</h1>
                <h1 className="text-3xl font-semibold italic">0</h1>
              </div>
              <div>
                <h1 className="text-3xl font-semibold italic">Total Count</h1>
                <h1 className="text-3xl font-semibold italic">0</h1>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div>
                <h1 className="text-3xl font-semibold italic">LEADER</h1>
                <h1 className="text-3xl font-semibold italic">
                  Name : Country
                </h1>
              </div>
              <div>
                <h1 className="text-3xl font-semibold italic">Highest Click</h1>
                <h1 className="text-3xl font-semibold italic">0</h1>
              </div>
            </div>
          </div>

          {/******** End DashBoard ******/}
        </div>
      </>

      {/******** Right Side  *********/}
      <div className="flex-1 h-screen p-4 flex flex-col gap-y-2 overflow-scroll">
        {/******** Start 1-Cat ******/}
        {catpop.map((cat) => (
          <div
            className="flex justify-between items-center border border-gray-200 rounded-lg p-4 shadow-lg relative"
            key={cat?.id}
          >
            {/* Remove Cat */}
            <div
              className="absolute top-[-15px] right-[-15px] bg-red-400 text-white  w-[30px] h-[30px] rounded-full text-center align-middle cursor-pointer "
              onClick={() => handleDeleteCat(cat.id)}
            >
              x
            </div>
            <div>
              {/* Cat Image */}
              <div className="w-[100px]">
                <img
                  className="w-full h-auto object-cover rounded-lg"
                  src={catPic}
                />
              </div>
            </div>
            {/* Cat Profile & Count*/}
            <div className="flex-1 px-4">
              <p className="text-2xl">
                {cat?.name} : {cat?.country}
              </p>
              <p>count : {cat?.count}</p>
            </div>
            <div className="flex gap-1">
              {/* Button Group */}
              <button
                className="px-4 py-2 bg-slate-500 rounded-md"
                onClick={() => handleReset(cat?.id)}
              >
                reset
              </button>
              <button
                className="px-4 py-2 bg-slate-500 rounded-md"
                onClick={() => handleDecreaseCount(cat?.id)}
              >
                -
              </button>
              <button
                className="px-4 py-2 bg-slate-500 rounded-md"
                onClick={() => handleIncreaseCount(cat?.id)}
                on
              >
                +
              </button>
            </div>
          </div>
        ))}
        {/******** End 1-Cat ******/}
      </div>
    </SplitScreen>
  );
}

export default App;
