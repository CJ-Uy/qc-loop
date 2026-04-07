import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const reports = sqliteTable("reports", {
  id:          text("id").primaryKey(),
  category:    text("category").notNull(),
  title:       text("title").notNull(),
  description: text("description").notNull(),
  barangay:    text("barangay").notNull(),
  district:    integer("district").notNull(),
  timestamp:   text("timestamp").notNull(),
  upvotes:     integer("upvotes").notNull().default(0),
  status:      text("status").notNull().default("pending"),
  image_key:   text("image_key"),
});
