CREATE TABLE `Category` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`parentId` integer,
	`status` text
);
--> statement-breakpoint
CREATE TABLE `drizzle_migrations` (
	`id` integer PRIMARY KEY NOT NULL,
	`hash` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `Product` (
	`id` integer PRIMARY KEY NOT NULL,
	`code` text,
	`name` text,
	`description` text,
	`price` real,
	`currency` text,
	`categoryId` integer,
	`isArchived` integer,
	`createdAt` text,
	`updatedAt` text,
	`status` text,
	`barcode` text,
	`updateTime` text,
	`createTime` text,
	`unitTypeId` integer,
	`attribute` text,
	FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ProductAttribute` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`alias` text,
	`name` text,
	`value` text
);
--> statement-breakpoint
CREATE TABLE `Sync` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tableName` text,
	`lastSyncTime` text
);
--> statement-breakpoint
CREATE TABLE `SyncLog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`entityType` text NOT NULL,
	`syncStartTime` text NOT NULL,
	`syncEndTime` text NOT NULL,
	`itemsSynced` integer NOT NULL,
	`status` text NOT NULL,
	`errorMessage` text
);
--> statement-breakpoint
CREATE TABLE `UnitType` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`email` text,
	`authToken` text,
	`refreshToken` text,
	`lastLogin` text
);
