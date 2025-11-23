import { Route, Routes } from "react-router-dom";
import { Card } from "../pages/Card";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cards/:id" element={<Card />} />
        <Route path="/cards/register" element={<Register />} />
      </Routes>
    </>
  );
};
