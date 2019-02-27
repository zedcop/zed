if (self.CavalryLogger) { CavalryLogger.start_js(["v+s3H"]); }

__d("TooltipMixin",["DOM","React","ReactDOM","TooltipData"],(function(a,b,c,d,e,f){__p&&__p();a=b("React").PropTypes;function g(a){a=a.tooltip;return a!=null&&b("React").isValidElement(a)}c={propTypes:{tooltip:a.oneOfType([a.element,a.string]),position:a.oneOf(["above","below","left","right"]),alignH:a.oneOf(["left","center","right"])},getInitialState:function(){return{tooltipContainer:g(this.props)?b("DOM").create("div"):null}},UNSAFE_componentWillReceiveProps:function(a){a=g(a);var c=this.state.tooltipContainer;c&&!a?this.setState({tooltipContainer:null}):!c&&a&&this.setState({tooltipContainer:b("DOM").create("div")})},componentDidMount:function(){this._updateTooltip()},componentDidUpdate:function(a,b){b.tooltipContainer&&!this.state.tooltipContainer&&this._cleanupContainer(b.tooltipContainer),this._updateTooltip()},_updateTooltip:function(){var a;g(this.props)?(a=this.state.tooltipContainer,b("ReactDOM").render(this.props.tooltip,a)):a=this.props.tooltip;a!=null?b("TooltipData").set(b("ReactDOM").findDOMNode(this),a,this.props.position,this.props.alignH):b("TooltipData").remove(b("ReactDOM").findDOMNode(this))},componentWillUnmount:function(){this.state.tooltipContainer&&this._cleanupContainer(this.state.tooltipContainer),b("TooltipData").remove(b("ReactDOM").findDOMNode(this))},_cleanupContainer:function(a){b("ReactDOM").unmountComponentAtNode(a)}};e.exports=c}),null);
__d("TooltipLink.react",["React","TooltipMixin"],(function(a,b,c,d,e,f){a=b("React").createClass({displayName:"TooltipLink",mixins:[b("TooltipMixin")],render:function(){return b("React").createElement("a",this.props,this.props.children)}});e.exports=a}),null);
__d("XReferer",["Base64","Cookie","FBJSON","URI","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){__p&&__p();var g={update:function(a,c,d){__p&&__p();if(!d){b("Cookie").set("x-referer","");return}a!=null&&(a=g.truncatePath(a));c!=null&&(c=g.truncatePath(c));var e=window.location.pathname+window.location.search;d=b("URI").getRequestURI();var f=d.getSubdomain();c!=null&&g._setCookie(c,e,f);a!=null&&b("setTimeoutAcrossTransitions")(function(){a!=null&&g._setCookie(a,e,f)},0)},_setCookie:function(a,c,d){a={r:a,h:c,s:d};c=b("Base64").encode(b("FBJSON").stringify(a));b("Cookie").set("x-referer",c)},truncatePath:function(a){var b=1024;a&&a.length>b&&(a=a.substring(0,b)+"...");return a}};e.exports=g}),null);
__d("HistoryManager",["SessionName","Env","Event","SprinkleConfig","URI","UserAgent_DEPRECATED","XReferer","emptyFunction","gkx","goOrReplace","isInIframe","setIntervalAcrossTransitions"],(function(a,b,c,d,e,f){__p&&__p();b("SessionName").getName();var g={history:null,current:0,fragment:null,isInitialized:function(){return!!g._initialized},init:function(){__p&&__p();if(!b("Env").ALLOW_TRANSITION_IN_IFRAME&&b("isInIframe")())return;if(g._initialized)return g;var a=new(b("URI"))(window.location.href),c=a.getFragment()||"";c.charAt(0)==="!"&&(c=c.substr(1),a.setFragment(c));Object.assign(g,{_initialized:!0,fragment:c,orig_fragment:c,history:[a],callbacks:[],lastChanged:Date.now(),canonical:new(b("URI"))("#"),user:0,enabled:!0,debug:b("emptyFunction")});if(window.history&&history.pushState){this.lastURI=document.URL;if(b("gkx")("678676")){c=new(b("URI"))(this.lastURI);a=c.getQueryData();a.__md__=void 0;a.__xts__=void 0;a.fb_dtsg_ag=void 0;a[b("SprinkleConfig").param_name]=void 0;this.lastURI=c.setQueryData(a).toString()}try{b("gkx")("819236")?window.history.replaceState(history.state,null,this.lastURI):window.history.replaceState(this.lastURI,null,this.lastURI)}catch(a){if(!(a.number===-2147467259))throw a}b("Event").listen(window,"popstate",function(a){var c=a&&a.state&&typeof a.state==="string";c&&g.lastURI!=a.state&&(g.lastURI=a.state,g.lastChanged=Date.now(),g.notify(new(b("URI"))(a.state).getUnqualifiedURI().toString()))}.bind(g));(b("UserAgent_DEPRECATED").webkit()<534||b("UserAgent_DEPRECATED").chrome()<=13)&&(b("setIntervalAcrossTransitions")(g.checkURI,42),g._updateRefererURI(this.lastURI));return g}g._updateRefererURI(b("URI").getRequestURI(!1));if(b("UserAgent_DEPRECATED").webkit()<500||b("UserAgent_DEPRECATED").firefox()<2){g.enabled=!1;return g}"onhashchange"in window?b("Event").listen(window,"hashchange",function(){window.setTimeout(g.checkURI.bind(g),0)}):b("setIntervalAcrossTransitions")(g.checkURI,42);return g},registerURIHandler:function(a){g.callbacks.push(a);return g},setCanonicalLocation:function(a){g.canonical=new(b("URI"))(a);return g},notify:function(a){a==g.orig_fragment&&(a=g.canonical.getFragment());for(var b=0;b<g.callbacks.length;b++)try{if(g.callbacks[b](a))return!0}catch(a){}return!1},checkURI:function(){__p&&__p();if(Date.now()-g.lastChanged<400)return;if(window.history&&history.pushState){var a=new(b("URI"))(document.URL).removeQueryData("ref").toString(),c=new(b("URI"))(g.lastURI).removeQueryData("ref").toString();a!=c&&(g.lastChanged=Date.now(),g.lastURI=a,b("UserAgent_DEPRECATED").webkit()<534&&g._updateRefererURI(a),g.notify(new(b("URI"))(a).getUnqualifiedURI().toString()));return}if(b("UserAgent_DEPRECATED").webkit()&&window.history.length==200){g.warned||(g.warned=!0);return}c=new(b("URI"))(window.location.href).getFragment();c.charAt(0)=="!"&&(c=c.substr(1));c=c.replace(/%23/g,"#");if(c!=g.fragment.replace(/%23/g,"#")){g.debug([c," vs ",g.fragment,"whl: ",window.history.length,"QHL: ",g.history.length].join(" "));for(var a=g.history.length-1;a>=0;--a)if(g.history[a].getFragment().replace(/%23/g,"#")==c)break;++g.user;a>=0?g.go(a-g.current):g.go("#"+c);--g.user}},_updateRefererURI:function(a){a instanceof b("URI")&&(a=a.toString()),b("XReferer").update(a,null,!0)},go:function(a,c,d){__p&&__p();if(window.history&&history.pushState){c||typeof a==="number";var e=new(b("URI"))(a).removeQueryData(["ref","messaging_source","ajaxpipe_fetch_stream","fb_dtsg_ag",b("SprinkleConfig").param_name]).toString();g.lastChanged=Date.now();this.lastURI=e;d?window.history.replaceState(a,null,e):window.history.pushState(a,null,e);b("UserAgent_DEPRECATED").webkit()<534&&g._updateRefererURI(a);return!1}g.debug("go: "+a);c===void 0&&(c=!0);if(!g.enabled&&!c)return!1;if(typeof a==="number"){if(!a)return!1;e=a+g.current;var f=Math.max(0,Math.min(g.history.length-1,e));g.current=f;e=g.history[f].getFragment()||g.orig_fragment;e=new(b("URI"))(e).removeQueryData("ref").getUnqualifiedURI().toString();g.fragment=e;g.lastChanged=Date.now();g.user||b("goOrReplace")(window.location,window.location.href.split("#")[0]+"#!"+e,d);c&&g.notify(e);g._updateRefererURI(e);return!1}a=new(b("URI"))(a);a.getDomain()==new(b("URI"))(window.location.href).getDomain()&&(a=new(b("URI"))("#"+a.getUnqualifiedURI()));f=g.history[g.current].getFragment();e=a.getFragment();if(e==f||f==g.orig_fragment&&e==g.canonical.getFragment()){c&&g.notify(e);g._updateRefererURI(e);return!1}d&&g.current--;f=g.history.length-g.current-1;g.history.splice(g.current+1,f);g.history.push(new(b("URI"))(a));return g.go(1,c,d)},getCurrentFragment:function(){var a=b("URI").getRequestURI(!1).getFragment();return a==g.orig_fragment?g.canonical.getFragment():a}};e.exports=g}),null);
__d("QuickPerformanceLogger",["requireCond","cr:684019"],(function(a,b,c,d,e,f){"use strict";e.exports=b("cr:684019")}),null);
__d("RelayQuickLogModule",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({GROUPS_INIT_FETCH_TIME:7995393,LOAD_ALL_PROJECTS_AIP:7995408,NETWORK_FETCH_QUERY:7995401,NETWORK_FETCH_QUERY_NATIVE:7995405,PREFETCHER_FETCH_QUERY:7995395,RELAY_PLAYGROUND_TTI:7995394,RESPONSE_NORMALIZER_NORMALIZE:7995404,RESPONSE_NORMALIZER_NORMALIZE_NATIVE:7995406,RESPONSE_NORMALIZER_NORMALIZE_WWW:7995409,RUNTIME_GC:7995402,RUNTIME_GC_NATIVE:7995407,RUNTIME_NOTIFY:7995403,RUNTIME_SUBSCRIPTIONS:7995400,UNSAFE_ASYNC_TEST:7995399,UNSAFE_SUBSCRIPTIONS_TEST:7995396,UNSAFE_SYNC_TEST:7995398,UNSAFE_TESTING_NATIVE:7995397})}),null);
__d("RelayUniversalLogger",["QuickPerformanceLogger","RelayQuickLogModule","emptyFunction","warning"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a,c){b("QuickPerformanceLogger").markerStart(b("RelayQuickLogModule").RUNTIME_SUBSCRIPTIONS),c(),b("QuickPerformanceLogger").markerEnd(b("RelayQuickLogModule").RUNTIME_SUBSCRIPTIONS,"SUCCESS")}var g=0;function c(a,c){__p&&__p();if(!c){b("warning")(!1,"RelayFBUniversalLogger: State missing");return b("emptyFunction")}var d=c;g+=1;var e=g;b("QuickPerformanceLogger").markerStart(b("RelayQuickLogModule").NETWORK_FETCH_QUERY,e);return function(a){var c=d.queryName,f=d.usedCache,g=d.usedPrefetcher;c&&b("QuickPerformanceLogger").annotateMarkerString(b("RelayQuickLogModule").NETWORK_FETCH_QUERY,"QUERY_NAME",c,e);typeof f==="boolean"&&b("QuickPerformanceLogger").annotateMarkerInt(b("RelayQuickLogModule").NETWORK_FETCH_QUERY,"USED_CACHE",f?1:0,e);typeof g==="boolean"&&b("QuickPerformanceLogger").annotateMarkerInt(b("RelayQuickLogModule").NETWORK_FETCH_QUERY,"USED_PREFETCHER",g?1:0,e);a&&b("QuickPerformanceLogger").annotateMarkerString(b("RelayQuickLogModule").NETWORK_FETCH_QUERY,"ERROR",a.message,e);b("QuickPerformanceLogger").markerEnd(b("RelayQuickLogModule").NETWORK_FETCH_QUERY,a?"FAIL":"SUCCESS",e)}}function d(a,c){b("QuickPerformanceLogger").markerStart(b("RelayQuickLogModule").RUNTIME_GC),c(),b("QuickPerformanceLogger").markerEnd(b("RelayQuickLogModule").RUNTIME_GC,"SUCCESS")}function f(a,c){b("QuickPerformanceLogger").markerStart(b("RelayQuickLogModule").RESPONSE_NORMALIZER_NORMALIZE),c(),b("QuickPerformanceLogger").markerEnd(b("RelayQuickLogModule").RESPONSE_NORMALIZER_NORMALIZE,"SUCCESS")}e.exports={gcAggregateHandler:d,startProfileFetchRelayQueryHandler:c,responseNormalizerAggregateHandler:f,subscriptionAggregateHandler:a}}),null);
__d("installRelayUniversalLogger",["RelayRuntime","RelayUniversalLogger"],(function(a,b,c,d,e,f){"use strict";var g=b("RelayRuntime").RelayProfiler,h=b("RelayUniversalLogger").gcAggregateHandler,i=b("RelayUniversalLogger").responseNormalizerAggregateHandler,j=b("RelayUniversalLogger").startProfileFetchRelayQueryHandler,k=b("RelayUniversalLogger").subscriptionAggregateHandler;function a(){g.attachAggregateHandler("RelayModernStore.prototype.subscribe",k),g.attachProfileHandler("fetchRelayQuery",j),g.attachAggregateHandler("RelayModernStore.prototype.__gc",h),g.attachAggregateHandler("RelayResponseNormalizer.normalize",i)}e.exports=a}),null);
__d("LoadObjectOperations",["keyMirror"],(function(a,b,c,d,e,f){"use strict";a=b("keyMirror")({CREATING:null,DELETING:null,LOADING:null,UPDATING:null});e.exports=a}),null);
__d("LoadObject",["invariant","LoadObjectOperations","immutable","nullthrows","shallowEqual"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h;a=[void 0,null,!1,!0,0,""];var i=function(a,c){return Object.is(a,c)||b("immutable").is(a,c)},j="SECRET_"+Math.random(),k=new Map(new Map(a.map(function(a){return[a,new Map([[!0,new Map()],[!1,new Map()]])]})));c=b("immutable").Record({operation:void 0,value:void 0,error:void 0,internalHasValue:!1});d=babelHelpers.inherits(l,c);h=d&&d.prototype;function l(a,b,c,d,e){a===j||g(0,2084),h.constructor.call(this,{operation:b,value:c,error:d,internalHasValue:e})}l.$LoadObject1=function(a,b,c,d){var e=l.$LoadObject2(a,b,c,d);return e||new l(j,a,b,c,d)};l.$LoadObject2=function(a,c,d,e){if(d!==void 0||!k.has(c))return null;var f=b("nullthrows")(k.get(c));f=b("nullthrows")(f.get(e));if(!f.has(a)){c=new l(j,a,c,d,e);f.set(a,c)}return b("nullthrows")(f.get(a))};l.prototype.getOperation=function(){return this.get("operation")};l.prototype.getValue=function(){return this.get("value")};l.prototype.getValueEnforcing=function(){this.hasValue()||g(0,2085);var a=this.getValue();return a};l.prototype.getError=function(){return this.get("error")};l.prototype.getErrorEnforcing=function(){this.hasError()||g(0,2086);return this.get("error")};l.prototype.hasValue=function(){return!!this.get("internalHasValue")};l.prototype.hasOperation=function(){return this.getOperation()!==void 0};l.prototype.hasError=function(){return this.getError()!==void 0};l.prototype.isEmpty=function(){return!this.hasValue()&&!this.hasOperation()&&!this.hasError()};l.prototype.setOperation=function(a){var b=l.$LoadObject2(a,this.getValue(),this.getError(),this.hasValue());return b||this.set("operation",a)};l.prototype.setValue=function(a){var b=l.$LoadObject2(this.getOperation(),a,this.getError(),!0);return b||this.set("value",a).set("internalHasValue",!0)};l.prototype.setError=function(a){var b=l.$LoadObject2(this.getOperation(),this.getValue(),a,this.hasValue());return b||this.set("error",a)};l.prototype.removeOperation=function(){var a=this.remove("operation"),b=l.$LoadObject2(a.getOperation(),a.getValue(),a.getError(),a.hasValue());return b||a};l.prototype.removeValue=function(){var a=this.remove("value").remove("internalHasValue"),b=l.$LoadObject2(a.getOperation(),a.getValue(),a.getError(),a.hasValue());return b||a};l.prototype.removeError=function(){var a=this.remove("error"),b=l.$LoadObject2(a.getOperation(),a.getValue(),a.getError(),a.hasValue());return b||a};l.prototype.isCreating=function(){return this.getOperation()===b("LoadObjectOperations").CREATING};l.prototype.isDeleting=function(){return this.getOperation()===b("LoadObjectOperations").DELETING};l.prototype.isDone=function(){return!this.hasOperation()};l.prototype.isLoading=function(){return this.getOperation()===b("LoadObjectOperations").LOADING};l.prototype.isLoadingOrEmpty=function(){return this.isLoading()||this.isEmpty()};l.prototype.isUpdating=function(){return this.getOperation()===b("LoadObjectOperations").UPDATING};l.prototype.creating=function(){return this.setOperation(b("LoadObjectOperations").CREATING)};l.prototype.deleting=function(){return this.setOperation(b("LoadObjectOperations").DELETING)};l.prototype.done=function(){return this.removeOperation()};l.prototype.loading=function(){return this.setOperation(b("LoadObjectOperations").LOADING)};l.prototype.updating=function(){return this.setOperation(b("LoadObjectOperations").UPDATING)};l.prototype.map=function(a){if(!this.hasValue())return this;var b=this.getValueEnforcing();a=a(b);return a instanceof l?a:this.setValue(a)};l.prototype.mapValue=function(a){__p&&__p();if(!this.hasValue())return this;var b=this.getValueEnforcing();a=a(b);if(a instanceof l){!a.hasError()&&this.hasError()&&(a=a.setError(this.getErrorEnforcing()));!a.hasOperation()&&this.hasOperation()&&(a=a.setOperation(this.getOperation()));return a}else return this.setValue(a)};l.prototype.mapError=function(a){if(!this.hasError())return this;var b=this.getErrorEnforcing();a=a(b);return a instanceof l?a:this.setError(a)};l.prototype.match=function(a,c){if(this.hasOperation()){var d=a.loading;this.isCreating()&&a.creating?d=a.creating:this.isUpdating()&&a.updating?d=a.updating:this.isDeleting()&&a.deleting&&(d=a.deleting);return d(this.value,this.error,c)}if(this.hasError())return this.hasValue()&&a.loadedWithError?b("nullthrows")(a.loadedWithError)(this.getValueEnforcing(),this.getErrorEnforcing(),c):a.error(this.getErrorEnforcing(),c);return this.hasValue()?a.loaded(this.getValueEnforcing(),c):a.empty?a.empty(c):a.error(new Error("No value"),c)};l.prototype.equals=function(a,b){return l.equals(this,a,b)};l.prototype.shallowEquals=function(a){return l.equals(this,a,b("shallowEqual"))};l.equals=function(a,b,c){__p&&__p();var d=a===b;if(!a||!b||d)return d;if(a.getOperation()!==b.getOperation()||a.hasError()!==b.hasError()||a.hasValue()!==b.hasValue())return!1;if(a.hasError()&&b.hasError()&&a.getError()===b.getError())return!0;d=a.getValue();a=b.getValue();if(!d||!a)return d===a;c=(b=c)!=null?b:i;return c(d,a)};l.shallowEquals=function(a,c){return l.equals(a,c,b("shallowEqual"))};l.creating=function(){return l.$LoadObject1(b("LoadObjectOperations").CREATING,void 0,void 0,!1)};l.deleting=function(){return l.$LoadObject1(b("LoadObjectOperations").DELETING,void 0,void 0,!1)};l.empty=function(){return l.$LoadObject1(void 0,void 0,void 0,!1)};l.loading=function(){return l.$LoadObject1(b("LoadObjectOperations").LOADING,void 0,void 0,!1)};l.updating=function(){return l.$LoadObject1(b("LoadObjectOperations").UPDATING,void 0,void 0,!1)};l.withError=function(a){return l.$LoadObject1(void 0,void 0,a,!1)};l.withValue=function(a){return l.$LoadObject1(void 0,a,void 0,!0)};e.exports=l}),null);
__d("PerfXSharedFields",[],(function(a,b,c,d,e,f){var g={addCommonValues:function(a){navigator&&navigator.hardwareConcurrency!==void 0&&(a.num_cores=navigator.hardwareConcurrency);navigator&&navigator.deviceMemory&&(a.ram_gb=navigator.deviceMemory);navigator&&navigator.connection&&(typeof navigator.connection.downlink==="number"&&(a.downlink_megabits=navigator.connection.downlink),typeof navigator.connection.effectiveType==="string"&&(a.effective_connection_type=navigator.connection.effectiveType),typeof navigator.connection.rtt==="number"&&(a.rtt_ms=navigator.connection.rtt));return a},getCommonData:function(){var a={};g.addCommonValues(a);return a}};e.exports=g}),null);
__d("QuickLogConfigHelper",["QuickLogConfig"],(function(a,b,c,d,e,f){a.prototype.getEventDetails=function(a){"use strict";var c=null;b("QuickLogConfig").qpl_events?c=b("QuickLogConfig").qpl_events[a]:b("QuickLogConfig").qpl_events_static&&(c=b("QuickLogConfig").qpl_events_static[a]);return c};function a(){"use strict"}e.exports=new a()}),null);
__d("QuickPerformanceLoggerBase",["Arbiter","Banzai","Bootloader","Env","PerfXSharedFields","QuickLogConfig","QuickLogConfigHelper","Random","gkx","performanceAbsoluteNow","performanceNavigationStart","requireCond","cr:682175"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("performanceAbsoluteNow")();function a(a){a===void 0&&(a={}),this.$1={},this.$2={},this.$3=100,this.loomProviderId="QPL",this.$4=a,b("cr:682175")&&b("cr:682175").addProvider(this)}a.prototype.$7=function(a,c){if(b("QuickLogConfig").killswitch)return null;a=this.$1[a];if(!a)return null;a=a[c];return!a?null:a};a.prototype.markerStart=function(a,c,d){__p&&__p();c===void 0&&(c=0);d===void 0&&(d=this.currentTimestamp());if(b("QuickLogConfig").killswitch)return;var e=b("QuickLogConfigHelper").getEventDetails(a);if(!e)return;if(b("cr:682175")&&!this.$5){var f=a+"_"+c,g=new Set(["QPL","AsyncProfiler"]);b("cr:682175").startTrace(f,"QPL",g)}this.$5&&this.$5.buffer.addEvent({type:"QPL_START",action:"START",markerId:a,instanceKey:c},d);f=this.$6===a?1:this.$2[a]||e.sampleRate||this.$3;g=b("Env").enable_qplinspector||b("Random").coinflip(f);e=this.$1[a];e||(this.$1[a]={});this.$1[a][c]={passesSampling:g,timestamp:d,sampleRate:f,points:{}};if(g){e=this.$4.onMarkerStart;e&&e(a,c,d)}};a.prototype.markerStartFromNavStart=function(a,c){c===void 0&&(c=0);var d=b("performanceNavigationStart")();this.markerStart(a,c,d);if(b("performanceNavigationStart").isPolyfilled){d=this.$7(a,c);d&&(d.timestampIsApproximate=!0)}};a.prototype.annotateMarkerString=function(a,b,c,d){d===void 0&&(d=0);var e=this.$7(a,d);if(!e)return;var f=this.$5;f&&f.buffer.addEvent({type:"QPL_ANNOTATION",markerId:a,instanceKey:d,annotationKey:b,annotationValue:c},e.timestamp);f=e.annotations||{};f[b]=c;e.annotations=f};a.prototype.annotateMarkerStringArray=function(a,b,c,d){d===void 0&&(d=0);var e=this.$7(a,d);if(!e)return;var f=this.$5;f&&f.buffer.addEvent({type:"QPL_ANNOTATION",markerId:a,instanceKey:d,annotationKey:b,annotationValue:c},e.timestamp);f=e.annotationsStringArray||{};f[b]=c;e.annotationsStringArray=f};a.prototype.annotateMarkerInt=function(a,b,c,d){d===void 0&&(d=0);var e=this.$7(a,d);if(!e)return;var f=this.$5;f&&f.buffer.addEvent({type:"QPL_ANNOTATION",markerId:a,instanceKey:d,annotationKey:b,annotationValue:c},e.timestamp);f=e.annotationsInt||{};f[b]=c;e.annotationsInt=f};a.prototype.annotateMarkerIntArray=function(a,b,c,d){d===void 0&&(d=0);var e=this.$7(a,d);if(!e)return;var f=this.$5;f&&f.buffer.addEvent({type:"QPL_ANNOTATION",markerId:a,instanceKey:d,annotationKey:b,annotationValue:c},e.timestamp);f=e.annotationsIntArray||{};f[b]=c;e.annotationsIntArray=f};a.prototype.annotateMarkerDouble=function(a,b,c,d){d===void 0&&(d=0);var e=this.$7(a,d);if(!e)return;var f=this.$5;f&&f.buffer.addEvent({type:"QPL_ANNOTATION",markerId:a,instanceKey:d,annotationKey:b,annotationValue:c},e.timestamp);f=e.annotationsDouble||{};f[b]=c;e.annotationsDouble=f};a.prototype.annotateMarkerDoubleArray=function(a,b,c,d){d===void 0&&(d=0);var e=this.$7(a,d);if(!e)return;var f=this.$5;f&&f.buffer.addEvent({type:"QPL_ANNOTATION",markerId:a,instanceKey:d,annotationKey:b,annotationValue:c},e.timestamp);f=e.annotationsDoubleArray||{};f[b]=c;e.annotationsDoubleArray=f};a.prototype.markerPoint=function(a,b,c,d,e){d===void 0&&(d=0);e===void 0&&(e=this.currentTimestamp());var f=this.$7(a,d);if(!f)return;f.points[b]={data:c,timeSinceStart:e-f.timestamp};f=this.$5;f&&f.buffer.addEvent({type:"QPL_POINT",markerId:a,instanceKey:d,name:b,data:c},e)};a.prototype.markerEnd=function(a,c,d,e){__p&&__p();d===void 0&&(d=0);e===void 0&&(e=this.currentTimestamp());var f=Date.now(),h=b("QuickLogConfigHelper").getEventDetails(a);if(!h)return;var i=this.$5;if(i){i.buffer.addEvent({type:"QPL_END",action:c,markerId:a,instanceKey:d},e);var j=a+"_"+d;b("cr:682175")&&i.triggerId===j&&b("cr:682175").endTraceWithTimeout(j,3e4)}i=this.$7(a,d);if(!i)return;if(i.passesSampling){j=this.$4.onMarkerEnd;j&&j(a,d,e);j=e-i.timestamp;f=f-j;var k=i.points;this.$8({event_is_intermediate_marker:"false",instance_id:d,quicklog_module:h.moduleName,quicklog_event:h.name,quicklog_action:c,sample_rate:i.sampleRate,trace_tags:"",value:i.timestampIsApproximate?null:j,annotations:i.annotations,annotations_double:i.annotationsDouble,annotations_double_array:i.annotationsDoubleArray,annotations_int:i.annotationsInt,annotations_int_array:i.annotationsIntArray,annotations_string_array:i.annotationsStringArray,points:Object.keys(k).map(function(a){return{data:k[a].data,name:a,timeSinceStart:k[a].timeSinceStart}}),metadata:{application_analytics:{time_since_qpl_module_init:e-g}}},f);this.$6===a&&(console.timeStamp("QPLDebug MarkerEnd, "+this.currentTimestamp()+", "+f+", "+j),b("Arbiter").inform("qpl_debugger_finished"))}delete this.$1[a][d]};a.prototype.markerDrop=function(a,b){b===void 0&&(b=0);a=this.$1[a];a&&delete a[b]};a.prototype.dropAllMarkers=function(){this.$1={}};a.prototype.setAlwaysOnSampleRate=function(a,b){this.$2[a]=b};a.prototype.setSampleRateForInstance=function(a,b,c){c===void 0&&(c=0);a=this.$1[a][c];a&&(a.sampleRate=b)};a.prototype.currentTimestamp=function(){return b("performanceAbsoluteNow")()};a.prototype.$8=function(a,c){a=this.$9(a);var d=this.$10(a,c);b("Env").enable_qplinspector&&b("Bootloader").loadModules(["QPLInspector"],function(a){a.appendLog(d)},"QuickPerformanceLoggerBase");b("gkx")("708253")?b("Banzai").post("perf",d,b("Banzai").VITAL):b("Banzai").post("perf",d)};a.prototype.$9=function(a){var c=b("PerfXSharedFields").getCommonData();a.metadata=babelHelpers["extends"]({},a.metadata,{memory_stats:{total_mem:c.ram_gb?c.ram_gb*1073741824:null},network_stats:{downlink_megabits:c.downlink_megabits,network_subtype:c.effective_connection_type,rtt_ms:c.rtt_ms}});return a};a.prototype.$10=function(a,b){b=Math.floor(b/1e3);return{appversion:"0 (web)",clienttime:b,rawclienttime:b,deviceid:"0",extra:a}};a.prototype.loomTraceDidBegin=function(a){this.$5=a};a.prototype.loomTraceWillEnd=function(){this.$5=null};a.prototype.enableDebug=function(a){this.$6=parseInt(a,10)};a.prototype.disableDebug=function(){this.$6=null};e.exports=a}),null);
__d("QuickPerformanceLoggerImpl",["EventProfiler","QuickLogConfig","QuickPerformanceLoggerBase"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g,h={},i={onMarkerStart:function(a,c,d){var e=b("QuickLogConfig").qpl_to_interaction[a];if(e){a=a+" : "+c;h[a]=b("EventProfiler").markManualStart([e.name],e.eventType,d)}},onMarkerEnd:function(a,b,c){a=a+" : "+b;h[a]&&h[a].markManualEnd(c)}};c=babelHelpers.inherits(a,b("QuickPerformanceLoggerBase"));g=c&&c.prototype;function a(){g.constructor.call(this,i)}e.exports=new a()}),null);