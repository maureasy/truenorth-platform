const BASE = '/api'

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

// Franchisees
export const franchiseeApi = {
  list:   ()          => request('/franchisees'),
  get:    (id)        => request(`/franchisees/${id}`),
  create: (data)      => request('/franchisees', { method: 'POST', body: data }),
  update: (id, data)  => request(`/franchisees/${id}`, { method: 'PUT', body: data }),
  delete: (id)        => request(`/franchisees/${id}`, { method: 'DELETE' }),
}

// Subscribers
export const subscriberApi = {
  list:   ()          => request('/subscribers'),
  get:    (id)        => request(`/subscribers/${id}`),
  create: (data)      => request('/subscribers', { method: 'POST', body: data }),
  update: (id, data)  => request(`/subscribers/${id}`, { method: 'PUT', body: data }),
  delete: (id)        => request(`/subscribers/${id}`, { method: 'DELETE' }),
}

// Assets
export const assetApi = {
  list:   ()          => request('/assets'),
  get:    (id)        => request(`/assets/${id}`),
  create: (data)      => request('/assets', { method: 'POST', body: data }),
  update: (id, data)  => request(`/assets/${id}`, { method: 'PUT', body: data }),
  delete: (id)        => request(`/assets/${id}`, { method: 'DELETE' }),
}
