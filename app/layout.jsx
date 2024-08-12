import Header from "./ui/Layout/Header/Header";
import Footer from "./ui/Layout/Footer/Footer";
import reset from "@/app/style/reset.css";
import styles from "@/app/style/index.css";
import UserInfo from "./utils/context/userContext";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Lithosphere83: minéraux du monde.</title>
        <meta
          name="description"
          content="Expertise unique en minéraux du Var et de la Corse. Sélection exclusive de spécimens rares et authentiques. Achat personnalisé et enrichissant garanti."
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//unpkg.com/leaflet/dist/leaflet.css"
        />
      </head>
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
