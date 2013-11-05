#
# *  jQuery Skinswitcher - v1.0
# *  http://github.com/cleentfaar/jquery-skinswitcher
# *
# *  Made by Cas Leentfaar
# *  Under MIT License
# 

# the semi-colon before function invocation is a safety net against concatenated
# scripts and/or other plugins which may not be closed properly.
(($, window, document, undefined_) ->

  # undefined is used here as the undefined global variable in ECMAScript 3 is
  # mutable (ie. it can be changed by someone else). undefined isn't really being
  # passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  # can no longer be modified.

  # window and document are passed through as local variable rather than global
  # as this (slightly) quickens the resolution process and can be more efficiently
  # minified (especially when both are regularly referenced in your plugin).

  # Create the defaults once

  # The actual plugin constructor
  Plugin = (element, options) ->
    @element = element
    @$element = $(element)

    # jQuery has an extend method which merges the contents of two or
    # more objects, storing the result in the first object. The first object
    # is generally empty as we don't want to alter the default options for
    # future instances of the plugin
    @settings = $.extend({}, defaults, options)
    @_defaults = defaults
    @_name = pluginName
    @init()
  pluginName = "skinswitcher"
  defaults =
    children: "li a"
    urlAttribute: "data-filename"
    stylesheetTarget: "#SkinswitcherTarget"
    debug: false

  Plugin:: =
    init: ->
      settings = @settings
      $target = $(settings.stylesheetTarget)
      if $target.length isnt 1
        console.log "Could not find the stylesheet target (" + settings.stylesheetTarget + ")"  if settings.debug is true
        return
      @$element.addClass "skinswitcher"
      currentFile = @basename($target.attr("href"))
      currentSelector = "[" + settings.urlAttribute + "$=\"" + currentFile + "\"]"
      console.log currentSelector + " vs " + currentFile
      $(settings.children + currentSelector, @$element).addClass "current"
      $(settings.children, @$element).each ->
        console.log "Grabbing value from child attribute " + settings.urlAttribute  if settings.debug is true
        attributeValue = $(this).attr(settings.urlAttribute)
        if attributeValue is `undefined`
          console.log "No \"" + settings.urlAttribute + "\" attribute set for child with text \"" + $(this).text() + "\""  if settings.debug is true
        else
          $(this).click (event) ->
            $(settings.children, @$element).removeClass "current"
            $(this).addClass "current"
            event.preventDefault()
            newFile = attributeValue
            newHref = $target.attr("href").replace(currentFile, newFile)
            $target.attr "href", newHref
            console.log "Changing current stylesheet from " + currentFile + " to " + newFile  if settings.debug is true
            currentFile = newFile


      console.log "Successfully intitiated the skinwitcher"  if settings.debug is true

    basename: (path) ->
      path.replace(/\\/g, "/").replace /.*\//, ""


  # A really lightweight plugin wrapper around the constructor,
  # preventing against multiple instantiations
  $.fn[pluginName] = (options) ->
    @each ->
      $.data this, "plugin_" + pluginName, new Plugin(this, options)  unless $.data(this, "plugin_" + pluginName)

) jQuery, window, document