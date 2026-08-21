const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to handle fetch responses and authorization headers consistently
 */
async function request(endpoint, options = {}, token = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Use passed token or fallback to localStorage token
  const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('portfolio_admin_token') : null);

  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options.headers || {})
  };

  const res = await fetch(url, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401) {
      // Auto-clear invalid/expired token from storage if rejected by backend
      if (typeof window !== 'undefined') {
        localStorage.removeItem('portfolio_admin_token');
        localStorage.removeItem('portfolio_admin_user');
      }
    }

    const errorMsg = data.error || `HTTP error! status: ${res.status}`;
    const err = new Error(errorMsg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

/* ==========================================================================
   AUTHENTICATION API
   ========================================================================== */

/**
 * Admin login with username & password
 * @param {Object} credentials - { username, password }
 */
export async function loginAdmin(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
}

/* ==========================================================================
   PROJECTS API (Public & Protected CRUD)
   ========================================================================== */

/**
 * Fetch all projects or filtered by featured status
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
 * Create a new project (Protected)
 * @param {Object} projectData
 * @param {string} [token]
 */
export async function createProject(projectData, token) {
  return request('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData)
  }, token);
}

/**
 * Update an existing project (Protected)
 * @param {string} id
 * @param {Object} projectData
 * @param {string} [token]
 */
export async function updateProject(id, projectData, token) {
  return request(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData)
  }, token);
}

/**
 * Delete a project (Protected)
 * @param {string} id
 * @param {string} [token]
 */
export async function deleteProject(id, token) {
  return request(`/projects/${id}`, {
    method: 'DELETE'
  }, token);
}

/* ==========================================================================
   SKILLS API (Public & Protected CRUD)
   ========================================================================== */

/**
 * Fetch all skills
 */
export async function getSkills() {
  return request('/skills');
}

/**
 * Create a new skill (Protected)
 * @param {Object} skillData - { name, category, level }
 * @param {string} [token]
 */
export async function createSkill(skillData, token) {
  return request('/skills', {
    method: 'POST',
    body: JSON.stringify(skillData)
  }, token);
}

/**
 * Update a skill (Protected)
 * @param {string} id
 * @param {Object} skillData
 * @param {string} [token]
 */
export async function updateSkill(id, skillData, token) {
  return request(`/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(skillData)
  }, token);
}

/**
 * Delete a skill (Protected)
 * @param {string} id
 * @param {string} [token]
 */
export async function deleteSkill(id, token) {
  return request(`/skills/${id}`, {
    method: 'DELETE'
  }, token);
}

/* ==========================================================================
   MESSAGES API (Public Submit & Protected Inbox)
   ========================================================================== */

/**
 * Submit a contact form message (Public)
 * @param {Object} messageData - { name, email, message }
 */
export async function submitMessage(messageData) {
  return request('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData)
  });
}

/**
 * Fetch all contact messages (Protected)
 * @param {string} [token]
 */
export async function getMessages(token) {
  return request('/messages', {}, token);
}

/**
 * Mark a contact message as read (Protected)
 * @param {string} id
 * @param {string} [token]
 */
export async function markMessageRead(id, token) {
  return request(`/messages/${id}/read`, {
    method: 'PATCH'
  }, token);
}
