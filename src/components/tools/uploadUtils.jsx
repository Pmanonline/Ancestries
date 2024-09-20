import { editPerson } from "../../features/UserFeature/UserAction"; // Adjust the import path as needed
import { toast } from "react-toastify";

export const handleImageUpload = async (formData, dispatch) => {
  try {
    await dispatch(editPerson(formData)); // Ensure dispatch is awaited
    toast.success("Image uploaded successfully!");
    return true; // Indicate success
  } catch (error) {
    toast.error("Failed to upload image");
    return false; // Indicate failure
  }
};
