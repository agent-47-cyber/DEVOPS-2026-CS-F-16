const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to handle fetch responses consistently
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const res = await fetch(url, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data.error || `HTTP error! status: ${res.status}`;
    const err = new Error(errorMsg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

/**
 * Fetch all projects or featured projects
 * @param {Object} [params]
 * @param {boolean} [params.featured]
 */
export async function getProjects(params = {}) {
  let endpoint = '/projects';
  if (params.featured !== undefined) {
    endpoint += `?featured=${Boolean(params.featured)}`;
  }
  return request(endpoint);
}

/**
 * Fetch a single project by ID
 * @param {string} id
 */
export async function getProject(id) {
  return request(`/projects/${id}`);
}

/**
 * Fetch all skills
 */
export async function getSkills() {
  return request('/skills');
}

/**
 * Submit a contact form message
 * @param {Object} messageData - { name, email, message }
 */
export async function submitMessage(messageData) {
  return request('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData)
  });
}
