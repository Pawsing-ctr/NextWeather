"use client";
import { PersonalDetailsInput } from "@/app/components/AccountSettings/lib";
import AccountSettingsWrapper from "@/app/components/AccountSettings/ui/AccountSettingsWrapper";
import Header from "@/app/components/Header/Header";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import "./page.css";
// import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import // getUserData,
// IUserAccountData,
"@/app/GlobalFunc/getUserDataFunc/getUserDataFunc";
import Link from "next/link";
import BeforeFooterBlock from "@/app/components/BeforeFooterBlock/BeforeFooterBlock";
import { Footer } from "@/app/components/Footer/ui/Footer";
// import $api from "@/app/api/$api";
// import { userPath } from "@/app/api/apiUsers/userPath";
import { useRouter } from "next/navigation";
import UnauthenticatedRoute from "@/app/components/UnauthenticatedRoute/UnauthenticatedRoute";
import PasswordConditions from "@/app/components/PasswordConditions/PasswordConditions";

const ClientComponent = () => {
  const [inputValue, setInputValue] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  // const [userData, setUserData] = useState<IUserAccountData>({
  //   email: "",
  //   password: "",
  //   displayName: "",
  //   yearOfBirth: "",
  // });
  const params = useParams();
  const { pageName } = params;

  // const { user } = useAuth();

  const router = useRouter();

  const currentPage = PersonalDetailsInput.find(
    (el) => el.pageName === pageName
  );

  // useEffect(() => {
  //   getUserData({ setUser: setUserData, user, hidePassword: false });
  // }, [user]);

  // useEffect(() => {
  //   if (currentPage && currentPage.pageName && userData) {
  //     setInputValue(
  //       userData[currentPage.pageName as keyof IUserAccountData] || ""
  //     );
  //   }
  // }, [currentPage, userData]);

  const handleSaveChange = async () => {
    if (!currentPage?.pageName) return;
    if (!inputValue) return;

    const currentUserStorage = localStorage.getItem("registeredUsers");

    // let updateData = {};
    if (!currentUserStorage) {
      console.error("Пользователь не найден в LocalStorage");
      return;
    }

    const userData = JSON.parse(currentUserStorage);

    // БЭК
    // if (currentPage.pageName === "password") {
    //   updateData = {
    //     newPassword: inputValue,
    //   };
    // } else {
    //   updateData = {
    //     [currentPage.pageName]: inputValue,
    //   };
    // }

    if (currentPage.pageName === "password") {
      userData.password = inputValue;
    } else {
      userData[currentPage.pageName] = inputValue;
    }

    localStorage.setItem("registeredUsers", JSON.stringify(userData));

    try {
      // const response = await $api.put(userPath.UPDATE_USERS_DATA, updateData);
      // setErrorMessage(response.data.message);

      if (currentPage.pageName === "password") {
        router.push("/auth");
      } else {
        router.push("/account/settings");
      }

      // console.log("Данные успешно обновлены:", response.data);
    } catch (error) {
      console.error("Ошибка при отправке запроса: ", error);
    }
  };

  return (
    <UnauthenticatedRoute>
      <Header />
      <PageBlockWrapper>
        <AccountSettingsWrapper>
          <div className="all-settings-change">
            <div className="text-settings-change">
              <p className="title-settings-change">
                {currentPage?.editPage?.editPageTitle}
              </p>
              <p>{currentPage?.editPage?.editPageDescription}</p>
            </div>
            <div className="new-password-block">
              <div>
                <p>{currentPage?.title}</p>
                <input
                  className={currentPage?.classNameEdit}
                  type={currentPage?.type}
                  value={inputValue}
                  placeholder={currentPage?.placeholder}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              {currentPage?.pageName === "password" ? (
                <PasswordConditions black={true} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="change-button-block">
            <button onClick={handleSaveChange} className="change-button">
              Save and continue
            </button>
            <Link className="change-link" href={"/account/settings"}>
              Cancel
            </Link>
          </div>
        </AccountSettingsWrapper>
      </PageBlockWrapper>
      <BeforeFooterBlock />
      <Footer />
    </UnauthenticatedRoute>
  );
};

export default ClientComponent;
