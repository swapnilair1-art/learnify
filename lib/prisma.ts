// Use runtime require to avoid editor type-resolution issues in some environments
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PrismaPkg = require('@prisma/client');

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined;
}

const prisma = global.prisma ?? new PrismaPkg.PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
