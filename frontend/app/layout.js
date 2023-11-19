import { Inter } from 'next/font/google'
import './globals.css'
import { Context } from './context'
import Footer from './Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokedex | Image Search',
  description: 'Pokedex with image search',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Context>
        <body className={inter.className}>
          {children}
          <Footer />
        </body>
      </Context>
    </html>
  )
}
