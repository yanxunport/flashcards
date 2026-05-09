"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}) {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) {
    return <p className="p-10">Loading...</p>;
  }

  return children;
}