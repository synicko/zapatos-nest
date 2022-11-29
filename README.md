# POC Zapatos

## About Sqitch

[Sqitch](https://sqitch.org/download/) est un gestion de version pour les bases de données relationnelles 
Les commandes sont très proches de celles de git  

### Initialisation du projet

- installer sqitch
- créer une BDD Postgres nommée zapatos
- `cp sqitch.conf.dist sqitch.conf`
- `PGUSER=XXX PGPASSWORD=xxx sqitch deploy`

### Seed de la BDD

Depuis la racine du projet :

```sh
PGUSER=XXX PGPASSWORD=xxx psql -d zapatos -f scripts/seed.sql
```

## About Zapatos

[Zapatos](https://jawj.github.io/zapatos/) est un tofu d'ORM très bien intégré à TypeScript permettant d'effectuer des requêtes en déléguant un maxximum de la charge de calcul à Postgres

Actuellement, la conversion camelCase/snake_case est implémentée dans une branche de développement, la fonctionnalité devrait bientôt faire partie de la release officielle  
La version buildée de cette branche est dans le dossier `/zapatos`, un script postinstall va copier ce dossier dans `/node_modules` en attendant mieux

### Générer les types 

Pour Zapatos, la source de vérité est la BDD. Un script est prévu pour analyser la structure de la BDD et créer les types utilisables dans l'application typescript :

- `cp zapatosconfig.json.dist zapatosconfig.json`
- `yarn generate-types`

Un fichier `schema.d.ts` va être créé dans `src/zapatos`. Ce fichier est accessible comme un module depuis le dossier `src`


### Pros and cons

pros :
- Types auto-générés
- souplesse de slonik mais bien meilleure intégration avec TypeScript
- très bonne gestion des schémas
- vues ajoutées et utilisées comme des tables
- possibilité d'exécuter directement du sql
- utilisation massive du type JSON de postgres
- le SGBD effectue la majeure partie des calculs (switch camelCase/snake_case, requêtes imbriquées avec JOIN LATERAL)

cons :
- switch camelCase/snake_case dans une branche de dev, devrait être ajouté prochainement dans la version officielle
- foreign table reconnue que si elle a été générée avec `CREATE FOREIGN TABLE`

```sql
CREATE FOREIGN TABLE localSchema.table ()
INHERITS (foreignSchema.table)
SERVER "foreign_server";
```
pas quand on importe le schéma complet

- les requêtes SQL sont un peu plus complexes, pas forcément évident à debugger au 1er abord

## Lancement de l'appli

```sh
yarn start:dev
```