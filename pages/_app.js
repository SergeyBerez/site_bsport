import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../styles/globals.css';

//import '../styles/reset.css';

import Context from '../context/firebaseContext';
import ContextGoods from '../context/contextGoods';
function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <ContextGoods>
        <Component {...pageProps} />
      </ContextGoods>
    </Context>
  );
}

export default MyApp;
