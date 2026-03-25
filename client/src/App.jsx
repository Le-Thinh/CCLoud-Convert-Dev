import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/layout/AppLayout";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
        <div>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
