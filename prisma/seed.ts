import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Limpiar datos existentes
  await prisma.movementItem.deleteMany()
  await prisma.movement.deleteMany()
  await prisma.saleItem.deleteMany()
  await prisma.sale.deleteMany()
  await prisma.cashSession.deleteMany()
  await prisma.inventory.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.location.deleteMany()
  await prisma.user.deleteMany()

  // Crear ubicaciones
  await prisma.location.create({
    data: { name: 'Almacén Central', type: 'almacen', address: 'Bodega principal' }
  })
  await prisma.location.create({
    data: { name: 'Tienda Principal', type: 'tienda', address: 'Sucursal 1' }
  })
  await prisma.location.create({
    data: { name: 'Sucursal 2', type: 'tienda', address: 'Sucursal 2' }
  })
  await prisma.location.create({
    data: { name: 'Restaurante', type: 'restaurante', address: 'Área de restaurante' }
  })

  console.log('✅ Ubicaciones creadas')

  // Crear usuarios
  await prisma.user.create({
    data: { email: 'admin@example.com', name: 'Administrador', password: 'admin123', role: 'admin' }
  })
  await prisma.user.create({
    data: { email: 'cajero1@example.com', name: 'Cajero 1', password: 'cajero123', role: 'cajero' }
  })

  console.log('✅ Usuarios creados')

  // Crear categorías
  await Promise.all([
    prisma.category.create({ data: { name: 'Bebidas', color: '#3B82F6', icon: 'glass-water' } }),
    prisma.category.create({ data: { name: 'Abarrotes', color: '#10B981', icon: 'shopping-basket' } }),
    prisma.category.create({ data: { name: 'Dulcería', color: '#F59E0B', icon: 'candy' } }),
    prisma.category.create({ data: { name: 'Snacks', color: '#EF4444', icon: 'cookie' } }),
  ])

  console.log('✅ Categorías creadas')

  // Los productos, el inventario y las ventas se agregan desde la aplicación.
  // Agrega aquí tus productos si necesitas datos de ejemplo.

  console.log('🎉 Seed completado exitosamente!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
