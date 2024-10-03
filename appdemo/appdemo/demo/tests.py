from django.test import TestCase

# Create your tests here.

class TestPostRequest(TestCase):
    def test_insert_data(self):
        # Create a test client
        response = self.client.post('/insert_data/', {
            'swim_id': 1,
            'front': 5,
            'back': 6,
            'react': 7
        })

        # Check the response
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Data inserted successfully!', response.content)
