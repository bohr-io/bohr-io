# Bootstrap Collapsible Item
A plugin for ckeditor to allow creation of bootstrap collapsible items (panels).

This plugin allows creation collapsible elements in ckeditor.
Requires the following ckeditor Plugins:
 - Widget
 - Bootstrap Collapsible Item
 
This plugin will add a new widget to allow you to create a collapsible item in ckeditor without the need to work in source-code view.
Allows drag and drop placement of created items in the editor.

Works together with the __Bootstrap Accordion List__ plugin to create __Accordion List / panel groups__ (see @https://github.com/pkerspe/ckeditor-bootstrap-accordionList)

Adds a new icon to your toolbar: 
<img src="./icons/hidpi/collapsibleitem.png?raw=true" width="32"/>

![Editor toolbar and usage example](./doc/images/ckeditor-collapsible-item-editor-view.png?raw=true "Editor toolbar and usage example")

# Installation
to install manually download all files and store to a newly created folder called "collapsibleItem" inside ckeditors plugins directory.
Then add the following line to your config.js (or extend an existing one with the plugin name):

`config.extraPlugins = 'collapsibleItem';`
