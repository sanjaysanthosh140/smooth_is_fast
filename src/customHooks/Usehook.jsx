import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

function Usehook({product,onUpdate}) {
    console.log('productHook',product)
  const [updatedProduct, setUpdatedProduct] = useState(product);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
        [name]: value,
      
  
    });
  };
// 
  const handleSubmit = (e) => {
    e.preventDefault();
    const id =product._id
    console.log('id',id)
    axios
      .patch(`http://localhost:4000/api/products/update/${id}`, updatedProduct)
      .then((response) => {
        console.log('afterPatch',response.data);
        onUpdate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
// 
  return (

    <Container
      maxWidth="sm"
      style={{
        marginTop: "4%",
        backgroundColor: "#112240",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{ color: "#fff" }}
      >
        Edit Product
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="name"
          value={updatedProduct.name}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Product Description"
          name="description"
          value={updatedProduct.description }
          onChange={handleChange}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Product Image URL"
          name="image"
          value={updatedProduct.image }
          onChange={handleChange}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Update Product
        </Button>
      </Box>
    </Container>
  );
}

export default Usehook;