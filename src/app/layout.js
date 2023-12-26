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
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <>
    <Head>
    <meta property="og:image" content="/assets/images/share-thumbnail-image.jpeg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    </Head>
    <html lang="en" dir='rtl'>
      <body className={myFont.className}>{children}</body>
    </html>
    </>
  )
}
