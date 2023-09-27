import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  ext: {
    loadimpact: {
      // Project: Default project
      projectID: 3660696,
      // Test runs with the same name groups test runs together.
      name: 'Test 25/09/2023-20:47:17)'
    }
  }
};

export default function() {
  http.get('http://test.k6.io');
  sleep(1);
}