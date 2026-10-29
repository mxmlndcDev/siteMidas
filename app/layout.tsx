import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL, orgJsonLd } from "./sedes";

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
    metadataBase: new URL(SITE_URL),
    title: "Grupo Midas | Bingos en Ciudadela, Merlo, Hurlingham y Caseros",
    description: "Cuatro salas de bingo y slots en Zona Oeste: Ciudadela, Merlo, Hurlingham y Caseros. Horarios, jugadas, carta y Club Midas.",
    alternates: { canonical: "/" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
            <body className="font-body antialiased selection:bg-blue-light selection:text-blue">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
                />
                {children}
            </body>
        </html>
    );
}
