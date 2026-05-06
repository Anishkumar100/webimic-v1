import { Router } from 'express';
import Job from '../models/Job.js';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const router = Router();

// Redis connection for BullMQ
const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

// Job queue
const analysisQueue = new Queue('site-analysis', { connection: redisConnection });

/**
 * POST /api/jobs
 * Create a new analysis job. Stores in MongoDB and enqueues in Redis.
 *
 * Request body:
 *   { siteUrl, config: { maxDepth, maxPages, devices, captureAnimations, generateRedesign } }
 */
router.post('/', async (req, res) => {
  try {
    const { siteUrl, config = {} } = req.body;

    // Validate URL
    if (!siteUrl || typeof siteUrl !== 'string') {
      return res.status(400).json({ error: 'siteUrl is required and must be a string' });
    }

    try {
      new URL(siteUrl);
    } catch {
      return res.status(400).json({ error: 'siteUrl must be a valid URL' });
    }

    // Create Job document in MongoDB
    const job = await Job.create({
      // userId: req.user?._id, // TODO: extract from auth middleware
      siteUrl,
      status: 'QUEUED',
      config: {
        maxDepth: config.maxDepth ?? 3,
        maxPages: config.maxPages ?? 50,
        devices: {
          desktop: config.devices?.desktop ?? true,
          tablet: config.devices?.tablet ?? true,
          mobile: config.devices?.mobile ?? true,
        },
        captureAnimations: config.captureAnimations ?? true,
        generateRedesign: config.generateRedesign ?? true,
      },
    });

    // Enqueue job in Redis via BullMQ
    await analysisQueue.add('analyze', {
      jobId: job._id.toString(),
      siteUrl: job.siteUrl,
      config: job.config,
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    });

    console.log(`[API] Job ${job._id} queued for ${siteUrl}`);

    res.status(201).json({
      id: job._id,
      siteUrl: job.siteUrl,
      status: job.status,
      config: job.config,
      createdAt: job.createdAt,
    });
  } catch (err) {
    console.error('[API] Error creating job:', err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

/**
 * GET /api/jobs
 * List all jobs, newest first. Supports pagination via ?page=1&limit=20
 */
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    // Optional status filter
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status.toUpperCase();
    }
    // TODO: filter by userId when auth is implemented
    // filter.userId = req.user._id;

    const [jobs, total] = await Promise.all([
      Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Job.countDocuments(filter),
    ]);

    res.json({
      jobs: jobs.map(j => ({
        id: j._id,
        siteUrl: j.siteUrl,
        status: j.status,
        pagesCrawled: j.pagesCrawled,
        tokensExtracted: j.tokensExtracted,
        duration: j.duration,
        documents: j.documents,
        createdAt: j.createdAt,
        updatedAt: j.updatedAt,
      })),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('[API] Error listing jobs:', err);
    res.status(500).json({ error: 'Failed to list jobs' });
  }
});

/**
 * GET /api/jobs/:id
 * Get full job detail including all metadata.
 */
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).lean();
    if (!job) return res.status(404).json({ error: 'Job not found' });

    // TODO: Fetch associated Pages from Page model
    // const pages = await Page.find({ jobId: job._id }).lean();

    res.json({
      id: job._id,
      siteUrl: job.siteUrl,
      status: job.status,
      config: job.config,
      pagesFound: job.pagesFound,
      pagesCrawled: job.pagesCrawled,
      tokensExtracted: job.tokensExtracted,
      documents: job.documents,
      error: job.error,
      workerId: job.workerId,
      duration: job.duration,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      // pages, // TODO: include when Page model is populated by worker
    });
  } catch (err) {
    console.error('[API] Error fetching job:', err);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

export default router;
export { analysisQueue, redisConnection };
