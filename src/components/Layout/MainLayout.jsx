import { useAuth } from "@/lib/auth";
import { AdminLayout } from "./AdminLayout";
import { UserLayout } from "./UserLayout";

export const MainLayout = ({ children }) => {
  const { session } = useAuth();
  return session?.role === "admin" ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <UserLayout>{children}</UserLayout>
  );
};
