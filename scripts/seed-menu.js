const AppDataSource = require('../src/db');
const Menu = require('../src/entity/Menu');


// example menus for each store (sample data)
const storeMenus = {
  1: [
    { name: "ก๋วยเตี๋ยวหมูน้ำใส", price: 55, categoryId: 1 },
    { name: "ก๋วยเตี๋ยวต้มยำ", price: 60, categoryId: 1 },
    { name: "ข้าวหมูแดง", price: 50, categoryId: 2 }
  ],
  2: [
    { name: "ลาเต้เย็น", price: 65, categoryId: 3 },
    { name: "เค้กช็อกโกแลต", price: 80, categoryId: 3 },
    { name: "ชาเขียวมัทฉะ", price: 55, categoryId: 3 }
  ],
  3: [
    { name: "ข้าวหน้าปลาไหล", price: 180, categoryId: 2 },
    { name: "ราเมนหมูชาชู", price: 120, categoryId: 1 },
    { name: "ซูชิรวม", price: 150, categoryId: 2 }
  ],
  4: [
    { name: "ขนมจีบกุ้ง", price: 40, categoryId: 3 },
    { name: "ซาลาเปาหมูสับ", price: 30, categoryId: 3 },
    { name: "ฮะเก๋า", price: 45, categoryId: 3 }
  ],
    5: [
    { name: "กุ้งอบวุ้นเส้น", price: 180, categoryId: 2 },
    { name: "ปูผัดผงกะหรี่", price: 250, categoryId: 2 },
    { name: "ต้มยำทะเล", price: 150, categoryId: 1 }
  ],
  6: [
    { name: "สลัดผักรวม", price: 70, categoryId: 3 },
    { name: "เต้าหู้ทอดซอสญี่ปุ่น", price: 60, categoryId: 3 },
    { name: "ข้าวกล้องผัดเห็ด", price: 80, categoryId: 2 }
  ],
  7: [
    { name: "พิซซ่ามาการิต้า", price: 180, categoryId: 2 },
    { name: "สปาเก็ตตี้โบโลเนส", price: 150, categoryId: 2 },
    { name: "ขนมปังกระเทียม", price: 60, categoryId: 3 }
  ],
  8: [
    { name: "ครัวซองต์", price: 55, categoryId: 3 },
    { name: "บาแกตต์แซนด์วิช", price: 90, categoryId: 2 },
    { name: "เอแคลร์", price: 45, categoryId: 3 }
  ],
    9: [
    { name: "แกงกะหรี่ไก่", price: 120, categoryId: 1 },
    { name: "นานกระเทียม", price: 40, categoryId: 3 },
    { name: "ซาโมซ่า", price: 35, categoryId: 3 }
  ],
  10: [
    { name: "เบอร์เกอร์วีแกน", price: 120, categoryId: 2 },
    { name: "สลัดควินัว", price: 90, categoryId: 3 },
    { name: "ซุปฟักทอง", price: 70, categoryId: 3 }
  ]
};

const menus = [];
let menuId = 1;
for (let storeId = 1; storeId <= 10; storeId++) {
  const menuList = storeMenus[storeId] || [];
  menuList.forEach(base => {
    menus.push({
      id: menuId++,
      storeId,
      ...base
    });
  });
}

AppDataSource.initialize().then(async () => {
  // Reset menus table and id sequence
  await AppDataSource.query('TRUNCATE TABLE menus RESTART IDENTITY CASCADE;');
  const repo = AppDataSource.getRepository('Menu');
  await repo.save(menus);
  console.log('Seeded menus successfully!');
  process.exit(0);
}).catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
