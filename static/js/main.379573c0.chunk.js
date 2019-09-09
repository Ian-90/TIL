(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{27:function(e,t,n){e.exports=n.p+"static/media/noPosterSmall.6df993a6.png"},41:function(e,t,n){e.exports=n(77)},77:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(18),l=n.n(i),o=n(7),u=n(8),c=n(10),s=n(9),p=n(11),d=n(16),m=n(15),f=n(4),g=n.n(f),v=n(14),h=n(2),b=n(1);function E(){var e=Object(h.a)(["\n  margin-top: 25px;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, 125px);\n  grid-gap: 25px\n"]);return E=function(){return e},e}function x(){var e=Object(h.a)(["\n  font-size: 14px;\n  font-weight: 600;\n"]);return x=function(){return e},e}function y(){var e=Object(h.a)(["\n  :not(:last-child) {\n    margin-bottom: 50px;\n  }\n"]);return y=function(){return e},e}var _=b.default.div(y()),j=b.default.span(x()),O=b.default.div(E()),w=function(e){var t=e.title,n=e.children;return r.a.createElement(_,null,r.a.createElement(j,null,t),r.a.createElement(O,null,n))};function k(){var e=Object(h.a)(["\n  height: 100vh;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  font-size: 28px;\n  margin-top: 20px;\n"]);return k=function(){return e},e}var S=b.default.div(k()),T=function(){return r.a.createElement(S,null,r.a.createElement("span",{role:"img","aria-label":"Loading"},"\u23f0"))},R=n(13),U=n.n(R);function M(){var e=Object(h.a)(["\n  color: ",";\n  font-weight: 600;\n"]);return M=function(){return e},e}function z(){var e=Object(h.a)(["\n  width: 100vw;\n  display: flex;\n  justify-contents: center;\n"]);return z=function(){return e},e}var C=b.default.div(z()),P=b.default.span(M(),function(e){return e.color}),N=function(e){var t=e.text,n=e.color;return r.a.createElement(C,null,r.a.createElement(P,{color:n},t))};N.propTypeds={text:U.a.string.isRequired,color:U.a.string.isRequired};var I=N;function D(){var e=Object(h.a)(["\n  font-size: 12px;\n  color: rgba(255, 255, 255, 0.5);\n"]);return D=function(){return e},e}function F(){var e=Object(h.a)(["\n  display: block;\n  margin-bottom: 3px;\n"]);return F=function(){return e},e}function V(){var e=Object(h.a)(["\n  margin-bottom: 5px;\n  position: relative;\n  &:hover {\n    "," {\n      opacity: 0.3;\n    }\n\n    "," {\n      opacity: 1;\n    }\n  }\n"]);return V=function(){return e},e}function q(){var e=Object(h.a)(["\n  bottom: 5px;\n  right: 4px;\n  position: absolute;\n  opacity: 0;\n  transition: opacity 0.1s linear;\n"]);return q=function(){return e},e}function A(){var e=Object(h.a)(["\n  background-image: url(",");\n  height: 180px;\n  background-size: cover;\n  border-radius: 4px;\n  background-position: center center;\n  transition: opacity 0.1s linear;\n"]);return A=function(){return e},e}function B(){var e=Object(h.a)(["\n  font-size: 12px;\n"]);return B=function(){return e},e}var L=b.default.div(B()),J=b.default.div(A(),function(e){return e.bgUrl}),G=b.default.span(q()),H=b.default.div(V(),J,G),K=b.default.span(F()),Q=b.default.span(D()),W=function(e){var t=e.id,a=e.imageUrl,i=e.title,l=e.rating,o=e.year,u=e.isMovie,c=void 0!==u&&u;return r.a.createElement(d.b,{to:c?"/movie/".concat(t):"/show/".concat(t)},r.a.createElement(L,null,r.a.createElement(H,null,r.a.createElement(J,{bgUrl:a?"https://image.tmdb.org/t/p/w300".concat(a):n(27)}),r.a.createElement(G,null,r.a.createElement("span",{role:"img","aria-label":"rating"},"\u2b50\ufe0f"),l,"/10")),r.a.createElement(K,null,i.length>15?"".concat(i.substring(0,15),"..."):i),r.a.createElement(Q,null,o)))},X=n(12),Y=n.n(X);function Z(){var e=Object(h.a)(["\n  padding: 20px;\n"]);return Z=function(){return e},e}var $=b.default.div(Z()),ee=function(e){var t=e.nowPlaying,n=e.upcoming,a=e.popular,i=e.error,l=e.loading;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.a,null,r.a.createElement("title",null,"Movies | Nomflix")),l?r.a.createElement(T,null):r.a.createElement($,null,r.a.createElement(Y.a,null,r.a.createElement("title",null,"Movies | Nomflix")),t&&t.length>0&&r.a.createElement(w,{title:"Now Playing"},t.map(function(e){return r.a.createElement(W,{key:e.id,id:e.id,title:e.original_title,imageUrl:e.poster_path,rating:e.vote_average,isMovie:!0,year:e.release_date&&e.release_date.substring(0,4)})})),n&&n.length>0&&r.a.createElement(w,{title:"Upcoming Playing"},n.map(function(e){return r.a.createElement(W,{key:e.id,id:e.id,title:e.original_title,imageUrl:e.poster_path,rating:e.vote_average,isMovie:!0,year:e.release_date&&e.release_date.substring(0,4)})})),a&&a.length>0&&r.a.createElement(w,{title:"Popular Movies"},a.map(function(e){return r.a.createElement(W,{key:e.id,id:e.id,title:e.original_title,imageUrl:e.poster_path,rating:e.vote_average,isMovie:!0,year:e.release_date&&e.release_date.substring(0,4)})})),i&&r.a.createElement(I,{color:"#e74c3c",text:i})))},te=n(38),ne=n.n(te).a.create({baseURL:"https://api.themoviedb.org/3/",params:{api_key:"26403128335c2c217bfab9e6c08b88d9",language:"en-US"}}),ae={nowPlaying:function(){return ne.get("movie/now_playing")},upcoming:function(){return ne.get("movie/upcoming")},popular:function(){return ne.get("movie/popular")},movieDetail:function(e){return ne.get("movie/".concat(e),{params:{append_to_response:"videos"}})},search:function(e){return ne.get("search/movie",{params:{query:encodeURIComponent(e)}})}},re={topRated:function(){return ne.get("tv/top_rated")},popular:function(){return ne.get("tv/popular")},airingToday:function(){return ne.get("tv/airing_today")},showDetail:function(e){return ne.get("tv/".concat(e),{params:{append_to_response:"videos"}})},search:function(e){return ne.get("search/tv",{params:{query:encodeURIComponent(e)}})}},ie=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={nowPlaying:null,upcoming:null,popular:null,error:null,loading:!0},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=Object(v.a)(g.a.mark(function e(){var t,n,a,r,i,l;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ae.nowPlaying();case 3:return t=e.sent,n=t.data.results,e.next=7,ae.upcoming();case 7:return a=e.sent,r=a.data.results,e.next=11,ae.popular();case 11:i=e.sent,l=i.data.results,this.setState({nowPlaying:n,upcoming:r,popular:l}),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),this.setState({error:"Can't find movies information."});case 19:return e.prev=19,this.setState({loading:!1}),e.finish(19);case 22:case"end":return e.stop()}},e,this,[[0,16,19,22]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.nowPlaying,n=e.upcoming,a=e.popular,i=e.error,l=e.loading;return r.a.createElement(ee,{nowPlaying:t,upcoming:n,popular:a,error:i,loading:l})}}]),t}(r.a.Component);function le(){var e=Object(h.a)(["\n  padding: 20px;\n"]);return le=function(){return e},e}var oe=b.default.div(le()),ue=function(e){var t=e.topRated,n=e.popular,a=e.airingToday,i=e.error,l=e.loading;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.a,null,r.a.createElement("title",null,"TV Shows | Nomflix")),l?r.a.createElement(T,null):r.a.createElement(oe,null,t&&t.length>0&&r.a.createElement(w,{title:"Top Rated Shows"},t.map(function(e){return r.a.createElement(W,{key:e.id,id:e.id,title:e.original_name,imageUrl:e.poster_path,rating:e.vote_average,year:e.first_air_date&&e.first_air_date.substring(0,4)})})),n&&n.length>0&&r.a.createElement(w,{title:"Popular Shows"},n.map(function(e){return r.a.createElement(W,{key:e.id,id:e.id,title:e.original_name,imageUrl:e.poster_path,rating:e.vote_average,year:e.first_air_date&&e.first_air_date.substring(0,4)})})),a&&a.length>0&&r.a.createElement(w,{title:"Airing Today"},a.map(function(e){return r.a.createElement(W,{key:e.id,id:e.id,title:e.original_name,imageUrl:e.poster_path,rating:e.vote_average,year:e.first_air_date&&e.first_air_date.substring(0,4)})})),i&&r.a.createElement(I,{color:"#e74c3c",text:i})))},ce=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={topRated:null,popular:null,airingToday:null,error:null,loading:!0},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=Object(v.a)(g.a.mark(function e(){var t,n,a,r,i,l;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,re.topRated();case 3:return t=e.sent,n=t.data.results,e.next=7,re.popular();case 7:return a=e.sent,r=a.data.results,e.next=11,re.airingToday();case 11:i=e.sent,l=i.data.results,this.setState({topRated:n,popular:r,airingToday:l}),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),this.setState({error:"Can't find TV information."});case 19:return e.prev=19,this.setState({loading:!1}),e.finish(19);case 22:case"end":return e.stop()}},e,this,[[0,16,19,22]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.topRated,n=e.popular,a=e.airingToday,i=e.error,l=e.loading;return r.a.createElement(ue,{topRated:t,popular:n,airingToday:a,error:i,loading:l})}}]),t}(r.a.Component);function se(){var e=Object(h.a)(["\n  all: unset;\n  font-size: 28px;\n  width: 100%;\n"]);return se=function(){return e},e}function pe(){var e=Object(h.a)(["\n  margin-bottom: 50px;\n  width: 100%;\n  "]);return pe=function(){return e},e}function de(){var e=Object(h.a)(["\n  padding: 0px 20px;\n"]);return de=function(){return e},e}var me=b.default.div(de()),fe=b.default.form(pe()),ge=b.default.input(se()),ve=function(e){var t=e.movieResults,n=e.tvResults,a=e.searchTerm,i=e.handleSubmit,l=e.updateTerm,o=e.error,u=e.loading;return r.a.createElement(me,null,r.a.createElement(Y.a,null,r.a.createElement("title",null,"Search | Nomflix")),r.a.createElement(fe,{onSubmit:i},r.a.createElement(ge,{placeholder:"Search Movies or TV Shows...",value:a,onChange:l})),u?r.a.createElement(T,null):r.a.createElement(r.a.Fragment,null,t&&t.length>0&&r.a.createElement(w,{title:"Movie Results"},t.map(function(e){return r.a.createElement(W,{key:e.id,id:e.id,title:e.original_title,imageUrl:e.poster_path,rating:e.vote_average,isMovie:!0,year:e.release_date&&e.release_date.substring(0,4)})})),n&&n.length>0&&r.a.createElement(w,{title:"TV Shows Results"},n.map(function(e){return r.a.createElement(W,{key:e.id,id:e.id,title:e.original_name,imageUrl:e.poster_path,rating:e.vote_average,year:e.first_air_date&&e.first_air_date.substring(0,4)})})),o&&r.a.createElement(I,{color:"#e74c3c",text:o}),n&&t&&0===n.length&&0===t.length&&r.a.createElement(I,{text:"Noting found",color:"#95a6a5"})))},he=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={movieResults:null,tvResults:null,searchTerm:"",error:null,loading:!1},n.handleSubmit=function(e){e.preventDefault(),""!==n.state.searchTerm&&n.searchByTerm()},n.updateTerm=function(e){var t=e.target.value;n.setState({searchTerm:t})},n.searchByTerm=Object(v.a)(g.a.mark(function e(){var t,a,r,i,l;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state.searchTerm,n.setState({loading:!0}),e.prev=2,e.next=5,ae.search(t);case 5:return a=e.sent,r=a.data.results,e.next=9,re.search(t);case 9:i=e.sent,l=i.data.results,n.setState({movieResults:r,tvResults:l}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(2),n.setState({error:"Can't find results."});case 17:return e.prev=17,n.setState({loading:!1}),e.finish(17);case 20:case"end":return e.stop()}},e,null,[[2,14,17,20]])})),n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state,t=e.movieResults,n=e.tvResults,a=e.searchTerm,i=e.error,l=e.loading;return r.a.createElement(ve,{movieResults:t,tvResults:n,searchTerm:a,error:i,loading:l,handleSubmit:this.handleSubmit,updateTerm:this.updateTerm})}}]),t}(r.a.Component);function be(){var e=Object(h.a)(["\n  font-size: 12px;\n  opacity: 0.7;\n  line-height: 1.5;\n  width: 50%;\n"]);return be=function(){return e},e}function Ee(){var e=Object(h.a)(["\n  margin: 0 10px;\n"]);return Ee=function(){return e},e}function xe(){var e=Object(h.a)([""]);return xe=function(){return e},e}function ye(){var e=Object(h.a)(["\n  margin: 20px 0;\n"]);return ye=function(){return e},e}function _e(){var e=Object(h.a)(["\n  font-size: 32px;\n"]);return _e=function(){return e},e}function je(){var e=Object(h.a)(["\n  width: 70%;\n  margin-left: 10px;\n"]);return je=function(){return e},e}function Oe(){var e=Object(h.a)(["\n  width: 30%;\n  background-image: url(",");\n  background-position: center center;\n  background-size: cover;\n  height: 100%;\n  border-radius: 5px;\n"]);return Oe=function(){return e},e}function we(){var e=Object(h.a)(["\n  display: flex;\n  width: 100%;\n  position: relative;\n  z-index: 1;\n  height: 100%;\n"]);return we=function(){return e},e}function ke(){var e=Object(h.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-image: url(",");\n  background-position: center center;\n  background-size: cover;\n  filter: blur(3px);\n  opacity: 0.5;\n  z-index: 0;\n"]);return ke=function(){return e},e}function Se(){var e=Object(h.a)(["\n  height: calc(100vh - 50px);\n  width: 100%;\n  position: relative;\n  padding: 50px;\n"]);return Se=function(){return e},e}var Te=b.default.div(Se()),Re=b.default.div(ke(),function(e){return e.bgImage}),Ue=b.default.div(we()),Me=b.default.div(Oe(),function(e){return e.bgImage}),ze=b.default.div(je()),Ce=b.default.h3(_e()),Pe=b.default.div(ye()),Ne=b.default.span(xe()),Ie=b.default.span(Ee()),De=b.default.p(be()),Fe=function(e){var t=e.result;e.error;return e.loading?r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.a,null,r.a.createElement("title",null,"Loading | Nomflix")),r.a.createElement(T,null)):r.a.createElement(Te,null,r.a.createElement(Y.a,null,r.a.createElement("title",null,t.original_title?t.original_title:t.original_name," "," | Nomflix")),r.a.createElement(Re,{bgImage:"https://image.tmdb.org/t/p/original".concat(t.backdrop_path)}),r.a.createElement(Ue,null,r.a.createElement(Me,{bgImage:t.poster_path?"https://image.tmdb.org/t/p/original".concat(t.poster_path):n(27)}),r.a.createElement(ze,null,r.a.createElement(Ce,null,t.original_title?t.original_title:t.original_name),r.a.createElement(Pe,null,r.a.createElement(Ne,null,t.release_date?t.release_date.substring(0,4):t.first_air_date.substring(0,4)),r.a.createElement(Ie,null,"\u2219"),r.a.createElement(Ne,null,t.runtime?t.runtime:t.episode_run_time[0]," min"),r.a.createElement(Ie,null,"\u2219"),r.a.createElement(Ne,null,t.genres&&t.genres.map(function(e,n){return n===t.genres.length-1?e.name:"".concat(e.name," /")}))),r.a.createElement(De,null,t.overview))))},Ve=function(e){function t(e){var n;Object(o.a)(this,t),n=Object(c.a)(this,Object(s.a)(t).call(this,e));var a=e.location.pathname;return n.state={result:null,error:null,loading:!0,isMovie:a.includes("/movie/")},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=Object(v.a)(g.a.mark(function e(){var t,n,a,r,i,l,o,u;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.props,n=t.match.params.id,a=t.history.push,r=this.state.isMovie,i=parseInt(n),!isNaN(i)){e.next=5;break}return e.abrupt("return",a("/"));case 5:if(l=null,e.prev=6,!r){e.next=14;break}return e.next=10,ae.movieDetail(i);case 10:o=e.sent,l=o.data,e.next=18;break;case 14:return e.next=16,re.showDetail(i);case 16:u=e.sent,l=u.data;case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(6),this.setState({error:"Can't find anything."});case 23:return e.prev=23,this.setState({loading:!1,result:l}),e.finish(23);case 26:case"end":return e.stop()}},e,this,[[6,20,23,26]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.result,n=e.error,a=e.loading;return r.a.createElement(Fe,{result:t,error:n,loading:a})}}]),t}(r.a.Component);function qe(){var e=Object(h.a)(["\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justfy-content: center;\n"]);return qe=function(){return e},e}function Ae(){var e=Object(h.a)(["\n  width: 80px;\n  height: 50px;\n  text-align: center;\n  border-bottom: 3px solid ",";\n  transiton: border-bottom 0.5s ease-in-out\n"]);return Ae=function(){return e},e}function Be(){var e=Object(h.a)(["\n  display: flex;\n"]);return Be=function(){return e},e}function Le(){var e=Object(h.a)(["\n  color: white;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  background-color: rgba(20, 20, 20, 0.8);\n  z-index: 10;\n  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);\n"]);return Le=function(){return e},e}var Je=b.default.header(Le()),Ge=b.default.ul(Be()),He=b.default.li(Ae(),function(e){return e.current?"#3498db":"transparent"}),Ke=Object(b.default)(d.b)(qe()),Qe=Object(m.f)(function(e){var t=e.location.pathname;return r.a.createElement(Je,null,r.a.createElement(Ge,null,r.a.createElement(He,{current:"/"===t},r.a.createElement(Ke,{to:"/"},"Movies")),r.a.createElement(He,{current:"/tv"===t},r.a.createElement(Ke,{to:"/tv"},"TV")),r.a.createElement(He,{current:"/search"===t},r.a.createElement(Ke,{to:"/search"},"Search"))))}),We=function(){return r.a.createElement(d.a,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(Qe,null),r.a.createElement(m.d,null,r.a.createElement(m.b,{exact:!0,path:"/",component:ie}),r.a.createElement(m.b,{path:"/tv",exact:!0,component:ce}),r.a.createElement(m.b,{path:"/search",exact:!0,component:he}),r.a.createElement(m.b,{path:"/movie/:id",component:Ve}),r.a.createElement(m.b,{path:"/show/:id",component:Ve}),r.a.createElement(m.a,{from:"*",to:"/"}))))},Xe=n(39),Ye=n.n(Xe);function Ze(){var e=Object(h.a)(["\n  ","\n  a {\n    text-decoration: none;\n    color:inherit;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  body {\n    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n    font-size: 12px;\n    background-color: rgba(20, 20, 20, 1);\n    color: white;\n    padding-top: 50px;\n  }\n"]);return Ze=function(){return e},e}var $e=Object(b.createGlobalStyle)(Ze(),Ye.a),et=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(We,null),r.a.createElement($e,null))}}]),t}(a.Component);l.a.render(r.a.createElement(et,null),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.379573c0.chunk.js.map