CKEDITOR.config.extraPlugins = "base64image";
CKEDITOR.editorConfig = function (config) {
	// Define changes to default configuration here. For example:
	//config.language = 'pt-BR';
    // config.uiColor = '#AADC6E';

	//config.toolbar = [['Bold', 'Italic', 'Underline', '-', 'Link', 'Unlink', 'Format', 'BootstrapTabs', 'base64image']];

	config.removeButtons = 'CopyFormatting,SetLanguage,Setlanguage,language,Language,Source,Save,NewPage,Cut,CopySource,Save,NewPage,DocProps,Preview,Print,Templates,document,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,RemoveFormat,NumberedList,BulletedList,Outdent,Indent,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Anchor,CreatePlaceholder,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,InsertPre,Styles,Format,Font,FontSize,TextColor,BGColor,UIColor,Maximize,ShowBlocks,button1,button2,button3,oembed,MediaEmbed,About';

    //config.removeButtons = 'Format';

    //config.removeDialogTabs = 'link:advanced';

    config.entities = false;

    config.title = false;

	config.allowedContent = true;

	config.enterMode = CKEDITOR.ENTER_BR;

	config.extraPlugins = 'bootstrapTabs,base64image,collapsibleItem,accordionList';

    /*
    config.toolbarGroups = [
		{ name: 'document', groups: ['mode', 'document', 'doctools'] },
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
    ];
    config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
    */
};
//CKEDITOR.config.extraPlugins = "base64image";

CKEDITOR.dtd.a.h1 = 1;
CKEDITOR.dtd.a.h2 = 1;
CKEDITOR.dtd.a.h3 = 1;
CKEDITOR.dtd.a.h4 = 1;
CKEDITOR.dtd.a.h5 = 1;
CKEDITOR.dtd.a.h6 = 1;
CKEDITOR.dtd.a.div = 1;
CKEDITOR.dtd.a.p = 1;

//CKEDITOR.plugins.addExternal('bootstrapTabs', '/bohr/js/ckeditor/plugins/bootstrapTabs/', 'plugin.js');
//CKEDITOR.plugins.addExternal('base64image', '/bohr/js/ckeditor/plugins/base64image/', 'plugin.js');
