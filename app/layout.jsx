import Header from "./ui/Layout/Header/Header";
import Footer from "./ui/Layout/Footer/Footer";
import reset from "@/app/style/reset.css";
import styles from "@/app/style/index.css";
import UserInfo from "./utils/context/userContext";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <UserInfo>
          <Header />
          <main>{children}</main>
          <Footer />
        </UserInfo>
      </body>
    </html>
  );
}
