"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/lib/store/user-store";

export function withAdminProtection<P>(Component: React.ComponentType<P>) {
  return function AdminProtectedComponent(props: P) {
    const { user } = useUserStore();
    const router = useRouter();

    useEffect(() => {
      if (user && user.role !== "ADMIN") {
        router.push("/dashboard");
        toast.error("Você não tem permissão para acessar esta página");
      }
    }, [user, router]);

    if (!user || user.role !== "ADMIN") {
      return null;
    }

    return <Component {...props} />;
  };
}