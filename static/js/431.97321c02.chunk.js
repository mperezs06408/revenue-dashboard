"use strict";(self.webpackChunkmantis_free_react_admin_template=self.webpackChunkmantis_free_react_admin_template||[]).push([[431],{13431:function(e,t,r){r.r(t),r.d(t,{default:function(){return A}});var n=r(82937),a=r(42669),o=r(34207),s=r(26862),i=r(75958),u=r(10054),c=r(40737),l=r(46417),d=function(e){var t=e.color,r=e.title,o=e.count,s=e.symbol,d=e.percentage,v=e.isLoss;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(n.ZP,{container:!0,alignItems:"center",sx:{width:"100%"},children:[(0,l.jsx)(n.ZP,{item:!0,xs:d?6:12,textAlign:d?"right":"center",children:(0,l.jsxs)(a.Z,{variant:"h5",children:[s&&"CURRENCY"===s&&"$",o,s&&"PERCENTAGE"===s&&"%"]})}),d&&(0,l.jsx)(n.ZP,{item:!0,xs:6,textAlign:"left",children:(0,l.jsx)(i.Z,{variant:"combined",color:t,style:{backgroundColor:"transparent",color:"#00B89E",fontSize:"0.75rem"},icon:(0,l.jsxs)(l.Fragment,{children:[!v&&(0,l.jsx)(u.Z,{style:{fontSize:"0.5rem",color:"inherit"}}),v&&(0,l.jsx)(c.Z,{style:{fontSize:"0.5rem",color:"inherit"}})]}),label:"".concat(d,"%"),sx:{ml:.5,pl:.5},size:"small"})})]}),(0,l.jsx)(n.ZP,{item:!0,xs:12,textAlign:"center",children:(0,l.jsx)(a.Z,{variant:"h6",color:"textSecondary",style:{fontSize:"0.75rem"},children:r})})]})};d.defaultProps={color:"primary"};var v=d,m=r(5845),g=r.n(m),p=r(97548),x=r.n(p),h=r(1413),y=r(42982),f=r(70885),w=r(47313),C=r(74165),R=r(15861),Z=r(13997),b=r.n(Z),j=function(){var e=(0,R.Z)((0,C.Z)().mark((function e(t,r){return(0,C.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:b().parse(t,{header:!0,download:!0,skipEmptyLines:!0,complete:r});case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),D=r(70816),P=r.n(D),O=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_=function(e){var t=parseInt(e),r=Math.floor((""+t).length/3),n=parseFloat((0!==r?e/Math.pow(1e3,r):t).toPrecision(2));return console.log(n),n%1!==0&&(n=n.toFixed(1)),console.log("type",Number.isInteger(e)),Number.isInteger(e)?n+["","k","M","G","T","P","E"][r]:e.toFixed(2)};var A=function(){var e,t=function(){var e=(0,w.useState)(!0),t=(0,f.Z)(e,2),r=t[0],n=t[1],a=(0,w.useState)([]),o=(0,f.Z)(a,2),s=o[0],i=o[1],u=(0,w.useState)([]),c=(0,f.Z)(u,2),l=c[0],d=c[1],v=(0,w.useState)({isLoading:!0,totalRevenue:0,generalTotalOrders:0,newCustomers:0,percentageNewCustomersRevenue:0,variationTotalRevenue:0,variationGeneralTotalOrders:0,variationNewCustomers:0,variationNewCustomersRevenue:0}),m=(0,f.Z)(v,2),g=m[0],p=m[1],x=(0,w.useState)({isLoading:!0,avgRevenueDay:0,avgOrdersDay:0,avgItemsPerOrder:0,avgOrderValue:0,avgNewCustomersPerDay:0,variationAvgRevenueDay:0,variationAvgOrdersDay:0,variationAvgItemsPerOrder:0,variationAvgOrderValue:0,variationAvgNewCustomersPerDay:0}),C=(0,f.Z)(x,2),R=C[0],Z=C[1],b=(0,w.useState)({isLoading:!0,existingCustomerRevenue:[],newCustomerRevenue:[],totalOrders:[],newCustomerOrders:[]}),D=(0,f.Z)(b,2),A=D[0],S=D[1],N=(0,w.useState)({isLoading:!0,totalRevenueBySource:[],revenueBySourcePercentage:[[],["","",[]]]}),L=(0,f.Z)(N,2),I=L[0],B=L[1],F=(0,w.useState)({isLoading:!0,totalRevenueByCountry:[["",0]]}),T=(0,f.Z)(F,2),E=T[0],M=T[1],k=g.totalRevenue,V=g.generalTotalOrders,G=g.newCustomers,Y=g.percentageNewCustomersRevenue,z=g.variationTotalRevenue,$=g.variationGeneralTotalOrders,U=g.variationNewCustomers,J=g.variationNewCustomersRevenue,q=R.avgRevenueDay,W=R.avgOrdersDay,H=R.avgItemsPerOrder,K=R.avgOrderValue,Q=R.avgNewCustomersPerDay,X=R.variationAvgRevenueDay,ee=R.variationAvgOrdersDay,te=R.variationAvgItemsPerOrder,re=R.variationAvgOrderValue,ne=R.variationAvgNewCustomersPerDay,ae=A.existingCustomerRevenue,oe=A.newCustomerRevenue,se=A.totalOrders,ie=A.newCustomerOrders,ue=I.totalRevenueBySource,ce=I.revenueBySourcePercentage,le=E.totalRevenueByCountry;(0,w.useEffect)((function(){j("/revenue-dashboard/revenue-by-date.csv",de)}),[]),(0,w.useEffect)((function(){if(s.length){var e=(0,y.Z)(new Set(s.map((function(e){return e.order_date})))),t=(0,y.Z)(new Set(s.map((function(e){return e.order_revenue_source})))),r=(0,y.Z)(new Set(s.map((function(e){return e.order_country}))));me(),ge(e),pe(t),xe(r)}}),[s]),(0,w.useEffect)((function(){console.log(g.isLoading,R.isLoading,A.isLoading,I.isLoading),g.isLoading||R.isLoading||A.isLoading||I.isLoading||E.isLoading||(n(!1),console.log(le))}),[g.isLoading,R.isLoading,A.isLoading,I.isLoading,E.isLoading]);var de=function(e){var t=e.data.map((function(e){var t=P()(e.order_date,["M/D/YY","DD/MM/YYYY"]).valueOf();return(0,h.Z)((0,h.Z)({},e),{},{order_date:t})}));t=t.sort((function(e,t){return e.order_date-t.order_date})),t=ve(t),i(t.one_month_ago),d(t.two_months_ago)},ve=function(e){var t=e[e.length-1].order_date,r=new Date(t);r.setDate(r.getDate()-30);var n=new Date(r);n.setDate(n.getDate()-30);var a=e.filter((function(e){return new Date(e.order_date)>n}));return{one_month_ago:a.filter((function(e){return new Date(e.order_date)>r})),two_months_ago:a=a.filter((function(e){return new Date(e.order_date)<=r}))}},me=function(){var e=s.reduce((function(e,t){return e+Math.floor(t.order_revenue)}),0),t=s.reduce((function(e,t){return e+parseInt(t.num_orders)}),0),r=s.reduce((function(e,t){return"New"===t.customer_type?e+1:e}),0),n=s.reduce((function(e,t){return"New"===t.customer_type?e+parseFloat(t.order_revenue):e}),0),a=s.reduce((function(e,t){return e+parseInt(t.item_quantity)}),0)/t,o=l.reduce((function(e,t){return e+Math.floor(t.order_revenue)}),0),i=l.reduce((function(e,t){return e+parseInt(t.num_orders)}),0),u=l.reduce((function(e,t){return"New"===t.customer_type?e+1:e}),0),c=l.reduce((function(e,t){return"New"===t.customer_type?e+parseFloat(t.order_revenue):e}),0),d=l.reduce((function(e,t){return e+parseInt(t.item_quantity)}),0)/i;console.log("prev",o);var v=parseInt(e/30),m=parseInt(t/30),x=e/t,y=parseInt(r/30),f=parseInt(o/30),w=parseInt(i/30),C=o/i,b=parseInt(u/30),j=function(e,t){return Math.floor((t-e)/e*100)};p((0,h.Z)((0,h.Z)({},g),{},{isLoading:!1,totalRevenue:_(e),generalTotalOrders:_(t),newCustomers:_(r),percentageNewCustomersRevenue:_(parseFloat(n/e*100)),variationTotalRevenue:j(o,e),variationGeneralTotalOrders:j(i,t),variationNewCustomers:j(u,r),variationNewCustomersRevenue:j(c,n)})),console.log(j(C,x),C,x),Z((0,h.Z)((0,h.Z)({},R),{},{isLoading:!1,avgRevenueDay:_(v),avgOrdersDay:m,avgItemsPerOrder:_(a),avgOrderValue:_(x),avgNewCustomersPerDay:y,variationAvgRevenueDay:j(f,v),variationAvgOrdersDay:j(w,m),variationAvgItemsPerOrder:j(d,a),variationAvgOrderValue:j(C,x),variationAvgNewCustomersPerDay:j(b,y)}))},ge=function(e){var t=[],r=[],n=[],a=[],o=s.filter((function(e){return"New"===e.customer_type})),i=s.filter((function(e){return"Existing"===e.customer_type}));e.map((function(e){var u=s.filter((function(t){return e===t.order_date})),c=o.filter((function(t){return e===t.order_date})),l=i.filter((function(t){return e===t.order_date})),d=c.reduce((function(e,t){return e+parseFloat(t.order_revenue)}),0),v=l.reduce((function(e,t){return e+parseFloat(t.order_revenue)}),0),m=u.reduce((function(e,t){return e+parseInt(t.num_orders)}),0),g=c.reduce((function(e,t){return e+parseInt(t.num_orders)}),0);t.push([e,parseInt(d)]),r.push([e,parseInt(v)]),a.push([e,parseInt(m)]),n.push([e,parseInt(g)])})),S((0,h.Z)((0,h.Z)({},A),{},{isLoading:!1,existingCustomerRevenue:r,newCustomerRevenue:t,totalOrders:a,newCustomerOrders:n}))},pe=function(e){var t=new Date(s[s.length-1].order_date),r=[s[s.length-1].order_date,t.setDate(t.getDate()-7),t.setDate(t.getDate()-7),t.setDate(t.getDate()-7),t.setDate(t.getDate()-7)].reverse(),n=[],a=[];e.map((function(e){var t=null,o=(0,y.Z)(s.filter((function(t){return e===t.order_revenue_source}))),i=(0,y.Z)(r.map((function(e,n){var a=new Date(e);return 0!==n&&(t=new Date(r[n-1])),o.reduce((function(e,r){var n=new Date(r.order_date);return t?n>t&&n<=a?e+parseInt(r.order_revenue):e:n<=a?e+parseInt(r.order_revenue):e}),0)}))),u=o.reduce((function(e,t){return e+parseFloat(t.order_revenue)}),0);a.push([e,i]),n.push([e,parseInt(u)])})),B((0,h.Z)((0,h.Z)({},I),{},{isLoading:!1,totalRevenueBySource:n.sort((function(e,t){return t[1]-e[1]})),revenueBySourcePercentage:[r.map((function(e){return"".concat(O[new Date(e).getMonth()]," ").concat(new Date(e).getDate())})),a.sort((function(e,t){return e[1].reduce((function(e,t){return e+t}))-t[1].reduce((function(e,t){return e+t}))}))]}))},xe=function(e){var t=[],r=s.reduce((function(e,t){return e+parseFloat(t.order_revenue)}),0);e.map((function(e){var n=s.filter((function(t){return e===t.order_country})).reduce((function(e,t){return e+parseFloat(t.order_revenue)}),0);t.push([e,parseInt(n/r*100),n])})),M((0,h.Z)((0,h.Z)({},I),{},{isLoading:!1,totalRevenueByCountry:t}))};return{states:{isLoading:r,totalRevenue:k,generalTotalOrders:V,newCustomers:G,percentageNewCustomersRevenue:Y,variationTotalRevenue:z,variationGeneralTotalOrders:$,variationNewCustomers:U,variationNewCustomersRevenue:J,avgRevenueDay:q,avgOrdersDay:W,avgItemsPerOrder:H,avgOrderValue:K,avgNewCustomersPerDay:Q,variationAvgRevenueDay:X,variationAvgOrdersDay:ee,variationAvgItemsPerOrder:te,variationAvgOrderValue:re,variationAvgNewCustomersPerDay:ne,existingCustomerRevenue:ae,newCustomerRevenue:oe,totalOrders:se,newCustomerOrders:ie,totalRevenueBySource:ue,revenueBySourcePercentage:ce,totalRevenueByCountry:le}}}(),r=t.states,i=r.isLoading,u=r.totalRevenue,c=r.generalTotalOrders,d=r.newCustomers,m=r.percentageNewCustomersRevenue,p=r.variationTotalRevenue,C=r.variationGeneralTotalOrders,R=r.variationNewCustomers,Z=r.variationNewCustomersRevenue,b=r.avgRevenueDay,D=r.avgOrdersDay,A=r.avgItemsPerOrder,S=r.avgOrderValue,N=r.avgNewCustomersPerDay,L=r.variationAvgRevenueDay,I=r.variationAvgOrdersDay,B=r.variationAvgItemsPerOrder,F=r.variationAvgOrderValue,T=r.variationAvgNewCustomersPerDay,E=r.existingCustomerRevenue,M=r.newCustomerRevenue,k=r.totalOrders,V=r.newCustomerOrders,G=r.totalRevenueBySource,Y=r.revenueBySourcePercentage,z=r.totalRevenueByCountry,$={chart:{type:"column"},title:{text:""},legend:{align:"right",symbolRadius:3,symbolWidth:16},xAxis:{type:"datetime",dateTimeLabelFormats:{day:"%e %b"},labels:{rotation:-45}},yAxis:[{title:{text:"Existing Customer Revenue"},stackLabels:{enabled:!0,formatter:function(){return"$"+g().numberFormat(this.total,0,",",".")}},reversedStacks:!1},{labels:{formatter:function(){var e=this.value,t=parseFloat(e/1e3);return"".concat(t,"K")}},title:{text:"Total Orders"},opposite:!0,max:2500}],tooltip:{formatter:function(){return'<span style="color:'.concat(this.color,'">\u25cf</span> ').concat(this.series.name,": <b>$").concat(g().numberFormat(this.y,0,",","."),'</b><br/><span style="color:').concat(this.color,'">\u25cf</span> Date: <b>').concat(new Date(this.x).getDate()+"/"+(new Date(this.x).getMonth()+1),"</b><br/>")}},plotOptions:{column:{stacking:"normal"},spline:{marker:{enabled:!1}}},series:[{name:"Existing Customer Revenue",data:(e={existingCustomerRevenue:E,newCustomerRevenue:M,totalOrders:k,newCustomerOrders:V}).existingCustomerRevenue,yAxis:0},{name:"New Customer Revenue",data:e.newCustomerRevenue,yAxis:0},{type:"spline",name:"Total Orders",data:e.totalOrders,yAxis:1},{type:"spline",name:"New Customer Orders",data:e.newCustomerOrders,yAxis:1}]},U=function(e){var t=e.revenueBySourcePercentage;return{chart:{type:"column"},title:{text:""},xAxis:{categories:t[0],labels:{rotation:-45}},yAxis:{min:0,title:{enabled:!1},labels:{format:"{value} %"}},legend:{reversed:!0,symbolRadius:3},tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',shared:!0},plotOptions:{column:{stacking:"percent"}},series:(0,y.Z)(t[1].map((function(e){return{name:e[0],data:e[1]}})))}}({revenueBySourcePercentage:Y}),J=function(e){var t=e.totalRevenueBySource;return{chart:{type:"column",inverted:!0},title:{text:""},legend:{enabled:!1},xAxis:{categories:t.map((function(e){return e[0]})),labels:{rotation:-45}},yAxis:{labels:{formatter:function(){var e=this.value,t=Math.floor((""+e).length/3),r=parseFloat((0!==t?e/Math.pow(1e3,t):e).toPrecision(2));return r%1!==0&&(r=r.toFixed(1)),r+["","k","M","G","T","P","E"][t]}}},tooltip:{formatter:function(){return'<span style="color:'.concat(this.color,'">\u25cf</span> ').concat(this.series.name,": <b>$").concat(g().numberFormat(this.y,0,",","."),"</b><br/>")}},series:[{name:"Revenue by Source",data:t.map((function(e){return e[1]})),dataLabels:{enabled:!1}}]}}({totalRevenueBySource:G}),q={chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:""},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b><br/> Revenue on the last 30 days: <b>$ {point.tooltip.revenue}</b>"},accessibility:{point:{valueSuffix:"%"}},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",showInLegend:!1,dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.1f} %"}},ignoreHiddenPoint:!1},series:[{name:"Revenue by Country",colorByPoint:!0,data:{totalRevenueByCountry:z}.totalRevenueByCountry.sort((function(e,t){return e[1]-t[1]})).map((function(e,t){var r={name:e[0],y:e[1],tooltip:{revenue:g().numberFormat(e[2],0,",",".")}};return 0===t?(0,h.Z)((0,h.Z)({},r),{},{sliced:!0,selected:!0}):r}))}]};return(0,l.jsxs)("section",{children:[(0,l.jsx)(n.ZP,{container:!0,children:(0,l.jsx)(n.ZP,{item:!0,xs:12,sx:{mb:2.25},children:(0,l.jsx)(a.Z,{variant:"h5",children:"Dashboard"})})}),i?(0,l.jsx)(n.ZP,{item:!0,xs:12,sx:{margin:"auto"},children:(0,l.jsx)(s.Z,{children:(0,l.jsx)(n.ZP,{container:!0,justifyContent:"center",children:(0,l.jsx)(o.Z,{})})})}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(n.ZP,{container:!0,rowSpacing:1,columnSpacing:1,sx:{mb:1},alignItems:"stretch",children:[(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:6,children:(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(a.Z,{variant:"h4",sx:{mb:4},children:"General Metrics"}),(0,l.jsxs)(n.ZP,{container:!0,justifyContent:"space-between",children:[(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:4,lg:3,sx:{"@media screen and (min-width: 600px)":{justifyContent:"center"}},children:(0,l.jsx)(v,{title:"Total Revenue",count:u,symbol:"CURRENCY",isLoss:p<0,percentage:p})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:4,lg:3,children:(0,l.jsx)(v,{title:"Total Orders",count:c,isLoss:C<0,percentage:C})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:4,lg:3,children:(0,l.jsx)(v,{title:"New Customers",count:d,isLoss:R<0,percentage:R})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:4,lg:3,children:(0,l.jsx)(v,{title:"% New Customers Revenue",count:m,symbol:"PERCENTAGE",isLoss:Z<0,percentage:Z})})]})]})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:6,children:(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(a.Z,{variant:"h4",sx:{mb:4},children:"Average Performance"}),(0,l.jsxs)(n.ZP,{container:!0,justifyContent:"space-between",children:[(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:6,lg:2.4,children:(0,l.jsx)(v,{title:"Avg Revenue/Day",count:b,symbol:"CURRENCY",isLoss:L<0,percentage:L})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:6,lg:2.4,children:(0,l.jsx)(v,{title:"Avg Orders/Day",count:D,isLoss:I<0,percentage:I})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:6,lg:2.4,children:(0,l.jsx)(v,{title:"Avg Items/Order",count:A,isLoss:B<0,percentage:B})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:6,lg:2.4,children:(0,l.jsx)(v,{title:"Avg Order Value",count:S,symbol:"CURRENCY",isLoss:F<0,percentage:F})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,md:6,lg:2.4,children:(0,l.jsx)(v,{title:"Avg New Customers/Day",count:N,isLoss:T<0,percentage:T})})]})]})})]}),(0,l.jsx)(n.ZP,{container:!0,rowSpacing:1,columnSpacing:1,sx:{mb:1},children:(0,l.jsx)(n.ZP,{item:!0,xs:12,justifyContent:"center",children:(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(a.Z,{variant:"h4",sx:{mb:1},children:"Revenue by Date"}),(0,l.jsx)(x(),{highcharts:g(),options:$})]})})}),(0,l.jsxs)(n.ZP,{container:!0,rowSpacing:1,columnSpacing:1,sx:{mb:1},children:[(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(a.Z,{variant:"h4",sx:{mb:1},children:"Revenue by Source"}),(0,l.jsx)(x(),{highcharts:g(),options:U})]})}),(0,l.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(a.Z,{variant:"h4",sx:{mb:1},children:"Revenue by Source"}),(0,l.jsx)(x(),{highcharts:g(),options:J})]})})]}),(0,l.jsx)(n.ZP,{container:!0,rowSpacing:1,columnSpacing:1,children:(0,l.jsx)(n.ZP,{item:!0,xs:12,children:(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(a.Z,{variant:"h4",sx:{mb:1},children:"Revenue by Country"}),(0,l.jsx)(x(),{highcharts:g(),options:q})]})})})]})]})}}}]);