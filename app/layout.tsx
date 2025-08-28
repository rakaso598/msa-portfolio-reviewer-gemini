import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "포트폴리오 AI 리뷰어",
  description: "AI 기반 포트폴리오 분석 서비스로 GitHub 프로젝트를 분석하고 전문적인 피드백을 받아보세요. 더 나은 개발자로 성장하는 여정을 함께합니다.",
  keywords: "포트폴리오 분석, AI 리뷰, GitHub 분석, 개발자 포트폴리오, 코드 리뷰",
  authors: [{ name: "MSA Portfolio Reviewer" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApiKeyProvider>
          {children}
        </ApiKeyProvider>
      </body>
    </html>
  );
}
