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