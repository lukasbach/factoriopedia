import { createContext, useContext } from "react";

const MobileMenuProviderContext = createContext<{
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}>(null as any);

export const MobileMenuProvider = MobileMenuProviderContext.Provider;
export const useMobileMenu = () => useContext(MobileMenuProviderContext);
