!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/packs/",n(n.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.modelData=t.modelData,this.relationshipsCache={}}return r(e,null,[{key:"modelClassData",value:function(){throw"modelClassData should be overriden by child"}},{key:"find",value:function(e){var t=this;return new Promise(function(r,o){var i=t.modelClassData().path+"/"+e;Rails.ajax({type:"GET",url:i,success:function(e){var o=new(0,n(4)("./"+t.modelClassData().name).default)({modelData:e.model});r(o)}})})}}]),r(e,[{key:"readBelongsToReflection",value:function(e){return new Promise(function(t,n){if(this.relationshipsCache[e.name])return t(this.relationshipsCache[e.name]);e.primaryKey;var r={ransackKey:this.id()};new Collection({modelName:e.modelName,ransack:r}).first().then(function(e){t(e)})})}},{key:"readHasOneReflection",value:function(e){return new Promise(function(t,n){if(this.relationshipsCache[e.name])return t(this.relationshipsCache[e.name]);e.primaryKey;var r={ransackKey:this.id()};new Collection({modelName:e.modelName,ransack:r}).first().then(function(e){t(e)})})}}]),e}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.args=t,t.ransack?this.ransack=t.ransack:this.ransack={}}return r(e,[{key:"toArray",value:function(){var e=this;return new Promise(function(t,r){var o=n(4)("./"+e.args.modelName).default,i="/api_maker/"+e.args.targetPathName,c=$.param({q:e.ransack});Rails.ajax({type:"GET",url:i,data:c,success:function(e){console.log({response:e});var n=[];for(var r in e.collection){var i=e.collection[r],c=new o({modelData:i});n.push(c)}t(n)}})})}}]),e}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=n(1),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r["default"]),i(t,[{key:"tasks",value:function(){var e=this.id();return new o.default({modelName:"Task",targetPathName:"tasks",ransack:{project_id_eq:e}})}},{key:"id",value:function(){return this.modelData.id}},{key:"name",value:function(){return this.modelData.name}},{key:"createdAt",value:function(){return this.modelData.created_at}}],[{key:"modelClassData",value:function(){return{name:"Project",path:"/api_maker/projects"}}}]),t}();t.default=c},function(e,t,n){"use strict";var r=function(){function e(e,t,n){this.context=e,this.descriptor=t,this.eventTarget=n}return e.prototype.connect=function(){this.eventTarget.addEventListener(this.eventName,this,!1)},e.prototype.disconnect=function(){this.eventTarget.removeEventListener(this.eventName,this,!1)},e.prototype.hasSameDescriptorAs=function(e){return null!=e&&e.descriptor.isEqualTo(this.descriptor)},e.prototype.handleEvent=function(e){this.willBeInvokedByEvent(e)&&this.invokeWithEvent(e)},Object.defineProperty(e.prototype,"eventName",{get:function(){return this.descriptor.eventName},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"method",{get:function(){var e=this.controller[this.methodName];if("function"==typeof e)return e;throw new Error('Action "'+this.descriptor+'" references undefined method "'+this.methodName+'"')},enumerable:!0,configurable:!0}),e.prototype.invokeWithEvent=function(e){try{this.method.call(this.controller,e)}catch(t){this.context.handleError(t,'invoking action "'+this.descriptor+'"',{event:e})}},e.prototype.willBeInvokedByEvent=function(e){var t=e.target;return this.element===t||(!(t instanceof Element&&this.element.contains(t))||this.scope.containsElement(t))},Object.defineProperty(e.prototype,"controller",{get:function(){return this.context.controller},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"methodName",{get:function(){return this.descriptor.methodName},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scope",{get:function(){return this.context.scope},enumerable:!0,configurable:!0}),e}(),o=/^((.+?)(@(window|document))?->)?(.+?)#(.+)$/,i=function(){function e(e,t,n,r){this.identifier=e,this.eventName=t,this.methodName=n,this.eventTarget=r}return e.forOptions=function(t){return new e(t.identifier||c("Missing identifier in action descriptor"),t.eventName||c("Missing event name in action descriptor"),t.methodName||c("Missing method name in action descriptor"),t.eventTarget||c("Missing event target in action descriptor"))},e.forElementWithInlineDescriptorString=function(t,n){try{var r=this.parseOptionsFromInlineActionDescriptorString(n);return r.eventName=r.eventName||this.getDefaultEventNameForElement(t),r.eventTarget=r.eventTarget||t,e.forOptions(r)}catch(e){throw new Error('Bad action descriptor "'+n+'": '+e.message)}},e.parseOptionsFromInlineActionDescriptorString=function(e){var t=e.trim().match(o)||c("Invalid action descriptor syntax");return{identifier:t[5],eventName:t[2],methodName:t[6],eventTarget:function(e){if("window"==e)return window;if("document"==e)return document}(t[4])}},e.getDefaultEventNameForElement=function(e){return this.defaultEventNames[e.tagName.toLowerCase()](e)},Object.defineProperty(e.prototype,"eventTargetName",{get:function(){return function(e){if(e==window)return"window";if(e==document)return"document"}(this.eventTarget)},enumerable:!0,configurable:!0}),e.prototype.isEqualTo=function(e){return null!=e&&e.identifier==this.identifier&&e.eventName==this.eventName&&e.methodName==this.methodName&&e.eventTarget==this.eventTarget},e.prototype.toString=function(){var e=this.eventTargetName?"@"+this.eventTargetName:"";return""+this.eventName+e+"->"+this.identifier+"#"+this.methodName},e.defaultEventNames={a:function(e){return"click"},button:function(e){return"click"},form:function(e){return"submit"},input:function(e){return"submit"==e.getAttribute("type")?"click":"change"},select:function(e){return"change"},textarea:function(e){return"change"}},e}();function c(e){throw new Error(e)}var a=function(){function e(e){this.context=e,this.started=!1,this.actions=new Set}return e.prototype.start=function(){this.started||(this.started=!0,this.connectActions())},e.prototype.stop=function(){this.started&&(this.disconnectActions(),this.started=!1)},e.prototype.add=function(e){this.actions.has(e)||(e.connect(),this.actions.add(e))},e.prototype.delete=function(e){this.actions.has(e)&&(this.actions.delete(e),e.disconnect())},e.prototype.connectActions=function(){this.actions.forEach(function(e){return e.connect()})},e.prototype.disconnectActions=function(){this.actions.forEach(function(e){return e.disconnect()})},e}();function s(e,t,n){l(e,t).add(n)}function u(e,t,n){l(e,t).delete(n),function(e,t){var n=e.get(t);null!=n&&0==n.size&&e.delete(t)}(e,t)}function l(e,t){var n=e.get(t);return n||(n=new Set,e.set(t,n)),n}var f,p=function(){function e(){this.valuesByKey=new Map}return Object.defineProperty(e.prototype,"values",{get:function(){return Array.from(this.valuesByKey.values()).reduce(function(e,t){return e.concat(Array.from(t))},[])},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){return Array.from(this.valuesByKey.values()).reduce(function(e,t){return e+t.size},0)},enumerable:!0,configurable:!0}),e.prototype.add=function(e,t){s(this.valuesByKey,e,t)},e.prototype.delete=function(e,t){u(this.valuesByKey,e,t)},e.prototype.has=function(e,t){var n=this.valuesByKey.get(e);return null!=n&&n.has(t)},e.prototype.hasKey=function(e){return this.valuesByKey.has(e)},e.prototype.hasValue=function(e){return Array.from(this.valuesByKey.values()).some(function(t){return t.has(e)})},e.prototype.getValuesForKey=function(e){var t=this.valuesByKey.get(e);return t?Array.from(t):[]},e.prototype.getKeysForValue=function(e){return Array.from(this.valuesByKey).filter(function(t){t[0];return t[1].has(e)}).map(function(e){var t=e[0];e[1];return t})},e}(),h=this&&this.__extends||(f=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},function(e,t){function n(){this.constructor=e}f(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),d=function(e){function t(){var t=e.call(this)||this;return t.keysByValue=new Map,t}return h(t,e),Object.defineProperty(t.prototype,"values",{get:function(){return Array.from(this.keysByValue.keys())},enumerable:!0,configurable:!0}),t.prototype.add=function(t,n){e.prototype.add.call(this,t,n),s(this.keysByValue,n,t)},t.prototype.delete=function(t,n){e.prototype.delete.call(this,t,n),u(this.keysByValue,n,t)},t.prototype.hasValue=function(e){return this.keysByValue.has(e)},t.prototype.getKeysForValue=function(e){var t=this.keysByValue.get(e);return t?Array.from(t):[]},t}(p),m=function(){function e(e,t){var n=this;this.element=e,this.started=!1,this.delegate=t,this.elements=new Set,this.mutationObserver=new MutationObserver(function(e){return n.processMutations(e)})}return e.prototype.start=function(){this.started||(this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,subtree:!0}),this.started=!0,this.refresh())},e.prototype.stop=function(){this.started&&(this.mutationObserver.takeRecords(),this.mutationObserver.disconnect(),this.started=!1)},e.prototype.refresh=function(){if(this.started){for(var e=new Set(this.matchElementsInTree()),t=0,n=Array.from(this.elements);t<n.length;t++){var r=n[t];e.has(r)||this.removeElement(r)}for(var o=0,i=Array.from(e);o<i.length;o++){r=i[o];this.addElement(r)}}},e.prototype.processMutations=function(e){for(var t=0,n=e;t<n.length;t++){var r=n[t];this.processMutation(r)}},e.prototype.processMutation=function(e){"attributes"==e.type?this.processAttributeChange(e.target,e.attributeName):"childList"==e.type&&(this.processRemovedNodes(e.removedNodes),this.processAddedNodes(e.addedNodes))},e.prototype.processAttributeChange=function(e,t){var n=e;this.elements.has(n)?this.delegate.elementAttributeChanged&&this.matchElement(n)?this.delegate.elementAttributeChanged(n,t):this.removeElement(n):this.matchElement(n)&&this.addElement(n)},e.prototype.processRemovedNodes=function(e){for(var t=0,n=Array.from(e);t<n.length;t++){var r=n[t];this.processNode(r,this.removeElement)}},e.prototype.processAddedNodes=function(e){for(var t=0,n=Array.from(e);t<n.length;t++){var r=n[t];this.processNode(r,this.addElement)}},e.prototype.matchElement=function(e){return this.delegate.matchElement(e)},e.prototype.matchElementsInTree=function(e){return void 0===e&&(e=this.element),this.delegate.matchElementsInTree(e)},e.prototype.processNode=function(e,t){var n=this.elementFromNode(e);if(n)for(var r=0,o=this.matchElementsInTree(n);r<o.length;r++){var i=o[r];t.call(this,i)}},e.prototype.elementFromNode=function(e){if(e.nodeType==Node.ELEMENT_NODE)return e},e.prototype.addElement=function(e){this.elements.has(e)||(this.elements.add(e),this.delegate.elementMatched&&this.delegate.elementMatched(e))},e.prototype.removeElement=function(e){this.elements.has(e)&&(this.elements.delete(e),this.delegate.elementUnmatched&&this.delegate.elementUnmatched(e))},e}(),y=(function(){function e(e,t,n){this.attributeName=t,this.delegate=n,this.elementObserver=new m(e,this)}Object.defineProperty(e.prototype,"element",{get:function(){return this.elementObserver.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"selector",{get:function(){return"["+this.attributeName+"]"},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.elementObserver.start()},e.prototype.stop=function(){this.elementObserver.stop()},e.prototype.matchElement=function(e){return e.hasAttribute(this.attributeName)},e.prototype.matchElementsInTree=function(e){var t=this.matchElement(e)?[e]:[],n=Array.from(e.querySelectorAll(this.selector));return t.concat(n)},e.prototype.elementMatched=function(e){this.delegate.elementMatchedAttribute&&this.delegate.elementMatchedAttribute(e,this.attributeName)},e.prototype.elementUnmatched=function(e){this.delegate.elementUnmatchedAttribute&&this.delegate.elementUnmatchedAttribute(e,this.attributeName)},e.prototype.elementAttributeChanged=function(e,t){this.delegate.elementAttributeValueChanged&&this.attributeName==t&&this.delegate.elementAttributeValueChanged(e,t)}}(),function(){function e(e,t,n){this.attributeName=t,this.delegate=n,this.elementObserver=new m(e,this),this.tokensByElement=new d}return Object.defineProperty(e.prototype,"started",{get:function(){return this.elementObserver.started},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.elementObserver.start()},e.prototype.stop=function(){this.elementObserver.stop()},e.prototype.refresh=function(){this.elementObserver.refresh()},Object.defineProperty(e.prototype,"element",{get:function(){return this.elementObserver.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"selector",{get:function(){return"["+this.attributeName+"]"},enumerable:!0,configurable:!0}),e.prototype.getElementsMatchingToken=function(e){return this.tokensByElement.getKeysForValue(e)},e.prototype.matchElement=function(e){return e.hasAttribute(this.attributeName)},e.prototype.matchElementsInTree=function(e){var t=this.matchElement(e)?[e]:[],n=Array.from(e.querySelectorAll(this.selector));return t.concat(n)},e.prototype.elementMatched=function(e){for(var t=0,n=Array.from(this.readTokenSetForElement(e));t<n.length;t++){var r=n[t];this.elementMatchedToken(e,r)}},e.prototype.elementUnmatched=function(e){for(var t=0,n=this.getTokensForElement(e);t<n.length;t++){var r=n[t];this.elementUnmatchedToken(e,r)}},e.prototype.elementAttributeChanged=function(e){for(var t=this.readTokenSetForElement(e),n=0,r=Array.from(t);n<r.length;n++){var o=r[n];this.elementMatchedToken(e,o)}for(var i=0,c=this.getTokensForElement(e);i<c.length;i++){o=c[i];t.has(o)||this.elementUnmatchedToken(e,o)}},e.prototype.elementMatchedToken=function(e,t){this.tokensByElement.has(e,t)||(this.tokensByElement.add(e,t),this.delegate.elementMatchedTokenForAttribute&&this.delegate.elementMatchedTokenForAttribute(e,t,this.attributeName))},e.prototype.elementUnmatchedToken=function(e,t){this.tokensByElement.has(e,t)&&(this.tokensByElement.delete(e,t),this.delegate.elementUnmatchedTokenForAttribute&&this.delegate.elementUnmatchedTokenForAttribute(e,t,this.attributeName))},e.prototype.getTokensForElement=function(e){return this.tokensByElement.getValuesForKey(e)},e.prototype.readTokenSetForElement=function(e){for(var t=new Set,n=0,r=(e.getAttribute(this.attributeName)||"").split(/\s+/);n<r.length;n++){var o=r[n];o.length&&t.add(o)}return t},e}()),b=function(){function e(e,t){this.context=e,this.delegate=t,this.tokenListObserver=new y(this.element,this.attributeName,this),this.connectedActions=new p}return Object.defineProperty(e.prototype,"scope",{get:function(){return this.context.scope},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"schema",{get:function(){return this.context.schema},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"attributeName",{get:function(){return this.schema.actionAttribute},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.scope.identifier},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.tokenListObserver.start()},e.prototype.stop=function(){this.tokenListObserver.stop()},e.prototype.elementMatchedTokenForAttribute=function(e,t,n){if(this.scope.containsElement(e)){var r=this.buildActionForElementWithDescriptorString(e,t);r&&(this.connectedActions.add(e,r),this.delegate.inlineActionConnected(r))}},e.prototype.elementUnmatchedTokenForAttribute=function(e,t,n){var r=this.getConnectedActionForElementWithDescriptorString(e,t);r&&(this.connectedActions.delete(e,r),this.delegate.inlineActionDisconnected(r))},e.prototype.getConnectedActionForElementWithDescriptorString=function(e,t){var n=this.buildActionForElementWithDescriptorString(e,t);if(n)return this.connectedActions.getValuesForKey(e).find(function(e){return e.hasSameDescriptorAs(n)})},e.prototype.buildActionForElementWithDescriptorString=function(e,t){try{var n=i.forElementWithInlineDescriptorString(e,t);if(n.identifier==this.identifier)return new r(this.context,n,n.eventTarget)}catch(n){this.context.handleError(n,'parsing descriptor string "'+t+'"',{element:e})}},e}(),g=function(){function e(e){this.scope=e}return Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.scope.identifier},enumerable:!0,configurable:!0}),e.prototype.get=function(e){return e=this.getFormattedKey(e),this.element.getAttribute(e)},e.prototype.set=function(e,t){return e=this.getFormattedKey(e),this.element.setAttribute(e,t),this.get(e)},e.prototype.has=function(e){return e=this.getFormattedKey(e),this.element.hasAttribute(e)},e.prototype.delete=function(e){return!!this.has(e)&&(e=this.getFormattedKey(e),this.element.removeAttribute(e),!0)},e.prototype.getFormattedKey=function(e){return"data-"+this.identifier+"-"+e.toString().replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()})},e}();function v(e,t){return"["+e+'~="'+t+'"]'}var E=function(){function e(e){this.scope=e}return Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.scope.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"schema",{get:function(){return this.scope.schema},enumerable:!0,configurable:!0}),e.prototype.has=function(e){return null!=this.find(e)},e.prototype.find=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this.getSelectorForTargetNames(e);return this.scope.findElement(n)},e.prototype.findAll=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this.getSelectorForTargetNames(e);return this.scope.findAllElements(n)},e.prototype.getSelectorForTargetNames=function(e){var t=this;return e.map(function(e){return t.getSelectorForTargetName(e)}).join(", ")},e.prototype.getSelectorForTargetName=function(e){var t=this.identifier+"."+e;return v(this.schema.targetAttribute,t)},e}(),O=function(){function e(e,t,n){this.schema=e,this.identifier=t,this.element=n,this.targets=new E(this),this.data=new g(this)}return e.prototype.findElement=function(e){return this.findAllElements(e)[0]},e.prototype.findAllElements=function(e){var t=this.element.matches(e)?[this.element]:[],n=this.filterElements(Array.from(this.element.querySelectorAll(e)));return t.concat(n)},e.prototype.filterElements=function(e){var t=this;return e.filter(function(e){return t.containsElement(e)})},e.prototype.containsElement=function(e){return e.closest(this.controllerSelector)===this.element},Object.defineProperty(e.prototype,"controllerSelector",{get:function(){return v(this.schema.controllerAttribute,this.identifier)},enumerable:!0,configurable:!0}),e}(),A=function(){function e(e,t){this.module=e,this.scope=new O(this.schema,this.identifier,t),this.actions=new a(this),this.inlineActionObserver=new b(this,this);try{this.controller=new e.controllerConstructor(this),this.controller.initialize()}catch(e){this.handleError(e,"initializing controller")}}return e.prototype.connect=function(){this.actions.start(),this.inlineActionObserver.start();try{this.controller.connect()}catch(e){this.handleError(e,"connecting controller")}},e.prototype.disconnect=function(){try{this.controller.disconnect()}catch(e){this.handleError(e,"disconnecting controller")}this.inlineActionObserver.stop(),this.actions.stop()},Object.defineProperty(e.prototype,"application",{get:function(){return this.module.application},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.module.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"schema",{get:function(){return this.application.schema},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"parentElement",{get:function(){return this.element.parentElement},enumerable:!0,configurable:!0}),e.prototype.inlineActionConnected=function(e){this.actions.add(e)},e.prototype.inlineActionDisconnected=function(e){this.actions.delete(e)},e.prototype.handleError=function(e,t,n){void 0===n&&(n={});var r=this.identifier,o=this.controller,i=this.element;n=Object.assign({identifier:r,controller:o,element:i},n),this.application.handleError(e,"Error "+t,n)},e}(),j=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();function w(e){return{identifier:e.identifier,controllerConstructor:(t=e.controllerConstructor,n=k(t),n.bless(),n)};var t,n}var k=function(){function e(e){function t(){var n=this&&this instanceof t?this.constructor:void 0;return Reflect.construct(e,arguments,n)}return t.prototype=Object.create(e.prototype,{constructor:{value:t}}),Reflect.setPrototypeOf(t,e),t}try{return(t=e(function(){this.a.call(this)})).prototype.a=function(){},new t,e}catch(e){return function(e){return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return j(t,e),t}(e)}}var t}(),P=function(){function e(e,t){this.application=e,this.definition=w(t),this.contextsByElement=new WeakMap,this.connectedContexts=new Set}return Object.defineProperty(e.prototype,"identifier",{get:function(){return this.definition.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"controllerConstructor",{get:function(){return this.definition.controllerConstructor},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"contexts",{get:function(){return Array.from(this.connectedContexts)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){return this.connectedContexts.size},enumerable:!0,configurable:!0}),e.prototype.connectElement=function(e){var t=this.fetchContextForElement(e);t&&!this.connectedContexts.has(t)&&(this.connectedContexts.add(t),t.connect())},e.prototype.disconnectElement=function(e){var t=this.fetchContextForElement(e);t&&this.connectedContexts.has(t)&&(this.connectedContexts.delete(t),t.disconnect())},e.prototype.getContextForElement=function(e){return this.contextsByElement.get(e)},e.prototype.fetchContextForElement=function(e){var t=this.contextsByElement.get(e);return t||(t=new A(this,e),this.contextsByElement.set(e,t)),t},e}(),T=function(){function e(e){this.application=e,this.tokenListObserver=new y(this.element,this.controllerAttribute,this),this.modulesByIdentifier=new Map}return Object.defineProperty(e.prototype,"schema",{get:function(){return this.application.schema},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this.application.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"controllerAttribute",{get:function(){return this.schema.controllerAttribute},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"modules",{get:function(){return Array.from(this.modulesByIdentifier.values())},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.tokenListObserver.start()},e.prototype.stop=function(){this.tokenListObserver.stop()},e.prototype.loadDefinition=function(e){var t=e.identifier;this.unloadIdentifier(t);var n=new P(this.application,e);this.modulesByIdentifier.set(t,n),this.connectModule(n)},e.prototype.unloadIdentifier=function(e){var t=this.modulesByIdentifier.get(e);t&&(this.disconnectModule(t),this.modulesByIdentifier.delete(e))},e.prototype.elementMatchedTokenForAttribute=function(e,t,n){this.connectModuleForIdentifierToElement(t,e)},e.prototype.elementUnmatchedTokenForAttribute=function(e,t,n){this.disconnectModuleForIdentifierFromElement(t,e)},Object.defineProperty(e.prototype,"contexts",{get:function(){return this.modules.reduce(function(e,t){return e.concat(Array.from(t.contexts))},[])},enumerable:!0,configurable:!0}),e.prototype.getContextForElementAndIdentifier=function(e,t){var n=this.modulesByIdentifier.get(t);if(n)return n.getContextForElement(e)},e.prototype.connectModule=function(e){for(var t=0,n=this.tokenListObserver.getElementsMatchingToken(e.identifier);t<n.length;t++){var r=n[t];e.connectElement(r)}},e.prototype.disconnectModule=function(e){for(var t=0,n=e.contexts;t<n.length;t++){var r=n[t].element;e.disconnectElement(r)}},e.prototype.connectModuleForIdentifierToElement=function(e,t){var n=this.modulesByIdentifier.get(e);n&&n.connectElement(t)},e.prototype.disconnectModuleForIdentifierFromElement=function(e,t){var n=this.modulesByIdentifier.get(e);n&&n.disconnectElement(t)},e}(),N={controllerAttribute:"data-controller",actionAttribute:"data-action",targetAttribute:"data-target"},_=function(){function e(e,t){void 0===e&&(e=document.documentElement),void 0===t&&(t=N),this.element=e,this.schema=t,this.router=new T(this)}return e.start=function(t,n){var r=new e(t,n);return r.start(),r},e.prototype.start=function(){this.router.start()},e.prototype.stop=function(){this.router.stop()},e.prototype.register=function(e,t){this.load({identifier:e,controllerConstructor:t})},e.prototype.load=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];(Array.isArray(e)?e:[e].concat(n)).forEach(function(e){return t.router.loadDefinition(e)})},e.prototype.unload=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];(Array.isArray(e)?e:[e].concat(n)).forEach(function(e){return t.router.unloadIdentifier(e)})},Object.defineProperty(e.prototype,"controllers",{get:function(){return this.router.contexts.map(function(e){return e.controller})},enumerable:!0,configurable:!0}),e.prototype.getControllerForElementAndIdentifier=function(e,t){var n=this.router.getContextForElementAndIdentifier(e,t);return n?n.controller:null},e.prototype.handleError=function(e,t,n){console.error("%s\n\n%o\n\n%o",t,e,n)},e}();function C(e){var t=e.prototype;(function(e){var t=function(e){var t=[];for(;e;)t.push(e),e=Object.getPrototypeOf(e);return t}(e);return Array.from(t.reduce(function(e,t){return function(e){var t=e.targets;return Array.isArray(t)?t:[]}(t).forEach(function(t){return e.add(t)}),e},new Set))})(e).forEach(function(e){return n=t,(o={})[e+"Target"]={get:function(){var t=this.targets.find(e);if(t)return t;throw new Error('Missing target element "'+this.identifier+"."+e+'"')}},o[e+"Targets"]={get:function(){return this.targets.findAll(e)}},o["has"+function(e){return e.charAt(0).toUpperCase()+e.slice(1)}(e)+"Target"]={get:function(){return this.targets.has(e)}},r=o,void Object.keys(r).forEach(function(e){if(!(e in n)){var t=r[e];Object.defineProperty(n,e,t)}});var n,r,o})}var F=function(){function e(e){this.context=e}return e.bless=function(){C(this)},Object.defineProperty(e.prototype,"application",{get:function(){return this.context.application},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scope",{get:function(){return this.context.scope},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"element",{get:function(){return this.scope.element},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this.scope.identifier},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"targets",{get:function(){return this.scope.targets},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"data",{get:function(){return this.scope.data},enumerable:!0,configurable:!0}),e.prototype.initialize=function(){},e.prototype.connect=function(){},e.prototype.disconnect=function(){},e.targets=[],e}();n.d(t,!1,function(){return r}),n.d(t,!1,function(){return i}),n.d(t,"a",function(){return _}),n.d(t,!1,function(){return A}),n.d(t,"b",function(){return F}),n.d(t,!1,function(){return N})},function(e,t,n){var r={"./BaseModel":0,"./BaseModel.js":0,"./Collection":1,"./Collection.js":1,"./Project":2,"./Project.js":2,"./Task":5,"./Task.js":5};function o(e){return n(i(e))}function i(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=4},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=(n(1),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}());var i=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r["default"]),o(t,[{key:"project",value:function(){return this.readBelongsToReflection({name:"project"})}},{key:"id",value:function(){return this.modelData.id}},{key:"name",value:function(){return this.modelData.name}},{key:"createdAt",value:function(){return this.modelData.created_at}}],[{key:"modelClassData",value:function(){return{name:"Task",path:"/api_maker/tasks"}}}]),t}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3).a.start(),o=n(7);r.load(function(e){return e.keys().map(function(t){return function(e,t){var n=function(e){var t=(e.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/)||[])[1];if(t)return t.replace(/_/g,"-").replace(/\//g,"--")}(t);if(n)return function(e,t){var n=e.default;if("function"==typeof n)return{identifier:t,controllerConstructor:n}}(e(t),n)}(e,t)}).filter(function(e){return e})}(o))},function(e,t,n){var r={"./models/find_controller.js":8};function o(e){return n(i(e))}function i(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id=7},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),o=n(2),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r["b"]),i(t,[{key:"connect",value:function(){var e=this;console.log("Finding project"),o.default.find(this.element.dataset.projectId).then(function(t){console.log("Project found");var n=document.createElement("div");n.classList.add("project"),n.dataset.projectName=t.name(),n.innerText="Hello world",console.log("Appending element"),e.element.append(n),console.log("Done")})}}]),t}();t.default=c}]);
//# sourceMappingURL=application-9322908785ee5a28c635.js.map