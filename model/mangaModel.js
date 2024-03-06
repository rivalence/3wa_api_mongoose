import mongoose from "mongoose";

const mangaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Manga", mangaSchema);
