(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{298:function(e,t,n){},336:function(e,t){e.exports={clientID:"7409ea9a776d385529be",clientSecret:"80513c8c974030183d29369724133e64d707c5b8",repo:"blog",owner:"chingchao",admin:["chingchao"]}},337:function(e,t,n){"use strict";var r=n(298);n.n(r).a},345:function(e,t,n){"use strict";n.r(t);n(94),n(16),n(333);var r=n(340),a=(n(63),n(27)),c=(n(334),n(335)),i=n.n(c),o=n(336),s={name:"GitalkPlugin",data:function(){return{show:!1}},mounted:function(){this.fetchComment()},methods:{fetchComment:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.$route.name){t.next=2;break}return t.abrupt("return");case 2:if(e.show=/.html$/.test(e.$route.path),e.show){t.next=5;break}return t.abrupt("return");case 5:return t.next=7,new Promise((function(e){return setTimeout(e,1e3)}));case 7:new i.a(Object(r.a)(Object(r.a)({},o),{},{id:e.$page.key,distractionFreeMode:!1})).render(e.$refs.commentEl);case 9:case"end":return t.stop()}}),t)})))()}},watch:{$route:function(e){this.fetchComment()}}},u=(n(337),n(21)),h=Object(u.a)(s,(function(){var e=this.$createElement,t=this._self._c||e;return this.show?t("div",{staticClass:"gitalk-plugin"},[t("div",{key:this.$page.key,ref:"commentEl",staticClass:"gitalk"})]):this._e()}),[],!1,null,"1ae75666",null);t.default=h.exports}}]);