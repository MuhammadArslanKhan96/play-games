import "@/styles/globals.css";
import Header from "../../component/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <script async src="/script.js?v=1.18" onLoad={""}></script>
      <Component {...pageProps} />
    </>
  );
}
