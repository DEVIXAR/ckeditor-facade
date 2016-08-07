# Ckeditor Facade

## Overview

Ckeditor plugin simplifies work with API using access through itself wrapper.

You don't need any access to primary initialization form to work with Ckeditor
elements. Just use:

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
            // Список елементів
        ]
    }
```


#### Add button to `Image` dialog

``` javascript
    CkFacade.options = {
        dialog: [{
                image: {
                    ui: [{
                            type: 'button', // задаємо тип елемента
                            id: 'someId', // ідентифікатор елемента для доступу через DOM
                            label: { // значення елементу. є можливість добавлення для різних мов
                                en: 'My custom button',
                                uk: 'Моя власна кнопка'
                            },
                            title: { // підказка при наведення. теж підтримує мультимову
                                en: 'My button. User it for control some event',
                                uk: 'Моя кнопка. Використовуйте її для контролю якої-небудь події'
                            },
                            onShow: function (e) {
                                // як тільки елемент успішно загружений
                            },
                            onClick: function (e) {
                                // клік по доданій кнопці
                            }

                            // можна використовувати і всі стандартні поля та події Ckeditor
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
                    elements: [ // задаємо список нових елементів
                        {
                            type: 'button',
                            label: {
                                en: 'My inner buttom',
                                uk: 'Моя внутрішня кнопка'
                            },
                        },
                        {
                            type: 'hbox', // добавляємо групування для елементів
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
                                    children: [ // таким чином можна формувати безліч елементів
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

                                    var helper = this.helper; // отримуємо доступ до `helper`

                                    // getElement ( iD, tab ) - пошук елемента
                                    helper
                                        .getElement('txtUrl', 'info')
                                        .setValue('http://.../../my-image.jpg');

                                    // по кліку на кнопку добавляємо ссилку на забраження.
                                    // зауважте те, що при зміні значення методом `setValue`
                                    // елемент автоматично виконує тригер зміни.
                                    // т.е. при зміні в даний момент зображення автоматично підгрузилось
                                }
                            },
                        ]
                    }
                }
            ]
        }
```

You can also use `CkFacade` to get access:

``` javascript
    CkFacade.helper
        .getElement('txtUrl', 'info')
        .setValue('http://.../../my-image.jpg');


    // if dialog is not open `NoDialogException`
    // it takes current dialog
```

To get element ID you can use [devtools](http://ckeditor.com/addon/devtools)

# Mehtods

| Function   |      Param Type      |  Return Type |  Description |
|----------|:-------------:|------:|------:|
| Helper.getElement('id', 'tab') |  id:String, tab:String | Element | Get element by element id and tab id |
| Element.getValue() |   | String | Get string value of element |
| Element.setValue('value') |  value:String | Element | Set string value |
| Element.show() |   | Element | Show html element |
| Element.hide() |   | Element | Hide html element |
| Element.setStyle(value) | value:Object  | Element | Set custom style. { background: '#333', color: '#fff' } |
