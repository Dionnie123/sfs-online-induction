import { getProfileAction } from "@/actions/auth";
import Quiz from "./quiz";
import CoursePage from "./course";

export default async function DashboardPage() {
  const profile = await getProfileAction();

  return (
    <>
      {/* <object
        data="https://pdfobject.com/pdf/sample.pdf"
        type="application/pdf"
        width="100%"
        height="700px"
      >
        <p>
          Alternative text - include a link{" "}
          <a href="https://pdfobject.com/pdf/sample.pdf">to the PDF!</a>
        </p>
      </object> */}
      <h1 className="text-2xl font-semibold">
        Welcome {profile?.role == "admin" ? "Admin" : "Inductee"}{" "}
      </h1>
      <CoursePage />
      <Quiz />
    </>
  );
}
