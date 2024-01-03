"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        router.push("/auth/login");
    }, []);

}