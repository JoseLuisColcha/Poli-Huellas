import { useAuth } from "@/lib/auth";
import { AdminLayout } from "./AdminLayout";
import { UserLayout } from "./UserLayout";

export const MainLayout = ({ children }) => {
  const { session } = useAuth();
  console.log(session)
  return session?.role === "admin" ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <UserLayout>{children}</UserLayout>
  );
};
