This is an exercise I did for an interview for a Senior UI role.

Project files:
/dist/ = compiled files
/src/scss/ = Scss files
/src/img/ = image assets
/src/index.html = Main page for product listing
/src/index.js = All the Vanilla Javascript for the project
/package.json = Info for node dependencies. (Run npm install to load node_modules)
/webpack.config.js = Info for the webpack configuration

Instructions
- Clone/save project to your machine
- npm install (installs node dependencies)
- npm run dev (run project locally)
- npm run build (create final files in /dist/)

The instructions for the exercise were:

Using vanilla JavaScript (no third party plugins, ES6 is encouraged ), HTML and CSS, build
a product listing page and shopping cart to the following specification:
Product data must be requested from the following api endpoint (via some form of
http request):
https://j-parre.myshopify.com/products.json
Products must be rendered on a single page, displaying the following attributes in the
style of the attached design(page 2):
Product Title
Product Image
Must be able to sort products by the following:
Price High - Low
Price Low - High
Title A - Z
Title Z - A
Must be able to add/remove multiple products to/from a shopping cart:
Shopping cart must render a list of products in the cart
Displaying the product title
Shopping cart must render a count for the total number of products in the
shopping cart