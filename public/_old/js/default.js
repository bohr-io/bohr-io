(function($){
	var AJAX_SENDING = false;
	var URL_SERVICE = '/_api';
	var DEFAULT_BRANCH = 'master';
	var intModo = 'D';
	var blnEditando = false;
	var blnSalvando = false;
	var strTModo = 'P';
	var strMModo = 'P';
	var CKEditor_Loaded = false;
	var CKEditor_Loading = false;
	var CKEditor_Count = 0;
	var blnCanPublish = false;
	var BarHeight = 65;

	var LoadPortal = function (cb) {
		if (AJAX_SENDING) return false;
		AJAX_SENDING = true;
		$.ajax({
			url: URL_SERVICE + '/core/load_portal?r=' + Math.random(),
			type: 'GET',
			xhrFields: { withCredentials: true },
			dataType: 'JSON',
			complete: function () { AJAX_SENDING = false; }
		}).done(function (r) {
			cb(r);
		});
	};

	var BranchChange = function (branch, cb) {
		if (AJAX_SENDING) return false;
		AJAX_SENDING = true;
		$.ajax({
			url: URL_SERVICE + '/core/branch_change',
			type: 'POST',
			xhrFields: { withCredentials: true },
			dataType: 'JSON',
			data: {
				branch: branch
			},
			complete: function () { AJAX_SENDING = false; }
		}).done(function (r) {
			cb(r);
		});
	};

	$(function () {
		window.ctx = window.parent.frames[0];
		window.previousOverflow = '';
		window.previousScrollBehaviorHtml = '';
		window.previousScrollBehaviorBody = '';

		window.NiceScrollEnable = function () {
			previousOverflow = ctx.jqb('html').css('overflow-y');
			previousScrollBehaviorHtml = ctx.jqb('html').css('scroll-behavior');
			previousScrollBehaviorBody = ctx.jqb('body').css('scroll-behavior');
			if (ctx.jqb('body').css('overflow-y').toLowerCase().indexOf('hidden') == -1) {
				ctx.jqb('html').css('scroll-behavior', 'auto');
				ctx.jqb('body').css('scroll-behavior', 'auto');
				ctx.jqb('html').niceScroll({ cursorcolor: "rgba(0,0,0,0.5)", cursorborder: 'none', railpadding: { top: 1, right: 1, left: 1, bottom: 1 }, spacebarenabled: false });
			}
		};
		window.NiceScrollDisable = function () {
			ctx.jqb('html').getNiceScroll().remove();
			ctx.jqb('html').css('overflow-y', previousOverflow);
			ctx.jqb('html').css('scroll-behavior', previousScrollBehaviorHtml);
			ctx.jqb('body').css('scroll-behavior', previousScrollBehaviorBody);
		};

		$('bohr__bahr .bohr--view .icon--desktop').click(function () {
			$('bohr__bahr .bohr--view a.active').removeClass('active');
			$(this).addClass('active');
			if (intModo != 'D') {
				NiceScrollDisable();
			}
			intModo = 'D';
			$('#bg_tablet').animate({ opacity: 0 }, 800);
			$('#bg_tablet2').animate({ opacity: 0 }, 800);
			$('#bg_iphone').animate({ opacity: 0 }, 800);
			$('#bg_iphone2').animate({ opacity: 0 }, 800);
			$('#frPrev').animate({ width: $(window).width(), height: ($(window).height() - BarHeight), left: 0, top: BarHeight, marginLeft: 0, marginTop: 0 }, 800);
			return false;
		});
		$('bohr__bahr .bohr--view .icon--tablet').click(function () {
			$('bohr__bahr .bohr--view a.active').removeClass('active');
			$(this).addClass('active');
			if (intModo == 'D') {
				NiceScrollEnable();
			}
			if (intModo == 'T') {
				if (strTModo == 'P') {
					strTModo = 'R';
					$('#bg_tablet').animate({ opacity: 0 }, 800);
					$('#bg_tablet2').animate({ opacity: 1 }, 800);
					$('#bg_iphone').animate({ opacity: 0 }, 800);
					$('#bg_iphone2').animate({ opacity: 0 }, 800);
					$('#frPrev').animate({ width: 768, height: 1024, left: '50%', top: 89, marginLeft: -400.5, marginTop: 0 }, 800);
				} else {
					strTModo = 'P';
					$('#bg_tablet').animate({ opacity: 1 }, 800);
					$('#bg_tablet2').animate({ opacity: 0 }, 800);
					$('#bg_iphone').animate({ opacity: 0 }, 800);
					$('#bg_iphone2').animate({ opacity: 0 }, 800);
					$('#frPrev').animate({ width: 1024, height: 768, left: '50%', top: '53%', marginLeft: -517.5, marginTop: -378 }, 800);
				}
			} else {
				strTModo = 'P';
				$('#bg_tablet').animate({ opacity: 1 }, 800);
				$('#bg_tablet2').animate({ opacity: 0 }, 800);
				$('#bg_iphone').animate({ opacity: 0 }, 800);
				$('#bg_iphone2').animate({ opacity: 0 }, 800);
				$('#frPrev').animate({ width: 1024, height: 768, left: '50%', top: '53%', marginLeft: -517.5, marginTop: -378 }, 800);
			}
			intModo = 'T';
			return false;
		});
		$('bohr__bahr .bohr--view .icon--mobile').click(function () {
			$('bohr__bahr .bohr--view a.active').removeClass('active');
			$(this).addClass('active');
			if (intModo == 'D') {
				NiceScrollEnable();
			}
			if (intModo == 'I') {
				if (strMModo == 'P') {
					strMModo = 'R';
					$('#bg_iphone').animate({ opacity: 0 }, 800);
					$('#bg_iphone2').animate({ opacity: 1 }, 800);
					$('#bg_tablet').animate({ opacity: 0 }, 800);
					$('#bg_tablet2').animate({ opacity: 0 }, 800);
					$('#frPrev').animate({ width: 572, height: 321, left: '50%', top: '51.5%', marginLeft: -263.5, marginTop: -135.5 }, 800);
				} else {
					strMModo = 'P';
					$('#bg_iphone').animate({ opacity: 1 }, 800);
					$('#bg_iphone2').animate({ opacity: 0 }, 800);
					$('#bg_tablet').animate({ opacity: 0 }, 800);
					$('#bg_tablet2').animate({ opacity: 0 }, 800);
					$('#frPrev').animate({ width: 320, height: 572, left: '50%', top: '47%', marginLeft: -158.5, marginTop: -237 }, 800);
				}
			} else {
				strMModo = 'P';
				$('#bg_iphone').animate({ opacity: 1 }, 800);
				$('#bg_iphone2').animate({ opacity: 0 }, 800);
				$('#bg_tablet').animate({ opacity: 0 }, 800);
				$('#bg_tablet2').animate({ opacity: 0 }, 800);
				$('#frPrev').animate({ width: 320, height: 572, left: '50%', top: '47%', marginLeft: -158.5, marginTop: -237 }, 800);
			}
			intModo = 'I';
			return false;
		});

		var SetaBotoesPublicacao = function () {
			if (blnCanPublish) {
				$('#bt_SalvarPublicar').show();
			} else {
				$('#bt_SalvarPublicar').hide();
			}
		};

		$('#editar').click(function () {
			if ($('#editar').hasClass('btn-disabled')) return false;
			if (intModo == 'D') {
				if (!CKEditor_Loaded) return false;
				if (blnEditando) {
					$('#bt_Salvar').hide();
					$('#editar').html('Editar<br>conteúdo');
					SetaBotoesPublicacao();
					DesativarEdicao();
				} else {
					$('#bt_SalvarPublicar').hide();
					$('#bt_Salvar').show();
					$('#editar').html('Cancelar<br>edição');
					AtivarEdicao();
				}
				blnEditando = !blnEditando;
			}
			return false;
		});
		$('#bt_Salvar').click(function () {
			if (blnSalvando) return false;
			$('#modal-loader h2').html('Salvando alterações, por favor aguarde...');
			$('#modal-loader').show();
			$('#modal').fadeIn(function () {
				var cb = function () {
					blnSalvando = false;
					blnEditando = false;
					$('#modal-loader').fadeOut(function () {
						$('#modal-sucesso h2').html('Alterações salvas com sucesso!');
						$('#modal-sucesso').fadeIn();
					});
					$('#bt_Salvar').hide();
					$('#editar').html('Editar<br>conteúdo');
					SetaBotoesPublicacao();
				};
				if (Salvar(cb)) {
					blnSalvando = true;
				}
			});
			return false;
		});

		$('#bt_SalvarPublicar').click(function () {
			if (AJAX_SENDING) return false;
			AJAX_SENDING = true;
			$('#modal-loader h2').html('Publicando alterações, por favor aguarde...');
			$('#modal-loader').show();
			$('#modal').fadeIn(function () {
				$.ajax({
					url: URL_SERVICE + '/core/publish',
					type: 'POST',
					xhrFields: { withCredentials: true },
					dataType: 'JSON',
					complete: function (data, status) { AJAX_SENDING = false; }
				}).done(function (r) {
					console.log(r);
					if (r.success) {
						$('#modal-loader').fadeOut(function () {
							$('#modal-sucesso h2').html('Alterações publicadas com sucesso!');
							$('#modal-sucesso').fadeIn();
							window.setTimeout(function () {
								location.href = '/';
							}, 1000);
						});
					} else {
						if (r.error == 'INVALID_SESSION') {
							alert('Sessão inválida.');
							location.href = '/';
						}
						if (r.error == 'BRANCH_NOT_FOUND') {
							alert('Branch não encontrada.');
							location.href = '/';
						}
						if (r.error == 'CONFLICT') {
							$('#modal-loader').fadeOut(function () {
								$('#modal-erro h2').html('Desculpe, ocorreu um conflito.');
								$('#modal-erro').fadeIn();
							});
						}
					}
				});
			});
			return false;
		});

		$('#bt-criar-nova-branch').click(function () {
			$('#modal').fadeIn();
			$('#modal-nova-branch').show();
			$('#branch-nome').focus();
			return false;
		});

		$('#frm-nova-branch').submit(function () {
			var valid = true;
			$('#branch-nome').removeClass('error');
			if ($('#branch-nome').val() == '') {
				$('#branch-nome').addClass('error');
				valid = false;
			}
			if (valid) {
				if (AJAX_SENDING) return false;
				AJAX_SENDING = true;
				$('#modal-nova-branch').fadeOut(function () {
					$('#modal-loader h2').html('Criando ambiente, por favor aguarde...');
					$('#modal-loader').fadeIn(function () {
						$.ajax({
							url: URL_SERVICE + '/core/branch_new',
							type: 'POST',
							xhrFields: { withCredentials: true },
							data: { branch: $('#branch-nome').val() },
							dataType: 'JSON',
							complete: function (data, status) { AJAX_SENDING = false; }
						}).done(function (r) {
							if (r.success) {
								location.href = '/';
							} else {
								if (r.error == 'BRANCH_ALREADY_EXISTS') {
									$('#modal-loader').hide();
									$('#modal-nova-branch').fadeIn();
									alert('Já existe uma Branch com este nome.');
								} else {
									console.log(r);
								}
							}
						});
					});
				});
			}
			return false;
		});

		$('#modal .modal-close').click(function () {
			$('#modal').fadeOut(function () {
				$('#modal .modal').hide();
			});
			return false;
		});

		$('bohr__bahr .icon--sites, bohr__bahr .icon--options').click(function () {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		});

		$('#bt-ocultar-barra').click(function () {
			location.href = '/bohr-hide';
			//window.open($('#frPrev').attr('src'));
			$('bohr__bahr .icon--options').removeClass('active');
			return false;
		});

		$('#bt-logout').click(function () {
			$.ajax({ url: location.href.replace('://', '://log:out@'), complete: function () { window.top.location.href = '/'; } });
			return false;
		});

		$('#bt-visualizar-api, #bt-visualizar-repositorio').click(function () {
			$('bohr__bahr .icon--options').removeClass('active');
		});

		// LoadPortal(function (r) {
		// 	if (r.success) {

		// 		//Branches
		// 		var html = '';
		// 		for (var i = 0; i < r.branches.length; i++) {
		// 			var name_branch = r.branches[i];
		// 			var selected_branch = ((r.branches[i] == r.active_branch) ? ' selected="selected"' : '');
		// 			html += '<option value="' + r.branches[i] + '"' + selected_branch + '>' + name_branch + '</option>';
		// 		}
		// 		$('#selAmbiente').html(html).change(function () {
		// 			BranchChange($(this).val(), function (r) {
		// 				if (r.success) {
		// 					location.reload(true);
		// 				} else {
		// 					console.log(r);
		// 				}
		// 			});
		// 		});
		// 		if (r.active_branch != DEFAULT_BRANCH) {
		// 			$('#editar').show();
		// 			blnCanPublish = r.can_publish;
		// 			SetaBotoesPublicacao();
		// 		}

		// 		//API
		// 		if (r.api) {
		// 			$('#bt-visualizar-api').attr('href', r.api).removeClass('hidden');
		// 		}

		// 		//Repositorio
		// 		$('#bt-visualizar-repositorio').attr('href', r.repositorio).removeClass('hidden');

		// 	} else {
		// 		console.log('ERRO: Erro ao carregar o Portal.');
		// 		console.log(r);
		// 	}
		// });

		window.pageReady = function () {

			//Title
			document.title = ctx.document.title;

			//Favicon
			var favicon_url = '/favicon.ico';
			if (ctx.document.querySelector("link[rel='icon']")) favicon_url = ctx.document.querySelector("link[rel='icon']").href;
			if (ctx.document.querySelector("link[rel='shortcut icon']")) favicon_url = ctx.document.querySelector("link[rel='shortcut icon']").href;
			(function () {
				var link = document.createElement('link');
				link.type = 'image/x-icon';
				link.rel = 'shortcut icon';
				link.href = favicon_url;
				document.getElementsByTagName('head')[0].appendChild(link);
			})();

			//Bohr Shortcut
			document.onkeyup = ctx.document.onkeyup = function (e) {
				if (e.altKey && e.which == 66) {
					location.href = '/bohr-hide';
				}
			};

			$('#bt_Salvar, #bt_SalvarPublicar, #editar').removeClass('btn-disabled');

			var script = ctx.document.createElement('script');
			script.onload = function () {
				CKEditor_Loaded = true;
			};
			script.src = '/_old/js/ckeditor/ckeditor.js';
			ctx.document.head.appendChild(script);

			var script_nicescroll = ctx.document.createElement('script');
			script_nicescroll.onload = function () {
				if ((intModo == 'T') || (intModo == 'I')) {
					NiceScrollEnable();
				}
			};
			script_nicescroll.src = '/_old/js/jquery.nicescroll.js';
			ctx.document.head.appendChild(script_nicescroll);

			$('#frPrev')[0].contentWindow.onunload = function (e) {
				if (blnEditando) {
					$('#editar').click();
				}
				$('#bt_Salvar, #bt_SalvarPublicar, #editar').addClass('btn-disabled');
			};
		}

		window.SetSize = function () {
			if (intModo == 'D') {
				$('#frPrev').css({ left: 0, top: BarHeight, height: $(window).height() - BarHeight, width: ($(window).width()), marginLeft: 0, marginTop: 0 });
			}
			if (intModo == 'T') {
				if (strTModo == 'R') {
					$('#frPrev').css({ left: '50%', top: 89, marginLeft: -400.5, marginTop: 0 }, 800);
				}
				if (strTModo == 'P') {
					$('#frPrev').css({ left: '50%', top: '53%', marginLeft: -517.5, marginTop: -378 }, 800);
				}
			}
			if (intModo == 'I') {
				if (strMModo == 'R') {
					$('#frPrev').css({ left: '50%', top: '51.5%', marginLeft: -263.5, marginTop: -135.5 }, 800);
				}
				if (strMModo == 'P') {
					$('#frPrev').css({ left: '50%', top: '47%', marginLeft: -158.5, marginTop: -237 }, 800);
				}
			}
		};
		$(window).resize(function () {
			SetSize();
		});
		SetSize();
		$('body').addClass("loaded");
	});

	var AtivarEdicao = function () {
		var $editors = $('[data-bohr="true"]', ctx.document);
		CKEditor_Loading = true;
		CKEditor_Count = $editors.length;
		$editors.each(function () {
			$(this).attr('contenteditable', true);
			ctx.CKEDITOR.inline(this).on('instanceReady', function () {
				CKEditor_Count--;
				if (CKEditor_Count == 0) {
					CKEditor_Loading = false;
				}
			});
		});
	};

	var DesativarEdicao = function () {
		try {
			for (var i in ctx.CKEDITOR.instances) {
				ctx.CKEDITOR.instances[i].destroy();
			}
			$('[data-bohr="true"]', ctx.document).each(function () {
				$(this).attr('contenteditable', false);
			});
		} catch (e) {
			console.log(e);
		}
	};

	var Salvar = function (cb) {
		try {
			if (CKEditor_Loading) return false;
			if (AJAX_SENDING) return false;
			AJAX_SENDING = true;
			var dados = [];
			for (var i in ctx.CKEDITOR.instances) {
				dados.push({
					file: ctx.CKEDITOR.instances[i].container.data('bohr-file'),
					index: ctx.CKEDITOR.instances[i].container.data('bohr-index'),
					content: ctx.CKEDITOR.instances[i].getData()
				});
			}
			$.ajax({
				url: URL_SERVICE + '/core/save_changes',
				type: 'POST',
				xhrFields: { withCredentials: true },
				data: { dados: dados },
				dataType: 'JSON',
				complete: function (data, status) { AJAX_SENDING = false; }
			}).done(function (r) {
				if (r.success) {
					if (r.alteracao) blnCanPublish = true;
					cb();
				} else {
					console.log(r);
				}
			});
			DesativarEdicao();
			return true;
		} catch (e) {
			console.log(e);
		}
	};
})(jqb);