-- CreateTable
CREATE TABLE "Submission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
