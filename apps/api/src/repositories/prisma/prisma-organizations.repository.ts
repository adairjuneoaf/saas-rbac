import { type Organization, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import type { IOrganizationsRepository } from '../interfaces/organizations.interface';

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }

  async update(
    organizationId: string,
    data: Prisma.OrganizationUpdateInput
  ): Promise<Organization> {
    const organization = await prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: data,
    });

    return organization;
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findFirst({
      where: {
        id,
      },
    });

    return organization;
  }

  async findByDomain(domain: string): Promise<Organization | null> {
    const organization = await prisma.organization.findFirst({
      where: {
        domain: {
          equals: domain,
        },
      },
    });

    return organization;
  }
}