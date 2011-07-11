## Overview

This is a simple jQuery plugin that disables the submit button in a form when any of the input fields annotated as required are blank, and enables it when all of them are non-blank. It also optionally disables the button after being clicked, while the form is presumably being submitted, and changes its text to a configurable 'pending' message.

## Usage

  * Add the `js_required` class to all input elements in the form that must have a non-blank value before the save button can be enabled. E.g.:
```html
<input type="text" class="js_required" name="username"/>
```

  * Add the `js_save` class to the submit/button element in the form that should be disabled when one or more of the required fields are blank. E.g.:

```html
<input type="submit" class="js_save" name="save" value="Save"/>
```

  * Optional: Add a `progress="..."` attribute to the submit/button element, and when the form is submitted, the button will become disabled and its text will change to the specified text. E.g.:

```html
<input type="submit" class="js_save" progress="Saving..." name="save" value="Save"/>
```

  * Add a javascript call to init a form with this plugin: E.g.:

```javascript
$(form_selector).saveButtonToggle();
```

## Note on Patches/Pull Requests
 
* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a
  future version unintentionally.
* Commit, do not mess with rakefile, version, or history.
  (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
* Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2011 Scott W. Bradley. MIT License.
