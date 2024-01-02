import Head from 'next/head';
import './globals.css';
import localFont from 'next/font/local';
 
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

export const metadata = {
  title: 'Sahmk.sa',
  description: 'Generated by sahmk',
  icons: {
    icon: '/assets/images/icon.ico', 
  },
  openGraph: {
    title: "sahmk",
    url: "https://sahmk.vercel.app/",
    images: [
      {
      // url: "/public/assets/images/share-thumbnail-image.jpeg",
      url: "https://www.kasandbox.org/programming-images/avatars/spunky-sam.png",
      width: 800,
      height: 600,}
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en" dir='rtl'>
      <body className={myFont.className}>
        {children}</body>
    </html>
    </>
  )
}
