import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Crear ubicaciones
  const almacen = await prisma.location.upsert({
    where: { id: 'loc_almacen' },
    update: {},
    create: { id: 'loc_almacen', name: 'Almacén Central', type: 'almacen', address: 'Bodega principal' }
  })

  const tiendaPrincipal = await prisma.location.upsert({
    where: { id: 'loc_market' },
    update: {},
    create: { id: 'loc_market', name: 'Tienda Principal', type: 'tienda', address: 'Sucursal 1' }
  })

  const sucursal2 = await prisma.location.upsert({
    where: { id: 'loc_sucursal2' },
    update: {},
    create: { id: 'loc_sucursal2', name: 'Sucursal 2', type: 'tienda', address: 'Sucursal 2' }
  })

  const restaurante = await prisma.location.upsert({
    where: { id: 'loc_restaurante' },
    update: {},
    create: { id: 'loc_restaurante', name: 'Restaurante', type: 'restaurante', address: 'Área de restaurante' }
  })

  console.log('✅ Ubicaciones creadas')

  // Crear usuarios
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { id: 'user_admin', email: 'admin@example.com', name: 'Administrador', password: 'admin123', role: 'admin' }
  })

  const cajero1 = await prisma.user.upsert({
    where: { email: 'cajero1@example.com' },
    update: {},
    create: { id: 'user_cajero1', email: 'cajero1@example.com', name: 'Cajero 1', password: 'cajero123', role: 'cajero' }
  })

  console.log('✅ Usuarios creados')

  // Crear categorías
  await prisma.category.upsert({
    where: { id: 'cat_bebidas' },
    update: {},
    create: { id: 'cat_bebidas', name: 'Bebidas', color: '#3B82F6', icon: 'glass-water' }
  })

  await prisma.category.upsert({
    where: { id: 'cat_abarrotes' },
    update: {},
    create: { id: 'cat_abarrotes', name: 'Abarrotes', color: '#10B981', icon: 'shopping-basket' }
  })

  await prisma.category.upsert({
    where: { id: 'cat_dulceria' },
    update: {},
    create: { id: 'cat_dulceria', name: 'Dulcería', color: '#F59E0B', icon: 'candy' }
  })

  await prisma.category.upsert({
    where: { id: 'cat_snacks' },
    update: {},
    create: { id: 'cat_snacks', name: 'Snacks', color: '#EF4444', icon: 'cookie' }
  })

  console.log('✅ Categorías creadas')

  // Los productos y el inventario se agregan desde la aplicación.
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
