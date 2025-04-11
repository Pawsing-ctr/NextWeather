import React, { useState } from "react";
import "./index.css";
import EditorComponent from "@/app/components/EditorComponent/EditorComponent";
import $api from "@/app/api/$api";
import { newsPath } from "@/app/api/apiNews/newsPath";

const FormAdmin = () => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleAddNew = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!newTitle || !newDescription) {
      return setErrorMessage("Введите что то в поля");
    }

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await $api.post(newsPath.BASE_NEW_PATH, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewTitle("");
      setNewDescription("");
      setImage(null);

      setSuccessMessage(response.data.message || "Новость успешно создана!");
    } catch (error) {
      console.error("Ошибка создания новости", error);
      setErrorMessage("Не удалось создать новость. Попробуйте позже.");
    }
  };

  return (
    <div className="all-news-form">
      <div className="news-block">
        <p className="news-form-title">Создать свежую новость</p>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleAddNew} className="news-form">
          <div>
            <p>Введите заголовок для новости</p>
            <EditorComponent content={newTitle} setContent={setNewTitle} />
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <p>Введите описание новости</p>
            <EditorComponent
              content={newDescription}
              setContent={setNewDescription}
            />
          </div>
          <button type="submit" className="make-news-button">
            Создать новость
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAdmin;
