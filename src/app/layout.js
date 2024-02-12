import './globals.css';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';
import Head from 'next/head';

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: [
    {
      path: '../fonts/DIN-Next-LT-Arabic-Light/DIN-Next-LT-Arabic-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/DIN-Next-LT-Arabic-Regular/DIN-Next-LT-Arabic-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/DIN-Next-LT-Arabic-Bold/DIN-Next-LT-Arabic-Bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/DIN-Next-LT-Arabic-Medium/DIN-Next-LT-Arabic-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
})

export const viewport = {
  themeColor: 'white',
}

export const metadata = {
  metadataBase: new URL('https://sahmk.sa'),
  title: 'سهمك | SAHMK',
  description: 'منصة سهمك, موثوق من تداول السعودية',
  icons: {
    icon: '/assets/images/icon.ico', 
  },
  openGraph: {
    title: "سهمك | SAHMK",
    description: 'منصة سهمك, موثوق من تداول السعودية',
    url: "https://sahmk.sa/",
    images: [
      {
      url: "/assets/images/share-thumbnail-image.jpeg",
      width: 800,
      height: 600,
    }
    ]
  },
  twitter: {
    title: 'سهمك | SAHMK',
    description: 'منصة سهمك, موثوق من تداول السعودية',
    card: 'summary_large_image',
    site: 'https://sahmk.sa/',
    image:  [
      {
      url: "/assets/images/share-thumbnail-image.jpeg",
      width: 800,
      height: 600,
    }
    ]
  }
}


export default function RootLayout({ children }) {
  return (
    <>
     <Head>
     <Script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-L7QL65VWZ9'); `}
        </Script>
     </Head>
    <html lang="en" dir='rtl'>
      <body className={myFont.className}>
        {children}</body>
        <GoogleAnalytics gaId="G-L7QL65VWZ9" />
    </html>
    </>
  )
}
