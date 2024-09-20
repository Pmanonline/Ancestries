// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import backgroundImage from "../../../assets/images/backgroundImage.png";
// import { DirectionButton2 } from "../../../components/d-button";
// import LayoutNAv from "../../../components/layoutNAv";

// const FindInTree = () => {
//   const [findInTree, setFindInTree] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <>
//       <section
//         className="p-8 relative bg-cover  bg-no-repeat h-full w-full Nlg:max-w-[40rem] Nlg:mx-auto"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//         }}
//       >
//         {/* Nav */}
//         <span className="lg:hidden w-full flex justify-center">
//           <LayoutNAv />
//         </span>
//         {/* Nav */}
//         <div className="relative px-8 flex   flex-col items-center lg:items-start lg:flex-row">
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4 flex flex-col items-center lg:items-start w-full"
//           >
//             <div className="lg:flex lg:justify-between w-full">
//               <div className="pb-12 w-full  justify-center lg:justify-start lg:mr-3">
//                 <input
//                   type="text"
//                   id="findInTree"
//                   name="findInTree"
//                   onChange={(e) => setFindInTree(e.target.value)}
//                   value={findInTree}
//                   className="px-3 py-3  block w-full lg:w-[23vw] rounded-full  focus:ring-green focus:border-green  bg-opacity-90 bg-[#e7fae7]  placeholder-black sm:text-sm focus:outline-none"
//                   placeholder="Enter name to search"
//                 />
//               </div>

//               <div className="w-full">
//                 <Link to="">
//                   <button className="border border-green w-full Nlg:mx-auto Nlg:justify-center flex items-center bg-green-500 bg-green px-4 py-2 hover:bg-green-600 rounded-3xl">
//                     <span className="mr-5 text-white">Search</span>
//                     <DirectionButton2 />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </form>
//         </div>
//         {/* related searches */}
//         <div className="mt-12 mx-4">
//           <h3 className="text-black my-4 text-lg mod:text-sm font-bold   text-start mb-3">
//             Recent
//           </h3>
//           <ul className=" list-disc">
//             <li>Jame John</li>
//             <li>Jame John</li>
//             <li>Jame John</li>
//             <li>Jame John</li>
//           </ul>
//         </div>
//       </section>
//     </>
//   );
// };

// export default FindInTree;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/images/backgroundImage.png";
import { DirectionButton2 } from "../../../components/d-button";
import LayoutNAv from "../../../components/layoutNAv";

const FindInTree = () => {
  const [findInTree, setFindInTree] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the search
    const results = searchTree(findInTree);
    setSearchResults(results);
    setIsModalOpen(true); // Open the modal
  };

  const searchTree = (query) => {
    // Mock search function, replace with actual search logic
    const treeData = [
      { name: "John Brown" },
      { name: "Jane Smith" },
      { name: "Alice Johnson" },
      { name: "Peter Johnson" },
      { name: "Paul Johnson" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },
      { name: "Paul Prince" },

      // Add more people in the tree as needed
    ];
    return treeData.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <>
      <section
        className="p-8 relative bg-cover bg-no-repeat h-full w-full Nlg:max-w-[40rem] Nlg:mx-auto"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Nav */}
        <div className="absolute inset-0 bg-opacity-50 pointer-events-none"></div>
        <span className="w-full flex justify-center">
          <LayoutNAv />
        </span>
        {/* Nav */}
        <div className="relative px-8 flex flex-col items-center lg:items-start lg:flex-row">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center lg:items-start w-full"
          >
            <div className="lg:flex lg:justify-between w-full">
              <div className="pb-12 w-full justify-center lg:justify-start lg:mr-3">
                <input
                  type="text"
                  id="findInTree"
                  name="findInTree"
                  onChange={(e) => setFindInTree(e.target.value)}
                  value={findInTree}
                  className="px-3 py-3 block w-full lg:w-[23vw] rounded-full focus:ring-green focus:border-green bg-opacity-90 bg-[#e7fae7] placeholder-black sm:text-sm focus:outline-none"
                  placeholder="Enter name to search"
                />
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="border border-green w-full Nlg:mx-auto Nlg:justify-center flex items-center bg-green-500 bg-green px-4 py-2 hover:bg-green-600 rounded-3xl"
                >
                  <span className="mr-5 text-white">Search</span>
                  <DirectionButton2 />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Recent Searches */}
        <div className="mt-12 mx-4">
          <h3 className="text-black my-4 text-lg mod:text-sm font-bold text-start mb-3">
            Recent
          </h3>
          <ul className="list-disc">
            <li>John Brown</li>
            <li>Jane Smith</li>
            <li>Alice Johnson</li>
            <li>James Doe</li>
          </ul>
        </div>
      </section>

      {/* Modal for Search Results */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4 underline">Search Results</h3>
        <ul className="list-disc">
          {searchResults.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default FindInTree;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <section
      className="p-8 relative bg-cover bg-no-repeat h-full w-full Nlg:max-w-[40rem] Nlg:mx-auto"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="fixed inset-0 bg-gray-5  flex justify-center items-center z-50">
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-xl w-full  relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </section>
  );
};
