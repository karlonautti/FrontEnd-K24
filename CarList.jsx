import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/base";
import { Snackbar } from "@mui/material";

import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {

    // states
    const [cars, setCars] = useState([{ brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''}]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const [colDefs, setColDefs] = useState([
        { headerName: 'Brand', field: 'brand', sortable: true, filter: true },
        { headerName: 'Model', field: 'model', sortable: true, filter: true },
        { headerName: 'Color', field: 'color', sortable: true, filter: true },
        { headerName: 'Fuel', field: 'fuel', sortable: true, filter: true },
        { headerName: 'Year', field: 'modelYear', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true },
        { cellRenderer: params => <EditCar updateCar= {updateCar} params= {params}/>, width: 120},
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCar(params)}
                >Delete
                </Button>
            , width: 120
        }
    ])

    useEffect(() => getCars(), []); //fetch only after the first rendering

    // Delete car
    const deleteCar = (params) => {
        // console.log(params.data);
        console.log(params.data._links.car.href);
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Delete successful!");
                        getCars(); // haetaan päivittynyt autotilanne tietokannasta 
                    } else {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Delete failed!");
                    }
                })
                .catch(error => console.error(error));
        }
    }

    //functions
    const getCars = () => {

        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', { method: 'GET' })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responsedata => {
                console.log(responsedata._embedded.cars);
                setCars(responsedata._embedded.cars);
            })
            .catch(error => console.error(error))
    }

    const addCar = (car) => {
        console.log("Carlist")
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            console.log("response " + response);
            if (response.ok) {
                console.log("response is OK");
                setOpenSnackbar(true)
                setMsgSnackbar("Added a new car successfully!");
                return response.json();
            } else {
                setMsgSnackbar("Adding a new car failed");
                throw new Error('Sending data to backend failed');    
            }
            })
        .then(data => {
            console.log("parsed Json = " + data);
            getCars();
        })
    }

    const updateCar = (url, updateCar) => {
        console.log("Carlist: updateCar")
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updateCar)
        })
        .then(response => {
            console.log("response " + response);
            if (response.ok) {
                console.log("response is OK");
                setOpenSnackbar(true)
                setMsgSnackbar("Edited car details successfully");
                return response.json();
            } else {
                setMsgSnackbar("Editing car details failed");
                throw new Error('Sending data to backend failed');
            }
            })
        .then(data => {
            console.log("parsed Json = " + data);
            getCars();
        })
    }

    // return
    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{ width: 1500, height: 600 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenSnackbar(false);
                        setMsgSnackbar("")}}
                >
                </Snackbar>
            </div>

        </>
    )

}