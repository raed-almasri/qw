CREATE DATABASE  IF NOT EXISTS `estate` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `estate`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: estate
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.20-MariaDB

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
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'يطل على البحر الأسود','شقة فيو مميز على شاطئ البحر الأسود','2024-01-21 16:33:31'),(2,'مدخنة للشواء','منطقة مخصصة للشواء في الحديقة','2024-01-21 16:33:31'),(3,'مسبح خاص','يتميز المشروع بوجود مسبح خاص لسكان العقار','2024-01-21 16:33:31'),(4,'ملاعب رياضية','توفر المشروع ملاعب لمختلف الألعاب الرياضية','2024-01-21 16:33:31'),(5,'إطلالة بانورامية على المدينة','تمتاز الوحدات بإطلالات خلابة على المدينة','2024-01-21 16:33:31');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(150) NOT NULL,
  `originalname` varchar(255) NOT NULL,
  `project_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multi_languages_features`
--

DROP TABLE IF EXISTS `multi_languages_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multi_languages_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang` varchar(255) NOT NULL,
  `feature_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feature_id` (`feature_id`),
  CONSTRAINT `multi_languages_features_ibfk_1` FOREIGN KEY (`feature_id`) REFERENCES `features` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multi_languages_features`
--

LOCK TABLES `multi_languages_features` WRITE;
/*!40000 ALTER TABLE `multi_languages_features` DISABLE KEYS */;
INSERT INTO `multi_languages_features` VALUES (1,'English',1,'Overlooking the Black Sea','Apartment with a distinctive view on the Black Sea shore'),(2,'English',2,'BBQ Area','Designated barbecue area in the garden'),(3,'English',3,'Private Pool','The project features a private pool for the residents'),(4,'English',4,'Sports Courts','The project provides courts for various sports activities'),(5,'English',5,'Panoramic City View','The units feature breathtaking views of the city'),(6,'Turkish',1,'Karadeniz\'e Manzaralı','Karadeniz kıyısında benzersiz manzaralı daire'),(7,'Turkish',2,'Mangal Alanı','Bahçedeki özel mangal alanı'),(8,'Turkish',3,'Özel Yüzme Havuzu','Proje, sakinler için özel bir yüzme havuzu sunmaktadır'),(9,'Turkish',4,'Spor Sahaları','Proje, çeşitli spor aktiviteleri için sahalar sunmaktadır'),(10,'Turkish',5,'Panoramik Şehir Manzarası','Üniteler, şehrin nefes kesen manzaralarına sahiptir');
/*!40000 ALTER TABLE `multi_languages_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multi_languages_projects`
--

DROP TABLE IF EXISTS `multi_languages_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multi_languages_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang` varchar(255) NOT NULL,
  `project_id` int(11) NOT NULL,
  `projectName` varchar(255) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `multi_languages_projects_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multi_languages_projects`
--

LOCK TABLES `multi_languages_projects` WRITE;
/*!40000 ALTER TABLE `multi_languages_projects` DISABLE KEYS */;
INSERT INTO `multi_languages_projects` VALUES (3,'English',1,'New project here 2024','A new project from the Ghouta neighborhood here','Homes','Ghouta'),(4,'Turkish',1,'Yeni proje burada 2024','Guta mahallesinden yeni bir proje burada','Evler','Guta'),(5,'English',2,'New villa project','Al-Ghouta Farm is one of the large farms available within the Al-Ghouta neighborhood','Syria Homs','Ghouta'),(6,'Turkish',2,'Yeni villa projesi','Al-Ghouta Çiftliği, Al-Ghouta semtinde bulunan büyük çiftliklerden biridir.','Suriye Humus','Guta');
/*!40000 ALTER TABLE `multi_languages_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_features`
--

DROP TABLE IF EXISTS `project_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `FeatureId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `FeatureId` (`FeatureId`),
  CONSTRAINT `project_features_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_features_ibfk_2` FOREIGN KEY (`FeatureId`) REFERENCES `features` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_features`
--

LOCK TABLES `project_features` WRITE;
/*!40000 ALTER TABLE `project_features` DISABLE KEYS */;
INSERT INTO `project_features` VALUES (3,1,1),(4,1,2),(5,2,1),(6,2,2);
/*!40000 ALTER TABLE `project_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(255) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `city` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `propertyType` enum('apartment','villa','house','land') NOT NULL,
  `status` enum('available','sold','deleted') NOT NULL,
  `suitableForTurkishCitizenship` tinyint(1) NOT NULL,
  `numberOfRooms` int(11) NOT NULL,
  `paymentMethods` enum('Cash','Installments','Both') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'مشروع جديد هنا2024','مشروع جديد من حي الغوطة هنا',350012.00,'Homs','الغوطة','villa','available',1,5,'Both','2024-01-21 16:33:50','2024-01-21 16:35:11'),(2,'مشروع الفيلا الجددة','مزرعة الغوطة هي احدى المزارع الكبيرة المتوفرة ضمن حي الغوطة ',35001.00,'سوريا حمص','الغوطة','villa','available',1,5,'Both','2024-01-22 05:36:29','2024-01-22 05:36:29');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `refresh_token` varchar(1000) DEFAULT NULL,
  `deviceId` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (1,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJjOGEzY2U0MzJlZjQ0NGQ5NTU0ZTA2NzJlMTIyYTY4ODc5YmY1YmY0NWYyODQ5MWRjMDQxZGRhMDg2ZGE2ZmIzM2Q5MzBlOGJlNDdiOGMzYTJmNjE4OTIxNGUxNjc4MWEwZTMxMzBhYzcwNThjYzU2YjUwNWFkYmQ1MzNkZDM1NCIsImlhdCI6MTcwNTkwMTc4NiwiZXhwIjoxNzIxNDUzNzg2fQ.FRCj865gDhdlKL2cJ3pd1YKbUJSKLq0FxdXw_ihOJ8E','c072a8f3-c60e-4470-9c2d-bc150b4c628e','::1','2024-01-22 05:36:26');
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `role` enum('Dev','Admin') NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_name_unique` (`user_name`),
  UNIQUE KEY `username_index` (`user_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin 1','admin_1','Admin','$2a$12$5g9cOs8Olv7Yg0P7ZBFxKO1qXiGLApHbnOJM5s4le6qKy7kSFY7wK','2024-01-21 16:33:31','2024-01-21 16:33:31'),(2,'admin 2','admin_2','Admin','$2a$12$1sBS8Ls2cbrcGojQrmvrJeQhqBEt1NYeVTP/.mAoe2TshFje92ks6','2024-01-21 16:33:32','2024-01-21 16:33:32'),(3,'developer','dev','Dev','$2a$12$xHjcCqIaiQ.RET2RtZHTkOG192.924AxQkbHtvS8.bAItGo7VKRaq','2024-01-21 16:33:33','2024-01-21 16:33:33');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'estate'
--

--
-- Dumping routines for database 'estate'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 14:45:48
