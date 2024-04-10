import Header from "./ui/Layout/Header/Header";
import Footer from "./ui/Layout/Footer/Footer";
import reset from "@/app/style/reset.css";
import styles from "@/app/style/index.css";
import UserInfo from "./utils/context/userContext";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="text/javascript"
          src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js"
        ></script>

        <script
          type="text/javascript"
          src="//unpkg.com/leaflet/dist/leaflet.js"
        ></script>
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
