import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <section className="relative flex flex-col h-screen pt-72 md:pt-0 md:pl-64">
        <div className="container mx-auto px-6 flex-grow p-5">{children}</div>
      </section>
    </div>
  );
}
