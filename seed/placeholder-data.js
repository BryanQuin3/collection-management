// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: 'https://cdn.leonardo.ai/users/03da8c69-e2ee-4bb9-b32d-46a07be666b7/generations/8102f7ba-a532-4791-87d8-2e457f8f7eae/variations/alchemyrefiner_alchemymagic_2_8102f7ba-a532-4791-87d8-2e457f8f7eae_0.jpg?w=32&h=32',
  },
  {
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: 'https://cdn.leonardo.ai/users/f7db49dd-e33b-4858-a482-52bab5c512a5/generations/89a73d2b-1043-4fad-a2ab-f1ed2ba2ce9e/variations/Default_Un_entrenador_joven_de_gimnasio_muy_lindo_rubio_ojos_v_0_89a73d2b-1043-4fad-a2ab-f1ed2ba2ce9e_0.jpg?w=32&h=32',
  },
  {
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: 'https://cdn.leonardo.ai/users/795f6ad0-9cd4-4eb7-b2c0-6079a7359c57/generations/6b07e7b4-301e-4ca1-8ffa-ca651e0b1ed3/variations/alchemyrefiner_alchemymagic_2_6b07e7b4-301e-4ca1-8ffa-ca651e0b1ed3_0.jpg?w=32&h=32',
  },
  {
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: 'https://cdn.leonardo.ai/users/949d0984-87d1-4ae0-a977-a6eb28b0ce6f/generations/de6e6ea3-5f21-464d-a923-8283cb96ab97/variations/alchemyrefiner_alchemymagic_0_de6e6ea3-5f21-464d-a923-8283cb96ab97_0.jpg?w=32&h=32',
  },
  {
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: 'https://cdn.leonardo.ai/users/c82ca581-ede1-464b-aa36-9b4bc6989638/generations/8af78af2-f1c6-48e6-88db-354b04f0967b/variations/alchemyrefiner_alchemymagic_0_8af78af2-f1c6-48e6-88db-354b04f0967b_0.jpg?w=32&h=32',
  },
  {
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: 'https://cdn.leonardo.ai/users/3abef9c3-769e-4648-8661-848f6e341319/generations/7bc39c6e-3ad9-4586-b03a-6639af3a33c2/variations/Default_John_F_Kennedy_portrait_highly_detailed_silver_and_whi_0_7bc39c6e-3ad9-4586-b03a-6639af3a33c2_0.jpg?w=32&h=32',
  },
  {
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: 'https://cdn.leonardo.ai/users/2cc74aaa-4951-4d0d-bde8-8aefed9b249f/generations/ef76708b-70ec-4bdc-a435-20e5e70b2274/variations/alchemyrefiner_alchemymagic_0_ef76708b-70ec-4bdc-a435-20e5e70b2274_0.jpg?w=32&h=32',
  },
  {
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: 'https://cdn.leonardo.ai/users/b01b353b-dedb-499d-94b8-50e6b53a8af7/generations/51ba2c7a-de05-4de0-bee1-167d8f220bc1/PhotoReal_A_photorealistic_style_model_from_LykonGreat_at_all_0.jpg?w=32&h=32',
  },
  {
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: 'https://cdn.leonardo.ai/users/d3a0f9cb-e697-4553-a9bc-c27e77f59dbc/generations/177900af-2506-45e2-bab4-33ebf8b572f4/AlbedoBase_XL_Create_an_image_of_a_beautiful_woman_that_captur_1.jpg?w=32&h=32',
  }
];

const invoices = [
  {
    customer_id: "65c3e06aa245b8bd555029da",
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: "65c3e06aa245b8bd555029db",
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: "65c3e06aa245b8bd555029dd",
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: "65c3e06aa245b8bd555029dc",
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id:  "65c3e06aa245b8bd555029de",
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: "65c3e06aa245b8bd555029e0",
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: "65c3e06aa245b8bd555029df",
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: "65c3e06aa245b8bd555029dc",
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: "65c3e06aa245b8bd555029dd",
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: "65c3e06aa245b8bd555029de",
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: "65c3e06aa245b8bd555029db",
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: "65c3e06aa245b8bd555029de",
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id:  "65c3e06aa245b8bd555029db",
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: "65c3e06aa245b8bd555029da",
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id:  "65c3e06aa245b8bd555029db",
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  customers,
  invoices,
  revenue,
};
