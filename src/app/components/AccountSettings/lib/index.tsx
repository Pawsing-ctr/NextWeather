import PencilSVG from "@/app/assets/SettingsAssets/PencilSVG";
import { IPersonalDetailsInput } from "../type";

export const PersonalDetailsInput: IPersonalDetailsInput[] = [
  {
    id: 1,
    pageName: "email",
    title: "settings_title_email",
    className: "settings-input",
    classNameEdit: "settings-input-edit",
    buttonInput: "settings_button_edit",
    type: "text",
    buttonText: "settings_button_edit",
    buttonIMG: <PencilSVG />,
    editPage: {
      editPageTitle: "settings_edit_email_title",
      editPageDescription: "settings_edit_email_desc",
    },
  },
  {
    id: 2,
    pageName: "password",
    title: "settings_title_password",
    className: "settings-input",
    classNameEdit: "settings-input-edit",
    buttonInput: "settings_button_edit",
    type: "password",
    buttonText: "settings_button_edit",
    buttonIMG: <PencilSVG />,
    placeholder: "settings_placeholder_new_password",
    editPage: {
      editPageTitle: "settings_edit_password_title",
    },
  },
  {
    id: 3,
    pageName: "displayName",
    title: "settings_title_display_name",
    className: "settings-input",
    classNameEdit: "settings-input-edit",
    buttonInput: "settings_button_edit",
    type: "text",
    buttonText: "settings_button_add",
    buttonIMG: <PencilSVG />,
    editPage: {
      editPageTitle: "settings_edit_display_name_title",
      editPageDescription: "settings_edit_display_name_desc",
    },
  },
  {
    id: 4,
    pageName: "yearOfBirth",
    title: "settings_title_year_of_birth",
    className: "settings-input",
    classNameEdit: "settings-input-edit",
    buttonInput: "settings_button_edit",
    type: "text",
    buttonText: "settings_button_edit",
  },
  {
    id: 5,
    pageName: "country",
    title: "settings_title_country_of_residence",
    className: "settings-input",
    classNameEdit: "settings-input-edit",
    buttonInput: "settings_button_edit",
    type: "text",
    buttonText: "settings_button_edit",
    buttonIMG: <PencilSVG />,
    editPage: {
      editPageTitle: "settings_edit_country_title",
    },
  },
];
