import { getProfileAction } from "@/actions/auth";

export default async function DashboardPage() {
  const profile = await getProfileAction();

  return (
    <>
      <h1 className="text-2xl font-semibold">
        Welcome {profile?.role == "admin" ? "Admin" : "Inductee"}{" "}
      </h1>
    </>
  );
}
