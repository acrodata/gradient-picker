import{a as A,b as B,i as D}from"./chunk-AHM2AAEP.js";import{l as k,m as h,n as _,u as v}from"./chunk-I732KKQ4.js";import{$a as r,Fb as O,La as f,Pa as W,Xa as F,Ya as T,Za as I,_a as m,aa as C,ab as a,ba as b,bb as l,eb as S,gb as G,ib as N,ka as y,pb as V,qb as M,sb as o,vb as s,wa as g,wb as u,xb as c,zb as x}from"./chunk-L6BWDE6I.js";function z(i,p){if(i&1){let n=S();r(0,"gradient-picker",3),c("ngModelChange",function(d){C(n);let t=N();return u(t.value,d)||(t.value=d),b(d)}),a()}if(i&2){let n=N();s("ngModel",n.value)}}var w=class i{value=O("");isOpen=y(!1);toggleMenu(){this.isOpen.update(p=>!p)}closeMenu(){this.isOpen.set(!1)}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=f({type:i,selectors:[["app-gradient-dropdown"]],inputs:{value:[1,"value"]},outputs:{value:"valueChange"},decls:3,vars:4,consts:[["trigger","cdkOverlayOrigin"],["cdkOverlayOrigin","",3,"click"],["cdkConnectedOverlay","",3,"overlayOutsideClick","detach","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen"],[3,"ngModelChange","ngModel"]],template:function(n,e){if(n&1){let d=S();r(0,"button",1,0),G("click",function(){return C(d),b(e.toggleMenu())}),a(),W(2,z,1,1,"ng-template",2),G("overlayOutsideClick",function(){return C(d),b(e.closeMenu())})("detach",function(){return C(d),b(e.closeMenu())})}if(n&2){let d=V(1);M("background",e.value()),g(2),m("cdkConnectedOverlayOrigin",d)("cdkConnectedOverlayOpen",e.isOpen())}},dependencies:[v,h,_,D,B,A],styles:["button[_ngcontent-%COMP%]{width:64px;height:64px;padding:0;margin:8px;border:1px solid;cursor:pointer}button[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 3px #0090ed66}"]})};var U=()=>({updateOn:"blur"}),P=class i{value=O("");static \u0275fac=function(n){return new(n||i)};static \u0275cmp=f({type:i,selectors:[["app-gradient-input"]],inputs:{value:[1,"value"]},outputs:{value:"valueChange"},decls:2,vars:4,consts:[[3,"valueChange","value"],["type","text",3,"ngModelChange","ngModel","ngModelOptions"]],template:function(n,e){n&1&&(r(0,"app-gradient-dropdown",0),c("valueChange",function(t){return u(e.value,t)||(e.value=t),t}),a(),r(1,"input",1),c("ngModelChange",function(t){return u(e.value,t)||(e.value=t),t}),a()),n&2&&(s("value",e.value),g(),s("ngModel",e.value),m("ngModelOptions",x(3,U)))},dependencies:[v,k,h,_,w],styles:["[_nghost-%COMP%]{display:inline-flex;width:100%}[_nghost-%COMP%]     app-gradient-dropdown button{width:16px;height:16px;margin:0}input[_ngcontent-%COMP%]{width:100%;padding:0 4px;border:none;background:none;font-family:monospace}"]})};var q=()=>({updateOn:"blur"});function J(i,p){if(i&1&&l(0,"app-gradient-dropdown",5),i&2){let n=p.$implicit;m("value",n)}}var L=class i{gradient=y("linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)");gradients=["linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)","linear-gradient(0.5turn, #4285f4, #34a853, #fbbc05, #ea4335)","linear-gradient(45deg, #5fc9f8, #fecb2e, #fd9426, #fc3158, #147efb, #53d769)"];static \u0275fac=function(n){return new(n||i)};static \u0275cmp=f({type:i,selectors:[["app-home"]],decls:35,vars:6,consts:[[1,"jumbotron"],[1,"gradient-picker-wrapper"],[3,"ngModelChange","ngModel"],[1,"gradient-preview"],[1,"gradient-text",3,"ngModelChange","ngModel","ngModelOptions"],[3,"value"],["href","https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#syntax"],["value","linear-gradient(red)"],["value","linear-gradient(45deg, blue, red)"],["value","linear-gradient(to left top, blue, red)"],["value","linear-gradient(in oklab, blue, red)"],["value","linear-gradient(in hsl, blue, red)"],["value","linear-gradient(in hsl longer hue, blue, red)"],["value","linear-gradient(0deg, blue, green 40%, red)"],["value","linear-gradient(.25turn, red, 10%, blue)"],["value","linear-gradient(45deg, red 0 50%, blue 50% 100%)"]],template:function(n,e){n&1&&(r(0,"div",0)(1,"div",1)(2,"gradient-picker",2),c("ngModelChange",function(t){return u(e.gradient,t)||(e.gradient=t),t}),a()(),l(3,"div",3),r(4,"textarea",4),c("ngModelChange",function(t){return u(e.gradient,t)||(e.gradient=t),t}),a()(),r(5,"h2"),o(6,"Gradient picker in dropdown"),a(),r(7,"div"),T(8,J,1,1,"app-gradient-dropdown",5,F),a(),r(10,"h2"),o(11,"CSS gradient syntax"),a(),r(12,"a",6),o(13,"MDN"),a(),r(14,"pre")(15,"code"),o(16,`/* A gradient with a single color of red */
`),l(17,"app-gradient-input",7),o(18,`

/* A gradient tilted 45 degrees,
   starting blue and finishing red */
`),l(19,"app-gradient-input",8),o(20,`

/* A gradient going from the bottom right to the top left corner,
   starting blue and finishing red */
`),l(21,"app-gradient-input",9),o(22,`

/* Interpolation in rectangular color space */
`),l(23,"app-gradient-input",10),o(24,`

/* Interpolation in polar color space */
`),l(25,"app-gradient-input",11),o(26,`

/* Interpolation in polar color space
  with longer hue interpolation method */
`),l(27,"app-gradient-input",12),o(28,`

/* Color stop: A gradient going from the bottom to top,
   starting blue, turning green at 40% of its length,
   and finishing red */
`),l(29,"app-gradient-input",13),o(30,`

/* Color hint: A gradient going from the left to right,
   starting red, getting to the midpoint color
   10% of the way across the length of the gradient,
   taking the rest of the 90% of the length to change to blue */
`),l(31,"app-gradient-input",14),o(32,`

/* Multi-position color stop: A gradient tilted 45 degrees,
   with a red bottom-left half and a blue top-right half,
   with a hard line where the gradient changes from red to blue */
`),l(33,"app-gradient-input",15),o(34,`
`),a()()),n&2&&(g(2),s("ngModel",e.gradient),g(),M("background",e.gradient()),g(),s("ngModel",e.gradient),m("ngModelOptions",x(5,q)),g(4),I(e.gradients))},dependencies:[v,k,h,_,D,w,P],styles:['.jumbotron[_ngcontent-%COMP%]{display:grid;grid-template:"picker preview" 240px "picker textarea" auto/240px auto;gap:0 16px}@media not (min-width:600px){.jumbotron[_ngcontent-%COMP%]{grid-template:"preview" 240px "textarea" auto "picker" auto}}.gradient-picker-wrapper[_ngcontent-%COMP%]{grid-area:picker}.gradient-preview[_ngcontent-%COMP%]{grid-area:preview;border:1px solid;border-radius:8px 8px 0 0}.gradient-text[_ngcontent-%COMP%]{grid-area:textarea;padding:4px;margin:0;border:1px solid light-dark(rgba(0,0,0,.32),rgba(255,255,255,.32));border-radius:0 0 8px 8px;resize:vertical}.gradient-text[_ngcontent-%COMP%]:focus{outline:none;border-color:#0085f2;box-shadow:0 0 0 3px #0090ed66}pre[_ngcontent-%COMP%]{padding:16px;margin:16px 0 32px;background-color:light-dark(#f1f1f1,#2d2d2d);border-radius:8px;color:#858585;white-space:pre-wrap}.theme-btn[_ngcontent-%COMP%]{width:24px;height:24px;padding:0;vertical-align:middle}']})};export{L as Home};
