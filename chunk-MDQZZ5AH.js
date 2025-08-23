import{a as k,b as w,c as y,h as x,i as B,j as L,r as S}from"./chunk-KGCH32U7.js";import{$a as a,Ba as g,Na as G,Ra as c,Sa as b,Xa as V,Ya as W,Za as E,_a as r,aa as h,ab as p,bb as T,cb as C,db as M,ia as f,ja as _,jb as I,kb as o,lb as A,nb as u,ob as m,pa as F,pb as s,rb as v,sb as O}from"./chunk-GXBM4PGE.js";function q(t,D){if(t&1){let l=T();r(0,"gradient-picker",3),s("ngModelChange",function(e){f(l);let d=M();return m(d.value,e)||(d.value=e),_(e)}),C("ngModelChange",function(){f(l);let e=M();return _(e.onValueChange())}),a()}if(t&2){let l=M();u("ngModel",l.value)}}var P=(()=>{class t{value="";valueChange=new F;isOpen=!1;onValueChange(){this.valueChange.emit(this.value)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=h({type:t,selectors:[["app-gradient-dropdown"]],inputs:{value:"value"},outputs:{valueChange:"valueChange"},standalone:!0,features:[v],decls:3,vars:4,consts:[["trigger","cdkOverlayOrigin"],["cdkOverlayOrigin","",3,"click"],["cdkConnectedOverlay","",3,"overlayOutsideClick","detach","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen"],[3,"ngModelChange","ngModel"]],template:function(i,e){if(i&1){let d=T();r(0,"button",1,0),C("click",function(){return f(d),_(e.isOpen=!e.isOpen)}),a(),G(2,q,1,1,"ng-template",2),C("overlayOutsideClick",function(){return f(d),_(e.isOpen=!1)})("detach",function(){return f(d),_(e.isOpen=!1)})}if(i&2){let d=I(1);b("background",e.value),g(2),c("cdkConnectedOverlayOrigin",d)("cdkConnectedOverlayOpen",e.isOpen)}},dependencies:[x,w,y,S,L,B],styles:["button[_ngcontent-%COMP%]{width:64px;height:64px;padding:0;margin:8px;border:1px solid;cursor:pointer}button[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 3px #0090ed66}"]})}return t})();var z=()=>({updateOn:"blur"}),j=(()=>{class t{value="";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=h({type:t,selectors:[["app-gradient-input"]],inputs:{value:"value"},standalone:!0,features:[v],decls:2,vars:4,consts:[[3,"valueChange","value"],["type","text",3,"ngModelChange","ngModel","ngModelOptions"]],template:function(i,e){i&1&&(r(0,"app-gradient-dropdown",0),s("valueChange",function(n){return m(e.value,n)||(e.value=n),n}),a(),r(1,"input",1),s("ngModelChange",function(n){return m(e.value,n)||(e.value=n),n}),a()),i&2&&(u("value",e.value),g(),u("ngModel",e.value),c("ngModelOptions",O(3,z)))},dependencies:[x,k,w,y,P],styles:["[_nghost-%COMP%]{display:inline-flex;width:100%}[_nghost-%COMP%]     app-gradient-dropdown button{width:16px;height:16px;margin:0}input[_ngcontent-%COMP%]{width:100%;padding:0 4px;border:none;background:none;font-family:monospace}"]})}return t})();var U=()=>({updateOn:"blur"});function J(t,D){if(t&1&&p(0,"app-gradient-dropdown",7),t&2){let l=D.$implicit;c("value",l)}}var le=(()=>{class t{gradient="linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)";gradients=["linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)","linear-gradient(0.5turn, #4285f4, #34a853, #fbbc05, #ea4335)","linear-gradient(45deg, #5fc9f8, #fecb2e, #fd9426, #fc3158, #147efb, #53d769)"];lightTheme=!0;toggleTheme(){this.lightTheme=!this.lightTheme,this.lightTheme?document.querySelector("html").classList.remove("theme-dark"):document.querySelector("html").classList.add("theme-dark")}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=h({type:t,selectors:[["app-home"]],standalone:!0,features:[v],decls:40,vars:7,consts:[[1,"container"],[1,"theme-btn",3,"click"],[1,"jumbotron"],[1,"gradient-picker-wrapper"],[3,"ngModelChange","ngModel"],[1,"gradient-preview"],[1,"gradient-text",3,"ngModelChange","ngModel","ngModelOptions"],[3,"value"],["href","https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#syntax"],["value","linear-gradient(red)"],["value","linear-gradient(45deg, blue, red)"],["value","linear-gradient(to left top, blue, red)"],["value","linear-gradient(in oklab, blue, red)"],["value","linear-gradient(in hsl, blue, red)"],["value","linear-gradient(in hsl longer hue, blue, red)"],["value","linear-gradient(0deg, blue, green 40%, red)"],["value","linear-gradient(.25turn, red, 10%, blue)"],["value","linear-gradient(45deg, red 0 50%, blue 50% 100%)"]],template:function(i,e){i&1&&(r(0,"div",0)(1,"h2"),o(2," Gradient picker "),r(3,"button",1),C("click",function(){return e.toggleTheme()}),o(4),a()(),r(5,"div",2)(6,"div",3)(7,"gradient-picker",4),s("ngModelChange",function(n){return m(e.gradient,n)||(e.gradient=n),n}),a()(),p(8,"div",5),r(9,"textarea",6),s("ngModelChange",function(n){return m(e.gradient,n)||(e.gradient=n),n}),a()(),r(10,"h2"),o(11,"Gradient picker in dropdown"),a(),r(12,"div"),W(13,J,1,1,"app-gradient-dropdown",7,V),a(),r(15,"h2"),o(16,"CSS gradient syntax"),a(),r(17,"a",8),o(18,"MDN"),a(),r(19,"pre")(20,"code"),o(21,`/* A gradient with a single color of red */
`),p(22,"app-gradient-input",9),o(23,`

/* A gradient tilted 45 degrees,
   starting blue and finishing red */
`),p(24,"app-gradient-input",10),o(25,`

/* A gradient going from the bottom right to the top left corner,
   starting blue and finishing red */
`),p(26,"app-gradient-input",11),o(27,`

/* Interpolation in rectangular color space */
`),p(28,"app-gradient-input",12),o(29,`

/* Interpolation in polar color space */
`),p(30,"app-gradient-input",13),o(31,`

/* Interpolation in polar color space
  with longer hue interpolation method */
`),p(32,"app-gradient-input",14),o(33,`

/* Color stop: A gradient going from the bottom to top,
   starting blue, turning green at 40% of its length,
   and finishing red */
`),p(34,"app-gradient-input",15),o(35,`

/* Color hint: A gradient going from the left to right,
   starting red, getting to the midpoint color
   10% of the way across the length of the gradient,
   taking the rest of the 90% of the length to change to blue */
`),p(36,"app-gradient-input",16),o(37,`

/* Multi-position color stop: A gradient tilted 45 degrees,
   with a red bottom-left half and a blue top-right half,
   with a hard line where the gradient changes from red to blue */
`),p(38,"app-gradient-input",17),o(39,`
`),a()()()),i&2&&(g(4),A(e.lightTheme?"\u2600\uFE0F":"\u{1F319}"),g(3),u("ngModel",e.gradient),g(),b("background",e.gradient),g(),u("ngModel",e.gradient),c("ngModelOptions",O(6,U)),g(4),E(e.gradients))},dependencies:[x,k,w,y,S,P,j],styles:['.container[_ngcontent-%COMP%]{max-width:800px;padding:0 16px;margin:0 auto;overflow:auto}.jumbotron[_ngcontent-%COMP%]{display:grid;grid-template:"picker preview" 240px "picker textarea" auto/240px auto;gap:0 16px}@media (width < 600px){.jumbotron[_ngcontent-%COMP%]{grid-template:"preview" 240px "textarea" auto "picker" auto}}.gradient-picker-wrapper[_ngcontent-%COMP%]{grid-area:picker}.gradient-preview[_ngcontent-%COMP%]{grid-area:preview;border:1px solid;border-radius:8px 8px 0 0}.gradient-text[_ngcontent-%COMP%]{grid-area:textarea;padding:4px;margin:0;border:1px solid light-dark(rgba(0,0,0,.32),rgba(255,255,255,.32));border-radius:0 0 8px 8px;resize:vertical}.gradient-text[_ngcontent-%COMP%]:focus{outline:none;border-color:#0085f2;box-shadow:0 0 0 3px #0090ed66}pre[_ngcontent-%COMP%]{padding:16px;margin:16px 0 32px;background-color:light-dark(#f1f1f1,#2d2d2d);border-radius:8px;color:#858585;white-space:pre-wrap}.theme-btn[_ngcontent-%COMP%]{width:24px;height:24px;padding:0;vertical-align:middle}']})}return t})();export{le as HomeComponent};
