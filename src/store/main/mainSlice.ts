import { createSlice, PayloadAction } from "@reduxjs/toolkit"

let savedTheme = localStorage.getItem('Target-theme')

export interface IInitialState {
    logOutWin: boolean,
    theme: string,
    crntModule: number,
}

const initialState: IInitialState = {
    logOutWin: false,
    theme: savedTheme ? savedTheme : 'dark',
    crntModule: 1,
}
const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        logOutWinStatus: (state, action: PayloadAction<boolean>) => {
            state.logOutWin = action.payload
        },
        changeTheme: (state, action: PayloadAction<string>) => {
            let currentTheme = action.payload
            state.theme = currentTheme
            localStorage.setItem('Target-theme', currentTheme)
        },
        setCrntModule: (state, action:PayloadAction<number>) => {
            state.crntModule = action.payload
        }
    }
})
export const { logOutWinStatus, changeTheme,setCrntModule } = mainSlice.actions
export default mainSlice.reducer