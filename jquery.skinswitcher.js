/**
 * jQuery Skinswitcher
 * http://github.com/cleentfaar/jquery-skinswitcher/
 *
 * A plugin to ease the switching of skins on a website by the user.
 *
 * Copyright (c) 2013 Cas Leentfaar; Licensed MIT, GPL
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
(function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'skinswitcher',
        defaults = {
            children: 'li a',
            urlAttribute: 'data-filename',
            stylesheetTarget: '#SkinswitcherTarget',
            debug: false
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var settings = this.settings;
            var $target = $(settings.stylesheetTarget);
            if ($target.length !== 1) {
                this.writeLog('Could not find the stylesheet target ('+settings.stylesheetTarget+')');
                return;
            }
            this.$element.addClass('skinswitcher');
            var currentFile = this.basename($target.attr('href'));
            var currentSelector = '['+settings.urlAttribute+'$="'+currentFile+'"]';
            $(settings.children+currentSelector, this.$element).addClass('current');
            $(settings.children, this.$element).each(function() {
                this.writeLog('Grabbing value from child attribute '+settings.urlAttribute);
                var attributeValue = $(this).attr(settings.urlAttribute);
                if (attributeValue === undefined) {
                    this.writeLog('No "'+settings.urlAttribute+'" attribute set for child with text "'+$(this).text()+'"');
                } else {
                    $(this).click(function(event) {
                        $(settings.children, this.$element).removeClass('current');
                        $(this).addClass('current');
                        event.preventDefault();
                        var newFile = attributeValue;
                        var newHref = $target.attr('href').replace(currentFile, newFile);
                        $target.attr('href', newHref);
                        this.writeLog('Changing current stylesheet from '+currentFile+' to '+newFile);
                        currentFile = newFile;
                    });
                }
            });
            this.writeLog('Successfully intitiated the skinwitcher');
        },
        basename: function(path) {
            return path.replace(/\\/g,'/').replace( /.*\//, '' );
        },
        writeLog: function(message) {
            if (this.settings.debug === true) {
                if (console !== undefined) {
                    console.log(message);
                } else {
                    return;
                }
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
