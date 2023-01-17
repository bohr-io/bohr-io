function getCollapsibleItem() {
    var collapsibleItem =
        '<div class="panel panel-default collapsible-item" id="collapbsible-1">' +
        '   <div class="panel-heading collapsible-item-heading" role="tab" id="headingCollapbsible">' +
        '       <h4 class="panel-title collapsible-item-title">' +
        '           <a class="collapsed collapsible-item-title-link-icon pull-right" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseCollapbsible" aria-expanded="false" aria-controls="collapseCollapbsible"><span class="glyphicon glyphicon-chevron-down">&nbsp;</span></a>' +
        '           <a class="collapsed collapsible-item-title-link" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseCollapbsible" aria-expanded="false" aria-controls="collapseCollapbsible"><span class="collapsible-item-title-link-text">Title Text</span></a>' +
        '       </h4>' +
        '   </div>' +
        '   <div id="collapseCollapbsible" class="panel-collapse collapse collapsible-item-collapse" role="tabpanel" aria-labelledby="headingCollapbsible">' +
        '       <div class="panel-body collapsible-item-body">Body Text</div>' +
        '   </div>' +
        '</div>';
    return collapsibleItem;
}

CKEDITOR.dtd.$editable.a = 1;

CKEDITOR.plugins.add('collapsibleItem', {
    requires: 'widget',
    icons: 'collapsibleitem',
    hidpi: true,
    init: function (editor) {
        editor.widgets.add('collapsibleItem', {
            button: 'Insert Collapsible Item',
            template: getCollapsibleItem(),
            editables: {
                title: {
                    selector: '.collapsible-item-title-link',
                    allowedContent: 'span strong em u;*{color}'
                },
                content: {
                    selector: '.collapsible-item-body',
                    allowedContent: 'p;br;span(*)[*];ul;ol;li;strong;em;u;table(*)[*];tbody;thead;tr;td;th;hr;a;a[*];a(*)[*];img(*)[*];'
                }
            },
            allowedContent: 'div(!collapsible-item*,panel*,collapse)[*];h4(!collapsible-item*,panel*)[*];a(!collapsible-item*,collapsed,panel*)[*];span(!glyphicon*)[*];',
            requiredContent: 'div(collapsible-item);',
            upcast: function (element) {
                return element.name == 'div' && element.hasClass('collapsible-item');
            },
            init: function () {
                //called when widget instance is created
                var accordionid = "";
                if(editor.elementPath() != null) {
                    var parents = editor.elementPath().elements;
                    for (i = 0; i < parents.length; i++) {
                        if (parents[i].hasClass('accordion-list-group')) {
                            accordionid = parents[i].getId();
                            break;
                        }
                    }
                }
                if(accordionid == ""){
                    var parents = this.element.getParents();
                    for(i = 0 ; i < parents.length ; i++){
                        if(parents[i].hasClass('accordion-list-group')){
                            accordionid = parents[i].getId();
                            break;
                        }
                    }
                }
                this.setData('accordionId', accordionid);
                this.setData('itemId', 'Collapsible' + (new Date()).getTime());
            },
            data: function () {
                //called whenever the data is updated
                this.element.setAttribute('id', this.data.itemId);

                var heading = this.element.find('.collapsible-item-heading').$[0];
                heading.setAttribute('id', 'heading' + this.data.itemId);

                var itemLink = this.element.find('.collapsible-item-title-link').$[0];
                var itemIconLink = this.element.find('.collapsible-item-title-link-icon').$[0];
                var newLink = '#collapse' + this.data.itemId;
                itemLink.setAttribute('aria-controls', 'collapse' + this.data.itemId);
                itemLink.setAttribute('href', newLink);
                itemLink.setAttribute('data-cke-saved-href', newLink); //this must be updated as well, otherwise editor will always fallback to old value
                itemIconLink.setAttribute('aria-controls', 'collapse' + this.data.itemId);
                itemIconLink.setAttribute('href', newLink);
                itemIconLink.setAttribute('data-cke-saved-href', newLink);

                if(this.data.accordionId != "") {
                    this.element.find('.collapsible-item-title-link').$[0].setAttribute('data-parent', "#" + this.data.accordionId);
                    this.element.find('.collapsible-item-title-link-icon').$[0].setAttribute('data-parent', "#" + this.data.accordionId);
                } else {
                    this.element.find('.collapsible-item-title-link').$[0].removeAttribute('data-parent');
                    this.element.find('.collapsible-item-title-link-icon').$[0].removeAttribute('data-parent');
                }

                this.element.find('.collapsible-item-collapse').$[0].setAttribute('id', 'collapse' + this.data.itemId);
                this.element.find('.collapsible-item-collapse').$[0].setAttribute('aria-labelledby', 'heading' + this.data.itemId);
            },
        });
    },

    onLoad: function () {
        CKEDITOR.addCss(
            'a.collapsible-item-title-link { display: block; }' +
            '.collapsible-item::before {font-size:10px;color:#000;content: "Bootstrap collapsible element"}' +
            '.collapsible-item-heading {background-color:#f4f8ef;color:#72b73a;text-decoration:none;font-size:20px;} ' +
            '.collapsible-item-collapse {display:block;background-color:#ddd;min-height:10px;} ' +
            '.collapsible-item {padding: 8px;margin: 10px;background: #eee;border-radius: 8px;border: 1px solid #ddd;box-shadow: 0 1px 1px #fff inset, 0 -1px 0px #ccc inset;}' +
            '.collapsible-item-title, .collapsible-item-body {box-shadow: 0 1px 1px #ddd inset;border: 1px solid #cccccc;border-radius: 5px;background: #fff;}' +
            '.collapsible-item-title {margin: 0 0 8px;padding: 5px 8px;}' +
            '.collapsible-item-body {padding: 0 8px;}' +
            '.collapsible-item-title-link-text {min-width:50px;display:inline-block;min-height:20px;height:100%;}' +
            '.collapsible-item-title-link-icon {display:inline-block;float:right;}'
        );
    }
});
