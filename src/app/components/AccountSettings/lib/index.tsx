import PencilSVG from "@/app/assets/SettingsAssets/PencilSVG";
import { IPersonalDetailsInput } from "../type";

export const PersonalDetailsInput: IPersonalDetailsInput[] = [
  {
    id: 1,
    pageName: "email",
    title: "Email",
    className: "settings-input",
    classNameEdit: "settings-input-edit",
    buttonInput: "Edit",
    type: "text",
    buttonText: "Edit",
    buttonIMG: <PencilSVG />,
    editPage: {
      editPageTitle: "Edit email",
      editPageDescription:
        "Remember to verify your new email address after you've changed it, using the email we'll send you",
    },
  },
  {
    id: 2,
    pageName: "password",
    className: "settings-input",
    classNameEdit: "settings-input-edit",
    buttonInput: "Edit",
    type: "password",
    buttonText: "Edit",
    buttonIMG: <PencilSVG />,
    placeholder: "New password",
    editPage: {
      editPageTitle: "Edit password",
    },
  },
  {
    id: 3,
    pageName: "displayName",
    title: "Display name",
    className: "settings-input",
    classNameEdit: "settings-input-edit",
    buttonInput: "Edit",
    type: "text",
    buttonText: "Add",
    buttonIMG: <PencilSVG />,
    editPage: {
      editPageTitle: "Edit display name",
      editPageDescription:
        "Your display name is what people will see whenever you do anything public on a MEX website or app. For example, if you comment on a story.",
    },
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
    classNameEdit: "settings-input-edit",
    buttonInput: "Edit",
    type: "text",
    buttonText: "Edit",
    buttonIMG: <PencilSVG />,
    editPage: {
      editPageTitle: "Edit country and postcode",
    },
  },
];
