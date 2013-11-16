/*global module, test, expect */
/*global ok, start, stop */

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
            teardown;

        teardown = function() {
            var instance = $.data($('#Skinswitcher'), 'plugin_skinswitcher');

            if (instance) {
                instance.destroy();
            }
        };
        module('Skinswitcher Options', { teardown: teardown });

        test('children', function() {
            $('#Skinswitcher').skinswitcher({
                'children': 'div a'
            });
            var instance = $.data($('#Skinswitcher'), 'plugin_skinswitcher');
            ok(instance.settings.children === 'div a', 'children selector was properly set to "div a".');
        });

    });
})(jQuery);
