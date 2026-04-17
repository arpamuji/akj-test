/*
  Warnings:

  - The primary key for the `Submission` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Submission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "yearsExperience" INTEGER NOT NULL,
    "skills" TEXT NOT NULL,
    "shortBio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "preferredWorkType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Submission" ("createdAt", "fullName", "id", "location", "preferredWorkType", "shortBio", "skills", "targetRole", "updatedAt", "yearsExperience") SELECT "createdAt", "fullName", "id", "location", "preferredWorkType", "shortBio", "skills", "targetRole", "updatedAt", "yearsExperience" FROM "Submission";
DROP TABLE "Submission";
ALTER TABLE "new_Submission" RENAME TO "Submission";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
