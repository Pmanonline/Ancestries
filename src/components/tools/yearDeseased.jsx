import React, { useState } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";

const YearDeceasedModal = ({ showModal, handleClose, handleYearDeceased }) => {
  const [yearDeceased, setYearDeceased] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleYearDeceased(yearDeceased);
    handleClose();
  };

  return (
    <Modal show={showModal} onClose={handleClose} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="yearDeceased">Year Deceased</Label>
          <TextInput
            id="yearDeceased"
            type="number"
            value={yearDeceased}
            onChange={(e) => setYearDeceased(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default YearDeceasedModal;
