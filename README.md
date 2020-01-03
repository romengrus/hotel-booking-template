# Hotel Booking Template

Main purpose of this project is to learn the basics of:

- html5
- scss
- vanilla js
- pug
- component based design
- parcel advanced configuration

# Installation

1. clone this repository

```bash
  git clone git@github.com:romengrus/hotel-booking-template.git --depth=1
```

2. install dependencies

```bash
  npm install
```

3. start parcel

```bash
  npm run start
```

4. open `localhost:1234` in browser

# Icon System

- All icons are svg
- Put icons in src/assets/icons folder.
- Use **dash** instead of **underscore** to separate words in icon name
- Command to create sprite is - **npm run buildSprite**
- Icons sprite file is automatically loaded in base.pug - hence in all pages
- Use **srs/blocks/library/icon** mixin to show icon

# Project Structure

```
dist/           # Generated code
src/            # Source code
  assets/
    fonts/
    icons/
    img/
    sprites/
  components/
    library/    # Basic building blocks
    project/    # Blocks specific to current project
  data/         # Data used inside pug
  i18n/         # Internationalization files
  l10n/         # Localization functions
  layout/
  pages/
  scripts/
  styles/
  uikit/        # UIKit page with styles
  index.pug     # Main entry page
```

# Component workflow

1. Components are divided into 2 categories:
   1. **Library components** - basic building blocks that can be used in many projects
   2. **Project components** - building blocks specifically created for current project
2. Each component must have <comonent-name>.pug file, which contains a **mixin**[https://pugjs.org/language/mixins.html]
3. Each component can have <comonent-name>.scss file. This file contains styles for this component only. Style naming convention is **BEM**[https://ru.bem.info/methodology/naming-convention/]
4. Each component can have <component-name>.js file. This file contains js class with the following structure:

```javascript
  class <ComponentName> {
    constructor($el, app) {
      this.$el = $el
      this.init()
    }

    static getQuerySelector() {
      return 'css class name';
    }

    init() {
      this._attachEventHandlers()
    }

    _attachEventHandlers() { }
  }
```

5. All component styles are automatically included in app.scss file using glob pattern.
6. All component js classes are automatically included in app.js file using glob pattern.

# Pug mixin usage

1. Every mixin has **params** & **attributes**[https://pugjs.org/language/mixins.html#mixin-attributes]
2. Attributes are proxied to underlying dom element. Hence, attributes - are native for underlying dom element
3. Params are used to configure component behaviour. Params are documented at mixin module
4. Mixin call examples:
   1. **With params only**: +some-mixin({name: 'some name', param1: 'param1 value'})
   2. **With attributes only**: +some-mixin(attribute1= 'attribute1 value', attribute2= 'attribute2 value')
   3. **With params & attributes**:  
      +some-mixin({name: 'some name', param1: 'param1 value'})(attribute1= 'attribute1 value', attribute2= 'attribute2 value')
