import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { z } from 'zod';

import type { User } from './models/user';
import { permissions } from './permissions';
import { allSubject } from './subjects/all';
import { billingSubject } from './subjects/billing';
import { inviteSubject } from './subjects/invite';
import { organizationSubject } from './subjects/organization';
import { projectSubject } from './subjects/project';
import { userSubject } from './subjects/users';

export const appAbilitiesSchema = z.union([
  allSubject,
  userSubject,
  inviteSubject,
  billingSubject,
  projectSubject,
  organizationSubject,
]);

type AppAbilities = z.infer<typeof appAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export const defineAbilityFor = (user: User) => {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`);
  }

  permissions[user.role](user, builder);

  return builder.build({
    detectSubjectType(subject) {
      return subject.__typename;
    },
  });
};

export * from './models/organization';
export * from './models/project';
export * from './models/user';

export type { AppAbilities };