import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@shop.com' },
    update: {},
    create: { email: 'admin@shop.com', password, name: 'Admin', role: 'ADMIN' }
  });
  const user = await prisma.user.upsert({
    where: { email: 'user@shop.com' },
    update: {},
    create: { email: 'user@shop.com', password, name: 'Demo User', role: 'USER' }
  });
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Máy hàn' },
      { name: 'Máy cắt' },
      { name: 'Phụ kiện' }
    ],
    skipDuplicates: true
  });
  const category = await prisma.category.findFirst();
  if (category) {
    await prisma.product.createMany({
      data: [
        { name: 'Máy hàn cơ bản', description: 'Dành cho thợ mới', price: 150.0, brand: 'Hawk', power: 3.5, categoryId: category.id },
        { name: 'Máy cắt plasma', description: 'Công suất cao', price: 300.0, brand: 'SteelPro', power: 5.0, categoryId: category.id }
      ],
      skipDuplicates: true
    });
  }
  console.log({ admin, user });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
