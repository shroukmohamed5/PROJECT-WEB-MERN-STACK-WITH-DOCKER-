import express from "express";
import {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord
} from "../models/controllers/recordController.js";

const router = express.Router();

router.get("/", getRecords);
router.get("/:id", getRecordById);
router.post("/", createRecord);
router.patch("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
