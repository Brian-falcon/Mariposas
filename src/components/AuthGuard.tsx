"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_PATHS = ["/login", "/profesor"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { student, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));
    if (!isPublic && !student) {
      router.replace("/login");
    }
  }, [pathname, student, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  const isPublic = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));
  if (!isPublic && !student) {
    return null;
  }

  return <>{children}</>;
}
