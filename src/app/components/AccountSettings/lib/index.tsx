import PencilSVG from "@/app/assets/SettingsAssets/PencilSVG";
import { IPersonalDetailsInput } from "../type";

export const PersonalDetailsInput: IPersonalDetailsInput[] = [
  {
    id: 1,
    pageName: "email",
    title: "Email",
    className: "settings-input",
    buttonInput: "Edit",
    type: "text",
    buttonText: "Edit",
    buttonIMG: <PencilSVG />,
  },
  {
    id: 2,
    pageName: "password",
    title: "Password",
    className: "settings-input",
    buttonInput: "Edit",
    type: "password",
    buttonText: "Edit",
    buttonIMG: <PencilSVG />,
  },
  {
    id: 3,
    pageName: "name",
    title: "Display name",
    className: "settings-input",
    buttonInput: "Edit",
    type: "text",
    buttonText: "Add",
    buttonIMG: <PencilSVG />,
  },
  {
    id: 4,
    title: "Year of birth",
    className: "settings-input",
    buttonInput: "Edit",
    type: "text",
  },
  {
    id: 5,
    pageName: "country",
    title: "Country of residence",
    className: "settings-input",
    buttonInput: "Edit",
    type: "text",
    buttonText: "Edit",
    buttonIMG: <PencilSVG />,
  },
];
