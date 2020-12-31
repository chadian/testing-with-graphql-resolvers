(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{76:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return o})),t.d(r,"metadata",(function(){return s})),t.d(r,"rightToc",(function(){return l})),t.d(r,"default",(function(){return p}));var n=t(2),a=(t(0),t(89));const o={title:"Using Resolver Maps"},s={unversionedId:"resolver-map/using-resolver-maps",id:"resolver-map/using-resolver-maps",isDocsHomePage:!1,title:"Using Resolver Maps",description:"After learning how to use Resolvers to resolve data all that is left to organize them",source:"@site/docs/resolver-map/using-resolver-maps.md",slug:"/resolver-map/using-resolver-maps",permalink:"/docs/resolver-map/using-resolver-maps",version:"current",sidebar:"docs",previous:{title:"Creating Custom Wrappers",permalink:"/docs/resolver/creating-wrappers"},next:{title:"Introducing Resolver Map Middlewares",permalink:"/docs/resolver-map/introducing-middlewares"}},l=[{value:"Modifying the Resolver Map Surface Area",id:"modifying-the-resolver-map-surface-area",children:[]},{value:"Additional Resources",id:"additional-resources",children:[]}],i={rightToc:l};function p({components:e,...r}){return Object(a.b)("wrapper",Object(n.a)({},i,r,{components:e,mdxType:"MDXLayout"}),Object(a.b)("p",null,"After learning ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/resolver/using-resolvers"}),"how to use Resolvers")," to resolve data all that is left to organize them\nfor query execution. Resolver Maps help define the GraphQL API by ",Object(a.b)("em",{parentName:"p"},"mapping")," Resolvers to the appropriate field (or\nAbstract Type in the case of Type Resolvers). The idea of Resolver Maps has been covered by\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.apollographql.com/docs/tutorial/resolvers/#add-resolvers-to-apollo-server"}),"Apollo")," and\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.graphql-tools.com/docs/resolvers/#resolver-map"}),"graphql-tools"),". With the Resolver Map format it is easier\nto see how Resolvers are applied to a GraphQLSchema and executed with a GraphQL handler."),Object(a.b)("p",null,"Here is an example of a mapping between a GraphQL Schema and Resolvers via a Resolver Map."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"GraphQL Schema")),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-graphql"}),"schema {\n  query: Query\n}\n\ntype Query {\n  media: [Media!]!\n}\n\nunion Media = Movie | TV;\n\ntype Movie {\n  title: String!\n  director: String!\n}\n\ntype Tv {\n  title: String!\n  network: String!\n}\n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Resolver Map")),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),'const resolverMap = {\n  Query: {\n    movies: queryMoviesFieldResolver,\n  },\n\n  Movie: {\n    title: movieTitleFieldResolver,\n    director: movieDirectorFieldResolver,\n  },\n\n  Tv: {\n    title: tvTitleFieldResolver,\n    network: tvNetworkFieldResolver,\n  },\n\n  // Media is represented by the "Media" Union Type (an abstract type)\n  Media: {\n    // This is a special case for resolving Abstract Types (Union and Interfaces)\n    // Providing the `__resolveType` key to specify the the Type Type Resolver\n    __resolveType: mediaAbstractTypeResolver,\n  },\n};\n')),Object(a.b)("p",null,"The first level within a ",Object(a.b)("inlineCode",{parentName:"p"},"resolverMap")," object represents the GraphQL Type which has a value of an object. This next\nlevel object refers the field name referencing a ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"docs/resolver/using-resolvers#field-resolvers"}),"Field Resolver")," or in\nthe case that the type is an Abstract type (Union or Interface) the key is ",Object(a.b)("inlineCode",{parentName:"p"},"__resolveType")," and points to a\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/resolver/using-resolvers#type-resolvers"}),"Type Resolver"),". In this example the resolver functions are references to\nresolver functions would could be provided inline or imported from elsewhere."),Object(a.b)("p",null,'It should also be noted that "gaps" in a Resolver Map are covered by the\n',Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"docs/resolver/using-resolvers#default-field-resolver"}),"default field resolver")," or the\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"docs/resolver/using-resolvers#default-type-resolver"}),"default type resolver")," in the case of type resolvers for Unions\nand Interfaces."),Object(a.b)("h2",{id:"modifying-the-resolver-map-surface-area"},"Modifying the Resolver Map Surface Area"),Object(a.b)("p",null,"Resolver Maps have a direct impact on how Resolvers are organized and executed. If there was a way to make adaptive\nchanges to the Resolver Map, as a primitive, it would mean being able to swap and modify the Resolver Map surface area\nfor various mocking and test scenarios. These methods are covered by Resolver Map Middlewares and are part of the core\nconcepts of graphql-mocks and what creates"),Object(a.b)("h2",{id:"additional-resources"},"Additional Resources"),Object(a.b)("p",null,"The Apollo docs provide some\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.apollographql.com/docs/tutorial/resolvers/#add-resolvers-to-apollo-server"}),"great examples")," on Resovler\nMaps, Resolvers and the execution flow of GraphQL. Much of this documentation also applies in the goal of mocking\nGraphQL."))}p.isMDXComponent=!0},89:function(e,r,t){"use strict";t.d(r,"a",(function(){return d})),t.d(r,"b",(function(){return b}));var n=t(0),a=t.n(n);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=a.a.createContext({}),c=function(e){var r=a.a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},d=function(e){var r=c(e.components);return a.a.createElement(p.Provider,{value:r},e.children)},v={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},u=a.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(t),u=n,b=d["".concat(s,".").concat(u)]||d[u]||v[u]||o;return t?a.a.createElement(b,l(l({ref:r},p),{},{components:t})):a.a.createElement(b,l({ref:r},p))}));function b(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,s=new Array(o);s[0]=u;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,s[1]=l;for(var p=2;p<o;p++)s[p]=t[p];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);