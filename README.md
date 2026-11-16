# HaveSome Kubernetes

Guide francophone autonome pour développeurs : partir d'une intention déclarative, suivre sa réconciliation puis diagnostiquer le trafic et les déploiements. Direction visuelle : carte nautique nocturne, trajectoires et balises ; elle se distingue de la page éditoriale claire HaveSome Go. Lecture native et utilisable sans JavaScript ; l'atelier est une simulation locale sans connexion à un cluster.

## Parcours débutant

Le parcours introduit une application web, les objets Kubernetes, la lecture du YAML puis un chart Helm complet avant les chapitres de référence. Les commandes expliquent préalablement leurs outils, cibles et arguments, et distinguent le rendu local des opérations modifiant un cluster de test ; aucune n’est exécutée par le site. Les schémas sont accompagnés de descriptions textuelles.

## Fiche mémo

La fiche rassemble le modèle déclaratif, les objets essentiels et des commandes de consultation. Les noms `apprentissage`, `demo` et `voyage` sont des exemples à adapter ; vérifier le contexte et les autorisations avant toute commande. Les exemples ne sont jamais exécutés par le site. Les commandes restent sélectionnables sans JavaScript ; la copie exige HTTPS ou localhost.

## Vérifier et servir

Depuis ce dossier, installer avec `npm ci`, puis lancer `npm run build`. La toolchain Vite+ est locale au projet : aucune installation globale n’est nécessaire. Le répertoire `dist/` contient le site statique complet ; le bundle historique `assets/site.js` n’est pas écrasé. Pour développer : `npm run dev`. Pour vérifier le résultat construit : `npm run preview -- --host 127.0.0.1 --port 26387 --strictPort` puis `URL=http://127.0.0.1:26387/ npm run test:browser`. Exécuter aussi `python3 -m unittest discover -s tests -v`. La navigation de progression suit le chapitre à la ligne de lecture ; les exemples utilisent le composant React Code Block officiel shadcn/ui et les boutons de copie de la fiche utilisent son composant Button. Sans JavaScript, exemples, commandes, ancres et atelier restent accessibles ; le repère et la copie nécessitent JavaScript. La copie nécessite HTTPS ou localhost. Les manifestes sont des exemples d'apprentissage, pas une configuration de production prête à appliquer. Aucune commande n'est exécutée par le site.

## Contribuer

Modifier le contenu dans `index.html`, les styles dans `style.css` et les interactions dans `src/`. Avant de proposer un changement, installer les dépendances avec `npm ci`, exécuter `python3 -m unittest discover -s tests -v`, construire avec `npm run build` puis suivre le contrôle Brave ci-dessus. Conserver les sources officielles et vérifier que le parcours et la fiche restent lisibles sans JavaScript.

## Sources et visuels

Les références officielles sont liées dans le guide. Trois illustrations originales ont été générées par l’outil intégré Codex `image_gen` : les deux premiers schémas sur Mac, celui de la fiche localement. La version du modèle n’est pas exposée. Les PNG originaux et leurs consignes sont conservés dans `assets/` et `generation-notes.md`. Le schéma orbital est dessiné en CSS ; le logo Kubernetes provient du [dépôt officiel CNCF Artwork](https://github.com/cncf/artwork/tree/main/projects/kubernetes/icon/color). Le nom et le logo Kubernetes désignent le projet décrit, sans affiliation implicite.

## Publication

Le site statique est destiné au projet Vercel séparé `havesome-kubernetes`, par déploiement manuel du contenu de `dist/` après construction et revue. Aucun déploiement automatique Git n'est configuré par cette méthode ; une modification du dépôt ne publie pas le site à elle seule. Avant publication, réconcilier la fiche et le contenu public avec les autres déploiements en cours.

## Provenance du composant

`src/code-block.tsx` et `src/button.tsx` proviennent du registre officiel shadcn/ui (style base-nova, consulté le 12 novembre 2026), sous licence MIT. Les imports ont été adaptés à ce site, les icônes remplacées par Lucide et les libellés de copie traduits ; le rendu du composant conserve les couleurs du guide. La coloration existante est transmise au composant sous forme de nœuds ; aucun moteur de coloration n'est chargé à l'exécution. Registre : https://ui.shadcn.com/r/styles/base-nova/code-block.json et https://ui.shadcn.com/r/styles/base-nova/button.json.
