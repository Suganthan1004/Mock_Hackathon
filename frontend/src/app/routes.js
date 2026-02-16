import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { AttendancePage } from "./pages/AttendancePage.jsx";
import { AssignmentPage } from "./pages/AssignmentPage.jsx";
import { StudentPortalPage } from "./pages/StudentPortalPage.jsx";
import { FacultyPortalPage } from "./pages/FacultyPortalPage.jsx";
import { CoursesPage } from "./pages/CoursesPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { RootLayout } from "./components/RootLayout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "courses", Component: CoursesPage },
      { path: "student-portal", Component: StudentPortalPage },
      { path: "faculty-portal", Component: FacultyPortalPage },
      { path: "attendance", Component: AttendancePage },
      { path: "assignments", Component: AssignmentPage },
    ],
  },
]);

