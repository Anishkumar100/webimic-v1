import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  // User who submitted the job (optional for unauthenticated MVP)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  // Target site
  siteUrl: { type: String, required: true, trim: true },

  // Job status: QUEUED → CRAWLING → EXTRACTING → GENERATING → COMPLETED / FAILED
  status: {
    type: String,
    enum: ['QUEUED', 'CRAWLING', 'EXTRACTING', 'GENERATING', 'COMPLETED', 'FAILED'],
    default: 'QUEUED',
  },

  // Crawl configuration (matches the New Analysis form fields)
  config: {
    maxDepth: { type: Number, default: 3 },
    maxPages: { type: Number, default: 50 },
    devices: {
      desktop: { type: Boolean, default: true },
      tablet: { type: Boolean, default: true },
      mobile: { type: Boolean, default: true },
    },
    captureAnimations: { type: Boolean, default: true },
    generateRedesign: { type: Boolean, default: true },
  },

  // Results summary
  pagesFound: { type: Number, default: 0 },
  pagesCrawled: { type: Number, default: 0 },
  tokensExtracted: { type: Number, default: 0 },

  // Generated document paths (in object storage)
  documents: {
    docA: { type: String, default: null }, // Path to Doc A PDF
    docB: { type: String, default: null }, // Path to Doc B PDF
  },

  // Error info if job failed
  error: { type: String, default: null },

  // Worker that processed this job
  workerId: { type: String, default: null },

  // Duration in milliseconds
  duration: { type: Number, default: null },

}, { timestamps: true }); // adds createdAt, updatedAt

// Indexes for efficient querying
jobSchema.index({ userId: 1, createdAt: -1 });
jobSchema.index({ status: 1 });

const Job = mongoose.model('Job', jobSchema);
export default Job;
