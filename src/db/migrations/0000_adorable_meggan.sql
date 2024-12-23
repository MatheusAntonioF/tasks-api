CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
