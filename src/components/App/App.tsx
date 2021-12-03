import React, { useState } from "react";
import "./index.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import ProductTable from "../ProductTable/";
import {
  calculateTotalPrice,
  findIndexAndUpdateQuantity,
} from "../../utils/cart";
import { productDetails } from "../../constants/product";
// We can now import all our types from the main types/index.ts file
import {
  DeleteFromCartFunction,
  UpdateCartFunction,
  ProductList,
} from "../../types";

const App = (): JSX.Element => {
  const initialCartValue = 0;
  const [cart, setCart] = useState<ProductList>(productDetails);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(
    initialCartValue
  );

  // This file return void since it just invokes a function and does not return a value
  // We can now use our new type definitions
  const deleteFromCart: DeleteFromCartFunction = (id) => {
    const updatedCart = findIndexAndUpdateQuantity(cart, id, 0);
    return setCart(updatedCart);
  };

  // We can now use our new type definitions
  const updateCart: UpdateCartFunction = (id, value) => {
    const updatedCart = findIndexAndUpdateQuantity(cart, id, value);
    return setCart(updatedCart);
  };

  const calculatePrice = (): void => {
    const totalPrice = calculateTotalPrice(cart, initialCartValue);
    setCalculatedPrice(totalPrice);
  };

  return (
    <>
      <Typography align="center" variant="h3">
        Welcome to the React Type Demo App
      </Typography>
      <Typography align="center" variant="body1">
        Here you can buy some items for your team
      </Typography>

      <Container>
        <ProductTable
          cart={cart}
          deleteFromCart={deleteFromCart}
          updateCart={updateCart}
        />

        <Card className="shopping-cart">
          <Button variant="contained" color="primary" onClick={calculatePrice}>
            Calculate Price
          </Button>

          <h3>Your total is</h3>
          <h3>{calculatedPrice}</h3>
        </Card>
      </Container>
    </>
  );
};

export default App;
