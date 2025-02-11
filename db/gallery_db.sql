-- phpMyAdmin SQL Dump
-- version 5.2.2-1.fc41
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 11 Feb 2025 pada 11.51
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
(36, 17, 'SKY', 'f', 'uploads/1738717571060-5a4e61ff2ed625e0e584f27cbe91f162.jpg', '2025-02-05 08:06:11', '2025-02-05 01:06:11'),
(40, 17, 'SKY', 'f', 'uploads/1738719859145-4c2c892995efab25f2f0d7c43919d86e.jpg', '2025-02-05 08:44:19', '2025-02-05 01:44:19'),
(41, 17, 'K', 'as', 'uploads/1738721083154-Screenshot from 2024-11-08 11-26-54.png', '2025-02-05 09:04:43', '2025-02-05 02:04:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
(38, 'wkkwk', '2024-12-10 05:45:34', '2024-12-10 05:45:34', 17, 62),
(39, 'a', '2024-12-10 12:21:22', '2024-12-10 12:21:22', 19, 62),
(40, 'a', '2024-12-10 12:21:28', '2024-12-10 12:21:28', 19, NULL),
(41, 'qll', '2024-12-13 10:36:39', '2024-12-13 10:36:39', 17, 62),
(42, 'dapi', '2024-12-13 10:43:39', '2024-12-13 10:43:39', 17, 62),
(43, 'n, ,', '2024-12-13 10:48:20', '2024-12-13 10:48:20', 17, 62),
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
(75, 'jnjii', '2025-02-10 13:23:56', '2025-02-10 13:23:56', 17, 130);

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
(62, 'Primogem', 'gens', 'uploads/1733710687889-302673129.jpg', 17, '2024-12-09 09:18:07', '2025-02-10 11:42:29', NULL),
(63, 'Nature', 'like', 'uploads/1733710745289-754884026.jpg', 17, '2024-12-09 09:19:05', '2024-12-09 09:19:05', NULL),
(64, 'Sunset', 'com', 'uploads/1733710766640-528573161.jpg', 17, '2024-12-09 09:19:26', '2024-12-09 09:19:26', NULL),
(65, 'Ocean', 'sea', 'uploads/1733710785703-286618240.jpg', 17, '2024-12-09 09:19:45', '2024-12-09 09:19:45', NULL),
(67, 'Wallpapper', 'wrap', 'uploads/1733710933985-718070951.jpg', 17, '2024-12-09 09:22:13', '2024-12-09 09:22:13', NULL),
(68, 'Night', 'sea', 'uploads/1733711050665-255175793.jpg', 17, '2024-12-09 09:24:10', '2024-12-09 09:24:10', NULL),
(69, 'Sky', 'night', 'uploads/1733712012345-413167789.jpg', 17, '2024-12-09 09:40:12', '2024-12-09 09:40:12', NULL),
(72, 'About you', '1975', 'uploads/1733718742444-707800479.jpg', 17, '2024-12-09 11:32:22', '2024-12-09 11:32:22', NULL),
(75, 'Cross', 'zebra', 'uploads/1733769558761-145613754.jpg', 17, '2024-12-10 01:39:18', '2024-12-10 01:39:18', NULL),
(76, 'Wall', 'decc', 'uploads/1733771100840-200353114.jpg', 19, '2024-12-10 02:05:00', '2024-12-10 02:05:00', NULL),
(78, 'All', 'kos', 'uploads/1737008648463-630790477.jpg', 22, '2025-01-16 13:24:08', '2025-01-16 13:24:08', NULL),
(79, 'Wallpaper', 'mount', 'uploads/1737602788853-228673434.jpg', 17, '2025-01-23 10:26:28', '2025-01-23 10:26:28', NULL),
(84, 'SKCK', 'HIi', 'uploads/1738230795915-315408889.jpg', 17, '2025-01-30 16:53:15', '2025-01-30 16:53:15', NULL),
(86, 'W10', 'W', 'uploads/1738234792158-69262472.jpg', 17, '2025-01-30 17:59:52', '2025-01-30 17:59:52', NULL),
(87, 'ASS', 'zz', 'uploads/1738337578542-969269999.jpg', 17, '2025-01-31 22:32:58', '2025-01-31 22:32:58', NULL),
(89, 'As', 'a', 'uploads/1738343763375-935818476.jpg', 17, '2025-02-01 00:16:03', '2025-02-01 00:16:03', NULL),
(90, 'UI', 'a', 'uploads/1738377666929-392075187.jpg', 17, '2025-02-01 09:41:06', '2025-02-01 09:41:06', NULL),
(109, 's', 'a', 'uploads/1738469763471-167156452.jpg', 22, '2025-02-02 11:16:03', '2025-02-02 11:16:03', NULL),
(110, 'As', 'w', 'uploads/1738471479455-240096573.jpg', 17, '2025-02-02 11:44:39', '2025-02-02 11:44:39', NULL),
(113, 'd', 'r', 'uploads/1738471603209-891870247.jpg', 17, '2025-02-02 11:46:43', '2025-02-02 11:46:43', NULL),
(114, '1975', 'as', 'uploads/1738471971994-997054913.jpg', 17, '2025-02-02 11:52:51', '2025-02-02 11:52:51', NULL),
(115, 'w', 'a', 'uploads/1738474217034-976249800.png', 17, '2025-02-02 12:30:17', '2025-02-02 12:30:17', NULL),
(119, 'Q', 'q', 'uploads/1738488766115-596557883.jpg', 17, '2025-02-02 16:32:46', '2025-02-02 16:32:46', NULL),
(126, 'aa', 's', 'uploads/1738720330851-139564081.jpg', 17, '2025-02-05 08:52:10', '2025-02-05 08:52:10', NULL),
(130, 'Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare mauris vitae urna porta mattis. Morbi sit amet quam non libero hendrerit viverra quis ac ante. Donec sit amet varius mauris. Nunc eleifend egestas accumsan. Cras bibendum eu purus vel lacinia. Cras eu lectus nisi. Praesent nec neque arcu. Suspendisse quis suscipit nibh. Suspendisse sit amet turpis at augue fermentum iaculis. Mauris nec dolor feugiat, semper odio eget, auctor tellus. Curabitur ut iaculis massa. Morbi vestibulum luctus leo pharetra elementum. Phasellus faucibus rutrum purus, sed condimentum velit luctus non. Nullam gravida tortor vitae nibh aliquet, consectetur laoreet elit pretium.', 'uploads/1738819640426-530938089.jpg', 19, '2025-02-06 12:27:20', '2025-02-06 12:27:20', NULL),
(135, 'No way', 'w', 'uploads/1739070681797-788262095.jpg', 17, '2025-02-09 10:11:21', '2025-02-10 10:49:55', NULL),
(142, 'coba', 'coba', 'uploads/1739166831210-103067991.jpg', 17, '2025-02-10 12:53:51', '2025-02-10 12:53:51', NULL),
(143, 'X', '1', 'uploads/1739271662121-632513908.jpg', 17, '2025-02-11 18:01:02', '2025-02-11 18:01:02', NULL),
(144, 'Wallpaper', '', 'uploads/1739271687271-82438454.jpg', 17, '2025-02-11 18:01:27', '2025-02-11 18:01:27', NULL),
(145, 'HII', '', 'uploads/1739271723982-312226770.jpg', 17, '2025-02-11 18:02:04', '2025-02-11 18:02:04', NULL);

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
(95, 17, 142, '2025-02-10 14:06:49', '2025-02-10 14:06:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Photo_categories`
--

CREATE TABLE `Photo_categories` (
  `id` int(11) NOT NULL,
  `galleries_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
-- Indeks untuk tabel `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

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
-- Indeks untuk tabel `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `gallery_id` (`gallery_id`);

--
-- Indeks untuk tabel `Photo_categories`
--
ALTER TABLE `Photo_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `galleries_id` (`galleries_id`),
  ADD KEY `category_id` (`category_id`);

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
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT untuk tabel `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT untuk tabel `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT untuk tabel `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

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
-- Ketidakleluasaan untuk tabel `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`);

--
-- Ketidakleluasaan untuk tabel `Photo_categories`
--
ALTER TABLE `Photo_categories`
  ADD CONSTRAINT `Photo_categories_ibfk_1` FOREIGN KEY (`galleries_id`) REFERENCES `galleries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Photo_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
