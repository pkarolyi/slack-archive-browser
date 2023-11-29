import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { redirect } from "next/navigation";
import "./globals.css";

const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPPFTW Archive | BETA",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const authDisabled =
    process.env.NODE_ENV === "development" &&
    process.env.INSECURE_DISABLE_AUTH === "yes_im_sure";

  if (!authDisabled && !session) redirect("/api/auth/signin");
  else
    return (
      <html lang="en">
        <body className={lato.className}>{children}</body>
      </html>
    );
}
