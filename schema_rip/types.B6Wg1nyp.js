import{b as q}from"./tslib.es6.CadHaCWw.js";function L(e,t){if(!!!e)throw new Error(t)}function se(e){return typeof e=="object"&&e!==null}function re(e,t){if(!!!e)throw new Error("Unexpected invariant triggered.")}const ae=/\r\n|[\n\r]/g;function w(e,t){let n=0,s=1;for(const i of e.body.matchAll(ae)){if(typeof i.index=="number"||re(!1),i.index>=t)break;n=i.index+i[0].length,s+=1}return{line:s,column:t+1-n}}function oe(e){return J(e.source,w(e.source,e.start))}function J(e,t){const n=e.locationOffset.column-1,s="".padStart(n)+e.body,i=t.line-1,r=e.locationOffset.line-1,o=t.line+r,l=t.line===1?n:0,p=t.column+l,_=`${e.name}:${o}:${p}
`,d=s.split(/\r\n|[\n\r]/g),y=d[i];if(y.length>120){const f=Math.floor(p/80),I=p%80,g=[];for(let T=0;T<y.length;T+=80)g.push(y.slice(T,T+80));return _+G([[`${o} |`,g[0]],...g.slice(1,f+1).map(T=>["|",T]),["|","^".padStart(I)],["|",g[f+1]]])}return _+G([[`${o-1} |`,d[i-1]],[`${o} |`,y],["|","^".padStart(p)],[`${o+1} |`,d[i+1]]])}function G(e){const t=e.filter(([s,i])=>i!==void 0),n=Math.max(...t.map(([s])=>s.length));return t.map(([s,i])=>s.padStart(n)+(i?" "+i:"")).join(`
`)}function ue(e){const t=e[0];return t==null||"kind"in t||"length"in t?{nodes:t,source:e[1],positions:e[2],path:e[3],originalError:e[4],extensions:e[5]}:t}class B extends Error{constructor(t,...n){var s,i,r;const{nodes:o,source:l,positions:p,path:_,originalError:d,extensions:y}=ue(n);super(t),this.name="GraphQLError",this.path=_??void 0,this.originalError=d??void 0,this.nodes=j(Array.isArray(o)?o:o?[o]:void 0);const f=j((s=this.nodes)===null||s===void 0?void 0:s.map(g=>g.loc).filter(g=>g!=null));this.source=l??(f==null||(i=f[0])===null||i===void 0?void 0:i.source),this.positions=p??(f==null?void 0:f.map(g=>g.start)),this.locations=p&&l?p.map(g=>w(l,g)):f==null?void 0:f.map(g=>w(g.source,g.start));const I=se(d==null?void 0:d.extensions)?d==null?void 0:d.extensions:void 0;this.extensions=(r=y??I)!==null&&r!==void 0?r:Object.create(null),Object.defineProperties(this,{message:{writable:!0,enumerable:!0},name:{enumerable:!1},nodes:{enumerable:!1},source:{enumerable:!1},positions:{enumerable:!1},originalError:{enumerable:!1}}),d!=null&&d.stack?Object.defineProperty(this,"stack",{value:d.stack,writable:!0,configurable:!0}):Error.captureStackTrace?Error.captureStackTrace(this,B):Object.defineProperty(this,"stack",{value:Error().stack,writable:!0,configurable:!0})}get[Symbol.toStringTag](){return"GraphQLError"}toString(){let t=this.message;if(this.nodes)for(const n of this.nodes)n.loc&&(t+=`

`+oe(n.loc));else if(this.source&&this.locations)for(const n of this.locations)t+=`

`+J(this.source,n);return t}toJSON(){const t={message:this.message};return this.locations!=null&&(t.locations=this.locations),this.path!=null&&(t.path=this.path),this.extensions!=null&&Object.keys(this.extensions).length>0&&(t.extensions=this.extensions),t}}function j(e){return e===void 0||e.length===0?void 0:e}function m(e,t,n){return new B(`Syntax Error: ${n}`,{source:e,positions:[t]})}class ce{constructor(t,n,s){this.start=t.start,this.end=n.end,this.startToken=t,this.endToken=n,this.source=s}get[Symbol.toStringTag](){return"Location"}toJSON(){return{start:this.start,end:this.end}}}class Q{constructor(t,n,s,i,r,o){this.kind=t,this.start=n,this.end=s,this.line=i,this.column=r,this.value=o,this.prev=null,this.next=null}get[Symbol.toStringTag](){return"Token"}toJSON(){return{kind:this.kind,value:this.value,line:this.line,column:this.column}}}const le={Name:[],Document:["definitions"],OperationDefinition:["name","variableDefinitions","directives","selectionSet"],VariableDefinition:["variable","type","defaultValue","directives"],Variable:["name"],SelectionSet:["selections"],Field:["alias","name","arguments","directives","selectionSet"],Argument:["name","value"],FragmentSpread:["name","directives"],InlineFragment:["typeCondition","directives","selectionSet"],FragmentDefinition:["name","variableDefinitions","typeCondition","directives","selectionSet"],IntValue:[],FloatValue:[],StringValue:[],BooleanValue:[],NullValue:[],EnumValue:[],ListValue:["values"],ObjectValue:["fields"],ObjectField:["name","value"],Directive:["name","arguments"],NamedType:["name"],ListType:["type"],NonNullType:["type"],SchemaDefinition:["description","directives","operationTypes"],OperationTypeDefinition:["type"],ScalarTypeDefinition:["description","name","directives"],ObjectTypeDefinition:["description","name","interfaces","directives","fields"],FieldDefinition:["description","name","arguments","type","directives"],InputValueDefinition:["description","name","type","defaultValue","directives"],InterfaceTypeDefinition:["description","name","interfaces","directives","fields"],UnionTypeDefinition:["description","name","directives","types"],EnumTypeDefinition:["description","name","directives","values"],EnumValueDefinition:["description","name","directives"],InputObjectTypeDefinition:["description","name","directives","fields"],DirectiveDefinition:["description","name","arguments","locations"],SchemaExtension:["directives","operationTypes"],ScalarTypeExtension:["name","directives"],ObjectTypeExtension:["name","interfaces","directives","fields"],InterfaceTypeExtension:["name","interfaces","directives","fields"],UnionTypeExtension:["name","directives","types"],EnumTypeExtension:["name","directives","values"],InputObjectTypeExtension:["name","directives","fields"]},pe=new Set(Object.keys(le));function rt(e){const t=e==null?void 0:e.kind;return typeof t=="string"&&pe.has(t)}var N;(function(e){e.QUERY="query",e.MUTATION="mutation",e.SUBSCRIPTION="subscription"})(N||(N={}));var F;(function(e){e.QUERY="QUERY",e.MUTATION="MUTATION",e.SUBSCRIPTION="SUBSCRIPTION",e.FIELD="FIELD",e.FRAGMENT_DEFINITION="FRAGMENT_DEFINITION",e.FRAGMENT_SPREAD="FRAGMENT_SPREAD",e.INLINE_FRAGMENT="INLINE_FRAGMENT",e.VARIABLE_DEFINITION="VARIABLE_DEFINITION",e.SCHEMA="SCHEMA",e.SCALAR="SCALAR",e.OBJECT="OBJECT",e.FIELD_DEFINITION="FIELD_DEFINITION",e.ARGUMENT_DEFINITION="ARGUMENT_DEFINITION",e.INTERFACE="INTERFACE",e.UNION="UNION",e.ENUM="ENUM",e.ENUM_VALUE="ENUM_VALUE",e.INPUT_OBJECT="INPUT_OBJECT",e.INPUT_FIELD_DEFINITION="INPUT_FIELD_DEFINITION"})(F||(F={}));var u;(function(e){e.NAME="Name",e.DOCUMENT="Document",e.OPERATION_DEFINITION="OperationDefinition",e.VARIABLE_DEFINITION="VariableDefinition",e.SELECTION_SET="SelectionSet",e.FIELD="Field",e.ARGUMENT="Argument",e.FRAGMENT_SPREAD="FragmentSpread",e.INLINE_FRAGMENT="InlineFragment",e.FRAGMENT_DEFINITION="FragmentDefinition",e.VARIABLE="Variable",e.INT="IntValue",e.FLOAT="FloatValue",e.STRING="StringValue",e.BOOLEAN="BooleanValue",e.NULL="NullValue",e.ENUM="EnumValue",e.LIST="ListValue",e.OBJECT="ObjectValue",e.OBJECT_FIELD="ObjectField",e.DIRECTIVE="Directive",e.NAMED_TYPE="NamedType",e.LIST_TYPE="ListType",e.NON_NULL_TYPE="NonNullType",e.SCHEMA_DEFINITION="SchemaDefinition",e.OPERATION_TYPE_DEFINITION="OperationTypeDefinition",e.SCALAR_TYPE_DEFINITION="ScalarTypeDefinition",e.OBJECT_TYPE_DEFINITION="ObjectTypeDefinition",e.FIELD_DEFINITION="FieldDefinition",e.INPUT_VALUE_DEFINITION="InputValueDefinition",e.INTERFACE_TYPE_DEFINITION="InterfaceTypeDefinition",e.UNION_TYPE_DEFINITION="UnionTypeDefinition",e.ENUM_TYPE_DEFINITION="EnumTypeDefinition",e.ENUM_VALUE_DEFINITION="EnumValueDefinition",e.INPUT_OBJECT_TYPE_DEFINITION="InputObjectTypeDefinition",e.DIRECTIVE_DEFINITION="DirectiveDefinition",e.SCHEMA_EXTENSION="SchemaExtension",e.SCALAR_TYPE_EXTENSION="ScalarTypeExtension",e.OBJECT_TYPE_EXTENSION="ObjectTypeExtension",e.INTERFACE_TYPE_EXTENSION="InterfaceTypeExtension",e.UNION_TYPE_EXTENSION="UnionTypeExtension",e.ENUM_TYPE_EXTENSION="EnumTypeExtension",e.INPUT_OBJECT_TYPE_EXTENSION="InputObjectTypeExtension"})(u||(u={}));function U(e){return e===9||e===32}function k(e){return e>=48&&e<=57}function X(e){return e>=97&&e<=122||e>=65&&e<=90}function z(e){return X(e)||e===95}function de(e){return X(e)||k(e)||e===95}function he(e){var t;let n=Number.MAX_SAFE_INTEGER,s=null,i=-1;for(let o=0;o<e.length;++o){var r;const l=e[o],p=me(l);p!==l.length&&(s=(r=s)!==null&&r!==void 0?r:o,i=o,o!==0&&p<n&&(n=p))}return e.map((o,l)=>l===0?o:o.slice(n)).slice((t=s)!==null&&t!==void 0?t:0,i+1)}function me(e){let t=0;for(;t<e.length&&U(e.charCodeAt(t));)++t;return t}function at(e,t){const n=e.replace(/"""/g,'\\"""'),s=n.split(/\r\n|[\n\r]/g),i=s.length===1,r=s.length>1&&s.slice(1).every(I=>I.length===0||U(I.charCodeAt(0))),o=n.endsWith('\\"""'),l=e.endsWith('"')&&!o,p=e.endsWith("\\"),_=l||p,d=!i||e.length>70||_||r||o;let y="";const f=i&&U(e.charCodeAt(0));return(d&&!f||r)&&(y+=`
`),y+=n,(d||_)&&(y+=`
`),'"""'+y+'"""'}var a;(function(e){e.SOF="<SOF>",e.EOF="<EOF>",e.BANG="!",e.DOLLAR="$",e.AMP="&",e.PAREN_L="(",e.PAREN_R=")",e.SPREAD="...",e.COLON=":",e.EQUALS="=",e.AT="@",e.BRACKET_L="[",e.BRACKET_R="]",e.BRACE_L="{",e.PIPE="|",e.BRACE_R="}",e.NAME="Name",e.INT="Int",e.FLOAT="Float",e.STRING="String",e.BLOCK_STRING="BlockString",e.COMMENT="Comment"})(a||(a={}));class _e{constructor(t){const n=new Q(a.SOF,0,0,0,0);this.source=t,this.lastToken=n,this.token=n,this.line=1,this.lineStart=0}get[Symbol.toStringTag](){return"Lexer"}advance(){return this.lastToken=this.token,this.token=this.lookahead()}lookahead(){let t=this.token;if(t.kind!==a.EOF)do if(t.next)t=t.next;else{const n=fe(this,t.end);t.next=n,n.prev=t,t=n}while(t.kind===a.COMMENT);return t}}function ge(e){return e===a.BANG||e===a.DOLLAR||e===a.AMP||e===a.PAREN_L||e===a.PAREN_R||e===a.SPREAD||e===a.COLON||e===a.EQUALS||e===a.AT||e===a.BRACKET_L||e===a.BRACKET_R||e===a.BRACE_L||e===a.PIPE||e===a.BRACE_R}function b(e){return e>=0&&e<=55295||e>=57344&&e<=1114111}function C(e,t){return H(e.charCodeAt(t))&&W(e.charCodeAt(t+1))}function H(e){return e>=55296&&e<=56319}function W(e){return e>=56320&&e<=57343}function E(e,t){const n=e.source.body.codePointAt(t);if(n===void 0)return a.EOF;if(n>=32&&n<=126){const s=String.fromCodePoint(n);return s==='"'?`'"'`:`"${s}"`}return"U+"+n.toString(16).toUpperCase().padStart(4,"0")}function h(e,t,n,s,i){const r=e.line,o=1+n-e.lineStart;return new Q(t,n,s,r,o,i)}function fe(e,t){const n=e.source.body,s=n.length;let i=t;for(;i<s;){const r=n.charCodeAt(i);switch(r){case 65279:case 9:case 32:case 44:++i;continue;case 10:++i,++e.line,e.lineStart=i;continue;case 13:n.charCodeAt(i+1)===10?i+=2:++i,++e.line,e.lineStart=i;continue;case 35:return ye(e,i);case 33:return h(e,a.BANG,i,i+1);case 36:return h(e,a.DOLLAR,i,i+1);case 38:return h(e,a.AMP,i,i+1);case 40:return h(e,a.PAREN_L,i,i+1);case 41:return h(e,a.PAREN_R,i,i+1);case 46:if(n.charCodeAt(i+1)===46&&n.charCodeAt(i+2)===46)return h(e,a.SPREAD,i,i+3);break;case 58:return h(e,a.COLON,i,i+1);case 61:return h(e,a.EQUALS,i,i+1);case 64:return h(e,a.AT,i,i+1);case 91:return h(e,a.BRACKET_L,i,i+1);case 93:return h(e,a.BRACKET_R,i,i+1);case 123:return h(e,a.BRACE_L,i,i+1);case 124:return h(e,a.PIPE,i,i+1);case 125:return h(e,a.BRACE_R,i,i+1);case 34:return n.charCodeAt(i+1)===34&&n.charCodeAt(i+2)===34?xe(e,i):Ie(e,i)}if(k(r)||r===45)return Ee(e,i,r);if(z(r))return ve(e,i);throw m(e.source,i,r===39?`Unexpected single quote character ('), did you mean to use a double quote (")?`:b(r)||C(n,i)?`Unexpected character: ${E(e,i)}.`:`Invalid character: ${E(e,i)}.`)}return h(e,a.EOF,s,s)}function ye(e,t){const n=e.source.body,s=n.length;let i=t+1;for(;i<s;){const r=n.charCodeAt(i);if(r===10||r===13)break;if(b(r))++i;else if(C(n,i))i+=2;else break}return h(e,a.COMMENT,t,i,n.slice(t+1,i))}function Ee(e,t,n){const s=e.source.body;let i=t,r=n,o=!1;if(r===45&&(r=s.charCodeAt(++i)),r===48){if(r=s.charCodeAt(++i),k(r))throw m(e.source,i,`Invalid number, unexpected digit after 0: ${E(e,i)}.`)}else i=R(e,i,r),r=s.charCodeAt(i);if(r===46&&(o=!0,r=s.charCodeAt(++i),i=R(e,i,r),r=s.charCodeAt(i)),(r===69||r===101)&&(o=!0,r=s.charCodeAt(++i),(r===43||r===45)&&(r=s.charCodeAt(++i)),i=R(e,i,r),r=s.charCodeAt(i)),r===46||z(r))throw m(e.source,i,`Invalid number, expected digit but got: ${E(e,i)}.`);return h(e,o?a.FLOAT:a.INT,t,i,s.slice(t,i))}function R(e,t,n){if(!k(n))throw m(e.source,t,`Invalid number, expected digit but got: ${E(e,t)}.`);const s=e.source.body;let i=t+1;for(;k(s.charCodeAt(i));)++i;return i}function Ie(e,t){const n=e.source.body,s=n.length;let i=t+1,r=i,o="";for(;i<s;){const l=n.charCodeAt(i);if(l===34)return o+=n.slice(r,i),h(e,a.STRING,t,i+1,o);if(l===92){o+=n.slice(r,i);const p=n.charCodeAt(i+1)===117?n.charCodeAt(i+2)===123?Te(e,i):Ne(e,i):be(e,i);o+=p.value,i+=p.size,r=i;continue}if(l===10||l===13)break;if(b(l))++i;else if(C(n,i))i+=2;else throw m(e.source,i,`Invalid character within String: ${E(e,i)}.`)}throw m(e.source,i,"Unterminated string.")}function Te(e,t){const n=e.source.body;let s=0,i=3;for(;i<12;){const r=n.charCodeAt(t+i++);if(r===125){if(i<5||!b(s))break;return{value:String.fromCodePoint(s),size:i}}if(s=s<<4|v(r),s<0)break}throw m(e.source,t,`Invalid Unicode escape sequence: "${n.slice(t,t+i)}".`)}function Ne(e,t){const n=e.source.body,s=Y(n,t+2);if(b(s))return{value:String.fromCodePoint(s),size:6};if(H(s)&&n.charCodeAt(t+6)===92&&n.charCodeAt(t+7)===117){const i=Y(n,t+8);if(W(i))return{value:String.fromCodePoint(s,i),size:12}}throw m(e.source,t,`Invalid Unicode escape sequence: "${n.slice(t,t+6)}".`)}function Y(e,t){return v(e.charCodeAt(t))<<12|v(e.charCodeAt(t+1))<<8|v(e.charCodeAt(t+2))<<4|v(e.charCodeAt(t+3))}function v(e){return e>=48&&e<=57?e-48:e>=65&&e<=70?e-55:e>=97&&e<=102?e-87:-1}function be(e,t){const n=e.source.body;switch(n.charCodeAt(t+1)){case 34:return{value:'"',size:2};case 92:return{value:"\\",size:2};case 47:return{value:"/",size:2};case 98:return{value:"\b",size:2};case 102:return{value:"\f",size:2};case 110:return{value:`
`,size:2};case 114:return{value:"\r",size:2};case 116:return{value:"	",size:2}}throw m(e.source,t,`Invalid character escape sequence: "${n.slice(t,t+2)}".`)}function xe(e,t){const n=e.source.body,s=n.length;let i=e.lineStart,r=t+3,o=r,l="";const p=[];for(;r<s;){const _=n.charCodeAt(r);if(_===34&&n.charCodeAt(r+1)===34&&n.charCodeAt(r+2)===34){l+=n.slice(o,r),p.push(l);const d=h(e,a.BLOCK_STRING,t,r+3,he(p).join(`
`));return e.line+=p.length-1,e.lineStart=i,d}if(_===92&&n.charCodeAt(r+1)===34&&n.charCodeAt(r+2)===34&&n.charCodeAt(r+3)===34){l+=n.slice(o,r),o=r+1,r+=4;continue}if(_===10||_===13){l+=n.slice(o,r),p.push(l),_===13&&n.charCodeAt(r+1)===10?r+=2:++r,l="",o=r,i=r;continue}if(b(_))++r;else if(C(n,r))r+=2;else throw m(e.source,r,`Invalid character within String: ${E(e,r)}.`)}throw m(e.source,r,"Unterminated string.")}function ve(e,t){const n=e.source.body,s=n.length;let i=t+1;for(;i<s;){const r=n.charCodeAt(i);if(de(r))++i;else break}return h(e,a.NAME,t,i,n.slice(t,i))}const ke=10,Z=2;function K(e){return P(e,[])}function P(e,t){switch(typeof e){case"string":return JSON.stringify(e);case"function":return e.name?`[function ${e.name}]`:"[function]";case"object":return De(e,t);default:return String(e)}}function De(e,t){if(e===null)return"null";if(t.includes(e))return"[Circular]";const n=[...t,e];if(Se(e)){const s=e.toJSON();if(s!==e)return typeof s=="string"?s:P(s,n)}else if(Array.isArray(e))return Ae(e,n);return Oe(e,n)}function Se(e){return typeof e.toJSON=="function"}function Oe(e,t){const n=Object.entries(e);return n.length===0?"{}":t.length>Z?"["+Ce(e)+"]":"{ "+n.map(([i,r])=>i+": "+P(r,t)).join(", ")+" }"}function Ae(e,t){if(e.length===0)return"[]";if(t.length>Z)return"[Array]";const n=Math.min(ke,e.length),s=e.length-n,i=[];for(let r=0;r<n;++r)i.push(P(e[r],t));return s===1?i.push("... 1 more item"):s>1&&i.push(`... ${s} more items`),"["+i.join(", ")+"]"}function Ce(e){const t=Object.prototype.toString.call(e).replace(/^\[object /,"").replace(/]$/,"");if(t==="Object"&&typeof e.constructor=="function"){const n=e.constructor.name;if(typeof n=="string"&&n!=="")return n}return t}const Pe=globalThis.process&&!0,$e=Pe?function(t,n){return t instanceof n}:function(t,n){if(t instanceof n)return!0;if(typeof t=="object"&&t!==null){var s;const i=n.prototype[Symbol.toStringTag],r=Symbol.toStringTag in t?t[Symbol.toStringTag]:(s=t.constructor)===null||s===void 0?void 0:s.name;if(i===r){const o=K(t);throw new Error(`Cannot use ${i} "${o}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`)}}return!1};class ee{constructor(t,n="GraphQL request",s={line:1,column:1}){typeof t=="string"||L(!1,`Body must be a string. Received: ${K(t)}.`),this.body=t,this.name=n,this.locationOffset=s,this.locationOffset.line>0||L(!1,"line in locationOffset is 1-indexed and must be positive."),this.locationOffset.column>0||L(!1,"column in locationOffset is 1-indexed and must be positive.")}get[Symbol.toStringTag](){return"Source"}}function Le(e){return $e(e,ee)}function Re(e,t){return new we(e,t).parseDocument()}class we{constructor(t,n={}){const s=Le(t)?t:new ee(t);this._lexer=new _e(s),this._options=n,this._tokenCounter=0}parseName(){const t=this.expectToken(a.NAME);return this.node(t,{kind:u.NAME,value:t.value})}parseDocument(){return this.node(this._lexer.token,{kind:u.DOCUMENT,definitions:this.many(a.SOF,this.parseDefinition,a.EOF)})}parseDefinition(){if(this.peek(a.BRACE_L))return this.parseOperationDefinition();const t=this.peekDescription(),n=t?this._lexer.lookahead():this._lexer.token;if(n.kind===a.NAME){switch(n.value){case"schema":return this.parseSchemaDefinition();case"scalar":return this.parseScalarTypeDefinition();case"type":return this.parseObjectTypeDefinition();case"interface":return this.parseInterfaceTypeDefinition();case"union":return this.parseUnionTypeDefinition();case"enum":return this.parseEnumTypeDefinition();case"input":return this.parseInputObjectTypeDefinition();case"directive":return this.parseDirectiveDefinition()}if(t)throw m(this._lexer.source,this._lexer.token.start,"Unexpected description, descriptions are supported only on type definitions.");switch(n.value){case"query":case"mutation":case"subscription":return this.parseOperationDefinition();case"fragment":return this.parseFragmentDefinition();case"extend":return this.parseTypeSystemExtension()}}throw this.unexpected(n)}parseOperationDefinition(){const t=this._lexer.token;if(this.peek(a.BRACE_L))return this.node(t,{kind:u.OPERATION_DEFINITION,operation:N.QUERY,name:void 0,variableDefinitions:[],directives:[],selectionSet:this.parseSelectionSet()});const n=this.parseOperationType();let s;return this.peek(a.NAME)&&(s=this.parseName()),this.node(t,{kind:u.OPERATION_DEFINITION,operation:n,name:s,variableDefinitions:this.parseVariableDefinitions(),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseOperationType(){const t=this.expectToken(a.NAME);switch(t.value){case"query":return N.QUERY;case"mutation":return N.MUTATION;case"subscription":return N.SUBSCRIPTION}throw this.unexpected(t)}parseVariableDefinitions(){return this.optionalMany(a.PAREN_L,this.parseVariableDefinition,a.PAREN_R)}parseVariableDefinition(){return this.node(this._lexer.token,{kind:u.VARIABLE_DEFINITION,variable:this.parseVariable(),type:(this.expectToken(a.COLON),this.parseTypeReference()),defaultValue:this.expectOptionalToken(a.EQUALS)?this.parseConstValueLiteral():void 0,directives:this.parseConstDirectives()})}parseVariable(){const t=this._lexer.token;return this.expectToken(a.DOLLAR),this.node(t,{kind:u.VARIABLE,name:this.parseName()})}parseSelectionSet(){return this.node(this._lexer.token,{kind:u.SELECTION_SET,selections:this.many(a.BRACE_L,this.parseSelection,a.BRACE_R)})}parseSelection(){return this.peek(a.SPREAD)?this.parseFragment():this.parseField()}parseField(){const t=this._lexer.token,n=this.parseName();let s,i;return this.expectOptionalToken(a.COLON)?(s=n,i=this.parseName()):i=n,this.node(t,{kind:u.FIELD,alias:s,name:i,arguments:this.parseArguments(!1),directives:this.parseDirectives(!1),selectionSet:this.peek(a.BRACE_L)?this.parseSelectionSet():void 0})}parseArguments(t){const n=t?this.parseConstArgument:this.parseArgument;return this.optionalMany(a.PAREN_L,n,a.PAREN_R)}parseArgument(t=!1){const n=this._lexer.token,s=this.parseName();return this.expectToken(a.COLON),this.node(n,{kind:u.ARGUMENT,name:s,value:this.parseValueLiteral(t)})}parseConstArgument(){return this.parseArgument(!0)}parseFragment(){const t=this._lexer.token;this.expectToken(a.SPREAD);const n=this.expectOptionalKeyword("on");return!n&&this.peek(a.NAME)?this.node(t,{kind:u.FRAGMENT_SPREAD,name:this.parseFragmentName(),directives:this.parseDirectives(!1)}):this.node(t,{kind:u.INLINE_FRAGMENT,typeCondition:n?this.parseNamedType():void 0,directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseFragmentDefinition(){const t=this._lexer.token;return this.expectKeyword("fragment"),this._options.allowLegacyFragmentVariables===!0?this.node(t,{kind:u.FRAGMENT_DEFINITION,name:this.parseFragmentName(),variableDefinitions:this.parseVariableDefinitions(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()}):this.node(t,{kind:u.FRAGMENT_DEFINITION,name:this.parseFragmentName(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseFragmentName(){if(this._lexer.token.value==="on")throw this.unexpected();return this.parseName()}parseValueLiteral(t){const n=this._lexer.token;switch(n.kind){case a.BRACKET_L:return this.parseList(t);case a.BRACE_L:return this.parseObject(t);case a.INT:return this.advanceLexer(),this.node(n,{kind:u.INT,value:n.value});case a.FLOAT:return this.advanceLexer(),this.node(n,{kind:u.FLOAT,value:n.value});case a.STRING:case a.BLOCK_STRING:return this.parseStringLiteral();case a.NAME:switch(this.advanceLexer(),n.value){case"true":return this.node(n,{kind:u.BOOLEAN,value:!0});case"false":return this.node(n,{kind:u.BOOLEAN,value:!1});case"null":return this.node(n,{kind:u.NULL});default:return this.node(n,{kind:u.ENUM,value:n.value})}case a.DOLLAR:if(t)if(this.expectToken(a.DOLLAR),this._lexer.token.kind===a.NAME){const s=this._lexer.token.value;throw m(this._lexer.source,n.start,`Unexpected variable "$${s}" in constant value.`)}else throw this.unexpected(n);return this.parseVariable();default:throw this.unexpected()}}parseConstValueLiteral(){return this.parseValueLiteral(!0)}parseStringLiteral(){const t=this._lexer.token;return this.advanceLexer(),this.node(t,{kind:u.STRING,value:t.value,block:t.kind===a.BLOCK_STRING})}parseList(t){const n=()=>this.parseValueLiteral(t);return this.node(this._lexer.token,{kind:u.LIST,values:this.any(a.BRACKET_L,n,a.BRACKET_R)})}parseObject(t){const n=()=>this.parseObjectField(t);return this.node(this._lexer.token,{kind:u.OBJECT,fields:this.any(a.BRACE_L,n,a.BRACE_R)})}parseObjectField(t){const n=this._lexer.token,s=this.parseName();return this.expectToken(a.COLON),this.node(n,{kind:u.OBJECT_FIELD,name:s,value:this.parseValueLiteral(t)})}parseDirectives(t){const n=[];for(;this.peek(a.AT);)n.push(this.parseDirective(t));return n}parseConstDirectives(){return this.parseDirectives(!0)}parseDirective(t){const n=this._lexer.token;return this.expectToken(a.AT),this.node(n,{kind:u.DIRECTIVE,name:this.parseName(),arguments:this.parseArguments(t)})}parseTypeReference(){const t=this._lexer.token;let n;if(this.expectOptionalToken(a.BRACKET_L)){const s=this.parseTypeReference();this.expectToken(a.BRACKET_R),n=this.node(t,{kind:u.LIST_TYPE,type:s})}else n=this.parseNamedType();return this.expectOptionalToken(a.BANG)?this.node(t,{kind:u.NON_NULL_TYPE,type:n}):n}parseNamedType(){return this.node(this._lexer.token,{kind:u.NAMED_TYPE,name:this.parseName()})}peekDescription(){return this.peek(a.STRING)||this.peek(a.BLOCK_STRING)}parseDescription(){if(this.peekDescription())return this.parseStringLiteral()}parseSchemaDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("schema");const s=this.parseConstDirectives(),i=this.many(a.BRACE_L,this.parseOperationTypeDefinition,a.BRACE_R);return this.node(t,{kind:u.SCHEMA_DEFINITION,description:n,directives:s,operationTypes:i})}parseOperationTypeDefinition(){const t=this._lexer.token,n=this.parseOperationType();this.expectToken(a.COLON);const s=this.parseNamedType();return this.node(t,{kind:u.OPERATION_TYPE_DEFINITION,operation:n,type:s})}parseScalarTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("scalar");const s=this.parseName(),i=this.parseConstDirectives();return this.node(t,{kind:u.SCALAR_TYPE_DEFINITION,description:n,name:s,directives:i})}parseObjectTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("type");const s=this.parseName(),i=this.parseImplementsInterfaces(),r=this.parseConstDirectives(),o=this.parseFieldsDefinition();return this.node(t,{kind:u.OBJECT_TYPE_DEFINITION,description:n,name:s,interfaces:i,directives:r,fields:o})}parseImplementsInterfaces(){return this.expectOptionalKeyword("implements")?this.delimitedMany(a.AMP,this.parseNamedType):[]}parseFieldsDefinition(){return this.optionalMany(a.BRACE_L,this.parseFieldDefinition,a.BRACE_R)}parseFieldDefinition(){const t=this._lexer.token,n=this.parseDescription(),s=this.parseName(),i=this.parseArgumentDefs();this.expectToken(a.COLON);const r=this.parseTypeReference(),o=this.parseConstDirectives();return this.node(t,{kind:u.FIELD_DEFINITION,description:n,name:s,arguments:i,type:r,directives:o})}parseArgumentDefs(){return this.optionalMany(a.PAREN_L,this.parseInputValueDef,a.PAREN_R)}parseInputValueDef(){const t=this._lexer.token,n=this.parseDescription(),s=this.parseName();this.expectToken(a.COLON);const i=this.parseTypeReference();let r;this.expectOptionalToken(a.EQUALS)&&(r=this.parseConstValueLiteral());const o=this.parseConstDirectives();return this.node(t,{kind:u.INPUT_VALUE_DEFINITION,description:n,name:s,type:i,defaultValue:r,directives:o})}parseInterfaceTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("interface");const s=this.parseName(),i=this.parseImplementsInterfaces(),r=this.parseConstDirectives(),o=this.parseFieldsDefinition();return this.node(t,{kind:u.INTERFACE_TYPE_DEFINITION,description:n,name:s,interfaces:i,directives:r,fields:o})}parseUnionTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("union");const s=this.parseName(),i=this.parseConstDirectives(),r=this.parseUnionMemberTypes();return this.node(t,{kind:u.UNION_TYPE_DEFINITION,description:n,name:s,directives:i,types:r})}parseUnionMemberTypes(){return this.expectOptionalToken(a.EQUALS)?this.delimitedMany(a.PIPE,this.parseNamedType):[]}parseEnumTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("enum");const s=this.parseName(),i=this.parseConstDirectives(),r=this.parseEnumValuesDefinition();return this.node(t,{kind:u.ENUM_TYPE_DEFINITION,description:n,name:s,directives:i,values:r})}parseEnumValuesDefinition(){return this.optionalMany(a.BRACE_L,this.parseEnumValueDefinition,a.BRACE_R)}parseEnumValueDefinition(){const t=this._lexer.token,n=this.parseDescription(),s=this.parseEnumValueName(),i=this.parseConstDirectives();return this.node(t,{kind:u.ENUM_VALUE_DEFINITION,description:n,name:s,directives:i})}parseEnumValueName(){if(this._lexer.token.value==="true"||this._lexer.token.value==="false"||this._lexer.token.value==="null")throw m(this._lexer.source,this._lexer.token.start,`${S(this._lexer.token)} is reserved and cannot be used for an enum value.`);return this.parseName()}parseInputObjectTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("input");const s=this.parseName(),i=this.parseConstDirectives(),r=this.parseInputFieldsDefinition();return this.node(t,{kind:u.INPUT_OBJECT_TYPE_DEFINITION,description:n,name:s,directives:i,fields:r})}parseInputFieldsDefinition(){return this.optionalMany(a.BRACE_L,this.parseInputValueDef,a.BRACE_R)}parseTypeSystemExtension(){const t=this._lexer.lookahead();if(t.kind===a.NAME)switch(t.value){case"schema":return this.parseSchemaExtension();case"scalar":return this.parseScalarTypeExtension();case"type":return this.parseObjectTypeExtension();case"interface":return this.parseInterfaceTypeExtension();case"union":return this.parseUnionTypeExtension();case"enum":return this.parseEnumTypeExtension();case"input":return this.parseInputObjectTypeExtension()}throw this.unexpected(t)}parseSchemaExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("schema");const n=this.parseConstDirectives(),s=this.optionalMany(a.BRACE_L,this.parseOperationTypeDefinition,a.BRACE_R);if(n.length===0&&s.length===0)throw this.unexpected();return this.node(t,{kind:u.SCHEMA_EXTENSION,directives:n,operationTypes:s})}parseScalarTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("scalar");const n=this.parseName(),s=this.parseConstDirectives();if(s.length===0)throw this.unexpected();return this.node(t,{kind:u.SCALAR_TYPE_EXTENSION,name:n,directives:s})}parseObjectTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("type");const n=this.parseName(),s=this.parseImplementsInterfaces(),i=this.parseConstDirectives(),r=this.parseFieldsDefinition();if(s.length===0&&i.length===0&&r.length===0)throw this.unexpected();return this.node(t,{kind:u.OBJECT_TYPE_EXTENSION,name:n,interfaces:s,directives:i,fields:r})}parseInterfaceTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("interface");const n=this.parseName(),s=this.parseImplementsInterfaces(),i=this.parseConstDirectives(),r=this.parseFieldsDefinition();if(s.length===0&&i.length===0&&r.length===0)throw this.unexpected();return this.node(t,{kind:u.INTERFACE_TYPE_EXTENSION,name:n,interfaces:s,directives:i,fields:r})}parseUnionTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("union");const n=this.parseName(),s=this.parseConstDirectives(),i=this.parseUnionMemberTypes();if(s.length===0&&i.length===0)throw this.unexpected();return this.node(t,{kind:u.UNION_TYPE_EXTENSION,name:n,directives:s,types:i})}parseEnumTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("enum");const n=this.parseName(),s=this.parseConstDirectives(),i=this.parseEnumValuesDefinition();if(s.length===0&&i.length===0)throw this.unexpected();return this.node(t,{kind:u.ENUM_TYPE_EXTENSION,name:n,directives:s,values:i})}parseInputObjectTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("input");const n=this.parseName(),s=this.parseConstDirectives(),i=this.parseInputFieldsDefinition();if(s.length===0&&i.length===0)throw this.unexpected();return this.node(t,{kind:u.INPUT_OBJECT_TYPE_EXTENSION,name:n,directives:s,fields:i})}parseDirectiveDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("directive"),this.expectToken(a.AT);const s=this.parseName(),i=this.parseArgumentDefs(),r=this.expectOptionalKeyword("repeatable");this.expectKeyword("on");const o=this.parseDirectiveLocations();return this.node(t,{kind:u.DIRECTIVE_DEFINITION,description:n,name:s,arguments:i,repeatable:r,locations:o})}parseDirectiveLocations(){return this.delimitedMany(a.PIPE,this.parseDirectiveLocation)}parseDirectiveLocation(){const t=this._lexer.token,n=this.parseName();if(Object.prototype.hasOwnProperty.call(F,n.value))return n;throw this.unexpected(t)}node(t,n){return this._options.noLocation!==!0&&(n.loc=new ce(t,this._lexer.lastToken,this._lexer.source)),n}peek(t){return this._lexer.token.kind===t}expectToken(t){const n=this._lexer.token;if(n.kind===t)return this.advanceLexer(),n;throw m(this._lexer.source,n.start,`Expected ${te(t)}, found ${S(n)}.`)}expectOptionalToken(t){return this._lexer.token.kind===t?(this.advanceLexer(),!0):!1}expectKeyword(t){const n=this._lexer.token;if(n.kind===a.NAME&&n.value===t)this.advanceLexer();else throw m(this._lexer.source,n.start,`Expected "${t}", found ${S(n)}.`)}expectOptionalKeyword(t){const n=this._lexer.token;return n.kind===a.NAME&&n.value===t?(this.advanceLexer(),!0):!1}unexpected(t){const n=t??this._lexer.token;return m(this._lexer.source,n.start,`Unexpected ${S(n)}.`)}any(t,n,s){this.expectToken(t);const i=[];for(;!this.expectOptionalToken(s);)i.push(n.call(this));return i}optionalMany(t,n,s){if(this.expectOptionalToken(t)){const i=[];do i.push(n.call(this));while(!this.expectOptionalToken(s));return i}return[]}many(t,n,s){this.expectToken(t);const i=[];do i.push(n.call(this));while(!this.expectOptionalToken(s));return i}delimitedMany(t,n){this.expectOptionalToken(t);const s=[];do s.push(n.call(this));while(this.expectOptionalToken(t));return s}advanceLexer(){const{maxTokens:t}=this._options,n=this._lexer.advance();if(t!==void 0&&n.kind!==a.EOF&&(++this._tokenCounter,this._tokenCounter>t))throw m(this._lexer.source,n.start,`Document contains more that ${t} tokens. Parsing aborted.`)}}function S(e){const t=e.value;return te(e.kind)+(t!=null?` "${t}"`:"")}function te(e){return ge(e)?`"${e}"`:e}var O=new Map,M=new Map,ne=!0,A=!1;function ie(e){return e.replace(/[\s,]+/g," ").trim()}function Fe(e){return ie(e.source.body.substring(e.start,e.end))}function Ue(e){var t=new Set,n=[];return e.definitions.forEach(function(s){if(s.kind==="FragmentDefinition"){var i=s.name.value,r=Fe(s.loc),o=M.get(i);o&&!o.has(r)?ne&&console.warn("Warning: fragment with name "+i+` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`):o||M.set(i,o=new Set),o.add(r),t.has(r)||(t.add(r),n.push(s))}else n.push(s)}),q(q({},e),{definitions:n})}function Me(e){var t=new Set(e.definitions);t.forEach(function(s){s.loc&&delete s.loc,Object.keys(s).forEach(function(i){var r=s[i];r&&typeof r=="object"&&t.add(r)})});var n=e.loc;return n&&(delete n.startToken,delete n.endToken),e}function Be(e){var t=ie(e);if(!O.has(t)){var n=Re(e,{experimentalFragmentVariables:A,allowLegacyFragmentVariables:A});if(!n||n.kind!=="Document")throw new Error("Not a valid GraphQL document.");O.set(t,Me(Ue(n)))}return O.get(t)}function c(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];typeof e=="string"&&(e=[e]);var s=e[0];return t.forEach(function(i,r){i&&i.kind==="Document"?s+=i.loc.source.body:s+=i,s+=e[r+1]}),Be(s)}function Ve(){O.clear(),M.clear()}function qe(){ne=!1}function Ge(){A=!0}function je(){A=!1}var x={gql:c,resetCaches:Ve,disableFragmentWarnings:qe,enableExperimentalFragmentVariables:Ge,disableExperimentalFragmentVariables:je};(function(e){e.gql=x.gql,e.resetCaches=x.resetCaches,e.disableFragmentWarnings=x.disableFragmentWarnings,e.enableExperimentalFragmentVariables=x.enableExperimentalFragmentVariables,e.disableExperimentalFragmentVariables=x.disableExperimentalFragmentVariables})(c||(c={}));c.default=c;var Ye=(e=>(e.Guide="guide",e.Loop="loop",e.Oneshot="oneshot",e.Technique="technique",e))(Ye||{}),Je=(e=>(e.DemoMp3="demo_mp3",e.CoverImage="cover_image",e.HeaderImage="header_image",e.Mp4="mp4",e.PreviewMp3="preview_mp3",e.Source="source",e.ThumbnailImage="thumbnail_image",e.Waveform="waveform",e.ZipFile="zip_file",e.BannerImage="banner_image",e.VttTranscript="vtt_transcript",e.SrtTranscript="srt_transcript",e.GeneratedCoverImage="generated_cover_image",e))(Je||{}),Qe=(e=>(e.Name="name",e.UpdatedAt="updated_at",e.Score="score",e.Bpm="bpm",e.Key="key",e.Duration="duration",e.AudioKey="audio_key",e.ProviderName="provider_name",e.AssetStatusSlug="asset_status_slug",e.PublishedAt="published_at",e.Popularity="popularity",e.Relevance="relevance",e.Recency="recency",e.Random="random",e.Recommended="recommended",e))(Qe||{}),Xe=(e=>(e.Published="published",e.Unpublished="unpublished",e))(Xe||{}),ze=(e=>(e.Collection="collection",e.Lesson="lesson",e.Pack="pack",e.Plugin="plugin",e.Preset="preset",e.Sample="sample",e.Video="video",e.Midi="midi",e))(ze||{}),He=(e=>(e.Monthly="monthly",e.Annual="annual",e))(He||{}),We=(e=>(e.Credits="Credits",e.Usd="USD",e))(We||{}),Ze=(e=>(e.Image="image",e.Video="video",e))(Ze||{}),Ke=(e=>(e.Sounds="sounds",e.Splice="splice",e.Daw="daw",e))(Ke||{}),et=(e=>(e.Asc="ASC",e.Desc="DESC",e))(et||{}),tt=(e=>(e.New="new",e.Trial="trial",e.Active="active",e.Paused="paused",e.PastDue="past_due",e.Cancelled="cancelled",e.TrialCancelled="trial_cancelled",e.Processing="processing",e.PauseScheduled="pause_scheduled",e.CancellationScheduled="cancellation_scheduled",e.TrialCancellationScheduled="trial_cancellation_scheduled",e))(tt||{});const nt=c`
    fragment deviceSummaries on AssetPage {
  device_summary {
    device {
      uuid
      name
    }
    count
  }
}
    `,D=c`
    fragment assetPageItems on AssetPage {
  items {
    ... on IAsset {
      asset_type_slug
      asset_prices {
        amount
        currency
      }
      uuid
      name
      tags {
        uuid
        label
      }
      files {
        uuid
        name
        hash
        path
        asset_file_type_slug
        url
      }
    }
    ... on IAssetChild {
      parents(filter: {asset_type_slug: pack}) {
        items {
          ... on PackAsset {
            permalink_slug
            permalink_base_url
            uuid
            name
            files {
              uuid
              path
              asset_file_type_slug
              url
            }
          }
        }
      }
    }
    ... on SampleAsset {
      bpm
      chord_type
      key
      duration
      uuid
      name
      asset_category_slug
    }
    ... on PresetAsset {
      uuid
      name
      asset_devices {
        uuid
        device {
          name
          uuid
          minimum_device_version
        }
      }
    }
    ... on PackAsset {
      uuid
      name
      provider {
        name
        permalink_slug
      }
      provider_uuid
      uuid
      permalink_slug
      permalink_base_url
      main_genre
    }
  }
}
    `,it=c`
    fragment assetTagSummaries on AssetPage {
  tag_summary {
    count
    tag {
      uuid
      label
      taxonomy {
        uuid
        name
      }
    }
  }
}
    `,V=c`
    fragment assetDetails on AssetPage {
  ...assetPageItems
  ...assetTagSummaries
  pagination_metadata {
    currentPage
    totalPages
  }
  response_metadata {
    records
  }
}
    ${D}
${it}`,$=c`
    fragment subscriptionFragment on PlanSubscription {
  uuid
  state
  expires_at
  resume_at
  credits
  plan {
    uuid
    display_name
    billing_frequency
    trial_length_days
    group {
      name
    }
    price {
      usd
    }
    monthly_credits
    code
    plan_details {
      description
      thumbnail_url
    }
  }
}
    `,ot=c`
    query CollectionAssetTotals($collectionUuid: GUID) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample}
    children: {parent_asset_uuid: $collectionUuid}
    legacy: {parent_asset_type: collection, use: true}
  ) {
    response_metadata {
      records
    }
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset}
    children: {parent_asset_uuid: $collectionUuid}
    legacy: {parent_asset_type: collection, use: true}
  ) {
    response_metadata {
      records
    }
  }
}
    `,ut=c`
    query CollectionByPermalink($permalink: String!) {
  collection: legacyCollectionByPermalink(permalink: $permalink) {
    uuid
    name
    description
    owned
    is_subscribed
    public
    permalink_slug
    subscriber_count
    subscribers_subset {
      username
      avatar_url
    }
    creator {
      username
    }
    files {
      uuid
      asset_file_type_slug
      url
      path
    }
  }
}
    `,ct=c`
    query PacksSearch($page: Int, $order: SortOrder = DESC, $limit: Int = 50, $sort: AssetSortType = relevance, $random_seed: String, $tags: [ID!], $query: String, $ac_uuid: String) {
  assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: pack, tag_ids: $tags, query: $query, ac_uuid: $ac_uuid}
    pagination: {page: $page, limit: $limit}
    sort: {sort: $sort, order: $order, random_seed: $random_seed}
  ) {
    ...assetDetails
  }
}
    ${V}`,lt=c`
    query PresetsSearch($parent_asset_uuid: GUID, $query: String, $tags: [ID], $device_uuids: [GUID], $page: Int = 1, $limit: Int = 50, $order: SortOrder = DESC, $sort: AssetSortType = popularity, $random_seed: String, $ac_uuid: String, $parent_asset_type: AssetTypeSlug) {
  assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset, query: $query, tag_ids: $tags, device_uuids: $device_uuids, ac_uuid: $ac_uuid}
    children: {parent_asset_uuid: $parent_asset_uuid}
    pagination: {page: $page, limit: $limit}
    sort: {sort: $sort, order: $order, random_seed: $random_seed}
    legacy: {parent_asset_type: $parent_asset_type}
  ) {
    ...assetDetails
    ...deviceSummaries
  }
}
    ${V}
${nt}`,pt=c`
    query SamplesSearch($parent_asset_uuid: GUID, $query: String, $order: SortOrder = DESC, $sort: AssetSortType = popularity, $random_seed: String, $tags: [ID], $key: String, $chord_type: String, $bpm: String, $min_bpm: Int, $max_bpm: Int, $limit: Int = 50, $asset_category_slug: AssetCategorySlug, $page: Int = 1, $ac_uuid: String, $parent_asset_type: AssetTypeSlug) {
  assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample, query: $query, tag_ids: $tags, key: $key, chord_type: $chord_type, bpm: $bpm, min_bpm: $min_bpm, max_bpm: $max_bpm, asset_category_slug: $asset_category_slug, ac_uuid: $ac_uuid}
    children: {parent_asset_uuid: $parent_asset_uuid}
    pagination: {page: $page, limit: $limit}
    sort: {sort: $sort, order: $order, random_seed: $random_seed}
    legacy: {parent_asset_type: $parent_asset_type}
  ) {
    ...assetDetails
  }
}
    ${V}`;c`
    query Session {
  user {
    id
    email
    name
    username
    avatar_url
    uuid
    extendedAttributes {
      sounds
    }
  }
  intercomUser {
    hash
  }
}
    `;const dt=c`
    query SingleSoundDetail($assetUuid: GUID!, $legacy: AssetLegacyInput) {
  asset: asset(uuid: $assetUuid, legacy: $legacy) {
    __typename
    ... on IAsset {
      uuid
      name
      asset_prices {
        currency
        amount
      }
      asset_status_slug
      asset_type_slug
      files {
        uuid
        name
        url
        asset_file_type_slug
      }
      tags {
        uuid
        label
        taxonomy {
          uuid
          name
        }
      }
      ... on SampleAsset {
        asset_category_slug
        bpm
        key
        has_coso
        has_similar_sounds
        catalog_uuid
        chord_type
      }
      ... on PresetAsset {
        asset_devices {
          device {
            name
          }
        }
        catalog_uuid
      }
    }
    ... on IAssetChild {
      parents(filter: {asset_type_slug: pack}) {
        items {
          __typename
          ... on IAssetParent {
            child_asset_counts {
              type
              count
            }
          }
          ... on PackAsset {
            main_genre
            uuid
            name
            permalink_base_url
            permalink_slug
            provider {
              uuid
              name
              permalink_slug
            }
            files {
              uuid
              asset_file_type_slug
              url
              path
            }
          }
        }
      }
    }
  }
}
    `,ht=c`
    query SoundsSearchAutocomplete($term: String!) {
  soundsSearchSuggestions(searchTerm: $term, limit: 7, context: "marketplace") {
    autocompleteUuid
    results {
      autocompleteTerm
      termType
      length
      offset
    }
  }
}
    `,mt=c`
    query CategoryList($tagCategory: String!) {
  categories: tagCategoryList(permalink_slug: $tagCategory, v2Enabled: true) {
    uuid
    permalink_slug
    name
    categories {
      uuid
      name
      permalink
      description
      altDescription
      altName
      tags {
        uuid
        label
      }
      subcategories {
        uuid
        name
        permalink
        description
        altDescription
        altName
        tags {
          uuid
          label
        }
      }
    }
  }
}
    `,_t=c`
    query TagOverview($tags: [ID]) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample, tag_ids: $tags}
    pagination: {limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset, tag_ids: $tags}
    pagination: {limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
  packs: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: pack, tag_ids: $tags}
    pagination: {limit: 6}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
}
    ${D}`;c`
    query HomePage($groupList: [PlanGroupSlug], $billingFrequency: [BillingFrequencySlug], $flagEvaluations: [PricingFlagEvaluation]) {
  plans(
    group: $groupList
    billing_frequency: $billingFrequency
    flag_evaluations: $flagEvaluations
  ) {
    uuid
    display_name
    billing_frequency
    price {
      usd
    }
    ramp_price {
      usd
    }
    ramp_duration
    pricing_model
    monthly_credits
    tier
    code
    group {
      name
    }
    plan_details {
      thumbnail_url
      features_title
      plan_features {
        text
        flags
      }
    }
  }
}
    `;const gt=c`
    query PlansPage($group: PlanGroupSlug, $groupList: [PlanGroupSlug], $billing_frequency: [BillingFrequencySlug], $flagEvaluations: [PricingFlagEvaluation]) {
  plans(
    group: $groupList
    billing_frequency: $billing_frequency
    flag_evaluations: $flagEvaluations
  ) {
    uuid
    display_name
    billing_frequency
    price {
      usd
    }
    ramp_price {
      usd
    }
    ramp_duration
    pricing_model
    tier
    code
    group {
      name
    }
    plan_details {
      thumbnail_url
      features_title
      plan_features {
        text
        flags
      }
    }
    plan_select_table_values {
      key
      value
    }
  }
  planSelectTableHeaders(flag_evaluations: $flagEvaluations) {
    header
    key
    tooltip
  }
  frequentlyAskedQuestions(group: $group, flag_evaluations: $flagEvaluations) {
    content
    title
    analytics {
      link
      text
      payload {
        unit_name
        unit_type
      }
    }
  }
  featuredPlanContent(group: $group) {
    image
    title
    text
  }
  featuredPlanTerms(group: $group) {
    image
    title
    text
    mobileText
  }
}
    `;c`
    query PlansPageServer {
  subscription {
    state
  }
}
    `;const ft=c`
    query PlansStudioOnePage($group: PlanGroupSlug, $groupList: [PlanGroupSlug], $billing_frequency: [BillingFrequencySlug]) {
  plans(group: $groupList, billing_frequency: $billing_frequency) {
    uuid
    display_name
    billing_frequency
    price {
      usd
    }
    ramp_price {
      usd
    }
    ramp_duration
    pricing_model
    tier
    code
    group {
      name
    }
    plan_details {
      plan_features {
        text
      }
      features_title
    }
  }
  frequentlyAskedQuestions(group: $group) {
    content
    title
  }
  subscription {
    state
  }
}
    `,yt=c`
    query AboutPage($group: PlanGroupSlug) {
  featuredPlanContent(group: $group) {
    image
    title
    text
  }
  featuredPlanTerms(group: $group) {
    image
    title
    text
    mobileText
  }
  frequentlyAskedQuestions(group: $group) {
    content
    title
  }
}
    `,Et=c`
    query GearById($pluginId: String!) {
  plugin: wwwPlugin(id: $pluginId) {
    seller_code
    name
    purchase_type
    price
    thumbnail_url
    background_url
    description
    tag_list
    retail_url
    manufacturer {
      canonical_path
      description
      name
      url
      logo_url
    }
    gear_details {
      plugin_description_id
      plugin_seller_code
      name
      full_price
      installment_price
      total_installments
      trial_period_days
      marketing_opt_in
      edition_level
      discount_text
      created_at
      has_upgrade
      included_components {
        type
        leasable_data {
          installment_price
        }
        gear_data {
          canonical_path
          display_name
          thumbnail_url
        }
      }
      included_in {
        type
        leasable_data {
          installment_price
        }
        gear_data {
          canonical_path
          display_name
          thumbnail_url
        }
      }
      gallery {
        type
        order
        ... on GearImage {
          url
          alt_text
        }
        ... on GearVideo {
          description
          duration
          title
          thumbnail_url
          upload_date
          url
          youtube_id
        }
      }
      marketing {
        seo_title
        seo_description
        share_image_path
      }
      specifications {
        specification_text
        specification_images
        system_requirements
        max_activations
      }
      features {
        type
        order
        ... on GearImage {
          url
          alt_text
          title
          description
        }
        ... on GearVideo {
          url
          youtube_id
          description
          thumbnail_url
          duration
          title
        }
      }
      description
      editions {
        plugin_description_id
        installment_price
        label
        canonical_path
      }
      highlights {
        title
        description
        items {
          type
          order
          ... on GearImage {
            url
            title
            description
          }
          ... on GearVideo {
            highlight_thumbnail
            url
            title
            description
            thumbnail_url
            duration
          }
        }
      }
      mini_features {
        title
        items {
          type
          order
          ... on GearImage {
            url
            title
            description
          }
          ... on GearVideo {
            url
            title
            description
            thumbnail_url
            duration
          }
        }
      }
      testimonials {
        type
        order
        url
        title
        description
      }
    }
  }
  ad: wwwPluginsShow {
    alt
    src
    src_2x
    src_mobile
    src_mobile_2x
    product {
      canonical_url
    }
  }
}
    `,It=c`
    query CombinedPlanSubscriberAndTaxes($group: PlanGroupSlug) {
  subscription(group: $group) {
    ...subscriptionFragment
  }
  conversionInfo {
    plan_tax
    plan_total
    has_valid_coupon
    amount_off
    duration
    tax_type
  }
  wwwPluginLeases {
    uuid
    state
    plugin_display_name
    installment_price
    total_installments
    installments_paid
    period_end_at
    leasable_plugin {
      plugin_seller_code
    }
    plugin {
      thumbnail_url
    }
  }
}
    ${$}`;c`
    mutation UncancelSubscription($subscriptionUUID: ID!) {
  uncancelSubscription(subscriptionUUID: $subscriptionUUID) {
    ...subscriptionFragment
  }
}
    ${$}`;c`
    mutation UnpauseSubscription($subscriptionUUID: ID!) {
  unpauseSubscription(subscriptionUUID: $subscriptionUUID) {
    ...subscriptionFragment
  }
}
    ${$}`;c`
    mutation ConvertTrialToSubscription($subscriptionUUID: ID!) {
  convertTrialToSubscription(subscriptionUUID: $subscriptionUUID) {
    ...subscriptionFragment
  }
}
    ${$}`;c`
    query ProfilePlansPage($group: PlanGroupSlug) {
  subscription(group: $group) {
    uuid
    state
    expires_at
    resume_at
    credits
    plan {
      uuid
      display_name
      billing_frequency
      trial_length_days
      group {
        name
      }
      price {
        usd
      }
      monthly_credits
      code
      plan_details {
        description
        thumbnail_url
      }
    }
  }
}
    `;const Tt=c`
    query ChangePage($group: PlanGroupSlug, $groupList: [PlanGroupSlug], $billing_frequency: [BillingFrequencySlug], $flagEvaluations: [PricingFlagEvaluation]) {
  plans(
    group: $groupList
    billing_frequency: $billing_frequency
    flag_evaluations: $flagEvaluations
  ) {
    uuid
    display_name
    billing_frequency
    price {
      usd
    }
    ramp_price {
      usd
    }
    ramp_duration
    pricing_model
    tier
    code
    group {
      name
    }
    plan_details {
      thumbnail_url
      features_title
      plan_features {
        text
        flags
      }
      description
    }
    plan_select_table_values {
      key
      value
    }
  }
  plansPageCopy(group: $group, flag_evaluations: $flagEvaluations) {
    title
    subtitle
    CTA
    higherCTA
    lowerCTA
  }
  frequentlyAskedQuestions(group: $group, flag_evaluations: $flagEvaluations) {
    content
    title
  }
  subscription {
    state
    uuid
    plan_uuid
    plan {
      uuid
      group {
        name
      }
      tier
      billing_frequency
    }
    next {
      uuid
    }
  }
}
    `,Nt=c`
    query SoundsCatalog {
  contentGroups: contentGroupsTransformed {
    type
    title
    description
    entries {
      type
      url
      caption
      main_image_url
      mobile_image_url
      pack {
        uuid
        name
        main_genre
        description
        permalink_slug
        permalink_base_url
        provider {
          uuid
          permalink_slug
          name
        }
        files {
          uuid
          url
          path
          asset_file_type_slug
        }
      }
    }
  }
  recentPacks: wwwSoundsRecentPacks(per_page: 12) {
    uuid
    name
    permalink_base_url
    provider {
      uuid
      name
      permalink_slug
    }
    permalink_slug
    legacy_permalink
    liked
    files {
      uuid
      url
      asset_file_type_slug
      path
    }
  }
  topPacks: legacyPacksChart(searchParams: {perPage: 10}) {
    uuid
    name
    permalink_slug
    current_global_chart_pos
    last_global_chart_pos
    provider {
      uuid
      name
      permalink_slug
    }
    files {
      uuid
      url
      asset_file_type_slug
      path
    }
  }
  topLabels: wwwPremiumProviders(sort: "chart", per_page: 10) {
    uuid
    legacy_uuid
    url
    name
    image_path
    permalink_slug
    current_provider_chart_position
    last_provider_chart_position
    pack_count
  }
}
    `,bt=c`
    query GenreByPermalink($permalink: String!) {
  genre: wwwGenre(permalink: $permalink) {
    description
    seo_description
    name
    permalink
    bpm_high
    bpm_low
    year
    locations
    genres_influenced {
      name
      permalink
    }
    genres_influenced_by {
      name
      permalink
    }
  }
}
    `,xt=c`
    query GenreOverview($tags: [ID]) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample, tag_ids: $tags}
    pagination: {page: 1, limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset, tag_ids: $tags}
    pagination: {limit: 9}
  ) {
    ...assetPageItems
  }
  packs: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: pack, tag_ids: $tags}
    pagination: {page: 1, limit: 6}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
}
    ${D}`,vt=c`
    query PackByPermalink($permalink: String!) {
  pack: packAsset(permalink: $permalink) {
    uuid
    name
    main_genre
    description
    permalink_slug
    permalink_base_url
    provider {
      uuid
      name
      permalink_slug
    }
    files {
      uuid
      asset_file_type_slug
      url
      path
    }
    child_asset_counts {
      type
      count
    }
    companion_packs {
      uuid
      description
      permalink_slug
      files {
        uuid
        asset_file_type_slug
        url
        path
      }
      main_genre
      provider {
        uuid
        name
        permalink_slug
      }
      main_genre
      name
    }
    story {
      uuid
      background_url
      description
      title
      videos {
        background_url
        url
      }
    }
  }
}
    `,kt=c`
    query PackOverview($parent_asset_uuid: GUID!) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample}
    children: {parent_asset_uuid: $parent_asset_uuid}
    pagination: {page: 1, limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset}
    children: {parent_asset_uuid: $parent_asset_uuid}
    pagination: {page: 1, limit: 9}
    sort: {sort: popularity, order: DESC}
  ) {
    ...assetPageItems
  }
}
    ${D}`,Dt=c`
    query SearchOverview($query: String, $ac_uuid: String) {
  samples: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: sample, query: $query, ac_uuid: $ac_uuid}
    sort: {sort: popularity, order: DESC}
    pagination: {limit: 9}
  ) {
    ...assetPageItems
  }
  presets: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: preset, query: $query, ac_uuid: $ac_uuid}
    sort: {sort: popularity, order: DESC}
    pagination: {limit: 9}
  ) {
    ...assetPageItems
  }
  packs: assetsSearch(
    filter: {legacy: true, published: true, asset_type_slug: pack, query: $query, ac_uuid: $ac_uuid}
    sort: {sort: popularity, order: DESC}
    pagination: {limit: 6}
  ) {
    ...assetPageItems
  }
}
    ${D}`,St=c`
    query GenericTagPageMetadata($tagId: ID!) {
  tagPageMetadata(tagId: $tagId) {
    label
    productLandingPagePermalink
  }
}
    `;export{ze as A,He as B,mt as C,L as D,K as E,at as F,St as G,Et as H,u as K,vt as P,le as Q,dt as S,_t as T,Xe as a,ct as b,tt as c,lt as d,pt as e,Qe as f,xt as g,kt as h,Dt as i,ut as j,ot as k,bt as l,yt as m,Ke as n,ft as o,Nt as p,et as q,Je as r,We as s,Tt as t,ht as u,It as v,gt as w,Ze as x,Ye as y,rt as z};
