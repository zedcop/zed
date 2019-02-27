if (self.CavalryLogger) { CavalryLogger.start_js(["KDgov"]); }

__d("CookieBannerComponent",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({BANNER:"banner",CLOSE_BUTTON:"close_button"})}),null);
__d("CookieConsentBlacklist",["CookieBannerComponent","Parent"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a={isBlacklisted:function(a){__p&&__p();a=a;if(!this.hasCookieBanner())return!0;var c=b("Parent").byAttribute(a,"data-cookiebanner");if(c){c=c.getAttribute("data-cookiebanner");switch(c){case b("CookieBannerComponent").CLOSE_BUTTON:return!1;case b("CookieBannerComponent").BANNER:return!0}}c=b("Parent").byAttribute(a,"data-nocookies");if(c)return!0;a.tagName.toLowerCase()!=="a"&&(a=b("Parent").byTag(a,"a"));if(a instanceof HTMLAnchorElement&&typeof a.href==="string"){c=a.href;for(var a=0;a<this.blacklistedHrefs.length;a++)if(c.indexOf(this.blacklistedHrefs[a])>-1)return!0}return!1},blacklistedHrefs:["/about/basics","/ads/settings","/help/111814505650678","/help/1561485474074139","/help/568137493302217","/help/769828729705201","/help/cookies","/policies/cookies","/policy/cookies","/privacy/explanation"],hasCookieBanner:function(){var a=document.querySelectorAll('[data-cookiebanner="'+b("CookieBannerComponent").BANNER+'"]');return a.length>0}};e.exports=a}),null);
__d("XConsentCookieController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/cookie/consent/",{})}),null);
__d("DeferredCookie",["Cookie","CookieConsentBlacklist","Env","SubscriptionList","XAsyncRequest","XConsentCookieController"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=new Map();a={shouldAddDefaultListener:!0,defaultHandler:null,autoFlushCookies:!1,sentConsentToServer:!1,callbacks:new(b("SubscriptionList"))(),addToQueue:function(a,c,d,e,f,h,i){if(this.autoFlushCookies){f?b("Cookie").setWithoutChecksIfFirstPartyContext(a,c,d,e,i):b("Cookie").setWithoutChecks(a,c,d,e,i);return}if(g.has(a))return;g.set(a,{name:a,value:c,nMilliSecs:d,path:e,firstPartyOnly:f,secure:i});h&&this.addDefaultInteractionListener()},flushAllCookiesWithoutRequestingConsentSeePrivacyXFNBeforeUsing:function(){delete b("Env").defer_cookies,g.forEach(function(a,c){a.firstPartyOnly?b("Cookie").setWithoutChecksIfFirstPartyContext(a.name,a.value,a.nMilliSecs,a.path,a.secure):b("Cookie").setWithoutChecks(a.name,a.value,a.nMilliSecs,a.path,a.secure)}),this.autoFlushCookies=!0,this.callbacks.fireCallbacks(),g=new Map(),this.removeDefaultInteractionListener()},flushAllCookies:function(){this.flushAllCookiesWithoutRequestingConsentSeePrivacyXFNBeforeUsing();if(!this.sentConsentToServer){this.sentConsentToServer=!0;var a=b("XConsentCookieController").getURIBuilder().getURI();new(b("XAsyncRequest"))(a).send()}},removeDefaultInteractionListener:function(){this.shouldAddDefaultListener=!1,this.defaultHandler&&(window.removeEventListener?window.removeEventListener("click",this.defaultHandler,!0):document.detachEvent&&document.detachEvent("onclick",this.defaultHandler),this.defaultHandler=null)},addDefaultInteractionListener:function(){this.shouldAddDefaultListener&&(this.shouldAddDefaultListener=!1,this.defaultHandler=this.baseInteractionHandler.bind(this),window.addEventListener?window.addEventListener("click",this.defaultHandler,!0):document.attachEvent&&document.attachEvent("onclick",this.defaultHandler))},registerCallbackOnCookieFlush:function(a){this.autoFlushCookies?a():this.callbacks.add(a)},baseInteractionHandler:function(a){var c=a.target;if(!(c instanceof HTMLElement))return;if(a instanceof MouseEvent&&!this.isValidClick(a))return;b("CookieConsentBlacklist").isBlacklisted(c)||this.flushAllCookies()},isValidClick:function(a){return a.which===void 0?!0:a.which==1},canEmbedThirdPartyPixel:function(){return b("Env").no_cookies===!0||b("Env").defer_cookies===!0?!1:this.autoFlushCookies||g.size===0}};e.exports=a}),null);
__d("XRefererFrameController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/common/referer_frame.php",{})}),null);
__d("isDevelopersURI",["isFacebookURI"],(function(a,b,c,d,e,f){"use strict";function a(a){return b("isFacebookURI")(a)&&a.getSubdomain()==="developers"}e.exports=a}),null);
__d("ControlledReferer",["Bootloader","DeferredCookie","URI","UserAgent","XRefererFrameController","isBonfireURI","isDevelopersURI","isMessengerDotComURI","isOculusDotComURI","isWorkplaceDotComURI","lowerFacebookDomain"],(function(a,b,c,d,e,f){__p&&__p();var g={useFacebookReferer:function(a,c,d){__p&&__p();if(!b("DeferredCookie").canEmbedThirdPartyPixel()){b("Bootloader").loadModules(["BanzaiODS"],function(a){a.bumpEntityKey("defer_cookies","block_controlled_referer_iframe")},"ControlledReferer");return}var e=!1;function f(){if(e)return;var b=a.contentWindow.location.pathname;if(b!=="/intern/common/referer_frame.php"&&b!=="/common/referer_frame.php")return;e=!0;a.contentWindow.document.body.style.margin=0;c()}var g;b("isMessengerDotComURI")(b("URI").getRequestURI())||b("isBonfireURI")(b("URI").getRequestURI())?g=b("XRefererFrameController").getURIBuilder().getURI().toString():b("isOculusDotComURI")(b("URI").getRequestURI())?g="/common/referer_frame.php":!b("lowerFacebookDomain").isValidDocumentDomain()?g="/intern/common/referer_frame.php":b("UserAgent").isBrowser("Opera")&&!b("isDevelopersURI")(b("URI").getRequestURI())?g=b("XRefererFrameController").getURIBuilder().getURI().toString():g=b("XRefererFrameController").getURIBuilder().getURI().qualify().setProtocol("https").setSubdomain("staticxx").toString();d==null&&b("isWorkplaceDotComURI")(b("URI").getRequestURI())&&(d="workplace");d&&(g+="?fb_source="+d);a.onload=f;a.src=g},useFacebookRefererHtml:function(a,b,c){g.useFacebookReferer(a,function(){a.contentWindow.document.body.innerHTML=b},c)}};e.exports=g}),null);
__d("TrackingPixel",["Arbiter","ControlledReferer","DeferredCookie","FBLogger"],(function(a,b,c,d,e,f){__p&&__p();var g={_iframe:void 0,loadWithNoReferrer:function(a){__p&&__p();if(!b("DeferredCookie").canEmbedThirdPartyPixel()){b("FBLogger")("tracking_pixel").mustfix("Attempting to load a TrackingPixel (%s) while cookies are deferred. This is not allowed because tracking pixels sometimes set cookies.",a);return}if(!g._iframe){var c=document.createElement("iframe");c.frameborder=0;c.width=c.height=1;c.style.position="absolute";c.style.top="-10px";b("ControlledReferer").useFacebookReferer(c,function(){b("Arbiter").inform("TrackingPixel/iframeIsLoaded",null,"persistent")},null);document.body.appendChild(c);g._iframe=c}b("Arbiter").subscribe("TrackingPixel/iframeIsLoaded",function(){var b=g._iframe.contentWindow;b=new b.Image();b.src=a})}};e.exports=g}),null);
__d("DesktopHscrollUnitEventConstants",[],(function(a,b,c,d,e,f){e.exports={HSCROLL_ITEM_INSERTED_EVENT:"DesktopHScrollUnit/itemInserted",HSCROLL_ITEM_SHOWN_EVENT:"DesktopHScrollUnit/itemShown",HSCROLL_ITEM_HIDE_EVENT:"DesktopHScrollUnit/HideIndividualItem",HSCROLL_ITEM_SCROLL_BEFORE_XOUT_EVENT:"DesktopHScrollUnit/scrollItemBeforeXout",HSCROLL_ITEM_UNHIDE_EVENT:"DesktopHScrollUnit/unhideIndividualItem",HSCROLL_LAST_ITEM_NFX_ACTION_TAKEN:"logLastAdXout",HSCROLL_PAGER_ITEM_HIDE_EVENT:"onXoutIndividualItem"}}),null);
__d("IntlControllerSpecialCharEncodings",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({NON_BREAKING_SPACE:"&nbsp;"})}),null);
__d("LocaleSwitchingReferrers",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CARRY_LOGOUT_LOGIN:"carry_logout_login",COMMUNITY_SITE_TRANSLATION_TOGGLE:"community_site_translation_toggle",FB4B_GLOBAL_SITES_DIALOG:"fb4b_global_sites_dialog",FB4B_GLOBAL_SITES_FOOTER:"fb4b_global_sites_footer",FB4C_GLOBAL_SITE_FOOTER:"fb4c_global_site_footer",IGB_GLOBAL_SITES_FOOTER:"igb_global_sites_footer",WORKPLACE_MARKETING_FOOTER:"workplace_marketing_footer",IG_HC_FOOTER:"ig_hc_footer",LOCALE_SWITCH_SCRIPT:"locale_switch_script",M_TOUCH_LOCALE_SELECTOR:"m_touch_locale_selector",M_BASIC_LOCALE_FOOTER:"m_basic_locale_footer",MEDIA_PORTAL_V3_DIALOG:"media_portal_v3_dialog",MOBILE_ACCOUNT_SETTINGS:"mobile_account_settings",MOBILE_CHROME_JP_FOOTER:"mobile_chrome_jp_footer",MOBILE_FB4B_GLOBAL_SITES_FOOTER:"mobile_fb4b_global_sites_footer",MOBILE_FB4B_GLOBAL_SITES_PAGE_VIEW:"mobile_fb4b_global_sites_page_view",MOBILE_HELP_CENTER_SEARCH:"mobile_help_center_search",MOBILE_LOCALE_CHANGED_NOTICE:"mobile_locale_changed_notice",MOBILE_LOCALE_LINKS:"mobile_locale_links",MOBILE_SUGGESTED_LOCALE_SELECTOR:"mobile_suggested_locale_selector",MOBILE_SWITCH_LANGUAGE_HEADER:"mobile_switch_language_header",SAFETY_CENTER_GLOBAL_SITES_FOOTER:"fbsc_global_sites_footer",SITEMAP:"sitemap",QP_PROMO:"qp_promo",RLX_QP_FORCE_SWITCH:"rlx_qp_force_switch",RLX_QP_PROMPT_SWITCH:"rlx_qp_prompt_switch",RLX_PROMPTED_SWITCH_FOLLOWUP_NOTICE:"rlx_prompted_switch_followup_notice",RLX_QP_MULTI_LANGUAGE:"rlx_qp_multi_language",WWW_ACCOUNT_SETTINGS:"www_account_settings",WWW_CARD_SELECTOR:"www_card_selector",WWW_CARD_SELECTOR_MORE:"www_card_selector_more",WWW_DEV_SITE:"www_dev_site",WWW_HELP_INLINE_SELECTOR:"www_help_inline_selector",WWW_I18N_NUB:"www_i18n_nub",WWW_LANGUAGE_PAGE:"www_language_page",WWW_LINK_DIALOG_SELECTOR:"www_link_dialog_selector",WWW_LIST_SELECTOR:"www_list_selector",WWW_LIST_SELECTOR_MORE:"www_list_selector_more",WWW_MANDATORY_LOCALE_SELECTION_POST:"www_mandatory_locale_selection_post",WWW_TRANS_APP_INCONSISTENT:"www_trans_app_inconsistent",FBCOLUMN_FOOTER:"fbcolumn_footer",WWW_LOGIN_BLUE_BAR:"www_login_blue_bar_nub",UNIT_TEST:"unit_test",ACCOUNT_CREATOR:"account_creator",AT_WORK_ACCOUNT:"at_work_account_creator",ADMIN_TOOL:"admin_tool",TRANSLATION_APP_UNINSTALL:"translation_app_uninstall",CHECKPOINT:"checkpoint",LEGACY_CONTROLLER:"legacy_controller",AYMT:"aymt",UNKNOWN:"unknown"})}),null);
__d("LoggedOutSwitchingLocaleTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.$1={}}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:LoggedOutSwitchingLocaleLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:LoggedOutSwitchingLocaleLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:LoggedOutSwitchingLocaleLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setIndex=function(a){this.$1.index=a;return this};a.prototype.setNewLocale=function(a){this.$1.new_locale=a;return this};a.prototype.setOldLocale=function(a){this.$1.old_locale=a;return this};a.prototype.setReferrer=function(a){this.$1.referrer=a;return this};a.prototype.setTime=function(a){this.$1.time=a;return this};a.prototype.setWeight=function(a){this.$1.weight=a;return this};c={index:!0,new_locale:!0,old_locale:!0,referrer:!0,time:!0,weight:!0};e.exports=a}),null);
__d("XIntlAccountSetLocaleAsyncController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/intl/ajax/save_locale/",{loc:{type:"String"},href:{type:"String"},index:{type:"Int"},ref:{type:"String"},ls_ref:{type:"Enum",defaultValue:"unknown",enumType:1},should_redirect:{type:"Bool",defaultValue:!0}})}),null);
__d("IntlUtils",["AsyncRequest","Cookie","IntlControllerSpecialCharEncodings","LocaleSwitchingReferrers","LoggedOutSwitchingLocaleTypedLogger","ReloadPage","XIntlAccountSetLocaleAsyncController","goURI"],(function(a,b,c,d,e,f){__p&&__p();a={setXmode:function(a){new(b("AsyncRequest"))().setURI("/ajax/intl/save_xmode.php").setData({xmode:a}).setHandler(function(){b("ReloadPage").now()}).send()},encodeSpecialCharsForXController:function(a){return a.replace(new RegExp("\xa0","g"),b("IntlControllerSpecialCharEncodings").NON_BREAKING_SPACE)},decodeSpecialCharsFromXController:function(a){return a.replace(new RegExp(b("IntlControllerSpecialCharEncodings").NON_BREAKING_SPACE,"g"),"\xa0")},setAmode:function(a){new(b("AsyncRequest"))().setURI("/ajax/intl/save_xmode.php").setData({amode:a,app:!1}).setHandler(function(){b("ReloadPage").now()}).send()},setRmode:function(a){new(b("AsyncRequest"))().setURI("/ajax/intl/save_xmode.php").setData({rmode:a}).setHandler(function(){b("ReloadPage").now()}).send()},setLocale:function(a,c,d,e){d||(d=a.options[a.selectedIndex].value);e=b("XIntlAccountSetLocaleAsyncController").getURIBuilder().getURI();new(b("AsyncRequest"))().setURI(e).setData({loc:d,ref:c,should_redirect:!1}).setHandler(function(a){b("ReloadPage").now()}).send()},appendCookieLocaleHistory:function(a){__p&&__p();var c="lh",d=b("Cookie").get(c),e=[],f=5;if(d!==null&&d!==void 0&&d!=""){e=d.split(",");e.push(a);for(var d=0;d<e.length-1;d++)e[d]==e[d+1]&&e.splice(d,1);e.length>=f&&e.slice(1,f)}else e.push(a);b("Cookie").set(c,e.toString())},setCookieLocale:function(a,c,d,e,f){e===void 0&&(e=b("LocaleSwitchingReferrers").OTHER),f===void 0&&(f=null),b("Cookie").setWithoutCheckingUserConsent_DANGEROUS("locale",a),this.appendCookieLocaleHistory(a),new(b("LoggedOutSwitchingLocaleTypedLogger"))().setNewLocale(a).setOldLocale(c).setIndex(f).setReferrer(e).log(),b("goURI")(d)}};e.exports=a}),null);
__d("legacy:intl-base",["IntlUtils"],(function(a,b,c,d,e,f){a.intl_set_xmode=b("IntlUtils").setXmode,a.intl_set_amode=b("IntlUtils").setAmode,a.intl_set_rmode=b("IntlUtils").setRmode,a.intl_set_locale=b("IntlUtils").setLocale}),3);
__d("FBEngagementWhiteopsFraudSensorTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.$1={}}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:FBEngagementWhiteopsFraudSensorLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:FBEngagementWhiteopsFraudSensorLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:FBEngagementWhiteopsFraudSensorLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setInstanceID=function(a){this.$1.instance_id=a;return this};a.prototype.setPageID=function(a){this.$1.page_id=a;return this};a.prototype.setPostID=function(a){this.$1.post_id=a;return this};a.prototype.setTime=function(a){this.$1.time=a;return this};a.prototype.setTqBotDetectionProductEnum=function(a){this.$1.tq_bot_detection_product_enum=a;return this};a.prototype.setVC=function(a){this.$1.vc=a;return this};a.prototype.setWeight=function(a){this.$1.weight=a;return this};c={instance_id:!0,page_id:!0,post_id:!0,time:!0,tq_bot_detection_product_enum:!0,vc:!0,weight:!0};e.exports=a}),null);
__d("Keyframes.react",["FBLogger","Keyframes","React","createCancelableFunction","promiseDone"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;function h(a){var c=a.width;a=a.height;c={width:c||0,height:a||0};return b("React").createElement("div",{style:c})}function i(a){var c=a.width;a=a.height;return b("React").createElement(h,{width:c,height:a})}c=babelHelpers.inherits(a,b("React").Component);g=c&&c.prototype;function a(){var a,b;for(var c=arguments.length,d=new Array(c),e=0;e<c;e++)d[e]=arguments[e];return b=(a=g.constructor).call.apply(a,[this].concat(d)),this.state={error:!1,renderer:null},this.$6=function(a){this.setState({renderer:a,error:!1}),this.props.onLoad&&this.props.onLoad(a)}.bind(this),this.$7=function(a){this.setState({renderer:null,error:!0})}.bind(this),b}a.prototype.seekToProgress=function(a){this.state.renderer&&this.state.renderer.seekToProgress(a)};a.prototype.componentDidMount=function(){this.$4(this.props.source)};a.prototype.componentWillUnmount=function(){this.state.renderer&&this.state.renderer.pause(),this.$2&&this.$2.cancel(),this.$3&&this.$3.cancel()};a.prototype.componentDidUpdate=function(a,b){if(this.props.source!==a.source||this.props.projectName!==a.projectName||this.props.assetName!=null&&a.assetName!=null&&this.props.assetName!==a.assetName||a.assetID!=null&&this.props.assetID!=null&&this.props.assetID!==a.assetID)this.$4(this.props.source);else{var c=this.state.renderer;c!==b.renderer?this.$5(b.renderer,c):c&&((a.width!==this.props.width||a.height!==this.props.height)&&(c.resetDimensions(),this.props.width&&c.setWidth(this.props.width),this.props.height&&c.setHeight(this.props.height)),a.repeatCount!==this.props.repeatCount&&c.repeatCount(this.props.repeatCount),a.onError!==this.props.onError&&c.onError(this.props.onError),a.onRepeatEnd!==this.props.onRepeatEnd&&c.onRepeatEnd(this.props.onRepeatEnd),a.onProgress!==this.props.onProgress&&c.onProgress(this.props.onProgress),a.initialProgress!==this.props.initialProgress&&c.seekToProgress(this.props.initialProgress),a.playing!==this.props.playing&&(this.props.playing?c.play():(c.pause(),this.props.resetOnPause&&c.repeatCount(this.props.repeatCount).seekToProgress(this.props.initialProgress))),c.redrawIfNeeded())}};a.prototype.$5=function(a,b){if(!this.$1)return;b&&(b.onError(this.props.onError).onRepeatEnd(this.props.onRepeatEnd).onProgress(this.props.onProgress).repeatCount(this.props.repeatCount),this.props.width&&b.setWidth(this.props.width),this.props.height&&b.setHeight(this.props.height),this.props.initialProgress&&b.seekToProgress(this.props.initialProgress),this.props.playing?b.play():b.pause(),b.redrawIfNeeded());a&&b?this.$1.replaceChild(b.getElement(),a.getElement()):(a&&this.$1.removeChild(a.getElement()),b&&this.$1.appendChild(b.getElement()))};a.prototype.$8=function(a){if(a instanceof ArrayBuffer)return b("Keyframes").requestRendererFromBytes(a,this.$9());return this.props.unstable_packageIndex!=null?b("Keyframes").requestRendererFromPackage(a,this.props.unstable_packageIndex,{projectName:this.props.projectName,packageName:this.props.unstable_packageName||"__FIXME__missing_react_package_name"}):b("Keyframes").requestRenderer(a,this.$9())};a.prototype.$4=function(a){this.$2&&this.$2.cancel(),this.$3&&this.$3.cancel(),!a?this.$7():(this.$2=b("createCancelableFunction")(this.$6),this.$3=b("createCancelableFunction")(this.$7),b("promiseDone")(this.$8(a),this.$2,this.$3))};a.prototype.$9=function(){return this.props.assetID?{projectName:this.props.projectName,assetID:this.props.assetID}:{projectName:this.props.projectName,assetName:this.props.assetName||"__FIXME__missing_react_asset_name"}};a.prototype.render=function(){var a=this.props,c=a.className,d=a.height,e=a.style;a=a.width;a=this.state.renderer?null:this.state.error?this.props.errorPlaceholder||b("React").createElement(i,{width:a,height:d}):this.props.placeholder||b("React").createElement(h,{width:a,height:d});d=this.props.mutator&&this.state.renderer&&b("React").cloneElement(this.props.mutator,{__renderer:this.state.renderer});return b("React").createElement("div",{className:c,ref:function(a){return this.$1=a}.bind(this),style:babelHelpers["extends"]({display:"inline-block",lineHeight:0,fontSize:0},e)},a,d)};a.defaultProps={initialProgress:0,resetOnPause:!1,playing:!0,repeatCount:Infinity};e.exports=a}),null);
__d("UFIReactionsAnimatedKeyframesIcon.react",["Keyframes.react","React","UFIReactionsKeyframesAssets","UFIReactionTypes"],(function(a,b,c,d,e,f){__p&&__p();var g;g=babelHelpers.inherits(a,b("React").PureComponent);g&&g.prototype;a.supportsReaction=function(a){"use strict";return!!b("UFIReactionsKeyframesAssets").reactions[a]};a.prototype.render=function(){"use strict";var a=this.props,c=a.animate,d=a.className,e=a.maxSize;a=a.reactionID;var f=b("UFIReactionsKeyframesAssets").initialProgress[a]||0,g=b("UFIReactionsKeyframesAssets").reactions[a];return g?b("React").createElement(b("Keyframes.react"),{projectName:"feedback_reactions",assetName:b("UFIReactionTypes").reactions[a].name,className:d,source:g,width:e,height:e,playing:c,initialProgress:f,resetOnPause:!0}):b("React").createElement("div",{style:{width:e,height:e}})};function a(){"use strict";g.apply(this,arguments)}e.exports=a}),null);
__d("KeyframesLoop",["Run","TimeSlice","emptyFunction","performanceNow","requestAnimationFramePolyfill"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=1e3,h=new Set();function i(a){var c=b("performanceNow")();a.callback(Math.min(c-(a.previousTime||c),g));a.previousTime=c;a.framesRemaining-=1;a.framesRemaining<=0&&a.cancel()}function j(a){h.size>0&&(h.forEach(i),b("requestAnimationFramePolyfill")(j))}b("Run").onLeave(function(){h.forEach(function(a){return a.cancel()})});window.addEventListener("focus",function(){h.forEach(function(a){return a.previousTime=b("performanceNow")()-16.67})});function a(a){this.framesRemaining=Infinity,this.callback=a,this.previousTime=0}a.prototype.start=function(a){a===void 0&&(a=Infinity),this.framesRemaining=a,this.$1||(h.size===0&&b("requestAnimationFramePolyfill")(j),h.add(this),this.previousTime=b("performanceNow")(),this.$1=b("TimeSlice").getGuardedContinuation("KeyframesLoop"))};a.prototype.cancel=function(){this.$1&&(this.$1(b("emptyFunction")),this.$1=null,h["delete"](this))};a.prototype.isRunning=function(){return!!this.$1};e.exports=a}),null);
__d("UFIReactionsMenuWithAnimatedIcons.react",["cx","KeyframesEnvironment","React","UFIReactionsAnimatedKeyframesIcon.react","UFIReactionsMenuImpl.react","createCancelableFunction","joinClasses","promiseDone"],(function(a,b,c,d,e,f,g){__p&&__p();var h;c=babelHelpers.inherits(a,b("React").PureComponent);h=c&&c.prototype;function a(){var a,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return c=(a=h.constructor).call.apply(a,[this].concat(e)),this.state={allowAnimationPlayback:b("KeyframesEnvironment").hasRenderLoopBeenStableOnce()},c}a.prototype.componentDidMount=function(){"use strict";this.state.allowAnimationPlayback||(this.$1=b("createCancelableFunction")(function(){this.setState({allowAnimationPlayback:!0})}.bind(this)),b("promiseDone")(b("KeyframesEnvironment").whenRenderLoopHasBeenStableOnce(),this.$1))};a.prototype.componentWillUnmount=function(){"use strict";this.$1&&(this.$1.cancel(),this.$1=null)};a.prototype.render=function(){"use strict";var a=b("joinClasses")("_1ef3",this.props.className);return b("React").createElement(b("UFIReactionsMenuImpl.react"),babelHelpers["extends"]({allowAnimationPlayback:this.state.allowAnimationPlayback},this.props,{className:a,icon:b("UFIReactionsAnimatedKeyframesIcon.react")}),this.props.children)};e.exports=a}),null);
__d("StickyPlaceholderInput",["CSS","DOM","Event","Input","Parent","emptyFunction","getElementText"],(function(a,b,c,d,e,f){__p&&__p();function g(a){return b("Parent").byClass(a,"uiStickyPlaceholderInput")}function h(a){return b("DOM").scry(a,".placeholder")[0]}function i(a){a=a||window.event;var c=a.target||a.srcElement;if(b("DOM").isNodeOfType(c,["input","textarea"])){var d=g(c);d&&setTimeout(function(){b("CSS").conditionClass(d,"uiStickyPlaceholderEmptyInput",!c.value.length)},0)}}var j={init:function(){j.init=b("emptyFunction"),b("Event").listen(document.documentElement,{keydown:i,keyup:i,paste:i,focusout:i})},registerInput:function(a){j.init();var c=a.getAttribute("placeholder")||"";if(c.length)if(document.activeElement===a)var d=b("Event").listen(a,"blur",function(){j.manipulateInput(a,c),d.remove()});else j.manipulateInput(a,c)},manipulateInput:function(a,c){var d=b("DOM").create("div",{className:"placeholder","aria-hidden":"true"},c),e=b("DOM").create("div",{className:"uiStickyPlaceholderInput"},d);b("DOM").isNodeOfType(a,"textarea")&&b("CSS").addClass(e,"uiStickyPlaceholderTextarea");b("Event").listen(d,"click",function(){a.focus()});a.value===c&&(a.value="");a.setAttribute("placeholder","");b("DOM").replace(a,e);b("DOM").appendContent(e,a);b("CSS").conditionClass(e,"uiStickyPlaceholderEmptyInput",!a.value.length)},setPlaceholderText:function(a,c){var d=g(a);if(!d)b("Input").setPlaceholder(a,c);else{a=h(d);a&&b("DOM").setContent(a,c)}},getPlaceholderText:function(a){a=g(a);a=h(a);return a&&b("getElementText")(a)},update:function(a){var c=g(a);c&&b("CSS").conditionClass(c,"uiStickyPlaceholderEmptyInput",!a.value.length)},getVisibleText:function(a){var c=g(a);if(b("CSS").hasClass(c,"uiStickyPlaceholderEmptyInput")){c=h(c);return c&&b("getElementText")(c)}else return a.value}};e.exports=j}),null);
__d("FBSiteWhiteOps",["ControlledReferer","FBEngagementWhiteopsFraudSensorTypedLogger","Style","URI","UserAgent"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a={appendToWindow:function(a,c,d,e,f){__p&&__p();e===void 0&&(e=null);f===void 0&&(f=null);var g=window.document.body;try{var h="fbsbx-sig-iframe-detection";if(g.getElementsByClassName(h).length!==0)return;var i=window.document.createElement("iframe");b("Style").apply(i,{height:"1px",width:"1px",opacity:"0",position:"relative",zIndex:"-9999999"});i.id="fbsbx-sig-iframe-"+a;i.className=h;i.referrerPolicy="no-referrer";b("ControlledReferer").useFacebookReferer(i,function(){__p&&__p();i.sandbox="allow-scripts allow-same-origin";var g="https://s.update.fbsbx.com/2/843748/utils.html?ti="+a+"&di=facebook.com&bt="+c+"&dt=8437481520966594402012";d&&(g+="&sn="+d);e!=null&&e!==""&&(g+="&c1="+e);f!=null&&f!==""&&(g+="&c3="+f);g=new(b("URI"))(g);var h=i.contentWindow.document,j="fbsbx-sig-iframe-form-"+a,k=g.toString();g=g.getQueryData();if(b("UserAgent").isBrowser("IE")||b("UserAgent").isBrowser("Edge")||b("UserAgent").isBrowser("IE Mobile")){var l="";for(var m in g)Object.prototype.hasOwnProperty.call(g,m)&&(l+="<input "+('name="'+m+'" ')+'type="hidden" autocomplete="off" '+('value="'+g[m]+'" />'));h.body.innerHTML='<form method="GET" id='+j+">"+l+"</form>";l=h.getElementById(j);l.action=k}else{h.body.innerHTML='<form method="GET" id='+j+"></form>";l=h.getElementById(j);l.action=k;for(var n in g)if(Object.prototype.hasOwnProperty.call(g,n)){k=h.createElement("input");k.name=n;k.value=g[n];k.autocomplete="off";k.type="hidden";l.appendChild(k)}}h.body.innerHTML+='<iframe height="100%" width="100%" onload=\'document.getElementById("'+j+"\").submit()'/>;"});g.appendChild(i)}catch(a){}},log:function(a,c,d){new(b("FBEngagementWhiteopsFraudSensorTypedLogger"))().setInstanceID(a).setTqBotDetectionProductEnum(c).log()}};e.exports=a}),null);
__d("Currency",["CurrencyConfig"],(function(a,b,c,d,e,f){__p&&__p();var g=b("CurrencyConfig").allCurrenciesByCode,h={iso:"",format:"",symbol:"",offset:1,name:""};function i(a){return a!=null&&g[a]?g[a]:h}function a(a){return i(a).format}function c(a){return i(a).iso}function d(a){return i(a).name}function f(a){return i(a).offset}function j(a){return i(a).symbol}e.exports={getFormat:a,getISO:c,getName:d,getOffset:f,getSymbol:j}}),null);
__d("ads-lib-formatters",["fbt","Currency","NumberFormatConfig","intlNumUtils"],(function(a,b,c,d,e,f,g){__p&&__p();var h="USD";function i(a,b,c){a=(a=a)!=null?a:"";c=(c=c)!=null?c:"";b=b===0||b==null?a.length:b;if(a.length<=b)return a;b=b-c.length;b&&(/[\uD800-\uDFFF]/.test(a[b-1])&&(b+=1));return a.substr(0,b)+c}function a(a,b){b===void 0&&(b="");return function(c){return c==null?b:i(c,a,"...")}}function j(a,c,d,e,f){return a==="N/A"?a:b("intlNumUtils").formatNumberRaw((a=a)!=null?a:0,c,d,e,f)}function k(a){return function(b){return j(b,(b=a)!=null?b:0,",",".")}}function l(a){return function(c){return j(c,(c=a)!=null?c:0,b("NumberFormatConfig").numberDelimiter,b("NumberFormatConfig").decimalSeparator,b("NumberFormatConfig").minDigitsForThousandsSeparator)}}function c(a){return function(c){return b("intlNumUtils").formatNumberRaw((c=c)!=null?c:"0",(c=a)!=null?c:0,b("NumberFormatConfig").numberDelimiter,b("NumberFormatConfig").decimalSeparator,b("NumberFormatConfig").minDigitsForThousandsSeparator)}}function d(a,c){return function(d){return b("intlNumUtils").formatNumberWithLimitedSigFig(d,a,c)}}function e(a,c){return c?l(a):function(c){return j(c,a||0,"",b("NumberFormatConfig").decimalSeparator,b("NumberFormatConfig").minDigitsForThousandsSeparator)}}function m(a,b){var c=b===!1?1:100;return function(b){return j(b*c,a||0,",",".")+"%"}}function n(a,c){var d=c===!1?1:100;return function(c){return j(((c=c)!=null?c:0)*d,a||0,b("NumberFormatConfig").numberDelimiter,b("NumberFormatConfig").decimalSeparator)+"%"}}function o(a,c,d,e,f){__p&&__p();a===void 0&&(a=2);c===void 0&&(c=h);d===void 0&&(d=!1);var g=e(a);e=c+"-"+a+"-"+d.toString();if(!f[e]){var i=b("Currency").getFormat(c)||b("Currency").getFormat(h);a=b("Currency").getSymbol(c)||b("Currency").getSymbol(h);var j=b("Currency").getOffset(c)||b("Currency").getOffset(h);i=i.replace("{symbol}",a);f[e]=function(a){a=(a=a)!=null?a:0;d&&(a/=j);return!(a+"").match(/^\-?[\d\.,]*$/)?"N/A":i.replace("{amount}",g(a))}}return f[e]}var p={};function q(a,b,c){return o((a=a)!=null?a:0,b,c,k,p)}var r={};function s(a,b,c){return o(a,b,c,l,r)}function t(a,c){return c!=null?b("intlNumUtils").parseNumberRaw(a!=null?a+"":"",c,b("NumberFormatConfig").numberDelimiter):a!=null?b("intlNumUtils").parseNumber(a+""):null}function u(a){var b=[];a.countries&&a.countries.length&&b.push(a.countries);a.cities&&a.cities.length&&b.push(a.cities.map(function(a){return a.name}));a.zips&&a.zips.length&&b.push(a.zips.map(function(a){return a.name}));a.regions&&a.regions.length&&b.push(a.regions.map(function(a){return a.name}));return b.join("; ").replace(/,/g,", ")}function v(a,b){if(a||b){a=a||g._("All");b=b||g._("All");return a+"&ndash;"+b}return"Any"}function w(a){a=a+"";if(a==="0")return g._("All");else if(a==="1")return g._("Men");return g._("Women")}f.geoLocation=u;f.age=v;f.sex=w;f.createTextTruncator=a;f.chopString=i;f.parseNumber=t;f.formatNumber=j;f.createIntlNumberFormatter=l;f.createIntlLongNumberFormatter=c;f.createLimitedSigFigNumberFormatter=d;f.createMaybeDelimitedNumberFormatter=e;f.createIntlPercentFormatter=n;f.createIntlMoneyFormatter=s;f.createNumberFormatter=k;f.createPercentFormatter=m;f.createMoneyFormatter=q}),null);
__d("clamp",[],(function(a,b,c,d,e,f){function a(a,b,c){if(a<b)return b;return a>c?c:a}e.exports=a}),null);
__d("mod",[],(function(a,b,c,d,e,f){function a(a,b){a=a%b;a*b<0&&(a+=b);return a}e.exports=a}),null);
__d("nearlyEqualNumbers",[],(function(a,b,c,d,e,f){__p&&__p();function a(a,b){if(a===b)return!0;var c=Math.abs(a-b);if(c<Number.EPSILON)return!0;a=Math.abs(a);b=Math.abs(b);return c/(a+b)<Number.EPSILON}e.exports=a}),null);
__d("GeoCoordinatesRecord",["immutable"],(function(a,b,c,d,e,f){"use strict";var g;c=b("immutable").Record({latitude:void 0,longitude:void 0});g=babelHelpers.inherits(a,c);g&&g.prototype;function a(){g.apply(this,arguments)}e.exports=a}),null);
__d("GeoCoordinates",["GeoCoordinatesRecord","nearlyEqualNumbers"],(function(a,b,c,d,e,f){"use strict";var g;c=babelHelpers.inherits(a,b("GeoCoordinatesRecord"));g=c&&c.prototype;function a(a,b){g.constructor.call(this,{latitude:a,longitude:b})}a.prototype.nearlyEquals=function(a){return b("nearlyEqualNumbers")(this.latitude,a.latitude)&&b("nearlyEqualNumbers")(this.longitude,a.longitude)};e.exports=a}),null);
__d("ghlTestUBT",["Promise","URI","gkx","promiseDone"],(function(a,b,c,d,e,f){__p&&__p();var g;function h(){__p&&__p();var a=document.createElement("div"),c=["AdBox","Ad","advert"];b("gkx")("686994")&&c.push("post-ads");a.className=c.join(" ");document.body.appendChild(a);return new(b("Promise"))(function(b){__p&&__p();var c=window.getComputedStyle&&window.getComputedStyle(a);if(!c){b(!1);return}if(c.display==="none"){b(!0);return}if(c.MozBinding&&c.MozBinding.indexOf("url")===0){setTimeout(function(){return b(a.clientWidth===0)},5e3);return}b(!1)})}function i(){__p&&__p();var a=document.createElement("img");document.body.appendChild(a);return new(b("Promise"))(function(c){a.onload=function(){var b=window.getComputedStyle&&window.getComputedStyle(a);b=b&&b.display==="none";a.parentNode&&a.parentNode.removeChild(a);c(b)};a.onerror=function(){a.parentNode&&a.parentNode.removeChild(a),c(!0)};var d=new(b("URI"))("https://scontent.xx.fbcdn.net/hads-ak-prn2/1487645_6012475414660_1439393861_n.png");a.src=d.toString()})}function a(a){g===void 0?b("promiseDone")(b("Promise").all([h(),i()]),function(b){g=b.some(function(a){return a}),a(g)}):a(g)}e.exports=a}),null);
__d("NonBlockingIFrame",["Promise","DOM","TimeSlice"],(function(a,b,c,d,e,f){__p&&__p();var g={},h,i;function j(a,c){__p&&__p();a===void 0&&(a=g);c===void 0&&(c=document.body);var d={className:"nonBlockingIframe",width:0,height:0,frameborder:0,scrolling:"no","aria-hidden":"true"};a!==g&&(d.src=a);d=b("DOM").create("iframe",d);d.style.left="-1000px";d.style.position="absolute";b("DOM").appendContent(c,d);a===g&&(d.contentDocument.open(),d.contentDocument.close());return d}function k(){return new(b("Promise"))(function(a){h||(h=j()),h.contentDocument.readyState==="complete"?a(h):(i||(i=new(b("Promise"))(function(a){h.contentWindow.onload=b("TimeSlice").guard(function(){a(h)},"NonBlockingIFrame window.onload")})),a(i))})}a={loadImage:function(a){__p&&__p();return k().then(function(c){return new(b("Promise"))(function(d,e){var f=c.contentWindow.Image,g=new f();g.onload=b("TimeSlice").guard(function(){d(g)},"NonBlockingIFrame image.onload");g.onerror=b("TimeSlice").guard(function(){e(g)},"NonBlockingIFrame image.onerror");g.onabort=b("TimeSlice").guard(function(){e(g)},"NonBlockingIFrame image.onabort");g.src=a})})},loadIFrame:function(a){a===void 0&&(a=g);return k().then(function(b){b=b.contentDocument.body;return j(a,b)})}};e.exports=a}),null);
__d("randomShuffle",["randomInt"],(function(a,b,c,d,e,f){__p&&__p();function a(a){for(var c=a.length-1;c>0;c--){var d=b("randomInt").call(this,c+1);if(d!=c){var e=a[d];a[d]=a[c];a[c]=e}}return a}e.exports=a}),null);
__d("AbstractSearchSource",["Promise"],(function(a,b,c,d,e,f){__p&&__p();a.prototype.bootstrap=function(a){"use strict";this.$1||(this.$1=new(b("Promise"))(function(a){this.bootstrapImpl(a)}.bind(this)));return this.$1.then(a)};a.prototype.search=function(a,b,c){"use strict";this.searchImpl(a,b,c)};a.prototype.bootstrapImpl=function(a){"use strict";a()};a.prototype.searchImpl=function(a,b,c){"use strict";throw new Error("Abstract method #searchImpl is not implemented.")};a.prototype.clearBootstrappedData=function(){"use strict";this.$1=null};function a(){"use strict"}e.exports=a}),null);