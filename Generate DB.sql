-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2024 at 03:17 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lyk`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `carName` varchar(255) NOT NULL,
  `manufacturingYear` int(11) NOT NULL,
  `carType` enum('benzin','dizel') NOT NULL,
  `carPresence` enum('Sakarya','Istanbul') NOT NULL,
  `rental` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`rental`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `car_images`
--

CREATE TABLE `car_images` (
  `id` int(11) NOT NULL,
  `file_name` varchar(150) NOT NULL,
  `originalname` varchar(255) NOT NULL,
  `car_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` int(11) NOT NULL,
  `name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`name`)),
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`description`)),
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `name`, `description`, `createdAt`) VALUES
(1, '{\"ar\":\"يطل على البحر الأسود\",\"en\":\"Overlooking the Black Sea\",\"tr\":\"Karadeniz\'e Manzaralı\"}', '{\"ar\":\"شقة فيو مميز على شاطئ البحر الأسود\",\"en\":\"Apartment with a distinctive view on the Black Sea shore\",\"tr\":\"Karadeniz kıyısında benzersiz manzaralı daire\"}', '2024-03-18 14:17:43'),
(2, '{\"ar\":\"مدخنة للشواء\",\"en\":\"BBQ Area\",\"tr\":\"Mangal Alanı\"}', '{\"ar\":\"منطقة مخصصة للشواء في الحديقة\",\"en\":\"Designated barbecue area in the garden\",\"tr\":\"Bahçedeki özel mangal alanı\"}', '2024-03-18 14:17:43'),
(3, '{\"ar\":\"مدخنة للشواء\",\"en\":\"Private Pool\",\"tr\":\"Özel Yüzme Havuzu\"}', '{\"ar\":\"منطقة مخصصة للشواء في الحديقة\",\"en\":\"The project features a private pool for the residents\",\"tr\":\"Proje, sakinler için özel bir yüzme havuzu sunmaktadır\"}', '2024-03-18 14:17:43'),
(4, '{\"ar\":\"ملاعب رياضية\",\"en\":\"Panoramic City View\",\"tr\":\"Panoramik Şehir Manzarası\"}', '{\"ar\":\"توفر المشروع ملاعب لمختلف الألعاب الرياضية\",\"en\":\"The units feature breathtaking views of the city\",\"tr\":\"Üniteler, şehrin nefes kesen manzaralarına sahiptir\"}', '2024-03-18 14:17:43');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `file_name` varchar(150) NOT NULL,
  `originalname` varchar(255) NOT NULL,
  `project_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `projectName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`projectName`)),
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`description`)),
  `city` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`city`)),
  `area` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`area`)),
  `price` decimal(10,2) NOT NULL,
  `propertyType` enum('apartment','villa','house','land') NOT NULL,
  `status` enum('available','sold','deleted') NOT NULL,
  `suitableForTurkishCitizenship` tinyint(1) NOT NULL,
  `numberOfRooms` int(11) NOT NULL,
  `paymentMethods` enum('Cash','Installments','Both') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `project_features`
--

CREATE TABLE `project_features` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `FeatureId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `refresh_token`
--

CREATE TABLE `refresh_token` (
  `id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `refresh_token` varchar(1000) DEFAULT NULL,
  `deviceId` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `role` enum('Dev','Admin') NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `user_name`, `role`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin 1', 'admin_1', 'Admin', '$2a$12$8Xtc6Nyz8NTTTW6S6R7jxuEbE6hh2dBTkBYoZ2sYjVyVUt88Dcwqe', '2024-03-18 14:17:44', '2024-03-18 14:17:44'),
(2, 'admin 2', 'admin_2', 'Admin', '$2a$12$macJxhc4LHAqqv17NKKJzuvMpzg07vbCphLtJoX7G1pMz.GjnZRNi', '2024-03-18 14:17:44', '2024-03-18 14:17:44'),
(3, 'developer', 'dev', 'Dev', '$2a$12$8RDNiClEKxsUO0Awllt18u4M7qvj96NuqXFPKelOG1VeeYT4csPyi', '2024-03-18 14:17:45', '2024-03-18 14:17:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_images`
--
ALTER TABLE `car_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_features`
--
ALTER TABLE `project_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `FeatureId` (`FeatureId`);

--
-- Indexes for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_name_unique` (`user_name`),
  ADD UNIQUE KEY `username_index` (`user_name`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_images`
--
ALTER TABLE `car_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_features`
--
ALTER TABLE `project_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refresh_token`
--
ALTER TABLE `refresh_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car_images`
--
ALTER TABLE `car_images`
  ADD CONSTRAINT `car_images_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_features`
--
ALTER TABLE `project_features`
  ADD CONSTRAINT `project_features_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_features_ibfk_2` FOREIGN KEY (`FeatureId`) REFERENCES `features` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
