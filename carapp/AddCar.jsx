import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar(props) {

    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    })

    // open = false, kun ikkuna on kiinni
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleSave = () => {
        console.log("AddCar: save a new car");
        props.addCar(car);
        setOpen(false);
    }

    const handleCancel = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleClickOpen}>Add</Button>

            <Dialog open={open}>
                <DialogTitle>
                    Add Car
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter car details here:
                    </DialogContentText>
                    <TextField
                        margin= "dense"
                        label= "brand"
                        value= {car.brand}
                        onChange={(e) => setCar({ ...car, brand: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Model"
                        value= {car.model}
                        onChange={(e) => setCar({ ...car, model: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Color"
                        value= {car.color}
                        onChange={(e) => setCar({ ...car, color: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Fuel"
                        value= {car.fuel}
                        onChange={(e) => setCar({ ...car, fuel: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Year"
                        value= {car.modelYear}
                        onChange={(e) => setCar({ ...car, modelYear: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Price"
                        value= {car.price}
                        onChange={(e) => setCar({ ...car, price: e.target.value })}
                        variant= "standard">
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Add new car</Button>
                    <Button onClick={handleCancel}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}
