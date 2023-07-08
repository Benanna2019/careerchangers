import './global.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Sidebar from './components/sidebar'
import { Analytics } from '@vercel/analytics/react'

const graphik = localFont({
  src: [
    {
      path: '../public/fonts/Graphik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Graphik-Medium.ttf',
      weight: '600',
      style: 'bold',
    },
  ],
  variable: '--font-graphik',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://careerchangers.co'),
  title: {
    default: 'Career Changers',
    template: '%s | Career Changers',
  },
  description: 'Filling the void left by bootcamps career services.',
  openGraph: {
    title: 'Career Changers',
    description: 'Filling the void left by bootcamps career services.',
    url: 'https://careerchangers.co',
    siteName: 'Career Changers',
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'bg-white text-black dark:bg-[#111010] dark:text-white',
        graphik.variable
      )}
    >
      <body className="mb-40 flex flex-col antialiased md:flex-row ">
        <main className="mx-auto mt-8 flex max-w-2xl flex-auto flex-col px-2 md:px-0">
          <Sidebar />
          {children}
          {/* <Analytics /> */}
        </main>
      </body>
    </html>
  )
}
