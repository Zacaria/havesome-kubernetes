# HaveSome Kubernetes

Guide francophone autonome pour développeurs : partir d'une intention déclarative, suivre sa réconciliation puis diagnostiquer le trafic et les déploiements. Direction visuelle : carte nautique nocturne, trajectoires et balises ; elle se distingue de la page éditoriale claire HaveSome Go. Lecture native et utilisable sans JavaScript ; l'atelier est une simulation locale sans connexion à un cluster.

## Parcours débutant

Le parcours introduit une application web, les objets Kubernetes, la lecture du YAML puis un chart Helm complet avant les chapitres de référence. Les commandes expliquent préalablement leurs outils, cibles et arguments, et distinguent le rendu local des opérations modifiant un cluster de test ; aucune n’est exécutée par le site. Les schémas sont accompagnés de descriptions textuelles.

## Fiche mémo

La fiche rassemble le modèle déclaratif, les objets essentiels et des commandes de consultation. Les noms `apprentissage`, `demo` et `voyage` sont des exemples à adapter ; vérifier le contexte et les autorisations avant toute commande. Les exemples ne sont jamais exécutés par le site. Les commandes restent sélectionnables sans JavaScript ; la copie exige HTTPS ou localhost.

## Vérifier et servir

Depuis ce dossier, `npm ci --workspaces=false` puis `npm run build` génèrent les ressources du site. Le fichier `assets/site.js` conservé dans ce dépôt correspond au bundle actuellement publié. Une reconstruction isolée avec le fichier de verrouillage produit actuellement des octets différents et remplace directement `assets/site.js` : conserver ou restaurer le bundle publié avant toute publication ; ne pas considérer le bundle reconstruit comme identique à la production sans comparaison et vérification. Exécuter `python3 -m unittest discover -s tests -v`, puis `python3 -m http.server 8000`. La navigation de progression suit le chapitre à la ligne de lecture ; les exemples utilisent le composant React Code Block du registre officiel shadcn/ui. Sans JavaScript, les exemples colorés et les ancres restent lisibles ; le repère et la copie nécessitent JavaScript. La copie nécessite HTTPS ou localhost. Les manifestes sont des exemples d'apprentissage, pas une configuration de production prête à appliquer. Aucune commande n'est exécutée par le site.

## Sources et visuels

Les références officielles sont liées dans le guide. Trois illustrations originales ont été générées par l’outil intégré Codex `image_gen` : les deux premiers schémas sur Mac, celui de la fiche localement. La version du modèle n’est pas exposée. Les PNG originaux et leurs consignes sont conservés dans `assets/` et `generation-notes.md`. Le schéma orbital est dessiné en CSS ; le logo Kubernetes provient du [dépôt officiel CNCF Artwork](https://github.com/cncf/artwork/tree/main/projects/kubernetes/icon/color). Le nom et le logo Kubernetes désignent le projet décrit, sans affiliation implicite.

## Publication

Le site statique est destiné au projet Vercel séparé `havesome-kubernetes`, par déploiement manuel des fichiers `index.html`, `style.css`, `assets/kubernetes.svg`, `assets/kubernetes-cluster.png`, `assets/helm-rendering.png`, `assets/kubernetes-cheatsheet.png`, `assets/SHADCN-LICENSE.txt`, `assets/memo.js` et `assets/site.js` (bundle publié conservé dans le dépôt). Aucun déploiement automatique Git n'est configuré par cette méthode ; une modification du dépôt ne publie pas le site à elle seule.

## Provenance du composant

`src/code-block.tsx` et `src/button.tsx` proviennent du registre officiel shadcn/ui (style base-nova, consulté le 12 novembre 2026), sous licence MIT. Les imports ont été adaptés à ce site, les icônes remplacées par Lucide et les libellés de copie traduits ; le rendu du composant conserve les couleurs du guide. La coloration existante est transmise au composant sous forme de nœuds ; aucun moteur de coloration n'est chargé à l'exécution. Registre : https://ui.shadcn.com/r/styles/base-nova/code-block.json et https://ui.shadcn.com/r/styles/base-nova/button.json.
