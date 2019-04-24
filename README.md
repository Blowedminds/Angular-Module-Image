# Angular-Module-Image

This module helps you to manage image contents on the site.

**Required Packages**
1. "cropperjs": "^1.5.1",

**Required Modules**
1. fmblog-frontend-navigation
2. fmblog-frontend-shared
3. Angular-Module-Core

**Functionalities**
1. Add, Edit (crop) , Delete image

**Installation**
1. Add the module to Angular Project as a submodule. 
`git submodule add https://github.com/bwqr/Angular-Module-Image src/app/image`
2. Import `ImageModule` from inside `AppModule`.
3. Add following routes to `src/app/routes.ts`  
`   
image: {
    url: 'image/',
    image: { url: 'image/' },
    thumb: { url: 'thumb/' },
    images: { url: 'images/' },
    edit: { url: 'edit/' }
}
`
4. Import the cropperjs css files into angular.json file, eg.  
`
"node_modules/cropperjs/dist/cropper.css"
`