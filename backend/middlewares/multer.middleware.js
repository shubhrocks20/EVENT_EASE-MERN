import multer from "multer";

// Define multer storage configuration (not used in this case)
const storage = multer.memoryStorage();

// Create multer instance without storage configuration (directly handle in-memory)
export const upload = multer({ storage: storage });
