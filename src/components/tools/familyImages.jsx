import React, { useState } from "react";

const FamilyDetails = ({ images }) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedImages, setExpandedImages] = useState([]);

  // Show more images
  const handleShowMore = () => {
    setShowAll(true);
  };

  // Show image modal or popup
  const handleImageClick = (image) => {
    // Logic to show the image in a modal or new page
    setExpandedImages([image]);
  };

  // Display up to 3 images
  const displayedImages = showAll ? images : images.slice(0, 3);

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2">
        {displayedImages.map((image, index) => (
          <div key={index} className="relative">
            {/* Optionally add overlay or badge for extra images */}
            {!showAll && images.length > 3 && index === 2 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white">
                <span>+{images.length - 3}</span>
              </div>
            )}
            <img
              src={image.url}
              alt={`Family Image ${index}`}
              className="object-cover w-full h-32 cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>
      {!showAll && images.length > 3 && (
        <button
          onClick={handleShowMore}
          className="mt-2 px-4 py-2 text-blue-500 border border-blue-500 "
        >
          Show More
        </button>
      )}
      {/* Image Modal */}

      {expandedImages.length > 0 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="w-full max-w-3xl">
            {expandedImages.map((image, index) => (
              <div key={index} className="flex flex-col items-center mb-4">
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto  object-cover"
                />
                {/* Caption */}
                {image.caption && (
                  <p className="text-white mt-2">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setExpandedImages([])}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default FamilyDetails;
