var $__MA = (function () {
	var MA = {
		d: document,
		dt: new Date(),
		p: document.getElementById('__maSrc').getAttribute('data-pid'),
		s: document.URL.indexOf('https:')==0?'s':'',
		e: encodeURIComponent,
		n: null,
		h: '',
		ac: '',
		captureStack: [],
		gNdN: function() {},
		b: function(p) {
			var p=p||'';
			return 'http'+MA.s+'://'+p+'cdnma.com/apps/';
		},
		eD: function(d) {
			var fd=d.split('.');
			return fd[fd.length-2]+'.'+fd[fd.length-1];
		},
		beginCapture: function() {
			var d=MA.d;
			MA.doCapture(d.location.href, d.referrer, MA.p);
		},
		doCapture: function(l, r, p) {
            if (p==7622) {
                return;
            }
			var d=MA.d,v=MA.getVisitorId(),e=MA.e,s=MA.s,t='script',cN=d.createElement(t),n;
			MA.ac=MA.uuid();
			cN.type = 'text/java'+t;
			cN.src = MA.b()+'capture.php?p='+p+'&l='+e(l)+'&u='+e(l)+'&r='+e(r)+'&uq='+v.v+'&c='+v.c+MA.df()+'&o='+v.o+'&ac='+MA.gAC()+'&t='+MA.dt.getTime();
			n=d.getElementsByTagName(t)[0];n.parentNode.insertBefore(cN,n);
		},
		doCbCapture: function(l, cb) {
			MA.captureStack = [
				{
					p: arguments,
					f: function(l, cb) {
						var d=MA.d,v=MA.getVisitorId(),e=MA.e,s=MA.s,i=new Image(1,1);
						i.src=MA.b()+'capture.php?p='+MA.p+'&l='+e(l)+'&u='+e(l)+'&r='+e(d.referrer)+'&uq='+v.v+'&c='+v.c+MA.df()+'&o='+v.o+'&t='+Math.random();
						i.onload = function () { i.onload = MA.n;i.onerror = MA.n;cb();};
						i.onerror = function () { i.onload = MA.n;i.onerror = MA.n;cb();};
					}
				}
			];
		},
		captureDownload: function(l) {
			MA.doCbCapture(l, function() {
				setTimeout(MA.gNdN, 1000);
			});
			if (MA.isIE()) {
				MA.executeStack();
			} else if (MA.isChrome() || MA.isSafari()) {
				var fun = function() {
					MA.executeStack();
					MA.rE(window, 'beforeunload', fun);
				};
				MA.aE(window, 'beforeunload', fun);
			} else {
				setTimeout(function() {
					MA.executeStack();
				}, 20);
			}
		},
		executeStack: function() {
			for (var j=0;j<MA.captureStack.length;j++) {
				var o=MA.captureStack[j];
				o.f.apply(this, o.p);
			}
		},
		getVisitorId: function() {
			var o,v,d=MA.d,dc=d.cookie,dm=d.domain,dom=MA.eD(dm),c=0,o='';
			if(dc&&dc.length>0) {
				var ca=dc.split(';');
				for(var i=0;i<ca.length;i++) {
					var x=ca[i].indexOf('=');
					var k=ca[i].substring(0,x);
					var vi=ca[i].substring(x+1);
					if(k==' __mauuid'||k=='__mauuid'){
						v=vi;
						c=1;
					}else if(k==' __nrvid'||k=='__nrvid'){
						o=vi;
						d.cookie = '__nrvid=; expires='+new Date('01/01/2000').toUTCString()+'; path=/;domain=.'+dom+';';
					}
				}
			}
			if (!v) {
				v=MA.uuid();
				var g=[],h=dm.split('.').reverse(),b,j,e,a;
				for(b=0;b<h.length;b++) {
					a=[];
					for(j=0;j<=b;j++) {
						a.push(h[j])
					}
					g.push(a.reverse().join('.'))
				}
				for(e=0;e<g.length;e++) {
					d.cookie = '__mauuid='+v+'; expires='+new Date('01/01/2037').toUTCString()+'; path=/;domain=.'+g[e]+';';
				}
			}
			return {v:v,c:c,o:o};
		},

		df: function() {
			var dl=MA.d.location,f=dl.hash,eC=MA.e,uC=decodeURIComponent,h='',nh='';
			if(f.match(/^#/)) {
				var hof;
				if(hof=/^#(.*)#li=(.+)&cs=(.+)/.exec(f)) {
					nh=hof[1];
					h='&li='+eC(uC(hof[2]))+'&cs='+eC(uC(hof[3]));
					dl.hash=nh;
				} else if (hof=/^#li=(.+)&cs=(.+)/.exec(f)) {
					h='&li='+eC(uC(hof[1]))+'&cs='+eC(uC(hof[2]));
					dl.hash=nh;
				} else if (hof=/^#cl=(.+)&co=(.+)/.exec(f)) {
					h='&cl='+eC(uC(hof[1]))+'&co='+eC(uC(hof[2]));
					dl.hash=nh;
				}
			}
			MA.h=h;
			return h;
		},

		gVH: function() {
			return MA.h;
		},
		gAC: function() {
			if (!MA.ac) {
				MA.ac = MA.uuid();
			}
			return MA.ac;
		},

		aE: function(e, t, f) {
			if (e.attachEvent) {
				e.attachEvent('on'+t, f);
			} else if (e.addEventListener) {
				e.addEventListener(t, f, true);
			}
			return e;
		},

		rE: function(e, t, f) {
			if (e.detachEvent) {
				e.detachEvent('on'+t, f);
			} else if (e.removeEventListener) {
				e.removeEventListener(t, f, true);
			}
			return e;
		},

		addDocsListeners: function() {
			var a=MA.d.getElementsByTagName('a'),l=a.length;
			for (var i=0;i<l;i++) {
				MA.aE(a[i], 'click', MA.docsCapture);
			}
		},

		docsCapture: function(evt) {
			if (!evt) {
				var evt = window.event;
			}
			var types = ['xls','pdf','doc','zip', 'ppt', 'pptx'];
			var ext,i,href,e;

			if (evt.srcElement) {
				href=evt.srcElement.href;
			}else if(evt.currentTarget){
				href=evt.currentTarget.href;
			}
			if (typeof(href)!='undefined'&&href&&href!='') {
				if(e=/^.+\.(.+)$/.exec(href)) {
					ext = e[1].toLowerCase();
					for(i=0;i<types.length;i++) {
						if(types[i]==ext) {
							try {
								//https://bugs.webkit.org/show_bug.cgi?id=14828
								//https://bugs.webkit.org/show_bug.cgi?id=19922
								MA.captureDownload(href);
							} catch (e) {}
							break;
						}
					}
				}
			}
		},

		isIE: function() {
			return '\v' == 'v';
		},

		isChrome: function() {
			return !!window.chrome;
		},

		isSafari: function() {
			return navigator.userAgent.toLowerCase().indexOf('safari') > 0
		},

		captureComplete: function(fun) {
			if (fun) {
				MA[fun]();
			}
		},

		initFormMap: function() {
			var forms=MA.d.getElementsByTagName('FORM'),i=0,j=0,t,e;
			for(;i<forms.length;i++) {
				var f=forms[i];
				if (typeof(f.wfmInitialized) == 'undefined') {
					f.__MA = {
						submit: MA.wfmSubmit,
						wfmExtract: MA.wfmExtract,
						postSubmit: MA.wfmPostSubmit,
						oldOnSubmit: f.onsubmit,
						oldSubmit: f.submit,
						f: f
					}
                    f.submit = MA.wfmSubmit;
					f.onsubmit = MA.wfmOnSubmit;
					f.wfmIntialized = true;
					t=document.getElementsByTagName("INPUT");
					for(;j<t.length;j++) {
						e=t[j];
						if (e.type == 'submit'||e.type == 'image') {
							e.__ma_submitted = false;
							MA.aE(e,'click',function() {e.__ma_submitted = true;});
						}
					}
				}
			}
		},

		wfmOnSubmit: function(evt) {
			var result=true,s=this;
			if(!evt && window.event) {
				evt = window.event;
			}

			if(evt) {
				var f = evt.target || evt.srcElement;
				if(f) {
					try {
						evt.preventDefault();
						evt.stopPropagation();
						window.event = null;
					}catch(e) {
						evt.returnValue = false;
					}

					if(f.__MA.oldOnSubmit) {
						try {
							result = f.__MA.oldOnSubmit(evt);
						}catch(e) {}
					}

					if(result) {
						this.submitTimer = window.setTimeout(function() { f.__MA.submit.call(f); }, 0);
					}
				}
			} else if (this && this.__MA && this.__MA.oldOnSubmit) {
                //if they had an onsubmit and it is successful (a la validation), then continue submitting the form.
				if (s.__MA.oldOnSubmit()) {
					this.submitTimer = window.setTimeout(function() { s.__MA.submit.call(s); }, 0);
				}
			}
		},

		wfmSubmit: function() {
			if (typeof(this.wfmCaptured) != 'undefined' && this.wfmCaptured === true) {
				return true;
			}
			var t='script',s=MA.d.createElement(t),_this = this,ov = MA.getVisitorId(),p;
			MA.aE(s,'load',function(){ _this.__MA.postSubmit.call(_this)});
			this.timeout_timer=window.setTimeout(function(){_this.__MA.postSubmit.call(_this);}, 3000);
			s.src=MA.b()+'wfm.php?p='+MA.p+'&uq='+ov.v+'&c='+ov.c+'&l='+MA.e(MA.d.location)+'&'+this.__MA.wfmExtract.call(this).join('&')+'&t='+MA.dt.getTime();
			s.type = 'text/java'+t;
			p=MA.d.getElementsByTagName(t)[0];p.parentNode.insertBefore(s,p);
			this.wfmCaptured = true;
		},

		wfmExtract: function() {
			var data=[],i=0,idBlacklist=['card-number', 'ccPaymentDS.ccpayment_ROW0_ccHandle','l','c','uq','p'],blnCollect,u=encodeURIComponent,d='undefined';
			while(i<this.elements.length) {
				blnCollect = true;
				var e = this.elements[i];
				if(e.name||e.id) {
					for(var j=0;j<idBlacklist.length;j++) {
						if(e.id) {
							if(idBlacklist[j] == e.id) {
								blnCollect = false;
								break;
							}
						}
						if(e.name) {
							if(idBlacklist[j] == e.name) {
								blnCollect = false;
								break;
							}
						}
					}
				}
				if(blnCollect) {
					switch(e.nodeName) {
						case "INPUT":
							switch (e.type) {
								case 'text':
								case 'email':
								case 'hidden':
									data.push(u(e.name)+"="+u(e.value));
									break;
								case 'checkbox':
									if(e.checked) {
										data.push(u(e.name)+"="+u(e.value));
									}else{
										data.push(u(e.name)+"=");
									}
									break;
								case 'radio':
									if(e.checked) {
										data.push(u(e.name)+"="+u(e.value));
									}
									break;
							}
						case "SELECT":
							if (typeof(e.selectedIndex)!=d&& e.options&&e.options[e.selectedIndex]&&typeof(e.options[e.selectedIndex].value)!=d) {
								data.push(e.name+"="+e.options[e.selectedIndex].value);
							}
							break;
						case 'TEXTAREA':
							if (typeof(e.name)!=d) {
								data.push(e.name+"="+e.value);
							}
							break;
					}
				}
				i++;
			}
			return data;
		},

		wfmPostSubmit: function() {
			if (this.submitTimer) {
				window.clearTimeout(this.submitTimer);
			}
			window.clearTimeout(this.timeout_timer); //formObj
			if (typeof(this.__MA.oldSubmit != "undefined") && typeof(this.__MA.oldSubmit.type)=="undefined" && typeof(this.__MA.oldSubmit == "function")) {
				this.submit = this.__MA.oldSubmit;
				this.onsubmit = this.__MA.oldOnSubmit;
				var blnSubmitted = false;
				var sbm_btn = false;
				for(var i=0;i<this.elements.length;i++) {
					if(this.elements[i].type && this.elements[i].type == 'submit' && this.elements[i].__ma_submitted) {
						sbm_btn =  this.elements[i];
						break;
					}
				}
				if(!sbm_btn) {
					for(var i=0, j=document.getElementsByTagName('input');i<j.length;i++) {
						if(j[i].type && j[i].type == 'image' && j[i].__ma_submitted) {
							sbm_btn = j[i];
							break;
						}
					}
				}
				if(sbm_btn) {
					try {
						var event = document.createEvent('MouseEvents');
						event.initMouseEvent('click',true,true,window,1,0,0,0,0,false,false,false,false,0,null);
						blnSubmitted = sbm_btn.dispatchEvent(event);
					}catch(e) {
						//it's ie
						blnSubmitted = sbm_btn.fireEvent('onclick');
					}
					try {
						var old_name = sbm_btn.name;
						var old_id = sbm_btn.id;
						var old_value = sbm_btn.value;
						if(!MA.isIE()) {
							var fksub = document.createElement("<input type='hidden' value='" + old_value + "' name='" + old_name + "' id='" + old_id + "'>");
							this.appendChild(fksub);
							if(sbm_btn.type == 'image') {
								var fksubX = document.createElement("<input type='hidden' value='0' name='" + old_name + ".x' id='" + old_id + ".x'>");
								this.appendChild(fksubX);
								var fksubY = document.createElement("<input type='hidden' value='0' name='" + old_name + ".y' id='" + old_id + ".y'>");
								this.appendChild(fksubY);
							}
						}else{
							var fksub = document.createElement("INPUT");
							fksub.type = 'hidden';
							fksub.value = old_value;
							fksub.name = old_name;
							fksub.id = old_id;
							this.appendChild(fksub);
							if(sbm_btn.type == 'image') {
								var fksubX = document.createElement("INPUT");
								fksubX.type = 'hidden';
								fksubX.value = 0;
								fksubX.name = old_name + 'x';
								fksubX.id = old_id + 'x';
								this.appendChild(fksubX);
								var fksubY = document.createElement("INPUT");
								fksubY.type = 'hidden';
								fksubY.value = 0;
								fksubY.name = old_name + 'y';
								fksubY.id = old_id + 'y';
								this.appendChild(fksubY);
							}
						}
					}catch(e) {}
				}
				//only if it's ie, and only if it's a .net form and only if onclick is defined for a submit button, then click it. work around for p=3895
				if (MA.isIE() && typeof(this.__VIEWSTATE) != 'undefined' && typeof(sbm_btn.onclick) != 'undefined') {
					sbm_btn.click();
				} else {
					this.submit();
				}
			} else {
				this.onsubmit = function(){};
				this.submit.click();
			}
			return true;
		},

		uuid: function() {
			var j=[],a='0123456789abcdef'.split(''),n=Math.random,r,i,k,p=MA.p+'',ps=p.split("");
			j[8]=j[13]=j[18]=j[23]='-';
			j[14]='4';
			for (k=0;k<ps.length;k++) {
				j[24+k]=ps[k];
			}
			j[24+k]='f';
			for (i=0;i<36;i++){
				if (!j[i]){
					r=0|n()*16;
					j[i]=a[(i==19)?(r&0x3)|0x8:r&0xf];
				}
			}
			return j.join('');
		},

		populateMAUUIDs: function(d) {
			var d=d||document,e=d.getElementsByName('__mauuid'),i=0,v=MA.getVisitorId();
			for(i;i<e.length;i++) {
				var r=e[i];
				if (r && r.nodeName && r.nodeName == 'INPUT' && r.type && r.type == 'hidden') {
					r.value=v.v;
				}
			}
		},

		addMAForm: function(f, h) {
			var u='forms.cdnma.com',ac='',n='script',t,p,d=MA.d,v=MA.getVisitorId(),uq='&uq='+v.v;
			if (f && typeof(f) == 'string' && f.length==36) {
				t=d.createElement(n);
				try { ac = MA.gAC() } catch (e) {}
				if((!(MA.s == 's')) && typeof(h) == 'string' && h.length > 0) {
					u=h;
					uq='';
				}
				t.type='text/java'+n;
				t.src='http'+MA.s+'://'+u+'/'+f+'/form_elements.js?ac='+ac+uq;
				p=d.getElementsByTagName(n)[0];
				p.parentNode.insertBefore(t,p);
			}
		}

	}

	return {
		beginCapture: MA.beginCapture,
		doCapture: MA.doCapture,
		captureDownload: MA.captureDownload,
		aE: MA.aE,
		addDocsListeners: MA.addDocsListeners,
		docsCapture: MA.docsCapture,
		captureComplete: MA.captureComplete,
		wfmOnSubmit: MA.wfmOnSubmit,
		wfmSubmit: MA.wfmSubmit,
		initFormMap: MA.initFormMap,
		populateMAUUIDs: MA.populateMAUUIDs,
		getVisitorId: MA.getVisitorId,
		gVH: MA.gVH,
		gAC:MA.gAC,
		addMAForm:MA.addMAForm
	}
}());

($__MAready=function() {
	var w=window,u='undefined';
	if (typeof($__MA)==u) {
		return setTimeout($__MAready,0);
	} else {
		if (typeof(w.MAdoCapture)==u||w.MAdoCapture){$__MA.beginCapture();}
		if (typeof(w.MAdocsCapture)==u||w.MAdocsCapture){$__MA.addDocsListeners();}
		if (typeof(w.MApopulateMAUUIDs)==u||w.MApopulateMAUUIDs){$__MA.populateMAUUIDs();}
	}
})();