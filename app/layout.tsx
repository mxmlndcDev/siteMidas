import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-display",
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    weight: ["300", "400", "500"],
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
        <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
            <body className="font-body antialiased selection:bg-blue-light selection:text-blue">
                {children}
            </body>
        </html>
    );
}
