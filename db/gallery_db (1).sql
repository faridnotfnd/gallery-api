-- phpMyAdmin SQL Dump
-- version 5.2.1-5.fc41
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 22 Des 2024 pada 13.03
-- Versi server: 10.11.10-MariaDB
-- Versi PHP: 8.3.14

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
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `albums`
--

INSERT INTO `albums` (`album_id`, `user_id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(4, 17, 'Album Baru', 'Deskripsi album baru', '2024-12-10 07:20:43', '2024-12-10 00:20:43'),
(5, 17, 'Album Baru', 'Deskripsi album baru', '2024-12-10 22:37:23', '2024-12-10 15:37:23'),
(6, 17, 'Album Baru', 'Deskripsi album baru', '2024-12-10 22:43:44', '2024-12-10 15:43:44');

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
(40, 'a', '2024-12-10 12:21:28', '2024-12-10 12:21:28', 19, 66),
(41, 'qll', '2024-12-13 10:36:39', '2024-12-13 10:36:39', 17, 62),
(42, 'dapi', '2024-12-13 10:43:39', '2024-12-13 10:43:39', 17, 62),
(43, 'n, ,', '2024-12-13 10:48:20', '2024-12-13 10:48:20', 17, 62),
(44, 'Test', '2024-12-13 10:49:46', '2024-12-13 10:49:46', 17, 62),
(45, 'Dapi', '2024-12-13 10:50:36', '2024-12-13 10:50:36', 17, 62),
(46, 'hii', '2024-12-13 13:39:34', '2024-12-13 13:39:34', 19, 62),
(47, 'lawak', '2024-12-13 13:51:54', '2024-12-13 13:51:54', 19, 62),
(48, 'faa', '2024-12-13 14:40:17', '2024-12-13 14:40:17', 19, 66),
(49, 'faaa', '2024-12-13 14:41:02', '2024-12-13 14:41:02', 17, 66),
(50, 'gg', '2024-12-16 06:17:59', '2024-12-16 06:17:59', 19, 62);

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
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `galleries`
--

INSERT INTO `galleries` (`id`, `title`, `description`, `image_url`, `user_id`, `created_at`, `updated_at`) VALUES
(62, 'Primogem', 'use', 'uploads/1733710687889-302673129.jpg', 17, '2024-12-09 09:18:07', '2024-12-09 09:18:07'),
(63, 'Nature', 'like', 'uploads/1733710745289-754884026.jpg', 17, '2024-12-09 09:19:05', '2024-12-09 09:19:05'),
(64, 'Sunset', 'com', 'uploads/1733710766640-528573161.jpg', 17, '2024-12-09 09:19:26', '2024-12-09 09:19:26'),
(65, 'Ocean', 'sea', 'uploads/1733710785703-286618240.jpg', 17, '2024-12-09 09:19:45', '2024-12-09 09:19:45'),
(66, 'Wall', 'state', 'uploads/1733710804965-279141490.jpg', 17, '2024-12-09 09:20:04', '2024-12-09 09:20:04'),
(67, 'Wallpapper', 'wrap', 'uploads/1733710933985-718070951.jpg', 17, '2024-12-09 09:22:13', '2024-12-09 09:22:13'),
(68, 'Night', 'sea', 'uploads/1733711050665-255175793.jpg', 17, '2024-12-09 09:24:10', '2024-12-09 09:24:10'),
(69, 'Sky', 'night', 'uploads/1733712012345-413167789.jpg', 17, '2024-12-09 09:40:12', '2024-12-09 09:40:12'),
(70, 'Dino', 'forest', 'uploads/1733717920985-974950649.jpg', 17, '2024-12-09 11:18:40', '2024-12-09 11:18:40'),
(71, 'Levi', 'aot', 'uploads/1733717951960-557726636.jpg', 17, '2024-12-09 11:19:11', '2024-12-09 11:19:11'),
(72, 'About you', '1975', 'uploads/1733718742444-707800479.jpg', 17, '2024-12-09 11:32:22', '2024-12-09 11:32:22'),
(73, 'concert', 'con', 'uploads/1733718802592-774269699.jpg', 17, '2024-12-09 11:33:22', '2024-12-09 11:33:22'),
(75, 'Cross', 'zebra', 'uploads/1733769558761-145613754.jpg', 17, '2024-12-10 01:39:18', '2024-12-10 01:39:18'),
(76, 'Wall', 'decc', 'uploads/1733771100840-200353114.jpg', 19, '2024-12-10 02:05:00', '2024-12-10 02:05:00');

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
(20, 'admin', 'admin@gmail.com', '$2a$10$Cmh3i/60K57KqBOsVxj2hOAwhw1uRyWmtb11Q5Flgu1qSQEekEv1.', '2024-12-10 05:02:57', '2024-12-10 05:02:57', 'admin', 'onlyAdmin04rQCv');

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT untuk tabel `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT untuk tabel `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
-- Ketidakleluasaan untuk tabel `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
