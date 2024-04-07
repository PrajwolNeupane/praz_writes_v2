import mongoose from "mongoose";

const VistorModal = new mongoose.Schema(
  {
    device: { type: String },
    vist_id: { type: String },
    visit_count: { type: String },
  },
  { timestamps: true }
);

const Vistor =
  mongoose.models.Vistor || mongoose.model("Vistor", VistorModal);

export default Vistor;
