import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  value: {
    rgb: {
      red: 255, green: 255, blue: 255
    },
    hex: {
      red: 'FF', green: 'FF', blue: 'FF'
    }
  }
}

export const colorValuesSlice = createSlice({
  name: 'colorValue',
  initialState: initialStateValue,
  reducers: {
    setColors: (state, action) => { state.value = action.payload },
    resetColors: (state) => { state.value = initialStateValue }
  }
});

export const { setColors, resetColors } = colorValuesSlice.actions;
export default colorValuesSlice.reducer;