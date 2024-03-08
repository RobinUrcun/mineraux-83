import Header from "./ui/Layout/Header/Header";
import Footer from "./ui/Layout/Footer/Footer";
import reset from "@/app/style/reset.css";
import styles from "@/app/style/index.css";
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
