//https://stackoverflow.com/questions/72674930/zod-validator-validate-image

import { z } from "zod";

const MB_BYTES = 1000000; // Number of bytes in a megabyte

// Accepted mime types
const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png"];

// Updated image schema to allow for optional files
const imageSchema = z.union([
  z.instanceof(File).superRefine((f, ctx) => {
    // Validate mime type

    if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `File must be one of [${ACCEPTED_MIME_TYPES.join(
          ", "
        )}] but was ${f.type}`,
      });
    }
    // Validate file size
    if (f.size > 3 * MB_BYTES) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        type: "array",
        message: `The file must not be larger than ${3 * MB_BYTES} bytes: ${
          f.size
        }`,
        maximum: 3 * MB_BYTES,
        inclusive: true,
      });
    }
  }),
  z.null(),
  z.undefined(), // Allow undefined for optional file
]);

// You can also use z.null() if you want to allow null as well:
// const imageSchema = z.union([z.instanceof(File), z.null(), z.undefined()]);

export { imageSchema };
