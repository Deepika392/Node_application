-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 09, 2024 at 11:52 AM
-- Server version: 8.0.39-0ubuntu0.22.04.1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `POC`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int NOT NULL,
  `categoryName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `categoryName`, `createdAt`, `updatedAt`) VALUES
(1, 'Bike', '2024-07-11 06:52:35', '2024-07-11 07:00:17'),
(22, 'car', '2024-07-22 13:53:49', '2024-07-22 13:53:49');

-- --------------------------------------------------------

--
-- Table structure for table `Masterroutes`
--

CREATE TABLE `Masterroutes` (
  `id` int NOT NULL,
  `moduleId` int NOT NULL,
  `route_path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `route_elm` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `permission_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Masterroutes`
--

INSERT INTO `Masterroutes` (`id`, `moduleId`, `route_path`, `route_elm`, `permission_type`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'role', '<Role />', 'view', '2024-07-30 12:49:41', '2024-07-30 12:49:41'),
(2, 2, 'addrole', '<Addrole />', 'add', '2024-07-30 13:07:25', '2024-07-30 13:07:25'),
(3, 2, 'addrole/:roleId', '<Addrole />', 'edit', '2024-07-30 13:07:25', '2024-07-30 13:07:25'),
(4, 3, 'Permission', '<Permission />', 'view', '2024-07-30 13:10:41', '2024-07-30 13:10:41'),
(5, 3, 'addpermission', '<Addpermission />', 'add', '2024-07-30 13:10:41', '2024-07-30 13:10:41'),
(6, 3, 'addpermission/:permissionId', '<Addpermission />', 'edit', '2024-07-30 13:11:20', '2024-07-30 13:11:20'),
(7, 4, 'user', '<User />', 'view', '2024-07-30 13:11:44', '2024-07-30 13:11:44'),
(8, 4, 'adduser', '<AddUser />', 'add', '2024-07-30 13:11:44', '2024-07-30 13:11:44'),
(9, 4, 'adduser/:userId', '<AddUser />', 'edit', '2024-07-30 13:12:13', '2024-07-30 13:12:13'),
(10, 5, 'category', '<Category />', 'view', '2024-07-30 13:12:42', '2024-07-30 13:12:42'),
(11, 5, 'addcategory', '<AddCatgegory />', 'add', '2024-07-30 13:12:42', '2024-07-30 13:12:42'),
(12, 5, 'addcategory/:catId', '<AddCatgegory />', 'edit', '2024-07-30 13:13:28', '2024-07-30 13:13:28'),
(13, 6, 'product', '<Product />', 'view', '2024-07-30 13:13:44', '2024-07-30 13:13:44'),
(14, 6, 'addproduct', '<Addproduct />', 'add', '2024-07-30 13:13:44', '2024-07-30 13:13:44'),
(15, 6, 'addproduct/:productId', '<Addproduct />', 'edit', '2024-07-30 13:14:11', '2024-07-30 13:14:11'),
(16, 6, 'productview/:productId', '<ProductView />', 'edit', '2024-08-05 12:17:01', '2024-08-05 12:17:01');

-- --------------------------------------------------------

--
-- Table structure for table `Modules`
--

CREATE TABLE `Modules` (
  `id` int NOT NULL,
  `moduleName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Modules`
--

INSERT INTO `Modules` (`id`, `moduleName`, `createdAt`, `updatedAt`) VALUES
(1, 'Dashboard', '2024-07-29 14:07:27', '2024-07-29 14:07:27'),
(2, 'Role', '2024-07-29 14:07:27', '2024-07-29 14:07:27'),
(3, 'Permission', '2024-07-29 14:07:48', '2024-07-29 14:07:48'),
(4, 'User', '2024-07-29 14:07:48', '2024-07-29 14:07:48'),
(5, 'Category', '2024-07-29 14:08:10', '2024-07-29 14:08:10'),
(6, 'Product', '2024-07-29 14:08:10', '2024-07-29 14:08:10');

-- --------------------------------------------------------

--
-- Table structure for table `Permissions`
--

CREATE TABLE `Permissions` (
  `id` int NOT NULL,
  `roleId` int NOT NULL,
  `moduleId` int NOT NULL,
  `can_read` int NOT NULL,
  `can_write` int NOT NULL,
  `can_edit` int NOT NULL,
  `can_delete` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Permissions`
--

INSERT INTO `Permissions` (`id`, `roleId`, `moduleId`, `can_read`, `can_write`, `can_edit`, `can_delete`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 1, 1, 1, '2024-07-31 15:42:58', '2024-07-31 15:42:58'),
(2, 1, 2, 1, 1, 1, 1, '2024-07-31 15:43:16', '2024-07-31 15:43:16'),
(3, 1, 3, 1, 1, 1, 1, '2024-07-31 15:43:51', '2024-07-31 15:43:51'),
(4, 1, 4, 1, 1, 1, 1, '2024-07-31 15:44:02', '2024-07-31 15:44:02'),
(5, 1, 5, 1, 1, 1, 1, '2024-07-31 15:44:11', '2024-07-31 15:44:11'),
(6, 1, 6, 1, 1, 1, 1, '2024-07-31 15:44:22', '2024-07-31 15:44:22'),
(10, 2, 4, 1, 0, 0, 0, '2024-07-31 12:59:35', '2024-07-31 12:59:35'),
(12, 2, 2, 1, 1, 0, 0, '2024-08-01 15:05:18', '2024-08-01 15:05:18'),
(13, 2, 3, 1, 1, 0, 0, '2024-08-01 15:32:18', '2024-08-01 15:32:18'),
(15, 3, 5, 1, 0, 1, 0, '2024-08-01 10:31:45', '2024-08-01 10:31:45'),
(16, 3, 6, 1, 0, 0, 1, '2024-08-01 10:31:54', '2024-08-01 10:31:54'),
(26, 3, 3, 1, 0, 0, 0, '2024-08-08 12:02:44', '2024-08-08 12:02:44');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int NOT NULL,
  `categoryId` int NOT NULL,
  `productName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`id`, `categoryId`, `productName`, `image`, `description`, `price`, `createdAt`, `updatedAt`) VALUES
(29, 22, 'test product', '1722237708478-b2.jpeg', 'Best car', 800000, '2024-07-29 07:21:48', '2024-07-29 07:21:48'),
(31, 1, 'Bike', '1722605673116-b1.jpg', 'Best Bike', 100000, '2024-08-02 08:11:30', '2024-08-02 13:34:38'),
(55, 1, 'test11122222122222', '1723119692766-f1.jpg', 'ddddddddd', 22223, '2024-08-08 12:21:32', '2024-08-08 12:32:53');

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `id` int NOT NULL,
  `roleName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`id`, `roleName`, `createdAt`, `updatedAt`) VALUES
(1, 'SUPERADMIN', '2024-07-26 14:18:36', '2024-07-26 14:18:36'),
(2, 'SALESADMIN', '2024-07-26 14:18:36', '2024-07-26 14:18:36'),
(3, 'REPORTADMIN', '2024-07-26 14:18:52', '2024-07-26 14:18:52'),
(4, 'USERADMIN', '2024-07-26 14:18:52', '2024-07-26 14:18:52');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `roleId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `firstName`, `lastName`, `email`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 'superadmin', '$2b$10$vj.qCH6jo4rbQ2d7JV2Z9uqC6j6yvyGBwPMUwtaZ2jk82vxfim2LG', 'Super', 'Admin', 'superadmin@gmail.com', 1, '2024-07-30 11:05:17', '2024-07-30 11:05:17'),
(2, 'salesadmin', '$2b$10$vj.qCH6jo4rbQ2d7JV2Z9uqC6j6yvyGBwPMUwtaZ2jk82vxfim2LG', 'Deepika', 'Raturi', 'deepika@gmail.com', 2, '2024-07-30 16:36:16', '2024-07-30 16:36:16'),
(3, 'reportadmin', '$2b$10$vj.qCH6jo4rbQ2d7JV2Z9uqC6j6yvyGBwPMUwtaZ2jk82vxfim2LG', 'Baljeet', 'Singh', 'bsk@gmail.com', 3, '2024-07-30 16:36:50', '2024-07-30 16:36:50'),
(16, 'monika', '$2b$10$QdUn.zS2sfO59iMeIKj3E.QXJATfwvjZ72sd6xymL.QVbrXHY0Lu.', 'Monika', 'Sharma', 'monika@gmail.com', 2, '2024-08-06 06:39:29', '2024-08-06 06:39:29'),
(17, 'monika', '$2b$10$6A7q79aNFZFoFgRXs.8oMe45CAG7tO5bFGic7nBxz5T2bccem0dTW', 'Monika', 'Sharma', 'monika@gmail.com', 2, '2024-08-06 06:43:42', '2024-08-06 06:43:42'),
(18, 'monika', '$2b$10$O0sDACkL2Al7TGLqBrDXSugdcFS4na/uh.5263/ZFA37rZUFDJHuS', 'Monika', 'Sharma', 'monika@gmail.com', 2, '2024-08-06 06:43:56', '2024-08-06 06:43:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Masterroutes`
--
ALTER TABLE `Masterroutes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moduleId` (`moduleId`);

--
-- Indexes for table `Modules`
--
ALTER TABLE `Modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Permissions`
--
ALTER TABLE `Permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `moduleId` (`moduleId`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `Masterroutes`
--
ALTER TABLE `Masterroutes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Modules`
--
ALTER TABLE `Modules`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Permissions`
--
ALTER TABLE `Permissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Masterroutes`
--
ALTER TABLE `Masterroutes`
  ADD CONSTRAINT `Masterroutes_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `Modules` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Permissions`
--
ALTER TABLE `Permissions`
  ADD CONSTRAINT `Permissions_ibfk_533` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Permissions_ibfk_534` FOREIGN KEY (`moduleId`) REFERENCES `Modules` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
