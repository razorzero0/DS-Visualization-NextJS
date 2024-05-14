import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Data Structure Visualizations by Ainun | Visualisasi Struktur Data",
    description:
        "Pelajari struktur data seperti array, linked list, stack, queue, tree, dan graph dengan visualisasi interaktif yang memudahkan pemahaman anda.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
