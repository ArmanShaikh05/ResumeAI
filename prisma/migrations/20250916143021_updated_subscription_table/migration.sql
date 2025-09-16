/*
  Warnings:

  - You are about to drop the column `stripeCurrentPeriodEnd` on the `user_subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."user_subscriptions" DROP COLUMN "stripeCurrentPeriodEnd";
