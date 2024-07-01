CREATE TABLE `books` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`author` varchar(255),
	`published_year` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `books_id` PRIMARY KEY(`id`)
);
