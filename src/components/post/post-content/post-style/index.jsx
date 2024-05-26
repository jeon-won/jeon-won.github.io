import styled from "styled-components";

export const ContentWrapper = styled.div`
  position: relative;
`;  


export const HtmlWrapper = styled.div`
  /* Root(?) CSS는 styles/index.jsx 파일에 구현되어 있음 */

  section > h1, h2, h3, h4, h5, h6 {
    font-family: 'MaplestoryOTFLight', sans-serif;
  }

  section > h1 {
    font-size: 2rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 70px;
    margin-bottom: 40px;
    word-break: break-all;
    font-weight: 700;
    line-height: 130%;
  }

  section > h2 {
    font-size: 1.9rem;
    color: ${props => props.theme.post.content.text};
    color: #fd7622;
    margin-top: 50px;
    margin-bottom: 30px;
    padding-top: 10px;
    word-break: break-all;
    font-weight: 700;
    line-height: 130%;
    border-top: 2px solid #fd7622;
  }

  section > h3 {
    font-size: 1.5rem;
    color: ${props => props.theme.post.content.text};
    color: #fd7622;
    margin-top: 30px;
    margin-bottom: 20px;
    word-break: break-all;
    font-weight: 700;
    line-height: 130%;
  }

  section > h4 {
    font-size: 1.2rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 25px;
    margin-bottom: 20px;
    word-break: break-all;
    font-weight: 700;
    line-height: 110%;
  }

  section > h5 {
    font-size: 1rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 20px;
    margin-bottom: 15px;
    word-break: break-all;
    font-weight: 700;
  }

  section > h6 {
    font-size: 0.8rem;
    color: ${props => props.theme.post.content.text};
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight: 700;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 2em;
  }
  table thead {
    border-bottom: 2px solid #fd7622; /* 표 헤더 아래쪽 테두리 */
  }
  table thead th {
    padding: 0.35em 0 0.35em;
    font-weight: bold;
    text-align: left;
    color: #fd7622;
    text-align: center;
  }
  table tbody {
    border-bottom: 2px solid #fd7622; /* 표 맨 아래쪽 테두리 */
    font-size: 0.9em;
  }
  table tbody tr {
    border-bottom: 1px solid ${props => props.theme.post.content.text};
  }
  table tbody tr td {
    padding: 0.75em 0;
    color: ${props => props.theme.post.content.text};
  }
  table tbody tr td a {
    color: ${props => props.theme.post.content.text};
    text-decoration: none;
    display: inline-block;
    margin: 0 0.5em 0 0;
  }

  // table tbody tr td a:hover, table tbody tr td a:active, table tbody tr td a:focus {
  //   color: #006687;
  //   border: none;
  // }
  // table tfoot td {
  //   padding: 0.35em 0 0.35em;
  //   text-align: left;
  //   // font-family: "Helvetica", "Helvetica Neue", "Arial", sans-serif;
  //   font-size: 2em;
  // }
  
  // @media screen and (min-width: 1000px) {
  //   table {
  //     width: 100%;
  //   }
  //   table thead {
  //     border-bottom: 3px solid ${props => props.theme.post.content.text};
  //   }
  //   table tbody tr {
  //     border-bottom: 1px solid #ddd;
  //   }
  // }

  // table {
  //   border-collapse: collapse;
  //   font-size: 14.5px;
  //   color: ${props => props.theme.main.text};
  //   border: 0.5px solid ${props => props.theme.main.text};

  //   thead {
  //     tr {
  //       th {
  //         background-color: ${props => props.theme.tag.hover};
  //         padding-bottom: 20px;
  //         padding-top: 10px;
  //         padding-left: 10px;
  //         border-bottom: 0.1px solid ${props => props.theme.main.text};
  //         border-left: 0.1px solid ${props => props.theme.main.text};
  //       }
  //     }
  //   }
  // }

  // td:nth-child(odd) {
  //   background-color: ${props => props.theme.tag.background};
  //   padding-top: 10px;
  //   padding-bottom: 10px;
  //   padding-left: 10px;
  //   padding-right: 20px;
  //   border-bottom: 0.5px solid ${props => props.theme.main.text};
  //   border-right: 0.1px solid  ${props => props.theme.main.text};
  // }

  // td:nth-child(even) {
  //   background-color: ${props => props.theme.tag.background};
  //   padding-top: 15px;
  //   padding-bottom: 15px;
  //   padding-left: 15px;
  //   padding-right: 20px;
  //   border-bottom: 0.1px solid ${props => props.theme.main.text};
  // }

  // tr:last-child td {
  //   border-bottom: none;
  // }

  section > p {
    font-size: 16px;
    line-height: 180%; 
    color: ${props => props.theme.post.content.text};
    margin-bottom: 20px;
    margin-top: 20px;
    word-break: normal;

    span {
      margin-top: 40px;
      margin-bottom: 40px;
      font-size: 100px;
    }
  }

  strong {
    font-weight: bold;
    // color: #f17a42;
    color: #fd7622;
  }

  .gatsby-resp-image-wrapper {
    margin-top: -20px;
    // margin-bottom: -20px;
    width: 100%;
  }

  blockquote {
    padding-left: 18px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px; 
    margin-top: 20px;
    background-color: ${props => props.theme.post.content.blockquote.body};
    line-height: 170%;
    color: ${props => props.theme.post.content.blockquote.text};
    border-left: 6px solid ${props => props.theme.post.content.blockquote.left};
    word-break: break-all;
  }

  hr {
    // height: 2px;
    border: 1px solid #fd7622;
    background-color: ${props => props.theme.post.content.hr};
    margin-top: 30px;
    margin-bottom: 30px;
    word-break: break-all;
  }

  a {
    // color: ${props => props.theme.post.content.a};
    color: #fd7622;
    word-break: break-all;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  ul, ol {
    line-height: 180%; 
    word-break: break-all;
  }

  li {
    color: ${props => props.theme.post.content.li};
    list-style-type: disc;
    margin-left: 20px;
    // margin-top: 20px;
    // margin-bottom: 20px;
  }

  /* 코드 블록 스타일링 */
  code.language-text {
    padding: 0 .3em;
    color: #fd7622;
    border: 1px solid #fd7622;
    border-radius: .2em;
    word-break: break-all;
  }

  .gatsby-highlight {
    font-size: 13.5px;
    margin-bottom: 50px;
    word-break: break-all;

    .language-text {
      background-color: ${props => props.theme.post.content.blockquote.body};
      font-size: 13.5px;
      color: ${props => props.theme.post.content.blockquote.text};
    }
  }
  
  .language-text {
    background-color: ${props => props.theme.post.content.language.bg};
    padding: -10px;
    font-size: 14.5px;
    color: ${props => props.theme.post.content.language.text};
    width: 100%;
    height: 100%;
    word-break: break-all;
  }
}
`