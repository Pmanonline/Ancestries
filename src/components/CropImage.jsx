import React, { useState } from "react";
import Cropper from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ImageCropper({ onCropComplete }) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 });
  const [image, setImage] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const onImageLoaded = (image) => {
    setImage(image);
  };

  const handleCropComplete = (crop) => {
    if (image && crop.width && crop.height) {
      const croppedImage = getCroppedImg(image, crop);
      setCroppedImageUrl(croppedImage);
      onCropComplete(croppedImage); // This is the prop function
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL("image/jpeg");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {src && (
        <Cropper
          src={src}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onComplete={handleCropComplete}
          onChange={setCrop}
        />
      )}
      {croppedImageUrl && <img alt="Cropped" src={croppedImageUrl} />}
    </div>
  );
}

export default ImageCropper;
