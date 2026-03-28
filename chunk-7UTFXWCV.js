import{a as A,b as B,i as k}from"./chunk-GMHKXTSC.js";import{l as O,m as _,n as w,u as v}from"./chunk-CSIS4RAB.js";import{$a as r,Aa as g,Ka as C,Oa as V,Ua as c,Va as y,Ya as W,Za as F,_a as T,ab as o,bb as l,ca as f,cb as P,da as h,db as M,eb as b,ka as G,lb as E,mb as a,pb as u,qb as s,rb as m,tb as x}from"./chunk-CPE74GXY.js";function L(n,D){if(n&1){let d=P();r(0,"gradient-picker",3),m("ngModelChange",function(e){f(d);let p=b();return s(p.value,e)||(p.value=e),h(e)}),M("ngModelChange",function(){f(d);let e=b();return h(e.onValueChange())}),o()}if(n&2){let d=b();u("ngModel",d.value)}}var S=(()=>{class n{value="";valueChange=new G;isOpen=!1;onValueChange(){this.valueChange.emit(this.value)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=C({type:n,selectors:[["app-gradient-dropdown"]],inputs:{value:"value"},outputs:{valueChange:"valueChange"},decls:3,vars:4,consts:[["trigger","cdkOverlayOrigin"],["cdkOverlayOrigin","",3,"click"],["cdkConnectedOverlay","",3,"overlayOutsideClick","detach","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen"],[3,"ngModelChange","ngModel"]],template:function(i,e){if(i&1){let p=P();r(0,"button",1,0),M("click",function(){return f(p),h(e.isOpen=!e.isOpen)}),o(),V(2,L,1,1,"ng-template",2),M("overlayOutsideClick",function(){return f(p),h(e.isOpen=!1)})("detach",function(){return f(p),h(e.isOpen=!1)})}if(i&2){let p=E(1);y("background",e.value),g(2),c("cdkConnectedOverlayOrigin",p)("cdkConnectedOverlayOpen",e.isOpen)}},dependencies:[v,_,w,k,B,A],styles:["button[_ngcontent-%COMP%]{width:64px;height:64px;padding:0;margin:8px;border:1px solid;cursor:pointer}button[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 3px #0090ed66}"]})}return n})();var j=()=>({updateOn:"blur"}),H=(()=>{class n{value="";static \u0275fac=function(i){return new(i||n)};static \u0275cmp=C({type:n,selectors:[["app-gradient-input"]],inputs:{value:"value"},decls:2,vars:4,consts:[[3,"valueChange","value"],["type","text",3,"ngModelChange","ngModel","ngModelOptions"]],template:function(i,e){i&1&&(r(0,"app-gradient-dropdown",0),m("valueChange",function(t){return s(e.value,t)||(e.value=t),t}),o(),r(1,"input",1),m("ngModelChange",function(t){return s(e.value,t)||(e.value=t),t}),o()),i&2&&(u("value",e.value),g(),u("ngModel",e.value),c("ngModelOptions",x(3,j)))},dependencies:[v,O,_,w,S],styles:["[_nghost-%COMP%]{display:inline-flex;width:100%}[_nghost-%COMP%]     app-gradient-dropdown button{width:16px;height:16px;margin:0}input[_ngcontent-%COMP%]{width:100%;padding:0 4px;border:none;background:none;font-family:monospace}"]})}return n})();var z=()=>({updateOn:"blur"});function U(n,D){if(n&1&&l(0,"app-gradient-dropdown",5),n&2){let d=D.$implicit;c("value",d)}}var ae=(()=>{class n{gradient="linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)";gradients=["linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)","linear-gradient(0.5turn, #4285f4, #34a853, #fbbc05, #ea4335)","linear-gradient(45deg, #5fc9f8, #fecb2e, #fd9426, #fc3158, #147efb, #53d769)"];static \u0275fac=function(i){return new(i||n)};static \u0275cmp=C({type:n,selectors:[["app-home"]],decls:35,vars:6,consts:[[1,"jumbotron"],[1,"gradient-picker-wrapper"],[3,"ngModelChange","ngModel"],[1,"gradient-preview"],[1,"gradient-text",3,"ngModelChange","ngModel","ngModelOptions"],[3,"value"],["href","https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#syntax"],["value","linear-gradient(red)"],["value","linear-gradient(45deg, blue, red)"],["value","linear-gradient(to left top, blue, red)"],["value","linear-gradient(in oklab, blue, red)"],["value","linear-gradient(in hsl, blue, red)"],["value","linear-gradient(in hsl longer hue, blue, red)"],["value","linear-gradient(0deg, blue, green 40%, red)"],["value","linear-gradient(.25turn, red, 10%, blue)"],["value","linear-gradient(45deg, red 0 50%, blue 50% 100%)"]],template:function(i,e){i&1&&(r(0,"div",0)(1,"div",1)(2,"gradient-picker",2),m("ngModelChange",function(t){return s(e.gradient,t)||(e.gradient=t),t}),o()(),l(3,"div",3),r(4,"textarea",4),m("ngModelChange",function(t){return s(e.gradient,t)||(e.gradient=t),t}),o()(),r(5,"h2"),a(6,"Gradient picker in dropdown"),o(),r(7,"div"),F(8,U,1,1,"app-gradient-dropdown",5,W),o(),r(10,"h2"),a(11,"CSS gradient syntax"),o(),r(12,"a",6),a(13,"MDN"),o(),r(14,"pre")(15,"code"),a(16,`/* A gradient with a single color of red */
`),l(17,"app-gradient-input",7),a(18,`

/* A gradient tilted 45 degrees,
   starting blue and finishing red */
`),l(19,"app-gradient-input",8),a(20,`

/* A gradient going from the bottom right to the top left corner,
   starting blue and finishing red */
`),l(21,"app-gradient-input",9),a(22,`

/* Interpolation in rectangular color space */
`),l(23,"app-gradient-input",10),a(24,`

/* Interpolation in polar color space */
`),l(25,"app-gradient-input",11),a(26,`

/* Interpolation in polar color space
  with longer hue interpolation method */
`),l(27,"app-gradient-input",12),a(28,`

/* Color stop: A gradient going from the bottom to top,
   starting blue, turning green at 40% of its length,
   and finishing red */
`),l(29,"app-gradient-input",13),a(30,`

/* Color hint: A gradient going from the left to right,
   starting red, getting to the midpoint color
   10% of the way across the length of the gradient,
   taking the rest of the 90% of the length to change to blue */
`),l(31,"app-gradient-input",14),a(32,`

/* Multi-position color stop: A gradient tilted 45 degrees,
   with a red bottom-left half and a blue top-right half,
   with a hard line where the gradient changes from red to blue */
`),l(33,"app-gradient-input",15),a(34,`
`),o()()),i&2&&(g(2),u("ngModel",e.gradient),g(),y("background",e.gradient),g(),u("ngModel",e.gradient),c("ngModelOptions",x(5,z)),g(4),T(e.gradients))},dependencies:[v,O,_,w,k,S,H],styles:['.jumbotron[_ngcontent-%COMP%]{display:grid;grid-template:"picker preview" 240px "picker textarea" auto/240px auto;gap:0 16px}@media (width < 600px){.jumbotron[_ngcontent-%COMP%]{grid-template:"preview" 240px "textarea" auto "picker" auto}}.gradient-picker-wrapper[_ngcontent-%COMP%]{grid-area:picker}.gradient-preview[_ngcontent-%COMP%]{grid-area:preview;border:1px solid;border-radius:8px 8px 0 0}.gradient-text[_ngcontent-%COMP%]{grid-area:textarea;padding:4px;margin:0;border:1px solid light-dark(rgba(0,0,0,.32),rgba(255,255,255,.32));border-radius:0 0 8px 8px;resize:vertical}.gradient-text[_ngcontent-%COMP%]:focus{outline:none;border-color:#0085f2;box-shadow:0 0 0 3px #0090ed66}pre[_ngcontent-%COMP%]{padding:16px;margin:16px 0 32px;background-color:light-dark(#f1f1f1,#2d2d2d);border-radius:8px;color:#858585;white-space:pre-wrap}.theme-btn[_ngcontent-%COMP%]{width:24px;height:24px;padding:0;vertical-align:middle}']})}return n})();export{ae as HomeComponent};
