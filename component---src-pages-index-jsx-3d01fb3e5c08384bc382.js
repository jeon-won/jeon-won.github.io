"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[230],{4994:function(e,t,o){o.d(t,{Z:function(){return N}});var a=o(5683),n=o.n(a),i=o(7294),l=o(3133),r=o(5928),s=o(1883),m=o(2091),d=o(9715),c=o(80),p=o(8633);const f=l.default.span.withConfig({displayName:"social-link__EmojiLink",componentId:"sc-m1ml6-0"})(["cursor:pointer;color:",";"],(e=>e.theme.emoji)),g=(0,l.default)(f).withConfig({displayName:"social-link__RssLink",componentId:"sc-m1ml6-1"})(["color:",";"],(e=>e.theme.emoji)),u=(0,l.default)(p.hud).withConfig({displayName:"social-link__StyledRssIcon",componentId:"sc-m1ml6-2"})(["color:",";"],(e=>e.theme.emoji)),h={github:i.createElement(m.hJX,{className:"icon",size:"26"}),instagram:i.createElement(m.Zf_,{className:"icon",size:"26"}),facebook:i.createElement(m.Am9,{className:"icon",size:"26"}),linkedin:i.createElement(m.ltd,{className:"icon",size:"26"}),velog:i.createElement(d.$z8,{className:"icon",size:"26"}),email:i.createElement(c.F8X,{className:"icon",size:"26"})},y=l.default.div.withConfig({displayName:"social-link__StyledSocialLinks",componentId:"sc-m1ml6-3"})(["display:flex;gap:14px;margin-left:15px;margin-bottom:30px;"]);var x=e=>{let{socialLinks:t}=e;return i.createElement(y,null,i.createElement(g,null,i.createElement(s.Link,{to:"/rss.xml"},i.createElement(u,{className:"icon",size:"26"}))),Object.entries(t).map((e=>{let[t,o]=e;return"email"===t?i.createElement("a",{key:t,href:"mailto:"+o},i.createElement(f,null,h[t])):i.createElement(s.Link,{key:t,to:o},i.createElement(f,null,h[t]))})))};const k=(e,t)=>e.length<=t?e:e.slice(0,t)+"...",_=l.default.div.withConfig({displayName:"profile__ProfileStyle",componentId:"sc-dmo4zz-0"})(["display:flex;align-items:center;padding-bottom:40px;"]),w=l.default.div.withConfig({displayName:"profile__Text",componentId:"sc-dmo4zz-1"})(["margin-left:25px;width:60%;"]),b=l.default.div.withConfig({displayName:"profile__Author",componentId:"sc-dmo4zz-2"})(['@-webkit-keyframes flutter{0%{transform:rotate(0deg);}35%{transform:rotate(0deg);}40%{transform:rotate(-5deg);}60%{transform:rotate(5deg);}65%{transform:rotate(0deg);}100%{transform:rotate(0deg);}}@keyframes flutter{0%{transform:rotate(0deg);}35%{transform:rotate(0deg);}40%{transform:rotate(-5deg);}60%{transform:rotate(5deg);}65%{transform:rotate(0deg);}100%{transform:rotate(0deg);}}display:inline-block;font-family:"Catamaran",sans-serif;font-size:32px;color:',";padding-bottom:8px;font-weight:600;transform-origin:center;animation:flutter 2s linear infinite;"],(e=>e.theme.main.text)),E=l.default.div.withConfig({displayName:"profile__Description",componentId:"sc-dmo4zz-3"})(["font-size:16px;color:",";padding-top:5px;padding-bottom:5px;"],(e=>e.theme.profile.description)),v=l.default.div.withConfig({displayName:"profile__KeyWordsStyle",componentId:"sc-dmo4zz-4"})(["margin-top:30px;margin-left:-3px;"]),z=l.default.span.withConfig({displayName:"profile__KeyWordStyle",componentId:"sc-dmo4zz-5"})(["font-size:15px;margin-right:13px;border-radius:15px;padding:3px 8px;background-color:#484848;color:",";background-color:",";"],(e=>e.theme.main.text),(e=>e.theme.profile.keyword)),C=("undefined"!=typeof window&&"localhost:8000"===window.location.host||r.siteMetadata.siteUrl,l.default.div.withConfig({displayName:"profile__Image",componentId:"sc-dmo4zz-6"})(["background-image:url(","/profile.png);width:140px;height:140px;border:1px solid transparent;border-color:white;background-size:cover;background-position:center;border-radius:50%;"],r.siteMetadata.siteUrl));var N=e=>{let{author:t,description:o,siteUrl:a,keywords:l,socialLinks:r}=e;const s=k(o,50);return i.createElement("div",null,i.createElement(_,null,i.createElement(C,{siteUrl:a}),i.createElement(w,null,i.createElement(b,null,t),i.createElement(E,null,s),i.createElement(v,null,l.map((e=>i.createElement(z,{key:n()(e)},n()(e))))))),i.createElement(x,{socialLinks:r}))}},6575:function(e,t,o){o.r(t),o.d(t,{default:function(){return b}});var a=o(7294),n=o(6678),i=o(7404),l=o(4994),r=o(5683),s=o.n(r),m=o(1883),d=o(3133);const c=d.default.div.withConfig({displayName:"simple-taglist__TagListStyle",componentId:"sc-109yy4s-0"})(["margin-left:50px;line-height:30px;display:flex;margin-left:0px;padding-bottom:40px;border-bottom:1.5px solid ",";position:relative;"],(e=>e.theme.main.border)),p=d.default.div.withConfig({displayName:"simple-taglist__TagTitle",componentId:"sc-109yy4s-1"})(["font-size:14px;margin-left:7px;margin-bottom:3px;color:",";font-weight:bold;"],(e=>e.theme.tag.text)),f=d.default.div.withConfig({displayName:"simple-taglist__TagStyle",componentId:"sc-109yy4s-2"})(["float:left;padding-left:10px;font-size:13.5px;transition:color 1s;&:hover{color:#f0f0f0;}"]),g=(0,d.default)(m.Link).withConfig({displayName:"simple-taglist__StyledLink",componentId:"sc-109yy4s-3"})(["text-decoration:none;transition:color 1s;color:",";&:hover{color:#999;}"],(e=>e.theme.tag.text)),u=d.default.span.withConfig({displayName:"simple-taglist__TagCountStyle",componentId:"sc-109yy4s-4"})(["color:",";font-size:13px;transition:color 1s;&:hover{color:#999;}"],(e=>e.theme.tag.count)),h=d.default.button.withConfig({displayName:"simple-taglist__ShowMoreButton",componentId:"sc-109yy4s-5"})(["background-color:",";border:none;cursor:pointer;color:",";font-size:12.5px;padding:3px 6px;border-radius:5px;margin-top:10px;position:absolute;bottom:8px;left:5px;transition:background-color 0.5s;&:hover{background-color:",";}"],(e=>e.theme.tag.background),(e=>e.theme.main.text),(e=>e.theme.tag.hover));var y=e=>{let{tags:t,allCount:o,posts:n}=e;const{0:i,1:l}=(0,a.useState)(!1),r=n||[],m=t.filter((e=>0===r.filter((t=>t.frontmatter&&t.frontmatter.tags&&t.frontmatter.tags.includes(e.fieldValue)&&t.frontmatter.isPrivate)).length)),d=i?m:m.slice(0,20);return a.createElement(c,null,a.createElement("div",null,a.createElement(p,null,"Tags (",m.length,")"),m.length>20&&a.createElement(h,{onClick:()=>l(!i)},i?"Less":"More"),d.map((e=>a.createElement(f,{key:s()(e.fieldValue)},a.createElement("span",null,a.createElement(g,{to:"/tags/"+s()(e.fieldValue)+"/"},e.fieldValue," ",a.createElement(u,null,"(",e.totalCount,")"))))))))},x=o(4839),k=o(5928);const _=d.default.div.withConfig({displayName:"pages__PostCount",componentId:"sc-1p0quar-0"})(["font-size:15px;color:",";font-weight:bold;margin-left:10px;padding-top:30px;"],(e=>e.theme.tag.text)),w=d.default.div.withConfig({displayName:"pages__Line",componentId:"sc-1p0quar-1"})(["margin-bottom:10px;"]);var b=e=>{let{data:t,location:o}=e;const r=t.site.siteMetadata.description,s=t.site.siteMetadata.author,m=t.site.siteMetadata.siteUrl,d=t.site.siteMetadata.keywords,c=t.site.siteMetadata.title,p=k.siteMetadata.socialLinks,f=t.allMarkdownRemark.nodes,g=f.filter((e=>!e.frontmatter.isPrivate)),u=t.allMarkdownRemark.group,h=t.allMarkdownRemark.group.filter((e=>e.nodes.some((e=>!e.frontmatter.isPrivate)))).map((e=>({...e,totalCount:e.nodes.filter((e=>!e.frontmatter.isPrivate)).length}))),b=u.length-h.reduce(((e,t)=>e+t.totalCount),0);return a.createElement(n.Z,null,a.createElement(x.Z,{title:c,description:r}),a.createElement(l.Z,{author:s,description:r,siteUrl:m,keywords:d,socialLinks:p}),a.createElement(w,null),a.createElement(y,{tags:h,allCount:b}),a.createElement(_,null,"All Posts (",g.length,")"),a.createElement(i.Z,{posts:f}))}}}]);
//# sourceMappingURL=component---src-pages-index-jsx-3d01fb3e5c08384bc382.js.map