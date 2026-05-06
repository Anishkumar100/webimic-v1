/**
 * Webimic Worker — Stub Implementation
 *
 * This worker connects to Redis via BullMQ, picks up analysis jobs,
 * and simulates processing. In production, this is where Crawlee +
 * Puppeteer would run: crawling pages, capturing screenshots,
 * extracting tokens, and generating Doc A / Doc B PDFs.
 *
 * Run with: node workers/worker.js
 * Multiple instances can run in parallel against the same Redis queue.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import Job from '../models/Job.js';
import Page from '../models/Page.js';
import { randomUUID } from 'crypto';

const WORKER_ID = `worker-${randomUUID().slice(0, 8)}`;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webimic';

// Redis connection for BullMQ worker
const redisConnection = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

/**
 * Process a single analysis job.
 * Currently a stub — logs progress and simulates completion.
 *
 * TODO (Phase 2+): Replace with actual Crawlee + Puppeteer logic:
 *   1. PuppeteerCrawler with enqueueLinks() for recursive discovery
 *   2. page.goto(url, { waitUntil: 'networkidle0' }) per page
 *   3. page.screenshot({ fullPage: true }) per device viewport
 *   4. page.evaluate() for CSS color/type/spacing/animation extraction
 *   5. K-means clustering on screenshot pixels for color palette
 *   6. HTML template rendering + page.pdf() for Doc A and Doc B
 *   7. Upload screenshots and PDFs to object storage (S3/MinIO)
 */
async function processJob(bullJob) {
  const { jobId, siteUrl, config } = bullJob.data;
  const startTime = Date.now();

  console.log(`[${WORKER_ID}] Processing job ${jobId}: ${siteUrl}`);

  // Update status to CRAWLING
  await Job.findByIdAndUpdate(jobId, {
    status: 'CRAWLING',
    workerId: WORKER_ID,
  });

  // --- STUB: Simulate crawling delay ---
  console.log(`[${WORKER_ID}]   → Crawling with depth=${config.maxDepth}, maxPages=${config.maxPages}`);
  await sleep(2000);

  // Simulate discovering pages
  const mockPages = [
    { url: siteUrl, path: '/', title: 'Homepage', depth: 0 },
    { url: `${siteUrl}/about`, path: '/about', title: 'About', depth: 1 },
    { url: `${siteUrl}/pricing`, path: '/pricing', title: 'Pricing', depth: 1 },
  ];

  // Create Page documents
  for (const p of mockPages) {
    await Page.create({
      jobId,
      url: p.url,
      path: p.path,
      title: p.title,
      depth: p.depth,
      status: 'captured',
      // TODO: Populate screenshots, colors, textStyles, etc. from actual extraction
      screenshots: [],
      colors: [],
      textStyles: [],
      spacingValues: [],
      animations: [],
    });
  }

  await Job.findByIdAndUpdate(jobId, {
    status: 'EXTRACTING',
    pagesFound: mockPages.length,
    pagesCrawled: mockPages.length,
  });

  console.log(`[${WORKER_ID}]   → Extracting tokens from ${mockPages.length} pages`);
  await sleep(1500);

  // Update to GENERATING
  await Job.findByIdAndUpdate(jobId, {
    status: 'GENERATING',
    tokensExtracted: 42, // stub count
  });

  console.log(`[${WORKER_ID}]   → Generating Doc A and Doc B PDFs`);
  await sleep(1500);

  // --- STUB: Mark as completed ---
  const duration = Date.now() - startTime;

  await Job.findByIdAndUpdate(jobId, {
    status: 'COMPLETED',
    duration,
    documents: {
      docA: `docs/${jobId}/doc-a.pdf`,  // TODO: actual object storage path
      docB: config.generateRedesign ? `docs/${jobId}/doc-b.pdf` : null,
    },
  });

  console.log(`[${WORKER_ID}]   ✓ Job ${jobId} completed in ${duration}ms`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Worker startup ---
async function start() {
  // Connect to MongoDB
  await mongoose.connect(MONGODB_URI);
  console.log(`[${WORKER_ID}] Connected to MongoDB`);

  // Create BullMQ worker
  const worker = new Worker('site-analysis', processJob, {
    connection: redisConnection,
    concurrency: 2, // process 2 jobs in parallel per worker instance
  });

  worker.on('completed', (job) => {
    console.log(`[${WORKER_ID}] Job ${job.id} finished successfully`);
  });

  worker.on('failed', async (job, err) => {
    console.error(`[${WORKER_ID}] Job ${job.id} failed:`, err.message);

    // Update job status to FAILED in MongoDB
    const { jobId } = job.data;
    await Job.findByIdAndUpdate(jobId, {
      status: 'FAILED',
      error: err.message,
    });
  });

  worker.on('error', (err) => {
    console.error(`[${WORKER_ID}] Worker error:`, err);
  });

  console.log(`[${WORKER_ID}] Worker started, waiting for jobs on queue "site-analysis"...`);
  console.log(`[${WORKER_ID}] Press Ctrl+C to stop`);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log(`[${WORKER_ID}] Shutting down...`);
    await worker.close();
    await mongoose.disconnect();
    process.exit(0);
  });
}

start().catch((err) => {
  console.error(`[${WORKER_ID}] Failed to start worker:`, err);
  process.exit(1);
});
