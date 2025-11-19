import { Route, Routes } from "react-router-dom";
import { Card } from "../pages/Card";
import App from "../App";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="cards/:id" element={<Card />} />
      </Routes>
    </>
  );
};
