import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Pokeball from "../../assets/pokeball.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

/**
 * User can select pokémon to buy from this modal
 * @component
 */
const ShopModal = () => {
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button sx={{ marginLeft: "2rem" }} onClick={handleOpen} color="inherit">
        <img src={Pokeball} alt="Pokeball" width={25} />
        <Typography
          variant="h6"
          component="div"
          sx={{ marginLeft: "6px", flexGrow: 1 }}
        >
          Shop
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Poké Shop
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please select a pokémon you'd like to purchase.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ShopModal;
