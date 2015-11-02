<h1>The jQuery UI Month Picker Version 2.6.2</h1>
<p>The jQuery UI Month Picker Plugin is designed to allow user input for only a month and year when only that input is 
required. Clicking on the year, allows the user to jump ahead or back 5 years at a time. Clicking anywhere on the 
page, except on the month picker menu itself, will cause the month picker to hide. The Month Picker has lots of options 
for date validation, setting the start year, using an icon button, input masking, internationalization and localization and more.</p>
 
-See a demo on jsFiddle at...
-http://jsfiddle.net/kidsysco/JeZap/ 

<h2>Prerequisites</h2>
<p>This plugin has been tested using the following configuration.</p>
<ul>
    <li>jQuery 1.9+</li>
    <li>jQuery UI 1.9+
        <ul>
            <li>jQuery UI Widget Factory required</li>
            <li>.button() plugin required</li>
            <li>.datepicker() plugin required</li>
            <li>.position() plugin optional (highly recommended see <a href='#position'>Position option</a>)</li>
        </ul>
    </li>
    <li>(optional) <a target="_new" href="http://digitalbush.com/projects/masked-input-plugin/">Digital Bush Masked Input jQuery Plugin</a></li>
</ul>

<h2>Installation</h2>
<p>Attach all required css and js files to the web page as follows...</p> 
<pre>
&lt;link href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" media="all" rel="stylesheet" type="text/css" />
&lt;link href="css/MonthPicker.css" media="all" rel="stylesheet" type="text/css" />

&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript">&lt;/script>
&lt;script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js" type="text/javascript">&lt;/script>
&lt;script src="https://raw.github.com/digitalBush/jquery.maskedinput/1.3.1/dist/jquery.maskedinput.min.js" type="text/javascript">&lt;/script>
&lt;script src="MonthPicker.min.js" type="text/javascript">&lt;/script>
</pre>

<h2>Source Code Example</h2>
<p>This plugin can only be called on the text or the HTML 5 Month Input Types as follows.</p> 
<pre>
$('#TextBox1').MonthPicker({ StartYear: 2020, ShowIcon: false });
$('input[type=month]').MonthPicker().css('backgroundColor', 'lightyellow');
</pre>

<h2>Internationalization, Localization with i18n and RTL support</h2>
<p>
All buttons, labels and other text can be changed out using the i18n support.<br/>
<pre>
$('#TextBox1').MonthPicker({
      i18n: {
         year: "année",
         prevYear: "l'année dernière",
         nextYear: "l'année prochaine"
      }
});
</pre>
You can set the menu's run direction as right to left by using the <a href='#isrtl'>IsRTL option.</a><br/>
<pre>
$('#TextBox1').MonthPicker({
      IsRTL: true
});
</pre>
</p>

<h2>HTML 5 Month Input Support</h2>
<p>Calling the MonthPicker on HTML 5 Month Input types is currently working. The latest version of Chrome shows some nice examples of how this plugin works with the HTML 5 Month Input Type but we still feel that our UI is better than what Chrome offers... Wow, did I just say that? The jQuery UI month picker UI allows the user to choose any month of the year in a single click, while the Chrome version requires more tinkering. The HTML 5 support in Chrome appears to make input masking and validation obsolete, so those should be turned off when using this plugin on an HTML 5 Month Input Type. The HTML 5 Month Input Type is the reccomended element to call this plugin on but it is not required.</p>
<p><img src="https://cloud.githubusercontent.com/assets/2731230/3907006/f117cf7c-22f7-11e4-9958-4cd246c0acb6.gif" /></p>
<p>W3C Month Input Type Documentation: http://www.w3.org/TR/html-markup/input.month.html</p>

<h2>API Methods</h2>
<p> <b>$('.selector').MonthPicker('Clear')</b>
<br />Clears the state of all input and validation warnings.</p>

<p> <b>$('.selector').MonthPicker('ClearAllCallbacks')</b>
<br />Disables all previously assigned event callbacks listed in the Events tab.</p>

<p> <b>$('.selector').MonthPicker('Disable')</b>
<br />Disables the MonthPicker and its associated elements.</p>

<p> <b>$('.selector').MonthPicker('Enable')</b>
<br />Enables the MonthPicker and its associated elements.</p>

<p> <b>$('.selector').MonthPicker('GetSelectedDate')</b>
<br />Returns the selected month as a <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date'>Date</a> object. (Added in version 2.4)</p>

<p> <b>$('.selector').MonthPicker('Validate')</b>
<br />Validates the selected month/year and returns the selected value as a <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date'>Date</a> object if it is a valid date. Returns null if there is no valid date, displays an error message if the message is specified, focuses and selects the violating text. (Added in version 2.4)</p>

<p> <b>$('.selector').MonthPicker('GetSelectedMonthYear')</b>
<br />Validates the selected month/year and returns the selected value as a string (for example '1/2015') if it is a valid date. Returns null if there is no valid date, displays an error message if the message is specified, focuses and selects the violating text.
NOTE: This method is <b>not</b> affected by the <a href='#monthformat'>MonthFormat option</a>.</p>

<p> <b>$('.selector').MonthPicker('GetSelectedMonth')</b>
<br />Returns only the month portion of the selected date as an integer. Returns NaN if there is no valid date.</p>

<p> <b>$('.selector').MonthPicker('GetSelectedYear')</b>
<br />Returns only the year portion of the selected date as an integer. Returns NaN if there is no valid date.</p>

<p> <b>$('.selector').val()</b>
<br />Use jQuery .val() to get the input without any date validation.</p>

<p> <b>$('.selector').MonthPicker('Open')</b>
<br />Opens the month picker menu and keeps it open if it's already open, see the <a href='#onbeforemenuclose'>OnBeforeMenuClose event</a> to prevent the menu from closing on click (or other) events. (Added in version 2.5).

<p> <b>$('.selector').MonthPicker('Toggle')</b>
<br />Opens the month picker menu or closes the menu if it's already open, see the <a href='#onbeforemenuclose'>OnBeforeMenuClose event</a> to prevent the menu from closing on click (or other) events. (Added in version 2.5).

<p><b>IMPORTANT:</b> If you are <b>Opening</b> or <b>Toggling</b> the menu in response to events like click, mousedown, mouseup, focus etc...
The menu will immediately close itself, you can prevent the menu from closing using the
<a href='#onbeforemenuclose'>OnBeforeMenuClose event</a> (example included) and calling <a href='http://api.jquery.com/event.preventdefault/'>event.preventDefault()</a> for the element triggering the event.

<p><b>NOTE:</b> It might be possible to prevent the menu from closing by calling <a href='https://api.jquery.com/event.stoppropagation/'>event.stopPropagation()</a> in the click event that called the Open method. 

However this is <b>not supported</b> and might stop working in future releases if we change the way the plugin handles events.  To prevent the menu from hideing use the <a href='#onbeforemenuclose'>OnBeforeMenuClose event</a> (example included) and call <a href='http://api.jquery.com/event.preventdefault/'>event.preventDefault()</a> for the element triggering the event.

<p> <b>$('.selector').MonthPicker('Close')</b>
<br />Closes the month picker if it's already open. You can prevent the menu from closing using the <a href='#onbeforemenuclose'>OnBeforeMenuClose event</a> and calling <a href='http://api.jquery.com/event.preventdefault/'>event.preventDefault()</a>. (Added in version 2.5).

<p> <b>$('.selector').Destroy()</b>
<br />Destroys the month picker widget.</p>

<h2>Theme Support</h2>
<p>The MonthPicker plugin uses the jQuery UI CSS Framework to style its look and feel, including the colors of buttons and background textures. We recommend using the ThemeRoller tool to create and download custom themes that are easy to build and maintain.</p>
<p>If a deeper level of customization is needed, there are widget-specific classes referenced within the MonthPicker.css stylesheet that can be modified. These classes are highlighed below.</p>
<p> <b>.month-picker-disabled</b>

<br />Customize the disabled look of the MonthPicker text box.</p>
<p> <b>.month-picker-invalid-message</b>

<br />Customize the look of validation message.</p>
<p> <b>.month-year-input</b>

<br />Customize the look of the MonthPicker text input box in an enabled state.</p>

<h2>Options</h2>

<p>
    <h3>Disabled</h3>
    Type: Boolean<br />
    Default: false<br />
    Disables and enables the MonthPicker.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ Disabled: true });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'Disabled');

//setter
$('.selector').MonthPicker('option', 'Disabled', true );
</pre>
</p>

<p>
    <h3>MinMonth</h3>
    Type: Date or Number or String<br />
    Default: null<br />
    Since: 2.6<br />
    The minimum selectable month. When set to null, there is no minimum.
</p>

<p>
<b>Multiple types supported:</b>
<ul>
	<li><b>Date:</b> A <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date'>Date</a> object containing the minimum month.</li>
	<li><b>Number:</b> A number of months from today. For example 2 represents two months from today and -1 represents the last month.</li>
	<li><b>String:</b> A string in the format defined by the <a href='#monthformat'>MonthFormat option</a>, or a relative month.<p> Relative months must contain value and period pairs; valid periods are "m" for months, and "y" for years. For example, "+1y +3m" represents one year and three months from today.</p></li>
</ul>
</p>

<p>
    Disables past months upon init.
    <pre>$('.selector').MonthPicker({ MinMonth: 0 });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var minMonth = $('.selector').MonthPicker('option', 'MinMonth');

// Set's the minimum selectable month to one year and three months
// from today.
$('.selector').MonthPicker('option', 'MinMonth', '+1y +3m');
</pre>
</p>

<p>
    <h3>MaxMonth</h3>
    Type: Date or Number or String<br />
    Default: null<br />
    Since: 2.6<br />
    The maximum selectable month. When set to null, there is no maximum.
</p>

<p>
<b>Multiple types supported:</b>
<ul>
	<li><b>Date:</b> A <a href='https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date'>Date</a> object containing the maximum month.</li>
	<li><b>Number:</b> A number of months from today. For example 2 represents two months from today and -1 represents the last month.</li>
	<li><b>String:</b> A string in the format defined by the <a href='#monthformat'>MonthFormat option</a> option, or a relative month. <p> Relative months must contain value and period pairs; valid periods are "m" for months, and "y" for years. For example, "+1y +3m" represents one year and three months from today.</p></li>
</ul>
</p>

<p>
    Disables future months upon init.
    <pre>$('.selector').MonthPicker({ MaxMonth: 0 });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var minMonth = $('.selector').MonthPicker('option', 'MaxMonth');

// Set's the maximum selectable month to one year and three months
// before today.
$('.selector').MonthPicker('option', 'MaxMonth', '+1y +3m');
</pre>
</p>

<p>
    <h3>Button</h3>
    Types: 
    <ul>
    	<li>Function that returns jQuery</li>
    	<li>HTML string</li>
    	<li>jQuery selector</li>
    	<li>DOM element.</li>
	</ul>
    Since: 2.5<br />
    Default: 
    <pre>
// Creates the default button.
Button: function(options) {
    // this refers to the associated input field.
    return $('&lt;span id="MonthPicker_Button_' + this.id + '" class="month-picker-open-button">' + options.i18n.buttonText + '&lt;/span>')
        .button({
            text: false,
            icons: {
                // Defaults to 'ui-icon-calculator'.
                primary: options.ButtonIcon
            }
        });
}
    </pre>
    Create or assign an existing element as a button that opens the month picker menu. Set to false to hide the button and show the menu upon focus of the text box.
</p>

<p>
<b>NOTE:</b> If you just want to use a different <a href='http://api.jqueryui.com/theming/icons/'>icon class name</a> for the default icon see the <a href='#buttonicon'>ButtonIcon option</a>.
</p>

<p>
If the element was not added to the document (is not a descendant of document.body)
it will be inserted after the associated input field.
</p>

<p>
When you change the <a href='#disabled'>Disabled</a> option the button will be visualy disabled if it's a <a href='https://jqueryui.com/button/'>jQuery UI button</a> or if it's a DOM element
that responds to the disabled property (for example the <a href='https://developer.mozilla.org/en/docs/Web/HTML/Element/button'>button tag</a>, an <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button'>input type button</a> etc...).  <br />
This means that if you assign an image button and you are changing the Disabled option you must provide a disabled image as shown in the <a href='#disabledimgbtn'>example</a> below.
</p>

<p>
    Create a button similar to the default button created by jQuery UI Datepicker's <a href='http://api.jqueryui.com/datepicker/#option-showOn'>showOn:</a> 'both' option.
<pre>
$('.selector').MonthPicker({ 
    Button: '&lt;button type="button" class="ui-datepicker-trigger">...&lt;/button>'
});
</pre>

    Create a button out of an image.
<pre>
$('.selector').MonthPicker({ 
    Button: '&lt;img src="images/calendar.gif" title="Select date" />'
});
</pre>

    Create a button with different images for enabled and disabled state.
<pre id='disabledimgbtn'>
$('.selector').MonthPicker({
    Button: function(opts) {
	    var src = 'images/calendar_' + (opts.Disabled ? 'disabled' : 'enabled') + '.gif';
	    return '&lt;img src="' + src + '" title="Select date" />';
    }
});
</pre>

    Create a button using a <a href='http://handlebarsjs.com/'>Handlebars.js</a> template. The same can be done with other popular template engines.
<pre>
&lt;script id='template' type='text/template'>
&lt;img src="images/{{ButtonIcon}}{{#if Disabled}}-disabled{{/if}}.gif" title="{{i18n.buttonText}}" />
&lt;/script>
&lt;script>
$('.selector').MonthPicker({ 
    Button: Handlebars.compile( $('#template').html() )
});
&lt;/script>
</pre>

    Assign an existing element with a class of button that immediately follows
    the associated input field as a button.
<pre>
$('.selector').MonthPicker({ 
    Button: function() {
        return $(this).next('.button');
    }
});
</pre>

    Assign a specific element with the class .selector
<pre>
$('.selector').MonthPicker({ 
    Button: '.selector'
});
</pre>

    Get or set the option, after init. 
<pre>
//getter
var button = $('.selector').MonthPicker('option', 'Button');

//setter (hide the button and show the menu upon focus of the text box).
$('.selector').MonthPicker('option', 'Button', false );
</pre>
</p>

<p>
    <h3>ShowIcon</h3>
    Type: Boolean<br />
    Default: true<br />
    Shows an icon that opens the month picker. Without an icon, the month picker menu will show upon focus of the text box.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ ShowIcon: true });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'ShowIcon');

//setter
$('.selector').MonthPicker('option', 'ShowIcon', false );
</pre>
</p>

<p>
    <h3>ButtonIcon</h3>
    Type: String<br />
    Default: ui-icon-calculator<br />
    
    Allows setting a different primary <a href='http://api.jqueryui.com/theming/icons/'>icon class name</a> for the default icon. Feel free to use this option in your custom buttons as show in the <a href='#button'>Button option</a> examples.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ ButtonIcon: 'ui-icon-clock' });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var image = $('.selector').MonthPicker('option', 'ButtonIcon');

//setter
$('.selector').MonthPicker('option', 'ButtonIcon', false );
</pre>
</p>

<p>
    <h3>ShowOn</h3>
    Type: String<br />
    Since: 2.5<br />
    Default: button or focus only<br />
    Set the menu to open on both clicking the button and focusing on the associated input field.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ ShowOn: 'both' });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var ShowOn = $('.selector').MonthPicker('option', 'ShowOn');

//setter
$('.selector').MonthPicker('option', 'ShowOn', 'both' );
</pre>
</p>


<p>
    <h3>IsRTL</h3>
    Type: Boolean<br />
    Default: false<br />
    Since: 2.5<br />
    Sets the menu's run direction as right to left.
</p>
<p>
<b>IMPORTANT:</b> This option expects that the html or body tag's dir='rtl'.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ IsRTL: true });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var IsRTL = $('.selector').MonthPicker('option', 'IsRTL');

//setter
$('.selector').MonthPicker('option', 'IsRTL', true );
</pre>
</p>

<p>
    <h3>StartYear</h3>
    Type: Int<br />
    Default: Current Year<br />
    Sets the starting year in the month picker. This option will override all other start year behaviors.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ StartYear: 2023 });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'StartYear');

//setter
$('.selector').MonthPicker('option', 'StartYear', false );
</pre>
</p>

<p>
    <h3>ValidationErrorMessage</h3>
    Type: Nullable String<br />
    Default: null<br />
    Sets the validation error message for use with text input types. Set to null to omit this behavior. This option will be ignored if the HTML 5 Input Type is used.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ ValidationErrorMessage: 'Invalid Date!' });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'ValidationErrorMessage');

//setter
$('.selector').MonthPicker('option', 'ValidationErrorMessage', null );
</pre>
</p>

<p>
    <h3>MonthFormat</h3>
    Type: String<br />
    Default: 'mm/yy' which results in 12/2015.<br />
    Since: 2.4</br>
    The format for parsed and displayed months. For a full list of the possible formats see the <a href='http://api.jqueryui.com/datepicker/#utility-formatDate'>$.datepicker.formatDate()</a> function.
</p>
<p>
    Set the option upon init.
    
    <pre>// Results in December, 2015
$('.selector').MonthPicker({ MonthFormat: 'MM, yy' });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'MonthFormat');

//setter (Results in December, 2015)
$('.selector').MonthPicker('option', MonthFormat: 'MM, yy' );
</pre>

The following example shows how to use the popular <a href='http://momentjs.com'>Moment.js</a> library
for parsing and formatting dates, but you can use any third party library you would like:
<pre>
$.widget('MyOrg.MomentMonthPicker', $.KidSysco.MonthPicker, {
	
	// Set the default format.
	options: {
		MonthFormat: 'MM/YYYY',
	},
	
	// Set the format to use with the HTML 5 month input.
	MonthInputFormat: 'YYYY-MM',
	
    /**
     * @param str		{String} A string representing a date in the given format.
     * @param format	{String} The format used to parse the str argument.
     * 
     * @returns	{Date}	 A JavaScript date.
     */
    ParseMonth: function(str, format) {
        var wrapper = moment(str, format);
        return wrapper.isValid() ? wrapper.toDate() : null;
    },
    
    /**
     * @param date		{Date} A string representing a date in the given format.
     * @param format	{String} The format to use to convert the date to a string.
     * 
     * @returns	{String}  A string representing a date in the given format.
     */
    FormatMonth: function(date, format) {
        var wrapper = moment(date);
        return wrapper.isValid() ? wrapper.format(format) : null;
    }
});
</pre>

And then you can use the plugin as shown:
<pre>// Creates a month picker which uses the Moment.js library to display and parse months
// which will set "December, 2015" in the input field when a month is selected.
// Of course you can also pass in any of the other supported options mentioned in
// the documentation.
$('.selector').MomentMonthPicker({
	MonthFormat: 'MMMM, YY'
});
</pre>
</p>
<p>
    <h3>UseInputMask</h3>
    Type: Bool<br />
    Default: false<br />
    Directs the MonthPicker to use the <a href="http://digitalbush.com/projects/masked-input-plugin/">Digital Bush Masked Input jQuery Plugin</a> on text inputs, the plugin must be loaded to the page if this option is to be used. This option will be ignored if the HTML 5 Input Type is used.
</p>
<p>
In version 2.4 and later the mask is constructed according to the <a href='#monthformat'>MonthFormat option</a>.
</p>
<p>
<b>NOTE:</b> numeric literals in the MonthFormat will be editable by the user, if this is not the desired behavior you will have to use the <a href='http://digitalbush.com/projects/masked-input-plugin/'>.mask()</a> method manually.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ UseInputMask: true });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'UseInputMask');

//setter
$('.selector').MonthPicker('option', 'UseInputMask', false );
</pre>
</p>

<p>
    <h3>Animation</h3>
    Type: String<br />
    Default: 'fadeToggle'<br />
    Supported values: ['fadeToggle', 'slideToggle', 'none']<br />
    Since: 2.4</br>
    Sets the animation to use when the menu both opens and closes, you can disable animation
    by passing in none.
    <p>
    If you want to have different animations for opening and closing the menu
    see the <a href='#showanim'>ShowAnim</a> and <a href='#hideanim'>HideAnim</a> options.
    </p>
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ Animation: 'slideToggle' });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var Animation = $('.selector').MonthPicker('option', 'Animation');

//setter
$('.selector').MonthPicker('option', 'Animation', 'slideToggle' );
</pre>
</p>

<p>
    <h3>Duration</h3>
    Type: Number or String<br />
    Default: 'fadeToggle'<br />
    Supported values: ['normal', 'fast', 'slow'] or number of milliseconds<br />
    Since: 2.4</br>
    Sets the speed of the animation used to open and close the menu.
</p>
<p>F
	You choose from three predefined speeds:
	<ul>
	<li>normal (the default) 400ms</li>
	<li>fast 200ms</li>
	<li>slow 600ms</li>
	</ul>
	
	Or you can specify the speed in milliseconds by passing in a number.
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ Duration: 'fast' });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var Duration = $('.selector').MonthPicker('option', 'Duration');

//setter
$('.selector').MonthPicker('option', 'Duration', 'fast' );
</pre>
</p>

<p>
    <h3>ShowAnim</h3>
    Type: String<br />
    Default: 'fadeIn'<br />
    Supported values: ['fadeIn', 'slideDown', 'none']<br />
    Since: 2.4</br>
    Sets the animation to use only when the  menu is open, you can disable the show animation by
    passing in none.
    <p>
    If you want to have the same animation for both opening and closing the menu use
    the <a href='#animation'>Animation option</a> instead.
    </p>
    
    <p>
    To set the animation for closing the menu see the <a href='#hideanim'>HideAnim option</a>.
    </p>
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ ShowAnim: 'slideDown' });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var ShowAnim = $('.selector').MonthPicker('option', 'ShowAnim');

//setter
$('.selector').MonthPicker('option', 'ShowAnim', 'slideDown' );
</pre>
</p>

<p>
    <h3>HideAnim</h3>
    Type: String<br />
    Default: 'fadeOut'<br />
    Supported values: ['fadeOut', 'slideUp', 'none']<br />
    Since: 2.4</br>
    Sets the animation to use only when the menu is opened, you can disable the hide animation by
    passing in none.
    <p>
    If you want to have the same animation for both opening and closing the menu use
    the <a href='#animation'>Animation option</a> instead.
    </p>
    
    <p>
    To set the animation for opening the menu see the <a href='#showanim'>ShowAnim option</a>.
    </p>
</p>
<p>
    Set the option upon init.
    <pre>$('.selector').MonthPicker({ HideAnim: 'slideUp' });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var HideAnim = $('.selector').MonthPicker('option', 'HideAnim');

//setter
$('.selector').MonthPicker('option', 'HideAnim', 'slideUp' );
</pre>
</p>

<p>
    <h3>Position</h3>
    Type: Object<br />
	Since: 2.3<br />
    Default: <pre>{ my: 'left top+1', at: 'left bottom', collision: 'flip', of: $('.selector') }</pre><br />
    If the <a href='http://api.jqueryui.com/position/'>jQuery UI .position() plugin</a> is loaded
    the menu will be moved to an alternative position when it overflows the window in some direction. <br />
    For more information see the <a href='http://api.jqueryui.com/position/#position-options'>collision option</a>.
</p>    
<p>
    In addition you can specify where you would like the menu to positiond using the <a href='http://api.jqueryui.com/position/#position-options'>jQuery IU .position() plugin options</a>.
</p>
<p>
 The properties you specify in the position hash will be merged with the default properties (shown above). <br />
 See example below:
</p>
<p>
    Set the option upon init.
    <pre>
// The collision property will be morged with the defualt properties so the position plugin will receive:
// { my: 'left top+1', at: 'left bottom', collision: 'fit flip', of: $('.selector') }
$('.selector').MonthPicker({
 Position: {
    collision: 'fit flip'
 }
});
</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var position = $('.selector').MonthPicker('option', 'Position');

//setter
$('.selector').MonthPicker('option', 'Position', {collision: 'fit', at: 'left bottom'});
</pre>
</p>

<h2>Events</h2>

<p>
    <h3>OnBeforeMenuOpen</h3>
    Type: function<br />
    Default: null<br />
    Since: 2.5<br />
    This event is triggered before the Month Picker menu will open and it allows you to prevent the menu from opening. this refers to the associated input field.</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>
$('.selector').MonthPicker({
	OnBeforeMenuOpen: function(event){
		// Make sure the user is aware of the consequences, and prevent opening if they say no.
		if ( !confirm('The field "' + this.id + '" is destructive. Are you sure you want to proceed?') ) {
			event.preventDefault();
		}
	}
});
</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var callback = $('.selector').MonthPicker('option', 'OnBeforeMenuOpen');

//setter
$('.selector').MonthPicker('option', 'OnBeforeMenuOpen', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterMenuOpen</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker menu opens. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterMenuOpen: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterMenuOpen');

//setter
$('.selector').MonthPicker('option', 'OnAfterMenuOpen', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnBeforeMenuClose</h3>
    Type: function<br />
    Default: null<br />
    Since: 2.5<br />
    This event is triggered before the Month Picker menu will close, and it allows you to prevent the menu from closing. this refers to the associated input field.</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>
$('.selector').MonthPicker({
	OnBeforeMenuClose: function(event){
		// Prevent the menu from closing when clicking on 
		// the external button or one of it's child nodes.
		//
		// Note: The first argument of $.contains() must be a DOM element, 
		// not a jQuery object or plain JavaScript object.
		if ( $.contains($('#extarnal_button')[0], event.target) ) {
			event.preventDefault();
		}
	}
});
</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var callback = $('.selector').MonthPicker('option', 'OnBeforeMenuClose');

//setter
$('.selector').MonthPicker('option', 'OnBeforeMenuClose', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterMenuClose</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker menu closes. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterMenuClose: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterMenuClose');

//setter
$('.selector').MonthPicker('option', 'OnAfterNextYear', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterSetDisabled</h3>
    Type: function<br />
    Default: null<br />
    Since: 2.5<br />
    This event is triggered after the <a href='#disabled'>Disabled</a> options was changed.
<p>
    Supply a callback function to handle the event as an init option.
    <pre>
$('.selector').MonthPicker({
	OnAfterSetDisabled: function(isDisabled){
		
	}
});
</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var callback = $('.selector').MonthPicker('option', 'OnAfterSetDisabled');

//setter
$('.selector').MonthPicker('option', 'OnAfterSetDisabled', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterNextYear</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker next year button has been clicked. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterNextYear: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterNextYear');

//setter
$('.selector').MonthPicker('option', 'OnAfterNextYear', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterNextYears</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker next 5 years button has been clicked. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterNextYears: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterNextYears');

//setter
$('.selector').MonthPicker('option', 'OnAfterNextYears', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterPreviousYear</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker previous year button has been clicked. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterPreviousYear: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterPreviousYear');

//setter
$('.selector').MonthPicker('option', 'OnAfterPreviousYear', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterPreviousYears</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker previous 5 years button has been clicked. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterPreviousYears: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterPreviousYears');

//setter
$('.selector').MonthPicker('option', 'OnAfterPreviousYears', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterChooseMonth</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker month button has been clicked. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterChooseMonth: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterChooseMonth');

//setter
$('.selector').MonthPicker('option', 'OnAfterChooseMonth', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterChooseMonths</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker choose months button has been clicked. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterChooseMonths: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterChooseMonths');

//setter
$('.selector').MonthPicker('option', 'OnAfterChooseMonths', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterChooseYear</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker choose year button has been clicked. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterChooseYear: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterChooseYear');

//setter
$('.selector').MonthPicker('option', 'OnAfterChooseYear', function(){ ... } );
</pre>
</p>

<p>
    <h3>OnAfterChooseYears</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker choose years button has been clicked. As of version 2.4 this refers to the associated input field.
</p>
<p>
    Supply a callback function to handle the event as an init option.
    <pre>$('.selector').MonthPicker({ OnAfterChooseYears: function(){ ... } });</pre>
    
    Get or set the callback function, after init. 
    <pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'OnAfterChooseYears');

//setter
$('.selector').MonthPicker('option', 'OnAfterChooseYears', function(){ ... } );
    </pre>
</p>

<h2>Plugin version</h2>
The version can be determined using:
<pre>
$.MonthPicker.VERSION
</pre>
<p>
If the value is undefined you are using an old version (2.3 and under).
</p>

<h2>Month Picker Development Kit</h2>
<p>This repo includes references for <a ref="https://nodejs.org/en/">Node.js</a>, <a href="https://www.npmjs.com/">NPM</a>, <a href="http://gruntjs.com/">Grunt</a> and <a href="http://bower.io/">Bower</a> to facilitate further development and testing in the jQuery UI Month Picker project.</p>
<p>npm install<br /> This command will install all required dependencies including all resources needed from Bower.</p>
<p>grunt<br /> This command will re-compile minified versions of the .js and .css codes before running both through the QUnit tests tests in a headless <a href="http://phantomjs.org/">PhantomJS</a> instance.</p>
<p>grunt test<br /> This command will simply re-run all QUnit tests in a headless <a href="http://phantomjs.org/">PhantomJS</a> instance.</p>


