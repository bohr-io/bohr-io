CKEDITOR.plugins.add('accordionList', {
    requires: 'widget,collapsibleItem',
    icons: 'accordionlist',
    hidpi: true,
    init: function (editor) {
        editor.widgets.add('accordionList', {
            button: 'Insert a new Accordion List',
            template: '<div class="accordion-list">' +
            '   <div class="panel-group accordion-list-group accordion-list-items" id="unknown" role="tablist" aria-multiselectable="true"></div>' +
            '</div>',
            editables: {
                content: {
                    selector: 'div.accordion-list-items',
                    allowedContent: 'div(!collapsible-item*,panel*,collapse)[*];h4(!collapsible-item*,panel*)[*];a(!collapsible-item*,panel*,collapsed)[*];span(!glyphicon*)[*];p;br;span[*];ul;ol;li;strong;em;u;table[*];tbody;theader;tr;td;th;hr;a;a(!href,*)[*];'
                }
            },
            allowedContent: 'div(!accordion-list*)[*];',
            requiredContent: 'div(accordion-list)',
            upcast: function (element) {
                return element.name == 'div' && element.hasClass('accordion-list');
            },
            init: function () {
                var idPrefix = 'accordion';

                this.setData('accordionId', idPrefix + (new Date()).getTime());

                var editable = this.editables.content;
                var editorForElement = editable.editor;

                editable.enterMode = 2;
                editorForElement.setActiveEnterMode(CKEDITOR.ENTER_BR, CKEDITOR.ENTER_BR);

                //prevent entering any data via keyboard, since we only want nested widgets in here
                editable.on('keydown', function (event) {
                    console.log("down",event);
                    if(event.data.$.target.id.indexOf(idPrefix) == 0){
                        event.data.$.preventDefault();
                        event.data.$.stopPropagation();
                    }
                });
            },
            data: function () {
                //called whenever the data is updated
                var accordionElement = this.element.find('.accordion-list-items').$[0];

                if(accordionElement.getAttribute('id') == 'unknown'){
                    accordionElement.setAttribute('id', this.data.accordionId);
                }
            },
        });
    },
    onLoad: function () {
        CKEDITOR.addCss(
            '.accordion-list::before {font-size:10px;color:#000;content: "Bootstrap Accordion"} ' +
            '.accordion-list {padding: 8px;background: #eee;border-radius: 8px;border: 1px solid #ddd;box-shadow: 0 1px 1px #fff inset, 0 -1px 0px #ccc inset;}' +
            '.accordion-list-items {padding: 0 8px;box-shadow: 0 1px 1px #ddd inset;border: 1px solid #cccccc;border-radius: 5px;background: #fff;}' +
            '.accordion-list-items::before {font-size:14px;color:#ccc;content: "Insert collapsible items here"; position:relative;} '
        );
    }
});
