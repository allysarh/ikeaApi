-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: db_ikea
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `idcart` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `idProduk` int NOT NULL,
  `idproduk_stok` int NOT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`idcart`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (6,6,37,36,10),(7,7,37,36,10),(8,7,37,36,10),(9,7,54,44,2),(25,1,36,32,1),(26,1,35,31,1),(27,1,54,43,1),(28,1,34,29,1),(29,1,34,29,1),(30,1,34,29,1),(31,1,34,29,1),(32,1,34,29,1),(33,1,34,29,1),(43,16,1,2,1),(58,2,37,35,2),(61,2,36,32,3),(62,2,36,33,1),(63,2,36,34,1),(64,2,36,32,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori` (
  `idkategori` int NOT NULL AUTO_INCREMENT,
  `kategori` varchar(200) NOT NULL,
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`idkategori`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori`
--

LOCK TABLES `kategori` WRITE;
/*!40000 ALTER TABLE `kategori` DISABLE KEYS */;
INSERT INTO `kategori` VALUES (1,'Elektronic',NULL),(2,'Furniture Rumah',NULL),(3,'Furniture Kantor',NULL),(4,'Air Quality',1),(5,'Lighting',1),(6,'Alat Masak',1),(7,'Ruang Tamu',2),(8,'Kamar',2),(9,'Lemari',3),(10,'Kursi Kantor',3),(11,'Microwave',6),(12,'Kulkas',6),(13,'Sofa',7),(14,'Karpet',7),(15,'TV',1),(16,'Bed',8),(17,'Kamar Mandi',2),(18,'Cookware and Tableware',NULL),(19,'Tabbleware',18),(20,'Cookware',18),(21,'Gelas',19),(22,'Piring',19),(23,'Coffe Maker',20),(24,'Dekorasi',NULL),(25,'Vas',24),(26,'Storage and Organization',NULL),(27,'Tas',26),(28,'Storage',26),(29,'Tempat Sampah',26);
/*!40000 ALTER TABLE `kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produk_kategori`
--

DROP TABLE IF EXISTS `produk_kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produk_kategori` (
  `idproduk_kategori` int NOT NULL AUTO_INCREMENT,
  `idProduk` int NOT NULL,
  `idkategori` int DEFAULT NULL,
  PRIMARY KEY (`idproduk_kategori`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produk_kategori`
--

LOCK TABLES `produk_kategori` WRITE;
/*!40000 ALTER TABLE `produk_kategori` DISABLE KEYS */;
INSERT INTO `produk_kategori` VALUES (1,57,3),(2,57,9),(3,63,2),(4,63,7),(7,61,1),(8,61,5),(9,70,5),(10,70,1),(11,71,16),(12,71,8),(13,71,2),(14,72,7),(15,72,2),(16,55,16),(17,55,8),(18,56,16),(19,58,17),(20,58,2),(21,55,2),(22,73,14),(23,73,7),(24,73,2),(25,74,4),(26,74,1),(27,72,13),(28,72,9),(29,72,3),(30,64,9),(31,64,3),(34,59,23),(35,59,20),(36,59,18),(37,34,14),(38,34,7),(39,34,2),(40,35,25),(41,35,24),(42,37,26),(43,37,28),(44,60,23),(45,60,20),(46,60,18),(47,62,21),(48,62,19),(49,62,18),(50,54,29),(51,54,26),(52,36,27),(53,36,26);
/*!40000 ALTER TABLE `produk_kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `idstatus` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`idstatus`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Available'),(2,'Not Avaliable'),(3,'Active'),(4,'Not Active'),(5,'Restock'),(6,'Unpaid'),(7,'Paid'),(8,'Processed'),(9,'Delivered'),(10,'Received'),(11,'Verified'),(12,'Unverified');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_products`
--

DROP TABLE IF EXISTS `tb_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_products` (
  `idProduk` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  `deskripsi` varchar(1000) DEFAULT NULL,
  `harga` int NOT NULL,
  `brand` varchar(45) NOT NULL,
  `idstatus` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idProduk`,`brand`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_products`
--

LOCK TABLES `tb_products` WRITE;
/*!40000 ALTER TABLE `tb_products` DISABLE KEYS */;
INSERT INTO `tb_products` VALUES (1,'TEST','Vas kaca bening 17 cm',29900,'IKEA',2),(2,'VAS BUNGA','',10000,'IKEA',2),(34,'RUNNEN','Dek lantai ruang luar',345000,'IKEA',1),(35,'PADRAG','Vas kaca bening 17 cm',29900,'IKEA',1),(36,'SKYNKE','Nyaman dan lembut',14900,'IKEA',1),(37,'TROFAST','Kotak penyimpanan serbaguna',30000,'IKEA',1),(54,'SNAPP ','Tempaat sampah dengan pedal ukuran 5L',149000,'IKEA',1),(55,'NEIDEN','Frame tempat tidur',4900000,'IKEA',1),(56,'SONGESAND','Bed frame dengan laci',5900000,'IKEA',1),(57,'KALLAX','Book shelf',199000,'IKEA',1),(58,'BROGRUND','Riser rail with hand shower/outlet, chrome plated',299000,'IKEA',1),(59,'UPPHETTA','French press coffee maker, glass/stainless steel34 oz',199000,'IKEA',1),(60,'BEHOVD','Vacuum flask, light green/beige34 oz',89900,'IKEA',1),(61,'NYMANE','Pendant lamp, white',799000,'IKEA',1),(62,'GRADVIS','Plant pot, indoor/outdoor black2 ¼ \"',29900,'IKEA',1),(63,'FJALLBO','TV storage combination, black98 3/8x14 1/8x37 3/8 \"',39900000,'IKEA',2),(64,'MOPPE','Mini storage chest, birch plywood16 ½x7x12 5/8 \"',349900,'IKEA',1),(70,'MYRVARV','Strip lamp',29900,'IKEA',1),(71,'HEMNES','Daybed frame with 3 drawers, whiteTwin',4999000,'IKEA',1),(72,'FINNALA','Sectional, 4-seat, with chaise/Gunnared medium gray',7990900,'IKEA',1),(73,'STOCKHOLM 2017','Karpet, anyaman datar, buatan tangan/biru, 170x240 cm',4499000,'IKEA',1),(74,'Air Purfier','Air purifier, white12x18 \"',7499000,'IKEA',1);
/*!40000 ALTER TABLE `tb_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_products_image`
--

DROP TABLE IF EXISTS `tb_products_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_products_image` (
  `idproduct_image` int NOT NULL AUTO_INCREMENT,
  `idProduk` int NOT NULL,
  `images` varchar(1000) NOT NULL,
  PRIMARY KEY (`idproduct_image`),
  KEY `fk_pi_idx` (`idProduk`),
  CONSTRAINT `fk_pi` FOREIGN KEY (`idProduk`) REFERENCES `tb_products` (`idProduk`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_products_image`
--

LOCK TABLES `tb_products_image` WRITE;
/*!40000 ALTER TABLE `tb_products_image` DISABLE KEYS */;
INSERT INTO `tb_products_image` VALUES (1,1,'https://images.unsplash.com/photo-1523215108660-3fdf7932d7a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=745&q=80'),(2,1,'https://images.unsplash.com/photo-1601933470096-0e34634ffcde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'),(3,2,'11'),(4,2,'12'),(8,34,'https://www.ikea.com/us/en/images/products/runnen-decking-outdoor-brown-stained__0709178_pe726855_s5.jpg?f=m'),(9,34,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/078/0907894_PE619791_S3.jpg'),(10,34,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/079/0907911_PE656499_S4.jpg'),(11,35,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/690/0969056_PE810681_S4.jpg'),(12,35,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/410/0941050_PE795311_S4.jpg'),(13,35,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/168/1016878_PH177103_S4.jpg'),(14,36,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/764/0976460_PE813234_S4.jpg'),(15,36,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/764/0976462_PE813235_S3.jpg'),(16,36,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/764/0976461_PE813236_S4.jpg'),(17,37,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/242/0624258_PE691761_S4.jpg'),(18,37,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/425/0642580_PE701272_S4.jpg'),(25,54,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/111/0711191_PE728060_S4.jpg'),(26,54,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/111/0711170_PE728039_S4.jpg'),(27,55,'https://www.ikea.com/us/en/images/products/neiden-bed-frame-pine-luroey__0749132_pe745501_s5.jpg?f=s'),(28,55,'https://www.ikea.com/us/en/images/products/neiden-bed-frame-pine-luroey__0869119_pe664784_s5.jpg?f=g'),(29,55,'https://www.ikea.com/us/en/images/products/neiden-bed-frame-pine-luroey__0751540_pe747079_s5.jpg?f=g'),(30,56,'https://www.ikea.com/us/en/images/products/songesand-bed-frame-with-2-storage-boxes-white-luroey__0655476_pe709044_s5.jpg?f=s'),(31,56,'https://www.ikea.com/us/en/images/products/songesand-bed-frame-with-2-storage-boxes-white-luroey__0627013_ph149311_s5.jpg?f=g'),(32,56,'https://www.ikea.com/us/en/images/products/songesand-bed-frame-with-2-storage-boxes-white-luroey__0752949_pe747528_s5.jpg?f=g'),(33,57,'https://www.ikea.com/us/en/images/products/kallax-shelf-unit-gray-wood-effect__0494558_pe627165_s5.jpg?f=s'),(34,57,'https://www.ikea.com/us/en/images/products/kallax-shelf-unit-high-gloss-white__0627096_pe693189_s5.jpg?f=s'),(35,57,'https://www.ikea.com/us/en/images/products/kallax-shelf-unit-black-brown__0644754_pe702938_s5.jpg?f=s'),(36,58,'https://www.ikea.com/us/en/images/products/brogrund-riser-rail-with-hand-shower-outlet-chrome-plated__0755269_pe748313_s5.jpg?f=s'),(37,58,'https://www.ikea.com/us/en/images/products/brogrund-riser-rail-with-hand-shower-outlet-chrome-plated__0864132_pe668845_s5.jpg?f=s'),(38,58,'https://www.ikea.com/us/en/images/products/brogrund-riser-rail-with-hand-shower-outlet-chrome-plated__0862466_pe668868_s5.jpg?f=m'),(39,59,'https://www.ikea.com/us/en/images/products/upphetta-french-press-coffee-maker-glass-stainless-steel__0713350_pe729456_s5.jpg?f=s'),(40,59,'https://www.ikea.com/us/en/images/products/upphetta-french-press-coffee-maker-glass-stainless-steel__0900307_pe607787_s5.jpg?f=g'),(41,59,'https://www.ikea.com/us/en/images/products/upphetta-french-press-coffee-maker-glass-stainless-steel__0900314_pe607788_s5.jpg?f=g'),(42,60,'https://www.ikea.com/us/en/images/products/behoevd-vacuum-flask-light-green-beige__0711249_pe728124_s5.jpg?f=s'),(43,60,'https://www.ikea.com/us/en/images/products/behoevd-vacuum-flask-light-green-beige__0900646_pe629674_s5.jpg?f=s'),(44,60,'https://www.ikea.com/us/en/images/products/behoevd-vacuum-flask-light-green-beige__0610767_ph149142_s5.jpg?f=s'),(45,61,'https://www.ikea.com/us/en/images/products/nymane-pendant-lamp-white__0485490_pe621551_s5.jpg?f=s'),(46,61,'https://www.ikea.com/us/en/images/products/nymane-pendant-lamp-white__0880674_pe632990_s5.jpg?f=s'),(47,61,'https://www.ikea.com/us/en/images/products/nymane-pendant-lamp-white__0880668_pe632989_s5.jpg?f=s'),(48,62,'https://www.ikea.com/us/en/images/products/gradvis-plant-pot-indoor-outdoor-black__0990201_pe820997_s5.jpg?f=s'),(49,62,'https://www.ikea.com/us/en/images/products/gradvis-plant-pot-indoor-outdoor-dark-gray__0990207_pe821000_s5.jpg?f=m'),(50,62,'https://www.ikea.com/us/en/images/products/gradvis-plant-pot-pink__0614220_pe686849_s5.jpg?f=s'),(51,62,'https://www.ikea.com/us/en/images/products/gradvis-plant-pot-gray__0614224_pe686845_s5.jpg?f=s'),(52,63,'https://www.ikea.com/us/en/images/products/fjaellbo-tv-storage-combination-black__0625394_pe692240_s5.jpg?f=s'),(53,63,'https://www.ikea.com/us/en/images/products/fjaellbo-tv-storage-combination-black__0851058_pe616411_s5.jpg?f=s'),(54,63,'https://www.ikea.com/us/en/images/products/fjaellbo-tv-storage-combination-black__0658091_ph150619_s5.jpg?f=g'),(55,64,'https://www.ikea.com/us/en/images/products/moppe-mini-storage-chest-birch-plywood__0135959_pe292948_s5.jpg?f=s'),(56,64,'https://www.ikea.com/us/en/images/products/moppe-mini-storage-chest-birch-plywood__0646822_pe704337_s5.jpg?f=s'),(57,64,'https://www.ikea.com/us/en/images/products/moppe-mini-storage-chest-birch-plywood__0681265_ph149189_s5.jpg?f=s'),(58,70,'https://www.ikea.com/us/en/images/products/myrvarv-led-light-strip-flexible-dimmable__0933835_pe792233_s5.jpg?f=xxs'),(59,70,'https://www.ikea.com/us/en/images/products/myrvarv-led-light-strip-flexible-dimmable__0971548_pe811375_s5.jpg?f=xxs'),(60,70,'https://www.ikea.com/us/en/images/products/myrvarv-led-light-strip-flexible-dimmable__0967072_pe810031_s5.jpg?f=xxxs'),(61,71,'https://www.ikea.com/us/en/images/products/hemnes-daybed-frame-with-3-drawers-white__0636371_pe697851_s5.jpg?f=s'),(62,71,'https://www.ikea.com/us/en/images/products/myrvarv-led-light-strip-flexible-dimmable__0971548_pe811375_s5.jpg?f=xxs'),(63,71,'https://www.ikea.com/us/en/images/products/hemnes-daybed-frame-with-3-drawers-white__0857890_pe632055_s5.jpg?f=s'),(64,72,'https://www.ikea.com/us/en/images/products/finnala-sectional-4-seat-with-chaise-gunnared-medium-gray__0514365_pe639438_s5.jpg?f=s'),(65,72,'https://www.ikea.com/us/en/images/products/finnala-sectional-4-seat-with-chaise-gunnared-beige__0514363_pe639433_s5.jpg?f=s'),(66,72,'https://www.ikea.com/us/en/images/products/finnala-sectional-4-seat-with-chaise-gunnared-beige__0778323_pe758890_s5.jpg?f=s'),(67,73,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/489/0448979_PE598550_S4.jpg'),(68,73,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/916/0891626_PE598551_S4.jpg'),(69,73,'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/451/0545177_PH141719_S4.jpg'),(70,74,'https://www.ikea.com/us/en/images/products/foernuftig-air-purifier-black__0832292_pe777643_s5.jpg?f=m'),(71,74,'https://www.ikea.com/us/en/images/products/foernuftig-air-purifier-black__0832293_pe777644_s5.jpg?f=s'),(72,74,'https://www.ikea.com/us/en/images/products/foernuftig-air-purifier-black__0837029_pe778646_s5.jpg?f=m');
/*!40000 ALTER TABLE `tb_products_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_products_stok`
--

DROP TABLE IF EXISTS `tb_products_stok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_products_stok` (
  `idproduk_stok` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `idstatus` int NOT NULL DEFAULT '1',
  `qty` int NOT NULL,
  `idProduk` int NOT NULL,
  PRIMARY KEY (`idproduk_stok`),
  KEY `fk_product_idx` (`idProduk`),
  CONSTRAINT `fk_ps` FOREIGN KEY (`idProduk`) REFERENCES `tb_products` (`idProduk`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_products_stok`
--

LOCK TABLES `tb_products_stok` WRITE;
/*!40000 ALTER TABLE `tb_products_stok` DISABLE KEYS */;
INSERT INTO `tb_products_stok` VALUES (1,'White',2,20,1),(2,'Black',1,30,1),(3,'Green',1,30,1),(4,'green',1,10,2),(5,'blue',1,10,2),(29,'Hitam',1,10,34),(30,'Coklat',1,20,34),(31,'Small',1,30,35),(32,'Biru',1,10,36),(33,'Oranye',1,10,36),(34,'Hitam',1,10,36),(35,'Kuning',1,10,37),(36,'Putih',1,20,37),(43,'Biru',1,10,54),(44,'Putih',1,30,54),(45,'Oak',1,10,55),(46,'Putih',1,10,56),(47,'Grey',1,10,57),(48,'Black',1,10,57),(49,'White',1,10,57),(50,'Silver',1,10,58),(51,'Mini',1,10,59),(52,'Tosca',1,20,60),(53,'White',1,10,61),(54,'Black',1,10,62),(55,'Pink',1,10,62),(56,'White',1,10,62),(57,'Dark Grey',1,10,62),(58,'Black',1,15,63),(59,'Wood',1,10,64),(60,'Small',1,30,70),(61,'White',1,30,71),(62,'Beige',1,30,72),(63,'Grey',1,30,72),(64,'Biru',1,10,73),(65,'Black',1,10,74),(66,'White',1,10,74);
/*!40000 ALTER TABLE `tb_products_stok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` varchar(45) DEFAULT 'User',
  `otp` varchar(45) DEFAULT NULL,
  `idstatus` int NOT NULL DEFAULT '12',
  PRIMARY KEY (`id`),
  KEY `fk_us_idx` (`idstatus`),
  CONSTRAINT `fk_us` FOREIGN KEY (`idstatus`) REFERENCES `status` (`idstatus`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,'Admin','admin@mail.com','1234','Admin',NULL,11),(2,'Allysa','allysa@mail.com','1234','User',NULL,11),(3,'Jarjit','jarjit@mail.com','1234','User',NULL,11),(4,'ros','ros@mail.com','1234','User',NULL,11),(5,'ros','ros@mail.com','1234','User',NULL,4),(6,'ros','ros@mail.com','1234','User',NULL,4),(7,'mark','mark@mail.com','1234','User',NULL,12),(8,'mark','mark@mail.com','1234','User',NULL,12),(9,'johnny','johnny@mail.com','1234','User',NULL,12),(10,'nana','nana@mail.com','1234','User',NULL,12),(11,'uwu','uwu@mail.com','1234abc','User',NULL,12),(12,'udin','udin@mail.com','123abc','User',NULL,12),(13,'jenolee','jeno@mail.com','1234','User',NULL,12),(14,'haechanlee','haechan@mail.com','1234','User',NULL,12),(15,'kakros','kakros@mail.com','1234','User',NULL,12),(16,'pcy','pcy@mail.com','nanugi27','User',NULL,12),(17,'ty','ty@mail.com','1234','User','504be6',12),(18,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(19,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(20,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(21,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(22,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(23,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(24,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(25,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(26,'allysarahma23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(27,'allysarh23','allysa.rahmagustiani@gmail.com','1234abc','User',NULL,12),(31,'abdi','abdialghi@gmail.com','1234abc','User',NULL,12),(42,'allysarh','allysa.rahagustiani@gmail.com','ba149aa5fdaf2186b946995d6da3e45ba1bd39ac84aae083c053d23cc32ef9d3','User','39wgh1',11);
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_detail` (
  `idtransaction_detail` int NOT NULL AUTO_INCREMENT,
  `idtransaction` int NOT NULL,
  `idProduk` int NOT NULL,
  `idproduk_stok` int NOT NULL,
  `qty` int NOT NULL,
  PRIMARY KEY (`idtransaction_detail`),
  KEY `fk_transaction_idx` (`idtransaction`),
  KEY `fk_product_idx` (`idProduk`),
  KEY `fk_stok_idx` (`idproduk_stok`),
  CONSTRAINT `fk_product` FOREIGN KEY (`idProduk`) REFERENCES `tb_products` (`idProduk`),
  CONSTRAINT `fk_stok` FOREIGN KEY (`idproduk_stok`) REFERENCES `tb_products_stok` (`idproduk_stok`),
  CONSTRAINT `fk_transaction` FOREIGN KEY (`idtransaction`) REFERENCES `transactions` (`idtransaction`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_detail`
--

LOCK TABLES `transaction_detail` WRITE;
/*!40000 ALTER TABLE `transaction_detail` DISABLE KEYS */;
INSERT INTO `transaction_detail` VALUES (26,27,2,4,1),(27,28,2,4,1),(28,29,2,4,1),(29,30,2,4,1),(30,31,2,4,1),(31,32,2,3,1),(32,33,34,29,1),(43,43,54,44,1),(44,44,54,43,1),(45,45,37,35,1),(46,46,37,35,1),(47,46,54,43,1),(48,47,35,31,1),(49,48,35,31,1),(50,49,37,35,1),(51,50,36,33,1),(52,51,1,2,1),(53,52,36,32,1),(54,53,36,32,1),(55,54,59,51,1),(56,54,58,50,1),(57,55,37,35,1),(58,56,64,59,1),(59,57,62,56,1),(60,58,55,45,1),(61,59,63,58,1),(62,60,35,31,1),(63,61,60,52,1),(64,62,37,35,1),(65,62,64,59,1),(66,62,55,45,1),(67,63,37,35,1),(68,64,36,32,1),(69,65,35,31,1);
/*!40000 ALTER TABLE `transaction_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `idtransaction` int NOT NULL AUTO_INCREMENT,
  `invoice` varchar(45) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL,
  `ongkir` int DEFAULT '0',
  `total_payment` int NOT NULL,
  `note` varchar(150) DEFAULT NULL,
  `idstatus` int DEFAULT '6',
  PRIMARY KEY (`idtransaction`),
  KEY `fk_us_idx` (`idstatus`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (27,'#INVOICE/123123','2021-06-02 10:31:55',2,15000,1500000,'Jangan Banting',6),(28,'#INVOICE/123123','2021-06-02 10:47:56',2,15000,1500000,'Jangan Banting',6),(29,'#INVOICE/123123','2021-06-02 10:48:04',2,15000,1500000,'Jangan Banting',6),(30,'#INVOICE/123123','2021-06-02 10:48:13',2,15000,1500000,'Jangan Banting',6),(31,'#INVOICE/123123','2021-06-02 10:49:27',2,15000,1500000,'Jangan Banting',6),(32,'#INVOICE/123123','2021-06-02 10:50:32',2,15000,1500000,'Jangan Banting',6),(33,'#INVOICE/123123','2021-06-02 10:51:21',2,15000,1500000,'Jangan Banting',6),(43,'#INVOICE/353J','2021-06-02 14:06:05',3,15000,149000,'',8),(44,'#INVOICE/255H','2021-06-02 14:17:13',3,15000,149000,'',8),(45,'#INVOICE/63A','2021-06-02 16:10:11',3,15000,30000,'',8),(46,'#INVOICE/303B','2021-06-02 17:03:10',3,15000,179000,'',8),(47,'#INVOICE/223F','2021-06-02 17:05:19',13,15000,29900,'',6),(48,'#INVOICE/293E','2021-06-02 17:12:51',3,15000,29900,'',8),(49,'#INVOICE/796H','2021-06-02 17:13:13',3,15000,30000,'',8),(50,'#INVOICE/319H','2021-06-02 17:13:34',3,15000,14900,'',8),(51,'#INVOICE/168G','2021-06-02 17:13:45',3,15000,29900,'',8),(52,'#INVOICE/25F','2021-06-02 17:15:29',3,15000,14900,'',8),(53,'#INVOICE/19J','2021-06-03 13:22:28',10,15000,14900,'',8),(54,'#INVOICE/556A','2021-06-03 13:27:53',10,15000,498000,'',8),(55,'#INVOICE/916A','2021-06-03 13:28:27',10,15000,30000,'',8),(56,'#INVOICE/113E','2021-06-03 13:30:22',10,15000,349900,'',8),(57,'#INVOICE/776E','2021-06-03 13:31:26',10,15000,29900,'',8),(58,'#INVOICE/772B','2021-06-03 13:31:42',10,15000,4900000,'',8),(59,'#INVOICE/390E','2021-06-03 13:32:30',10,15000,39900000,'',8),(60,'#INVOICE/127J','2021-06-03 13:37:20',10,15000,29900,'',8),(61,'#INVOICE/739G','2021-06-03 13:39:00',10,15000,89900,'',8),(62,'#INVOICE/476H','2021-06-03 14:10:09',10,15000,5279900,'',8),(63,'#INVOICE/390A','2021-06-10 15:26:29',42,15000,30000,'',7),(64,'#INVOICE/556D','2021-06-10 15:34:25',42,15000,14900,'',7),(65,'#INVOICE/741J','2021-06-11 09:15:42',42,15000,29900,'',7);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_ikea'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-15 10:15:41
