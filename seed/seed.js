// Importa tus modelos de datos de MongoDB
const Customer = require('../models/customer');
const Invoice = require('../models/invoice');
const Revenue = require('../models/revenue');

// Importa tus datos de prueba
const { customers, invoices, revenue } = require('./placeholder-data');

async function seedCustomers() {
  try {
    // Crea los documentos de clientes en la base de datos
    const insertedCustomers = await Customer.insertMany(customers);
    console.log(`Seeded ${insertedCustomers.length} customers`);
    return insertedCustomers;
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedInvoices() {
  try {
    // Crea los documentos de facturas en la base de datos
    const insertedInvoices = await Invoice.insertMany(invoices);
    console.log(`Seeded ${insertedInvoices.length} invoices`);
    return insertedInvoices;
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedRevenue() {
  try {
    // Crea los documentos de ingresos en la base de datos
    const insertedRevenue = await Revenue.insertMany(revenue);
    console.log(`Seeded ${insertedRevenue.length} revenue`);
    return insertedRevenue;
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function seed() {
  try {
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('An error occurred while seeding the database:', error);
    process.exit(1);
  }
}

module.exports = seed;
