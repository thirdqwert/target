import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IInitialState {
    logOutWin:boolean,
    theme:string
}

const initialState:IInitialState = {
    logOutWin: false,
    theme:'dark',
}
const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        logOutWinStatus: (state, action: PayloadAction<boolean>) => {
            state.logOutWin = action.payload
        },
        changeTheme: (state) => {
            let currentTheme = state.theme == 'dark' ? 'light' : 'dark'
            state.theme = currentTheme
        }
    }
})
export const { logOutWinStatus,changeTheme } = mainSlice.actions
export default mainSlice.reducer