import{d as e}from"./graph-a5cd6100-D9XW_c0Z.js";import{t}from"./channel-7f9aae89-SVvhAc2H.js";import{t as n}from"./index-7fdd4085-DSDWVvoh.js";import{$ as r,D as i,Vt as a,_ as o,a as s,at as c,ct as l,en as u,hn as d,i as f,in as p,k as m,m as h,on as g,ot as _,xt as v,y}from"./mermaid.esm.min-BIApBd3F.js";function b(e){return typeof e==`string`?new r([document.querySelectorAll(e)],[document.documentElement]):new r([l(e)],d)}function x(e,t){return!!e.children(t).length}function S(e){return w(e.v)+`:`+w(e.w)+`:`+w(e.name)}var C=/:/g;function w(e){return e?String(e).replace(C,`\\:`):``}function T(e,t){t&&e.attr(`style`,t)}function E(e,t,n){t&&e.attr(`class`,t).attr(`class`,n+` `+e.attr(`class`))}function D(e,t){var n=t.graph();if(h(n)){var r=n.transition;if(m(r))return r(e)}return e}function O(e,t){var n=e.append(`foreignObject`).attr(`width`,`100000`),r=n.append(`xhtml:div`);r.attr(`xmlns`,`http://www.w3.org/1999/xhtml`);var i=t.label;switch(typeof i){case`function`:r.insert(i);break;case`object`:r.insert(function(){return i});break;default:r.html(i)}T(r,t.labelStyle),r.style(`display`,`inline-block`),r.style(`white-space`,`nowrap`);var a=r.node().getBoundingClientRect();return n.attr(`width`,a.width).attr(`height`,a.height),n}var k={},A=function(e){let t=Object.keys(e);for(let n of t)k[n]=e[n]},j=async function(e,t,n,r,a,o){let s=r.select(`[id="${n}"]`),l=Object.keys(e);for(let n of l){let r=e[n],l=`default`;r.classes.length>0&&(l=r.classes.join(` `)),l+=` flowchart-label`;let d=i(r.styles),p=r.text===void 0?r.id:r.text,m;if(f.info(`vertex`,r,r.labelType),r.labelType===`markdown`)f.info(`vertex`,r,r.labelType);else if(c(v().flowchart.htmlLabels))m=O(s,{label:p}).node(),m.parentNode.removeChild(m);else{let e=a.createElementNS(`http://www.w3.org/2000/svg`,`text`);e.setAttribute(`style`,d.labelStyle.replace(`color:`,`fill:`));let t=p.split(_.lineBreakRegex);for(let n of t){let t=a.createElementNS(`http://www.w3.org/2000/svg`,`tspan`);t.setAttributeNS(`http://www.w3.org/XML/1998/namespace`,`xml:space`,`preserve`),t.setAttribute(`dy`,`1em`),t.setAttribute(`x`,`1`),t.textContent=n,e.appendChild(t)}m=e}let h=0,g=``;switch(r.type){case`round`:h=5,g=`rect`;break;case`square`:g=`rect`;break;case`diamond`:g=`question`;break;case`hexagon`:g=`hexagon`;break;case`odd`:g=`rect_left_inv_arrow`;break;case`lean_right`:g=`lean_right`;break;case`lean_left`:g=`lean_left`;break;case`trapezoid`:g=`trapezoid`;break;case`inv_trapezoid`:g=`inv_trapezoid`;break;case`odd_right`:g=`rect_left_inv_arrow`;break;case`circle`:g=`circle`;break;case`ellipse`:g=`ellipse`;break;case`stadium`:g=`stadium`;break;case`subroutine`:g=`subroutine`;break;case`cylinder`:g=`cylinder`;break;case`group`:g=`rect`;break;case`doublecircle`:g=`doublecircle`;break;default:g=`rect`}let y=await u(p,v());t.setNode(r.id,{labelStyle:d.labelStyle,shape:g,labelText:y,labelType:r.labelType,rx:h,ry:h,class:l,style:d.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:o.db.getTooltip(r.id)||``,domId:o.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type===`group`?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:v().flowchart.padding}),f.info(`setNode`,{labelStyle:d.labelStyle,labelType:r.labelType,shape:g,labelText:y,rx:h,ry:h,class:l,style:d.style,id:r.id,domId:o.db.lookUpDomId(r.id),width:r.type===`group`?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:v().flowchart.padding})}},M=async function(e,t,n){f.info(`abc78 edges = `,e);let r=0,a={},o,s;if(e.defaultStyle!==void 0){let t=i(e.defaultStyle);o=t.style,s=t.labelStyle}for(let n of e){r++;let c=`L-`+n.start+`-`+n.end;a[c]===void 0?(a[c]=0,f.info(`abc78 new entry`,c,a[c])):(a[c]++,f.info(`abc78 new entry`,c,a[c]));let l=c+`-`+a[c];f.info(`abc78 new link id to be used is`,c,l,a[c]);let d=`LS-`+n.start,m=`LE-`+n.end,h={style:``,labelStyle:``};switch(h.minlen=n.length||1,h.arrowhead=n.type===`arrow_open`?`none`:`normal`,h.arrowTypeStart=`arrow_open`,h.arrowTypeEnd=`arrow_open`,n.type){case`double_arrow_cross`:h.arrowTypeStart=`arrow_cross`;case`arrow_cross`:h.arrowTypeEnd=`arrow_cross`;break;case`double_arrow_point`:h.arrowTypeStart=`arrow_point`;case`arrow_point`:h.arrowTypeEnd=`arrow_point`;break;case`double_arrow_circle`:h.arrowTypeStart=`arrow_circle`;case`arrow_circle`:h.arrowTypeEnd=`arrow_circle`}let g=``,b=``;switch(n.stroke){case`normal`:g=`fill:none;`,o!==void 0&&(g=o),s!==void 0&&(b=s),h.thickness=`normal`,h.pattern=`solid`;break;case`dotted`:h.thickness=`normal`,h.pattern=`dotted`,h.style=`fill:none;stroke-width:2px;stroke-dasharray:3;`;break;case`thick`:h.thickness=`thick`,h.pattern=`solid`,h.style=`stroke-width: 3.5px;fill:none;`;break;case`invisible`:h.thickness=`invisible`,h.pattern=`solid`,h.style=`stroke-width: 0;fill:none;`}if(n.style!==void 0){let e=i(n.style);g=e.style,b=e.labelStyle}h.style=h.style+=g,h.labelStyle=h.labelStyle+=b,h.curve=n.interpolate===void 0?e.defaultInterpolate===void 0?y(k.curve,p):y(e.defaultInterpolate,p):y(n.interpolate,p),n.text===void 0?n.style!==void 0&&(h.arrowheadStyle=`fill: #333`):(h.arrowheadStyle=`fill: #333`,h.labelpos=`c`),h.labelType=n.labelType,h.label=await u(n.text.replace(_.lineBreakRegex,`
`),v()),n.style===void 0&&(h.style=h.style||`stroke: #333; stroke-width: 1.5px;fill:none;`),h.labelStyle=h.labelStyle.replace(`color:`,`fill:`),h.id=l,h.classes=`flowchart-link `+d+` `+m,t.setEdge(n.start,n.end,h,r)}},N={setConf:A,addVertices:j,addEdges:M,getClasses:function(e,t){return t.db.getClasses()},draw:async function(t,r,i,a){f.info(`Drawing flowchart`);let c=a.db.getDirection();c===void 0&&(c=`TD`);let{securityLevel:l,flowchart:u}=v(),d=u.nodeSpacing||50,p=u.rankSpacing||50,m;l===`sandbox`&&(m=s(`#i`+r));let h=s(l===`sandbox`?m.nodes()[0].contentDocument.body:`body`),_=l===`sandbox`?m.nodes()[0].contentDocument:document,y=new e({multigraph:!0,compound:!0}).setGraph({rankdir:c,nodesep:d,ranksep:p,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),x,S=a.db.getSubGraphs();f.info(`Subgraphs - `,S);for(let e=S.length-1;e>=0;e--)x=S[e],f.info(`Subgraph - `,x),a.db.addVertex(x.id,{text:x.title,type:x.labelType},`group`,void 0,x.classes,x.dir);let C=a.db.getVertices(),w=a.db.getEdges();f.info(`Edges`,w);let T=0;for(T=S.length-1;T>=0;T--){x=S[T],b(`cluster`).append(`text`);for(let e=0;e<x.nodes.length;e++)f.info(`Setting up subgraphs`,x.nodes[e],x.id),y.setParent(x.nodes[e],x.id)}await j(C,y,r,h,_,a),await M(w,y);let E=h.select(`[id="${r}"]`),D=h.select(`#`+r+` g`);if(await n(D,y,[`point`,`circle`,`cross`],`flowchart`,r),g.insertTitle(E,`flowchartTitleText`,u.titleTopMargin,a.db.getDiagramTitle()),o(y,E,u.diagramPadding,u.useMaxWidth),a.db.indexNodes(`subGraph`+T),!u.htmlLabels){let e=_.querySelectorAll(`[id="`+r+`"] .edgeLabel .label`);for(let t of e){let e=t.getBBox(),n=_.createElementNS(`http://www.w3.org/2000/svg`,`rect`);n.setAttribute(`rx`,0),n.setAttribute(`ry`,0),n.setAttribute(`width`,e.width),n.setAttribute(`height`,e.height),t.insertBefore(n,t.firstChild)}}Object.keys(C).forEach(function(e){let t=C[e];if(t.link){let n=s(`#`+r+` [id="`+e+`"]`);if(n){let e=_.createElementNS(`http://www.w3.org/2000/svg`,`a`);e.setAttributeNS(`http://www.w3.org/2000/svg`,`class`,t.classes.join(` `)),e.setAttributeNS(`http://www.w3.org/2000/svg`,`href`,t.link),e.setAttributeNS(`http://www.w3.org/2000/svg`,`rel`,`noopener`),l===`sandbox`?e.setAttributeNS(`http://www.w3.org/2000/svg`,`target`,`_top`):t.linkTarget&&e.setAttributeNS(`http://www.w3.org/2000/svg`,`target`,t.linkTarget);let r=n.insert(function(){return e},`:first-child`),i=n.select(`.label-container`);i&&r.append(function(){return i.node()});let a=n.select(`.label`);a&&r.append(function(){return a.node()})}}})}},P=(e,n)=>{let r=t,i=r(e,`r`),o=r(e,`g`),s=r(e,`b`);return a(i,o,s,n)},F=e=>`.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor||e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }

  .label text,span,p {
    fill: ${e.nodeTextColor||e.textColor};
    color: ${e.nodeTextColor||e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${P(e.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${e.clusterBkg};
    stroke: ${e.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`;export{F as a,D as c,x as i,N as l,E as n,S as o,T as r,O as s,b as t};