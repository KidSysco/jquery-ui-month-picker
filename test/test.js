/******* ***************** ********/
/******* Unit Testing Code ********/
/******* ***************** ********/
/*
 * Welcome to the jQuery UI Month Picker project.
 *
 * jQuery UI and QUnit are required for testing.
 * Please download node.js, 'cd /jquery-ui-month-picker' and run 'npm install'.
 *
 * Tests can be ran from the command line using the 'grunt test' command.
 */

var _today = new Date();

// Set's the default animation speed to 1 ms to speed up
// the tests.
$.KidSysco.MonthPicker.prototype.options.Duration = 1;

function _getPickerYear(_pickerMenu) {
  return parseInt($('.month-picker-title span', _pickerMenu).text().replace(/\D/g, ''), 10);
}

QUnit.module("Installation");

/***** Test basic the installation for the pre-requisite objects and namespaces *****/

QUnit.test('Status', function (assert) {
    assert.ok(true, 'qUnit is installed.');
    assert.ok(jQuery, 'jQuery ' + $().jquery + ' is installed.');
    assert.ok(jQuery.ui, 'jQuery UI ' + jQuery.ui.version + ' is installed.');
    assert.ok(jQuery.widget, 'jQuery UI widget is installed.');
    assert.ok(jQuery.ui.button, 'jQuery UI button is installed.');
    assert.ok(jQuery.ui.datepicker, 'jQuery UI datepicker is installed.');
    assert.ok(jQuery.KidSysco, 'KidSysco namespace exists.');
    assert.ok(jQuery.KidSysco.MonthPicker, 'MonthPicker plugin function exists.');
    assert.ok(jQuery.KidSysco.MonthPicker.prototype, 'MonthPicker plugin prototype exists.');
});

QUnit.test('Optional Plugin Status', function (assert) {
    assert.ok(jQuery.mask, 'Digital Bush Input Mask Plugin is installed.');
    assert.ok($.ui.position, 'jQuery UI .position() plugin is installed.');
});

QUnit.module("Functionality");

/***** Icon Demo Tests *****/

QUnit.test('Icon Option Tests', function (assert) {
    var _picker = $('#IconDemo').MonthPicker({
        Animation: 'none',
        ShowIcon: true
    });

    assert.equal($('#MonthPicker_Button_IconDemo').length, 1, '#IconDemo initialized with icon showing.');
    _picker.MonthPicker('option', 'ShowIcon', false);
    assert.equal($('#MonthPicker_Button_IconDemo:visible').length, 0, '#IconDemo icon removed after init.');

    $('#IconDemo').MonthPicker('destroy');
    assert.ok($('#MonthPicker_IconDemo').length === 0, "#IconDemo has been destroyed.");

    _picker = $('#IconDemo').MonthPicker({
        Animation: 'none',
        ShowIcon: false
    });

    var menu = $(MonthPicker_IconDemo);

    _picker.trigger('focus');
    assert.ok(menu.css('visibility') !== 'hidden', 'The menu was opened by focusing on the input field');

    // Make pressing tab closes the menu.
    _picker.trigger($.Event( "keydown", { keyCode: $.ui.keyCode.TAB } ));
    assert.notOk(menu.is(':visible'), 'The menu was closed by pressing tab');

    assert.equal($('#MonthPicker_Button_IconDemo').length, 0, '#IconDemo initialized without an icon.');
    _picker.MonthPicker('option', 'ShowIcon', true);
    assert.equal($('#MonthPicker_Button_IconDemo').length, 1, '#IconDemo icon added after init.');

    // Make sure focusing on the field doesn't open the menu.
    _picker.trigger('focus');
    assert.notOk(menu.is(':visible'), 'The menu did not opened by focusing on the input field because the icon is now visible');
});

QUnit.test('HTML 5 & Formatting Tests', function (assert) {
    var done;
    var _picker = $('#Html5').MonthPicker({
        ShowIcon: false,
        StartYear: 2027,
        OnAfterMenuOpen: function () {
            assert.ok(_pickerMenu.is(':visible'), '#Html5 responded to a text input click event and showed the menu.');
            $('.button-1', _pickerMenu).trigger($.Event('click'));
            done();
            done = assert.async();
        },
        OnAfterMenuClose: function () {
            assert.notOk(_pickerMenu.is(':visible'), '#Html5 responded to a button click event by closing the menu.');
            assert.equal(_picker.MonthPicker('GetSelectedYear'), '2027', '#Html5 showed and selected the correct override start year of 2027.');
            assert.equal(_picker.MonthPicker('GetSelectedMonth'), '01', '#Html5 showed and selected the correct month of 01.');
            // destroy the monthpicker and re-create it so it doesnt fire anymore qunit events upon being used.
            $('#Html5').MonthPicker('destroy');
            assert.ok($('#MonthPicker_Html5').length === 0, "#Html5 has been destroyed.");
            $('#Html5').MonthPicker({
                ShowIcon: false,
                StartYear: 2027
            });
            done();
        }
    });

    var _pickerMenu = $('#MonthPicker_Html5');

    // click the the button to show the monthpicker menu
    _picker.trigger($.Event('click'));
    assert.equal(_pickerMenu.length, 1, '#Html5 month picker menu exists in the DOM.');
    done = assert.async();
});

if ($.ui.position) {
    QUnit.test('jQueryUI .position() Tests', function (assert) {
        var done;
        var _windowWidth = $(window).width();
        var _windowHeight = $('body').height();
        var _picker = $('#PositionDemo').MonthPicker({
            ShowIcon: false,
            Position: {
                collision: 'fit flip'
            },
            OnAfterMenuOpen: function () {
                var _meun = $(MonthPicker_PositionDemo);
                var _lastPointFullyVisibleX = _windowWidth - _meun.width();
                var _lastPointFullyVisibleY = _windowHeight - _pickerMenu.height();
                assert.ok(_pickerMenu.is(":visible"), '#PositionDemo responded to a text input click event and showed the menu.');
                assert.ok(_pickerMenu.position().left <= _lastPointFullyVisibleX, "#PositionDemo does not overlap the right window boundary on the X axis.");
                assert.ok(_pickerMenu.position().left > 0, "#PositionDemo does not overlap the left window boundary on the X axis.");
                assert.ok(_pickerMenu.position().top <= _lastPointFullyVisibleY, "#PositionDemo does not overlap the bottom window boundary on the Y axis.");
                assert.ok(_pickerMenu.position().top > 0, "#PositionDemo does not overlap the top window boundary on the Y axis.");
                $('.button-1', _pickerMenu).trigger($.Event('click'));
                done();
                done = assert.async();
            },
            OnAfterMenuClose: function () {
                assert.notOk(_pickerMenu.is(':visible'), '#PositionDemo responded to a button click event by closing the menu.');
                // destroy the monthpicker and re-create it so it doesnt fire anymore qunit events upon being used.
                $('#PositionDemo').MonthPicker('destroy');
                assert.ok($('#MonthPicker_PositionDemo').length === 0, "#PositionDemo has been destroyed.");
                $('#PositionDemo').MonthPicker({
                    ShowIcon: false,
                    Position: {
                        collision: 'fit flip'
                    }
                });
                done();
            }
        });

        var _pickerMenu = $('#MonthPicker_PositionDemo');

        // click the the button to show the monthpicker menu
        _picker.trigger($.Event('click'));
        assert.equal(_pickerMenu.length, 1, '#PositionDemo month picker menu exists in the DOM.');
        done = assert.async();
    });
}

QUnit.test('Override Start Year Tests', function (assert) {
    var done;
    var _picker = $('#OverrideStartYear').MonthPicker({
        ShowIcon: false,
        StartYear: 2023,
        OnAfterMenuOpen: function () {
            assert.ok(_pickerMenu.is(':visible'), '#OverrideStartYear responded to a text input click event and showed the menu.');
            $('.button-1', _pickerMenu).trigger($.Event('click'));
            done();
            done = assert.async();
        },
        OnAfterMenuClose: function () {
            assert.equal(_picker.MonthPicker('GetSelectedYear'), '2023', '#OverrideStartYear showed and selected the correct override start date of 2023.');

            $('#OverrideStartYear').MonthPicker('destroy');
            assert.ok($('#MonthPicker_OverrideStartYear').length === 0, "#OverrideStartYear has been destroyed.");
            $('#OverrideStartYear').MonthPicker({
                ShowIcon: false,
                StartYear: 2023
            });

            done();
        }
    });

    var _pickerMenu = $('#MonthPicker_OverrideStartYear');
    _picker.trigger($.Event('click'));
    done = assert.async();
});

QUnit.test('Start Year Option Tests', function (assert) {
    var done;
    var _picker = $('#StartYearDemo').MonthPicker({
        ShowIcon: false,
        OnAfterMenuOpen: function () {
            assert.ok(_pickerMenu.is(':visible'), '#StartYearDemo responded to a text input click event and showed the menu.');
            assert.equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2025, '#StartYearDemo defaulted to 2025, the year specified in the textbox.');
            _picker.MonthPicker('option', 'StartYear', 2095);
            assert.equal(_getPickerYear(_pickerMenu), 2095, '#StartYearDemo switched the year to 2095 after init.');
            $('.button-1', _pickerMenu).trigger($.Event('click'));
            assert.equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2095, '#StartYearDemo selected the correct year, 2095, upon choosing a month.');
            done();
            done = assert.async();
        },
        OnAfterMenuClose: function () {
            assert.notOk(_pickerMenu.is(':visible'), '#StartYearDemo responded to a button click event by closing the menu.');
            $('#StartYearDemo').MonthPicker('destroy');
            assert.ok($('#MonthPicker_StartYearDemo').length === 0, "#StartYearDemo has been destroyed.");
            $('#StartYearDemo').val('1/2025').MonthPicker({
                ShowIcon: false,
                OnAfterMenuOpen: function () {
                    // get the picker menu again because it was removed from the dom upon destroying StartYearDemo.
                    _pickerMenu = $('#MonthPicker_StartYearDemo');
                    assert.ok(_pickerMenu.is(':visible'), '#StartYearDemo responded to a text input click event and showed the menu.');
                    assert.equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2025, '#StartYearDemo defaulted to 2025, the year specified in the textbox.');
                    _picker.MonthPicker('Close');
                    done();
                    done = assert.async();
                },
                OnAfterMenuClose: function () {
                    assert.notOk(_pickerMenu.is(':visible'), '#StartYearDemo responded to a button click event by closing the menu.');

                    _picker.MonthPicker('destroy');
                    // get the picker menu again because it was removed from the dom upon destroying StartYearDemo.
                    assert.ok($('#MonthPicker_StartYearDemo').length === 0, "#StartYearDemo has been destroyed again.");

                    // Setup StartYearDemo so that it will run as a demo without firing off tests.
                    $('#StartYearDemo').val('1/2025').MonthPicker({
                        ShowIcon: false
                    });

                    assert.ok(_pickerMenu.length === 1, "#StartYearDemo has been re-initialized for demo purposes.");
                    done();
                }
            });

            assert.ok(_pickerMenu.length === 1, "#StartYearDemo has been re-initialized for more tests.");

            done();
            done = assert.async();

            _picker.MonthPicker('Open');
        }
    });

    var _pickerMenu = $('#MonthPicker_StartYearDemo');
    assert.equal(_pickerMenu.length, 1, '#StartYearDemo month picker menu exists in the DOM.');
    done = assert.async();
    _picker.MonthPicker('Open');
});

QUnit.test('API Tests', function (assert) {
    var _picker = $('#GetYearDemo').MonthPicker({
        ValidationErrorMessage: 'Invalid Date!'
    });

    assert.ok($('#MonthPicker_GetYearDemo').length === 1, '#GetYearDemo has been initialized.');
    assert.equal(jQuery.type(_picker.MonthPicker('GetSelectedDate')), 'date', '#GetYearDemo GetSelectedDate() API call returned a date object.');
    assert.equal(_picker.MonthPicker('GetSelectedDate').getFullYear(), 2012, '#GetYearDemo GetSelectedDate() API call returned a date object containing the correct year, 2012.');
    assert.equal(_picker.MonthPicker('GetSelectedDate').getMonth(), 1, '#GetYearDemo GetSelectedDate() API call returned a date object containing the correct zero-based array index for February, 1.');
    assert.equal(_picker.MonthPicker('GetSelectedMonth'), 2, '#GetYearDemo GetSelectedMonth() API call returned the correct month, 2.');
    assert.equal(_picker.MonthPicker('GetSelectedYear'), 2012, '#GetYearDemo GetSelectedYear() API call returned the correct year, 2012.');
    assert.equal(_picker.MonthPicker('GetSelectedMonthYear'), '2/2012', '#GetYearDemo GetSelectedMonthYear() API call returned the correct month/year, 2/2012.');

    _picker.val('aa');
    assert.equal(_picker.MonthPicker('GetSelectedMonthYear'), null, '#GetYearDemo GetSelectedMonthYear() API call detected a bad date and returned null.');
    assert.ok(isNaN(_picker.MonthPicker('GetSelectedMonth')), '#GetYearDemo GetSelectedMonth() API call detected a bad date and returned NaN.');
    assert.ok(isNaN(_picker.MonthPicker('GetSelectedYear')), '#GetYearDemo GetSelectedYear() API call detected a bad date and returned NaN.');
    assert.equal(_picker.MonthPicker('GetSelectedDate'), null, '#GetYearDemo GetSelectedDate() API call detected a bad date and returned a null.');
    assert.equal($('#MonthPicker_Validation_GetYearDemo').css('display'), 'inline', '#GetYearDemo showed a validation message about a bad date.');

    _picker.MonthPicker('Clear').val('02/2012');
    assert.equal($('#MonthPicker_Validation_GetYearDemo').css('display'), 'none', '#GetYearDemo Clear() API call reset the validation warning.');

    _picker = $('#EnableDisableDemo').MonthPicker({
        Disabled: true
    });

    assert.equal(_picker.prop('disabled'), true, '#EnableDisableDemo was initialized into a disabled state.');
    _picker.MonthPicker('option', 'Disabled', false);
    assert.equal(_picker.prop('disabled'), false, '#EnableDisableDemo was enabled by changing the Disabled option.');
    _picker.MonthPicker('Disable');
    assert.equal(_picker.prop('disabled'), true, '#EnableDisableDemo was disabled using the Disable() API call.');

    assert.ok(_picker.is('.month-picker-disabled'), 'The input field has the month-picker-disabled class');

    _picker.MonthPicker('Enable');
    assert.equal(_picker.prop('disabled'), false, '#EnableDisableDemo was enabled using the Disable() API call.');

    assert.notOk(_picker.is('.month-picker-disabled'), 'The month-picker-disabled class was removed from the input field');
});

QUnit.test('Digital Bush Tests', function (assert) {
    var _picker = $('#DigitalBush').MonthPicker({
        UseInputMask: true
    });
    _picker.focus();

    $('#DigitalBushBoth').MonthPicker({
        UseInputMask: true,
        ValidationErrorMessage: 'Invalid Date!'
    });

    assert.equal($('#DigitalBushBoth').MonthPicker('GetSelectedMonthYear'), null, '#DigitalBushBoth GetSelectedMonthYear API call returned null as expected.');
    assert.equal($('#MonthPicker_Validation_DigitalBushBoth').css('display'), 'inline', '#DigitalBushBoth showed a validation message about a bad date.');

    $('#DigitalBushBoth').MonthPicker('Clear');
    assert.ok($('#MonthPicker_Validation_DigitalBushBoth').is(':hidden'), '#DigitalBushBoth cleared the validation error message using the Clear() API call.');
});

QUnit.test('Only one open menu', function (assert) {
    $([FirstField, SecondField]).MonthPicker({
        Animation: 'none' // Disable animation to make sure opening and closing the menu is synchronous.
    });

    $(FirstField).MonthPicker('Open');
    $(SecondField).MonthPicker('Open');

    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.');
});

// http://stackoverflow.com/a/20460414/1774484
function zeroFill(n) {
    return ('00' + n).slice(-2);
}

QUnit.test('Keydown handling', function (assert) {
    var field = $(EventsField).val('').MonthPicker({
		Animation: 'none' // Disable animation to make sure opening and closing the menu is synchronous.
	});

	field.MonthPicker('Open');

	field.trigger($.Event('keydown', {keyCode: $.ui.keyCode.ENTER}));

	assert.equal(field.val(), zeroFill(_today.getMonth() + 1) + '/' + _today.getFullYear(), 'Pressing enter selected todays month');

	var menu = $(MonthPicker_EventsField);
	assert.ok(!menu.is(':visible'), 'Pressing enter closed the menu');

	var mayOfNextYear = '05/' + (_today.getFullYear()+1);
	field.MonthPicker('Open');
	field.val( mayOfNextYear );

	field.trigger($.Event('keydown', {keyCode: $.ui.keyCode.ENTER}));
	assert.ok(!menu.is(':visible'), 'Pressing enter closed the menu');
	assert.equal(field.val(), mayOfNextYear, "Pressing enter didn't override the month the user entered");

	field.MonthPicker('Open');
	field.trigger($.Event('keydown', {keyCode: $.ui.keyCode.ESCAPE}));
	assert.ok(!menu.is(':visible'), 'Pressing escape closed the menu');

	field.MonthPicker('Destroy');
});

QUnit.test('MonthFormat Option Tests', function (assert) {
    // Create a month picker with a funky month format.
    $(FormatField).val('10--->  {2010}').MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        MonthFormat: 'm--->  {yy}'
    });

    // Make sure the plugin parsed the month correctly (the date value is undefined).
    var selectedDate = $(FormatField).MonthPicker('GetSelectedDate');
    assert.equal(selectedDate.getFullYear(), 2010, 'The selected year is 2010');
    assert.equal(selectedDate.getMonth() + 1, 10, 'The selected month is October');

    // Change the format after init to sonething more appropriate.
    $(FormatField).MonthPicker('option', 'MonthFormat', 'MM yy');
    assert.equal($(FormatField).val(), 'October 2010', 'the text was updated to reflect the new format');

    // Make sure the plugin parsed the month according to the new format.
    selectedDate = $(FormatField).MonthPicker('GetSelectedDate');
    assert.equal(selectedDate.getFullYear(), 2010, 'The selected year is still 2010');
    assert.equal(selectedDate.getMonth() + 1, 10, 'The selected month is still October');

    $(FormatField).val('January 2012');
    selectedDate = $(FormatField).MonthPicker('GetSelectedDate');
    assert.equal(selectedDate.getFullYear(), 2012, 'The selected year changed to 2012');
    assert.equal(selectedDate.getMonth() + 1, 1, 'The selected month changed to January');

    // Open the menu and choose April 2012.
    $(FormatField).MonthPicker('Open');
    $('.button-4', MonthPicker_FormatField).trigger('click');

    // Make sure set the right text in the input field.
    assert.equal($(FormatField).val(), 'April 2012', 'The text field has the value April 2012');
});

QUnit.test('Inline menu', function(assert) {
	var field = $(InlineMenuDiv).MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
	});

	var menu = $(MonthPicker_InlineMenuDiv);
    var nextYearButton = menu.find('.month-picker-next .ui-button');
    var previousYearButton = menu.find('.month-picker-previous .ui-button');

    assert.equal(nextYearButton.css('float'), 'right', 'The next year button has the expected alignment for RTL documents');
    assert.equal(previousYearButton.css('float'), 'left', 'The previous year button has the expected alignment for RTL documents');

	assert.ok(menu.width() <= 200, 'The menu is visible and has the expected width');

	$(document.body).trigger('click');

	assert.ok(menu.is(':visible'), 'The menu is still visible after clicking outside the menu');

	menu.find('.button-1').trigger('click');

	assert.ok(menu.is(':visible'), 'The menu is still visible after choosing a month');

	assert.notOk($("#MonthPicker_Button_InlineMenuDiv").length, 'The default button was not created');

	field.MonthPicker('destroy');
});

QUnit.test('SelectedMonth option', function(assert) {
	var field = $(InlineMenuDiv).MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

		SelectedMonth: 0
	});

	var menu = $(MonthPicker_InlineMenuDiv);
	var date = field.MonthPicker('GetSelectedDate');
	assert.equal( date.getMonth(), _today.getMonth(), 'The correct month was selected');
	assert.equal( date.getFullYear(), _today.getFullYear(), 'The correct year was selected');

	assert.ok( menu.find('.button-' + (_today.getMonth()+1)).is('.ui-state-active'), 'The correct button is highlighted');

	field.MonthPicker('option', 'SelectedMonth', '01/2015');

	var date = field.MonthPicker('GetSelectedDate');
	assert.ok( menu.find('.button-1').is('.ui-state-active'), 'January is selected after changing the SelectedMonth');

	field.MonthPicker('Destroy');
});

// Makes sure that all events are triggered as expected.
// Perhaps we should consider removing some of these events.
QUnit.test('Events and context', function (assert) { // A.k.a duplicate code test.
	// Good luck figuring out which callback is causing the
	// problem if this test fails.
	assert.expect(31);

	var field = $(EventsField).MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
		ShowOn: 'both'
	});

	var menu = $(MonthPicker_EventsField);
	var OnBeforeMenuOpenTriggred = false;
	// This event should be triggered twice, the first time it is prevented
	// and the sceond time it goes through.
	field.MonthPicker('option', 'OnBeforeMenuOpen', function(event) {
		OnBeforeMenuOpenTriggred = true;
		assert.equal( this, EventsField, 'OnBeforeMenuOpen was called in the right context' );

		// Prevent opening if the event was triggered on the input field.
		if (event.target === EventsField) {
			event.preventDefault();
		}
	});

	// Make sure the open event triggered by clicking the field was prevented.
	field.trigger('click');
	assert.ok(OnBeforeMenuOpenTriggred, 'The OnBeforeMenuOpen event was triggered');
	assert.notOk( menu.is(':visible'), 'The open event was prevented when clicking on the field' );

	var OnAfterMenuOpenTriggred = false;
	field.MonthPicker('option', 'OnAfterMenuOpen', function() {
		OnAfterMenuOpenTriggred = true;
		assert.equal( this, EventsField, 'OnAfterMenuOpen was called in the right context' );
	});

	// Make sure calling the open method doesn't get prevented.
	field.MonthPicker('Open');
	assert.ok(OnAfterMenuOpenTriggred, 'The OnAfterMenuOpen event was triggered');
	assert.ok( menu.is(':visible'), 'The menu was opend by calling the Open method' );

	// Start duplicate code
	var OnAfterNextYearTriggered = false;
	field.MonthPicker('option', 'OnAfterNextYear', function() {
		OnAfterNextYearTriggered = true;

		assert.equal( this, EventsField, 'OnAfterNextYear was called in the right context' );
	});

	var nextYearButton = menu.find('.month-picker-next>a');

    nextYearButton.trigger('click');
    assert.ok(OnAfterNextYearTriggered, 'Clicking the next button triggered OnAfterNextYear');

    var OnAfterPreviousYearTriggerd = false;
	field.MonthPicker('option', 'OnAfterPreviousYear', function() {
		OnAfterPreviousYearTriggerd = true;

		assert.equal( this, EventsField, 'OnAfterPreviousYear was called in the right context' );
	});

	var previousYearButton = menu.find('.month-picker-previous>a');

	previousYearButton.trigger('click');
	assert.ok(OnAfterPreviousYearTriggerd, 'Clciking rhe previous button triggered OnAfterPreviousYear');

	var OnAfterChooseYearsTriggerd = false;
	field.MonthPicker('option', 'OnAfterChooseYears', function() {
		OnAfterChooseYearsTriggerd = true;
		assert.equal( this, EventsField, 'OnAfterChooseYears was called in the right context' );
	});

	var showYearsButton = menu.find('.month-picker-title a');
	showYearsButton.trigger('click');

	assert.ok(OnAfterChooseYearsTriggerd, 'Clicking the show years button triggered OnAfterChooseYears');

	var OnAfterNextYearsTriggered = false;
	field.MonthPicker('option', 'OnAfterNextYears', function() {
		OnAfterNextYearsTriggered = true;
		assert.equal( this, EventsField, 'OnAfterNextYears was called in the right context' );
	});

	nextYearButton.trigger('click');
	assert.ok(OnAfterChooseYearsTriggerd, 'Clicking the next button triggered the OnAfterNextYears event');

	var OnAfterPreviousYearsTriggered = false;
	field.MonthPicker('option', 'OnAfterPreviousYears', function() {
		OnAfterPreviousYearsTriggered = true;
		assert.equal( this, EventsField, 'OnAfterPreviousYears was called in the right context' );
	});

	previousYearButton.trigger('click');
	assert.ok(OnAfterPreviousYearsTriggered, 'Clicking the prev button triggered the OnAfterPreviousYears event');

	var OnAfterChooseYearTriggered = false;
	field.MonthPicker('option', 'OnAfterChooseYear', function() {
		OnAfterChooseYearTriggered = true;
		assert.equal( this, EventsField, 'OnAfterChooseYear was called in the right context' );
	});

	menu.find('.button-1').trigger('click');
	assert.ok(OnAfterChooseYearTriggered, 'Clicking a year triggered OnAfterChooseYear');

	var OnAfterChooseMonthTriggered = false;
	field.MonthPicker('option', 'OnAfterChooseMonth', function(date) {
		assert.ok(date instanceof Date, 'A date value was passed to OnAfterChooseMonth as the first argument');
		OnAfterChooseMonthTriggered = true;
		assert.equal( this, EventsField, 'OnAfterChooseMonth was called in the right context' );
	});
	// End duplicate code

	// This event should be triggered twice, the first time it is prevented
	// and the sceond time it goes through.
	field.MonthPicker('option', 'OnBeforeMenuClose', function(event) {
		assert.equal( this, EventsField, 'OnBeforeMenuClose was called in the right context' );

		var target = event.target, btn1 = menu.find('.button-1')[0];
		if (event.target === btn1) {
			event.preventDefault();
		}
	});

	// Click January which should triger the OnAfterChooseMonth event
	// but the OnBeforeMenuClose will be prevented.
	menu.find('.button-1').trigger('click');
	assert.ok(OnAfterChooseMonthTriggered, 'Clicking January triggered OnAfterChooseMonth');
	assert.ok( menu.is(':visible'), 'The close event was canceled' );
	field.MonthPicker('option', 'OnAfterChooseMonth', $.noop);

	var OnAfterMenuCloseTriggered = false;
	field.MonthPicker('option', 'OnAfterMenuClose', function(event) {
		OnAfterMenuCloseTriggered = true;
		assert.equal( this, EventsField, 'OnAfterMenuClose was called in the right context' );
	});

	// Clicking May should not be prevented.
	menu.find('.button-5').trigger('click');
	assert.ok( !menu.is(':visible'), 'Clicking May closed the menu' );
	assert.ok(OnAfterMenuCloseTriggered, 'Clicking May triggered the OnAfterMenuClose event');


	field.MonthPicker('option', 'OnAfterSetDisabled', function(disabled) {
		assert.equal( this, EventsField, 'OnAfterSetDisabled was called in the right context' );

		assert.ok(disabled, 'Disabling the field passed true as the first argument to the OnAfterSetDisabled callback');
	});

	field.MonthPicker('Disable');

	field.MonthPicker('option', 'OnAfterSetDisabled', function(disabled) {
		assert.notOk(disabled, 'Enabling the field passed false as the first argument to the OnAfterSetDisabled callback');
	});

	field.MonthPicker('Enable');

	field.MonthPicker('destroy');
});

QUnit.test('AltField and AltFormat tests', function( assert ) {
	var hiddenField = $('<input type="hidden" name="AltField" />');

    var field = $(MainAltField).MonthPicker({
	   SelectedMonth: '05/2010',
	   Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
	   AltField: hiddenField,
       ValidationErrorMessage: 'Invalid Date!',
	   AltFormat: 'yy-mm'
    });

    assert.equal(hiddenField.val(), '2010-05', "The secondary field has the main field's value in the alt format");

    field.MonthPicker('Open');

	var menu = $(MonthPicker_MainAltField);
	menu.find('.button-1').trigger('click');

	assert.equal( field.val(), '01/2010', 'The main field was populated');
	assert.equal( hiddenField.val(), '2010-01', 'The secondary field was populated with a different format');

	field.MonthPicker('option', 'AltFormat', null);

	assert.equal( hiddenField.val(), '01/2010', 'Clearing AltFormat set the format to the MonthFormat');

	field.MonthPicker('option', 'AltField', '#SecondaryAltField');

	assert.equal( $(SecondaryAltField).val(), '01/2010', 'Changing the altField after init assigned the current value');

	field.val('11/2015').trigger('change');

	assert.equal( $(SecondaryAltField).val(), '11/2015', 'Triggering a change event on the main field updated the secondary field');

    field.MonthPicker('Clear');

    assert.equal(field.val(), '', "The main field was cleared.");

    assert.equal($(SecondaryAltField).val(), '', "The secondary field was cleared.");

    field.MonthPicker('option', 'SelectedMonth', '06/2016');

    assert.equal(field.val(), '06/2016', 'The main field was populated correctly using the SelectedMonth option.');
    assert.equal($(SecondaryAltField).val(), '06/2016', "The secondary field was populated correctly using the SelectedMonth option.");

    field.MonthPicker('option', 'SelectedMonth', null);

    assert.equal(field.val(), '', 'The main field was cleared by passing null to the SelectedMonth option.');
    assert.equal($(SecondaryAltField).val(), '', "The secondary field was cleared by passing null to the SelectedMonth option..");

    var selectedVal = field.MonthPicker('Validate');

    assert.equal($('#MonthPicker_Validation_MainAltField').css('display'), 'inline', 'A Validate API call showed a validation message about a bad date on #MainAltField.');

    assert.equal(selectedVal, null, 'Validate API call returned null when there was no date selected as expected.');

    assert.equal(field.MonthPicker('GetSelectedMonthYear'), null, 'GetSelectedMonthYear API call returned null when there was no date selected as expected.');

    assert.equal($('#MonthPicker_Validation_MainAltField').css('display'), 'inline', '#MainAltField showed a validation message about a bad date.');

    field.MonthPicker('option', 'SelectedMonth', '06/2016');

    assert.ok($('#MonthPicker_Validation_MainAltField').is(':hidden'), '#MainAltField cleared the validation error message by setting the SelectedMonth option.');

});

QUnit.test('Right to left', function (assert) {
    var field = $(RTLField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
        Position: {collision: 'none'}, // Ensure the menu opens to the right.
        IsRTL: true,
        i18n: {
            year: 'שנת',
            buttonText: 'פתח תפריט',
            prevYear: "שנה קודמת",
            nextYear: "שנה הבאה",
            next12Years: 'עבור 12 שנים קדימה',
            prev12Years: 'עבור 12 שנים אחורה',
            nextLabel: "הבא",
            prevLabel: "הקודם",
            jumpYears: "בכר שנה",
            backTo: "חזור ל",
            months: ["ינו'", "פבר'", "מרץ", "אפר'", "מאי", "יוני", "יולי", "אוג'", "ספט'", "אוק'", "נוב'", "דצמ'"]
        }
    });

    field.MonthPicker('Open');

    var menu = $(MonthPicker_RTLField);

    var nextYearButton = menu.find('.month-picker-next .ui-button');
    var previousYearButton = menu.find('.month-picker-previous .ui-button');

    // Make sure the buttons are pointing in the right (opposite) direction.
    assert.ok(previousYearButton.find('span.ui-icon-circle-triangle-e').length, 'Previous button is pointed east');
    assert.ok(nextYearButton.find('span.ui-icon-circle-triangle-w').length, 'Next button is pointed west');

    // Make sure the menu opens to the right of the field.
    var opendToTheRight = (field.position().left - menu.position().left) > 5;
    assert.ok(opendToTheRight, 'The menu opened to the right of the field');

    assert.equal(nextYearButton.css('float'), 'left', 'The next year button has the expected alignment for RTL documents');
    assert.equal(previousYearButton.css('float'), 'right', 'The previous year button has the expected alignment for RTL documents');

    field.MonthPicker('Close');
});

QUnit.test('Toggle method', function (assert) {
	var field = $(ToggleField).MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
	});

	field.MonthPicker('Toggle');

    var menu = $(MonthPicker_ToggleField);

	assert.ok(menu.is(':visible'), 'The menu was opened');

	field.MonthPicker('Toggle');

	assert.ok(!menu.is(':visible'), 'The menu was closed');

	field.MonthPicker('Toggle');

	assert.ok(menu.is(':visible'), 'The menu was again');

	field.MonthPicker('Close');
});

QUnit.module("Button option");

QUnit.test('Plain HTML Button test', function (assert) {
    // Creats a month picker with a button similar to Datepicker's default button.
    $(PlainButtonField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
        Button: '<button class="PlainButton" id="PlainButton">...</button>'
    });

    // Make the button was properly construted and is visible in the expected location.
    assert.ok($(PlainButton).is(':visible'), 'The plain button is present in the DOM and is visible.');
    assert.equal($(PlainButton).prev()[0], PlainButtonField, 'The button was placed near the associated input field');
    assert.equal(PlainButton.tagName, 'BUTTON', 'PlainButton is a button tag');
    assert.equal($(PlainButton).text(), '...', 'The button has the correct label');

    // Click the button and make sure the menu opens.
    $(PlainButton).trigger('click');
    assert.ok($(MonthPicker_PlainButtonField).is(':visible'), 'Clicking the plain button opened the correct menu.');
    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.');

    // Disable the field (which implicitly closes the menu)
    // and make sure the button is also disabled.
    $(PlainButtonField).MonthPicker('Disable');

    assert.ok($(PlainButtonField).is(':disabled'), 'The input field was disabled.');
    assert.ok($(PlainButton).is(':disabled'), 'The button was disabled.');
    assert.ok($(MonthPicker_PlainButtonField).is(':hidden'), 'The menu was closed.');
    assert.equal($('.PlainButton').length, 1, "There's only one plain button in the DOM.");

    // Make sure clicking the button doesn't open the menu.
    $(PlainButton).trigger('click');
    assert.ok($(MonthPicker_PlainButtonField).is(':hidden'), "Clicking the button didn't open the menu.");

    $(PlainButtonField).MonthPicker({
	    Button: '<input id="InputBtn" type="button" value="Click me" />'
	});

	assert.ok($(InputBtn).is(':disabled'), 'The new button is disabled');
});

QUnit.test('Img tag tests', function (assert) {
    // Creats a month picker with an image as a button.
    // The image should change according to the Disabled state.
    $(ImgButtonField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        Button: function (options) {
            var src = 'calendar' + (options.Disabled ? '-disabled' : '') + '.gif';
            return '<img class="ImgButton" id="ImgButton" src="' + src + '" />';
        }
    });

    // Make the image was properly construted and is visible in the expected location.
    // NOTE: We don't check that the image is visible because it isn't visible
    // until it was loaded.
    assert.equal($(ImgButton).prev()[0], ImgButtonField, 'The image button was placed near the associated input field.');
    assert.equal($(ImgButton).attr('src'), 'calendar.gif', 'The button has the enabled image.');

    // Click the image and make sure the menu opens.
    $(ImgButton).trigger('click');
    assert.ok($(MonthPicker_ImgButtonField).is(":visible"), 'Clicking the plain button opened the correct menu.');
    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.');

    // Disable the field (which implicitly closes the menu)
    // and make sure the button is also disabled.
    $(ImgButtonField).MonthPicker('Disable');

	assert.notStrictEqual($('.ImgButton').prop('disabled'), true, "The plugin didn't try to disable the img button");
    assert.ok($(ImgButtonField).is(':disabled'), 'The input field was disabled.');
    assert.ok($(MonthPicker_ImgButtonField).is(':hidden'), 'The menu was closed.');

    assert.equal($(ImgButton).attr('src'), 'calendar-disabled.gif', 'The button has the disabled image.');
    assert.equal($('.ImgButton').length, 1, "There's only one image button in the DOM.");

    // Make sure clicking the button doesn't open the menu.
    $(ImgButton).trigger('click');
    assert.ok($(MonthPicker_ImgButtonField).is(':hidden'), "Clicking the button didn't open the menu.");

    $(ImgButtonField).MonthPicker('Destroy');

    assert.equal($('#MonthPicker_ExistingButtonField').length, 0, 'The meun was removed from the DOM');
    assert.equal($('.ImgButton').length, 0, 'The button was removed from the DOM');
});

QUnit.test('Existing element tests', function (assert) {
    // Creats a month picker with an existing external element as a button.
    $(ExistingButtonField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        Button: function (options) {
            var enabledButton = $(this).next().hide();
            var disabledButton = $(enabledButton).next().hide();

            return options.Disabled ? disabledButton.show() : enabledButton.show();
        }
    });

    // Make sure only the enabled element is visible.
    assert.ok($(ExistingButton).is(':visible'), 'The enabled element is visible.');
    assert.ok($(DisabledExistingButton).is(':hidden'), 'The disabled element is hidden.');

    // Click the element and make sure the menu opens.
    $(ExistingButton).trigger('click');
    assert.ok($(MonthPicker_ExistingButtonField).is(":visible"), 'Clicking the plain button opened the correct menu.');
    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.');

    // Disable the field (which implicitly closes the menu)
    // and make sure the button is also disabled.
    $(ExistingButtonField).MonthPicker('Disable');
    assert.ok($(ExistingButtonField).is(':disabled'), 'The input field was disabled.');
    assert.ok($(ExistingButton).is(':hidden'), 'The enabled element is hidden.');
    assert.ok($(DisabledExistingButton).is(':visible'), 'The disabled element is visible.');

    assert.ok($(MonthPicker_ExistingButtonField).is(':hidden'), 'The menu was closed.');

    // Make sure clicking the disabled element doesn't open the menu.
    $(DisabledExistingButton).trigger('click');
    assert.ok($(MonthPicker_ExistingButtonField).is(':hidden'), "Clicking the disabled element didn't open the menu.");

    // Re-enable the menu and make sure it opens when you click on the fit
    $(ExistingButtonField).MonthPicker('Enable');

    $(ExistingButton).trigger('click');
    assert.ok($(MonthPicker_ExistingButtonField).is(':visible'), "Clicking the enabled element after re-enabling opend the menu");

    // Close the menu to make sure that clicking the button the click event.
    // In case it wasen't removed triggering a click should throw an error.
    $(ExistingButtonField).MonthPicker('Close');

    // Make sure we don't remove existing elements when the plugin is destroyed.
    $(ExistingButtonField).MonthPicker('destroy');

    assert.equal($("#MonthPicker_ExistingButtonField").length, 0, 'The meun was removed from the DOM');
    assert.ok(ExistingButton, 'The existing button was not removed from the DOM');

    // Make sure that clicking the existing element after destroying
    // the plugin doesn't thorw an error.
    $(ExistingButton).trigger('click');

});

QUnit.test('Change selector after init', function (assert) {
    // In this test we are going to change the Button option to a jQuery selector
    // aftet the plugin was initialized.
    $(SelectorButtonField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        Button: '#SelectorButton'
    });

    // Click the element and make sure the menu opens.
    $(SelectorButton).trigger('click');
    assert.ok($(MonthPicker_SelectorButtonField).is(":visible"), 'Clicking the button opened the correct menu.');
    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.');

    // Close the menu and change the button after initialization.
    $(SelectorButtonField).MonthPicker('Close');
    $(SelectorButtonField).MonthPicker('option', 'Button', '#OtherSelectorButton');

    // Make sure the buttons remain untouched.
    assert.ok($(SelectorButton).is(':visible'), 'The enabled element was not touched.');

    // Make sure clicking the old button doesn't open the menu (the event listeners were removed).
    $(SelectorButton).trigger('click');
    assert.ok($(MonthPicker_SelectorButtonField).is(":hidden"), "Clicking the old button didn't open the menu");

    // Make sure clicking the new button opens the menu.
    $(OtherSelectorButton).trigger('click');
    assert.ok($(MonthPicker_SelectorButtonField).is(":visible"), 'Clicking the other button opened the correct menu.');

    // Close the menu to make sure that clicking the button the click event.
    // In case it wasen't removed triggering a click should throw an error.
    $(SelectorButtonField).MonthPicker('Close');

    // Destroy the plugin and make sure the event listeners were removed.
    $(SelectorButtonField).MonthPicker('destroy');

    assert.equal($("#MonthPicker_SelectorButtonField").length, 0, 'The month picker menu was removed.');
    $(OtherSelectorButton).trigger('click');
});

QUnit.test('Disable button', function (assert) {
    // Create a month picker and make sure that clicking the input field opens the menu.
    var field = $(NoButtonField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        Button: false
    });

    assert.equal($('#MonthPicker_Button_NoButtonField').length, 0, "The plugin didn't create a button");

    var menu = $(MonthPicker_NoButtonField);

    // Make sure focusing on the field opens the menu.
    field.trigger('focus');
    assert.ok(menu.css('visibility') !== 'hidden', 'The menu was opened by focusing on the input field');

    // Make pressing tab closes the menu.
    field.trigger($.Event( "keydown", { keyCode: $.ui.keyCode.TAB } ));
    assert.notOk(menu.is(':visible'), 'The menu was closed by pressing tab');

    // Make sure that clicking the input field opens the menu.
    $(NoButtonField).trigger('click');
    assert.ok(menu.is(':visible'), 'Clicking the input field opened the correct menu.');

    // Don't leave the menu open (not really necessary).
    $(NoButtonField).MonthPicker('Disable');

    // Make sure clicking the input field when it's disabled doesn't open the menu.
    $(NoButtonField).trigger('click');
    assert.ok(menu.is(':hidden'), 'Clicking the input field did not open the menu.');

    // Don't leave the menu open (not really necessary).
    $(NoButtonField).MonthPicker('Enable');

    // Fails the test if the menu was closed after clicking the input field again.
    $(NoButtonField).MonthPicker({
        OnBeforeMenuClose: function () {
            assert.notOk(true, "The menu shouldn't closed after clicking the input field again.");
        }
    });

    // Make sure that clicking the input field still opens the menu.
    $(NoButtonField).trigger('click');
    assert.ok(menu.is(':visible'), 'Clicking the input field still openes the correct menu.');

    $(NoButtonField).trigger('click');

    // Don't leave the menu open (not really necessary).
    $(NoButtonField).MonthPicker('ClearAllCallbacks');
    $(NoButtonField).MonthPicker('Close');
});

QUnit.test('ShowOn both', function (assert) {
	var field = $(ShowOnBothField).MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
		Button: '<button id="ShowOnBtn">...</button>',
		ShowOn: 'both'
	});

	field.trigger('click');

	var menu = $(MonthPicker_ShowOnBothField);

	assert.ok(menu.is(':visible'), 'The menu was opened by clicking on the input field');

	field.MonthPicker('Close');

	assert.ok(!menu.is(':visible'), 'The menu was closed');

	$(ShowOnBtn).trigger('click');
	assert.ok(menu.is(':visible'), 'The menu was opened by clicking on the button');

	field.MonthPicker('Close');
    assert.notOk(menu.is(':visible'), 'The menu was closed');

    // Make sure focusing on the field opens the menu.
    field.trigger('focus');
    assert.ok(menu.is(':visible'), 'The menu was opened by focusing on the input field');

    // Make pressing tab closes the menu.
    field.trigger($.Event( "keydown", { keyCode: $.ui.keyCode.TAB } ));
    assert.notOk(menu.is(':visible'), 'The menu was closed by pressing tab');
});

QUnit.module("i18n");

QUnit.test('button', function (assert) {
    assert.expect(2);

    $("<input />").MonthPicker({
        Button: function(options) {
            assert.ok(options.i18n.buttonText, 'The button callback received the buttonText i18n property');
            assert.ok(options.i18n.nextYear, 'The button callback received the nextYear i18n property');
        }
    }).MonthPicker('destroy');
});

QUnit.test('empty text translation', function (assert) {
  assert.expect(1);

  var field = $("<input id='i18nField' />").MonthPicker({
    i18n: { year: '' }
  });

  field.MonthPicker('Open');

  var menu = $(MonthPicker_i18nField);

  assert.equal(menu.find('.month-picker-title').text(), new Date().getFullYear(), 'We are NOT using the default text when passing in an empty string');

  field.MonthPicker('destroy');
});

QUnit.module("Min/MaxMonth");

QUnit.test('Month buttons are disabled', function (assert) {
	var field = $(RistrictMonthField).val('12/2015').MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

		MinMonth: '10/2015'
	});

	field.MonthPicker('Open');

	var menu = $(MonthPicker_RistrictMonthField);
	var previousYearButton = menu.find('.month-picker-previous>.ui-button');
	var nextYearButton = menu.find('.month-picker-next>.ui-button');

	// Try to click the disabled buttons.
	var buttons = menu.find('.month-picker-month-table .ui-button');
    $(buttons.slice(0, 8)).trigger('click');

	assert.ok(previousYearButton.is('.ui-button-disabled'), 'The previous year button is disabled');

	// Make sure that the date didn't change as a
	// result of clicking the disabled button.
	var selectedMonth = field.MonthPicker('GetSelectedDate');
	assert.equal( selectedMonth.getFullYear(), 2015, 'The selected year is still 2015');
	assert.equal( selectedMonth.getMonth() + 1, 12, 'The selected month is still December');
	assert.equal( field.val(), '12/2015', 'The input field still has the value 12/2015' );

	// Make sure we can still go to the next year.
	nextYearButton.trigger('click');
	var pickerYear = _getPickerYear(menu);
	assert.equal(pickerYear, 2016, 'Clicking next year changed the year to 2016');

	// Make none of the buttons are disabled.
	assert.ok( !menu.find('button').is('.ui-button-disabled'), 'None of the buttons are disabled');

	// Make sure clicking the first button selected January 2016.
	menu.find('.button-1').trigger('click');
	var selectedMonth = field.MonthPicker('GetSelectedDate');
	assert.equal( selectedMonth.getFullYear(), 2016, 'The selected year is still 2016');
	assert.equal( selectedMonth.getMonth() + 1, 1, 'The selected month is still January');
	assert.equal( field.val(), '01/2016', 'The input field has the value 01/2016' );

	// Make sure we can only go back to 2015 a.k.a the minimum year.
	previousYearButton.trigger('click');
	previousYearButton.trigger('click');

	var pickerYear = _getPickerYear(menu);
	assert.equal(pickerYear, 2015, 'clicking previous year tweice keept the year at 2015');

	// Make sure that month buttons before October (the minimum month)
    // are still disabled after navigating back to 2015
    // by clicking the buttons and checking that the
    // selected date didn't change.
    $(buttons.slice(0, 8)).trigger('click');

	var selectedMonth = field.MonthPicker('GetSelectedDate');
	assert.equal( selectedMonth.getFullYear(), 2016, "Clciking the buttons didn't change the selected year");
	assert.equal( selectedMonth.getMonth() + 1, 1, "Clciking the buttons didn't change the selected month");
	assert.equal( field.val(), '01/2016', "Clciking the buttons didn't change the fields value" );

    // Make sure the buttons after October (the minumum month) are enabled.
    var buttonsDisabled = $( buttons.slice(9) ).is('.ui-button-disabled');
    assert.notOk(buttonsDisabled, 'All buttons after the minumum month are enabled');

	// Make sure clicking October (the minumum month) works as expected.
	$(buttons[9]).trigger('click');

	var selectedMonth = field.MonthPicker('GetSelectedDate');
	assert.equal( selectedMonth.getFullYear(), 2015, 'Clciking the minimum month chose the correct year');
	assert.equal( selectedMonth.getMonth() + 1, 10, 'Clciking the minimum month chose the correct month');
	assert.equal( field.val(), '10/2015', 'Clciking the minimum month set the field value to 10/2015' );

    // Destroy the plugin so we can use the field over again
    // in another Min/MaxMonth test.
	field.MonthPicker('destroy');
});

QUnit.test('Year buttons are disabled', function (assert) {
    var field = $(RistrictMonthField).val('02/2015').MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        MaxMonth: '10/2015'
    });

    field.MonthPicker('Open');

    var menu = $(MonthPicker_RistrictMonthField);

    // Click the year title to show the years.
    menu.find('.month-picker-title a').trigger('click');

    // Make sure we are in years view.
    var buttons = menu.find('.month-picker-month-table .ui-button');
    var firstVisibleYear = parseInt($(buttons[0]).text(), 10);
    assert.ok(firstVisibleYear, 'The menu is showing the year table');

    // Make sure the years after the maximum year are disabled.
    var firstDisabledIndex = (2015 - firstVisibleYear) + 1;
    var disabledButttons = buttons.slice(firstDisabledIndex);
    var hasEnabledBttons = $( disabledButttons )
        .trigger('click')
        .is(':not(.ui-button-disabled)');

    assert.ok(!hasEnabledBttons, 'All year buttons after the maximum year are disabled');

    // Make sure that clicking the disabled buttons didn't select
    // a year.
    var firstVisibleYear = parseInt($(buttons[0]).text(), 10);
    assert.ok(firstVisibleYear, "Clciking the disabled buttons didn't take us to month view");

    // Make sure the next years button is disabled.
    var nextYearsButton = menu.find('.month-picker-next>.ui-button');
    var isDisabled = nextYearsButton
        .trigger('click')
        .is('.ui-button-disabled');

    assert.ok(isDisabled, 'The next year button is disabled');
    var newFirstYrar = parseInt($(buttons[0]).text(), 10);
    assert.equal(newFirstYrar, firstVisibleYear, "Clicking next year didn't change the year");

    var previousYearsButton = menu.find('.month-picker-previous>.ui-button');
    // Keep going back until there are no disabled buttons.
    // We count to 10 to avoid an infinite loop in case there's
    // a bug where we are going back in time but the the buttons stay disabled.
    for (var i = 1; i <= 10; i++) {
        // Make sure we can click the previous years button.
        previousYearsButton.trigger('click');

        newFirstYrar = parseInt($(buttons[0]).text(), 10);
        var wentBack = firstVisibleYear > newFirstYrar;
        assert.ok(wentBack, 'The plugin responsed to clicking previous years');
        if (!wentBack) {
            // Avoid failing on the same problem multiple times.
            return;
        }

        firstVisibleYear = newFirstYrar;

        // We still have diabled button, make sure they are the right ones.
        firstDisabledIndex = Math.min( (2015 - firstVisibleYear) + 1, 12 );
        disabledButttons = buttons.slice(firstDisabledIndex);
        hasEnabledBttons = $( disabledButttons )
            .is(':not(.ui-button-disabled)');

        assert.ok(!hasEnabledBttons, 'All year buttons after the maximum year are still disabled');

        // Check if we still have diabled button.
        if (!buttons.is('.ui-button-disabled')) {
            // We don't have disabled buttons, make sure both next and previous
            // years buttons are enabled.
            assert.ok(!previousYearsButton.is('.ui-button-disabled'), 'previous year button is enabled');
            assert.ok(!nextYearsButton.is('.ui-button-disabled'), 'next year button is enabled');
            break;
        }
    }

    // Make sure we didn't click back 10 times and we
    // still have disabled buttons.
    assert.ok(!buttons.is('.ui-button-disabled'), 'All year buttons are enabled after clicking previous years ' + i + ' times');

    // Make sure we can click enabled months.
    var firstVisibleYear = parseInt($(buttons[0]).text(), 10);
    $(buttons[0]).trigger('click');

    assert.equal($(buttons[0]).text(), $.MonthPicker.i18n.months[0], 'Clicking the ' + firstVisibleYear + ' year button showed the months');

    // Make sure none of the buttons are disabled in the month view.
    var hasDidabledButtons = menu.find('button').is('.ui-button-disabled');
    assert.ok(!hasDidabledButtons, 'All buttons are enabled');

    // Click the year title to show the years menu.
    menu.find('.month-picker-title a').trigger('click');

    // Keeps clicking next years until we reach the disabled years.
    for (var i = 1; !buttons.is('.ui-button-disabled') && i <= 10; i++) {
        nextYearsButton.trigger('click');
    }

    // Make sure were on the last page.
    assert.ok(buttons.is('.ui-button-disabled'), 'Clciking next took us to the last page');
    assert.ok(nextYearsButton.is('.ui-button-disabled'), 'The next years button is disabled');
    assert.ok(!previousYearsButton.is('.ui-button-disabled'), 'The previous years button is enabled');

    firstVisibleYear = parseInt($(buttons[0]).text(), 10);
    nextYearsButton.trigger('click');
    newFirstYrar = parseInt($(buttons[0]).text(), 10);
    assert.equal(newFirstYrar, firstVisibleYear, 'Clicking the next years button keept us on the same page');

    // Click on 2015 and make sure we have disabled button.
    var firstVisibleYear = parseInt($(buttons[0]).text(), 10);
    $(buttons[(2015 - firstVisibleYear)]).trigger('click');

    assert.ok(buttons.is('.ui-button-disabled'), 'Clciking the maximum year shows disabled month buttons');
    $(buttons[(2015 - firstVisibleYear)]).trigger('click');

    // Click October and make sure were in month view.
    $(buttons[9]).trigger('click');
    assert.equal(field.val(), '10/2015', 'Clicking October (the maximum month) sets the expected value');

    // Destroy the plugin so we can use the field over again
    // in another Min/MaxMonth test.
    field.MonthPicker('destroy');
});

// Here we make sure that if the user types in a year
// that is outside the restricted range the menu will
// open in the closest year that is within range, for example:
//
// If the MinMonth is: 10/2015 and the user types in 11/2020
// the menu will open and show the year 2015.
//
// This test purposely juggles between types to ensure
// that passing in different types before and after init works
// as expected.
QUnit.test('Menu opens within range', function (assert) {
    var field = $(RistrictMonthField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        MinMonth: '01/2013',
        MaxMonth: new Date(2016, 11 - 1)
    });

    var menu = $(MonthPicker_RistrictMonthField);

    // Make sure the menu opens in the year 2013 even if the user
    // types in 02/2010.
    field.val('02/2010');
    field.MonthPicker('Open');

    assert.equal(_getPickerYear(menu), 2013, 'The menu opend at the minimum year (2013) and not 2010' );

    field.MonthPicker('Close');

    // Make sure the menu opens in the year 2016 even if the user
    // types in 02/2020.
    field.val('12/2020');
    field.MonthPicker('Open');

    assert.equal(_getPickerYear(menu), 2016, 'The menu opend at the maximum year (2016) and not 2020' );

    field.MonthPicker('Close');

    // Make sure that the menu will open at the year 2018
    // If we change the MaxMonth option.
    field.MonthPicker('option', 'MaxMonth', '12/2018');
    field.MonthPicker('Open');

    assert.equal(_getPickerYear(menu), 2018, 'The menu opend at the year 2018 after changing the MaxMonth option' );

    field.MonthPicker('Close');

    // Make sure the menu opens at the the selected year if the MaxMonth
    // is greater than the selected month.
    field.MonthPicker('option', 'MaxMonth', new Date(2021, 12 - 1));
    field.MonthPicker('Open');

    assert.equal(_getPickerYear(menu), 2020, 'The menu opend at the the selected year 2020 after' );

    field.MonthPicker('Close');

    field.MonthPicker('option', 'MinMonth', new Date(2010, 12 - 1));
    field.val('02/2009');
    field.MonthPicker('Open');

    assert.equal(_getPickerYear(menu), 2010, 'The menu opend at the year 2010 after chagnig the MinMonth option' );

    field.MonthPicker('Close');

    // Make sure the menu opens at the selected year the MinMonth option
    // to soemthing smaller than the selected month.
    field.MonthPicker('option', 'MinMonth', new Date(2008, 04));
    field.MonthPicker('Open');

    assert.equal(_getPickerYear(menu), 2009, 'The menu opend at the selected year after changing the MinMonth option again' );

    // Destroy the plugin so we can use the field over again
    // in another Min/MaxMonth test.
    field.MonthPicker('destroy');
});

QUnit.test('Today and selected months are highlighted', function (assert) {
	var field = $(highlightedField).MonthPicker({
		Animation: 'none' // Disable animation to make sure opening and closing the menu is synchronous.
	});

	field.val('05/' + _today.getFullYear());

	field.MonthPicker('Open');
	var menu = $(MonthPicker_highlightedField);

	var buttons = menu.find('.month-picker-month-table .ui-button');

	var todaysButton = $(buttons[new Date().getMonth()]);

	var nextYearButton = menu.find('.month-picker-next>.ui-button');
	var previousYearButton = menu.find('.month-picker-previous>.ui-button');

	assert.ok(todaysButton.is('.ui-state-highlight'), "Today's month is highlighted");

	var selectedButton = buttons.filter('.ui-state-active');
	assert.equal( selectedButton.length, 1, 'There is one selected button');
	assert.equal( selectedButton[0], buttons[4], 'The selected month is highlighted');

	nextYearButton.trigger('click');

	assert.notOk(todaysButton.is('.ui-state-highlight'), 'Going to the next year removed highlighting');

	var selectedButton = buttons.filter('.ui-state-active');
	assert.equal( selectedButton.length, 0, 'Going to the next year removed the selected highlighting');

	previousYearButton.trigger('click');

	assert.ok(todaysButton.is('.ui-state-highlight'), 'Returning to this year returnd the highlighting');

	var selectedButton = buttons.filter('.ui-state-active');
	assert.equal( selectedButton.length, 1, 'There is one selected button');
	assert.equal( selectedButton[0], buttons[4], 'The selected month is highlighted');

	menu.find('.month-picker-title .ui-button').trigger('click');

	var selectdBtn = buttons.filter('.ui-state-active');
	assert.equal( selectdBtn.jqueryUIButton( "option", "label" ), _today.getFullYear(), 'The selected year is highlighted');

	var todayBtn = buttons.filter('.ui-state-highlight');
	assert.equal( todayBtn.jqueryUIButton( "option", "label" ), _today.getFullYear(), "Today's year is highlighted");

	field.MonthPicker('Close');

    var _plusMonths = _today.getMonth() < 5 ? (5 - _today.getMonth()) : 1;
	field.MonthPicker({ MinMonth: _plusMonths });

	field.MonthPicker('Open');

	var selectedButton = buttons.filter('.ui-state-highlight');
	assert.equal( selectedButton.length, 0, "Today is not highlighted because it's before the min month");

	var selectedButton = buttons.filter('.ui-state-active');
	assert.equal( selectedButton.length, 0, 'The selected monht is also not heighlighted');
});

QUnit.test('Number of months from today', function (assert) {
    var field = $(RistrictMonthField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        MinMonth: 0,
        MaxMonth: 16
    });

    // Make sure the menu will open on the current month.
    field.val($.datepicker.formatDate('mm/yy', new Date));

    field.MonthPicker('Open');

    var menu = $(MonthPicker_RistrictMonthField);

    // Make sure we are in years view.
    var buttons = menu.find('.month-picker-month-table .ui-button');

    var nextYearButton = menu.find('.month-picker-next>.ui-button');
    var previousYearButton = menu.find('.month-picker-previous>.ui-button');

    var enabledMonths = 0;

    // Make sure that 16 buttons + 1 for today are disabled.
    //
    // Keep clicking next until the next year button is disabled
    // We count to 10 to avoid an infinite loop in case there's
    // a bug where the next button is not disabled.
    var hasNext = nextYearButton.is(':not(.ui-button-disabled)');
    for (var i = 0; hasNext && i < 10; i++) {
        hasNext = nextYearButton.is(':not(.ui-button-disabled)');
        enabledMonths += buttons.not('.ui-button-disabled').length;
        nextYearButton.trigger('click');
    }
    assert.equal(enabledMonths, 17, 'Today + 16 month buttons are enabled');

    field.MonthPicker('Close');

	// Make sure that 20 buttons + 1 for today are disabled.
    field.MonthPicker({MinMonth: -20, MaxMonth: 0});
	field.MonthPicker('Open');
	enabledMonths = 0;

	hasNext = previousYearButton.is(':not(.ui-button-disabled)');

    for (var i = 0; hasNext && i < 10; i++) {
        hasNext = previousYearButton.is(':not(.ui-button-disabled)');
        enabledMonths += buttons.not('.ui-button-disabled').length;
        previousYearButton.trigger('click');
    }
    assert.equal(enabledMonths, 21, 'Today + 20 month buttons are enabled');

    // Destroy the plugin so we can use the field over again
    // in another Min/MaxMonth test.
    field.MonthPicker('destroy');
});

QUnit.test('Relative month periods', function (assert) {
    var field = $(RistrictMonthField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        MinMonth: '+1Y -12m', // a.k.a 0 months (this month).
        MaxMonth: '6M +1y' // a.k.a 18 months.
    });

    // Make sure the menu will open on the current month.
    field.val($.datepicker.formatDate('mm/yy', new Date));

    field.MonthPicker('Open');

    var menu = $(MonthPicker_RistrictMonthField);

    // Make sure we are in years view.
    var buttons = menu.find('.month-picker-month-table .ui-button');
    var nextYearButton = menu.find('.month-picker-next>.ui-button');
    var previousYearButton = menu.find('.month-picker-previous>.ui-button');
    var enabledMonths = 0;

    // Make sure that 18 buttons + 1 for today are disabled.
    //
    // Keep clicking next until the next year button is disabled
    // We count to 10 to avoid an infinite loop in case there's
    // a bug where the next button is not disabled.
    var hasNext = nextYearButton.is(':not(.ui-button-disabled)');
    for (var i = 0; hasNext && i < 10; i++) {
        hasNext = nextYearButton.is(':not(.ui-button-disabled)');
        enabledMonths += buttons.not('.ui-button-disabled').length;
        nextYearButton.trigger('click');
    }
    assert.equal(enabledMonths, 19, 'Today + 18 month buttons are enabled');

    field.MonthPicker('Close');

	// Make sure that 24 buttons + 1 for today are disabled.
    field.MonthPicker({MinMonth: '-2y', MaxMonth: '0M'});
	field.MonthPicker('Open');
	enabledMonths = 0;

	hasNext = previousYearButton.is(':not(.ui-button-disabled)');

    for (var i = 0; hasNext && i < 10; i++) {
        hasNext = previousYearButton.is(':not(.ui-button-disabled)');
        enabledMonths += buttons.not('.ui-button-disabled').length;
        previousYearButton.trigger('click');
    }
    assert.equal(enabledMonths, 25, 'Today + 24 month buttons are enabled');

    // Destroy the plugin so we can use the field over again
    // in another Min/MaxMonth test.
    field.MonthPicker('destroy');
});

QUnit.test('JavaScript Date objects', function (assert) {
	var field = $(RistrictMonthField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.

        MinMonth: new Date(2015, 2 - 1),
        MaxMonth: new Date(2015, 11 - 1)
    });

    field.val('05/2015');

    var menu = $(MonthPicker_RistrictMonthField);
    var buttons = menu.find('.month-picker-month-table .ui-button');

    field.MonthPicker('Open');
    assert.equal(buttons.not('.ui-button-disabled').length, 10, '10 month buttons are enabled');

    field.MonthPicker('Close');
    field.MonthPicker('option', 'MinMonth', new Date(2016, 1 - 1));
    field.MonthPicker('option', 'MaxMonth', new Date(2016, 6 - 1));

    field.MonthPicker('Open');
    assert.equal(_getPickerYear(menu), 2016, 'The menu opend at the expected year 2015');
    assert.equal(buttons.not('.ui-button-disabled').length, 6, '12 month buttons are enabled');

    // Destroy the plugin so we can use the field over again
    // in another Min/MaxMonth test.
    field.MonthPicker('destroy');
});

QUnit.module('Version 3.0');

QUnit.test('Title buttons', function (assert) {
    var field = $(RistrictMonthField).val('').MonthPicker({
      Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
      MaxMonth: '+2Y'
    });

    var menu = $(MonthPicker_RistrictMonthField);
    var nextButton = menu.find('.month-picker-next .ui-button');
    field.MonthPicker('Open');

    assert.notOk(nextButton.is('.ui-state-default'), "The next button doesn't have the .ui-state-default class");

    nextButton.trigger('mouseover');
    assert.ok(nextButton.is('.ui-state-hover'), 'The next button has the .ui-state-hover class');

    nextButton.trigger('mousedown');
    assert.ok(nextButton.is('.ui-state-active'), 'The next button has the .ui-state-active class');

    nextButton.trigger('click');
    nextButton.trigger('mouseup');
    assert.notOk(nextButton.is('.ui-state-default'), "The next button doesn't have the .ui-state-default class after clicking it");
    assert.notOk(nextButton.is('.ui-state-active'), "The next button doesn't have the .ui-state-active class after clicking it");
    assert.ok(nextButton.is('.ui-state-hover'), 'The next button has the .ui-state-hover class after clicking it');

    nextButton.trigger('mouseleave');
    assert.notOk(nextButton.is('.ui-state-default'), "The next button doesn't have the .ui-state-default class after mouseleave");
    assert.notOk(nextButton.is('.ui-state-hover'), "The next button doesn't have .ui-state-hover class after mouseleave");
    assert.notOk(nextButton.is('.ui-state-active'), "The next button doesn't have the .ui-state-active class after mouseleave");

    nextButton.trigger('mouseover');
    assert.ok(nextButton.is('.ui-state-hover'), 'The next button has the .ui-state-hover class');

    nextButton.trigger('click');
    nextButton.trigger('mouseup');

    assert.ok(nextButton.is('.ui-button-disabled'), 'Navigating to the last year allowd (+2Y) disabled the next button');
    assert.notOk(nextButton.is('.ui-state-default'), "The next button doesn't have the .ui-state-default class when disabled");
    assert.notOk(nextButton.is('.ui-state-hover'), "The next button doesn't have .ui-state-hover class when disabled");
    assert.notOk(nextButton.is('.ui-state-active'), "The next button doesn't have the .ui-state-active class when disabled");

    field.MonthPicker('destroy');
});

/*
Here we make sure that clicking the jump years button
when in jump years mode will return the user to the year
they were when they clicked Jump years.
*/
QUnit.test('Back to 2015 button', function (assert) {
    var field = $(RistrictMonthField).val('').MonthPicker({
      Animation: 'none' // Disable animation to make sure opening and closing the menu is synchronous.
    });

    field.MonthPicker('Open');
    var menu = $(MonthPicker_RistrictMonthField);
    var titleButton = menu.find('.month-picker-title .ui-button');
    var nextButton = menu.find('.month-picker-next .ui-button');
    var backButton = menu.find('.month-picker-previous .ui-button');

    nextButton.trigger('click');
    var nextYear = _today.getFullYear() + 1;
    assert.equal(_getPickerYear(menu), nextYear, 'Clicking next took us to the next year (' + nextYear + ')');

    titleButton.trigger('click');
    var expectedTitle = $.MonthPicker.i18n.backTo + ' ' + nextYear;

    assert.equal( $('.month-picker-title span', menu).text(), expectedTitle, 'The title button has the expected label' );

    /*
    Here we simulate the user jumping back and forth in
    the jump years menu.
    The point is to make sure the button will still return
    the user to the expected year.
    */

    // Keep clicking next until today's year is not visible.
    // We count to 10 to avoid an infinite loop in case there's
    // a bug where the next button is not going to the next year.
    var buttons = menu.find('.month-picker-month-table .ui-button');
    var hasNext = buttons.is('.ui-state-highlight');
    assert.ok( hasNext, "Today's year is highlighted" );
    var i = 0;
    for (; hasNext && i < 10; i++) {
      nextButton.trigger('click');
      hasNext = buttons.is('.ui-state-highlight');
    }
    var nextClickCount = i;

    assert.notOk( hasNext, "Today's year is not visible after clicking next" );
    assert.equal( $('.month-picker-title span', menu).text(), expectedTitle, 'Clicking next did not change the button label' );

    for (var p = 0; p < nextClickCount * 2; p++) {
      backButton.trigger('click');
    }

    hasNext = buttons.is('.ui-state-highlight');
    assert.notOk( hasNext, "Today's year is not visible after clicking previous" );
    assert.equal( $('.month-picker-title span', menu).text(), expectedTitle, 'Clicking previous did not change the button label' );

    // Click the title button and make sure it returnd us to the expected year.
    titleButton.trigger('click');
    assert.equal(_getPickerYear(menu), nextYear, 'Clicking next took us to the next year (' + nextYear + ')');

    $(buttons[0]).trigger('click');
    var selectedDate = field.MonthPicker('GetSelectedDate');
    assert.equal( selectedDate.getFullYear(), nextYear, 'Clicking the first month selected the expected year' );
    assert.equal( selectedDate.getMonth() + 1, 1, 'Clicking the first month selected the expected month' );

    field.MonthPicker('Destroy');
});
