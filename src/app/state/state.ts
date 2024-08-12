import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { AppState } from "../models/App.state.model";
import { Box, Option } from "../models/Box.model";

const keyState = 'boxesState';

const savedState = localStorage.getItem(keyState);

const saveState = (state: AppState) => {
    localStorage.setItem(keyState, JSON.stringify(state));
}
const updateBox = (box: Box, id: number, option: Option, lastIndex: number): Box => {
    if (box.id === id) {
        return {
            ...box,
            selected: (id === lastIndex),
            selectedOption: option
        };
    }
    if (box.id === id + 1 && id !== lastIndex) {
        return { ...box, selected: true };
    }
    return box;
};
const defaultState: AppState = {
    boxes: Array.from({ length: 10 }, (_, index) => ({
        id: index,
        selectedOption: null,
        selected: false,
        options: Array.from({ length: 10 }, (_, optionIndex) => ({
            id: optionIndex + 1,
            name: `Option ${index * 10 + optionIndex + 1}`,
            value: index * (optionIndex + 1) + (optionIndex + 1.5),
        })),

    }))
};

const initialState: AppState = savedState ? JSON.parse(savedState) : defaultState;

export const BoxStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ boxes }) => ({
        totalValue: computed(() => boxes().reduce((acc, { selectedOption }) =>
            acc + (selectedOption?.value || 0), 0)
        ),
    })),
    withMethods((store) => ({
        selectBoxState(id: number): void {
            patchState(store, (state: AppState) => {
                const boxes = state.boxes.map((box: Box) => ({
                    ...box,
                    selected: box.id === id
                }))
                saveState({ boxes });
                return {
                    boxes
                }
            })
        },
        updateBoxState(id: number, option: Option): void {
            patchState(store, (state: AppState) => {
                const boxes = state.boxes.map((box: Box) => updateBox(box, id, option, state.boxes.length - 1))
                saveState({ boxes });
                return {
                    boxes
                }
            })
        },
        resetState(): void {
            patchState(store, () => ({ ...defaultState }))
        }

    }))
);