import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Catamaran';
    font-style: extrabold;
    font-weight: normal;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPNHa5a7dvXmnPy1tig.woff) format('woff');
    // unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'MaplestoryOTFLight';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFLight.woff') format('woff');
    // src: url('MaplestoryOTFBold.woff') format('woff');
    // font-weight: bold;
    // font-style: normal;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    background: ${props => props.theme.main.background};
  }

  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }
`;

export default GlobalStyle;