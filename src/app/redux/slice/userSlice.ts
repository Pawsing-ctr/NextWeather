// import { initialUser } from "@/app/constants/initialUserConst";
import { IInitialUser, initialUser } from "@/app/constants/initialUserConst";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  user: IInitialUser;
}

const initialState: InitialState = {
  user: initialUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInput: (
      state,
      action: PayloadAction<{ field: keyof IInitialUser; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.user[field] = value;
    },
  },
});

export const { setUserInput } = userSlice.actions;
export default userSlice.reducer;
