import $api from "@/app/api/$api";
import { newsPath } from "@/app/api/apiNews/newsPath";
import EditorComponent from "@/app/components/EditorComponent/EditorComponent";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./index.css";

const FormMakeNews = () => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleAddNew = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle || !newDescription) {
      return toast.error("Поля не должны быть пустыми!");
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

      toast.success(response.data.message || "Новость успешно создана!");
    } catch (error) {
      console.error("Ошибка создания новости", error);
      toast.error("Проблемы с сервером");
    }
  };

  return (
    <div className="news-block">
      <p className="news-form-title">Создать свежую новость</p>

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
      <Toaster position="bottom-left" />
    </div>
  );
};

export default FormMakeNews;
