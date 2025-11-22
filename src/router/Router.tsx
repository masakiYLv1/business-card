import { Route, Routes } from "react-router-dom";
import { Card } from "../pages/Card";
import { Login } from "../pages/Login";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cards/:id" element={<Card />} />
      </Routes>
    </>
  );
};
