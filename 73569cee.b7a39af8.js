(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{68:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return a})),n.d(r,"metadata",(function(){return i})),n.d(r,"rightToc",(function(){return s})),n.d(r,"default",(function(){return c}));var t=n(2),o=(n(0),n(89));const a={id:"introducing-wrappers",title:"Introducing Resolver Wrappers"},i={unversionedId:"resolver/introducing-wrappers",id:"resolver/introducing-wrappers",isDocsHomePage:!1,title:"Introducing Resolver Wrappers",description:"A Resolver Wrapper in its most basic form is a function that receives a Resolver function and returns a Resolver function. The returned Resolver function wraps the original and allows the result to be extracted and conditionally extended.",source:"@site/docs/resolver/introducing-wrappers.md",slug:"/resolver/introducing-wrappers",permalink:"/docs/resolver/introducing-wrappers",version:"current",sidebar:"docs",previous:{title:"Using Resolvers",permalink:"/docs/resolver/using-resolvers"},next:{title:"Applying Wrappers",permalink:"/docs/resolver/applying-wrappers"}},s=[],l={rightToc:s};function c({components:e,...r}){return Object(o.b)("wrapper",Object(t.a)({},l,r,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"A Resolver Wrapper in its most basic form is a function that receives a Resolver function and returns a Resolver function. The returned Resolver function wraps the original and allows the result to be extracted and conditionally extended."),Object(o.b)("p",null,"Essentially, a Resolver Wrapper looks like:"),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-javascript"}),"function (originalResolver, wrapperOptions) {\n  return async function (parent, args, context, info) {\n    console.log('Inside the wrapper resolver');\n\n    // Awaiting the result of the original using the parameters\n    // passed in from the wrapped resolver\n    const result = await originalResolver(parent, args, context, info);\n\n    console.log(\"Returning original resolver result\", result);\n    return result;\n  }\n}\n")),Object(o.b)("p",null,"The returned Resolver still receives the arguments, can manipulate them, and has access to the original resolver and its result while ultimately controlling what gets returned."),Object(o.b)("p",null,"Resolver Wrappers help keep Resolver functions lean, letting them focusing on resolving data, while using the Wrappers to extend and add common functionality. What also increases the flexibility of Resolver Wrappers is how they can be applied to specific Resolvers using the ",Object(o.b)("em",{parentName:"p"},"Highlight")," system using ",Object(o.b)("inlineCode",{parentName:"p"},"embed"),"."),Object(o.b)("p",null,"Resolver Wrappers can be used to introspect Resolvers at query time, add Authentication, conventional results filtering, add conditional responses and error scenarios, and much more. See the ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/resolver/available-wrappers"}),"Available Resolver Wrappers"),", how to ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/resolver/applying-wrappers"}),"Apply Resolver Wrappers"),", or look into the tools provided for ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"/docs/resolver/creating-wrappers"}),"Creating Custom Wrappers"),"."))}c.isMDXComponent=!0},89:function(e,r,n){"use strict";n.d(r,"a",(function(){return u})),n.d(r,"b",(function(){return v}));var t=n(0),o=n.n(t);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function i(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function s(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?i(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function l(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),p=function(e){var r=o.a.useContext(c),n=r;return e&&(n="function"==typeof e?e(r):s(s({},r),e)),n},u=function(e){var r=p(e.components);return o.a.createElement(c.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},f=o.a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,a=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),f=t,v=u["".concat(i,".").concat(f)]||u[f]||d[f]||a;return n?o.a.createElement(v,s(s({ref:r},c),{},{components:n})):o.a.createElement(v,s({ref:r},c))}));function v(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var a=n.length,i=new Array(a);i[0]=f;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s.mdxType="string"==typeof e?e:t,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);