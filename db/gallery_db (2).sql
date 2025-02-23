-- phpMyAdmin SQL Dump
-- version 5.2.2-1.fc41
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 23 Feb 2025 pada 12.21
-- Versi server: 10.11.10-MariaDB
-- Versi PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gallery_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `albums`
--

CREATE TABLE `albums` (
  `album_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `albums`
--

INSERT INTO `albums` (`album_id`, `user_id`, `title`, `description`, `cover_photo`, `created_at`, `updated_at`) VALUES
(55, 17, 'HDR', '', NULL, '2025-02-21 09:56:20', '2025-02-22 08:08:54'),
(62, 17, 'Laut', NULL, NULL, '2025-02-22 19:12:44', '2025-02-22 12:12:44'),
(63, 17, 'Wallpapper', 'Hp', NULL, '2025-02-22 19:27:16', '2025-02-23 06:53:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Categories`
--

CREATE TABLE `Categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `Categories`
--

INSERT INTO `Categories` (`category_id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, '\"Nature\"\'', 'Category for \"Nature\"\'', '2025-02-14 08:19:15', '2025-02-14 08:19:15'),
(2, '\"Sea\"\'', 'Category for \"Sea\"\'', '2025-02-14 08:45:23', '2025-02-14 08:45:23'),
(3, '\"Mountaiin\"\'', 'Category for \"Mountaiin\"\'', '2025-02-14 09:14:09', '2025-02-14 09:14:09'),
(4, 'Hewan', 'Category for Hewan', '2025-02-14 13:02:46', '2025-02-14 13:02:46'),
(5, 'Hewan, cat', 'Category for Hewan, cat', '2025-02-14 14:41:29', '2025-02-14 14:41:29'),
(6, '\"Nature\"', 'Category for \"Nature\"', '2025-02-14 15:17:33', '2025-02-14 15:17:33'),
(7, '\"Landscape\"\n', 'Category for \"Landscape\"\n', '2025-02-14 15:17:33', '2025-02-14 15:17:33'),
(8, 'Nature', 'Category for Nature', '2025-02-14 15:25:33', '2025-02-14 15:25:33'),
(9, 'Landscape', 'Category for Landscape', '2025-02-14 15:25:34', '2025-02-14 15:25:34'),
(10, 'Mountain', 'Category for Mountain', '2025-02-14 15:25:34', '2025-02-14 15:25:34'),
(11, 'Beach', 'Category for Beach', '2025-02-15 18:18:04', '2025-02-15 18:18:04'),
(12, 'Aesthetic', 'Category for Aesthetic', '2025-02-15 18:37:47', '2025-02-15 18:37:47'),
(13, 'Wallpaper', 'Category for Wallpaper', '2025-02-15 19:15:41', '2025-02-15 19:15:41'),
(14, 'HD', 'Category for HD', '2025-02-15 19:15:41', '2025-02-15 19:15:41'),
(15, 'Xiaomi', 'Category for Xiaomi', '2025-02-15 19:15:41', '2025-02-15 19:15:41'),
(16, 'Hebat', 'Category for Hebat', '2025-02-15 19:25:49', '2025-02-15 19:25:49'),
(17, 'Meme', 'Category for Meme', '2025-02-15 19:25:49', '2025-02-15 19:25:49'),
(18, 'JJ', 'Category for JJ', '2025-02-15 20:27:24', '2025-02-15 20:27:24'),
(19, 'Portrait', 'Category for Portrait', '2025-02-18 20:58:36', '2025-02-18 20:58:36'),
(20, 'Art', 'Category for Art', '2025-02-18 20:59:38', '2025-02-18 20:59:38'),
(21, 'HDR', 'Category for HDR', '2025-02-19 14:34:23', '2025-02-19 14:34:23'),
(22, 'WIN', 'Category for WIN', '2025-02-19 14:34:23', '2025-02-19 14:34:23'),
(23, 'Chu', 'Category for Chu', '2025-02-20 08:23:25', '2025-02-20 08:23:25'),
(24, 'China', 'Category for China', '2025-02-20 08:23:25', '2025-02-20 08:23:25'),
(25, 'Chitato', 'Category for Chitato', '2025-02-20 08:23:25', '2025-02-20 08:23:25'),
(26, 'dongeng', 'Category for dongeng', '2025-02-20 14:21:52', '2025-02-20 14:21:52'),
(27, 'bohong', 'Category for bohong', '2025-02-20 14:21:52', '2025-02-20 14:21:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `gallery_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `Comments`
--

INSERT INTO `Comments` (`id`, `comment`, `createdAt`, `updatedAt`, `user_id`, `gallery_id`) VALUES
(39, 'a', '2024-12-10 12:21:22', '2024-12-10 12:21:22', 19, 62),
(40, 'a', '2024-12-10 12:21:28', '2024-12-10 12:21:28', 19, NULL),
(42, 'dapi', '2024-12-13 10:43:39', '2024-12-13 10:43:39', 17, 62),
(44, 'Test', '2024-12-13 10:49:46', '2024-12-13 10:49:46', 17, 62),
(45, 'Dapi', '2024-12-13 10:50:36', '2024-12-13 10:50:36', 17, 62),
(46, 'hii', '2024-12-13 13:39:34', '2024-12-13 13:39:34', 19, 62),
(47, 'lawak', '2024-12-13 13:51:54', '2024-12-13 13:51:54', 19, 62),
(48, 'faa', '2024-12-13 14:40:17', '2024-12-13 14:40:17', 19, NULL),
(49, 'faaa', '2024-12-13 14:41:02', '2024-12-13 14:41:02', 17, NULL),
(50, 'gg', '2024-12-16 06:17:59', '2024-12-16 06:17:59', 19, 62),
(51, 'hii', '2025-01-09 10:23:50', '2025-01-09 10:23:50', NULL, 62),
(52, 'hii', '2025-01-09 11:36:45', '2025-01-09 11:36:45', 19, 62),
(53, 'aowowwo', '2025-01-13 09:21:57', '2025-01-13 09:21:57', 17, 62),
(54, 'hii ganteng', '2025-01-14 09:53:57', '2025-01-14 09:53:57', NULL, NULL),
(55, 'why', '2025-01-14 12:10:00', '2025-01-14 12:10:00', 17, 62),
(56, 'idk', '2025-01-14 12:10:16', '2025-01-14 12:10:16', 17, 62),
(57, 'wkwk', '2025-01-15 08:55:16', '2025-01-15 08:55:16', 22, 62),
(58, 'hii', '2025-01-15 09:43:47', '2025-01-15 09:43:47', 17, 75),
(59, '6ggggg', '2025-01-16 13:24:46', '2025-01-16 13:24:46', 22, 72),
(60, 'gc', '2025-01-23 08:27:18', '2025-01-23 08:27:18', 17, 72),
(61, 'hiii', '2025-01-30 11:16:04', '2025-01-30 11:16:04', 17, 76),
(62, 'aswd', '2025-01-31 23:28:14', '2025-01-31 23:28:14', 17, 62),
(63, 'ok', '2025-02-01 00:10:23', '2025-02-01 00:10:23', 17, NULL),
(64, 'as', '2025-02-01 00:28:39', '2025-02-01 00:28:39', 17, 72),
(65, 'wow', '2025-02-01 09:41:27', '2025-02-01 09:41:27', 17, 90),
(66, 'wk', '2025-02-01 09:41:31', '2025-02-01 09:41:31', 17, 90),
(67, 'hii', '2025-02-03 09:31:57', '2025-02-03 09:31:57', 17, 62),
(68, 'hii', '2025-02-05 09:05:02', '2025-02-05 09:05:02', 17, 62),
(69, 'q', '2025-02-10 09:52:17', '2025-02-10 09:52:17', 17, 135),
(70, 'lah...', '2025-02-10 12:54:35', '2025-02-10 12:54:35', 17, 142),
(71, '2', '2025-02-10 12:54:41', '2025-02-10 12:54:41', 17, 142),
(72, 'hii', '2025-02-10 13:01:34', '2025-02-10 13:01:34', 17, 115),
(73, 'njkjj', '2025-02-10 13:21:48', '2025-02-10 13:21:48', 17, 126),
(74, 'njljpi', '2025-02-10 13:22:19', '2025-02-10 13:22:19', 17, 126),
(75, 'jnjii', '2025-02-10 13:23:56', '2025-02-10 13:23:56', 17, 130),
(76, 'assa', '2025-02-12 11:24:46', '2025-02-12 11:24:46', 17, 146),
(77, 'sas', '2025-02-12 11:25:09', '2025-02-12 11:25:09', 19, 146),
(78, 'kaj', '2025-02-12 11:25:19', '2025-02-12 11:25:19', 19, 146),
(79, 'kwkw', '2025-02-15 20:22:48', '2025-02-15 20:22:48', 17, NULL),
(80, 'w', '2025-02-15 20:23:00', '2025-02-15 20:23:00', 17, NULL),
(82, 'asu', '2025-02-19 11:34:09', '2025-02-19 11:34:09', 17, 146),
(83, 'anj', '2025-02-19 11:34:17', '2025-02-19 11:34:17', 17, 146),
(84, 'asu', '2025-02-19 11:34:26', '2025-02-19 11:34:26', 17, 146),
(85, 'asu', '2025-02-19 11:34:41', '2025-02-19 11:34:41', 17, 146),
(86, 'p', '2025-02-20 08:27:46', '2025-02-20 08:27:46', 17, 115),
(87, 'indah', '2025-02-20 14:18:03', '2025-02-20 14:18:03', 17, 201),
(88, 'hii', '2025-02-22 00:35:59', '2025-02-22 00:35:59', 17, 135);

-- --------------------------------------------------------

--
-- Struktur dari tabel `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `album_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `galleries`
--

INSERT INTO `galleries` (`id`, `title`, `description`, `image_url`, `user_id`, `created_at`, `updated_at`, `album_id`) VALUES
(62, 'Primogem', 'gens', 'uploads/1733710687889-302673129.jpg', 17, '2024-12-09 09:18:07', '2025-02-23 08:03:52', 55),
(63, 'Nature', 'like', 'uploads/1733710745289-754884026.jpg', 17, '2024-12-09 09:19:05', '2024-12-09 09:19:05', NULL),
(64, 'Sunset', 'com', 'uploads/1733710766640-528573161.jpg', 17, '2024-12-09 09:19:26', '2024-12-09 09:19:26', NULL),
(65, 'Ocean', 'sea', 'uploads/1733710785703-286618240.jpg', 17, '2024-12-09 09:19:45', '2024-12-09 09:19:45', NULL),
(67, 'Wallpapper', 'wrap', 'uploads/1733710933985-718070951.jpg', 17, '2024-12-09 09:22:13', '2025-02-23 14:55:37', 63),
(68, 'Night', 'sea', 'uploads/1733711050665-255175793.jpg', 17, '2024-12-09 09:24:10', '2024-12-09 09:24:10', NULL),
(69, 'Sky', 'night', 'uploads/1733712012345-413167789.jpg', 17, '2024-12-09 09:40:12', '2024-12-09 09:40:12', NULL),
(72, 'About you', '1975', 'uploads/1733718742444-707800479.jpg', 17, '2024-12-09 11:32:22', '2024-12-09 11:32:22', NULL),
(75, 'Cross', 'zebra', 'uploads/1733769558761-145613754.jpg', 17, '2024-12-10 01:39:18', '2024-12-10 01:39:18', NULL),
(76, 'Wall', 'decc', 'uploads/1733771100840-200353114.jpg', 19, '2024-12-10 02:05:00', '2024-12-10 02:05:00', NULL),
(78, 'All', 'kos', 'uploads/1737008648463-630790477.jpg', 22, '2025-01-16 13:24:08', '2025-01-16 13:24:08', NULL),
(79, 'Wallpaper', 'mount', 'uploads/1737602788853-228673434.jpg', 17, '2025-01-23 10:26:28', '2025-01-23 10:26:28', NULL),
(84, 'SKCK', 'HIi', 'uploads/1738230795915-315408889.jpg', 17, '2025-01-30 16:53:15', '2025-01-30 16:53:15', NULL),
(86, 'W10', 'W', 'uploads/1738234792158-69262472.jpg', 17, '2025-01-30 17:59:52', '2025-02-23 14:11:59', 63),
(87, 'ASS', 'zz', 'uploads/1738337578542-969269999.jpg', 17, '2025-01-31 22:32:58', '2025-01-31 22:32:58', NULL),
(89, 'As', 'a', 'uploads/1738343763375-935818476.jpg', 17, '2025-02-01 00:16:03', '2025-02-01 00:16:03', NULL),
(90, 'UI', 'a', 'uploads/1738377666929-392075187.jpg', 17, '2025-02-01 09:41:06', '2025-02-01 09:41:06', NULL),
(110, 'As', 'w', 'uploads/1738471479455-240096573.jpg', 17, '2025-02-02 11:44:39', '2025-02-22 19:27:16', 63),
(113, 'd', 'r', 'uploads/1738471603209-891870247.jpg', 17, '2025-02-02 11:46:43', '2025-02-02 11:46:43', NULL),
(115, 'w', 'a', 'uploads/1738474217034-976249800.png', 17, '2025-02-02 12:30:17', '2025-02-02 12:30:17', NULL),
(119, 'Q', 'q', 'uploads/1738488766115-596557883.jpg', 17, '2025-02-02 16:32:46', '2025-02-02 16:32:46', NULL),
(126, 'aa', 's', 'uploads/1738720330851-139564081.jpg', 17, '2025-02-05 08:52:10', '2025-02-05 08:52:10', NULL),
(130, 'Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare mauris vitae urna porta mattis. Morbi sit amet quam non libero hendrerit viverra quis ac ante. Donec sit amet varius mauris. Nunc eleifend egestas accumsan. Cras bibendum eu purus vel lacinia. Cras eu lectus nisi. Praesent nec neque arcu. Suspendisse quis suscipit nibh. Suspendisse sit amet turpis at augue fermentum iaculis. Mauris nec dolor feugiat, semper odio eget, auctor tellus. Curabitur ut iaculis massa. Morbi vestibulum luctus leo pharetra elementum. Phasellus faucibus rutrum purus, sed condimentum velit luctus non. Nullam gravida tortor vitae nibh aliquet, consectetur laoreet elit pretium.', 'uploads/1738819640426-530938089.jpg', 19, '2025-02-06 12:27:20', '2025-02-06 12:27:20', NULL),
(135, 'No way', 'w', 'uploads/1739070681797-788262095.jpg', 17, '2025-02-09 10:11:21', '2025-02-10 10:49:55', NULL),
(142, 'coba', 'coba', 'uploads/1739166831210-103067991.jpg', 17, '2025-02-10 12:53:51', '2025-02-23 14:56:47', 62),
(143, 'X', '1', 'uploads/1739271662121-632513908.jpg', 17, '2025-02-11 18:01:02', '2025-02-11 18:01:02', NULL),
(144, 'Wallpaper', '', 'uploads/1739271687271-82438454.jpg', 17, '2025-02-11 18:01:27', '2025-02-11 18:01:27', NULL),
(145, 'HII', '', 'uploads/1739271723982-312226770.jpg', 17, '2025-02-11 18:02:04', '2025-02-11 18:02:04', NULL),
(146, 'Beach', '', 'uploads/1739286070979-938818179.jpg', 17, '2025-02-11 22:01:10', '2025-02-11 22:01:10', NULL),
(153, 'Foto Sunset', 'Foto matahari terbenam di pantai', 'uploads/1739498409276-352450875.jpg', 17, '2025-02-14 09:00:09', '2025-02-14 09:00:09', NULL),
(159, 'Foto Gunung', 'gng', 'uploads/1739499404770-476468534.jpg', 17, '2025-02-14 09:16:44', '2025-02-14 09:16:44', NULL),
(160, 'Ucing', 'Ucing Imoet', 'uploads/1739512966321-990035994.jpeg', 17, '2025-02-14 13:02:46', '2025-02-23 14:48:10', 63),
(169, 'A beautiful sunset at the beach', 'gng', 'uploads/1739618284296-691644056.jpg', 17, '2025-02-15 18:18:04', '2025-02-23 14:56:47', 62),
(170, 'Wallpaper', 'gng', 'uploads/1739618942770-295249995.jpg', 17, '2025-02-15 18:29:02', '2025-02-15 18:29:02', NULL),
(171, 'Wallpaper Hp', '', 'uploads/1739619467825-911708483.jpg', 17, '2025-02-15 18:37:47', '2025-02-15 18:37:47', NULL),
(172, 'HOS', 'HDR', 'uploads/1739621741093-141063321.jpg', 17, '2025-02-15 19:15:41', '2025-02-15 19:16:26', NULL),
(188, 'Sea', NULL, 'uploads/photos-1739803625816-583767407.jpg', 17, '2025-02-17 21:47:05', '2025-02-17 21:47:05', NULL),
(189, 'Sea', NULL, 'uploads/photos-1739803625836-988017440.jpg', 17, '2025-02-17 21:47:05', '2025-02-17 21:47:05', NULL),
(190, 'Nature', NULL, 'uploads/photos-1739856053098-448575229.jpg', 17, '2025-02-18 12:20:53', '2025-02-18 12:20:53', NULL),
(191, 'Luck', NULL, 'uploads/photos-1739856284123-250632063.jpg', 17, '2025-02-18 12:24:44', '2025-02-18 12:24:44', NULL),
(192, 'Luck', NULL, 'uploads/photos-1739856284137-537122137.jpg', 17, '2025-02-18 12:24:44', '2025-02-18 12:24:44', NULL),
(193, 'Furniture', 'Deskripsi foto pertama', 'uploads/photos-1739886919596-630964629.jpeg', 17, '2025-02-18 20:55:19', '2025-02-18 20:55:19', NULL),
(194, 'Manufactur', 'Deskripsi foto kedua', 'uploads/photos-1739886919598-917334416.jpeg', 17, '2025-02-18 20:55:19', '2025-02-18 20:55:19', NULL),
(199, 'A', 'B', 'uploads/1739950463601-476214917.jpeg', 17, '2025-02-19 14:34:23', '2025-02-19 14:34:23', NULL),
(201, 'test2', '', 'uploads/1740014714255-21185590.jpg', 17, '2025-02-20 08:25:14', '2025-02-20 08:25:14', NULL),
(202, 'akan', 'lmao', 'uploads/1740036112775-875170690.jpeg', 17, '2025-02-20 14:21:52', '2025-02-21 13:41:53', NULL),
(203, 'Judul Foto Baru', 'Deskripsi Foto', 'uploads/photos-1740104430592-925930218.jpg', 17, '2025-02-21 09:20:30', '2025-02-21 09:55:47', NULL),
(204, 'Judul Foto Baru 2', 'Deskripsi Foto 2', 'uploads/photos-1740104430594-43811946.jpg', 17, '2025-02-21 09:20:30', '2025-02-21 09:55:47', NULL),
(208, 'Untitled', NULL, 'uploads/photos-1740104943525-325800706.jpeg', 17, '2025-02-21 09:29:03', '2025-02-21 09:29:03', NULL),
(209, 'Untitled', NULL, 'uploads/photos-1740108792734-574016992.jpg', 17, '2025-02-21 10:33:12', '2025-02-21 10:33:12', NULL),
(211, 'Untitled', NULL, 'uploads/photos-1740192981461-73184056.jpg', 17, '2025-02-22 09:56:21', '2025-02-22 09:56:21', NULL),
(212, 'Untitled', NULL, 'uploads/photos-1740194466017-693910280.jpg', 17, '2025-02-22 10:21:06', '2025-02-22 10:21:06', NULL),
(214, 'Foto Sunset', 'Foto matahari terbenam di pantai', 'uploads/1739498409276-352450875.jpg', 17, '2025-02-22 10:26:32', '2025-02-23 14:11:36', 63),
(215, 'Furniture', 'Deskripsi foto pertama', 'uploads/photos-1739886919596-630964629.jpeg', 17, '2025-02-22 10:26:32', '2025-02-22 10:26:32', NULL),
(216, 'Untitled', NULL, 'uploads/photos-1740194850905-916820764.jpg', 17, '2025-02-22 10:27:30', '2025-02-22 10:27:30', NULL),
(217, 'Untitled', NULL, 'uploads/photos-1740196856935-114399314.jpg', 17, '2025-02-22 11:00:56', '2025-02-22 11:00:56', 55),
(218, 'Untitled', NULL, 'uploads/photos-1740197314566-254440393.jpg', 17, '2025-02-22 11:08:34', '2025-02-22 11:08:34', NULL),
(220, 'Untitled', NULL, 'uploads/photos-1740202089833-393898871.jpg', 17, '2025-02-22 12:28:09', '2025-02-22 12:28:09', 55),
(221, 'Wallpapper', 'wrap', 'uploads/1733710933985-718070951.jpg', 17, '2025-02-22 12:29:07', '2025-02-22 12:29:07', 55),
(222, 'Untitled', NULL, 'uploads/photos-1740272582149-545908989.jpg', 17, '2025-02-23 08:03:02', '2025-02-23 08:03:02', 55),
(223, 'Untitled', NULL, 'uploads/photos-1740272699595-179275892.jpeg', 17, '2025-02-23 08:04:59', '2025-02-23 08:04:59', 55),
(224, 'Laut', 'Pantai', 'uploads/photos-1740273065467-927503782.jpg', 17, '2025-02-23 08:11:05', '2025-02-23 14:56:47', 62),
(225, 'Wallpaper', NULL, 'uploads/photos-1740274464879-374736553.jpg', 17, '2025-02-23 08:34:24', '2025-02-23 08:34:24', 55),
(226, '9:16', 'Sunset', 'uploads/photos-1740275328447-227567294.jpg', 17, '2025-02-23 08:48:48', '2025-02-23 08:48:48', 55),
(227, 'HD', '', 'uploads/1740275378546-955810972.jpeg', 17, '2025-02-23 08:49:38', '2025-02-23 08:49:38', NULL),
(228, 'Wallpaper', '', 'uploads/1740278896509-192784680.jpg', 17, '2025-02-23 09:48:16', '2025-02-23 09:48:16', NULL),
(229, 'Wallpaper', NULL, 'uploads/photos-1740279256687-387687756.jpg', 17, '2025-02-23 09:54:16', '2025-02-23 09:54:16', 63),
(230, 'Wallpaper', NULL, 'uploads/photos-1740279775596-764318976.jpg', 17, '2025-02-23 10:02:55', '2025-02-23 10:02:55', 63),
(231, 'Wallpaper', NULL, 'uploads/photos-1740280037647-290232649.jpg', 17, '2025-02-23 10:07:17', '2025-02-23 14:56:47', 62),
(232, 'Wallpaper', NULL, 'uploads/photos-1740280550200-723730765.jpg', 17, '2025-02-23 10:15:50', '2025-02-23 10:15:50', 63),
(233, 'Wallpaper', NULL, 'uploads/photos-1740280623684-23803692.jpg', 17, '2025-02-23 10:17:03', '2025-02-23 10:17:03', 63),
(234, 'HD', '', 'uploads/1740280671524-377667781.jpg', 17, '2025-02-23 10:17:51', '2025-02-23 10:17:51', NULL),
(235, 'Wallpaper', NULL, 'uploads/photos-1740293658892-199957603.jpg', 17, '2025-02-23 13:54:18', '2025-02-23 13:54:18', 63),
(236, 'Wallpaper', NULL, 'uploads/photos-1740294128239-927578437.jpg', 17, '2025-02-23 14:02:08', '2025-02-23 14:02:08', 63),
(237, 'Wallpaper', NULL, 'uploads/photos-1740294276930-262732638.jpg', 17, '2025-02-23 14:04:36', '2025-02-23 14:04:36', 63),
(238, 'Wallpaper', 'foto', 'uploads/photos-1740295615947-976433579.jpg', 17, '2025-02-23 14:26:56', '2025-02-23 14:26:56', 63),
(239, 'Wallpaper', 'foto', 'uploads/photos-1740296465846-612191307.jpg', 17, '2025-02-23 14:41:05', '2025-02-23 14:41:05', 63),
(240, 'Wallpaper', 'foto', 'uploads/photos-1740296554620-190751586.jpg', 17, '2025-02-23 14:42:34', '2025-02-23 14:42:34', 63),
(241, 'Wallpaper', 'foto', 'uploads/photos-1740296652245-463616711.jpg', 17, '2025-02-23 14:44:12', '2025-02-23 14:44:12', 63),
(242, 'Wallpaper', 'Gunung', 'uploads/photos-1740296890170-74857275.jpg', 17, '2025-02-23 14:48:10', '2025-02-23 14:48:10', 63),
(243, 'HD', '', 'uploads/1740303411713-261914380.jpg', 17, '2025-02-23 16:36:51', '2025-02-23 16:36:51', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `GalleryCategories`
--

CREATE TABLE `GalleryCategories` (
  `gallery_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `GalleryCategories`
--

INSERT INTO `GalleryCategories` (`gallery_id`, `category_id`) VALUES
(169, 8),
(169, 11),
(170, 8),
(170, 9),
(170, 11),
(171, 8),
(171, 11),
(171, 12),
(172, 13),
(172, 14),
(172, 15),
(199, 21),
(199, 22),
(201, 8),
(202, 26),
(202, 27),
(203, 8),
(203, 9),
(204, 19),
(204, 20),
(227, 14),
(228, 13),
(228, 14),
(234, 13),
(243, 14);

-- --------------------------------------------------------

--
-- Struktur dari tabel `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `gallery_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `likes`
--

INSERT INTO `likes` (`like_id`, `user_id`, `gallery_id`, `created_at`, `updated_at`) VALUES
(38, 17, 78, '2025-01-22 14:45:51', '2025-01-22 14:45:51'),
(39, 17, 72, '2025-01-23 08:27:22', '2025-01-23 08:27:22'),
(54, 19, 62, '2025-01-29 13:23:09', '2025-01-29 13:23:09'),
(67, 17, 63, '2025-01-31 23:47:39', '2025-01-31 23:47:39'),
(83, 17, 79, '2025-02-05 13:10:34', '2025-02-05 13:10:34'),
(90, 17, 62, '2025-02-10 10:57:49', '2025-02-10 10:57:49'),
(95, 17, 142, '2025-02-10 14:06:49', '2025-02-10 14:06:49'),
(106, 17, 144, '2025-02-12 11:24:15', '2025-02-12 11:24:15'),
(120, 17, 172, '2025-02-17 10:26:58', '2025-02-17 10:26:58'),
(125, 17, 115, '2025-02-20 08:27:36', '2025-02-20 08:27:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `adminCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `Users`
--

INSERT INTO `Users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`, `role`, `adminCode`) VALUES
(17, 'faa', 'faasd@gmail.com', '$2a$10$HYY1QVEdczQnbHMFirelm.udVN8xNxSFijKv5o2bKImi8/Nqi2Tb2', '2024-12-09 09:04:26', '2024-12-09 09:04:26', 'user', NULL),
(19, 'farid', 'farid@gmail.com', '$2a$10$nKF6s6vIniYv4vk8w5KquOwxYtOgX9s5Vk7XsLtCSXvPzJINVKyeS', '2024-12-10 01:59:08', '2024-12-10 01:59:08', 'user', NULL),
(22, 'admin', 'admin@gmail.com', '$2a$10$YJKvwPZc0dLEUFtzOCeVTOjDw36lPfR9/68f3aJi8ipOj3dsGt0xK', '2025-01-14 11:18:04', '2025-01-14 11:18:04', 'admin', 'onlyAdmin04rQCv');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`album_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `gallery_id` (`gallery_id`);

--
-- Indeks untuk tabel `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gallery_album` (`album_id`);

--
-- Indeks untuk tabel `GalleryCategories`
--
ALTER TABLE `GalleryCategories`
  ADD PRIMARY KEY (`gallery_id`,`category_id`);

--
-- Indeks untuk tabel `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `gallery_id` (`gallery_id`);

--
-- Indeks untuk tabel `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `albums`
--
ALTER TABLE `albums`
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT untuk tabel `Categories`
--
ALTER TABLE `Categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT untuk tabel `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT untuk tabel `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT untuk tabel `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `galleries`
--
ALTER TABLE `galleries`
  ADD CONSTRAINT `fk_gallery_album` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `GalleryCategories`
--
ALTER TABLE `GalleryCategories`
  ADD CONSTRAINT `GalleryCategories_ibfk_1` FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `GalleryCategories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`category_id`);

--
-- Ketidakleluasaan untuk tabel `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
