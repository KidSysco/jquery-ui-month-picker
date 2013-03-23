<h1>The jQuery UI Month Picker Plugin</h1>
<p>The jQuery UI Month Picker Plugin was designed to allow users to choose only a month and year when only that input is required. Clicking on the year, allows the user to jump ahead or back 5 years at a time. Clicking anywhere on the page, except on the month picker menu itself, will cause the month picker to hide.</p>
 
-See a demo with unit tests running on jsFiddle at...
-http://jsfiddle.net/kidsysco/JeZap/ 

 <h3>Source Code Example</h3>
<p>This plugin can only be called on text boxes as follows.</p> 
<pre>
$('#TextBox1').MonthPicker({ StartYear: 2020, ShowIcon: false });
$('#TextBox2').MonthPicker().css('backgroundColor', 'lightyellow');
</pre>

<h3>Prerequisites</h3>
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

<h3>Options</h3>

<p>

<strong>Disabled</strong><br />
Type: Boolean<br />
Default: false<br />

Disables/enables the MonthPicker on initialization.
<pre>$('.selector').MonthPicker({ Disabled: true });</pre>

Get or set the disabled option, after init. 
<pre>
//getter
var disabled = $('.selector').MonthPicker('option', 'Disabled');

//setter
$('.selector').MonthPicker('option', 'Disabled', true );
</pre>

</p>
