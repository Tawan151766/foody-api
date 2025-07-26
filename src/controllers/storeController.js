const AppDataSource = require('../db');

exports.getAllStores = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository('Store');
    const { name, address, nationality, category } = req.query;
    // Build filter object
    let where = {};
    if (name) where.name = () => `LOWER(name) LIKE '%${name.toLowerCase()}%'`;
    if (address) where.address = () => `LOWER(address) LIKE '%${address.toLowerCase()}%'`;
    if (nationality) where.nationality = nationality;
    if (category) where.category = category;

    let stores;
    if (Object.keys(where).length > 0) {
      // Use query builder for LIKE
      let qb = repo.createQueryBuilder('store');
      if (name) qb = qb.andWhere('LOWER(store.name) LIKE :name', { name: `%${name.toLowerCase()}%` });
      if (address) qb = qb.andWhere('LOWER(store.address) LIKE :address', { address: `%${address.toLowerCase()}%` });
      if (nationality) qb = qb.andWhere('store.nationality = :nationality', { nationality });
      if (category) qb = qb.andWhere('store.category = :category', { category });
      stores = await qb.getMany();
    } else {
      stores = await repo.find();
    }
    res.sendResponse({
      code: 200,
      message: 'Fetched restaurants successfully',
      data: { restaurants: stores },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch restaurants',
      data: null,
      error: err.message
    });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository('Store');
    const menuRepo = AppDataSource.getRepository('Menu');
    const store = await repo.findOneBy({ id: Number(req.params.id) });
    if (!store) {
      return res.sendResponse({
        status: 'error',
        code: 404,
        message: 'Store not found',
        data: null,
        error: 'Store not found'
      });
    }
    // join เมนู
    const menus = await menuRepo.find({ where: { storeId: store.id } });
    res.sendResponse({
      code: 200,
      message: 'Fetched restaurant successfully',
      data: { restaurant: { ...store, menus } },
      error: null
    });
  } catch (err) {
    res.sendResponse({
      status: 'error',
      code: 500,
      message: 'Failed to fetch restaurant',
      data: null,
      error: err.message
    });
  }
};
