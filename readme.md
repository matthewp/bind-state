# <bind-state>

A custom element that keeps state bound between elements. A data binding library that works entirely in HTML.

## Usage

In the following example 2 state properties exist, __name__ and __admin__. These properties exist within the store and can be bind to child elements using the `data-bind` attribute.

```html
<bind-state data-name="World" data-admin!>
  <input type="text"
    data-bind="name"
    data-bind-on="keyup"
    data-bind-from="value">

  <input type="checkbox" data-bind-from="checked" data-bind="admin" data-bind-on="change">

  <div>Name: <span data-bind="name"></span></div>

  <div>Is Administrator: <span data-bind="admin"></span></div>
</bind-state>
```

The `data-bind` property keeps state bound from parent store to child elements.

To make the binding two way, use events. The text input uses two new attributes:

* `data-bind-on`: Which event to bind on.
* `data-bind-from`: Which *property* on that element to bind to.

Whenever the event fires (in this case __keyup__) the `data-bind-from` property is read and set in the parent store.

## License

BSD-2-Clause