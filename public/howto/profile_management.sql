-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: profile_tcs_database_development
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subTitle` varchar(255) NOT NULL,
  `description` text,
  `content` text NOT NULL,
  `thumnail` int NOT NULL,
  `subCategoryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subCategoryId` (`subCategoryId`),
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (2,'Tôn trọng quyền được sai của người khác','Hãy yêu thương bản thân','No nooooo','<p>Bạn không thể đánh lửa nếu chỉ có một hòn đá.</p><p>Người ta đề cao teamwork là một loại kỹ năng cần thiết để hoàn thành những công việc có thể tạo ra được nhiều giá trị cho cộng đồng. Kỹ năng này nói về việc làm thế nào để nhiều cá nhân trong một tổ chức có thể phối hợp và phát huy thế mạnh của nhau, càng gắn bó càng dễ hoàn thành mục tiêu.</p><p>Và thậm chí ngay cả những việc cần tự mình hoàn thành mà không cần làm chung với ai cả thì cũng phải cần kỹ năng teamwork.</p><p>Nhưng nếu đã nói là không có người khác, thì ta sẽ teamwork với ai?</p><hr></hr><h3><div className=\'wrap__original-lazy aligncenter size-full wp-image-1612\'><div className=\'wrap--image mb-0\'><img src=\'https://hoang.moe/wp-content/uploads/2022/10/1.png\' alt=\'\' srcSet=\'https://hoang.moe/wp-content/uploads/2022/10/1.png 1800w, https://hoang.moe/wp-content/uploads/2022/10/1-300x167.png 300w, https://hoang.moe/wp-content/uploads/2022/10/1-1024x569.png 1024w, https://hoang.moe/wp-content/uploads/2022/10/1-500x278.png 500w, https://hoang.moe/wp-content/uploads/2022/10/1-768x427.png 768w, https://hoang.moe/wp-content/uploads/2022/10/1-1536x853.png 1536w, https://hoang.moe/wp-content/uploads/2022/10/1-50x28.png 50w\' className=\'image--lazy-original\' /></div></div></h3><h3>1. Ta teamwork với ai?</h3><p>Một đội nên có 3 người là tốt nhất.</p><p>Để ý quan sát, ta dễ bắt gặp bộ ba xuất hiện ở nhiều nơi trong cuộc sống:</p> <ul><li>Vật chất được tạo thành từ nguyên tử với thành phần: Proton, Electron, Neutron</li><li>Thời gian: Quá khứ, Hiện tại, Tương lai</li><li>Phim ảnh: Bao Thanh Thiên, Công Tôn Sách, Triển Chiêu</li><li>Truyện: Harry Potter, Ron, and Hermione</li></ul><p>Vì thế, mình xin tạm tách bản thân ra thành bộ 3 “cái ta” khác nhau, dựa trên sự quan sát và trải nghiệm về những phiên bản thường xuất hiện trong công việc. Đó là:</p><ul><li>Cái ta thích làm – phiên bản làm cái đã, tính sau.</li><li>Cái ta muốn quan sát – phiên bản thích quan sát rồi ngầm đánh giá.</li><li>Cái ta thường suy nghĩ – phiên bản thông thái, nhưng thường lười biếng.</li></ul><p>Bây giờ để có thể phối hợp tốt hơn, hãy cùng tìm hiểu đặc điểm của 3 cái ta này.</p><hr></hr><h3><div className=\'wrap__original-lazy aligncenter size-full wp-image-1613\'><div className=\'wrap--image mb-0\'><img src=\'https://hoang.moe/wp-content/uploads/2022/10/2-50x28.png\' className=\'data__original-lazy has--data-srcset size-full wp-image-1613 enable__lazy\' data-original=\'https://hoang.moe/wp-content/uploads/2022/10/2.png\' alt=\'\' width={1800} height={1000} data-srcset=\'https://hoang.moe/wp-content/uploads/2022/10/2.png 1800w, https://hoang.moe/wp-content/uploads/2022/10/2-300x167.png 300w, https://hoang.moe/wp-content/uploads/2022/10/2-1024x569.png 1024w, https://hoang.moe/wp-content/uploads/2022/10/2-500x278.png 500w, https://hoang.moe/wp-content/uploads/2022/10/2-768x427.png 768w, https://hoang.moe/wp-content/uploads/2022/10/2-1536x853.png 1536w, https://hoang.moe/wp-content/uploads/2022/10/2-50x28.png 50w\' sizes=\'(max-width: 1800px) 100vw, 1800px\' /></div></div></h3><h3>2. Cái ta thích làm</h3><p>Với phương châm “Làm cái đã tính sau”.</p><p>“Cái ta thích làm” là một anh chàng đầy nhiệt huyết, đặc biệt là khi vừa được truyền cảm hứng để làm một việc gì đấy. Anh ta sẽ thường muốn bắt tay vào làm ngay mà không cần hỏi ý kiến của 2 người còn lại.</p><p>Điểm mạnh của anh chàng này đó là ít bị sự trì hoãn chi phối. Nhưng cũng vì vội vàng, chăm chăm lao đầu về đích, anh ta thường dễ mắc những sai lầm đáng tiếc. Rồi mỗi lần như vậy, anh thường phải nghe:</p><p>“Tại sao mày lại làm điều đó chứ? Mày không biết chậm lại suy nghĩ hả?”</p> <p>Nếu thường xuyên bị đổ lỗi anh ta sẽ trở nên rụt rè, và bắt đầu trở nên sợ hãi cả nhóm. Rồi đến lúc cần người làm, gọi mãi nhưng anh không dám bước ra.</p><p>Nếu không biết nhận lỗi, chẳng có thứ gì phá hoại nhanh hơn anh ta.</p>',28,10,'2022-11-29 09:31:18','2022-11-29 09:37:08'),(4,'Cuộc sống là những nụ cười 1','Nhân dân tệ tràn ngập trong kinh tế Nga 2','<p>3 Nội tệ Trung Quốc đang dần thay thế USD tại Nga, giúp doanh nghiệp hai nước hưởng lợi, đồng thời giúp Moskva giảm tác động từ lệnh trừng phạt.</p>','<p><br></p><p>4 Doanh nhân Trung Quốc Wang Min rất vui khi Nga chấp nhận đồng nhân dân tệ. Công ty bán đèn LED của anh vì thế có thể định giá trong hợp đồng với khách hàng Nga bằng nhân dân tệ, thay vì USD hay euro. Họ cũng trả anh bằng nhân dân tệ. \"Đây là mối quan hệ hai bên cùng có lợi\", anh nói.</p><p>Việc kinh doanh của Wang thay đổi hoàn toàn sau cuộc chiến tại Ukraine và các lệnh trừng phạt của phương Tây với Nga. Nguyên nhân là các ngân hàng và nhiều doanh nghiệp Nga bị chặn tiếp cận với hệ thống thanh toán bằng USD và euro.</p><p>Trước đây, quan hệ kinh doanh của Wang với Nga khá nhỏ. Nhưng hiện tại, anh đang chuẩn bị đầu tư vào nhà kho ở đây.</p><p>\"Chúng tôi hy vọng thị trường Nga năm tới đóng đóng 10-15% tổng doanh số\", Wang nói. Hiện tại, công ty của anh thu về 20 triệu USD mỗi năm, chủ yếu từ thị trường châu Phi và Nam Mỹ.</p><p>Wang cũng đang tìm cách tận dụng quá trình \"nhân dân tệ hóa\" đang diễn ra rất nhanh trong kinh tế Nga năm nay. Các hãng xuất khẩu Trung Quốc giảm được rủi ro ngoại hối, còn người mua Nga thanh toán cũng tiện lợi hơn.</p><p><img src=\"https://i1-kinhdoanh.vnecdn.net/2022/11/29/sberbank-4399-1669712240.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=kngCMrBV_ppMDdzBbyXqKA\"></p><p>Ngân hàng lớn nhất Nga - Sberbank - có thể phát hành trái phiếu bằng nhân dân tệ. Ảnh:<em>&nbsp;Reuters</em></p><p>Dù nhân dân tệ đã dần phổ biến trong kinh tế Nga vài năm gần đây, tốc độ này được đẩy nhanh chỉ trong 9 tháng qua, theo số liệu và khảo sát của Reuters. Việc Nga chuyển hướng tài chính sang phía Đông có thể tăng thương mại xuyên biên giới, từ đó tạo ra đối trọng kinh tế với đồng USD và hạn chế tác động của các lệnh trừng phạt từ phương Tây.</p>',28,10,'2022-11-29 10:17:49','2022-11-29 10:18:31');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (3,'Project','<p>project category</p>','2022-11-24 03:34:04','2022-12-02 04:02:28'),(10,'Blog','<p>blog category</p>','2022-11-24 05:19:32','2022-12-02 04:02:56'),(12,'Media','<p>media category</p>','2022-11-24 05:40:06','2022-12-02 04:02:51'),(13,'User','<p>user category</p>','2022-11-24 05:46:43','2022-12-02 04:03:04'),(14,'Reset Password','<p>reset password category</p>','2022-11-25 10:37:26','2022-12-02 04:02:42');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'Linkedin','linkedin.com','2022-11-24 10:05:19','2022-11-24 10:05:19'),(2,'Github','https://github.com','2022-11-24 10:06:41','2022-11-24 10:06:41'),(3,'Facebook','https://facebook.com','2022-11-24 10:07:01','2022-11-24 10:07:01'),(4,'Skype','https://skype.com','2022-11-24 10:07:18','2022-11-24 10:07:18'),(5,'Address','District 12, Ho Chi Minh city','2022-11-24 10:07:19','2022-11-24 10:10:08'),(6,'Email','nthhanh111994@gmail.com','2022-11-24 10:07:46','2022-11-24 10:07:46'),(7,'Phone','+84 3 898 00 670','2022-11-24 10:08:27','2022-11-24 10:08:27'),(8,'Name','Hanh Nguyen','2022-11-24 10:08:57','2022-11-24 10:08:57'),(9,'Date of Birth','January 01, 1994','2022-11-24 10:09:21','2022-11-24 10:09:21');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `src` varchar(255) NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `subCategoryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subCategoryId` (`subCategoryId`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (28,'http://localhost:3001/images/1669956407325-52161892-LOGO-WHITE-TRANSPARENT.png',1,'IMG','<p><br></p>',8,'2022-11-29 08:59:43','2022-12-02 04:49:02'),(29,'http://localhost:3001/images/1669885629521-167456746-model.pdf',1,'CV','<p>The introduce yourself file.</p>',7,'2022-11-29 09:04:19','2022-12-02 04:48:38'),(35,'http://localhost:3001/images/1669885496690-118008670-piano.mp3',1,'The sound for the client site','<p>The sound for the client site increases the reading experience for readers.</p>',9,'2022-12-01 05:15:12','2022-12-02 04:48:11');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES (1,'University of Science Vietnam','<p><strong>VNUHCM-University of Science</strong> (VNUHCM-US; formerly known as University of Sciences) has offered various scientific degrees across Southern Vietnam since its establishment as the Indochina College of Science in 1941.</p><p><br></p><p>VNUHCM-US was re-founded in March 1996 following a split from Đại học Tổng hợp (lit. translation: Ho Chi Minh City University). The school has since been a member university of Vietnam National University, Ho Chi Minh City.</p><p><br></p><p>Due to some internal reforms, at the beginning of 1996, the Faculty of Science became the University of Natural Sciences - one of the five affiliated universities of the Vietnam National University Ho Chi Minh City. In 2007, the university was officially renamed as the University of Science. Since 2007, VNUHCM – US has been a public university playing an important role in offering education and scientific research within the VNUHCM system.</p><p><br></p><p>It is entrusted with providing education at undergraduate levels and postgraduate levels and undertaking scientific research as well as technological transfer. As of July 2022, the university has more than 13,000 enrolled students including:</p><ul><li>52 undergraduate programs</li><li>32 graduate programs</li><li>29 PhD programs</li><li>2 joint bachelor programs</li></ul><p><br></p><p>The two joint bachelor programs include Bachelor of Computer &amp; Information Sciences with a major in IT Service Science collaborated with Auckland University of Technology, New Zealand; Bachelor of Science in Management collaborated with a major in International Business collaborated with Keuka College, USA</p><p><br></p><p>The university provides several education professions: Biology, Chemistry, Electronic &amp; Communications, Environment, Geology, Information Technology, Math &amp; Computer Science, Materials Science, Oceanography, Physics.</p><p><br></p><p>The university has two campuses: One in District 5 of Ho Chi Minh City and one in Thu Duc City.</p>','2022-11-24 09:01:02','2022-12-02 04:26:16'),(2,'Information & Technology University Vietnam','<p><strong>VNUHCM - University of Information Technology (UIT)</strong> is the public university that was founded under the Decision No.134/2006/QD-TTg dated on June 8, 2006 by the Vietnam’s Prime Minister. It offers prestigious programs in Information and Communication Technology (ICT). As the university member of Vietnam National University of Ho Chi Minh City (VNUHCM), UIT takes charge of training high-ranked labor force in information technology (IT), who are to contribute to the development of Vietnam\'s IT industry. Meanwhile, it conducts scientific researches and transfers advanced IT. Especially, its focal point is the application which aims at promoting the country’s industrialization and modernization.</p><p><br></p><p>After over 10 years of founding and development, its facilities include modern and well-equipped areas for studying, researching and working that have been invested tremendously with over 14 hectares in total and within the VNU-HCM zone.</p><p><br></p><p>Since UIT’s core value as \"Exquisite – Innovation - Enthusiasm\" shapes what it operates, develops. The motto also helps mapping UIT as the top university in IT field in Vietnam, and the place for its students to be catered in all aspects, such as knowledge, professional skills and attitude towards life in order to serve public community, and become dynamic - brave - confident citizens to integrate with the international community.</p><p><br></p><p><strong>Vision</strong></p><ul><li>Providing high quality human resources for Vietnam’s labor market and to serve community’s purposes</li><li>The leading university in advanced research and technology transfer in ICT and related fields</li></ul><p><br></p><p><strong>Mission</strong></p><ul><li>Being a prestigious name in quality education for industrial innovation of ICT and other related fields in Asian.</li></ul>','2022-11-24 09:01:50','2022-12-02 04:36:39'),(3,'Softfront Company','<p><strong>A leading provider of software products/ total solution on Voice and Video over IP network</strong></p><p>Softfront Vietnam was established on August 8th, 2013 with 100% investment capital by Softfront Japan, whose name is listed on Tokyo JASDAQ stock market. Head office of Softfront Vietnam is located in HCMC and R&amp;D division is recently established in Hanoi.</p><p><br></p><p>Softfront is a leading provider of software products/ total solution on Voice and Video over IP network. Softfront\'s products and services, mainly based on SIP /NGN technology, vary from core library (middleware) to application layer, from client to server application, from outsourcing to consulting service, etc.</p><p><br></p><p>Softfront’s main clients are big telecommunication operators, network providers, and mobile device/ CPE manufacturers as NTT, KDDI, KOPT and electronic device manufacturers as Panasonic, FujiXerox, Canon, Fujitsu, Sanyo, Sharp, NEC, Mitsubishi, OKI, Sony, etc.</p>','2022-11-24 09:02:02','2022-12-02 04:30:59'),(4,'TMA Solution Company','<p><strong>TMA Solutions</strong> was established in 1997 to provide quality software outsourcing services to leading companies worldwide. We are one of the largest software outsourcing companies in Vietnam with 3,800 engineers. Our engineering team was selected from a large pool of Vietnam IT resources; they are well-trained and have successfully completed many large and complex projects.</p><p><br></p><p><strong>Locations:&nbsp;</strong></p><ul><li>Vietnam: Ho Chi Minh City &amp; Quy Nhon City</li><li>USA: San Jose</li><li>Canada: Ottawa</li><li>Germany: Munich</li><li>Australia: Melbourne &amp; Adelaide</li><li>Japan: Tokyo</li><li>Singapore: Singapore</li></ul><p><br></p><p><strong>Awards/ Recognitions:</strong></p><ul><li>One of the top 15 global companies with \"Offshore Software Outsourcing Best Practices\" (Aberdeen Group, 2002)</li><li>Gold medal for Software Export and Top ICT Companies from HCMC Computer Associations (2004-2021)</li></ul><p><br></p><p>After more than 25 years of steady growth, our engineering team size has increased from 6 to 3,800 engineers.</p>','2022-11-24 09:02:15','2022-12-02 04:28:49'),(5,'Merkle Company','<p><strong>Merkleinc is one of the biggest e-commerce solution partners in Asia</strong></p><p>Merkle (Isobar Commerce) is the reliable and creative partner when it comes to professional e-commerce solutions and the implementation into existing business structures.</p><p>Our clients know us for an open and trustful collaboration and a passion to be the most skilled e-commerce and web solutions provider all over Asia Pacific&nbsp;</p><p>Being an international company with a deep understanding of the Asian culture and its specificities, allow us to create the most efficient and localized solutions for our customers. We are working with scalable, reliable, secure and renowned frameworks like : Magento, Saleforce and Shopify:</p><ul><li>Magento Gold partner</li><li>Saleforce Partner</li></ul><p>With the needs of expansion, we are looking for qualified candidates both for Ho Chi Minh City and Ha Noi Office for our e-commerce outsourcing projects coming from Europe, Japan, China, etc..</p><p><br></p><p>We specialize in e-commerce solutions using Magento. Front end skills are key.</p>','2022-11-24 09:02:28','2022-12-02 04:33:14');
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `technical` text NOT NULL,
  `date` varchar(255) NOT NULL,
  `members` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `organizationId` int DEFAULT NULL,
  `subCategoryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `organizationId` (`organizationId`),
  KEY `subCategoryId` (`subCategoryId`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (2,'Master Degree of Design','https://ant.design/components/select','<p>Bạn không thể đánh lửa nếu chỉ có một hòn đá.</p><p>Người ta đề cao teamwork là một loại kỹ năng cần thiết để hoàn thành những công việc có thể tạo ra được nhiều giá trị cho cộng đồng. Kỹ năng này nói về việc làm thế nào để nhiều cá nhân trong một tổ chức có thể phối hợp và phát huy thế mạnh của nhau, càng gắn bó càng dễ hoàn thành mục tiêu.</p><p>Và thậm chí ngay cả những việc cần tự mình hoàn thành mà không cần làm chung với ai cả thì cũng phải cần kỹ năng teamwork.</p><p>Nhưng nếu đã nói là không có người khác, thì ta sẽ teamwork với ai?</p><h3><img src=\"https://hoang.moe/wp-content/uploads/2022/10/1.png\"></h3><h3>1. Ta teamwork với ai?</h3><p>Một đội nên có 3 người là tốt nhất.</p><p>Để ý quan sát, ta dễ bắt gặp bộ ba xuất hiện ở nhiều nơi trong cuộc sống:</p><ul><li>Vật chất được tạo thành từ nguyên tử với thành phần: Proton, Electron, Neutron</li><li>Thời gian: Quá khứ, Hiện tại, Tương lai</li><li>Phim ảnh: Bao Thanh Thiên, Công Tôn Sách, Triển Chiêu</li><li>Truyện: Harry Potter, Ron, and Hermione</li></ul><p>Vì thế, mình xin tạm tách bản thân ra thành bộ 3 “cái ta” khác nhau, dựa trên sự quan sát và trải nghiệm về những phiên bản thường xuất hiện trong công việc. Đó là:</p><ul><li>Cái ta thích làm – phiên bản làm cái đã, tính sau.</li><li>Cái ta muốn quan sát – phiên bản thích quan sát rồi ngầm đánh giá.</li><li>Cái ta thường suy nghĩ – phiên bản thông thái, nhưng thường lười biếng.</li></ul><p>Bây giờ để có thể phối hợp tốt hơn, hãy cùng tìm hiểu đặc điểm của 3 cái ta này.</p><h3><img src=\"https://hoang.moe/wp-content/uploads/2022/10/2-50x28.png\"></h3><h3>2. Cái ta thích làm</h3><p>Với phương châm “Làm cái đã tính sau”.</p><p>“Cái ta thích làm” là một anh chàng đầy nhiệt huyết, đặc biệt là khi vừa được truyền cảm hứng để làm một việc gì đấy. Anh ta sẽ thường muốn bắt tay vào làm ngay mà không cần hỏi ý kiến của 2 người còn lại.</p><p>Điểm mạnh của anh chàng này đó là ít bị sự trì hoãn chi phối. Nhưng cũng vì vội vàng, chăm chăm lao đầu về đích, anh ta thường dễ mắc những sai lầm đáng tiếc. Rồi mỗi lần như vậy, anh thường phải nghe:</p><p>“Tại sao mày lại làm điều đó chứ? Mày không biết chậm lại suy nghĩ hả?”</p><p>Nếu thường xuyên bị đổ lỗi anh ta sẽ trở nên rụt rè, và bắt đầu trở nên sợ hãi cả nhóm. Rồi đến lúc cần người làm, gọi mãi nhưng anh không dám bước ra.</p><p>Nếu không biết nhận lỗi, chẳng có thứ gì phá hoại nhanh hơn anh ta.</p>','[\"html\",\"css\",\"react\"]','[\"2014-07-16T11:23:37.041Z\", \"2015-08-16T11:23:37.041Z\"]','5 members includes 1 leader, 2 dev, 2 QC','[28]',5,4,'2022-11-24 10:39:45','2022-12-01 10:50:23'),(5,'Master Degree of Design','https://ant.design/components/select','<p>Bạn không thể đánh lửa nếu chỉ có một hòn đá.</p><p>Người ta đề cao teamwork là một loại kỹ năng cần thiết để hoàn thành những công việc có thể tạo ra được nhiều giá trị cho cộng đồng. Kỹ năng này nói về việc làm thế nào để nhiều cá nhân trong một tổ chức có thể phối hợp và phát huy thế mạnh của nhau, càng gắn bó càng dễ hoàn thành mục tiêu.</p><p>Và thậm chí ngay cả những việc cần tự mình hoàn thành mà không cần làm chung với ai cả thì cũng phải cần kỹ năng teamwork.</p><p>Nhưng nếu đã nói là không có người khác, thì ta sẽ teamwork với ai?</p><h3><img src=\"https://hoang.moe/wp-content/uploads/2022/10/1.png\"></h3><h3>1. Ta teamwork với ai?</h3><p>Một đội nên có 3 người là tốt nhất.</p><p>Để ý quan sát, ta dễ bắt gặp bộ ba xuất hiện ở nhiều nơi trong cuộc sống:</p><ul><li>Vật chất được tạo thành từ nguyên tử với thành phần: Proton, Electron, Neutron</li><li>Thời gian: Quá khứ, Hiện tại, Tương lai</li><li>Phim ảnh: Bao Thanh Thiên, Công Tôn Sách, Triển Chiêu</li><li>Truyện: Harry Potter, Ron, and Hermione</li></ul><p>Vì thế, mình xin tạm tách bản thân ra thành bộ 3 “cái ta” khác nhau, dựa trên sự quan sát và trải nghiệm về những phiên bản thường xuất hiện trong công việc. Đó là:</p><ul><li>Cái ta thích làm – phiên bản làm cái đã, tính sau.</li><li>Cái ta muốn quan sát – phiên bản thích quan sát rồi ngầm đánh giá.</li><li>Cái ta thường suy nghĩ – phiên bản thông thái, nhưng thường lười biếng.</li></ul><p>Bây giờ để có thể phối hợp tốt hơn, hãy cùng tìm hiểu đặc điểm của 3 cái ta này.</p><h3><img src=\"https://hoang.moe/wp-content/uploads/2022/10/2-50x28.png\"></h3><h3>2. Cái ta thích làm</h3><p>Với phương châm “Làm cái đã tính sau”.</p><p>“Cái ta thích làm” là một anh chàng đầy nhiệt huyết, đặc biệt là khi vừa được truyền cảm hứng để làm một việc gì đấy. Anh ta sẽ thường muốn bắt tay vào làm ngay mà không cần hỏi ý kiến của 2 người còn lại.</p><p>Điểm mạnh của anh chàng này đó là ít bị sự trì hoãn chi phối. Nhưng cũng vì vội vàng, chăm chăm lao đầu về đích, anh ta thường dễ mắc những sai lầm đáng tiếc. Rồi mỗi lần như vậy, anh thường phải nghe:</p><p>“Tại sao mày lại làm điều đó chứ? Mày không biết chậm lại suy nghĩ hả?”</p><p>Nếu thường xuyên bị đổ lỗi anh ta sẽ trở nên rụt rè, và bắt đầu trở nên sợ hãi cả nhóm. Rồi đến lúc cần người làm, gọi mãi nhưng anh không dám bước ra.</p><p>Nếu không biết nhận lỗi, chẳng có thứ gì phá hoại nhanh hơn anh ta.</p>','[\"html\",\"css\",\"react\"]','[\"2014-07-16T11:23:37.041Z\", \"2015-08-16T11:23:37.041Z\"]','5 members includes 1 leader, 2 dev, 2 QC','[]',5,4,'2022-12-01 11:32:24','2022-12-01 11:43:52');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `rate` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'HTML','<p>HTML is the standard markup language for creating Web pages.</p><ul><li>HTML stands for Hyper Text Markup Language</li><li>HTML is the standard markup language for creating Web pages</li><li>HTML describes the structure of a Web page</li><li>HTML consists of a series of elements</li><li>HTML elements tell the browser how to display the content</li><li>HTML elements label pieces of content such as \"this is a heading\", \"this is a paragraph\", \"this is a link\", etc.</li></ul>',90,'2022-11-24 09:44:14','2022-12-02 04:55:14'),(2,'CSS','<p>CSS is the language we use to style a Web page.</p><ul><li>CSS stands for Cascading Style Sheets</li><li>CSS describes how HTML elements are to be displayed on screen, paper, or in other media</li><li>CSS saves a lot of work. It can control the layout of multiple web pages all at once</li><li>External stylesheets are stored in CSS files</li></ul>',95,'2022-11-24 09:44:57','2022-12-02 04:55:43'),(3,'Javascript','<p>JavaScript is the world\'s most popular programming language.</p><p>JavaScript is the programming language of the Web.</p>',90,'2022-11-24 09:45:12','2022-12-02 04:57:06'),(4,'ReactJS','<ul><li>React, sometimes referred to as a frontend JavaScript framework, is a JavaScript library created by Facebook.</li><li>React is a tool for building UI components.</li><li>React creates a VIRTUAL DOM in memory.</li><li>React only changes what needs to be changed!</li></ul>',95,'2022-11-24 09:45:30','2022-12-02 04:53:06'),(5,'Typescript','<p>TypeScript being a \"Syntactic Superset\" means that it shares the same base syntax as JavaScript, but adds something to it.</p><p><br></p><p>TypeScript uses compile time type checking. Which means it checks if the specified types match&nbsp;<strong>before</strong>&nbsp;running the code, not&nbsp;<strong>while</strong>&nbsp;running the code.</p>',80,'2022-11-24 09:45:54','2022-12-02 04:51:34'),(6,'NodeJS','<ul><li>Node.js is an open source server environment</li><li>Node.js is free</li><li>Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)</li><li>Node.js uses JavaScript on the server</li></ul><p><br></p><p><strong>Node.js uses asynchronous programming!</strong></p>',85,'2022-11-24 09:46:10','2022-12-02 04:54:04');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `categoryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (4,'Working','<p>The projects have been finished in working.</p>',3,'2022-11-24 08:19:36','2022-12-02 04:06:08'),(5,'Learning','<p>The projects have been finished in the improve skills of yourself.</p>',3,'2022-11-24 08:19:53','2022-12-02 04:07:43'),(6,'Timelife','<p>The events have happened in your life.</p>',3,'2022-11-24 08:40:51','2022-12-02 04:06:03'),(7,'PDF','<p>The PDF files.</p>',12,'2022-11-24 08:41:33','2022-12-02 04:08:23'),(8,'IMG','<p>The images such as .png, .jpg, .jpeg.</p>',12,'2022-11-24 08:41:46','2022-12-02 04:10:33'),(9,'MP3','<p>The audio files.</p>',12,'2022-11-24 08:41:50','2022-12-02 04:08:40'),(10,'Lifestyle','<p>The articles talk about your lifestyle.</p>',10,'2022-11-24 08:42:07','2022-12-02 04:12:25'),(11,'Development','<p>The articles talk about development. </p>',10,'2022-11-24 08:42:19','2022-12-02 04:12:17'),(12,'User: Waiting','<p>This status appears when the account is waiting for the approval of the admin.</p><p><br></p><p>P/S: The account can access to sign in, signup, reset the password, and update the profile.</p>',13,'2022-11-24 08:42:33','2022-12-02 04:18:17'),(13,'User: Approve','<p>This status appears when the account is approved by the admin and became a new admin.</p><p><br></p><p>P/S: The account can access to update all data.</p>',13,'2022-11-24 08:42:42','2022-12-02 04:18:46'),(14,'User: Ignore','<p>This status appears when the admin rejected this account.</p>',13,'2022-11-24 08:42:50','2022-12-02 04:15:36'),(16,'Request: None','<p>No request for reset password.</p>',14,'2022-11-29 10:25:34','2022-12-02 04:20:42'),(17,'Request: Waiting','<p>The request is waiting for approval and set a new password.</p>',14,'2022-11-29 10:26:14','2022-12-02 04:20:15'),(18,'Request: Approved','<p>The request was approved and set a new password.</p>',14,'2022-11-29 10:26:14','2022-12-02 04:21:34');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` int NOT NULL,
  `resetPasswordStatus` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (8,'hanhngan01011223@gmail.com','$2a$10$uRt7qtBmWXjHEo3HoeTb..GW9UyoIwCtfTKLpnudC.5Brwt5TXSM2',34,'2022-11-29 11:23:19','2022-12-01 04:14:43',13,17),(9,'hanhngan0102@gmail.com','$2a$10$14EL127T6AYEAm5Y9/icauwwUJ5iZP9MuA6a/p41lyR9k6X1R0/yW',28,'2022-11-30 06:59:18','2022-11-30 10:53:43',14,18),(10,'hanh@gmail.com','$2a$10$ibo/xNV9aLGdJi9riDc.3ec5fv8tiOp4.HLh73EU/ppJJTB59atRC',28,'2022-11-30 10:33:17','2022-12-01 10:43:46',13,17),(11,'hanh1ngan@yopmail.com','$2a$10$56FKy6Y9cqGn5pRDjXROYulPjOad2Z8zbDHg4pNqdFW9kBVA7Pqn.',28,'2022-11-30 10:41:56','2022-12-01 03:44:04',12,18),(12,'hanh@yopmail.com','$2a$10$p.OxGMJU3HAJKKh8UC6co.QXoMOtIF6q/kYcZflFv.DvxcSt50sO6',NULL,'2022-11-30 10:43:13','2022-11-30 10:43:13',12,17),(14,'hanh1@yopmail.com','$2a$10$TRiXFSRoOProXkIWy8qxUOEwSdkHFg3oqT7sV0M8/R1XF2PxSF9BG',NULL,'2022-11-30 11:07:49','2022-11-30 11:09:00',12,17);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-02 12:20:08
