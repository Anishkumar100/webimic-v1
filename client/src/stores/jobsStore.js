import { create } from 'zustand';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const useJobsStore = create((set, get) => ({
  jobs: [],
  currentJob: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  pagination: { page: 1, limit: 20, total: 0, pages: 0 },

  fetchJobs: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const qs = new URLSearchParams({ page: params.page || 1, limit: params.limit || 20, ...(params.status ? { status: params.status } : {}) });
      const res = await fetch(`${API}/jobs?${qs}`);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      set({ jobs: data.jobs, pagination: data.pagination, isLoading: false });
    } catch (err) {
      // Fallback to mock data if API not available
      set({ jobs: getMockJobs(), isLoading: false, pagination: { page: 1, limit: 20, total: 8, pages: 1 } });
    }
  },

  fetchJob: async (id) => {
    set({ isLoading: true, error: null, currentJob: null });
    try {
      const res = await fetch(`${API}/jobs/${id}`);
      if (!res.ok) throw new Error('Job not found');
      const data = await res.json();
      set({ currentJob: data, isLoading: false });
    } catch {
      set({ currentJob: getMockJobDetail(id), isLoading: false });
    }
  },

  createJob: async (payload) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await fetch(`${API}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create job');
      const data = await res.json();
      set({ isSubmitting: false });
      return data.id || data._id;
    } catch {
      // Fallback: simulate job creation
      const fakeId = 'job-' + Math.random().toString(36).slice(2, 8);
      set((s) => ({
        isSubmitting: false,
        jobs: [{ id: fakeId, siteUrl: payload.siteUrl, status: 'QUEUED', pagesCrawled: 0, createdAt: new Date().toISOString() }, ...s.jobs],
      }));
      return fakeId;
    }
  },

  clearCurrentJob: () => set({ currentJob: null }),
}));

function getMockJobs() {
  return [
    { id: 'job-001', siteUrl: 'https://stripe.com', status: 'COMPLETED', pagesCrawled: 24, tokensExtracted: 312, duration: 272000, createdAt: '2026-06-01T10:30:00Z', documents: { docA: 'docs/job-001/doc-a.pdf', docB: 'docs/job-001/doc-b.pdf' } },
    { id: 'job-002', siteUrl: 'https://linear.app', status: 'CRAWLING', pagesCrawled: 12, tokensExtracted: 0, duration: null, createdAt: '2026-06-01T11:15:00Z', documents: {} },
    { id: 'job-003', siteUrl: 'https://vercel.com', status: 'COMPLETED', pagesCrawled: 18, tokensExtracted: 245, duration: 198000, createdAt: '2026-05-31T09:00:00Z', documents: { docA: 'docs/job-003/doc-a.pdf', docB: 'docs/job-003/doc-b.pdf' } },
    { id: 'job-004', siteUrl: 'https://notion.so', status: 'QUEUED', pagesCrawled: 0, tokensExtracted: 0, duration: null, createdAt: '2026-06-01T11:55:00Z', documents: {} },
    { id: 'job-005', siteUrl: 'https://figma.com', status: 'FAILED', pagesCrawled: 0, tokensExtracted: 0, duration: null, createdAt: '2026-05-29T14:20:00Z', documents: {} },
    { id: 'job-006', siteUrl: 'https://tailwindcss.com', status: 'COMPLETED', pagesCrawled: 15, tokensExtracted: 198, duration: 175000, createdAt: '2026-05-28T16:45:00Z', documents: { docA: 'docs/job-006/doc-a.pdf' } },
    { id: 'job-007', siteUrl: 'https://supabase.com', status: 'COMPLETED', pagesCrawled: 22, tokensExtracted: 287, duration: 312000, createdAt: '2026-05-27T08:10:00Z', documents: { docA: 'docs/job-007/doc-a.pdf', docB: 'docs/job-007/doc-b.pdf' } },
    { id: 'job-008', siteUrl: 'https://clerk.com', status: 'COMPLETED', pagesCrawled: 10, tokensExtracted: 156, duration: 128000, createdAt: '2026-05-26T13:30:00Z', documents: { docA: 'docs/job-008/doc-a.pdf' } },
  ];
}

function getMockJobDetail(id) {
  return {
    id, siteUrl: 'https://stripe.com', status: 'COMPLETED',
    config: { maxDepth: 3, maxPages: 50, devices: { desktop: true, tablet: true, mobile: true }, captureAnimations: true, generateRedesign: true },
    pagesFound: 24, pagesCrawled: 24, tokensExtracted: 312, duration: 272000,
    documents: { docA: `docs/${id}/doc-a.pdf`, docB: `docs/${id}/doc-b.pdf` },
    createdAt: '2026-06-01T10:30:00Z', updatedAt: '2026-06-01T10:34:32Z',
    tokens: {
      colors: [
        { hex: '#635BFF', role: 'accent', name: 'Primary' }, { hex: '#0A2540', role: 'background', name: 'Dark' },
        { hex: '#F6F9FC', role: 'background', name: 'Light' }, { hex: '#425466', role: 'text', name: 'Body' },
        { hex: '#00D4AA', role: 'accent', name: 'Success' }, { hex: '#FFC233', role: 'accent', name: 'Warning' },
      ],
      typography: [
        { name: 'H1', fontFamily: 'sohne', fontSize: '52px', fontWeight: '700', lineHeight: '1.1' },
        { name: 'H2', fontFamily: 'sohne', fontSize: '36px', fontWeight: '600', lineHeight: '1.2' },
        { name: 'Body', fontFamily: 'sohne', fontSize: '17px', fontWeight: '400', lineHeight: '1.6' },
        { name: 'Code', fontFamily: 'sohne-mono', fontSize: '14px', fontWeight: '400', lineHeight: '1.5' },
      ],
      spacing: ['4px','8px','12px','16px','24px','32px','48px','64px'],
      animations: [
        { element: 'Hero gradient', trigger: 'load', duration: '3s', easing: 'linear', type: 'animation' },
        { element: 'Card hover', trigger: 'hover', duration: '200ms', easing: 'ease-out', type: 'transition' },
        { element: 'Section reveal', trigger: 'scroll', duration: '600ms', easing: 'cubic-bezier(0.4,0,0.2,1)', type: 'transition' },
      ],
    },
    pages: [
      { url: 'https://stripe.com/', path: '/', title: 'Homepage' },
      { url: 'https://stripe.com/payments', path: '/payments', title: 'Payments' },
      { url: 'https://stripe.com/pricing', path: '/pricing', title: 'Pricing' },
      { url: 'https://stripe.com/docs', path: '/docs', title: 'Documentation' },
    ],
  };
}

export default useJobsStore;
