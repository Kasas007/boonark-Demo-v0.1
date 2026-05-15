-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 15, 2026 at 02:18 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Boonark_Restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bookings`
--

CREATE TABLE `Bookings` (
  `booking_id` int NOT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `customer_phone` varchar(20) DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `table_id` int DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `number_of_people` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

CREATE TABLE `Courses` (
  `course_id` int NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `price_per_person` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Courses`
--

INSERT INTO `Courses` (`course_id`, `course_name`, `price_per_person`) VALUES
(1, 'Truffle Signature Set', 1290.00);

-- --------------------------------------------------------

--
-- Table structure for table `Course_Items`
--

CREATE TABLE `Course_Items` (
  `course_id` int DEFAULT NULL,
  `menu_id` int DEFAULT NULL,
  `serving_order` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Course_Items`
--

INSERT INTO `Course_Items` (`course_id`, `menu_id`, `serving_order`) VALUES
(1, 1, 1),
(1, 10, 2),
(1, 26, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Menu`
--

CREATE TABLE `Menu` (
  `menu_id` int NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `is_vegetarian` tinyint(1) DEFAULT '0',
  `is_chef_recommend` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Menu`
--

INSERT INTO `Menu` (`menu_id`, `category`, `item_name`, `description`, `price`, `is_vegetarian`, `is_chef_recommend`) VALUES
(1, 'Appetizers', 'White Truffle Soup with Black Truffle Puff', 'Fine white truffle soup cover with black truffle puff.', 230.00, 0, 1),
(2, 'Appetizers', 'Supreme Caesar Salad with Grilled Chicken', 'Organic romaine lettuce, homemade crunchy croutons, crispy bacon, parmesan cheese, light caesar dressing served with chicken cutlets.', 290.00, 0, 0),
(3, 'Appetizers', 'Delicious Calamari', 'Deep fried calamari with salt, chili, garlic and pepper served with our own recipe dipping sauce.', 270.00, 0, 0),
(4, 'Appetizers', 'Smoked Tuna Tartare', 'Cold smoked tuna tartare flavoured with extra virgin oil dressing, caponata salsa and herb oil topped with colorful veggies, herbs and balsamic caviar.', 410.00, 0, 1),
(5, 'Appetizers', 'The Chiang Mai Signature Salad', 'Young rocket leaves and farm-fresh mix salad with our special balsamic dressing and extra virgin olive oil, served with cherry tomatoes and walnuts.', 270.00, 1, 1),
(6, 'Appetizers', 'Acqua Pazza', 'Italian \"Crazy Water\" - Sea bass, prawn, squid and mussel in seafood broth with fresh tomato, saffron and lemon foam.', 450.00, 0, 1),
(7, 'Pasta & Risotto', 'Classic Carbonara', 'A Classic Italian dish with bacon, eggs and cheese.', 250.00, 0, 0),
(8, 'Pasta & Risotto', 'To Die For Fettuccine', 'Black squid ink fettuccine with turmeric creme sauce and river prawns.', 450.00, 0, 1),
(9, 'Pasta & Risotto', 'Spaghetti Bolognese', 'A true Italian classic with meaty tomato sauce.', 250.00, 0, 0),
(10, 'Pasta & Risotto', 'Tagliatelle Truffle Lamb Ragu', 'Homemade tagliatelle pasta, black truffle paste, slow cooked lamb ragu flavoured with smoked paprika.', 450.00, 0, 1),
(11, 'Pasta & Risotto', 'Pestoloppi', 'Penne with pesto sauce and basil leaves topped with pan grilled scallops and walnuts.', 390.00, 0, 0),
(12, 'Pasta & Risotto', 'Cannelloni Con Granchio', 'Homemade crab cannelloni with ricotta cheese, black wine sauce, saffron meringue foam and ebiko.', 490.00, 0, 1),
(13, 'Pizza', 'Pizza Margarita', 'Homemade pizza topped with fresh tomato, mozzarella cheese and tomato sauce.', 250.00, 1, 1),
(14, 'Pizza', 'Pizza Pepperoni', 'Homemade pizza topped with pepperoni, black olive, cheese and tomato sauce.', 350.00, 0, 0),
(15, 'Pizza', 'Pizza Hawaiian', 'Homemade pizza topped with ham, pineapple, mozzarella cheese and tomato sauce.', 270.00, 0, 0),
(16, 'Pizza', 'Pizza Smoke Salmon', 'Homemade pizza topped with smoked salmon, mozzarella cheese and tomato sauce.', 350.00, 0, 0),
(17, 'Pizza', 'Pizza Ham & Mushroom', 'Homemade pizza topped with ham, mushroom, mozzarella cheese and tomato sauce.', 270.00, 0, 0),
(18, 'Pizza', 'Quattro Formaggi Focaccia Pizza', 'Thin crust pizza puff with mozzarella cheese, gorgonzola cheese, parmesan cheese and truffle cheese.', 350.00, 1, 1),
(19, 'Pizza', 'Pizza Vegetarian', 'Homemade pizza topped with spinach, onion, pepper, tomato, mushroom, mozzarella cheese and tomato sauce.', 270.00, 1, 0),
(20, 'Pizza', 'Pizza Seafood', 'Homemade pizza topped with shrimp, squids, seashell with pesto sauce, cheese and tomato sauce.', 410.00, 0, 0),
(21, 'Pizza', 'Pizza Romana', 'Homemade pizza topped with anchovies, black olive, sun-dried tomato, tomato sauce.', 290.00, 0, 0),
(22, 'Pizza', 'Napolitana Style Agnello Calzone', 'Homemade Neapolitan pizza stuffed with lamb ragu, mozzarella cheese, cheddar cheese and rocket salad.', 490.00, 0, 1),
(23, 'Fish & Meat', 'Grilled Pork Chop', 'Grilled butter crusted pork chop in our roasted garlic sauce finished with red wine served with mixed green salad.', 410.00, 0, 0),
(24, 'Fish & Meat', 'Salmon with Ratatouille', 'Grilled salmon served with cream of pesto and vegetable stew.', 490.00, 0, 0),
(25, 'Fish & Meat', 'Tournedos Rossini', 'Beef tenderloin grain fed sous vide 60 degree, demi truffle juice, pan seared foie gras, parma ham, roasted baby roots, black olive soil.', 1390.00, 0, 1),
(26, 'Desserts', 'Fruity Sabayon', 'Mixed infused seasonal fruit serve with Amaretto sabayon, orange tuille, almond crumble and caramel powder.', 210.00, 0, 0),
(27, 'Desserts', 'Pistachio Tiramisu', 'Mascapone cream, savoiardi (Italian lady finger), caramelized pistachio, vanilla ice cream and caramel almond.', 290.00, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Tables`
--

CREATE TABLE `Tables` (
  `table_id` int NOT NULL,
  `table_number` varchar(10) DEFAULT NULL,
  `capacity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Tables`
--

INSERT INTO `Tables` (`table_id`, `table_number`, `capacity`) VALUES
(1, 'V01', 2),
(2, 'V02', 2),
(3, 'R01', 4),
(4, 'R02', 4),
(5, 'R03', 6),
(6, 'T01', 4),
(7, 'T02', 4),
(8, 'T03', 8),
(9, 'B01', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `table_id` (`table_id`);

--
-- Indexes for table `Courses`
--
ALTER TABLE `Courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `Course_Items`
--
ALTER TABLE `Course_Items`
  ADD KEY `course_id` (`course_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indexes for table `Menu`
--
ALTER TABLE `Menu`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indexes for table `Tables`
--
ALTER TABLE `Tables`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `table_number` (`table_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Bookings`
--
ALTER TABLE `Bookings`
  MODIFY `booking_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Courses`
--
ALTER TABLE `Courses`
  MODIFY `course_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Menu`
--
ALTER TABLE `Menu`
  MODIFY `menu_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Tables`
--
ALTER TABLE `Tables`
  MODIFY `table_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `Courses` (`course_id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`table_id`) REFERENCES `Tables` (`table_id`);

--
-- Constraints for table `Course_Items`
--
ALTER TABLE `Course_Items`
  ADD CONSTRAINT `course_items_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `Courses` (`course_id`),
  ADD CONSTRAINT `course_items_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `Menu` (`menu_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
