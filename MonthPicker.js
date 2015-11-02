/*
https://github.com/KidSysco/jquery-ui-month-picker/

Version 2.6.2

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
(function ($, window, document) {
	'use strict';
    var _speeds = $.fx.speeds;
    var _eventsNs = '.MonthPicker';
    var _disabledClass = 'month-picker-disabled';
    var _defaultPos = { my: 'left top+1', at: 'left bottom' };
    var _RTL_defaultPos = { my: 'right top+1', at: 'right bottom' };
    var _setupErr = 'MonthPicker Setup Error: ';
    var _posErr = _setupErr + 'The jQuery UI position plug-in must be loaded in order to specify a position.';
    var _badOptValErr = _setupErr + 'Unsupported % option value, supported (case sensitive) values are: ';
    var _badMinMaxVal =  _setupErr + '"_" is not a valid %Month value.';
    var _animVals = {
            Animation: ['slideToggle', 'fadeToggle', 'none'],
            ShowAnim: ['fadeIn', 'slideDown', 'none'],
            HideAnim: ['fadeOut', 'slideUp', 'none']
    };
    var _setOptionHooks = {
        ValidationErrorMessage: '_createValidationMessage',
        Disabled: '_setDisabledState', 
        ShowIcon: '_showIcon', 
        Button: '_createButton', 
        ShowOn: '_updateFieldEvents',
        IsRTL: '_setRTL',
        StartYear: '_setPickerYear',
        MinMonth: '_setMinMonth',
        MaxMonth: '_setMaxMonth'
    };
    
    function _toMonth(date) {
	    return date.getMonth() + (date.getFullYear() * 12);
    }
    
    function _toYear(month) {
	    return Math.floor(month / 12);
    }
    
    // This test must be run before any rererence is made to jQuery.
    // In case the user didn't load jQuery or jQuery UI the plugin
    // will fail before it get's to this test + there is no reason
    // to perform this test for every MonthPicker instance being created.
    if (!$ || !$.ui || !$.ui.button || !$.ui.datepicker) {
        alert(_setupErr + 'The jQuery UI button and datepicker plug-ins must be loaded before MonthPicker is called.');
        return false;
    }
    
    var $noop = $.noop;
    var $datepicker = $.datepicker;
    var _openedInstance = null;
    var _hasPosition = !!$.ui.position;
    
    function _makeDefaultButton(options) {
	    // this refers to the associated input field.
        return $('<span id="MonthPicker_Button_' + this.id + '" class="month-picker-open-button">' + options.i18n.buttonText + '</span>')
            .button({
                text: false,
                icons: {
	                // Defaults to 'ui-icon-calculator'.
                    primary: options.ButtonIcon
                }
            });
    }
    
    function _applyArrowButton($el, dir) {
	    $el.button('option', {
            icons: {
                primary: 'ui-icon-circle-triangle-' + (dir ? 'w' : 'e')
            }
        });
    }
    
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
    
    var _markup =
        '<div class="ui-widget-header ui-helper-clearfix ui-corner-all">' +
            '<table class="month-picker-year-table" width="100%" border="0" cellspacing="1" cellpadding="2">' +
                '<tr>' +
                    '<td class="previous-year"><button /></td>' +
                    '<td class="year-container-all">' +
                        '<div id="year-container">' +
                            '<span class="year-title" />' +
                            '<span class="year" />' +
                        '</div>' +
                    '</td>' +
                    '<td class="next-year"><button /></td>' +
                '</tr>' +
            '</table>' +
        '</div>' +
        '<div class="ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">' +
            '<table class="month-picker-month-table" width="100%" border="0" cellspacing="1" cellpadding="2" />' +
        '</div>';

    $.widget("KidSysco.MonthPicker", {

        /******* Properties *******/

        options: {
            i18n: {},
            IsRTL: false,
            Position: null,
            StartYear: null,
            ShowIcon: true,
            UseInputMask: false,
            ValidationErrorMessage: null,
            Disabled: false,
            MonthFormat: 'mm/yy', 
            Animation: 'fadeToggle',
            ShowAnim: null,
            HideAnim: null,
            ShowOn: null,
            MinMonth: null,
            MaxMonth: null,
            Duration: 'normal',
            Button: _makeDefaultButton,
            OnAfterSetDisabled: $noop,
            ButtonIcon: 'ui-icon-calculator',
            OnBeforeMenuOpen: $noop,
            OnAfterMenuOpen: $noop,
            OnBeforeMenuClose: $noop, 
            OnAfterMenuClose: $noop,
            OnAfterNextYear: $noop,
            OnAfterNextYears: $noop,
            OnAfterPreviousYear: $noop,
            OnAfterPreviousYears: $noop,
            OnAfterChooseMonth: $noop,
            OnAfterChooseYear: $noop,
            OnAfterChooseYears: $noop,
            OnAfterChooseMonths: $noop
        },

        _monthPickerButton: $(),
        
        _validationMessage: $(),

        /******* jQuery UI Widget Factory Overrides ********/

        _destroy: function () {
            var _elem = this.element;
            if (jQuery.mask && this.options.UseInputMask) {
                _elem.unmask();
                
                if (!this.GetSelectedDate()) {
                    _elem.val('');
                }
            }

            _elem.removeClass('month-year-input').off(_eventsNs);

            $(document).off('click' + _eventsNs + this.uuid);

            this._monthPickerMenu.remove();
            
            var _button = this._monthPickerButton.off('click' + _eventsNs);
            if (this._removeOldBtn) {
	            _button.remove();
            }
            
            this._validationMessage.remove();
        },

        _setOption: function (key, value) {
            switch (key) {
                case 'i18n':
                    // Pass a clone i18n object to the this._super.
                    value = $.extend({}, value);
                    break;
                case 'Position':
                    if (!_hasPosition) {
                        alert(_posErr);
                        return;
                    }
                case 'MonthFormat':
                	var date = this.GetSelectedDate();
                	if (date) {
                		this.element.val( this.FormatMonth(date, value) );
                	}
                	break;
            }
            
            // Make sure the user passed in a valid Animation, ShowAnim and HideAnim options values.
            if (key in _animVals && _animVals[key].indexOf(value) === -1) {
                alert(_badOptValErr.replace(/%/, key) + _animVals[key]);
                return;
            }
            
            // In jQuery UI 1.8, manually invoke the _setOption method from the base widget.
            //$.Widget.prototype._setOption.apply(this, arguments);
            // In jQuery UI 1.9 and above, you use the _super method instead.
            this._super(key, value);
            
            _setOptionHooks[key] ? this[ _setOptionHooks[key] ](value) : 0;
        },

        _create: function () {
            var _el = this.element, _opts = this.options;
            // According to http://www.w3.org/TR/html-markup/input.html#input
            // An input element with no type attribute specified represents the same thing as an
            // input element with its type attribute set to "text".
            // TLDR:
            // http://www.w3.org/TR/html5/forms.html#the-input-element 
            // https://api.jquery.com/text-selector/
            if (!_el.is('input') || ['text', 'month', void 0].indexOf(_el.attr('type')) === -1) {
                var error = _setupErr + 'MonthPicker can only be called on text or month inputs.';
                // Call alert first so that IE<10 won't trip over console.log and swallow all errors.
                alert(error + ' \n\nSee console (developer tools) for more details.');
                
                console.error(error + '\n Caused by:');
                console.log(_el[0]);
                return false;
            }

            if (!$.mask && _opts.UseInputMask) {
                alert(_setupErr + 'The UseInputMask option is set but the Digital Bush Input Mask jQuery Plugin is not loaded. Get the plugin from http://digitalbush.com/');
                return false;
            }
            
            if (_opts.Position !== null && !_hasPosition) {
                alert(_posErr);
                return false;
            }
            
            // Make sure the user passed in a valid Animation, ShowAnim and HideAnim options values.
            for (var opt in _animVals) {
                if (_opts[opt] !== null && _animVals[opt].indexOf(_opts[opt]) === -1) {
                    alert(_badOptValErr.replace(/%/, opt) + _animVals[opt]);
                    return false;
                }
            }
            
            this._isMonthInputType = _el.attr('type') === 'month';
            if (this._isMonthInputType) {
                this.options.MonthFormat = this.MonthInputFormat;
                _el.css('width', 'auto');
            }

            _el.addClass('month-year-input');

            var _menu = this._monthPickerMenu = $('<div id="MonthPicker_' + _el.attr('id') + '" class="month-picker ui-helper-clearfix"></div>');
            
            $(_markup).appendTo(_menu);
            $('body').append(_menu);

            $('.year-title', _menu).text(this._i18n('year'));
            $('.year-container-all', _menu).attr('title', this._i18n('jumpYears'));

            this._createValidationMessage();

            this._yearContainer = $('.year', _menu);
            
            this._prevButton = $('.previous-year button', _menu).button({ text: false });
            this._nextButton = $('.next-year button', _menu).button({ text: false });
            
            this._setRTL(_opts.IsRTL); //Assigns icons to the next/prev buttons.
            
            $('.ui-button-icon-primary', this._nextButton).text(this._i18n('nextLabel'));
            $('.ui-button-icon-primary', this._prevButton).text(this._i18n('prevLabel'));

            var $table = $('.month-picker-month-table', _menu);
            for (var i = 0; i < 12; i++) {
                var $tr = !(i % 3) ? $('<tr />').appendTo($table) : $tr;
                $tr.append('<td><button class="button-' + (i + 1) + '" /></td>');
            }
            
            this._buttons = $('button', $table).button();

            $('.year-container-all', _menu).click($.proxy(this._showYearsClickHandler, this));
            
            _menu.on('click' + _eventsNs, function (event) {
                return false;
            });

            // Checks and initailizes Min/MaxMonth properties 
            // (creates _setMinMonth and _setMaxMonth methods).
            var me = this, Month = 'Month';
            $.each(['Min', 'Max'], function(i, type) {
                me["_set" + type + Month] = function(val) {
                    if ((me['_' + type + Month] = this._toMonth(val)) === false) {
                        alert(_badMinMaxVal.replace(/%/, type).replace(/_/, val));
                    }
                };
	            
                me._setOption(type + Month, me.options[type + Month]);
            });
            
            this._setUseInputMask();
            this._setDisabledState();
            this._updateFieldEvents();
            this.Destroy = this.destroy;
        },

        /****** Misc. Utility functions ******/

        _i18n: function(str) {
            return this.options.i18n[str] || $.MonthPicker.i18n[str];
        },

        /****** Publicly Accessible API functions ******/
        
        GetSelectedDate: function () {
            return this._parseMonth();
        },
        
        GetSelectedYear: function () {
            var date = this.GetSelectedDate();
            return date ? date.getFullYear() : NaN;
        },

        GetSelectedMonth: function () {
            var date = this.GetSelectedDate();
            return date ? date.getMonth()+1 : NaN;
        },
        
        Validate: function() {
            var _date = this.GetSelectedDate();
            
            if (this.options.ValidationErrorMessage !== null && !this.options.Disabled) {
                this._validationMessage[ _date ? 'hide' : 'show' ]();
            }
            
            return _date;
        },
        
        GetSelectedMonthYear: function () {
            var date = this.Validate();
            return date ? (date.getMonth() + 1) + '/' + date.getFullYear() : null;
        },

        Disable: function () {
            this._setOption("Disabled", true);
        },

        Enable: function () {
            this._setOption("Disabled", false);
        },

        ClearAllCallbacks: function () {
            for (var _opt in this.options) {
                if (_opt.indexOf('On') === 0) {
                    this.options[_opt] = $noop;
                }
            }
        },

        Clear: function () {
            this.element.val('');
            this._validationMessage.hide();
        },
        
        Toggle: function (event) {
            return this._visible ? this.Close(event) : this.Open(event);
        },
        
        Open: function (event) {
            if (!this.options.Disabled && !this._visible) {
	            var _elem = this.element, _opts = this.options;
            
	            // Allow the user to prevent opening the menu.
	            event = event || new $.Event();
	            if (_opts.OnBeforeMenuOpen.call(_elem[0], event) === false || event.isDefaultPrevented()) {
	                return false;
	            }
	            
				this._visible = true;
	            this._ajustYear(_opts);

	            // If there is an open menu close it first.
	            if (_openedInstance) {
	                _openedInstance.Close(event);
	            }

	            _openedInstance = this;
	            var _menu = this._monthPickerMenu;
	            this._showMonths();
                
	            $(document).on('click' + _eventsNs + this.uuid, $.proxy(this.Close, this))
                           .on('keydown' + _eventsNs + this.uuid, $.proxy(this._keyDown, this));
                
	            // Trun off validation so that clicking one of the months
	            // won't blur the input field and trogger vlaidation
	            // befroe the month was chosen (click event was triggered).
                // It is turned back on when Hide() is called.
                _elem.off('blur' + _eventsNs).focus();
                
                var _anim = _opts.ShowAnim || _opts.Animation,
                    _noAnim = _anim === 'none';
                
                // jQuery UI overrides jQuery.show and dosen't 
                // call the start callback.
                // see: http://api.jqueryui.com/show/
                _menu[ _noAnim ? 'fadeIn' : _anim ]({
                   duration: _noAnim ? 0 : this._duration(),
                   start: $.proxy(this._position, this, _menu),
                   complete: $.proxy(_opts.OnAfterMenuOpen, _elem[0])
                }); 
            }
            
            return false;
        },
        
        Close: function (event) {            
            if (this._visible) {
                var _menu = this._monthPickerMenu, 
                    _opts = this.options,
                    _elem = this.element;
                
                event = event || new $.Event();
                if (_opts.OnBeforeMenuClose.call(_elem[0], event) === false || event.isDefaultPrevented()) {
                    return;
                }
                
                this._visible = false;
                _openedInstance = null;
                $(document).off('keydown' + _eventsNs + this.uuid)
                           .off('click' + _eventsNs + this.uuid);
                
                this.Validate();
                _elem.on('blur' + _eventsNs, $.proxy(this.Validate, this));
                
                var _callback = $.proxy(_opts.OnAfterMenuClose, _elem[0]);
                
                var _anim = _opts.HideAnim || _opts.Animation;
                if (_anim === 'none') {
                    _menu.hide(0, _callback);
                } else {
                    _menu[ _anim ](this._duration(), _callback);                
                }
            }
        },

        // The API user can override this method to 
        // change the way buttons are disabled.
        SetDisabled: function (state, button) {
            try {
                button.button('option', 'disabled', state);
            } catch (e) {
                button.prop('disabled', state);
            }
        },
        
        /**
         * Methods the user can override to use a third party library
         * such as http://momentjs.com for parsing and formatting months.
         */
        MonthInputFormat: 'yy-mm',
         
        ParseMonth: function (str, format) {
            try {
                return $datepicker.parseDate('dd' + format, '01' + str);
            } catch (e) {
                return null;
            }
        },
        
        FormatMonth: function (date, format) {
            try {
                return $datepicker.formatDate(format, date) || null;
            } catch (e) {
                return null;
            }
        },
        
        /****** Private functions ******/

        _parseMonth: function(str) {
            return this.ParseMonth(str || this.element.val(), this.options.MonthFormat);
        },
        
        _formatMonth: function(date) {
            return this.FormatMonth(date || this._parseMonth(), this.options.MonthFormat);
        },

        _showIcon: function () {
            var _button = this._monthPickerButton;
                
            if (!_button.length) {
	            this._createButton();
            } else {
                _button[this.options.ShowIcon ? 'show' : 'hide']();
            }
            
            this._updateFieldEvents();
        },

        _createButton: function() {
	        if (!this.options.ShowIcon) return;
	        
	        var _oldButton = this._monthPickerButton.off(_eventsNs);
            var _btnOpt = this.options.Button, _elem = this.element;
            
            if ($.isFunction(_btnOpt)) {
                _btnOpt = _btnOpt.call(_elem[0], $.extend(true, {i18n: $.MonthPicker.i18n}, this.options));
            }
            
            var _removeOldBtn = false;
            this._monthPickerButton = ( _btnOpt instanceof $ ? _btnOpt : $(_btnOpt) )
                .each(function() {
                    if (!$.contains(document.body, this)) {
	                    _removeOldBtn = true;
                        $(this).insertAfter(_elem);
                    }
                })
                .on('click' + _eventsNs, $.proxy(this.Toggle, this));
            
            if (this._removeOldBtn) {
	            _oldButton.remove();
            }
            
            this._removeOldBtn = _removeOldBtn;
        },

        _updateFieldEvents: function() {
	        this.element.off('click' + _eventsNs);
            if (this.options.ShowOn === 'both' || !this._monthPickerButton.length) {
				this.element.on('click' + _eventsNs, $.proxy(this.Open, this));
            }
        },

        _createValidationMessage: function () {
            var _errMsg = this.options.ValidationErrorMessage, _elem = this.element;
            if ([null, ''].indexOf(_errMsg) === -1) {
                var _msgEl = $('<span id="MonthPicker_Validation_' + _elem[0].id + '" class="month-picker-invalid-message">' + _errMsg + '</span>');

				var _button = this._monthPickerButton;
                this._validationMessage = _msgEl.insertAfter(_button.length ? _button : _elem);
                
                _elem.on('blur' + _eventsNs, $.proxy(this.Validate, this));
            } else {
	            this._validationMessage.remove();
            }
        },
        
        _setRTL: function(value) {
            _applyArrowButton(this._prevButton, !value);
            _applyArrowButton(this._nextButton, value);
        },
        
        _keyDown: function() {
            var keyCode = $.ui.keyCode;
            switch (event.keyCode) {
                case keyCode.ENTER:
                    this._chooseMonth(new Date().getMonth() + 1);
                    this.Close();
                    break;
                case keyCode.ESCAPE:
                    this.Close();
                    break;
            }
        },
        
        _duration: function() {
            var _dur = this.options.Duration;

            if ($.isNumeric(_dur)) {
                return _dur;
            }

            return _dur in _speeds ? _speeds[ _dur ] : _speeds._default;
        },
        
        _position: _hasPosition ?
            function($menu) {
                var _defauts = this.options.IsRTL ? _RTL_defaultPos : _defaultPos;
                var _posOpts = $.extend(_defauts, this.options.Position);
                
                return $menu.position($.extend({of: this.element}, _posOpts));
            } :
            function($menu) {
                var _el = this.element, 
                    _css = { top: (_el.offset().top + _el.height() + 7) + 'px' };

                if (this.options.IsRTL) {
                    _css.left = (_el.offset().left-$menu.width()+_el.width() + 7) + 'px';
                } else {
                    _css.left = _el.offset().left + 'px';
                }
                
                return $menu.css(_css);
            },
                    
        _setUseInputMask: function () {
            if (!this._isMonthInputType) {
                try {
                    if (this.options.UseInputMask) {   
                        this.element.mask( this._formatMonth(new Date).replace(/\d/g, 9) );
                    } else {
                        this.element.unmask();
                    }
                } catch (e) {}
            }
        },

        _setDisabledState: function () {
            var isDisabled = this.options.Disabled;
            
            this.element[0].disabled = isDisabled;
            this.element[isDisabled ? 'addClass' : 'removeClass']('disabled');
            if (isDisabled) {
                this._validationMessage.hide();
            }
            
            this.Close();
            
            this._createButton();
            
            this.SetDisabled(isDisabled, this._monthPickerButton);
            this.options.OnAfterSetDisabled.call(this.element[0], isDisabled);
        },
        
        _getPickerYear: function () {
            return parseInt(this._yearContainer.text(), 10);
        },

        _setPickerYear: function (year) {
            this._yearContainer.text(year || new Date().getFullYear());
        },

        _chooseMonth: function (month) {
            var date = new Date(this._getPickerYear(), month-1);
            this.element.val(this._formatMonth( date )).blur();
            
            this.options.OnAfterChooseMonth.call(this.element[0]);
        },

        _chooseYear: function (year) {
            this._setPickerYear(year);
            this._showMonths();

            this.options.OnAfterChooseYear.call(this.element[0]);
        },

        _showMonths: function () {
            var _months = this._i18n('months');
            
            this._prevButton
                .attr('title', this._i18n('prevYear'))
                .off('click' + _eventsNs)
                .on('click' + _eventsNs, $.proxy(this._addToYear, this, -1));

            this._nextButton
                .attr('title', this._i18n('nextYear'))
                .off('click' + _eventsNs)
                .on('click' + _eventsNs, $.proxy(this._addToYear, this, 1));

            $('.year-container-all', this._monthPickerMenu).css('cursor', 'pointer');
            
            this._buttons.off(_eventsNs);

            var me = this, _onMonthClick = $.proxy(me._onMonthClick, me);
            $.each(_months, function(index, monthName) {
	            $(me._buttons[index])
	                .on( 'click' + _eventsNs, {month: index+1}, _onMonthClick )
	            	.button('option', 'label', monthName);
            });
            
            this._enableMonthButtons();
        },

        _showYearsClickHandler: function () {
            this._showYears();

            this.options.OnAfterChooseYears.call(this.element[0]);
        },

        _showYears: function () {
            var _currYear = this._getPickerYear(),
                _yearDifferential = -4,
                _firstYear = (_currYear + _yearDifferential),
                AMOUNT_TO_ADD = 5;
            
            var _minDate = this._MinMonth;
            var _maxDate = this._MaxMonth;
            var _minYear = _minDate ? _toYear(_minDate) : 0;
            var _maxYear = _maxDate ? _toYear(_maxDate) : 0;
            
            this._prevButton
                .attr('title', this._i18n('prev5Years'))
                .off('click' + _eventsNs)
                .on('click' + _eventsNs, $.proxy(this._addToYears, this, -AMOUNT_TO_ADD))
                .button('option', 'disabled', _minYear && (_firstYear - 1) < _minYear);

            this._nextButton
                .attr('title', this._i18n('next5Years'))
                .off('click' + _eventsNs)
                .on('click' + _eventsNs, $.proxy(this._addToYears, this, AMOUNT_TO_ADD))
                .button('option', 'disabled', _maxYear && (_firstYear + 12) -1 > _maxYear);

            $('.year-container-all', this._monthPickerMenu).css('cursor', 'default');
            this._buttons.off(_eventsNs);
	        
	        var _onClick = $.proxy(this._onYearClick, this);
            for (var _counter = 0; _counter < 12; _counter++) {
                var _year = _currYear + _yearDifferential, _btn = $( this._buttons[_counter] );
	            
                _btn.on( 'click' + _eventsNs, { year: _year }, _onClick )
                    .button('option', 'label', _year);
		        
                $(this._buttons[_counter]).button('option', 'disabled', (
                    (_minYear && _year < _minYear) || 
                    (_maxYear && _year > _maxYear)
                ));

                _yearDifferential++;
            }
        },
        
        _onMonthClick: function(event) {
	        this._chooseMonth(event.data.month);
	        this.Close(event);
        },
        
        _onYearClick: function(event) {
	        this._chooseYear(event.data.year);
        },
        
        _addToYear: function(amount) {
            var _year = this._yearContainer;
            _year.text(parseInt(_year.text()) + amount, 10);
            this.element.focus();
            
            this._enableMonthButtons();
            
            this.options['OnAfter' + (amount > 0 ? 'Next' : 'Previous') + 'Year'].call(this.element[0]);
        },

        _addToYears: function(amount) {
            var _year = this._yearContainer;
            _year.text(parseInt(_year.text()) + amount, 10);
            this._showYears();
            this.element.focus();

            this.options['OnAfter' + (amount > 0 ? 'Next' : 'Previous') + 'Years'].call(this.element[0]);
        },
        
        _ajustYear: function(_opts) {
	        var _year = _opts.StartYear || this.GetSelectedYear() || new Date().getFullYear();
            if (this._MinMonth !== null) {
            	_year = Math.max(_toYear(this._MinMonth), _year);
            }
            if (this._MaxMonth !== null) {
            	_year = Math.min(_toYear(this._MaxMonth), _year);
            }
            
            this._setPickerYear( _year );  
        },
        
        _enableMonthButtons: function() {
	        var _curYear = this._getPickerYear();
	        
	        var _minDate = this._MinMonth, _maxDate = this._MaxMonth;
	        
            this._prevButton.button('option', 'disabled', _minDate && _curYear == _toYear(_minDate));
            this._nextButton.button('option', 'disabled', _maxDate && _curYear == _toYear(_maxDate));
	        
	        for (var i = 0; i < 12; i++) {
	            // Disable the button if the month is not between the 
	            // min and max interval.
	            var _currMonth = ((_curYear * 12) + i);
	            $(this._buttons[i]).button('option', 'disabled', (
                    (_minDate && _currMonth < _minDate) || 
                    (_maxDate && _currMonth > _maxDate)
                ));
            }
        },
        
        _toMonth: function(_val) {
	        if (_val === null) {
                return _val;
            } else if (_val instanceof Date) {
                return _toMonth(_val);
            } else if ($.isNumeric(_val)) {
				return _toMonth(new Date) + parseInt(_val, 10);
            }
            
            var _date = this._parseMonth(_val);
            if (_date) {
                return _toMonth(_date);
            }

            return this._parsePeriod(_val);
        },
        
        _parsePeriod: function(_val, _initDate) {
            // Parsing is done by replacing tokens in the value to form
            // a JSON object with it's keys and values reversed 
            // (example '+1y +2m' will turn into {"+1":"y","+2":"m"})
            // After that we just revers the keys and values.
            var _json = _val.trim();
            _json = _json.replace(/y/i, '":"y"');
            _json = _json.replace(/m/i, '":"m"');

            try {
                var _rev = JSON.parse( '{"' + _json.replace(/ /g, ',"') + '}' ), obj = {};
            		
                for (var key in _rev) {
                    obj[ _rev[key] ] = key;
                }
            	
            	var _month = _toMonth(new Date);
            	_month += (parseInt(obj.m, 10) || 0);
            	return _month + (parseInt(obj.y, 10) || 0) * 12;
            } catch (e) {
                return false;
            }
        }
    });
    
    // Added in version 2.4.
    $.MonthPicker.VERSION = '2.6.2';
}(jQuery, window, document));
