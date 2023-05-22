import { createSlice } from '@reduxjs/toolkit';

export interface CharacterState {
    name: string,
    description: string,
    comics_appeared_in: number,
    super_power: string,
    date_created: string,
    
}

const initialState: CharacterState = {
    name: '',
    description: '',
    comics_appeared_in: 1974,
    super_power: "",
    date_created: '',
   
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseComics_Appeared_In: (state, action) => { state.comics_appeared_in = action.payload },
        chooseSuper_Power: (state, action) => { state.super_power = action.payload },
        chooseDate_Created: (state, action) => { state.date_created = action.payload },

}})


export const reducer = rootSlice.reducer;
export const {
    chooseName,
    chooseDescription,
    chooseComics_Appeared_In,
    chooseSuper_Power,
    chooseDate_Created,
} = rootSlice.actions;