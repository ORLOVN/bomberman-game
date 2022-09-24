import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createStore from "@/store";

type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
type AppDispatch = ReturnType<typeof createStore>["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
