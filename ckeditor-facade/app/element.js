/**
 * Class Element cover for facade ui elements
 *
 * @param pElement ckeditor ui element
 * @constructor
 */
var Element = function (pElement) {
    
    /*
     * Inited element
     */
    var element;

    /**
     * HTMLElement
     */
    var _htmlElement;

    /**
     * Cunstruct
     *
     * @param el
     */
    function construct(el) {
        element = el;
        _htmlElement = element.getInputElement().$;
    }

    construct(pElement);

    /**
     * Get value element
     *
     * @returns {String}
     */
    this.getValue = function () {
        return _getValue();
    }

    /**
     * Set value element with event render
     *
     * @param value string
     * @returns {Element}
     */
    this.setValue = function (value) {
        _setValue(value);
        _changeEvent();
        return element;
    }

    /**
     * Show element
     */
    this.show = function () {
        _show();
        return element;
    }

    /**
     * Hide element
     */
    this.hide = function () {
        _hide();
        return element;
    }

    /**
     * Set custome css
     *
     * @param style { name: value, ... }
     */
    this.setStyle = function (style) {
        for(var el in style) {
            _htmlElement.style[el] = style[el];
        }
        return element;
    }

    // ** private ** \\

    /**
     * Fire change event for render input val if need
     *
     * @private
     */
    var _changeEvent = function () {
        element.fire('change');
    }

    /**
     * Get value input current element
     *
     * @returns {String}
     * @private
     */
    var _getValue = function () {
        return _htmlElement.value;
    }

    /**
     * Set value input current element
     *
     * @param value
     * @private
     */
    var _setValue = function (value) {
        _htmlElement.value = value;
    }

    /**
     * Show element
     *
     * @private
     */
    var _show = function () {
        _htmlElement.style.display = 'block';
    }

    /**
     * Hide element
     *
     * @private
     */
    var _hide = function () {
        _htmlElement.style.display = 'none';
    }

}