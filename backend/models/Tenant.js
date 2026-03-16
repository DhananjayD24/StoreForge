import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },

    storeSlug: {
      type: String,
      required: true,
      unique: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // store hero description
    tagline: {
      type: String,
      default: "Welcome to our store",
    },

    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", tenantSchema);