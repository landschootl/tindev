# tindev-api

## Développement

Avant de commencer à développer, il faut installer :

1. [Node.js][]: Pour lancer un serveur web de développement et construire les sources.
2. [Yarn][]: Pour gérer les dépendances NPM

Il suffit ensuite d'installer les dépendances :

    yarn install


Enfin, il faut lancer deux commandes en même temps pour avoir un serveur de développement qui se met à jour au changement des sources :

    ./mvnw
    yarn start

### Ajout de librairies

Il faut l'ajouter au package.json :

    yarn add --exact nom-librairie

On peut également ajouter les définitions de type Typescript :

    yarn add --dev --exact @types/leaflet

Enfin, il faut importer les fichiers JS et CSS

Editer [src/main/webapp/app/vendor.ts](src/main/webapp/app/vendor.ts) :
~~~
import 'nom-librairie/dist/nom-librairie.js';
~~~

Editer [src/main/webapp/content/css/vendor.css](src/main/webapp/content/css/vendor.css) :
~~~
@import '~nom-librairie/dist/nom-librairie.css';
~~~

## Production

Pour optimiser l'application en production il faut lancer :

    ./mvnw -Pprod clean package

Cela va concaténer l'ensemble des sources, il suffira simplement de lancer :

    java -jar target/*.war

Ensuite, allez sur [http://localhost:8080](http://localhost:8080) dans votre navigateur.

## Tests

Pour lancer les tests de l'application :

    ./mvnw clean test

[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Angular CLI]: https://cli.angular.io/
[BrowserSync]: http://www.browsersync.io/
[Karma]: http://karma-runner.github.io/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/
[Leaflet]: http://leafletjs.com/
[DefinitelyTyped]: http://definitelytyped.org/
