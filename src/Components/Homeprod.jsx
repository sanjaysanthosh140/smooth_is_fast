import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  CardActions,
  Link,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";
import Usehook from "../customHooks/Usehook";

function Homeprod() {
  const [snakebar ,setsnakebar] = useState({
    open:false,
    message:"",
    severity:"success"
  })
  const [updateItem, setupdateitem] = useState(null);
  const updateProducts = (product) => {
    setupdateitem(product);
  };
  const updateData = (updatedProduct) => {
    setProducts((products) =>
      products.map((prod) =>
        prod._id === updatedProduct._id ? updatedProduct : prod
      )
    );
    //update  message 
      updateData?setsnakebar({
        open:true,
        message:"product updated",
        severity:"success"
      }):
      setsnakebar({
        open:true,
        message:"product updating failed",
        severity:"info"
      })
    setupdateitem(null);

  }

  const DeleteProduct = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/products/delete/${id}`)
        .then((response) => {
          console.log("del");
          const newProds = products.filter((prod) => prod._id !== id);
          console.log("newProds", newProds);
          setProducts(newProds);
          // delete message
          setsnakebar({
            open:true,
            message:"product deleted",
            severity:"success"
          })
        });
    } catch (error) {
      console.error("Error deleting product:", error);
      // delete error message
      setsnakebar({
        open:true,
        message:"product is not deleted",
        severity:"error"
      })
    }
  };

  const handleClose =()=>{
    setsnakebar({
      ...snakebar,
      open:false
    })
  }
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/get")
      .then((response) => {
        console.log("Response data:", response.data.data); // Debugging line

        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div style={{ marginTop: "4%" }}>
      {updateItem && <Usehook product={updateItem} onUpdate={updateData} />}
      <Grid container spacing={2}>
        {Array.isArray(products) &&
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card
                style={{
                  border: "6px solid #ADD8E6",
                  maxWidth: "60%",
                  marginLeft: "16%",
                  borderRadius: "30px",
                  marginBottom: "2%",
                  marginTop: "-1%",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => updateProducts(product)}
                  >
                    Update
                  </Button>

                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => DeleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
                  <Snackbar 
                   open={snakebar.open}
                   autoHideDuration={3000}
                   onClose={handleClose}
                  >
                  <Alert
                   onClose={handleClose}
                   severity={snakebar.severity}
                   sx={{width:"100%"}}
                  >  {snakebar.message}
                </Alert>
                  
                  </Snackbar>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Homeprod;
