import Header from "../components/layout/Header";
import Providers from "../components/layout/Providers";
import "./globals.css";

export const metadata = {
  title: "Events Minsk",
  description: "Поиск событий в Минске",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
