/*global module, test, expect */
/*global ok, equal, deepEqual, start, stop */

/**
 * ======== A Handy Little QUnit Reference ========
 * http://docs.jquery.com/QUnit
 * Test methods:
 *   expect(numAssertions)
 *   stop(increment)
 *   start(decrement)
 * Test assertions:
 *   ok(value, [message])
 *   equal(actual, expected, [message])
 *   notEqual(actual, expected, [message])
 *   deepEqual(actual, expected, [message])
 *   notDeepEqual(actual, expected, [message])
 *   strictEqual(actual, expected, [message])
 *   notStrictEqual(actual, expected, [message])
 *   raises(block, [expected], [message])
 */

/* jQuery Skinswitcher Tests */
(function($) {
    $(function() {
        var system = $({}),
            delay = 100, // ms
            teardown;

        teardown = function() {
            var instance = $('#Skinswitcher').data('plugin_skinswitcher');

            if (instance) {
                instance.destroy();
            }
        };


        module('Skinswitcher API', { teardown: teardown });

        test('skinswitcher instance', function() {
            var skinswitcher = $('#Skinswitcher').skinswitcher(),
                instance = skinswitcher.skinswitcher();
            ok(typeof instance.widget !== 'undefined', 'Get access to the instance object.');
        });

        test('skinswitcher destroy', function() {
            var skinswitcher = $('#Skinswitcher').skinswitcher();
            ok(skinswitcher.data('plugin_skinswitcher') !== null, 'Skinswitcher instance exists.');
            skinswitcher.skinswitcher().destroy();
            ok(skinswitcher.data('plugin_skinswitcher') === null, 'Skinswitcher instance no longer exists.');
        });

        module('Skinswitcher Options', { teardown: teardown });

        test('children', function() {
            var skinswitcher, instance;
            skinswitcher = $('#Skinswitcher').skinswitcher({ children:'div a' });
            instance = skinswitcher.skinswitcher();

            ok(instance.options.children === 'div a', 'children selector was properly set to "div a".');
        });


        module('Skinswitcher Event Handlers');

        test('opened/closed', function() {
            var skinswitcher = $('#Skinswitcher').skinswitcher(),
                instance = skinswitcher.skinswitcher(),
                selected = null,
                expected = 8;

            expect(expected);
            stop();

            system.queue('test', []);
            system.queue('test', function(next) {
                ok(instance.closed(), 'Skinswitcher starts closed.');
                skinswitcher.focus();
                next();
            });

            system.queue('test', function(/*next*/) { start(); }).dequeue('test');
        });
    });
})(jQuery);
