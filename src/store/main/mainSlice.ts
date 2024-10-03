import { createSlice, PayloadAction } from "@reduxjs/toolkit"

let savedTheme = localStorage.getItem('Target-theme')

export interface IInitialState {
    logOutWin: boolean,
    theme: string,
}

const initialState: IInitialState = {
    logOutWin: false,
    theme: savedTheme ? savedTheme : 'dark',
}
const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        logOutWinStatus: (state, action: PayloadAction<boolean>) => {
            state.logOutWin = action.payload
        },
        changeTheme: (state,action:PayloadAction<string>) => {
            let currentTheme = action.payload
            state.theme = currentTheme
            localStorage.setItem('Target-theme', currentTheme)
        }
    }
})
export const { logOutWinStatus, changeTheme } = mainSlice.actions
export default mainSlice.reducer