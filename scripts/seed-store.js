const AppDataSource = require('../src/db');
const Store = require('../src/entity/Store');

const stores = [
  {
    id: 21,
    name: "Bang Sue Thai Noodles",
    address: "101/2 ถนนเตชะวณิช แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    lat: 13.8131,
    lng: 100.5372,
    category: "ก๋วยเตี๋ยว",
    nationality: "ไทย",
    openingHours: "08:00 - 20:00"
  },
  {
    id: 22,
    name: "Siam Square Café",
    address: "258/1-3 ซอยจุฬา 42 แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=80",
    lat: 13.7447,
    lng: 100.5348,
    category: "คาเฟ่",
    nationality: "นานาชาติ",
    openingHours: "07:00 - 22:00"
  },
  {
    id: 23,
    name: "Sukhumvit Japanese Restaurant",
    address: "88/8 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1541542684-5e01e9b6214b?auto=format&fit=crop&w=400&q=80",
    lat: 13.7371,
    lng: 100.563,
    category: "อาหารญี่ปุ่น",
    nationality: "ญี่ปุ่น",
    openingHours: "11:00 - 14:00, 17:00 - 22:00"
  },
  {
    id: 24,
    name: "Chinatown Dim Sum",
    address: "123 ถนนเยาวราช แขวงจักรวรรดิ เขตสัมพันธวงศ์ กรุงเทพฯ",
    rating: 4,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
    lat: 13.7408,
    lng: 100.5049,
    category: "ติ่มซำ",
    nationality: "จีน",
    openingHours: "09:00 - 18:00"
  },
  {
    id: 25,
    name: "Riverside Seafood",
    address: "77/4 ซอยเจริญนคร 10 แขวงคลองต้นไทร เขตคลองสาน กรุงเทพฯ",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1504674900247-0f8a5e4ffb1d?auto=format&fit=crop&w=400&q=80",
    lat: 13.7225,
    lng: 100.492,
    category: "อาหารทะเล",
    nationality: "ไทย",
    openingHours: "16:00 - 23:00"
  },
  {
    id: 26,
    name: "Green Garden Vegetarian",
    address: "45 ซอยสุขุมวิท 39 เขตวัฒนา กรุงเทพฯ",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    lat: 13.739,
    lng: 100.559,
    category: "มังสวิรัติ",
    nationality: "นานาชาติ",
    openingHours: "10:00 - 21:00"
  },
  {
    id: 27,
    name: "Little Italy Pizzeria",
    address: "23 ซอยสุขุมวิท 11 เขตวัฒนา กรุงเทพฯ",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1504674900247-0c46e6e9614b?auto=format&fit=crop&w=400&q=80",
    lat: 13.7375,
    lng: 100.561,
    category: "พิซซ่า",
    nationality: "อิตาเลียน",
    openingHours: "11:00 - 23:00"
  },
  {
    id: 28,
    name: "French Bakery & Café",
    address: "12 ซอยสุขุมวิท 31 เขตวัฒนา กรุงเทพฯ",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80",
    lat: 13.736,
    lng: 100.5625,
    category: "เบเกอรี่",
    nationality: "ฝรั่งเศส",
    openingHours: "07:30 - 20:00"
  },
  {
    id: 29,
    name: "Indian Spice House",
    address: "99 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1543352634-6a38e9be85e4?auto=format&fit=crop&w=400&q=80",
    lat: 13.7285,
    lng: 100.533,
    category: "อาหารอินเดีย",
    nationality: "อินเดีย",
    openingHours: "11:00 - 22:00"
  },
  {
    id: 30,
    name: "The Vegan Delight",
    address: "10 ซอยทองหล่อ 10 เขตวัฒนา กรุงเทพฯ",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505253210343-05f898b8e0c3?auto=format&fit=crop&w=400&q=80",
    lat: 13.738,
    lng: 100.56,
    category: "มังสวิรัติ",
    nationality: "นานาชาติ",
    openingHours: "09:00 - 21:00"
  }
];

AppDataSource.initialize().then(async () => {
  // Reset stores table and id sequence
  await AppDataSource.query('TRUNCATE TABLE stores RESTART IDENTITY CASCADE;');
  const repo = AppDataSource.getRepository('Store');
  await repo.save(stores);
  console.log('Seeded stores successfully!');
  process.exit(0);
}).catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
