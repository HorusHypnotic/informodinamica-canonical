CREATE TABLE `governance_guidelines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(128) NOT NULL,
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `governance_guidelines_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_guidelines_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `observations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`obsId` varchar(32) NOT NULL,
	`domain` varchar(128) NOT NULL,
	`theme` varchar(128) NOT NULL,
	`obsType` varchar(16) NOT NULL,
	`status` varchar(64) NOT NULL,
	`summary` text NOT NULL,
	`phenomenon` text NOT NULL,
	`representations` text NOT NULL,
	`agents` text NOT NULL,
	`channels` text NOT NULL,
	`competingHypotheses` json NOT NULL,
	`contradictions` text NOT NULL,
	`openQuestions` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `observations_id` PRIMARY KEY(`id`),
	CONSTRAINT `observations_obsId_unique` UNIQUE(`obsId`)
);
--> statement-breakpoint
CREATE TABLE `research_packages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(32) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`status` varchar(64) NOT NULL,
	`version` varchar(32) NOT NULL,
	`githubUrl` varchar(512) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `research_packages_id` PRIMARY KEY(`id`),
	CONSTRAINT `research_packages_code_unique` UNIQUE(`code`)
);
