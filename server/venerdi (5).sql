-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2025 a las 06:40:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `venerdi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`CategoryID`, `Name`, `Description`) VALUES
(1, 'Clásicas', 'Toda una increíble variedad de pizzas clásicas.'),
(2, 'Especialidades', 'Pizzas de la mas alta especialidad'),
(4, 'Entradas', 'Gran variedad de entradas para que disfrutes.'),
(5, 'Ensaladas', 'Gran variedad de ensaladas para que disfrutes.'),
(6, 'Pastas', 'Gran variedad de pastas para que disfrutes.'),
(7, 'Calzones', 'Gran variedad de calzones para que disfrutes.'),
(8, 'Hamburguesas', 'Gran variedad de hamburguesas para que disfrutes.'),
(9, 'Rollos Italianos', 'Gran variedad de rollos italianos para que disfrutes.'),
(10, 'Strombolis', 'Gran variedad de strombolis para que disfrutes.'),
(11, 'Aderezos Extras', 'Gran variedad de aderezos extras para que disfrutes.'),
(12, 'Bebidas', 'Gran variedad de bebidas para que disfrutes.'),
(13, 'Refrescos', 'Gran variedad de refrescos para que disfrutes.'),
(14, 'Cerveza', 'Gran variedad de cervezas para que disfrutes.'),
(15, 'Caffe', 'Gran variedad de cafes para que disfrutes.'),
(16, 'Soda Italiana', 'Gran variedad de soda italiana para que disfrutes.'),
(17, 'Malteadas', 'Gran variedad de malteadas para que disfrutes.'),
(18, 'Té', 'Gran variedad de té para que disfrutes.'),
(19, 'Postres', 'Gran variedad de postres para que disfrutes.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customproduct`
--

CREATE TABLE `customproduct` (
  `CustomProductID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customproductingredient`
--

CREATE TABLE `customproductingredient` (
  `CustomProductID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guestordercontact`
--

CREATE TABLE `guestordercontact` (
  `GuestContactID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `guestordercontact`
--

INSERT INTO `guestordercontact` (`GuestContactID`, `Name`, `Email`, `Phone`, `Address`) VALUES
(1, 'Alberto', '', '9532112722', 'Molinon');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredient`
--

CREATE TABLE `ingredient` (
  `IngredientID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingredient`
--

INSERT INTO `ingredient` (`IngredientID`, `Name`) VALUES
(1, 'Queso Mozzarella'),
(2, 'Durazno'),
(3, 'Jamón'),
(4, 'Salsa de tomate'),
(5, 'Queso Parmesano'),
(6, 'Queso Ricotta'),
(7, 'Queso Gouda'),
(8, 'Orégano'),
(9, 'Jamón Serrano'),
(10, 'Alcachofas'),
(11, 'Aceitunas Negras'),
(12, 'Portobello'),
(13, 'Albahaca'),
(14, 'Salsa Marinara');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order`
--

CREATE TABLE `order` (
  `OrderID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `GuestContactID` int(11) DEFAULT NULL,
  `OrderDate` datetime DEFAULT current_timestamp(),
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `order`
--

INSERT INTO `order` (`OrderID`, `UserID`, `GuestContactID`, `OrderDate`, `TotalAmount`, `Status`) VALUES
(1, NULL, 1, '2025-06-04 20:51:09', 255.00, 'Pendiente'),
(2, 3, NULL, '2025-06-04 22:28:07', 200.00, 'Pendiente'),
(3, 3, NULL, '2025-06-04 22:28:07', 200.00, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordercustomitem`
--

CREATE TABLE `ordercustomitem` (
  `OrderCustomItemID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `CustomProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderitem`
--

CREATE TABLE `orderitem` (
  `OrderItemID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orderitem`
--

INSERT INTO `orderitem` (`OrderItemID`, `OrderID`, `ProductID`, `Quantity`) VALUES
(1, 1, 2, 1),
(2, 2, 1, 1),
(3, 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `BasePrice` decimal(10,2) NOT NULL,
  `Available` tinyint(1) NOT NULL DEFAULT 1,
  `CategoryID` int(11) DEFAULT NULL,
  `ImageURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`ProductID`, `Name`, `Description`, `BasePrice`, `Available`, `CategoryID`, `ImageURL`) VALUES
(1, 'Pizza de Durazno', 'Una increíble y deliciosa pizza sabor durazno.', 200.00, 10, 1, 'products/pizza_durazno.jpg'),
(2, '4 Quesos', 'Una impresionante pizza con una variedad explosiva de quesos.', 200.00, 10, 1, 'products/pizza_default.jpg'),
(3, 'Naranjada', 'Una refrescante bebida.', 40.00, 10, 12, 'products/pizza_default.jpg'),
(4, 'Café Americano', 'Un delicioso Café.', 35.00, 10, 15, 'products/pizza_default.jpg'),
(5, 'Capricciosa', 'Deliciosa pizza.', 250.00, 10, 2, 'products/pizza_default.jpg'),
(6, 'Pan de ajo(4 pzs)', 'Crujiente pan al horno.', 45.00, 10, 4, 'products/pizza_default.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productsize`
--

CREATE TABLE `productsize` (
  `ProductSizeID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Size` varchar(50) NOT NULL,
  `Price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productsize`
--

INSERT INTO `productsize` (`ProductSizeID`, `ProductID`, `Size`, `Price`) VALUES
(1, 1, 'Chica', 120.00),
(2, 1, 'Mediana', 160.00),
(3, 1, 'Grande', 200.00),
(4, 2, 'Mediana', 170.00),
(5, 2, 'Grande', 205.00),
(6, 2, 'Familiar', 255.00),
(7, 3, 'Vazo', 40.00),
(8, 3, 'Jarra', 120.00),
(9, 5, 'Mediana', 250.00),
(10, 5, 'Grande', 280.00),
(11, 5, 'Familiar', 310.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_ingredient`
--

CREATE TABLE `product_ingredient` (
  `ProductID` int(11) NOT NULL,
  `IngredientID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_ingredient`
--

INSERT INTO `product_ingredient` (`ProductID`, `IngredientID`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(5, 1),
(5, 4),
(5, 8),
(5, 9),
(5, 10),
(5, 11),
(5, 12),
(5, 13),
(6, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Address` text DEFAULT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`UserID`, `Name`, `Email`, `Phone`, `Address`, `PasswordHash`, `CreatedAt`) VALUES
(0, 'admin', 'admin@gmail.com', '953', 'admin', '$2b$10$IRJDt/aFaangrMtc4B8ASOpHs8qKFBErxHpHsu2cgF3YuWgIqYJMO', NULL),
(3, 'Alberto', 'prueba@gmail.com', '9532112722', 'Pedro Moreno, No. 5', '$2b$10$EXrStKW0yuifLom0GSw3iOpUTZTVypYw//07lCO1pAhei/TuYxKoi', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indices de la tabla `customproduct`
--
ALTER TABLE `customproduct`
  ADD PRIMARY KEY (`CustomProductID`);

--
-- Indices de la tabla `customproductingredient`
--
ALTER TABLE `customproductingredient`
  ADD KEY `CustomProductID` (`CustomProductID`);

--
-- Indices de la tabla `guestordercontact`
--
ALTER TABLE `guestordercontact`
  ADD PRIMARY KEY (`GuestContactID`);

--
-- Indices de la tabla `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`IngredientID`);

--
-- Indices de la tabla `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `GuestContactID` (`GuestContactID`);

--
-- Indices de la tabla `ordercustomitem`
--
ALTER TABLE `ordercustomitem`
  ADD PRIMARY KEY (`OrderCustomItemID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `CustomProductID` (`CustomProductID`);

--
-- Indices de la tabla `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`OrderItemID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indices de la tabla `productsize`
--
ALTER TABLE `productsize`
  ADD PRIMARY KEY (`ProductSizeID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indices de la tabla `product_ingredient`
--
ALTER TABLE `product_ingredient`
  ADD PRIMARY KEY (`ProductID`,`IngredientID`),
  ADD KEY `IngredientID` (`IngredientID`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `customproduct`
--
ALTER TABLE `customproduct`
  MODIFY `CustomProductID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `guestordercontact`
--
ALTER TABLE `guestordercontact`
  MODIFY `GuestContactID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `IngredientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `order`
--
ALTER TABLE `order`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ordercustomitem`
--
ALTER TABLE `ordercustomitem`
  MODIFY `OrderCustomItemID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `OrderItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `productsize`
--
ALTER TABLE `productsize`
  MODIFY `ProductSizeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `customproductingredient`
--
ALTER TABLE `customproductingredient`
  ADD CONSTRAINT `customproductingredient_ibfk_1` FOREIGN KEY (`CustomProductID`) REFERENCES `customproduct` (`CustomProductID`);

--
-- Filtros para la tabla `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`GuestContactID`) REFERENCES `guestordercontact` (`GuestContactID`);

--
-- Filtros para la tabla `ordercustomitem`
--
ALTER TABLE `ordercustomitem`
  ADD CONSTRAINT `ordercustomitem_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`),
  ADD CONSTRAINT `ordercustomitem_ibfk_2` FOREIGN KEY (`CustomProductID`) REFERENCES `customproduct` (`CustomProductID`);

--
-- Filtros para la tabla `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`),
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`);

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);

--
-- Filtros para la tabla `productsize`
--
ALTER TABLE `productsize`
  ADD CONSTRAINT `productsize_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`);

--
-- Filtros para la tabla `product_ingredient`
--
ALTER TABLE `product_ingredient`
  ADD CONSTRAINT `product_ingredient_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  ADD CONSTRAINT `product_ingredient_ibfk_2` FOREIGN KEY (`IngredientID`) REFERENCES `ingredient` (`IngredientID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
