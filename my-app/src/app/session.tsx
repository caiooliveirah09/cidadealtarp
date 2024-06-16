"use client";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Session({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = pathname === "/signin" || pathname === "/signup";
  const token =  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/signin");
  };

  useEffect(() => {
    if (!token && !isPublic) {
      router.push("/signin");
    }
    if (token && isPublic) {
      router.push("/");
    }
  });

  return (
    <>
      {isPublic && children}
      {!isPublic && token && (
        <>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="2xl"
            className="absolute  right-4 top-4 hover:cursor-pointer shadow-lg duration-150 text-white hover:bg-slate-700 rounded-full p-2"
            onClick={logout}
          />
          {children}
        </>
      )}
    </>
  );
}
