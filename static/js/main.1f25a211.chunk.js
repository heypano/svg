(this.webpackJsonpsvg=this.webpackJsonpsvg||[]).push([[0],{28:function(e,t,n){e.exports=n(40)},33:function(e,t,n){},34:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(22),o=n.n(r),i=(n(33),n(14)),l=n(7),u=n(8),s=n(9),m=n(10);function v(){return Math.floor(Math.random()*Math.floor(256))}var d=100,h="3px",f=function(e){Object(m.a)(n,e);var t=Object(s.a)(n);function n(e){return Object(l.a)(this,n),t.call(this,e)}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=document.getElementById("circle"),t=document.getElementById("circleg"),n=!0;function c(c){if(e){var a,r=c.clientX,o=c.clientY,i=void 0!==r?r:c.touches[0].clientX,l=void 0!==o?o:c.touches[0].clientY,u=function(e,t){var n=360*e/window.innerWidth,c="".concat(100*t/window.innerHeight,"%");return"hsl(".concat(n,", ").concat("50%",", ").concat(c,")")}(i,l),s=+e.getAttribute("r"),m=s/d,v=m+.005,h=m-.005;n&&v>2?n=!1:!n&&h<1&&(n=!0),a=n?v:h,e.setAttribute("cx",i),e.setAttribute("cy",l),console.log(m,s,a),e.setAttribute("r",a*d),t.setAttribute("fill",u)}}window.addEventListener("mousemove",c),window.addEventListener("touchmove",c)}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"svg-container"},a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1"},a.a.createElement("g",{stroke:"black",fill:"hotpink",strokeWidth:h,strokeLinecap:"round",strokeLinejoin:"round",id:"circleg"},a.a.createElement("circle",Object(i.a)({r:100,id:"circleee",cx:0,cy:0},"id","circle"))))))}}]),n}(a.a.Component),g=n(11),E=.5,w="10",p="3px",b=function(e){var t=Object(c.useRef)(null),n=Object(c.useState)(w),r=Object(g.a)(n,2),o=r[0],i=r[1],l=Object(c.useState)(window.innerWidth),u=Object(g.a)(l,2),s=u[0],m=u[1],v=Object(c.useState)(window.innerHeight),d=Object(g.a)(v,2),h=d[0],f=d[1],b=Math.min(s,h)*E,O=function(e,t,n){var c=function(e,t,n){for(var c=[],a=1;a<=e;a++){var r=j(a,e,t,n);c.push(r)}return c}(e,t,n),r=[];for(;c.length;)for(var o=c.pop(),i=Object(g.a)(o,2),l=i[0],u=i[1],s=0;s<c.length;s++){var m=Object(g.a)(c[s],2),v=m[0],d=m[1];r.push(a.a.createElement("line",{onClick:k,x1:l,y1:u,x2:v,y2:d,key:"(".concat(l,",").concat(u,") to (").concat(v,",").concat(d,")")}))}return r}(o,b,b*E*2+10);return Object(c.useEffect)((function(){function e(){m(t.current.width.baseVal.value-20),f(t.current.height.baseVal.value-20)}window.addEventListener("resize",e),setTimeout(e,0)})),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"controls"},a.a.createElement("label",null,"How many points?"),a.a.createElement("input",{type:"number",onChange:function(e){return i(e.target.value)},defaultValue:w,min:3,max:65})),a.a.createElement("div",{className:"svg-container"},a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",ref:t},a.a.createElement("g",{stroke:"black",fill:"none",strokeWidth:p,strokeLinecap:"round",strokeLinejoin:"round"},O))))};function k(e){e.target.style.stroke=function(){var e=v(),t=v(),n=v();return"rgb(".concat(e,",").concat(t,",").concat(n,")")}()}function j(e,t,n,c){var a=Math.PI/t*2;return[n*Math.cos(e*a)+c,n*Math.sin(e*a)+c]}var O=n(24),y=n(5),x=1,M=function(e,t){var n=e-35,c=t,a=Math.round(21),r=Math.round(16),o=Math.round(11);return"M ".concat(n," ").concat(c,"\n          a ").concat(a,",").concat(a," 1 0,0 0,40\n          h 50\n          a ").concat(a,",").concat(a," 1 0,0 0,-40\n          a ").concat(o,",").concat(o," 1 0,0 -15,-10\n          a ").concat(r,",").concat(r," 1 0,0 -35,10\n          z")},C=function(e){Object(m.a)(n,e);var t=Object(s.a)(n);function n(e){return Object(l.a)(this,n),t.call(this,e)}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=document.getElementById("cloud-path"),t=document.getElementById("svg-element");t.setAttribute("viewBox","0 0 ".concat(100*x," ").concat(100*x));var n=function(t){if(e){var n=t.clientX,c=t.clientY,a=void 0!==n?n:t.touches[0].clientX,r=void 0!==c?c:t.touches[0].clientY;e.setAttribute("d",M(a,r))}};window.addEventListener("mousemove",n),window.addEventListener("touchmove",n),window.addEventListener("click",(function(n){if(e){x=+(.1+x).toFixed(1);var c=n.clientX,a=n.clientY;void 0!==c||n.touches[0].clientX,void 0!==a||n.touches[0].clientY;t.setAttribute("viewBox","0 0 ".concat(100*x," ").concat(100*x))}}))}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"svg-container"},a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",fill:"aliceblue",stroke:"black",id:"svg-element"},a.a.createElement("g",{width:"100%",height:"100%"},a.a.createElement("path",{d:M(0,0),id:"cloud-path"})))))}}]),n}(a.a.Component),L=(n(34),n(27)),N=n(23),S=n(15),B=function(e){var t=e.className;return a.a.createElement("path",{clipRule:"evenodd",className:t,d:"M54.2,141c-8.6,29.7-34.3,29.5-19.8,79.5c4.2,14.3,13,26.5,24.7,35.6c2.7,2.1,36.4,21.9,37.7,18.4 c-10.2,26.6-13.6,56.9-11.1,85.3c2.6,29.6-4.5,56.6-11.9,85.2c-0.9,3.5-1.7,7.5,0.2,10.5c1.4,2.3,4.1,3.6,6.6,4.5 c6.7,2.4,13.9,3.4,20.9,2.9c3.9-0.3,7.9-1,11-3.4c2.8-2.2,4.5-5.4,6.1-8.6c8-16.3,13.8-33.6,17.3-51.4c16.9-2.6,33.8-5.3,50.8-7.9 c0.7-0.1,1.4-0.2,2,0.1c0.9,0.5,1.2,1.7,1.3,2.7c3.2,24.1,7.2,48,10,72c14.8-0.2,29.6-4.7,41.8-13c-2.8-10.6-5.5-21.3-8.3-31.9 c-0.6-2.3-1.2-4.9,0-7c1-1.8,3.1-2.6,5.1-3.3c12.2-4.4,25-7.3,38-8.7c3.1,18.6,6.2,37.1,9.3,55.7c0.2,1.5,0.6,3.1,1.8,4 c1.3,0.9,3,0.8,4.6,0.5c9.3-1.4,18.5-2.7,27.8-4.1c1.4-0.2,2.8-0.4,3.8-1.4c1.1-1,1.4-2.7,1.6-4.2c1.8-15.1,0.5-30.6-3.8-45.2 c12.3-5,25.2-8.7,38.2-11c3.5,19,5.3,38.3,5.4,57.6c7.4-1.1,14.7-2.3,22.1-3.4c1.4-0.2,2.8-0.5,4-1.2c1.6-1.1,2.5-3,3.2-4.9 c6.8-18.6,5.8-38.8,1.9-57.9c-3-14.8-13.1-33.1-11.2-48.2c0.8-6.2,3-12.1,4.7-18.1c2.9-10.6,4.1-21.6,6.3-32.3 c3.4-16.3,9.3-32.1,13-48.3c4.2-18.3,5.4-37.2,5.5-56c0.1-13.7-0.5-27.7-4.5-40.8c-4-13.1-11.9-25.5-23.7-32.6 c-11.8-7.1-27.7-7.9-38.9,0.1c-9.9,7.1-14.7,19.6-16,31.7c-4.5,39.2,19.6,75.5,28.9,113.8c2.6,10.6,4,22,0.7,32.5 c-19.2-11.8-33.8-29.3-54-40c-20.4-10.8-43.3-17-66.4-17.4c2.3-22.6,11.9-43.9,13.9-66.9c1.9-22.3-0.3-45.5-10.6-65.7 c-16.4-32.4-52.6,50-52.6,50s-33.6-28.7-70.5-34.3c-3.5-0.5-19-51.9-19-51.9S66.1,99.6,54.2,141z M163.9,175.7c-28.7-15.3-54.1,33.7-24.6,40.3C169.1,222.8,180.5,184.6,163.9,175.7z M102.7,144c-22.3-9.4-48.5,21.3-29.9,35.8C91.5,194.4,122.1,152.2,102.7,144z"})},A=function(e){Object(m.a)(n,e);var t=Object(s.a)(n);function n(e){var c;return Object(l.a)(this,n),(c=t.call(this,e)).state={rectangles:[]},c.groupRef=a.a.createRef(),c.onSvgClick=c.onSvgClick.bind(Object(S.a)(c)),c}return Object(u.a)(n,[{key:"componentDidMount",value:function(){}},{key:"onSvgClick",value:function(e){this.groupRef.current;var t=e.nativeEvent.offsetX,n=e.nativeEvent.offsetY;this.setState(Object(N.a)({},this.state,{rectangles:[].concat(Object(L.a)(this.state.rectangles),[{x:t,y:n}])})),console.log(this.state.rectangles)}},{key:"render",value:function(){return a.a.createElement("svg",{onClick:this.onSvgClick,version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 514.6 516.4",style:{}},a.a.createElement("clipPath",{id:"cat"},a.a.createElement(B,null)),a.a.createElement("g",{clipPath:"url(#cat)",width:"100%",height:"100%",ref:this.groupRef},this.state.rectangles.map((function(e,t){return a.a.createElement("rect",{x:e.x,y:e.y,width:"100",height:"100",key:t,fill:"red"})})),a.a.createElement(B,{className:"catOutline"})))}}]),n}(a.a.Component),R=function(e){Object(c.useRef)(null);return Object(c.useEffect)((function(){})),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"svg-container"},a.a.createElement(A,null)))};var X=function(){return a.a.createElement(O.a,null,a.a.createElement("div",{className:"app"},a.a.createElement(y.c,null,a.a.createElement(y.a,{exact:!0,path:"/",render:function(){return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"row"},a.a.createElement(f,null),a.a.createElement(b,null)))}}),a.a.createElement(y.a,{exact:!0,path:"/circle",component:b}),a.a.createElement(y.a,{exact:!0,path:"/wrong",component:f}),a.a.createElement(y.a,{exact:!0,path:"/cloud",component:C}),a.a.createElement(y.a,{exact:!0,path:"/cat",component:R}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.1f25a211.chunk.js.map