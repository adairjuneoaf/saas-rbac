import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import chalk from 'chalk';
import { fastify } from 'fastify';
import fastifyI18n from 'fastify-i18n';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { en, ptBR } from '../locales';
import { env } from './env';
import { appRoutes } from './http/routes';

const app = fastify({ logger: false }).withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Swagger Config
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SAAS RBAC Api',
      description: 'Full-stack SaaS app with Next.js and Fastify.',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/',
  theme: { title: 'SAAS RBAC Api' },
});

// i18n Congig
app.register(fastifyI18n, {
  fallbackLocale: 'en',
  messages: {
    en: en,
    'pt-BR': ptBR,
  },
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

// CORS Config and prefix routes
app.register(fastifyCors);
app.register(appRoutes, { prefix: '/api' });

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.info(chalk.greenBright('🔥 HTTP Server Running!'));
  });
