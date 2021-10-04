import { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
