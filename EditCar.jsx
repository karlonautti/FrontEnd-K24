import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

export default function EditCar(props) {

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
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            year: props.params.data.modelYear,
            price: props.params.data.price,
            
        })
    }

    const handleSave = () => {
        console.log("EditCar: update car information");
        props.updateCar(props.params.data._links.car.href, car);
        setOpen(false);
    }

    const handleCancel = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleClickOpen}>Edit</Button>

            <Dialog open={open}>
                <DialogTitle>
                    Edit Car
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit car details here:
                    </DialogContentText>
                    <TextField
                        margin= "dense"
                        label= "Brand"
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
                    <Button onClick={handleSave}>Save edit</Button>
                    <Button onClick={handleCancel}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}