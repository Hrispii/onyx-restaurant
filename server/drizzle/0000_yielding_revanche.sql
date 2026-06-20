CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"date" varchar(10) NOT NULL,
	"time" varchar(5) NOT NULL,
	"guests" integer DEFAULT 2 NOT NULL,
	"comment" text DEFAULT '',
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
