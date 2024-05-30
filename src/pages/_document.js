import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html suppressHydrationWarning lang="en">
      <Head />
      <body style={{ backgroundColor: "#2B2D31" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
