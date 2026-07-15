import Sidebar from "./Sidebar";
import Header from "./Header";
import AnimatedPage from "./AnimatedPage";

export default function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top right,
            rgba(59,130,246,.12),
            transparent 30%),
          radial-gradient(circle at bottom left,
            rgba(14,165,233,.10),
            transparent 35%),
          #0f172a
        `,
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "270px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <AnimatedPage>
          <main
            style={{
              padding: "110px 35px 35px",
              width: "100%",
              maxWidth: "1600px",
              margin: "0 auto",
              boxSizing: "border-box",
            }}
          >
            {children}
          </main>
        </AnimatedPage>
      </div>
    </div>
  );
}