# Icon System

* All icons are svg
* Put icons in src/assets/icons folder. 
* Use **dash** instead of **underscore** to separate words in icon name
* Command to create sprite is - **npm run buildSprite**
* Icons sprite file is automatically loaded in base.pug - hence in all pages
* Use **srs/blocks/library/icon** mixin to show icon

# Project Structure

dist/
src/
  assets/
    fonts/
    icons/
    img/
    sprites/
  blocks/
    library/    # Basic building blocks
    project/    # Blocks specific to current project. Created from library blocks
  data/
  styles/
  app.js
  app.scss
  base.pug
  uikit.pug

# Component workflow

1. Components are divided into 2 categories:
  1.1. **Library components** - basic building blocks that can be used in many projects
  1.2. **Project components** - building blocks specifically created for current project
2. Each component must have <comonent-name>.pug file, which contains a **mixin**[https://pugjs.org/language/mixins.html]
3. Each component can have <comonent-name>.scss file. This file contains styles for this component only. Style naming convention is **BEM**[https://ru.bem.info/methodology/naming-convention/]
4. Each component can have <component-name>.js file. This file contains js class with the following structure:

```javascript
  class <ComponentName> {
    constructor($el, app) {
      this._id = uuid()
      this.$el = $el
      this.app = app
      this.init()
    }

    get id() {
      return this._id
    }

    init() {
      this._attachEventHandlers()

      // add id to dom component for future reference
      this.$el.setAttribute('data-compoent-id', this.id)
    }

    _attachEventHandlers() { }
  }
```
  4.1. Each class name must have unique id. 
  4.2. Component id must be attached to underlying dom element for future reference
5. Each js file must have default exported function. It's purpose is to initialize all components
6. All component styles are automatically included in app.scss file using glob pattern.
7. All component js classes are automatically included in app.js file using glob pattern.

# Pug mixin usage

1. Every mixin has **params** & **attributes**[https://pugjs.org/language/mixins.html#mixin-attributes]
2. Attributes are proxied to underlying dom element. Hence, attributes - are native for underlying dom element 
3. Params are used to configure component behaviour. Params are documented at mixin module
4. Mixin call examples:
  4.1. With params only:          +some-mixin({name: 'some name', param1: 'param1 value'})   
  4.2. With attributes only:      +some-mixin(attribute1= 'attribute1 value', attribute2= 'attribute2 value')
  4.3. With params & attributes:  
    +some-mixin({name: 'some name', param1: 'param1 value'})(attribute1= 'attribute1 value', attribute2= 'attribute2 value') 
