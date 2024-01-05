-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 09:19 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurantdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendanceId` int(11) NOT NULL,
  `employeeId` varchar(20) NOT NULL,
  `entryDate` date DEFAULT NULL,
  `entryTime` time DEFAULT NULL,
  `exitDate` date DEFAULT NULL,
  `exitTime` time DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `work_hours` time DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendanceId`, `employeeId`, `entryDate`, `entryTime`, `exitDate`, `exitTime`, `status`, `work_hours`, `name`) VALUES
(67, '121', '2023-11-28', '02:07:06', '2023-11-28', '02:07:21', 'Present', '00:00:15', 'Alam Hossain'),
(68, '11', '2023-11-28', '02:07:28', NULL, NULL, 'Present', NULL, 'azraf'),
(69, '121', '2023-11-30', '00:41:07', '2023-11-30', '00:49:55', 'Present', '00:08:48', 'Alam Hossain'),
(70, '11', '2023-11-30', '00:50:09', '2023-11-30', '00:50:20', 'Present', '00:00:11', 'azraf'),
(71, '434', '2023-11-30', '00:50:27', '2023-11-30', '02:21:33', 'Present', '01:31:06', 'Alam '),
(72, '121', '2023-12-03', '06:06:40', NULL, NULL, 'Present', NULL, 'Alam Hossain'),
(73, '121', '2023-12-07', '06:15:00', '2023-12-07', '20:18:33', 'Present', '14:03:33', 'Alam Hossain'),
(74, '434', '2023-12-07', '20:18:41', NULL, NULL, 'Present', NULL, 'Alam ');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `code` varchar(50) NOT NULL,
  `category_name` varchar(500) DEFAULT NULL,
  `category_image` varchar(2000) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`code`, `category_name`, `category_image`, `status`) VALUES
('121', 'Dessert', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'open'),
('12111', 'Cop', 'njn', 'open'),
('126', 'Soup', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'open'),
('127', 'Pizza', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'open'),
('128', 'Drinks', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'open'),
('130', 'Salad', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'open'),
('131', 'Burger', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'open'),
('543', 'Pizza', 'xvbcxvb', 'close');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `tableNo` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`tableNo`, `name`, `phoneNumber`) VALUES
(8, 'alam', '0194387237'),
(10, 'Alam h', '01723384738'),
(11, 'Majide Ali', '01723384738'),
(12, 'sads', '84230947823'),
(13, 'Alam ', '01375834752'),
(14, 'azom', '01834912420'),
(15, 'Rakinb', '01934y787242'),
(16, 'Rohim', '017233847384'),
(17, 'Arif', '01925364672'),
(18, 'Naimur Hasan', '017353636636'),
(19, 'Sk bd ', '98665790'),
(20, 'Baytul Nur', '32324234234'),
(21, 'Ekram Hossain ', '56'),
(22, 'peter', '0525768379'),
(23, 'aman', '01925364672'),
(24, 'dadwa', 'dwad'),
(25, 'Skbd', '5588833557'),
(26, 'Shishir', '6565869'),
(27, 'Ban', '56575757'),
(28, 'Hozaifa Masud', '+8801918780770'),
(29, 'mohamad wa', '0506446682'),
(30, 'Alam Hossain', '01925364672'),
(31, 'Alam Hossain', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` varchar(10) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `jobtitle` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `phone`, `address`, `jobtitle`, `status`) VALUES
('11', 'azraf', '0193423465', 'bdr', 'manager', 'active'),
('121', 'Alam Hossain', '01925375672', 'Jamalpur', 'manager', 'active'),
('15143', 'Alam ', '0193324787', 'Mymensingh', 'manager', 'active'),
('154', 'Atikur Rahman', '0193324787', 'Motizill', 'Waiter', ''),
('434', 'Alam ', '534534', 'Mymensing', 'Waiter', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `recipe` varchar(2000) DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `category` varchar(300) DEFAULT NULL,
  `price` double(5,2) DEFAULT NULL,
  `status` varchar(25) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `name`, `recipe`, `image`, `category`, `price`, `status`) VALUES
(1007, 'Breton Fish Stew', 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'pizza', 12.90, 'active'),
(1009, 'Escalope de Veau', 'Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'Burger', 12.50, 'active'),
(1010, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'Soup', 13.50, 'active'),
(1011, 'Escalope de Veau', 'Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'dessert', 12.50, 'active'),
(1012, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'pizza', 9.56, 'active'),
(1013, 'Tuna Niçoise', 'Warm goats cheese and roasted vegetable salad with black olive tapenade crostini', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'offered', 10.50, 'active'),
(1014, 'Roast Duck Breast', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-4-370x247.jpg', 'dessert', 14.50, 'active'),
(1015, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'salad', 17.50, 'active'),
(1016, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'salad', 9.50, 'active'),
(1017, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'dessert', 13.50, 'active'),
(1018, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'offered', 13.50, 'active'),
(1019, 'Roasted Pork Belly', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'popular', 14.50, 'active'),
(1020, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'salad', 13.50, 'active'),
(1022, 'Roast Duck Breast', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-4-370x247.jpg', 'offered', 14.50, 'active'),
(1023, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'dessert', 9.50, 'active'),
(1024, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'soup', 13.50, 'active'),
(1025, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'dessert', 13.50, 'active'),
(1026, 'Escalope de Veau', 'Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'dessert', 12.50, 'active'),
(1027, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'salad', 9.50, 'active'),
(1028, 'Goats Cheese Pizza', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2017/01/bbq-370x247.jpg', 'pizza', 14.50, 'active'),
(1029, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'soup', 9.50, 'active'),
(1030, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'soup', 9.50, 'active'),
(1031, 'Haddock', 'Chargrilled fresh tuna steak (served medium rare) on classic Niçoise salad with French beans.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'soup', 14.70, 'active'),
(1032, 'Haddock', 'Chargrilled fresh tuna steak (served medium rare) on classic Niçoise salad with French beans.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'soup', 14.70, 'active'),
(1033, 'Fish Parmentier', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-5-370x247.jpg', 'popular', 14.50, 'active'),
(1034, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'dessert', 13.50, 'active'),
(1035, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'dessert', 13.50, 'active'),
(1036, 'Haddock', 'Chargrilled fresh tuna steak (served medium rare) on classic Niçoise salad with French beans', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'dessert', 14.70, 'active'),
(1037, 'Roasted Pork Belly', 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'pizza', 14.50, 'active'),
(1038, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'salad', 9.50, 'active'),
(1039, 'Tuna Niçoise', 'Warm goats cheese and roasted vegetable salad with black olive tapenade crostini', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'dessert', 10.50, 'active'),
(1040, 'Tuna Niçoise', 'Warm goats cheese and roasted vegetable salad with black olive tapenade crostini', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'pizza', 10.50, 'active'),
(1041, 'Chicken and Walnut Salad', 'Pan roasted pork belly with gratin potato, braised Savoy cabbage, apples, thyme and calvados jus', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg', 'pizza', 13.50, 'active'),
(1042, 'Goats Cheese Pizza', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2017/01/bbq-370x247.jpg', 'pizza', 14.50, 'active'),
(1043, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'soup', 9.50, 'active'),
(1044, 'Breton Fish Stew', 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'pizza', 12.90, 'active'),
(1045, 'Goats Cheese Pizza', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2017/01/bbq-370x247.jpg', 'pizza', 14.50, 'active'),
(1046, 'Roasted Pork Belly', 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'salad', 14.50, 'active'),
(1047, 'Haddock', 'Chargrilled fresh tuna steak (served medium rare) on classic Niçoise salad with French beans.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg', 'soup', 14.70, 'active'),
(1048, 'Breton Fish Stew', 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'pizza', 12.90, 'active'),
(1049, 'Escalope de Veau', 'Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'offered', 12.50, 'active'),
(1050, 'Escalope de Veau', 'Pan roasted haddock fillet wrapped in smoked French bacon with pea purée and tomato and chive vinaigrette', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'dessert', 12.50, 'active'),
(1051, 'Breton Fish Stew', 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'pizza', 12.90, 'active'),
(1052, 'Goats Cheese Pizza', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2017/01/bbq-370x247.jpg', 'salad', 14.50, 'active'),
(1053, 'Fish Parmentier', 'Sautéed breaded veal escalope with watercress, lemon and veal jus.', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-8-370x247.jpg', 'soup', 9.50, 'active'),
(1054, 'Roast Duck Breast', 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-4-370x247.jpg', 'soup', 14.50, 'active'),
(1055, 'Tuna Niçoise', 'Warm goats cheese and roasted vegetable salad with black olive tapenade crostini', 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-370x247.jpg', 'soup', 10.50, 'active'),
(1060, 'Juice', 'You have to cook before droink', 'https://www.homewetbar.com/blog/wp-content/uploads/2015/05/refreshing-summer-cocktails.jpg', 'drinks', 12.30, 'active'),
(1063, 'dsf', '6', 'https://www.homewetbar.com/blog/wp-content/uploads/2015/05/refreshing-summer-cocktails.jpg', 'salad', 6.00, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `orderID` int(11) NOT NULL,
  `itemID` varchar(10) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`orderID`, `itemID`, `quantity`) VALUES
(1, '1017', 2),
(2, '1010', 1),
(2, '1034', 2),
(3, '1011', 1),
(4, '1025', 1),
(5, '1017', 1),
(7, '1041', 1),
(8, '1011', 1),
(9, '1017', 1),
(10, '1017', 1),
(11, '1036', 2),
(11, '1041', 1),
(12, '1038', 1),
(12, '1060', 1),
(13, '1025', 1),
(13, '1036', 1),
(13, '1039', 1),
(14, '1011', 1),
(15, '1023', 1),
(16, '1034', 1),
(17, '1009', 1),
(18, '1011', 1),
(19, '1010', 2),
(20, '1011', 1),
(21, '1011', 1),
(22, '1010', 2),
(23, '1014', 1),
(24, '1041', 1),
(25, '1010', 3),
(25, '1011', 1),
(25, '1014', 1),
(26, '1026', 1),
(27, '1025', 2),
(28, '1034', 1),
(28, '1035', 1),
(29, '1010', 1),
(30, '1017', 3),
(31, '1012', 1),
(32, '1007', 2),
(32, '1009', 1),
(32, '1028', 2),
(33, '1007', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `executionTime` time DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  `orderStatus` varchar(50) DEFAULT 'active',
  `wayOfPurchase` varchar(50) DEFAULT NULL,
  `customerPhoneNumber` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `executionTime`, `orderDate`, `orderStatus`, `wayOfPurchase`, `customerPhoneNumber`) VALUES
(1, '14:07:02', '2023-10-02', 'close', 'cash', '12233434'),
(2, '14:11:07', '2023-10-02', 'close', 'cash', '01723384738'),
(3, '14:12:15', '2023-10-02', 'close', 'cash', '0137583475'),
(4, '14:13:12', '2023-10-02', 'close', 'cash', '84230947823'),
(5, '14:15:09', '2023-10-02', 'close', 'cash', '01723384738'),
(7, '14:30:50', '2023-10-02', 'close', 'cash', '12233434'),
(8, '14:32:54', '2023-10-02', 'active', 'cash', '12233434'),
(9, '14:38:17', '2023-10-02', 'close', 'cash', NULL),
(10, '14:38:53', '2023-10-02', 'close', 'cash', NULL),
(11, '14:25:17', '2023-10-04', 'active', 'paypal', NULL),
(12, '14:26:01', '2023-10-04', 'active', 'cash', NULL),
(13, '14:27:12', '2023-10-04', 'close', 'cash', NULL),
(14, '02:28:43', '2023-10-05', 'active', 'cash', '01723384738'),
(15, '02:29:27', '2023-10-05', 'active', 'cash', '01834912420'),
(16, '02:31:31', '2023-10-05', 'active', 'paypal', '01934y787242'),
(17, '08:34:37', '2023-10-05', 'close', 'cash', '017233847384'),
(18, '03:05:26', '2023-10-13', 'close', 'cash', '01925364672'),
(19, '06:39:58', '2023-10-13', 'active', 'paypal', '017353636636'),
(20, '04:57:35', '2023-10-14', 'close', 'cash', '98665790'),
(21, '03:28:47', '2023-10-18', 'close', 'cash', '32324234234'),
(22, '04:30:33', '2023-10-18', 'close', 'cash', '56'),
(23, '11:56:48', '2023-10-18', 'close', 'cash', '0525768379'),
(24, '12:45:06', '2023-10-21', 'close', 'cash', '01925364672'),
(25, '01:26:48', '2023-10-22', 'close', 'cash', 'dwad'),
(26, '04:48:06', '2023-10-22', 'close', 'cash', '5588833557'),
(27, '04:52:11', '2023-10-22', 'close', 'cash', '6565869'),
(28, '04:55:51', '2023-10-22', 'active', 'cash', '56575757'),
(29, '14:38:40', '2023-11-03', 'close', 'cash', '+8801918780770'),
(30, '08:50:50', '2023-11-15', 'close', 'cash', '0506446682'),
(31, '13:23:03', '2023-12-07', 'close', 'cash', '01925364672'),
(32, '13:33:04', '2023-12-07', 'active', 'paypal', '1234'),
(33, '13:34:38', '2023-12-07', 'active', 'cash', '01925364672');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `rid` int(20) NOT NULL,
  `last_z_report_date` varchar(100) DEFAULT NULL,
  `last_report_price` varchar(100) DEFAULT NULL,
  `startDate` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`rid`, `last_z_report_date`, `last_report_price`, `startDate`) VALUES
(1, '2023-12-04', '100.00', '2023-11-04'),
(10, '2023-12-08', '115.56', '2023-12-04'),
(11, '2023-12-08', '0', '2023-12-08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendanceId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`tableNo`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`orderID`,`itemID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`rid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendanceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `tableNo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1077;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `rid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderItem_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
