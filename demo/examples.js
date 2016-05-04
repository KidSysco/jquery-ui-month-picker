$(document).ready(function() {
    // Default functionality.
    $('.Default').MonthPicker();

    // Hide the icon and open the menu when you
    // click on the text field.
    $('#NoIconDemo').MonthPicker({ Button: false });

    // Create jQuery UI Datepicker's default button.
    $("#PlainButton").MonthPicker({
        Button: '<button>...</button>'
    });

    // Create a button out of an image.
    // for details on handeling the disabled state see:
    // https://github.com/KidSysco/jquery-ui-month-picker#button
    $("#ImageButton").MonthPicker({
        Button: '<img class="icon" src="images/icon.gif" />'
    });

    // Creates a button out an a JQuery UI button. See:
    // http://github.com/KidSysco/jquery-ui-month-picker#button
    // for details on handeling internationalization.
    $("#JQButton").MonthPicker({
        Button: function() {
            return $("<button>Open</button>").button();
        }
    });

    // Allows 1 months from today (future months only).
    $('#FutureDateDemo').MonthPicker({ MinMonth: 1 });

    // Allows at most 1 month from today (past months only).
    $('#PastDateDemo').MonthPicker({ MaxMonth: -1 });

    // Don't allow this month and at most 18 months from today.
    // For detaild on the datatyps you can pass see:
    // http://github.com/KidSysco/jquery-ui-month-picker#minmonth
    $('#YearAndAHalfDeom').MonthPicker({
        MinMonth: 0,
        MaxMonth: '+2y -6m' // Or you could just pass 18.
    });

    // Start on the year 2023 no matter what date is selected.
    $("#OverrideStartYear").MonthPicker({ StartYear: 2023 });

    // Display an error message if the date is not valid.
    $('#GetYearDemo').MonthPicker({
        ValidationErrorMessage: 'Invalid Date!'
    });

    // Apply an input mask which mkase sure the user
    // limits the user to typing a month in the
    //fromat specified in the MonthFormat option.
    $('#DigitalBush').MonthPicker({ UseInputMask: true });
    $('#DigitalBushBoth').MonthPicker({
        UseInputMask: true,
        ValidationErrorMessage: 'Invalid Date!'
    });

    // The plugin supports the HTML 5 month type out of the box
    // no special setup required.
    $('#Html5').MonthPicker({
        ShowIcon: false,
        StartYear: 2027
    });

    // You can control the menu's positioning
    // and collision handeling by passing options to the
    // jQuery UI .position() plugin.
    $('#PositionDemo').MonthPicker({
        ShowIcon: false,
        Position: {
            collision: 'fit flip'
        }
    });

    // Create an inline menu by calling
    // .MonthPicker(); on a <div> or <span> tag.
    $("#InlineMenu").MonthPicker({
        SelectedMonth: '04/' + new Date().getFullYear(),
        OnAfterChooseMonth: function(selectedDate) {
            // Do something with selected JavaScript date.
            // console.log(selectedDate);
        }
    });

    $("#FormatSelect").change(function() {
       $("#MonthFormat").MonthPicker('option', 'MonthFormat',$(this).val());
    });

    $('#Modal').dialog({
        autoOpen: false,
        title: 'MonthPicker Dialog Test',
        modal: true
    });
    
    $('#AltMonthField').MonthPicker({
        SelectedMonth: 'Jan, 2016',
        MonthFormat: 'M, yy', // Short month name, Full year.
        AltFormat: '@', // Unix time stamp.
        AltField: '#serverValue' // Selector for hidden input.
    });

    $('#AltMonthField2').MonthPicker({
        SelectedMonth: 'Jan, 2016',
        MonthFormat: 'M, yy', // Short month name, Full year.
        AltFormat: 'yy-dd-mm', // ODBC time stamp.
        AltField: '#serverValue2' // Selector for hidden input.
    });

    $("h1").text( $("h1").text().replace('@VERSION', $.MonthPicker.VERSION) );
});
