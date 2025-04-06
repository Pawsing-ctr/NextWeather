interface IRegistrationInput {
  id: number;
  type: string;
  name: string;
  placeholder: string;
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
      placeholder: "Email",
      className: "registration-form-input",
    },
    {
      id: 2,
      type: "password",
      name: "password",
      placeholder: "Password",
      className: "registration-form-input",
    },
  ],
  dateInputs: [
    {
      id: 1,
      type: "text",
      name: "day",
      placeholder: "Day",
      className: "data-user-input",
    },
    {
      id: 2,
      type: "text",
      name: "month",
      placeholder: "Month",
      className: "data-user-input",
    },
    {
      id: 3,
      type: "text",
      name: "year",
      placeholder: "Year",
      className: "data-user-input",
    },
  ],
};
