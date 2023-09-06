(function () {
	//const bohr = {
	window.bohr = {
		isInIframe: (parent != window),
		bohrURL: _BOHR_ENV_URL || 'https://bohr.io',
		previousOverflow: '',
		previousScrollBehaviorHtml: '',
		previousScrollBehaviorBody: '',
		isNiceScrollEnabled: false,
		isNiceScrollInitialEnabled: false,
		isNiceScrollLoaded: false,
		isCkeditorLoaded: false,
		isCkeditorIniating: false,
		isSaving: false,
		isEditEnabled: false,
		isEditInitialEnabled: false,
		isPluginsLoaded: false,
		init: function () {
			bohr.bindMessage();
			if (bohr.isInIframe) {
				bohr.postMessage('bohrInit');
			}
		},
		bindMessage: function () {
			window.addEventListener('message', function (e) {
				const commandName = e.data;
				const availableCommands = ['start', 'enableMobileScroll', 'disableMobileScrol', 'enableEdit', 'disableEdit', 'saveContent', 'showMessageSuccess', 'showMessageError'];
				const isValidCommand = availableCommands.includes(commandName);
				if (isValidCommand) bohr[commandName]();
			});
		},
		postMessage: function (message) {
			const acceptedTopOrigins = [
				'http://localhost',
				'https://localhost:444',
				'https://bohr.rocks',
				'https://cl2hz21040083qsvdzokaxsko.bohr.live',
				'https://bohr.io',
			];
		
			if (!acceptedTopOrigins.includes(window.top.origin)) return;
		
			window.top.postMessage(message, window.top.origin);
		},
		start: function () {
			bohr.loadPlugins();
		},
		loadPlugins: function () {
			if (bohr.isPluginsLoaded) return;
			bohr.isPluginsLoaded = true;
			if (_BOHR_DEV_MODE) bohr.bohrURL = 'http://localhost';
			if (window.location.hostname  == 'bohr.rocks') bohr.bohrURL = 'https://bohr.rocks';
			let cssURL = bohr.bohrURL + '/_old/index.css';
			let jqueryURL = bohr.bohrURL + '/_old/js/jquery-3.6.0.min.js';
			let nicescrollURL = bohr.bohrURL + '/_old/js/jquery.nicescroll.min.js';
			let ckeditorURL = bohr.bohrURL + '/_old/js/ckeditor/ckeditor.js';
			bohr.loadCSS(cssURL);
			bohr.loadScript(jqueryURL, function () {
				bohr.$ = jqb;
				bohr.loadScript(nicescrollURL, function () {
					bohr.isNiceScrollLoaded = true;
					if (bohr.isNiceScrollInitialEnabled) bohr.enableMobileScroll();
				});
				bohr.loadScript(ckeditorURL, function () {
					bohr.isCkeditorLoaded = true;
					if (bohr.isEditInitialEnabled) bohr.enableEdit();
				});
				bohr.checkForEditors();
				window.addEventListener('pointermove', bohr.postCursorPosition);
				window.addEventListener('keydown', bohr.postEscPress);
			});
		},
		enableMobileScroll: function () {
			if (!bohr.isNiceScrollLoaded) {
				bohr.isNiceScrollInitialEnabled = true;
				return;
			}
			if (bohr.isNiceScrollEnabled) return;
			bohr.isNiceScrollEnabled = true;
			bohr.previousOverflow = jqb('html').css('overflow-y');
			bohr.previousScrollBehaviorHtml = jqb('html').css('scroll-behavior');
			bohr.previousScrollBehaviorBody = jqb('body').css('scroll-behavior');
			if (jqb('body').css('overflow-y').toLowerCase().indexOf('hidden') == -1) {
				jqb('html').css('scroll-behavior', 'auto');
				jqb('body').css('scroll-behavior', 'auto');
				jqb('html').niceScroll({ cursorcolor: "rgba(0,0,0,0.5)", cursorborder: 'none', railpadding: { top: 1, right: 1, left: 1, bottom: 1 }, spacebarenabled: false });
			}
		},
		disableMobileScrol: function () {
			if (!bohr.isNiceScrollLoaded) {
				bohr.isNiceScrollInitialEnabled = false;
				return;
			}
			if (!bohr.isNiceScrollEnabled) return;
			bohr.isNiceScrollEnabled = false;
			jqb('html').getNiceScroll().remove();
			jqb('html').css('overflow-y', bohr.previousOverflow);
			jqb('html').css('scroll-behavior', bohr.previousScrollBehaviorHtml);
			jqb('body').css('scroll-behavior', bohr.previousScrollBehaviorBody);
		},
		enableEdit: function () {
			if (!bohr.isCkeditorLoaded) {
				bohr.isEditInitialEnabled = true;
				return;
			}
			if (bohr.isEditEnabled) return;
			bohr.isEditEnabled = true;
			const $editors = bohr.$('[data-bohr-cms]');
			bohr.isCkeditorIniating = true;
			let CKEditor_Count = $editors.length;
			$editors.each(function () {
				bohr.$(this).attr('contenteditable', true);
				CKEDITOR.inline(this).on('instanceReady', function () {
					CKEditor_Count--;
					if (CKEditor_Count == 0) {
						bohr.isCkeditorIniating = false;
					}
				});
			});
		},
		disableEdit: function () {
			try {
				if (!bohr.isCkeditorLoaded) {
					bohr.isEditInitialEnabled = false;
					return;
				}
				if (!bohr.isEditEnabled) return;
				bohr.isEditEnabled = false;
				for (let i in CKEDITOR.instances) {
					CKEDITOR.instances[i].destroy();
				}
				bohr.$('[data-bohr-cms]').each(function () {
					bohr.$(this).attr('contenteditable', false);
				});
			} catch (e) {
				console.log(e);
			}
		},
		saveContent: function (cb) {
			try {
				if (!bohr.isEditEnabled) return false;
				if (bohr.isCkeditorIniating) return false;
				if (bohr.isSaving) return false;
				bohr.isSaving = true;
				let dados = [];
				for (let i in CKEDITOR.instances) {
					dados.push({
						file: CKEDITOR.instances[i].container.data('bohr-file'),
						index: CKEDITOR.instances[i].container.data('bohr-index'),
						dist_file: CKEDITOR.instances[i].container.data('bohr-dist-file'),
						dist_index: CKEDITOR.instances[i].container.data('bohr-dist-index'),
						content: CKEDITOR.instances[i].getData()
					});
				}
				bohr.$.ajax({
					url: bohr.bohrURL + '/api/cms/save',
					type: 'POST',
					xhrFields: { withCredentials: true },
					data: { 
						REPO_OWNER: _BOHR_REPO_OWNER,
						REPO_NAME: _BOHR_REPO_NAME,
						REF_NAME: _BOHR_REF_NAME,
						DATA: JSON.stringify(dados)
					},
					dataType: 'JSON',
					complete: function (data, status) { 
            bohr.isSaving = false; 
            if(data.status === 200){
              bohr.postMessage({ type:'showMessageSuccess' });
            } else if(data.status === 401) {
              bohr.postMessage({ type:'showPermissionMessageError' });
            } else {
              bohr.postMessage({ type:'showMessageError' });
            }
          }
				}).done(function (r) {
					console.log(r);
					cb();
				});
				bohr.disableEdit();
			} catch (e) {
				console.log(e);
			}
		},
		onDocumentLoaded: function (fn) {
			if (document.readyState != 'loading') {
				fn();
			} else {
				document.addEventListener('DOMContentLoaded', fn);
			}
		},
		loadScript: function (url, cb) {
			var script = document.createElement('script');
			script.onload = function () {
				cb && cb();
			};
			script.src = url;
			document.head.appendChild(script);
		},
		loadCSS: function (url) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = url;
			link.media = 'all';
			document.head.appendChild(link);
		},
		postCursorPosition(e) {
			const { pageX, pageY } = e;
	
			bohr.postMessage({
				type: 'cursorPosition',
				position: {
					view: 'deployPreview',
					x: pageX,
					y: pageY,
				}
			});
		},
		checkForEditors() {
			const $editors = bohr.$('[data-bohr-cms]');
			if ($editors.length > 0) bohr.postMessage({ type: 'enableEdit' });
		},
		postEscPress(e) {
			if (e.key === 'Escape') bohr.postMessage({ type: 'escPress' });
		}
	};
	bohr.init();
})();
