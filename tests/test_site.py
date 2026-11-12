import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids = set(); self.fragments = []; self.text = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'a' and a.get('href', '').startswith('#'): self.fragments.append(a['href'][1:])
    def handle_data(self, data): self.text.append(data)

class SiteTest(unittest.TestCase):
    def test_beginner_path_precedes_reference_and_contains_complete_chart(self):
        html = (ROOT / 'index.html').read_text()
        self.assertLess(html.index('id="bases"'), html.index('id="architecture"'))
        for term in ('id="yaml"', 'id="helm"', 'Chart.yaml', 'values.yaml', 'helm template', 'helm rollback', 'targetPort', 'port-forward service/demo 8080:80'):
            self.assertIn(term, html)
        self.assertIn('aucune commande', html.lower())

    def test_command_reading_precedes_execution_examples(self):
        html = (ROOT / 'index.html').read_text()
        for explanation, command in (
            ('outil en ligne de commande', 'kubectl config current-context'),
            ('port local', 'kubectl -n apprentissage port-forward service/demo 8080:80'),
            ('dossier courant', 'helm lint ./demo-chart'),
            ('remplace la valeur', 'helm upgrade demo ./demo-chart -n apprentissage --set replicaCount=2'),
            ('numéro de révision', 'helm rollback demo 1 -n apprentissage'),
            ('rollout status', 'kubectl -n apprentissage rollout status deployment/voyage'),
            ('--previous', 'kubectl logs NOM --previous'),
        ):
            self.assertIn(explanation, html, f'explication absente : {explanation}')
            self.assertLess(html.index(explanation), html.index(command), explanation)

    def test_safe_example_prerequisites_precede_mutations(self):
        html = (ROOT / 'index.html').read_text()
        for explanation, command in (
            ('namespace de test dédié et vide', 'kubectl -n apprentissage apply -f demo.yaml'),
            ('nom <code>voyage</code> est libre', 'kubectl -n apprentissage apply -f deployment.yaml'),
            ('Enregistrez le fichier adapté', 'kubectl -n apprentissage apply -f deployment.yaml'),
        ):
            self.assertTrue(explanation in html, explanation)
            self.assertLess(html.index(explanation), html.index(command), explanation)

    def test_reading_path_and_fragment_links(self):
        path = ROOT / 'index.html'
        self.assertTrue(path.exists(), 'Le guide doit être publié')
        page = Page(); page.feed(path.read_text())
        self.assertFalse(set(page.fragments) - page.ids)
        for chapter in ('architecture', 'workloads', 'reseau', 'stockage', 'securite', 'exploitation', 'atelier'):
            self.assertIn(chapter, page.ids)
        self.assertIn('simulation', ' '.join(page.text).lower())

if __name__ == '__main__': unittest.main()
