/**  
 * jQuery saveButtonToggle Plugin
 * Version: 0.0.1
 * URL: https://github.com/scottwb/jquery.saveButtonToggle
 * Descripton: Enables/disables a form's save button based on the
 *             required fields being filled in.
 * Requires: jQuery
 * Author: Scott W. Bradley (http://www.google.com/profiles/scottwb)
 * Copyright: Copyright (c) 2011 Scott W. Bradley
 * License: MIT
 *
 * Usage:
 *
 *   * Add the 'js_required' class to all input elements in the
 *     form that must have a non-blank value before the save button
 *     can be enabled. E.g.:
 *
 *       <input type="text" class="js_required" name="username"/>
 *
 *   * Add the 'js_save' class to the submit/button element in the
 *     form that should be disabled when one or more of the required
 *     fields are blank. E.g.:
 *
 *       <input type="submit" class="js_save" name="save" value="Save"/>
 *
 *   * Optional: Add a progress="..." attribute to the submit/button
 *     element and when the form is submitted, the button will become
 *     disabled and its text will change to the specified text. E.g.:
 *
 *       <input type="submit" class="js_save" progress="Saving..." .../>
 *
 *   * Add javascript call to init the a form with this plugin. E.g.:
 *
 *       $(form_selector).saveButtonToggle();
 *
 */
(function($) {

    ////////////////////////////////////////////////////////////
    // Constants
    ////////////////////////////////////////////////////////////
    var PLUGIN_NAME = 'saveButtonToggle';


    ////////////////////////////////////////////////////////////
    // Private Methods
    ////////////////////////////////////////////////////////////
    function setSaveButtonState($this) {
        var data     = $this.data(PLUGIN_NAME);
        if (data.saveButton.attr('progress') == data.saveButton.val()) {
            return;
        }

        var disabled = false;
        data.requiredFields.each(function() {
            var value = $(this).val();
            if (!value || value.match(/^\s*$/)) {
                disabled = true;
            }
        });
        if (disabled) {
            data.saveButton.attr('disabled', true);
        }
        else {
            data.saveButton.removeAttr('disabled');
        }
    }


    ////////////////////////////////////////////////////////////
    // Public Methods
    ////////////////////////////////////////////////////////////
    var publicMethods = {
        init: function(options) {return this.each(function() {
            var $this = $(this);
            var $requiredFields = $this.find('.js_required');
            var $saveButton     = $this.find('.js_save');

            var data  = $this.data(PLUGIN_NAME);
            if (!data) {
                $this.data(PLUGIN_NAME, {
                    requiredFields : $requiredFields,
                    saveButton     : $saveButton
                });
            }

            $requiredFields.bind('keyup.' + PLUGIN_NAME, function() {
                setSaveButtonState($this);
            });

            $requiredFields.bind('change.' + PLUGIN_NAME, function() {
                setSaveButtonState($this);
            });

            var progressText = $saveButton.attr('progress');
            if (progressText) {
                $this.bind('submit.' + PLUGIN_NAME, function() {
                    $saveButton.attr('disabled', true);
                    $saveButton.val(progressText);
                    return true;
                });
            }

            setSaveButtonState($this);

            // REVISIT: This little hack aims to catch a change to the
            //          form made by the browser's autofill, which doesn't
            //          raise the other events we care about (eg onchange)
            setTimeout(
                function() {
                    setSaveButtonState($this);
                },
                500
            );
        })},

        destroy: function() {return this.each(function() {
            var $this = $(this);
            var data  = $this.data(PLUGIN_NAME);
            $this.unbind('.' + PLUGIN_NAME);
            data.requiredFields.unbind('.' + PLUGIN_NAME);
            $this.removeData(PLUGIN_NAME);
        })}
    };


    ////////////////////////////////////////////////////////////
    // Plugin Initialization
    ////////////////////////////////////////////////////////////
    $.fn[PLUGIN_NAME] = function(method) {
        if (publicMethods[method]) {
            return publicMethods[method].apply(
                this,
                Array.prototype.slice.call(arguments, 1)
            );
        }
        else if (typeof method == 'object' || !method) {
            return publicMethods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.' + PLUGIN_NAME);
        }
    };
})(jQuery);
