jquery-ui-month-picker
======================

<div style="width: 650px;">
     <h1>
            The jQuery UI Month Picker Plugin</h1>

    <p>The jQuery UI Month Picker Plugin was designed to allow users to choose only a month and year when only that input is required. Clicking on the year, allows the user to jump ahead or back 5 years at a time. Clicking anywhere on the page, except on the month picker menu itself, will cause the month picker to hide.</p>
     <h2>
            Demonstration & Unit Testing</h2>

    <blockquote>
        <p class="demo"> <b>Icon Demonstration</b>

            <br />This demonstrates the default option for showing an icon and it also demonstrates jQuery command chaining by setting the background color of the text input.
            <br />
            <br />Choose a Month:
            <input id="IconDemo" type="text" />
        </p>
        <p class="demo"> <b>No Icon Demonstration</b>

            <br />This demonstrates setting options for removing the icon.
            <br />
            <br />Choose a month:
            <input id="NoIconDemo" type="text" />
        </p>
        <p class="demo"> <b>Start Year Demonstration</b>

            <br />This demonstrates how the plugin will default to the year specified in the text box. Changing the year in the text box will result in a new default year for the chooser and if no date is selected then the default year is the current year.
            <br />
            <br />Choose a month:
            <input id="StartYearDemo" type="text" value="01/2025" />
        </p>
        <p class="demo"> <b>Override Start Year Demonstration</b>

            <br />This demonstrates how the MonthPicker can be configured to override the start year default behavior. This MonthPicker will start on 2023 no matter which date is currently selected, even if no date is specified.
            <br />
            <br />Choose a month:
            <input id="OverrideStartYear" type="text" />
        </p>
        <p class="demo"> <b>Get Month/Year & Validation API Demonstration</b>

            <br />This demonstrates API usage for the GetSelectedMonthYear(), GetSelectedYear() and GetSelectedMonth() function calls which will also perform date validation. Clear() will clear the text field and any validation messages.
            <br />
            <br />Choose a month:
            <input id="GetYearDemo" class="GetYearDemo" type="text" value="02/2012" />
            <br />
            <br />
            <button type="button" onclick="alert($('.GetYearDemo').MonthPicker('GetSelectedYear'));">Get Year</button>
            <button type="button" onclick="alert($('#GetYearDemo').MonthPicker('GetSelectedMonth'));">Get Month</button>
            <button type="button" onclick="alert($('#GetYearDemo').MonthPicker('GetSelectedMonthYear'));">Get Month and Year</button>
            <button type="button" onclick="$('#GetYearDemo').MonthPicker('Clear');">Clear</button>
        </p>
        <p class="demo"> <b>Disable/Enable API Demonstration</b>

            <br />This demonstrates API usage for the Enable() and Disable().
            <br />
            <br />Choose a month:
            <input id="EnableDisableDemo" type="text" value="12/2009" />
            <br />
            <button type="button" onclick="$('#EnableDisableDemo').MonthPicker('option', 'Disabled', true);">Disable</button>
            <button type="button" onclick="$('#EnableDisableDemo').MonthPicker('option', 'Disabled', false);">Enable</button>
        </p>
        <p class="demo"> <b>Digital Bush Integration Demonstration</b>

            <br />This demonstrates how the MonthPicker plugin integrates with the <a href="http://digitalbush.com/" target="_new">Digital Bush Plugin for Input Masking</a> as well as the html 5 placeholder attribute to simulate watermarking. Try to type an invalid date and try the Get Month/Year button to fire off validation.
            <br />
            <br />Type in a month/year:
            <br />
            <input id="DigitalBush" type="text" class="digital-bush" />
            <br />
            <br />Type in a month/year::
            <br />
            <input id="DigitalBushBoth" type="text" class="digital-bush" placeholder="mm/yyyy" />
            <br />
            <br />
            <button type="button" onclick="$('.digital-bush').MonthPicker('Clear');">Clear All</button>
            <button type="button" onclick="alert($('#DigitalBushBoth').MonthPicker('GetSelectedMonthYear'));">Get Month/Year</button>
        </p>
        <p class="demo"> <b>jQuery UI Dialog Integration Demonstration</b>

            <br />This demonstrates the Month Picker running inside of the jQuery UI Modal Dialog.
            <br />
            <br />
            <button type="button" id="LaunchDialog" onclick="$('#Modal').dialog('open');">Launch Dialog</button>
        </p>
        <p class="demo"> <b>Error Checking</b>

            <br />This demonstrates what will happen if the MonthPicker is called on html elements other than a text input.
            <br />
            <br /> <span id="MySpan" style="border: solid 1px black; padding: 5px; margin: 5px; background-color: Gray;
                    color: White;">#MySpan</span>

            <button type="button" id="Button1" onclick="$('#MySpan').MonthPicker();">Call MonthPicker on span</button>
        </p>
    </blockquote>
</div>
 <h2>
        Unit Test Results</h2>

<div id="qUnitOutput" style="margin-bottom: 25px;">
     <h1 id="qunit-header">
            qUnit Testing Output</h1>

     <h2 id="qunit-banner">
        </h2>

    <div id="qunit-testrunner-toolbar"></div>
     <h2 id="qunit-userAgent">
        </h2>

    <ol id="qunit-tests"></ol>
    <div id="qunit-fixture">test markup</div>
</div>
 <h2>
        Documentation Reference</h2>

<div id="tabs">
    <ul>
        <li><a href="#Source">Source</a>

        </li>
        <li><a href="#Prereq">Prerequisites</a>

        </li>
        <li><a href="#Options">Options</a>

        </li>
        <li><a href="#Methods">API</a>

        </li>
        <li><a href="#Events">Events</a>

        </li>
        <li><a href="#Theme">Theming</a>

        </li>
    </ul>
    <div id="Source">
         <h3>
                Source Code Example</h3>

        <blockquote>
            <p>This plugin can only be called on text boxes as follows.</p> <pre>
$('#TextBox1').MonthPicker({ StartYear: 2020, ShowIcon: false });
$('#TextBox2').MonthPicker().css('backgroundColor', 'lightyellow');
        </pre>

        </blockquote>
    </div>
    <div id="Prereq">
         <h3>
                Prerequisites</h3>

        <p>This plugin has been tested using the following configuration.</p>
        <ul>
            <li>jQuery 1.9</li>
            <li>jQuery UI 1.9, 1.10
                <ul>
                    <li>jQuery UI Widget Factory required</li>
                    <li>.button() plugin required</li>
                    <li>.datepicker() plugin required</li>
                </ul>
            </li>
            <li>(optional) Digital Bush Input Mask jQuery Plugin</li>
        </ul>
    </div>
    <div id="Options">
         <h3>
                Options</h3>

        <blockquote>
            <div class="option"> <span class="option-link" onclick="$('#DisabledExample').toggle();">Disabled</span>
 <span class="option-type">Type: Boolean</span>  <span class="option-type">Default: false</span>

                <blockquote id="DisabledExample" class="option-block">Disables/enables the MonthPicker on initialization.
                    <br />
                    <br /> <b>Code Examples</b>

                    <br />
                    <br />Initialize a MonthPicker with the disabled option specified.
                    <br />
                    <br />$('.selector').MonthPicker({ Disabled: true });
                    <br />
                    <br />Get or set the disabled option, after init. <pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'Disabled');
<br />
//setter
$('.selector').MonthPicker('option', 'Disabled', true );
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#ShowIconExample').toggle();">ShowIcon</span>
 <span class="option-type">Type: boolean</span>  <span class="option-type">Default: true</span>

                <blockquote id="ShowIconExample" class="option-block">Indicates whether or not to show an icon that opens the month picker. Without an icon, the month picker menu will show upon focus of the text box.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Initialize a MonthPicker with the ShowIcon option specified.
                    <br /> <pre>
$('.selector').MonthPicker({ ShowIcon: true });
</pre>

                    <br />Get or set the disabled option, after init. <pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'ShowIcon');
<br />
//setter
$('.selector').MonthPicker('option', 'ShowIcon', true );
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#StartYearExample').toggle();">StartYear</span>
 <span class="option-type">Type: int</span>  <span class="option-type">Default: The current
                        year.</span>

                <blockquote id="StartYearExample" class="option-block">Sets the starting year in the month picker. This setting will over ride all other start year behaviors.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Initialize a MonthPicker with the StartYear option specified.
                    <br /> <pre>
$('.selector').MonthPicker({StartYear: 2020 });</pre>

                    <br />Get or set the disabled option, after init. Set to null to omit this behavior. <pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'StartYear');
<br />
//setter
$('.selector').MonthPicker('option', 'StartYear', 2032);
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#ValidationErrorMessageExample').toggle();">ValidationErrorMessage</span>
 <span class="option-type">Type: Nullable string</span>  <span class="option-type">Default:
                        null</span>

                <blockquote id="ValidationErrorMessageExample" class="option-block">Specifies the validation error message and if specified will activate date validation when the text box loses focus and when any of the API methods are called.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Initialize a MonthPicker with the ValidationErrorMessage option specified.
                    <br /> <pre>
$('.selector').MonthPicker({ValidationErrorMessage: 'Invalid Date!' });</pre>
Get or set the ValidationErrorMessage option, after init. Set to null to omit this behavior. <pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'ValidationErrorMessage');
<br />
//setter
$('.selector').MonthPicker('option', 'ValidationErrorMessage', 'Invalid Date!');
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#UseInputMaskMessageExample').toggle();">UseInputMask</span>
 <span class="option-type">Type: bool</span>  <span class="option-type">Default:
                        false</span>

                <blockquote id="UseInputMaskMessageExample" class="option-block">Directs the MonthPicker to use the Digital Bush InputMask jQuery Plugin which must be loaded to the page if this option is to be used.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Initialize a MonthPicker with the UseInputMask option specified.
                    <br /> <pre>
$('.selector').MonthPicker({UseInputMask: true });</pre>
Get or set the UseInputMask option, after init. <pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'UseInputMask');
<br />
//setter
$('.selector').MonthPicker('option', 'UseInputMask', false);
</pre>

                </blockquote>
            </div>
        </blockquote>
    </div>
    <div id="Methods">
         <h3>
                API Methods</h3>

        <blockquote>
            <p> <b>$('.selector').MonthPicker('Clear')</b>

                <br />If the Digital Bush Watermark plugin is activated. This will set the field to a blank value and show the watermark again.</p>
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
        </blockquote>
    </div>
    <div id="Events">
         <h3>
                Events</h3>

        <blockquote>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterMenuOpenExample').toggle();">OnAfterMenuOpen</span>

                <blockquote id="OnAfterMenuOpenExample" class="option-block">This event is triggered after the MonthPicker opens.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterMenuOpen: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterMenuOpen');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterMenuOpen', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterMenuCloseExample').toggle();">OnAfterMenuClose</span>

                <blockquote id="OnAfterMenuCloseExample" class="option-block">This event is triggered after the MonthPicker menu is closed.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterMenuClose: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterMenuClose');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterMenuClose', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterOnAfterNextYearExample').toggle();">OnAfterNextYear</span>

                <blockquote id="OnAfterOnAfterNextYearExample" class="option-block">This event is triggered when the MonthPicker Next Year button is clicked.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterNextYear: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterNextYear');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterNextYear', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterOnAfterNextYearsExample').toggle();">OnAfterNextYears</span>

                <blockquote id="OnAfterOnAfterNextYearsExample" class="option-block">This event is triggered when the MonthPicker Jump Ahead 5 Years button is clicked.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterNextYears: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterNextYears');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterNextYears', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterPreviousYearExample').toggle();">OnAfterPreviousYear</span>

                <blockquote id="OnAfterPreviousYearExample" class="option-block">This event is triggered when the MonthPicker Previous Year button is clicked.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterPreviousYear: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterPreviousYear');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterPreviousYear', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterPreviousYearsExample').toggle();">OnAfterPreviousYears</span>

                <blockquote id="OnAfterPreviousYearsExample" class="option-block">This event is triggered when the MonthPicker Jump Back 5 Years button is clicked.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterPreviousYears: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterPreviousYears');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterPreviousYears', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterChooseMonthExample').toggle();">OnAfterChooseMonth</span>

                <blockquote id="OnAfterChooseMonthExample" class="option-block">This event is triggered when a month button is clicked in the picker.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterChooseMonth: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterChooseMonth');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterChooseMonth', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterChooseMonthsExample').toggle();">OnAfterChooseMonths</span>

                <blockquote id="OnAfterChooseMonthsExample" class="option-block">This event is triggered when the choose months button is clicked in the picker.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterChooseMonths: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterChooseMonths');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterChooseMonths', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterChooseYearExample').toggle();">OnAfterChooseYear</span>

                <blockquote id="OnAfterChooseYearExample" class="option-block">This event is triggered when a year button is clicked in the picker.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterChooseYear: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterChooseYear');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterChooseYear', function(){});
</pre>

                </blockquote>
            </div>
            <div class="option"> <span class="option-link" onclick="$('#OnAfterChooseYearsExample').toggle();">OnAfterChooseYears</span>

                <blockquote id="OnAfterChooseYearsExample" class="option-block">This event is triggered when the choose years button is clicked in the picker.
                    <br />
                    <br /> <b>Code Example</b>

                    <br />
                    <br />Supply a callback function to handle the event as an init option.
                    <br /> <pre>
$('.selector').MonthPicker({OnAfterChooseYears: function(){} });</pre>
Get or set the callback function, after init. <pre>
//getter
var myFunction = $('.selector').MonthPicker('option', 'OnAfterChooseYears');
<br />
//setter
$('.selector').MonthPicker('option', 'OnAfterChooseYears', function(){});
</pre>

                </blockquote>
            </div>
        </blockquote>
    </div>
    <div id="Theme">
        <p>The MonthPicker plugin uses the jQuery UI CSS Framework to style its look and feel, including the colors of buttons and background textures. We recommend using the ThemeRoller tool to create and download custom themes that are easy to build and maintain.</p>
        <p>If a deeper level of customization is needed, there are widget-specific classes referenced within the MonthPicker.css stylesheet that can be modified. These classes are highlighed below.</p>
        <p> <b>.month-picker-disabled</b>

            <br />Customize the disabled look of the MonthPicker text box.</p>
        <p> <b>.month-picker-invalid-message</b>

            <br />Customize the look of validation message.</p>
        <p> <b>.month-year-input</b>

            <br />Customize the look of the MonthPicker text input box in an enabled state.</p>
    </div>
</div>
<div>&nbsp;
    <br />
    <br />
</div>
<div id="Modal">Test:
    <input id="DialogDemo" type="text" />
</div>
