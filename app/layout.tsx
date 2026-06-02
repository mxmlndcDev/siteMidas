import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-dm-serif",
});

const dmSans = DM_Sans({
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dm-sans",
});

export const metadata: Metadata = {
    title: "Grupo Midas | Experiencia de Juego",
    description: "Seguridad, Gastronomía y los mejores sorteos de Buenos Aires.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${dmSans.variable} ${dmSerif.variable} font-body antialiased selection:bg-blue-light selection:text-blue`}>
                {children}
            </body>
        </html>
    );
}
