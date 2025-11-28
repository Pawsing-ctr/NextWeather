import { TranslationKeys } from "../context/ui/SettingsContext";

interface IRegistrationInput {
  id: number;
  type: string;
  name: string;
  placeholderKey: TranslationKeys;
  className: string;
}

interface IFormInput {
  loginInputs: IRegistrationInput[];
  dateInputs: IRegistrationInput[];
}

export const formInputs: IFormInput = {
  loginInputs: [
    {
      id: 1,
      type: "text",
      name: "email",
      placeholderKey: "reg_input_placeholder_email",
      className: "registration-form-input",
    },
    {
      id: 2,
      type: "password",
      name: "password",
      placeholderKey: "reg_input_placeholder_password",
      className: "registration-form-input",
    },
  ],
  dateInputs: [
    {
      id: 1,
      type: "text",
      name: "day",
      placeholderKey: "reg_input_placeholder_day",
      className: "data-user-input",
    },
    {
      id: 2,
      type: "text",
      name: "month",
      placeholderKey: "reg_input_placeholder_month",
      className: "data-user-input",
    },
    {
      id: 3,
      type: "text",
      name: "year",
      placeholderKey: "reg_input_placeholder_year",
      className: "data-user-input",
    },
  ],
};
