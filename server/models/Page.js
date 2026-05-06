import mongoose from 'mongoose';

const colorTokenSchema = new mongoose.Schema({
  hex: { type: String, required: true },
  rgb: { r: Number, g: Number, b: Number },
  role: { type: String, enum: ['background', 'text', 'accent', 'border', 'unknown'], default: 'unknown' },
  frequency: { type: Number, default: 0 }, // usage count across elements
}, { _id: false });

const textStyleSchema = new mongoose.Schema({
  name: { type: String }, // e.g. "H1", "Body", "Caption"
  fontFamily: { type: String },
  fontSize: { type: String },
  fontWeight: { type: String },
  lineHeight: { type: String },
  letterSpacing: { type: String, default: 'normal' },
  sampleText: { type: String, default: '' },
}, { _id: false });

const animationSchema = new mongoose.Schema({
  selector: { type: String },
  trigger: { type: String, enum: ['load', 'hover', 'scroll', 'click', 'focus', 'unknown'], default: 'unknown' },
  property: { type: String }, // e.g. "transform", "opacity"
  duration: { type: String },
  easing: { type: String },
  type: { type: String, enum: ['transition', 'animation', 'unknown'], default: 'unknown' },
}, { _id: false });

const screenshotSchema = new mongoose.Schema({
  device: { type: String, enum: ['desktop', 'tablet', 'mobile'] },
  width: { type: Number },
  height: { type: Number },
  storagePath: { type: String }, // path in object storage (S3/MinIO)
  fileSize: { type: Number },
}, { _id: false });

const pageSchema = new mongoose.Schema({
  // Reference to parent job
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },

  // Page info
  url: { type: String, required: true },
  path: { type: String }, // relative path from site root
  title: { type: String, default: '' },
  depth: { type: Number, default: 0 },

  // Screenshots (one per device viewport)
  screenshots: [screenshotSchema],

  // Extracted design tokens
  colors: [colorTokenSchema],
  textStyles: [textStyleSchema],
  spacingValues: [{ type: String }], // e.g. ['4px', '8px', '16px', '24px']
  animations: [animationSchema],

  // Layout patterns detected
  layoutPatterns: [{
    type: { type: String }, // e.g. 'hero', 'card-grid', 'nav', 'footer'
    selector: { type: String },
    boundingBox: {
      x: Number, y: Number, width: Number, height: Number,
    },
  }],

  // Component crops (cropped screenshots of detected components)
  components: [{
    name: { type: String },
    type: { type: String }, // e.g. 'navbar', 'hero', 'card', 'cta', 'footer'
    screenshotPath: { type: String }, // object storage path
    selector: { type: String },
  }],

  // Processing status
  status: { type: String, enum: ['pending', 'captured', 'extracted', 'complete'], default: 'pending' },

}, { timestamps: true });

pageSchema.index({ jobId: 1, path: 1 });

const Page = mongoose.model('Page', pageSchema);
export default Page;
