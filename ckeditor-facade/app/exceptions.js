/**
 * Exception NoDialogException
 *
 * @param name
 * @param message
 * @constructor
 */
var NoDialogException = function(name, message){
    this.name = name;
    this.message = message;

    this.toString = function() {
        return this.name + ": " + this.message;
    }
};

/**
 * extended from error
 *
 * @type {Object|Error}
 */
NoDialogException.prototype = Error.prototype;