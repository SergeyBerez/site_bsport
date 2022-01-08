import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../styles/globals.css';
//import '../styles/reset.css';

import Context from '../context/firebaseContext';

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
