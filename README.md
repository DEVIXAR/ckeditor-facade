# Ckeditor Facade

## Overview

Плагін для Ckeditor який спрощує роботу з API елементів завдяки доступу 
через власну обгортку. 

Для роботи з елементами Ckeditor зовсім не потрібно мати доступ до 
первинної ініціалізації форми як:

``` javascript
    CKEDITOR.replace( 'editor1' );
```

Просто впевніться, що Ckeditor готовий для роботи. Наприклад використовуючи
стандартний слухач подіїї:

``` javascript
    CKEDITOR.on('instanceReady', function () {
        ...
    });
```

Та отримайте доступ через CkFacade:

``` javascript
    // Для добавлення та управління власними елементами
    CkFacade.options = { ... }
    
    // Для управління вже існуючими власними чи іншими елементами
    CkFacade.helper.getElement(...).setValue(...).[...]...
```

## Добавлення власних елементів в Dialog

Для добавлення власних елементів в діалог використовується:

``` javascript
    CkFacade.options = {
        dialog: [
            // Список елементів
        ]
    }
```


#### Добавляємо кнопку в діалог Image

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


#### Добавляємо вкладку з елементами в діалог Link

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

#### Виконання власного коду

Звичайно ж є можливість виконувати власний код в під час бодування діалогів

``` javascript
    CkFacade.options = {
        make: function (dialogName, dialogDefinition, ev, evData, $this) {
            ...
        }
    }
```

## Маніпуляція елементами

Після добавлення власних елементів, вони отримують поле `helper` яке надає
можливість маніпулювати елментами.

Для прикладу добавлення зображення в діалозі `Image`

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

Також доступ можна отримати з іншого джерела через `CkFacade`

``` javascript
    CkFacade.helper
        .getElement('txtUrl', 'info')
        .setValue('http://.../../my-image.jpg');
        
    // береться поточний діалог
    // у випадку якщо діалог не відкритий `NoDialogException`
```

Що б дізнатися ідентифікатор елемента можна скористатися [devtools](http://ckeditor.com/addon/devtools)

# Методи

| Function   |      Param Type      |  Return Type |  Description |
|----------|:-------------:|------:|------:|
| Helper.getElement('id', 'tab') |  id:String, tab:String | Element | Get element by element id and tab id |
| Element.getValue() |   | String | Get string value of element |
| Element.setValue('value') |  value:String | Element | Set string value |
| Element.show() |   | Element | Show html element |
| Element.hide() |   | Element | Hide html element |
| Element.setStyle(value) | value:Object  | Element | Set custom style. { background: '#333', color: '#fff' } |
