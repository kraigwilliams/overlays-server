

module.exports={
PORT: process.env.PORT || 8000,
NODE_ENV: process.env.NODE_ENV || 'development',
DB_URL:process.env.DB_URL || "https://kraig-overlays-server.herokuapp.com/",
JWT_SECRET: process.env.JWT_SECRET || "kraighasalittlesecret",
JWT_EXPIRY: process.env.JWT_EXPIRY || '3D',
TEST_DATABASE_URL: process.env.TEST_DATABASE_URL
}