(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[577],{4994:function(e,t,n){"use strict";n.d(t,{Z:function(){return N}});var o=n(5683),i=n.n(o),a=n(7294),r=n(3133),l=n(5928),s=n(1883),c=n(2091),d=n(9715),u=n(80),m=n(8633);const f=r.default.span.withConfig({displayName:"social-link__EmojiLink",componentId:"sc-m1ml6-0"})(["cursor:pointer;color:",";"],(e=>e.theme.emoji)),p=(0,r.default)(f).withConfig({displayName:"social-link__RssLink",componentId:"sc-m1ml6-1"})(["color:",";"],(e=>e.theme.emoji)),g=(0,r.default)(m.hud).withConfig({displayName:"social-link__StyledRssIcon",componentId:"sc-m1ml6-2"})(["color:",";"],(e=>e.theme.emoji)),x={github:a.createElement(c.hJX,{className:"icon",size:"26"}),instagram:a.createElement(c.Zf_,{className:"icon",size:"26"}),facebook:a.createElement(c.Am9,{className:"icon",size:"26"}),linkedin:a.createElement(c.ltd,{className:"icon",size:"26"}),velog:a.createElement(d.$z8,{className:"icon",size:"26"}),email:a.createElement(u.F8X,{className:"icon",size:"26"})},h=r.default.div.withConfig({displayName:"social-link__StyledSocialLinks",componentId:"sc-m1ml6-3"})(["display:flex;gap:14px;margin-left:15px;margin-bottom:30px;"]);var b=e=>{let{socialLinks:t}=e;return a.createElement(h,null,a.createElement(p,null,a.createElement(s.Link,{to:"/rss.xml"},a.createElement(g,{className:"icon",size:"26"}))),Object.entries(t).map((e=>{let[t,n]=e;return"email"===t?a.createElement("a",{key:t,href:"mailto:"+n},a.createElement(f,null,x[t])):a.createElement(s.Link,{key:t,to:n},a.createElement(f,null,x[t]))})))};const y=(e,t)=>e.length<=t?e:e.slice(0,t)+"...",E=r.default.div.withConfig({displayName:"profile__ProfileStyle",componentId:"sc-dmo4zz-0"})(["display:flex;align-items:center;padding-bottom:40px;"]),k=r.default.div.withConfig({displayName:"profile__Text",componentId:"sc-dmo4zz-1"})(["margin-left:25px;width:60%;"]),w=r.default.div.withConfig({displayName:"profile__Author",componentId:"sc-dmo4zz-2"})(['@-webkit-keyframes flutter{0%{transform:rotate(0deg);}35%{transform:rotate(0deg);}40%{transform:rotate(-5deg);}60%{transform:rotate(5deg);}65%{transform:rotate(0deg);}100%{transform:rotate(0deg);}}@keyframes flutter{0%{transform:rotate(0deg);}35%{transform:rotate(0deg);}40%{transform:rotate(-5deg);}60%{transform:rotate(5deg);}65%{transform:rotate(0deg);}100%{transform:rotate(0deg);}}display:inline-block;font-family:"Catamaran",sans-serif;font-size:32px;color:',";padding-bottom:8px;font-weight:600;transform-origin:center;animation:flutter 2s linear infinite;"],(e=>e.theme.main.text)),z=r.default.div.withConfig({displayName:"profile__Description",componentId:"sc-dmo4zz-3"})(["font-size:16px;color:",";padding-top:5px;padding-bottom:5px;"],(e=>e.theme.profile.description)),v=r.default.div.withConfig({displayName:"profile__KeyWordsStyle",componentId:"sc-dmo4zz-4"})(["margin-top:30px;margin-left:-3px;"]),_=r.default.span.withConfig({displayName:"profile__KeyWordStyle",componentId:"sc-dmo4zz-5"})(["font-size:15px;margin-right:13px;border-radius:15px;padding:3px 8px;background-color:#484848;color:",";background-color:",";"],(e=>e.theme.main.text),(e=>e.theme.profile.keyword)),I=("undefined"!=typeof window&&"localhost:8000"===window.location.host||l.siteMetadata.siteUrl,r.default.div.withConfig({displayName:"profile__Image",componentId:"sc-dmo4zz-6"})(["background-image:url(","/profile.png);width:140px;height:140px;border:1px solid transparent;border-color:white;background-size:cover;background-position:center;border-radius:50%;"],l.siteMetadata.siteUrl));var N=e=>{let{author:t,description:n,siteUrl:o,keywords:r,socialLinks:l}=e;const s=y(n,50);return a.createElement("div",null,a.createElement(E,null,a.createElement(I,{siteUrl:o}),a.createElement(k,null,a.createElement(w,null,t),a.createElement(z,null,s),a.createElement(v,null,r.map((e=>a.createElement(_,{key:i()(e)},i()(e))))))),a.createElement(b,{socialLinks:l}))}},6386:function(e,t,n){"use strict";var o=n(7294),i=n(3133),a=n(5928),r=n(657);const l=i.default.section.withConfig({displayName:"utterances__CommentWrapper",componentId:"sc-lgukys-0"})(["margin-top:70px;"]);t.Z=()=>{const{0:e,1:t}=(0,o.useState)((0,r.F)("isDarkMode"));return(0,o.useEffect)((()=>{const e=()=>{t((0,r.F)("isDarkMode"))};return window.addEventListener("theme",e),()=>{window.removeEventListener("theme",e)}}),[]),o.createElement(l,null,o.createElement("div",{ref:t=>{if(!t)return;const n=document.createElement("script");n.src="https://utteranc.es/client.js",n.async=!0,n.setAttribute("repo",a.siteMetadata.repo),n.setAttribute("issue-term","pathname"),n.setAttribute("theme",e?"github-dark":"github-light"),n.setAttribute("label","blog-comment"),n.crossOrigin="anonymous",t.replaceChildren(n)}}))}},6947:function(e,t,n){"use strict";n.r(t);var o=n(7294),i=n(6678),a=n(4994),r=n(6386),l=n(3133),s=(n(1883),n(4839)),c=n(5928);const d=l.default.p.withConfig({displayName:"community__Description",componentId:"sc-17fq1j7-0"})(["font-size:18px;color:",";margin-left:20px;"],(e=>e.theme.main.text)),u=l.default.div.withConfig({displayName:"community__Line",componentId:"sc-17fq1j7-1"})(["padding-bottom:40px;border-bottom:1px solid ",";"],(e=>e.theme.main.border));t.default=e=>{let{data:t}=e;const n=t.site.siteMetadata.title,l=t.site.siteMetadata.description,m=t.site.siteMetadata.author,f=t.site.siteMetadata.siteUrl,p=t.site.siteMetadata.keywords,g=c.siteMetadata.socialLinks;return o.createElement(i.Z,null,o.createElement(s.Z,{title:n,description:l}),o.createElement(a.Z,{author:m,description:l,siteUrl:f,keywords:p,socialLinks:g}),o.createElement(d,null,"Leave a comment to connect with this author 👋"),o.createElement(u,null),o.createElement(r.Z,null))}},5683:function(e,t,n){var o=1/0,i="[object Symbol]",a=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,r=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,l="\\ud800-\\udfff",s="\\u2700-\\u27bf",c="a-z\\xdf-\\xf6\\xf8-\\xff",d="A-Z\\xc0-\\xd6\\xd8-\\xde",u="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",m="['’]",f="["+u+"]",p="[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]",g="\\d+",x="["+s+"]",h="["+c+"]",b="[^"+l+u+g+s+c+d+"]",y="(?:\\ud83c[\\udde6-\\uddff]){2}",E="[\\ud800-\\udbff][\\udc00-\\udfff]",k="["+d+"]",w="(?:"+h+"|"+b+")",z="(?:"+k+"|"+b+")",v="(?:['’](?:d|ll|m|re|s|t|ve))?",_="(?:['’](?:D|LL|M|RE|S|T|VE))?",I="(?:"+p+"|\\ud83c[\\udffb-\\udfff])"+"?",N="[\\ufe0e\\ufe0f]?",C=N+I+("(?:\\u200d(?:"+["[^"+l+"]",y,E].join("|")+")"+N+I+")*"),j="(?:"+[x,y,E].join("|")+")"+C,A=RegExp(m,"g"),L=RegExp(p,"g"),O=RegExp([k+"?"+h+"+"+v+"(?="+[f,k,"$"].join("|")+")",z+"+"+_+"(?="+[f,k+w,"$"].join("|")+")",k+"?"+w+"+"+v,k+"+"+_,g,j].join("|"),"g"),S=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,U="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,Z="object"==typeof self&&self&&self.Object===Object&&self,M=U||Z||Function("return this")();var R,D=(R={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(e){return null==R?void 0:R[e]});var T=Object.prototype.toString,F=M.Symbol,G=F?F.prototype:void 0,W=G?G.toString:void 0;function J(e){if("string"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&T.call(e)==i}(e))return W?W.call(e):"";var t=e+"";return"0"==t&&1/e==-o?"-0":t}function K(e){return null==e?"":J(e)}var Y,$=(Y=function(e,t,n){return e+(n?"-":"")+t.toLowerCase()},function(e){return function(e,t,n,o){var i=-1,a=e?e.length:0;for(o&&a&&(n=e[++i]);++i<a;)n=t(n,e[i],i,e);return n}(function(e,t,n){return e=K(e),void 0===(t=n?void 0:t)?function(e){return S.test(e)}(e)?function(e){return e.match(O)||[]}(e):function(e){return e.match(a)||[]}(e):e.match(t)||[]}(function(e){return(e=K(e))&&e.replace(r,D).replace(L,"")}(e).replace(A,"")),Y,"")});e.exports=$}}]);
//# sourceMappingURL=component---src-pages-community-jsx-d8aef3ba4672f90e2018.js.map