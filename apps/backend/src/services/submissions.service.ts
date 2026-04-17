// Submissions service - business logic layer
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../../generated/prisma/client';

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

export const submissionsService = {
  async create(data: {
    fullName: string;
    targetRole: string;
    yearsExperience: number;
    skills: string[];
    shortBio: string;
    location: string;
    preferredWorkType: string;
  }) {
    const created = await prisma.submission.create({
      data: {
        ...data,
        skills: data.skills.join(','),
      },
    });
    return {
      ...created,
      skills: created.skills.split(',').filter((skill) => skill.trim()),
    };
  },

  async findAll() {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return submissions.map((s) => ({
      ...s,
      skills: s.skills.split(',').filter((skill) => skill.trim()),
    }));
  },

  async findById(id: string) {
    const submission = await prisma.submission.findUnique({
      where: { id },
    });
    if (!submission) return null;
    return {
      ...submission,
      skills: submission.skills.split(',').filter((skill) => skill.trim()),
    };
  },

  async deleteById(id: string) {
    await prisma.submission.delete({
      where: { id },
    });
  },
};
