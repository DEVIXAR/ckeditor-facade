# Ckeditor Facade

## Overview

Ckeditor plugin simplifies work with API using access through itself wrapper.

You don't need any access to primary initialization form to work with Ckeditor
elements:

``` javascript
    CKEDITOR.replace( 'editor1' );
```

Make sure Ckeditor is ready to work with. For example use default event
listener:

``` javascript
    CKEDITOR.on('instanceReady', function () {
        ...
    });
```

To get access use CkFacade:

``` javascript
    // Add and manage own elements
    CkFacade.options = { ... }

    // Manage own added or other elements
    CkFacade.helper.getElement(...).setValue(...).[...]...
```

## Add own elements to Dialog

To add own elements to Dialog use:

``` javascript
    CkFacade.options = {
        dialog: [
            // Elements list
        ]
    }
```


#### Add button to `Image` dialog

``` javascript
    CkFacade.options = {
        dialog: [{
                image: {
                    ui: [{
                            type: 'button', // set element type
                            id: 'someId', // element ID to get access through DOM
                            label: { // element value. Supports multi language
                                en: 'My custom button',
                                uk: 'Моя власна кнопка'
                            },
                            title: { // hint for button. Supports multi language
                                en: 'My button. Use it for control some event',
                                uk: 'Моя кнопка. Використовуйте її для контролю якої-небудь події'
                            },
                            onShow: function (e) {
                                // after element successful loaded
                            },
                            onClick: function (e) {
                                // when button clicked
                            }

                            // default and Ckeditor events also can be used
                        },
                    ]
                }
            }
        ]
    }
```


#### Add tab with elements to `Link` dialog

``` javascript
    CkFacade.options = {
        dialog: [{
            link: {
                ui: [{
                    type: 'tab',
                    label: {
                        en: 'My custom tab',
                        uk: 'Моя вкладка'
                    },
                    elements: [ // set list of new elements
                        {
                            type: 'button',
                            label: {
                                en: 'My inner buttom',
                                uk: 'Моя внутрішня кнопка'
                            },
                        },
                        {
                            type: 'hbox', // add elements grouping
                            widths: ['25%', '100%'],
                            children: [
                                {
                                    type: 'button',
                                    width: '40px',
                                    label: 'Click me'
                                },
                                {
                                    type: 'hbox',
                                    widths: ['100%'],
                                    children: [ // lots of elements can be formed this way
                                        {
                                            type: 'button',
                                            label: 'Some button'
                                        }
                                    ]
                                }

                            ]
                        }

                    ]
                }]
            }
        }]
    };
```

#### Execute own code

You can execute own code during dialog building

``` javascript
    CkFacade.options = {
        make: function (dialogName, dialogDefinition, ev, evData, $this) {
            ...
        }
    }
```

## Element manipulations

Own created elements get `helper` field. Use it to manipulate them.

For example adding image to `Image` dialog

``` javascript
    CkFacade.options = {
            dialog: [{
                    image: {
                        ui: [{
                                type: 'button',
                                ...
                                onClick: function (e) {

                                    var helper = this.helper; // get access to `helper`

                                    // getElement ( iD, tab ) - element search
                                    helper
                                        .getElement('txtUrl', 'info')
                                        .setValue('http://.../../my-image.jpg');

                                    // on button click, image link adding.
                                    // notice, under value changing using `setValue` method
                                    // element does trigger changes automatically.
                                    // means under changing in this moment image loaded automatically
                                }
                            },
                        ]
                    }
                }
            ]
        }
```

![How add image](http://devixar.com/media/Ckeditor-facade.gif)

You can also use `CkFacade` to get access:

``` javascript
    CkFacade.helper
        .getElement('txtUrl', 'info')
        .setValue('http://.../../my-image.jpg');


    // if dialog is not open `NoDialogException`
    // it takes current dialog
```

To get element ID you can use [devtools](http://ckeditor.com/addon/devtools)

# Methods

| Function   |      Param Type      |  Return Type |  Description |
|----------|:-------------:|------:|------:|
| Helper.getElement('id', 'tab') |  id:String, tab:String | Element | Get element by element id and tab id |
| Element.getValue() |   | String | Get string value of element |
| Element.setValue('value') |  value:String | Element | Set string value |
| Element.show() |   | Element | Show html element |
| Element.hide() |   | Element | Hide html element |
| Element.setStyle(value) | value:Object  | Element | Set custom style. { background: '#333', color: '#fff' } |
