import{a as k,b as v,c as w,h as y,i as B,j as I,q as S}from"./chunk-RCKFZQV4.js";import{$a as p,Aa as g,Ma as V,Qa as c,Ra as b,Wa as W,Xa as T,Ya as E,Za as r,_a as o,aa as f,ab as D,bb as M,cb as x,ia as h,ib as A,ja as C,jb as a,mb as u,nb as s,oa as F,ob as m,qb as _,rb as O}from"./chunk-7MTJXEMM.js";function j(t,G){if(t&1){let d=D();r(0,"gradient-picker",3),m("ngModelChange",function(e){h(d);let l=x();return s(l.value,e)||(l.value=e),C(e)}),M("ngModelChange",function(){h(d);let e=x();return C(e.onValueChange())}),o()}if(t&2){let d=x();u("ngModel",d.value)}}var P=(()=>{class t{value="";valueChange=new F;isOpen=!1;onValueChange(){this.valueChange.emit(this.value)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=f({type:t,selectors:[["app-gradient-dropdown"]],inputs:{value:"value"},outputs:{valueChange:"valueChange"},standalone:!0,features:[_],decls:3,vars:4,consts:[["trigger","cdkOverlayOrigin"],["cdkOverlayOrigin","",3,"click"],["cdkConnectedOverlay","",3,"overlayOutsideClick","detach","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen"],[3,"ngModelChange","ngModel"]],template:function(i,e){if(i&1){let l=D();r(0,"button",1,0),M("click",function(){return h(l),C(e.isOpen=!e.isOpen)}),o(),V(2,j,1,1,"ng-template",2),M("overlayOutsideClick",function(){return h(l),C(e.isOpen=!1)})("detach",function(){return h(l),C(e.isOpen=!1)})}if(i&2){let l=A(1);b("background",e.value),g(2),c("cdkConnectedOverlayOrigin",l)("cdkConnectedOverlayOpen",e.isOpen)}},dependencies:[y,v,w,S,I,B],styles:["button[_ngcontent-%COMP%]{width:64px;height:64px;padding:0;margin:8px;border:1px solid}"]})}return t})();var z=()=>({updateOn:"blur"}),L=(()=>{class t{value="";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=f({type:t,selectors:[["app-gradient-input"]],inputs:{value:"value"},standalone:!0,features:[_],decls:2,vars:4,consts:[[3,"valueChange","value"],["type","text",3,"ngModelChange","ngModel","ngModelOptions"]],template:function(i,e){i&1&&(r(0,"app-gradient-dropdown",0),m("valueChange",function(n){return s(e.value,n)||(e.value=n),n}),o(),r(1,"input",1),m("ngModelChange",function(n){return s(e.value,n)||(e.value=n),n}),o()),i&2&&(u("value",e.value),g(),u("ngModel",e.value),c("ngModelOptions",O(3,z)))},dependencies:[y,k,v,w,P],styles:["[_nghost-%COMP%]{display:inline-flex;width:100%}[_nghost-%COMP%]     app-gradient-dropdown button{width:16px;height:16px;margin:0}input[_ngcontent-%COMP%]{width:100%;padding:0 4px;border:none;background:none;font-family:monospace}"]})}return t})();var U=()=>({updateOn:"blur"});function q(t,G){if(t&1&&p(0,"app-gradient-dropdown",6),t&2){let d=G.$implicit;c("value",d)}}var de=(()=>{class t{gradient="linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)";gradients=["linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)","linear-gradient(0.5turn, #4285f4, #34a853, #fbbc05, #ea4335)","linear-gradient(45deg, #5fc9f8, #fecb2e, #fd9426, #fc3158, #147efb, #53d769)"];static \u0275fac=function(i){return new(i||t)};static \u0275cmp=f({type:t,selectors:[["app-home"]],standalone:!0,features:[_],decls:38,vars:6,consts:[[1,"container"],[1,"jumbotron"],[1,"picker-area"],[3,"ngModelChange","ngModel"],[1,"preview-bg"],[1,"preview-edit",3,"ngModelChange","ngModel","ngModelOptions"],[3,"value"],["href","https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#syntax"],["value","linear-gradient(red)"],["value","linear-gradient(45deg, blue, red)"],["value","linear-gradient(to left top, blue, red)"],["value","linear-gradient(in oklab, blue, red)"],["value","linear-gradient(in hsl, blue, red)"],["value","linear-gradient(in hsl longer hue, blue, red)"],["value","linear-gradient(0deg, blue, green 40%, red)"],["value","linear-gradient(.25turn, red, 10%, blue)"],["value","linear-gradient(45deg, red 0 50%, blue 50% 100%)"]],template:function(i,e){i&1&&(r(0,"div",0)(1,"h2"),a(2,"Gradient picker"),o(),r(3,"div",1)(4,"div",2)(5,"gradient-picker",3),m("ngModelChange",function(n){return s(e.gradient,n)||(e.gradient=n),n}),o()(),p(6,"div",4),r(7,"textarea",5),m("ngModelChange",function(n){return s(e.gradient,n)||(e.gradient=n),n}),o()(),r(8,"h2"),a(9,"Gradient picker in dropdown"),o(),r(10,"div"),T(11,q,1,1,"app-gradient-dropdown",6,W),o(),r(13,"h2"),a(14,"CSS gradient syntax"),o(),r(15,"a",7),a(16,"MDN"),o(),r(17,"pre")(18,"code"),a(19,`/* A gradient with a single color of red */
`),p(20,"app-gradient-input",8),a(21,`

/* A gradient tilted 45 degrees,
   starting blue and finishing red */
`),p(22,"app-gradient-input",9),a(23,`

/* A gradient going from the bottom right to the top left corner,
   starting blue and finishing red */
`),p(24,"app-gradient-input",10),a(25,`

/* Interpolation in rectangular color space */
`),p(26,"app-gradient-input",11),a(27,`

/* Interpolation in polar color space */
`),p(28,"app-gradient-input",12),a(29,`

/* Interpolation in polar color space
  with longer hue interpolation method */
`),p(30,"app-gradient-input",13),a(31,`

/* Color stop: A gradient going from the bottom to top,
   starting blue, turning green at 40% of its length,
   and finishing red */
`),p(32,"app-gradient-input",14),a(33,`

/* Color hint: A gradient going from the left to right,
   starting red, getting to the midpoint color
   10% of the way across the length of the gradient,
   taking the rest of the 90% of the length to change to blue */
`),p(34,"app-gradient-input",15),a(35,`

/* Multi-position color stop: A gradient tilted 45 degrees,
   with a red bottom-left half and a blue top-right half,
   with a hard line where the gradient changes from red to blue */
`),p(36,"app-gradient-input",16),a(37,`
`),o()()()),i&2&&(g(5),u("ngModel",e.gradient),g(),b("background",e.gradient),g(),u("ngModel",e.gradient),c("ngModelOptions",O(5,U)),g(4),E(e.gradients))},dependencies:[y,k,v,w,S,P,L],styles:['.container[_ngcontent-%COMP%]{max-width:800px;padding:0 16px;margin:0 auto;overflow:auto}.jumbotron[_ngcontent-%COMP%]{display:grid;grid-template:"left right-top" 240px "left right-bottom" auto/240px auto;gap:0 16px}@media (width < 600px){.jumbotron[_ngcontent-%COMP%]{grid-template:"right-top" 240px "right-bottom" auto "left" auto}}.picker-area[_ngcontent-%COMP%]{grid-area:left}.preview-bg[_ngcontent-%COMP%]{grid-area:right-top;border:1px solid;border-radius:8px 8px 0 0}.preview-edit[_ngcontent-%COMP%]{grid-area:right-bottom;padding:4px;margin:0;border:1px solid rgba(0,0,0,.32);border-radius:0 0 8px 8px;resize:vertical}.preview-edit[_ngcontent-%COMP%]:focus{outline:none;border-color:#0085f2;box-shadow:0 0 0 3px #0090ed66}pre[_ngcontent-%COMP%]{padding:16px;margin:16px 0 32px;background-color:#f2f1f1;border-radius:8px;color:#858585;white-space:pre-wrap}']})}return t})();export{de as HomeComponent};
