# 3.x Upgrade Guide

Version 3.x features a redesigned Month Picker menu which:

1. Looks more consistent with [jQuery UI Datepicker](https://jqueryui.com/datepicker/).
2. Turns the Year title into a button which gives the user a "hint" about
the Jump Years menu when they mouse over it.
3. Allows the user to return to the year they clicked Jump years at.

See it for yourself at the [demo on JSFiddle](http://jsfiddle.net/kidsysco/JeZap/).

An upgrade from an older version is simple, and in many cases only requires a new download.

##  i18n property name changes
If you changed out the buttons, labels or other text using the
i18n support you should rename and translate `next5Years` to `next12Years`
and `prev5Years` to `prev12Years`.

You should also add the `backTo` property, which is used for the
new *Back to 2016* button when the user enters the Jump Year menu.

##  CSS changes
Version 3.x uses `em` instead of `px` units.
This means that the menu determines it's size according to the
`body` element's `font-size`, instead of having a fixed width of `200px`.

If you need to resize the menu, add this rule to your CSS:
```
/* Makes the Month Picker menu 20% bigger. */
.month-picker {
  font-size: 1.2em;
}
```

Version 3.x removes:
```
.month-year-input {
    width: 60px;
}
```

If you still want the plugin to implicitly resize the input fields it's applied to you must add this rule to your own CSS.

If you explicitly defined a rule that reverts the effects of this rule, it's no longer necessary and it can be deleted.

##  Markup changes
If you've applied custom CSS to the Month Picker menu, please note that:

The following elements were removed:
```
<td class="year-container-all">
  <div id="year-container">
   <span class="year-title" />
   <span class="year" />
    </div>
```
They were replaces by `<td class='month-picker-title'><a /></td>`.
The `<a>` tag is a [jQyery UI Button](https://jqueryui.com/button/).

The following elements:
```
<td class="previous-year"><button /></td>
<td class="next-year"><button /></td>
```
were replaced by:
```
<td class="month-picker-next"><a /></td>
<td class="month-picker-previous"><a /></td>
```
