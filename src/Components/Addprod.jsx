import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Addprod() {
  const navigate = useNavigate()
  const [errorsMsg,seterrorsMsg] = useState({
    name: "",
    description: "",
    image: "",
  })
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
  });
const [alert, setAlert] = useState({ open: false, message: "", severity: "error" });
const verification  =() =>{
  let tempErrors ={}
  tempErrors.name = product.name ? "":"no name entered",
  tempErrors.description =product.description?"":"discription is empitiy",
  tempErrors.image = product.image?"":"image url is empity"
  seterrorsMsg(tempErrors)
  return Object.values(tempErrors).every((x)=>x==="");
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleSubmit =  (e) => {
    e.preventDefault();
  if(verification()){
      console.log("Product added:", product);
      axios
      .post("http://localhost:4000/api/products/add", product)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
      window.location.href = '/';        
    }else{
      const errorMessage = errorsMsg.name || errorsMsg.description || errorsMsg.image;
      setAlert({ open: true, message: errorMessage, severity: "error" });
    }
  };
  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
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
        Add Product
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
          value={product.name}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Product Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Product Image URL"
          name="image"
          value={product.image}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Add Product
        </Button>
      </Box>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

    </Container>
  );
}

export default Addprod;
