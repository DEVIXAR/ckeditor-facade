/*
 Copyright (c) 2016, Ckeditor-Facade - Didyk Mikhail. All rights reserved.
 For licensing, see LICENSE.md
 http://devixar.com
 */

/**
 * Add plugin to ckeditor
 */
CKEDITOR.plugins.add('ckeditor-facade', {
    requires: 'image',
    init: function (editor) {
    }
});

/**
 * Init Ckeditor Facade when dialog definition
 */
CKEDITOR.on('dialogDefinition', function (ev) {

    // get dialog name
    var dialogName = ev.data.name;

    // get definition
    var dialogDefinition = ev.data.definition;

    // get editor
    var editor = ev.editor;

    // current language
    var currentLanguage = editor.config.language;

    var CUSTOM_OPTIONS = CkFacade.options;

    /// DEV ZONE -----------------------------

    /// DEV ZONE -------------------------------

    // render outer settings
    if (typeof CUSTOM_OPTIONS !== "undefined") {

        // do custom code
        if (CUSTOM_OPTIONS.make) {
            CUSTOM_OPTIONS.make(dialogName, dialogDefinition, ev, ev.data, this);
        }

        // render users setting
        if (CUSTOM_OPTIONS.dialog) {
            // iterate dialogs
            CUSTOM_OPTIONS.dialog.forEach(function (el, i) {
                if (el[dialogName]) {
                    // check ui elements
                    if (el[dialogName].ui) {
                        // iterate ui elements
                        el[dialogName].ui.forEach(function (ui_element, iterator_ui) {

                            // set function for help manipulate structure
                            ui_element.facade = new Helper();

                            // translation
                            ui_element.label = getTranslate(ui_element.label, currentLanguage);
                            ui_element.title = getTranslate(ui_element.title, currentLanguage);
                            ui_element.elements = getTranslateElements(ui_element.elements, currentLanguage);


                            // get ui by type and render it
                            switch (ui_element.type) {
                                case 'button':
                                    dialogDefinition.addButton(ui_element);
                                    break;

                                case 'tab':
                                    dialogDefinition.addContents(ui_element);
                                    break;
                            }
                        });
                    }
                }
            });
        }
    }

});

/**
 * init CkFacade cover
 * @type {{options: {}, helper: Helper}}
 */
window.CkFacade = {
    options: {},
    helper: new Helper()
}