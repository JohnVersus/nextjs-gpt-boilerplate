CREATE TABLE `payments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`order_id` varchar(255) NOT NULL,
	`payment_id` varchar(255) DEFAULT '',
	`plan` varchar(255) NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(10) NOT NULL,
	`status` enum('initiated','pending','successful','failed','refunded','cancelled') NOT NULL DEFAULT 'initiated',
	`receipt` varchar(255) NOT NULL,
	`payment_data` text DEFAULT (''),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
