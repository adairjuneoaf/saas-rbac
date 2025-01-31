import chalk from 'chalk';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const seed = async () => {
  /**
   * Reset DB
   */
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  console.log(chalk.yellow('💾 Database reset with successful!'));

  const passwordHash = await bcrypt.hash('123456', 1);

  /**
   * Creating new Users
   */

  const userOne = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  });

  const userTwo = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  });

  const userThre = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  });

  // const users = [userOne, userTwo, userThre];

  console.log(chalk.green('👥 Users created with successful!'));

  /**
   * Creating new Organization (ADMIN)
   */

  await prisma.organization.create({
    data: {
      name: 'Acme (ADMIN)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatar(),
      shouldAttachUsersByDomain: true,
      ownerId: userOne.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: userOne.id,
              role: 'ADMIN',
            },
            {
              userId: userTwo.id,
              role: 'MEMBER',
            },
            {
              userId: userThre.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  });

  console.log(chalk.green('🔐 Organization ADMIN created with successful!'));

  /**
   * Creating new Organization (MEMBER)
   */

  await prisma.organization.create({
    data: {
      name: faker.company.name().concat(' (Member)'),
      slug: faker.internet.domainWord(),
      domain: faker.internet.domainName(),
      avatarUrl: faker.image.avatar(),
      ownerId: userOne.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: userOne.id,
              role: 'MEMBER',
            },
            {
              userId: userTwo.id,
              role: 'ADMIN',
            },
            {
              userId: userThre.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  });

  console.log(chalk.green('👤 Organization MEMBER with successful!'));

  /**
   * Creating new Organization (BILLING)
   */

  await prisma.organization.create({
    data: {
      name: faker.company.name().concat(' (Billing)'),
      slug: faker.internet.domainWord(),
      domain: faker.internet.domainName(),
      avatarUrl: faker.image.avatar(),
      ownerId: userOne.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.word(7),
              description: faker.lorem.sentence({ min: 5, max: 7 }),
              avatarUrl: faker.image.avatar(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThre.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: userOne.id,
              role: 'BILLING',
            },
            {
              userId: userTwo.id,
              role: 'ADMIN',
            },
            {
              userId: userThre.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  });

  console.log(chalk.green('💵 Organization BILLING created with successful!'));
};

/**
 * End of Seed
 */
seed().then(() => {
  console.log(chalk.greenBright('💾 Database seeded with successful!'));
});
