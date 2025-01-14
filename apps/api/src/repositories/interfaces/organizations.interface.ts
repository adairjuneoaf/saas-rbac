import type { Organization, Prisma } from '@prisma/client';

export interface IOrganizationsRepository {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>;
  update(
    organizationId: string,
    data: Prisma.OrganizationUncheckedCreateInput
  ): Promise<Organization>;
  findById(id: string): Promise<Organization | null>;
  findByDomain(domain: string): Promise<Organization | null>;
}
