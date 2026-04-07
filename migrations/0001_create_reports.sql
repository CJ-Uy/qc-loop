CREATE TABLE IF NOT EXISTS `reports` (
  `id` TEXT PRIMARY KEY NOT NULL,
  `category` TEXT NOT NULL,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `barangay` TEXT NOT NULL,
  `district` INTEGER NOT NULL,
  `timestamp` TEXT NOT NULL,
  `upvotes` INTEGER NOT NULL DEFAULT 0,
  `status` TEXT NOT NULL DEFAULT 'pending',
  `image_key` TEXT
);
