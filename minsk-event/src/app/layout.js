import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Providers from "../components/layout/Providers";
import "./globals.css";

export const metadata = {
  title: "Events Minsk",
  description: "Поиск событий в Минске",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-1 flex flex-col min-h-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
