import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { RoleProvider } from "./context/RoleContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductProvider } from "./context/ProductContext";
import { TenantProvider } from "./context/TenantContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <RoleProvider>
          <CartProvider>
            <OrderProvider>
              <ProductProvider>
                <TenantProvider>
                  <App />
                </TenantProvider>
              </ProductProvider>
            </OrderProvider>
          </CartProvider>
        </RoleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
