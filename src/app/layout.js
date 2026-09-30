import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <nav className="site-nav">
          <Link href="/">홈</Link>
          <Link href="/companyList">채용 회사 리스트</Link>
          <Link href="/applicationList">내가 지원한 리스트</Link>
          <Link href="/favoriteList">찜 리스트</Link>
        </nav>

        {children}
      </body>
    </html>
  );
}