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
        ShowIcon: true
    });

    assert.equal($('#MonthPicker_Button_IconDemo').length, 1, '#IconDemo initialized with icon showing.');
    _picker.MonthPicker('option', 'ShowIcon', false);
    assert.equal($('#MonthPicker_Button_IconDemo:visible').length, 0, '#IconDemo icon removed after init.');

    $('#IconDemo').MonthPicker('destroy');
    assert.ok($('#MonthPicker_IconDemo').length === 0, "#IconDemo has been destroyed.");

    _picker = $('#IconDemo').MonthPicker({
        ShowIcon: false
    });

    assert.equal($('#MonthPicker_Button_IconDemo').length, 0, '#IconDemo initialized without an icon.');
    _picker.MonthPicker('option', 'ShowIcon', true);
    assert.equal($('#MonthPicker_Button_IconDemo').length, 1, '#IconDemo icon added after init.');
});

QUnit.test('HTML 5 & Formatting Tests', function (assert) {
    var done;
    var _picker = $('#Html5').MonthPicker({
        ShowIcon: false,
        StartYear: 2027,
        OnAfterMenuOpen: function () {
            assert.equal(_pickerMenu.css('display'), 'block', '#Html5 responded to a text input click event and showed the menu.');
            $('.button-1', _pickerMenu).trigger($.Event('click'));
            done();
            done = assert.async();
        },
        OnAfterMenuClose: function () {
            assert.equal(_pickerMenu.css('display'), 'none', '#Html5 responded to a button click event by closing the menu.');
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
                var _lastPointFullyVisibleX = _windowWidth - 200;
                var _lastPointFullyVisibleY = _windowHeight - _pickerMenu.height();
                assert.equal(_pickerMenu.css('display'), 'block', '#PositionDemo responded to a text input click event and showed the menu.');
                assert.ok(_pickerMenu.position().left <= _lastPointFullyVisibleX, "#PositionDemo does not overlap the right window boundary on the X axis.");
                assert.ok(_pickerMenu.position().left > 0, "#PositionDemo does not overlap the left window boundary on the X axis.");
                assert.ok(_pickerMenu.position().top <= _lastPointFullyVisibleY, "#PositionDemo does not overlap the bottom window boundary on the Y axis.");
                assert.ok(_pickerMenu.position().top > 0, "#PositionDemo does not overlap the top window boundary on the Y axis.");
                $('.button-1', _pickerMenu).trigger($.Event('click'));
                done();
                done = assert.async();
            },
            OnAfterMenuClose: function () {
                assert.equal(_pickerMenu.css('display'), 'none', '#PositionDemo responded to a button click event by closing the menu.');
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
            assert.equal(_pickerMenu.css('display'), 'block', '#OverrideStartYear responded to a text input click event and showed the menu.');
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

    assert.ok($('#MonthPicker_OverrideStartYear').length === 1, "#OverrideStartYear has been initialized for demo purposes.");
    var _pickerMenu = $('#MonthPicker_OverrideStartYear');
    _picker.trigger($.Event('click'));
    done = assert.async();
});

QUnit.test('Start Year Option Tests', function (assert) {
    var done;
    var _picker = $('#StartYearDemo').MonthPicker({
        ShowIcon: false,
        OnAfterMenuOpen: function () {
            assert.equal(_pickerMenu.css('display'), 'block', '#StartYearDemo responded to a text input click event and showed the menu.');
            assert.equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2025, '#StartYearDemo defaulted to 2025, the year specified in the textbox.');
            _picker.MonthPicker('option', 'StartYear', 2095);
            assert.equal(parseInt($('.year', _pickerMenu).text(), 10), 2095, '#StartYearDemo switched the year to 2095 after init.');
            $('.button-1', _pickerMenu).trigger($.Event('click'));
            assert.equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2095, '#StartYearDemo selected the correct year, 2095, upon choosing a month.');
            done();
            done = assert.async();
        },
        OnAfterMenuClose: function () {
            assert.equal(_pickerMenu.css('display'), 'none', '#StartYearDemo responded to a button click event by closing the menu.');
            $('#StartYearDemo').MonthPicker('destroy');
            assert.ok($('#MonthPicker_StartYearDemo').length === 0, "#StartYearDemo has been destroyed.");
            $('#StartYearDemo').val('1/2025').MonthPicker({
                ShowIcon: false,
                OnAfterMenuOpen: function () {
                    
                    // get the picker menu again because it was removed from the dom upon destroying StartYearDemo.
                    _pickerMenu = $('#MonthPicker_StartYearDemo');
                    assert.equal(_pickerMenu.css('display'), 'block', '#StartYearDemo responded to a text input click event and showed the menu.');
                    assert.equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2025, '#StartYearDemo defaulted to 2025, the year specified in the textbox.');
                    $(document).trigger($.Event('click'));
                    done();
                    done = assert.async();
                },
                OnAfterMenuClose: function () {
                    
                    assert.equal(_pickerMenu.css('display'), 'none', '#StartYearDemo responded to a button click event by closing the menu.');
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
                
            _picker.trigger($.Event('click'));
        }
    });

    var _pickerMenu = $('#MonthPicker_StartYearDemo');
    assert.equal(_pickerMenu.length, 1, '#StartYearDemo month picker menu exists in the DOM.');
    done = assert.async();
    _picker.trigger($.Event('click'));

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
    _picker.MonthPicker('Enable');
    assert.equal(_picker.prop('disabled'), false, '#EnableDisableDemo was enabled using the Disable() API call.');

    _picker = $('#DialogDemo').MonthPicker();
    
    $('#Modal').dialog({
        autoOpen: false,
        title: 'MonthPicker Dialog Test',
        modal: true
    });
    
    assert.ok($('#MonthPicker_DialogDemo').length === 1, '#DialogDemo initialized, manually test the MonthPicker behavior in the dialog.');
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
    assert.equal($('#MonthPicker_Validation_DigitalBushBoth').css('display'), 'none', '#DigitalBushBoth cleared the validation error message using the Clear() API call.');
});

QUnit.test('Only one open menu', function (assert) {
    $([FirstField, SecondField]).MonthPicker({
        Animation: 'none' // Disable animation to make sure opening and closing the menu is synchronous.
    });

    $(FirstField).MonthPicker('Open');
    $(SecondField).MonthPicker('Open');

    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.');
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
    $(NoButtonField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
		
        Button: false
    });

    assert.equal($('#MonthPicker_Button_NoButtonField').length, 0, "The plugin didn't create a button");
	
    // Make sure that clicking the input field opens the menu.
    $(NoButtonField).trigger('click');
    assert.ok($(MonthPicker_NoButtonField).is(':visible'), 'Clicking the input field opened the correct menu.');
	
    // Don't leave the menu open (not really necessary).
    $(NoButtonField).MonthPicker('Disable');
	
    // Make sure clicking the input field when it's disabled doesn't open the menu.
    $(NoButtonField).trigger('click');
    assert.ok($(MonthPicker_NoButtonField).is(':hidden'), 'Clicking the input field opened the correct menu.');
	
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
    assert.ok($(MonthPicker_NoButtonField).is(':visible'), 'Clicking the input field still openes the correct menu.');

    $(NoButtonField).trigger('click');
	
    // Don't leave the menu open (not really necessary).
    $(NoButtonField).MonthPicker('ClearAllCallbacks');
    $(NoButtonField).MonthPicker('Close');
});

QUnit.module("Min/MaxMonth");

QUnit.test('Month buttons are disabled', function (assert) {
	var field = $(RistrictMonthField).val('12/2015').MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
		
		MinMonth: '10/2015'
	});
	
	field.MonthPicker('Open');
	
	var menu = $(MonthPicker_RistrictMonthField);
	var previousYearButton = menu.find('.previous-year>button');
	var nextYearButton = menu.find('.next-year>button');
	
	
	// Try to click the disabled buttons.
	var buttons = menu.find('.month-picker-month-table button');
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
	var pickerYear = parseInt(menu.find('.year').text(), 10);
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
	
	var pickerYear = parseInt(menu.find('.year').text(), 10);
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
    menu.find('.year-title').trigger('click');

    // Make sure we are in years view.
    var buttons = menu.find('.month-picker-month-table button');
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
    var nextYearsButton = menu.find('.next-year>button');
    var isDisabled = nextYearsButton
        .trigger('click')
        .is('.ui-button-disabled');

    assert.ok(isDisabled, 'The next year button is disabled');
    var newFirstYrar = parseInt($(buttons[0]).text(), 10);
    assert.equal(newFirstYrar, firstVisibleYear, "Clicking next year didn't change the year");

    var previousYearsButton = menu.find('.previous-year>button');
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
    menu.find('.year-title').trigger('click');

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
QUnit.test('Menu opens within range', function (assert) {
    var field = $(RistrictMonthField).MonthPicker({
        Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
        
        MinMonth: new Date(2013, 0),
        MaxMonth: new Date(2016, 11 - 1)
    });
    
    var menu = $(MonthPicker_RistrictMonthField);
    
    // Make sure the menu opens in the year 2013 even if the user 
    // types in 02/2010.
    field.val('02/2010');
    field.MonthPicker('Open');
    
    assert.equal(menu.find('.year').text(), 2013, 'The menu opend at the minimum year (2013) and not 2010' );
    
    field.MonthPicker('Close');
    
    // Make sure the menu opens in the year 2016 even if the user 
    // types in 02/2020.
    field.val('12/2020');
    field.MonthPicker('Open');
    
    assert.equal(menu.find('.year').text(), 2016, 'The menu opend at the maximum year (2016) and not 2020' );
    
    field.MonthPicker('Close');
    
    // Make sure that the menu will open at the year 2018
    // If we change the MaxMonth option.
    field.MonthPicker('option', 'MaxMonth', '12/2018');
    field.MonthPicker('Open');
    
    assert.equal(menu.find('.year').text(), 2018, 'The menu opend at the year 2018 after changing the MaxMonth option' );
    
    field.MonthPicker('Close');
    
    // Make sure the menu opens at the the selected year if the MaxMonth 
    // is greater than the selected month.
    field.MonthPicker('option', 'MaxMonth', '12/2021');
    field.MonthPicker('Open');
    
    assert.equal(menu.find('.year').text(), 2020, 'The menu opend at the the selected year 2020 after' );
    
    field.MonthPicker('Close');
    
    // Make sure the menu opens at the new minimum year if we change the MinMonth option.
    field.MonthPicker('option', 'MinMonth', '12/2010');
    field.val('02/2009');
    field.MonthPicker('Open');
    
    assert.equal(menu.find('.year').text(), 2010, 'The menu opend at the year 2010 after chagnig the MinMonth option' );
    
    field.MonthPicker('Close');
    
    // Make sure the menu opens at the selected year the MinMonth option
    // to soemthing smaller than the selected month.
    field.MonthPicker('option', 'MinMonth', new Date(2008, 04));
    field.MonthPicker('Open');
    
    assert.equal(menu.find('.year').text(), 2009, 'The menu opend at the selected year after changing the MinMonth option again' );
    
    // Destroy the plugin so we can use the field over again
    // in another Min/MaxMonth test.
    field.MonthPicker('destroy');
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
    var buttons = menu.find('.month-picker-month-table button');
    var nextYearButton = menu.find('.next-year>button');
    var previousYearButton = menu.find('.previous-year>button');
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
    field.MonthPicker({MinMonth: -20, MaxMonth: 0});
	
	// Make sure that 20 buttons + 1 for today are disabled.
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
