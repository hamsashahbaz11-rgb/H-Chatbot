// components/NavbarWrapper.js
"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
export default function FooterExceptionHandler() {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/chat") 

  return !hideFooter ? <Footer /> : null;
}
