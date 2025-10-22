import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      {/* Add padding-top to account for fixed navbar (80px for md and above, 64px for mobile) */}
      <main className="flex-grow w-full pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
