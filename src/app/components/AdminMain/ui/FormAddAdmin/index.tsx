import React, { useState } from "react";
import "./index.css";
import $api from "@/app/api/$api";
import { userPath } from "@/app/api/apiUsers/userPath";
import toast, { Toaster } from "react-hot-toast";

const FormAddAdmin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleMakeAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await $api.patch(userPath.MAKE_USERS_ADMIN, {
        email: userEmail,
        password: userPassword,
      });

      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Не удалось сделать пользователя админом");
    }
  };

  return (
    <div className="admin-add-block">
      <p className="admin-form-title">Сделать человека Админом</p>
      <form onSubmit={handleMakeAdmin} className="add-admin-form">
        <div>
          <p>Введите Почту пользователя</p>
          <input
            className="add-admin-input"
            onChange={(e) => setUserEmail(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <p>Введите пароль пользователя</p>
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            type="password"
            className="add-admin-input"
          />
        </div>
        <button type="submit" className="add-admin-button">
          Сделать пользователя админом
        </button>
      </form>
      <Toaster position="bottom-left" />
    </div>
  );
};

export default FormAddAdmin;
