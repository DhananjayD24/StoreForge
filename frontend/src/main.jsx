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
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <RoleProvider>
          <CartProvider>
            <OrderProvider>
              <ProductProvider>
                <TenantProvider>
                  <AnalyticsProvider>
                    <NotificationProvider>
                      <App />
                    </NotificationProvider>
                  </AnalyticsProvider> 
                </TenantProvider>
              </ProductProvider>
            </OrderProvider>
          </CartProvider>
        </RoleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
