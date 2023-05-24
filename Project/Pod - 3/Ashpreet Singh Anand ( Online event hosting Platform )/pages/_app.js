import '@/styles/globals.css'
import HelpCenter from '@/components/HelpCenter'

export default function App({ Component, pageProps }) {
  return(<div>
  <Component {...pageProps} />
  </div>) 
  
}
