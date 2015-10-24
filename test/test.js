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

test('Status', function () {
    ok(true, 'qUnit is installed.');
    ok(jQuery, 'jQuery ' + $().jquery + ' is installed.');
    ok(jQuery.ui, 'jQuery UI ' + jQuery.ui.version + ' is installed.');
    ok(jQuery.widget, 'jQuery UI widget is installed.');
    ok(jQuery.ui.button, 'jQuery UI button is installed.');
    ok(jQuery.ui.datepicker, 'jQuery UI datepicker is installed.');
	ok(jQuery.KidSysco, 'KidSysco namespace exists.');
    ok(jQuery.KidSysco.MonthPicker, 'MonthPicker plugin function exists.');
    ok(jQuery.KidSysco.MonthPicker.prototype, 'MonthPicker plugin prototype exists.');
});

test('Optional Plugin Status', function () {
    ok(jQuery.mask, 'Digital Bush Input Mask Plugin is installed.');
    ok($.ui.position, 'jQuery UI .position() plugin is installed.');
});

QUnit.module("Functionality");

/***** Icon Demo Tests *****/

test('Icon Option Tests', function () {
    var _picker = $('#IconDemo').MonthPicker({
        ShowIcon: true
    });

    equal($('#MonthPicker_Button_IconDemo').length, 1, '#IconDemo initialized with icon showing.');
    _picker.MonthPicker('option', 'ShowIcon', false);
    equal($('#MonthPicker_Button_IconDemo:visible').length, 0, '#IconDemo icon removed after init.');

    $('#IconDemo').MonthPicker('destroy');
    ok($('#MonthPicker_IconDemo').length === 0, "#IconDemo has been destroyed.");

    _picker = $('#IconDemo').MonthPicker({
        ShowIcon: false
    });

    equal($('#MonthPicker_Button_IconDemo').length, 0, '#IconDemo initialized without an icon.');
    _picker.MonthPicker('option', 'ShowIcon', true);
    equal($('#MonthPicker_Button_IconDemo').length, 1, '#IconDemo icon added after init.');
    
    //$('#NoIconDemo').MonthPicker({
    //    ShowIcon: false
    //});

    //ok($('#MonthPicker_NoIconDemo').length === 1, "#NoIconDemo has been initialized for demo purposes.");
});

 test('HTML 5 & Formatting Tests', function () {
     var _picker = $('#Html5').MonthPicker({
            ShowIcon: false,
         	StartYear: 2027,
            OnAfterMenuOpen: function () {
                start();
                equal(_pickerMenu.css('display'), 'block', '#Html5 responded to a text input click event and showed the menu.');
                $('.button-1', _pickerMenu).trigger($.Event('click'));
                stop();
            },
            OnAfterMenuClose: function () {
                start();
                equal(_pickerMenu.css('display'), 'none', '#Html5 responded to a button click event by closing the menu.');
                equal(_picker.MonthPicker('GetSelectedYear'), '2027', '#Html5 showed and selected the correct override start year of 2027.');
                equal(_picker.MonthPicker('GetSelectedMonth'), '01', '#Html5 showed and selected the correct month of 01.');
                // destroy the monthpicker and re-create it so it doesnt fire anymore qunit events upon being used.
                $('#Html5').MonthPicker('destroy');
                ok($('#MonthPicker_Html5').length === 0, "#Html5 has been destroyed.");
                $('#Html5').MonthPicker({
                    ShowIcon: false,
                    StartYear: 2027
                });
            }
        });

        var _pickerMenu = $('#MonthPicker_Html5');
        
        // click the the button to show the monthpicker menu
	    _picker.trigger($.Event('click'));
        stop();

        equal(_pickerMenu.length, 1, '#Html5 month picker menu exists in the DOM.');
 });

if($.ui.position){
    test('jQueryUI .position() Tests', function () {
        var _windowWidth = $(window).width();
        var _windowHeight = $('body').height();
        var _picker = $('#PositionDemo').MonthPicker({
            ShowIcon: false,
            Position: {
                collision: 'fit flip'
            },
             OnAfterMenuOpen: function () {
                //var _pickerMenu = $('#MonthPicker_PositionDemo');
                var _lastPointFullyVisibleX = _windowWidth - 200;
                var _lastPointFullyVisibleY = _windowHeight - _pickerMenu.height();
                start();
                equal(_pickerMenu.css('display'), 'block', '#PositionDemo responded to a text input click event and showed the menu.');
                ok(_pickerMenu.position().left <= _lastPointFullyVisibleX, "#PositionDemo does not overlap the right window boundary on the X axis.");
                ok(_pickerMenu.position().left > 0, "#PositionDemo does not overlap the left window boundary on the X axis.");
                ok(_pickerMenu.position().top <= _lastPointFullyVisibleY, "#PositionDemo does not overlap the bottom window boundary on the Y axis.");
                ok(_pickerMenu.position().top > 0, "#PositionDemo does not overlap the top window boundary on the Y axis.");
                $('.button-1', _pickerMenu).trigger($.Event('click'));
                stop();
            },
            OnAfterMenuClose: function () {
                $(window).scrollTop(0);
                start();
                equal(_pickerMenu.css('display'), 'none', '#PositionDemo responded to a button click event by closing the menu.');
                // destroy the monthpicker and re-create it so it doesnt fire anymore qunit events upon being used.
                $('#PositionDemo').MonthPicker('destroy');
                ok($('#MonthPicker_PositionDemo').length === 0, "#PositionDemo has been destroyed.");
                $('#PositionDemo').MonthPicker({
                    ShowIcon: false,
                    Position: {
                        collision: 'fit flip'
                    }
                });
            }
        });

        var _pickerMenu = $('#MonthPicker_PositionDemo');
        // scroll window into position 
        $(window).scrollTop(650);
        // click the the button to show the monthpicker menu
        _picker.trigger($.Event('click'));
        stop();

        equal(_pickerMenu.length, 1, '#PositionDemo month picker menu exists in the DOM.');

    });
}

test('Override Start Year Tests', function(){
   var _picker = $('#OverrideStartYear').MonthPicker({
       ShowIcon: false,
       StartYear: 2023,
       OnAfterMenuOpen: function(){
           start();
           equal(_pickerMenu.css('display'), 'block', '#OverrideStartYear responded to a text input click event and showed the menu.');
		   $('.button-1', _pickerMenu).trigger($.Event('click'));
           stop();
       },
       OnAfterMenuClose: function(){
           start();
           equal(_picker.MonthPicker('GetSelectedYear'), '2023', '#OverrideStartYear showed and selected the correct override start date of 2023.');
           
           $('#OverrideStartYear').MonthPicker('destroy');
           ok($('#MonthPicker_OverrideStartYear').length === 0, "#OverrideStartYear has been destroyed.");
           $('#OverrideStartYear').MonthPicker({
               ShowIcon: false,
       		   StartYear: 2023
           });
       }
   });

    ok($('#MonthPicker_OverrideStartYear').length === 1, "#OverrideStartYear has been initialized for demo purposes."); 
    var _pickerMenu = $('#MonthPicker_OverrideStartYear');
    _picker.trigger($.Event('click'));
    stop();
});

test('Start Year Option Tests', function () {
    var _picker = $('#StartYearDemo').MonthPicker({
        ShowIcon: false,
        OnAfterMenuOpen: function () {
            start();
            equal(_pickerMenu.css('display'), 'block', '#StartYearDemo responded to a text input click event and showed the menu.');
            equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2025, '#StartYearDemo defaulted to 2025, the year specified in the textbox.');
            _picker.MonthPicker('option', 'StartYear', 2095);
            equal(parseInt($('.year', _pickerMenu).text(), 10), 2095, '#StartYearDemo switched the year to 2095 after init.');
            $('.button-1', _pickerMenu).trigger($.Event('click'));
            equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2095, '#StartYearDemo selected the correct year, 2095, upon choosing a month.');
            stop();
        },
        OnAfterMenuClose: function () {
            start();
            equal(_pickerMenu.css('display'), 'none', '#StartYearDemo responded to a button click event by closing the menu.');
            $('#StartYearDemo').MonthPicker('destroy');
            ok($('#MonthPicker_StartYearDemo').length === 0, "#StartYearDemo has been destroyed.");
            $('#StartYearDemo').val('1/2025').MonthPicker({
                ShowIcon: false,
                OnAfterMenuOpen: function () {
                    start();
                    // get the picker menu again because it was removed from the dom upon destroying StartYearDemo.
                    _pickerMenu = $('#MonthPicker_StartYearDemo');
                    equal(_pickerMenu.css('display'), 'block', '#StartYearDemo responded to a text input click event and showed the menu.');
                    equal(parseInt(_picker.MonthPicker('GetSelectedYear'), 10), 2025, '#StartYearDemo defaulted to 2025, the year specified in the textbox.');
                    $(document).trigger($.Event('click'));
                    stop();
                },
                OnAfterMenuClose: function () {
                    start();
                    equal(_pickerMenu.css('display'), 'none', '#StartYearDemo responded to a button click event by closing the menu.');
                    _picker.MonthPicker('destroy');
                    // get the picker menu again because it was removed from the dom upon destroying StartYearDemo.
                    ok($('#MonthPicker_StartYearDemo').length === 0, "#StartYearDemo has been destroyed again.");

                    // Setup StartYearDemo so that it will run as a demo without firing off tests.
                    $('#StartYearDemo').val('1/2025').MonthPicker({
                        ShowIcon: false
                    });
                    ok(_pickerMenu.length === 1, "#StartYearDemo has been re-initialized for demo purposes.");
                    
                    //ApiTests();
                    
                    
                }
            });
            ok(_pickerMenu.length === 1, "#StartYearDemo has been re-initialized for more tests.");
            _picker.trigger($.Event('click'));
            stop();
        }
    });

    var _pickerMenu = $('#MonthPicker_StartYearDemo');
    equal(_pickerMenu.length, 1, '#StartYearDemo month picker menu exists in the DOM.');
    _picker.trigger($.Event('click'));
    stop();
});

//function ApiTests() {
    test('API Tests', function () {
        var _picker = $('#GetYearDemo').MonthPicker({
            ValidationErrorMessage: 'Invalid Date!'
        });
        ok($('#MonthPicker_GetYearDemo').length === 1, '#GetYearDemo has been initialized.');
        equal(jQuery.type(_picker.MonthPicker('GetSelectedDate')), 'date', '#GetYearDemo GetSelectedDate() API call returned a date object.');
        equal(_picker.MonthPicker('GetSelectedDate').getFullYear(), 2012, '#GetYearDemo GetSelectedDate() API call returned a date object containing the correct year, 2012.');
        equal(_picker.MonthPicker('GetSelectedDate').getMonth(), 1, '#GetYearDemo GetSelectedDate() API call returned a date object containing the correct zero-based array index for February, 1.');
        equal(_picker.MonthPicker('GetSelectedMonth'), 2, '#GetYearDemo GetSelectedMonth() API call returned the correct month, 2.');
        equal(_picker.MonthPicker('GetSelectedYear'), 2012, '#GetYearDemo GetSelectedYear() API call returned the correct year, 2012.');
        equal(_picker.MonthPicker('GetSelectedMonthYear'), '2/2012', '#GetYearDemo GetSelectedMonthYear() API call returned the correct month/year, 2/2012.');

        _picker.val('aa');
        equal(_picker.MonthPicker('GetSelectedMonthYear'), null, '#GetYearDemo GetSelectedMonthYear() API call detected a bad date and returned null.');
        ok(isNaN(_picker.MonthPicker('GetSelectedMonth')), '#GetYearDemo GetSelectedMonth() API call detected a bad date and returned NaN.');
        ok(isNaN(_picker.MonthPicker('GetSelectedYear')), '#GetYearDemo GetSelectedYear() API call detected a bad date and returned NaN.');
        equal(_picker.MonthPicker('GetSelectedDate'), null, '#GetYearDemo GetSelectedDate() API call detected a bad date and returned a null.');
        equal($('#MonthPicker_Validation_GetYearDemo').css('display'), 'inline', '#GetYearDemo showed a validation message about a bad date.');

        _picker.MonthPicker('Clear').val('02/2012');
        equal($('#MonthPicker_Validation_GetYearDemo').css('display'), 'none', '#GetYearDemo Clear() API call reset the validation warning.');

        _picker = $('#EnableDisableDemo').MonthPicker({
            Disabled: true
        });
        equal(_picker.prop('disabled'), true, '#EnableDisableDemo was initialized into a disabled state.');
        _picker.MonthPicker('option', 'Disabled', false);
        equal(_picker.prop('disabled'), false, '#EnableDisableDemo was enabled by changing the Disabled option.');
        _picker.MonthPicker('Disable');
        equal(_picker.prop('disabled'), true, '#EnableDisableDemo was disabled using the Disable() API call.');
        _picker.MonthPicker('Enable');
        equal(_picker.prop('disabled'), false, '#EnableDisableDemo was enabled using the Disable() API call.');

        _picker = $('#DialogDemo').MonthPicker();
        $('#Modal').dialog({
            autoOpen: false,
            title: 'MonthPicker Dialog Test',
            modal: true
        });
        ok($('#MonthPicker_DialogDemo').length === 1, '#DialogDemo initialized, manually test the MonthPicker behavior in the dialog.');
        //DigitalBushTests();
    });
//}

//function DigitalBushTests() {
    test('Digital Bush Tests', function () {
        var _picker = $('#DigitalBush').MonthPicker({
            UseInputMask: true
        });
        _picker.focus();

        $('#DigitalBushBoth').MonthPicker({
            UseInputMask: true,
            ValidationErrorMessage: 'Invalid Date!'
        });
        equal($('#DigitalBushBoth').MonthPicker('GetSelectedMonthYear'), null, '#DigitalBushBoth GetSelectedMonthYear API call returned null as expected.');
        equal($('#MonthPicker_Validation_DigitalBushBoth').css('display'), 'inline', '#DigitalBushBoth showed a validation message about a bad date.');
        $('#DigitalBushBoth').MonthPicker('Clear');
        equal($('#MonthPicker_Validation_DigitalBushBoth').css('display'), 'none', '#DigitalBushBoth cleared the validation error message using the Clear() API call.');
    });
//}

QUnit.test('Only one open menu', function( assert ) {
	$([FirstField, SecondField]).MonthPicker({
		Animation: 'none' // Disable animation to make sure opening and closing the menu is synchronous.
	});
	
	$(FirstField).MonthPicker('Open');
	$(SecondField).MonthPicker('Open');
	
	assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.' );
});

QUnit.test('MonthFormat Option Tests', function( assert ) {
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

QUnit.test('Plain HTML Button test', function( assert ) {
	// Creats a month picker with a button similar to Datepicker's default button. 
    $(PlainButtonField).MonthPicker({ 
	    Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
	    Button: '<button class="PlainButton" id="PlainButton">...</button>'
	});
    
    // Make the button was properly construted and is visible in the expected location.
    assert.ok( $(PlainButton).is(':visible'), 'The plain button is present in the DOM and is visible.' );
    assert.equal( $(PlainButton).prev()[0], PlainButtonField, 'The button was placed near the associated input field' );
    assert.equal( PlainButton.tagName, 'BUTTON', 'PlainButton is a button tag' );
    assert.equal( $(PlainButton).text(), '...', 'The button has the correct label' );
    
	// Click the button and make sure the menu opens.
    $(PlainButton).trigger('click');
    assert.ok( $(MonthPicker_PlainButtonField).is(':visible'), 'Clicking the plain button opened the correct menu.' );
    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.' );
    
    // Disable the field (which implicitly closes the menu) 
    // and make sure the button is also disabled.
    $(PlainButtonField).MonthPicker('Disable');
    
    assert.ok( $(PlainButtonField).is(':disabled'), 'The input field was disabled.' );
    assert.ok( $(PlainButton).is(':disabled'), 'The button was disabled.');
    assert.ok( $(MonthPicker_PlainButtonField).is(':hidden'), 'The menu was closed.' );
    assert.equal( $('.PlainButton').length, 1, "There's only one plain button in the DOM.");
    
    // Make sure clicking the button doesn't open the menu.
    $(PlainButton).trigger('click');
    assert.ok( $(MonthPicker_PlainButtonField).is(':hidden'), "Clicking the button didn't open the menu." );
});

QUnit.test('Img tag tests', function( assert ) {
	// Creats a month picker with an image as a button.
	// The image should change according to the Disabled state.
    $(ImgButtonField).MonthPicker({
	    Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
	    
	    Button: function(options) {
		    var src = 'calendar' + (options.Disabled ? '-disabled' : '') + '.gif';
		    return '<img class="ImgButton" id="ImgButton" src="' + src + '" />';
	    }
	});
	
	// Make the image was properly construted and is visible in the expected location.
	// NOTE: We don't check that the image is visible because it isn't visible
	// until it was loaded.
    assert.equal( $(ImgButton).prev()[0], ImgButtonField, 'The image button was placed near the associated input field.' );
    assert.equal( $(ImgButton).attr('src'), 'calendar.gif', 'The button has the enabled image.' );
    
	// Click the image and make sure the menu opens.
    $(ImgButton).trigger('click');
    assert.ok($(MonthPicker_ImgButtonField).is(":visible"), 'Clicking the plain button opened the correct menu.' );
    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.' );
    
    // Disable the field (which implicitly closes the menu) 
    // and make sure the button is also disabled.
    $(ImgButtonField).MonthPicker('Disable');
    
    assert.ok( $(ImgButtonField).is(':disabled'), 'The input field was disabled.' );
    assert.ok( $(ImgButton).is(':disabled'), 'The button was disabled.' );
    assert.ok( $(MonthPicker_ImgButtonField).is(':hidden'), 'The menu was closed.' );
    
    assert.equal( $(ImgButton).attr('src'), 'calendar-disabled.gif', 'The button has the disabled image.' );
    assert.equal( $('.ImgButton').length, 1, "There's only one image button in the DOM.");
    
    // Make sure clicking the button doesn't open the menu.
    $(ImgButton).trigger('click');
    assert.ok( $(MonthPicker_ImgButtonField).is(':hidden'), "Clicking the button didn't open the menu." );
    
    $(ImgButtonField).MonthPicker('Destroy');
    
    assert.equal( $('#MonthPicker_ExistingButtonField').length, 0, 'The meun was removed from the DOM');
    assert.equal( $('.ImgButton').length, 0, 'The button was removed from the DOM');
});

QUnit.test('Existing element tests', function( assert ) {
	// Creats a month picker with an existing external element as a button.
	$(ExistingButtonField).MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
		
		Button: function(options) {
			var enabledButton = $(this).next().hide();
			var disabledButton = $(enabledButton).next().hide();
			
			return options.Disabled ? disabledButton.show() : enabledButton.show();
		}
	});
	
	// Make sure only the enabled element is visible.
	assert.ok( $(ExistingButton).is(':visible'), 'The enabled element is visible.' );
	assert.ok( $(DisabledExistingButton).is(':hidden'), 'The disabled element is hidden.' );
	
	// Click the element and make sure the menu opens.
    $(ExistingButton).trigger('click');
    assert.ok($(MonthPicker_ExistingButtonField).is(":visible"), 'Clicking the plain button opened the correct menu.' );
    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.' );
    
    // Disable the field (which implicitly closes the menu) 
    // and make sure the button is also disabled.
    $(ExistingButtonField).MonthPicker('Disable');
    assert.ok( $(ExistingButtonField).is(':disabled'), 'The input field was disabled.' );
	assert.ok( $(ExistingButton).is(':hidden'), 'The enabled element is hidden.' );
	assert.ok( $(DisabledExistingButton).is(':visible'), 'The disabled element is visible.' );
	
    assert.ok( $(MonthPicker_ExistingButtonField).is(':hidden'), 'The menu was closed.' );
    
    // Make sure clicking the disabled element doesn't open the menu.
    $(DisabledExistingButton).trigger('click');
    assert.ok( $(MonthPicker_ExistingButtonField).is(':hidden'), "Clicking the disabled element didn't open the menu." );
    
    // Re-enable the menu and make sure it opens when you click on the fit
    $(ExistingButtonField).MonthPicker('Enable');
    
    $(ExistingButton).trigger('click');
    assert.ok( $(MonthPicker_ExistingButtonField).is(':visible'), "Clicking the enabled element after re-enabling opend the menu" );
    
    // Close the menu to make sure that clicking the button the click event.
    // In case it wasen't removed triggering a click should throw an error.
    $(ExistingButtonField).MonthPicker('Close');
    
    // Make sure we don't remove existing elements when the plugin is destroyed. 
    $(ExistingButtonField).MonthPicker('destroy');
    
    assert.equal( $("#MonthPicker_ExistingButtonField").length, 0, 'The meun was removed from the DOM');
    assert.ok( ExistingButton, 'The existing button was not removed from the DOM');
    
    // Make sure that clicking the existing element after destroying
    // the plugin doesn't thorw an error. 
    $(ExistingButton).trigger('click');
    
});

QUnit.test('Change selector after init', function( assert ) {
	// In this test we are going to change the Button option to a jQuery selector 
	// aftet the plugin was initialized.
	$(SelectorButtonField).MonthPicker({
		Animation: 'none', // Disable animation to make sure opening and closing the menu is synchronous.
		
		Button: '#SelectorButton'
	});
	
	// Click the element and make sure the menu opens.
    $(SelectorButton).trigger('click');
    assert.ok($(MonthPicker_SelectorButtonField).is(":visible"), 'Clicking the button opened the correct menu.' );
    assert.equal($('.month-picker').filter(':visible').length, 1, 'There is only one menu opened.' );
	
	// Close the menu and change the button after initialization.
	$(SelectorButtonField).MonthPicker('Close');
	$(SelectorButtonField).MonthPicker('option', 'Button', '#OtherSelectorButton');
	
	// Make sure the buttons remain untouched.
	assert.ok( $(SelectorButton).is(':visible'), 'The enabled element was not touched.' );
	
	// Make sure clicking the old button doesn't open the menu (the event listeners were removed).
	$(SelectorButton).trigger('click');
    assert.ok($(MonthPicker_SelectorButtonField).is(":hidden"), "Clicking the old button didn't open the menu");
    
    // Make sure clicking the new button opens the menu.
    $(OtherSelectorButton).trigger('click');
    assert.ok($(MonthPicker_SelectorButtonField).is(":visible"), 'Clicking the other button opened the correct menu.' );
	
	// Close the menu to make sure that clicking the button the click event.
    // In case it wasen't removed triggering a click should throw an error.
    $(SelectorButtonField).MonthPicker('Close');
	
	// Destroy the plugin and make sure the event listeners were removed.
	$(SelectorButtonField).MonthPicker('destroy');
	
    assert.equal($("#MonthPicker_SelectorButtonField").length, 0, 'The month picker menu was removed.' );
    $(OtherSelectorButton).trigger('click');
});

QUnit.test('Disable button', function( assert ) {
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
		OnBeforeMenuClose: function() {
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
