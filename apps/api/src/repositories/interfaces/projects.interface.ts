import type { Prisma, Project } from '@prisma/client';

export interface IProjectsRepository {
  create(data: Prisma.ProjectUncheckedCreateInput): Promise<Project>;
  delete(projectId: string, organizationId: string): Promise<void>;
  findUnique(
    projectId: string,
    organizationId: string
  ): Promise<Project | null>;
}
