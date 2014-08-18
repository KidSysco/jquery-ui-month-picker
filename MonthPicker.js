/*
https://github.com/KidSysco/jquery-ui-month-picker/

Version 2.2

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation;
version 3.0. This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.
You should have received a copy of the GNU Lesser General Public
License along with this library; if not, visit
http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt.
*/
;
(function ($, window, document, undefined) {
    var _markup;
    var _speed = 500;
    var _disabledClass = 'month-picker-disabled';
    var _inputMask = '99/9999';
    
    $.MonthPicker = {
        i18n: {
            year: "Year",
            prevYear: "Previous Year",
            nextYear: "Next Year",
            next5Years: 'Jump Forward 5 Years',
            prev5Years: 'Jump Back 5 Years',
            nextLabel: "Next",
            prevLabel: "Prev",
            buttonText: "Open Month Chooser",
            jumpYears: "Jump Years",
            months: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
        }
    };
    
    _markup =
        '<div class="ui-widget-header ui-helper-clearfix ui-corner-all">' +
            '<table class="month-picker-year-table" width="100%" border="0" cellspacing="1" cellpadding="2">' +
                '<tr>' +
                    '<td class="previous-year"><button>&nbsp;</button></td>' +
                    '<td class="year-container-all">' +
                        '<div class="year-title"></div>' +
                        '<div id="year-container"><span class="year"></span></div>' +
                    '</td>' +
                    '<td class="next-year"><button>&nbsp;</button></td>' +
                '</tr>' +
            '</table>' +
        '</div>' +
        '<div class="ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">' +
            '<table class="month-picker-month-table" width="100%" border="0" cellspacing="1" cellpadding="2">' +
                '<tr>' +
                    '<td><button type="button" class="button-1"></button></td>' +
                    '<td><button class="button-2" type="button"></button></td>' +
                    '<td><button class="button-3" type="button"></button></td>' +
                '</tr>' +
                '<tr>' +
                    '<td><button class="button-4" type="button"></button></td>' +
                    '<td><button class="button-5" type="button"></button></td>' +
                    '<td><button class="button-6" type="button"></button></td>' +
                '</tr>' +
                '<tr>' +
                    '<td><button class="button-7" type="button"></button></td>' +
                    '<td><button class="button-8" type="button"></button></td>' +
                    '<td><button class="button-9" type="button"></button></td>' +
                '</tr>' +
                '<tr>' +
                    '<td><button class="button-10" type="button"></button></td>' +
                    '<td><button class="button-11" type="button"></button></td>' +
                    '<td><button class="button-12" type="button"></button></td>' +
                '</tr>' +
            '</table>' +
        '</div>';

    $.widget("KidSysco.MonthPicker", {

        /******* Properties *******/

        options: {
            i18n: null,
            StartYear: null,
            ShowIcon: true,
            UseInputMask: false,
            ValidationErrorMessage: null,
            Disabled: false,
            OnAfterMenuOpen: null,
            OnAfterMenuClose: null,
            OnAfterNextYear: null,
            OnAfterNextYears: null,
            OnAfterPreviousYear: null,
            OnAfterPreviousYears: null,
            OnAfterChooseMonth: null,
            OnAfterChooseYear: null,
            OnAfterChooseYears: null,
            OnAfterChooseMonths: null
        },

        _monthPickerMenu: null,

        _monthPickerButton: null,

        _validationMessage: null,

        _yearContainer: null,
        
        _isMonthInputType: null,

        _enum: {
            _overrideStartYear: 'MonthPicker_OverrideStartYear'
        },

        /******* jQuery UI Widget Factory Overrides ********/

        _destroy: function () {
            if (jQuery.mask && this.options.UseInputMask) {
                this.element.unmask();
            }

            this.element.val('')
                .css('color', '')
                .removeClass('month-year-input')
                .removeData(this._enum._overrideStartYear)
                .unbind();

            $(document).unbind('click.MonthPicker' + this.element.attr('id'), $.proxy(this._hide, this));

            this._monthPickerMenu.remove();
            this._monthPickerMenu = null;

            if (this.monthPickerButton) {
                this._monthPickerButton.remove();
                this._monthPickerButton = null;
            }

            if (this._validationMessage) {
                this._validationMessage.remove();
                this._validationMessage = null;
            }
        },

        _setOption: function (key, value) {
            // In jQuery UI 1.8, manually invoke the _setOption method from the base widget.
            //$.Widget.prototype._setOption.apply(this, arguments);
            // In jQuery UI 1.9 and above, you use the _super method instead.
            this._super("_setOption", key, value);
            switch (key) {
                case 'i18n':
                    this.options.i18n = $.extend({}, value);
                    break;
                case 'Disabled':
                    this.options.Disabled = value;
                    this._setDisabledState();
                    break;
                case 'OnAfterChooseMonth':
                    this.options.OnAfterChooseMonth = value;
                    break;
                case 'OnAfterChooseMonths':
                    this.options.OnAfterChooseMonths = value;
                    break;
                case 'OnAfterChooseYear':
                    this.options.OnAfterChooseYear = value;
                    break;
                case 'OnAfterChooseYears':
                    this.options.OnAfterChooseYears = value;
                    break;
                case 'OnAfterMenuClose':
                    this.options.OnAfterMenuClose = value;
                    break;
                case 'OnAfterMenuOpen':
                    this.options.OnAfterMenuOpen = value;
                    break;
                case 'OnAfterNextYear':
                    this.options.OnAfterNextYear = value;
                    break;
                case 'OnAfterNextYears':
                    this.options.OnAfterNextYears = value;
                    break;
                case 'OnAfterPreviousYear':
                    this.options.OnAfterPreviousYear = value;
                    break;
                case 'OnAfterPreviousYears':
                    this.options.OnAfterPreviousYears = value;
                    break;
                case 'UseInputMask':
                    this.options.UseInputMask = value;
                    this._setUseInputMask();
                    break;
                case 'StartYear':
                    this.options.StartYear = value;
                    this._setStartYear();
                    if (value !== null) {
                        this._setPickerYear(value);
                    }
                    break;
                case 'ShowIcon':
                    this.options.ShowIcon = value;
                    this._showIcon();
                    break;
                case 'ValidationErrorMessage':
                    this.options.ValidationErrorMessage = value;
                    if (this.options.ValidationErrorMessage !== null) {
                        this._createValidationMessage();
                    } else {
                        this._removeValidationMessage();
                    }

                    break;
            }
        },

        _init: function () {
            if (!jQuery.ui || !jQuery.ui.button || !jQuery.ui.datepicker) {
                alert('MonthPicker Setup Error: The jQuery UI button and datepicker plug-ins must be loaded before MonthPicker is called.');
                return false;
            }

            if (!(this.element.is('input[type="text"]') || this.element.is('input[type="month"]'))) {
                alert('MonthPicker Setup Error: MonthPicker can only be called on text or month inputs. ' + this.element.attr('id') + ' is not a text or month input.');
                return false;
            }

            if (!jQuery.mask && this.options.UseInputMask) {
                alert('MonthPicker Setup Error: The UseInputMask option is set but the Digital Bush Input Mask jQuery Plugin is not loaded. Get the plugin from http://digitalbush.com/');
                return false;
            }
            
            if (this.element.is('input[type="month"]')) {
                this.element.css('width', 'auto');
                this._isMonthInputType = true;
            }else{
                 this._isMonthInputType = false;   
            }

            this.element.addClass('month-year-input');

            this._setStartYear();

            this._monthPickerMenu = $('<div id="MonthPicker_' + this.element.attr('id') + '" class="month-picker ui-helper-clearfix"></div>');

            $(_markup).appendTo(this._monthPickerMenu);
            $('body').append(this._monthPickerMenu);

            this._monthPickerMenu.find('.year-title').text(this._i18n('year'));
            this._monthPickerMenu.find('.year-container-all').attr('title', this._i18n('jumpYears'));

            this._showIcon();

            this._createValidationMessage();

            this._yearContainer = $('.year', this._monthPickerMenu);

            $('.previous-year button', this._monthPickerMenu)
                .button({
                icons: {
                    primary: 'ui-icon-circle-triangle-w'
                },
                text: false
            });
            $('.previous-year button span.ui-button-icon-primary').text(this._i18n('prevLabel'));
             
            $('.next-year button', this._monthPickerMenu)
                .button({
                icons: {
                    primary: 'ui-icon-circle-triangle-e'
                },
                text: false
            });
            $('.next-year button span.ui-button-icon-primary').text(this._i18n('nextLabel'));

            $('.month-picker-month-table td button', this._monthPickerMenu).button();

            $('.year-container-all', this._monthPickerMenu).click($.proxy(this._showYearsClickHandler, this));

            $(document).bind('click.MonthPicker' + this.element.attr('id'), $.proxy(this._hide, this));
            this._monthPickerMenu.bind('click.MonthPicker', function (event) {
                return false;
            });

            this._setUseInputMask();
            this._setDisabledState();
        },

        /****** Misc. Utility functions ******/

        _i18n: function(str) {
            return $.extend({}, $.MonthPicker.i18n, this.options.i18n)[str];
        },

        _isFunction: function (func) {
            return typeof (func) === 'function';
        },

        /****** Publicly Accessible API functions ******/

        GetSelectedYear: function () {
            return this._validateYear(this.element.val());
        },

        GetSelectedMonth: function () {
            return this._validateMonth(this.element.val());
        },

        GetSelectedMonthYear: function () {
            var _month = this._validateMonth(this.element.val()),
                _year = this._validateYear(this.element.val()), 
                _date;

            if (!isNaN(_year) && !isNaN(_month)) {
                if (this.options.ValidationErrorMessage !== null && !this.options.Disabled) {
                    $('#MonthPicker_Validation_' + this.element.attr('id')).hide();
                }
                
                if(this._isMonthInputType){
                    _date = _year + '-' + _month;
                }else{
                    _date = _month + '/' + _year;
                }
                
                $(this).val(_date);
                return _date;
            } else {
                if (this.options.ValidationErrorMessage !== null && !this.options.Disabled) {
                    $('#MonthPicker_Validation_' + this.element.attr('id')).show();
                }

                return null;
            }
        },

        Disable: function () {
            this._setOption("Disabled", true);
        },

        Enable: function () {
            this._setOption("Disabled", false);
        },

        ClearAllCallbacks: function () {
            this.options.OnAfterChooseMonth = null;
            this.options.OnAfterChooseMonths = null;
            this.options.OnAfterChooseYear = null;
            this.options.OnAfterChooseYears = null;
            this.options.OnAfterMenuClose = null;
            this.options.OnAfterMenuOpen = null;
            this.options.OnAfterNextYear = null;
            this.options.OnAfterNextYears = null;
            this.options.OnAfterPreviousYear = null;
            this.options.OnAfterPreviousYears = null;
        },

        Clear: function () {
            this.element.val('');

            if (this._validationMessage !== null) {
                this._validationMessage.hide();
            }
        },

        /****** Private functions ******/

        _showIcon: function () {
            if (this._monthPickerButton === null) {
                if (this.options.ShowIcon) {
                    this._monthPickerButton = $('<span id="MonthPicker_Button_' + this.element.attr('id') + '" class="month-picker-open-button">' + this._i18n('buttonText') + '</span>').insertAfter(this.element);
                    this._monthPickerButton.button({
                        text: false,
                        icons: {
                            primary: 'ui-icon-calculator'
                        }
                    })
                        .click($.proxy(this._show, this));
                } else {
                    this.element.bind('click.MonthPicker', $.proxy(this._show, this));
                }
            } else {
                if (!this.options.ShowIcon) {
                    this._monthPickerButton.remove();
                    this._monthPickerButton = null;
                    this.element.bind('click.MonthPicker', $.proxy(this._show, this));
                }
            }
        },

        _createValidationMessage: function () {
            if (this.options.ValidationErrorMessage !== null && this.options.ValidationErrorMessage !== '') {
                this._validationMessage = $('<span id="MonthPicker_Validation_' + this.element.attr('id') + '" class="month-picker-invalid-message">' + this.options.ValidationErrorMessage + '</span>');

                this._validationMessage.insertAfter(this.options.ShowIcon ? this.element.next() : this.element);

                this.element.blur($.proxy(this.GetSelectedMonthYear, this));
            }
        },

        _removeValidationMessage: function () {
            if (this.options.ValidationErrorMessage === null) {
                this._validationMessage.remove();
                this._validationMessage = null;
            }
        },

        _show: function () {
            var _selectedYear = this.GetSelectedYear();
            if (this.element.data(this._enum._overrideStartYear) !== undefined) {
                this._setPickerYear(this.options.StartYear);
            } else if (!isNaN(_selectedYear)) {
                this._setPickerYear(_selectedYear);
            } else {
                this._setPickerYear(new Date().getFullYear());
            }

            if (this._monthPickerMenu.css('display') === 'none') {
                var _top = this.element.offset().top + this.element.height() + 7;
                var _left = this.element.offset().left;

                this._monthPickerMenu.css({
                    top: _top + 'px',
                    left: _left + 'px'
                })
                    .slideDown(_speed, $.proxy(function () {
                    if (this._isFunction(this.options.OnAfterMenuOpen)) {
                        this.options.OnAfterMenuOpen();
                    }
                }, this));
            }

            this._showMonths();

            return false;
        },

        _hide: function () {
            if (this._monthPickerMenu.css('display') === 'block') {
                this._monthPickerMenu.slideUp(_speed, $.proxy(function () {
                    if (this._isFunction(this.options.OnAfterMenuClose)) {
                        this.options.OnAfterMenuClose();
                    }
                }, this));
            }
        },

        _setUseInputMask: function () {
            if (!this._isMonthInputType) {
                try {
                    if (this.options.UseInputMask) {
                        this.element.mask(_inputMask);
                    } else {
                        this.element.unmask();
                    }
                } catch (e) {}
            }
        },

        _setDisabledState: function () {
            if (this.options.Disabled) {
                this.element.prop('disabled', true);
                this.element.addClass(_disabledClass);
                if (this._monthPickerButton !== null) {
                    this._monthPickerButton.button('option', 'disabled', true);
                }

                if (this._validationMessage !== null) {
                    this._validationMessage.hide();
                }

            } else {
                this.element.prop('disabled', false);
                this.element.removeClass(_disabledClass);
                if (this._monthPickerButton !== null) {
                    this._monthPickerButton.button('option', 'disabled', false);
                }
            }
        },

        _setStartYear: function () {
            if (this.options.StartYear !== null) {
                this.element.data(this._enum._overrideStartYear, true);
            } else {
                this.element.removeData(this._enum._overrideStartYear);
            }
        },

        _getPickerYear: function () {
            return parseInt(this._yearContainer.text(), 10);
        },

        _setPickerYear: function (year) {
            this._yearContainer.text(year);
        },

        _validateMonth: function (text) {
            if (text === '') {
                return NaN;
            }

            if (text.indexOf('/') != -1) {
                var _month = parseInt(text.split('/')[0], 10);
                if (!isNaN(_month)) {
                    if (_month >= 1 && _month <= 12) {
                        return _month;
                    }
                }
            }
            
            if (text.indexOf('-') != -1) {
                var _month = parseInt(text.split('-')[1], 10);
                if (!isNaN(_month)) {
                    if (_month >= 1 && _month <= 12) {
                        return _month;
                    }
                }
            }

            return NaN;
        },

        _validateYear: function (text) {
            if (text === '') {
                return NaN;
            }

            if (text.indexOf('/') != -1) {
                var _year = parseInt(text.split('/')[1], 10);

                if (!isNaN(_year)) {
                    if (_year >= 1800 && _year <= 3000) {
                        return _year;
                    }
                }
            }
            
            if (text.indexOf('-') != -1) {
                var _year = parseInt(text.split('-')[0], 10);

                if (!isNaN(_year)) {
                    if (_year >= 1800 && _year <= 3000) {
                        return _year;
                    }
                }
            }

            return NaN;
        },

        _chooseMonth: function (month) {
            if (month > 0 && month < 10) {
                month = '0' + month;
            }

            if (this.element.is('input[type="month"]')) {
                this.element.val(this._getPickerYear() + '-' + month).change();
            }else{
                this.element.val(month + '/' + this._getPickerYear()).change();
            }
            
            this.element.blur();
            if (this._isFunction(this.options.OnAfterChooseMonth)) {
                this.options.OnAfterChooseMonth();
            }
        },

        _chooseYear: function (year) {
            this._setPickerYear(year);
            this._showMonths();
            if (this._isFunction(this.options.OnAfterChooseYear)) {
                this.options.OnAfterChooseYear();
            }

        },

        _showMonths: function () {
            var _months = this._i18n('months');

            $('.previous-year button', this._monthPickerMenu)
                .attr('title', this._i18n('prevYear'))
                .unbind('click')
                .bind('click.MonthPicker', $.proxy(this._previousYear, this));

            $('.next-year button', this._monthPickerMenu)
                .attr('title', this._i18n('nextYear'))
                .unbind('click')
                .bind('click.MonthPicker', $.proxy(this._nextYear, this));

            $('.year-container-all', this._monthPickerMenu).css('cursor', 'pointer');
            $('.month-picker-month-table button', this._monthPickerMenu).unbind('.MonthPicker');

            for (var _month in _months) {
                var _counter = parseInt(_month, 10) + 1;
                $('.button-' + _counter, this._monthPickerMenu)
                    .bind('click.MonthPicker', {
                    _month: _counter
                }, $.proxy(function (event) {
                    this._chooseMonth(event.data._month);
                    this._hide();
                }, this));

                $('.button-' + _counter, this._monthPickerMenu).button('option', 'label', _months[_month]);
            }
        },

        _showYearsClickHandler: function () {

            this._showYears();
            if (this._isFunction(this.options.OnAfterChooseYears)) {
                this.options.OnAfterChooseYears();
            }
        },

        _showYears: function () {
            var _year = this._getPickerYear();

            $('.previous-year button', this._monthPickerMenu)
                .attr('title', this._i18n('prev5Years'))
                .unbind('click')
                .bind('click', $.proxy(function () {
                this._previousYears();
                return false;
            }, this));

            $('.next-year button', this._monthPickerMenu)
                .attr('title', this._i18n('next5Years'))
                .unbind('click')
                .bind('click', $.proxy(function () {
                this._nextYears();
                return false;
            }, this));

            $('.year-container-all', this._monthPickerMenu).css('cursor', 'default');
            $('.month-picker-month-table button', this._monthPickerMenu).unbind('.MonthPicker');

            var _yearDifferential = -4;
            for (var _counter = 1; _counter <= 12; _counter++) {
                $('.button-' + _counter, this._monthPickerMenu)
                    .bind('click.MonthPicker', {
                    _yearDiff: _yearDifferential
                }, $.proxy(function (event) {
                    this._chooseYear(_year + event.data._yearDiff);
                }, this));

                $('.button-' + _counter, this._monthPickerMenu).button('option', 'label', _year + _yearDifferential);

                _yearDifferential++;
            }
        },

        _nextYear: function () {
            var _year = $('.month-picker-year-table .year', this._monthPickerMenu);
            _year.text(parseInt(_year.text()) + 1, 10);
            if (this._isFunction(this.options.OnAfterNextYear)) {
                this.options.OnAfterNextYear();
            }
        },

        _nextYears: function () {
            var _year = $('.month-picker-year-table .year', this._monthPickerMenu);
            _year.text(parseInt(_year.text()) + 5, 10);
            this._showYears();
            if (this._isFunction(this.options.OnAfterNextYears)) {
                this.options.OnAfterNextYears();
            }
        },

        _previousYears: function () {
            var _year = $('.month-picker-year-table .year', this._monthPickerMenu);
            _year.text(parseInt(_year.text()) - 5, 10);
            this._showYears();
            if (this._isFunction(this.options.OnAfterPreviousYears)) {
                this.options.OnAfterPreviousYears();
            }
        },

        _previousYear: function () {
            var _year = $('.month-picker-year-table .year', this._monthPickerMenu);
            _year.text(parseInt(_year.text()) - 1, 10);
            if (this._isFunction(this.options.OnAfterPreviousYear)) {
                this.options.OnAfterPreviousYear();
            }
        }
    });
}(jQuery, window, document));
