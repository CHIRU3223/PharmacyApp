import React, { useState } from "react";

const AddMedicine = ({ addMedicine, setAddMedicinePopup }) => {

    // keep inputs as strings so browser validation works; convert before sending
    const [medicine, setMedicine] = useState({
        name: "",
        notes: "",
        expiryDate: "",
        price: "",
        quantity: "",
        brand: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicine(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...medicine,
            price: medicine.price === "" ? 0 : parseFloat(medicine.price),
            quantity: medicine.quantity === "" ? 0 : parseInt(medicine.quantity, 10)
        };
        addMedicine(payload)
            .then(() => {
                setMedicine({
                    name: "",
                    notes: "",
                    expiryDate: "",
                    price: "",
                    quantity: "",
                    brand: ""
                });
                setAddMedicinePopup(false);
            })
            .catch((error) => {
                console.error('Exception while adding medicine', error);
                alert('Check input values and try again');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Medicine</h3>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" placeholder="Name" value={medicine.name} onChange={handleChange} required /><br />
            <label htmlFor="brand">Brand:</label>
            <input id="brand" type="text" name="brand" placeholder="Brand" value={medicine.brand} onChange={handleChange} required /><br />
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input id="expiryDate" type="date" name="expiryDate" placeholder="Expiry Date" value={medicine.expiryDate} onChange={handleChange} required /><br />
            <label htmlFor="price">Price:</label>
            <input id="price" type="number" name="price" placeholder="Price" value={medicine.price} onChange={handleChange} required /><br />
            <label htmlFor="quantity">Quantity:</label>
            <input id="quantity" type="number" name="quantity" placeholder="Quantity" value={medicine.quantity} onChange={handleChange} required /><br />
            <label htmlFor="notes">Notes:</label>
            <input id="notes" type="text" name="notes" placeholder="Notes" value={medicine.notes} onChange={handleChange} /><br />
            <button type="submit">Add Medicine</button>
        </form>
    )
};
export default AddMedicine;