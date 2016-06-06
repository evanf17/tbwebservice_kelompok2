-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2016 at 06:06 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_persib`
--

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `member_id` int(5) NOT NULL AUTO_INCREMENT,
  `member_nama` varchar(40) NOT NULL,
  `member_password` varchar(30) NOT NULL,
  `member_alamat` varchar(50) NOT NULL,
  `member_telp` varchar(12) NOT NULL,
  `member_tgl_masuk` varchar(30) NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`member_id`, `member_nama`, `member_password`, `member_alamat`, `member_telp`, `member_tgl_masuk`) VALUES
(1, 'sipelaut ', '', 'di laut', '12254', '2016-05-02');

-- --------------------------------------------------------

--
-- Table structure for table `t_admin`
--

CREATE TABLE IF NOT EXISTS `t_admin` (
  `admin_id` int(5) NOT NULL AUTO_INCREMENT,
  `admin_nama` varchar(40) NOT NULL,
  `admin_username` varchar(30) NOT NULL,
  `admin_password` varchar(30) NOT NULL,
  `admin_alamat` varchar(50) NOT NULL,
  `admin_telp` varchar(12) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `t_admin`
--

INSERT INTO `t_admin` (`admin_id`, `admin_nama`, `admin_username`, `admin_password`, `admin_alamat`, `admin_telp`) VALUES
(1, 'Administrator', 'admin', '21232f297a57a5a743894a0e4a801f', 'Sumedang', '081214736703');

-- --------------------------------------------------------

--
-- Table structure for table `t_berita`
--

CREATE TABLE IF NOT EXISTS `t_berita` (
  `berita_id` int(5) NOT NULL AUTO_INCREMENT,
  `jadwal_id` int(5) NOT NULL,
  `berita_deskripsi` varchar(100) NOT NULL,
  `berita_judul` varchar(50) NOT NULL,
  PRIMARY KEY (`berita_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `t_jadwal`
--

CREATE TABLE IF NOT EXISTS `t_jadwal` (
  `jadwal_id` int(11) NOT NULL AUTO_INCREMENT,
  `tgl_tanding` date NOT NULL,
  `waktu` time NOT NULL,
  `lawan_tanding` varchar(40) NOT NULL,
  `lokasi_tanding` varchar(40) NOT NULL,
  PRIMARY KEY (`jadwal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
