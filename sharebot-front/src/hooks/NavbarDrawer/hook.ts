"use client";
import { useRecoilState, atom } from "recoil";

const drawerCands = ["main"];

type NavbarDrawerStateT = "main" | "admin" | undefined;

const drawerState = atom<NavbarDrawerStateT>({
  key: "drawer",
  default: undefined,
});


export function useNavbarDrawer() {
  const [drawer, setDrawer] = useRecoilState(drawerState);


  const mainOpen = drawer === "main";
  const adminOpen = drawer === "admin";


  function openDrawer(state: NavbarDrawerStateT): void {
    setDrawer(state);
  }

  function closeDrawer(): void {
    setDrawer(undefined);
  }


  return {
    mainOpen,
    adminOpen,
    openDrawer,
    closeDrawer,
  };
}