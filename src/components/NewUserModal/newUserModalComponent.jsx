import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [newName, setNewName] = useState('')

  return (
    <div>
      <Modal
        open={props.show}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ingrese el nombre del nuevo usuario
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input type="text" value={newName} onChange={(e)=>{setNewName(e.target.value)}}/>
          </Typography>
          <Button onClick={()=>props.handleUserData(
              {
                balance:1000,
                bet:0,
                historial:[],
                name:newName,
                showUserModal:false,
                bestBet:0,
              }
          )}>Confirmar</Button>
        </Box>
      </Modal>
    </div>
  );
}