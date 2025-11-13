import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="navbar">
          <div className="navbar-content">
            <Link href="/" className="navbar-title">Readle</Link>
            <div className="navbar-links">
              <Link href="/books">Books</Link>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
