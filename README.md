<h1>The jQuery UI Month Picker Version 2.2</h1>
<p>The jQuery UI Month Picker Plugin is designed to allow user input for only a month and year when only that input is 
required. Clicking on the year, allows the user to jump ahead or back 5 years at a time. Clicking anywhere on the 
page, except on the month picker menu itself, will cause the month picker to hide. The Month Picker has lots of options 
for date validation, setting the start year, using an icon button, input masking, internationalization and localization and more.</p>
 
-See a demo with unit tests running on jsFiddle at...
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
        </ul>
    </li>
    <li>(optional) <a target="_new" href="http://digitalbush.com/projects/masked-input-plugin/">Digital Bush Masked Input jQuery Plugin</a></li>
</ul>

<h2>Installation</h2>
<p>Attach all required css and js files to the web page as follows...</p> 
<pre>
link href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" media="all" rel="stylesheet" type="text/css" />
link href="css/MonthPicker.2.0.css" media="all" rel="stylesheet" type="text/css" />

script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js" type="text/javascript"></script>
script src="https://raw.github.com/digitalBush/jquery.maskedinput/1.3.1/dist/jquery.maskedinput.min.js" type="text/javascript"></script>
script src="MonthPicker.2.0.min.js" type="text/javascript"></script>
</pre>

<h2>Source Code Example</h2>
<p>This plugin can only be called on the text or the HTML 5 Month Input Types as follows.</p> 
<pre>
$('#TextBox1').MonthPicker({ StartYear: 2020, ShowIcon: false });
$('input[type=month]').MonthPicker().css('backgroundColor', 'lightyellow');
</pre>

<h2>Internationalization and Localization i18n</h2>
<p>All buttons, labels and other text can be changed out using the i18n support. Examples needed here.</p>

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

<p> <b>$('.selector').MonthPicker('GetSelectedMonthYear')</b>
<br />Validates the selected month/year and returns the selected value if it is a valid date. Returns null if there is no valid date, displays an error message if the message is specified, focuses and selects the violating text.</p>

<p> <b>$('.selector').MonthPicker('GetSelectedMonth')</b>
<br />Returns only the month portion of the selected date as an integer. Returns NaN if there is no valid date.</p>

<p> <b>$('.selector').MonthPicker('GetSelectedYear')</b>
<br />Returns only the year portion of the selected date as an integer. Returns NaN if there is no valid date.</p>

<p> <b>$('.selector').val()</b>
<br />Use jQuery .val() to get the input without any date validation.</p>

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
    <pre>$('.selector').MonthPicker({ ShowIcon: true });</pre>
    
    Get or set the option, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'Disabled');

//setter
$('.selector').MonthPicker('option', 'Disabled', true );
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
    <h3>UseInputMask</h3>
    Type: Bool<br />
    Default: false<br />
    Directs the MonthPicker to use the <a href="http://digitalbush.com/projects/masked-input-plugin/">Digital Bush Masked Input jQuery Plugin</a> on text inputs, the plugin must be loaded to the page if this option is to be used. This option will be ignored if the HTML 5 Input Type is used.
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

<h2>Events</h2>

<p>
    <h3>OnAfterMenuOpen</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker menu opens.
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
    <h3>OnAfterMenuClose</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker menu closes.
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
    <h3>OnAfterNextYear</h3>
    Type: function<br />
    Default: null<br />
    This event is triggered after the Month Picker next year button has been clicked.
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
    This event is triggered after the Month Picker next 5 years button has been clicked.
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
    This event is triggered after the Month Picker previous year button has been clicked.
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
    This event is triggered after the Month Picker previous 5 years button has been clicked.
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
    This event is triggered after the Month Picker month button has been clicked.
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
    This event is triggered after the Month Picker choose months button has been clicked.
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
    This event is triggered after the Month Picker choose year button has been clicked.
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
    This event is triggered after the Month Picker choose years button has been clicked.
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


