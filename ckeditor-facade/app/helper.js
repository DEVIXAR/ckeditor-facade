/**
 * Class for help control ui elements
 *
 * @constructor
 */
var Helper = function () {

    /**
     * Get element by id in tab
     *
     * @param id
     * @param tab
     * @returns {Element}
     */
    this.getElement = function (id, tab) {
        var element;

        try {
            /*
             find element inside dialog
             */
            element = new Element(CKEDITOR.dialog.getCurrent().getContentElement(tab, id))
        } catch (error) {
            /*
             NoDialogException dialog is closed
             */
            throw new NoDialogException("NoDialogException", 'You must open dialog before use it function');
        }

        return element;
    }
}