# Virtual Global Citizen 🌍

**Trải nghiệm hành trình làm công dân toàn cầu thông qua các hoạt động thiện nguyện và mô phỏng tương tác.**

## 📋 Mô tả dự án

Virtual Global Citizen là một nền tảng web tương tác giáo dục, giúp người dùng trải nghiệm và học hỏi về trách nhiệm công dân toàn cầu thông qua:

- **Chương trình thiện nguyện**: Các hoạt động thực tế về môi trường, giáo dục, y tế, nhân đạo
- **Webgame tương tác**: Mô phỏng các tình huống xuyên quốc gia như di cư, cứu trợ nhân đạo, khủng hoảng môi trường
- **Hệ thống AI gợi ý**: Phân tích sở thích và đặc điểm cá nhân để đề xuất chương trình phù hợp
- **Bảng xếp hạng**: Tuyên dương và khuyến khích cộng đồng tham gia
- **Hồ sơ cá nhân**: Theo dõi thành tích, chứng chỉ và hoạt động

## ✨ Tính năng chính

### 🏠 Trang chủ
- Hero section với call-to-action
- Thống kê tổng quan về cộng đồng
- Giới thiệu tính năng nổi bật
- Testimonials từ thành viên

### 📋 Chương trình thiện nguyện
- Danh sách các chương trình với bộ lọc
- Tìm kiếm theo từ khóa, địa điểm, loại hình
- Thông tin chi tiết về mỗi chương trình
- Đánh giá độ khó và tác động

### 🎮 Webgame tương tác
- 3 tình huống mô phỏng thực tế:
  - Khủng hoảng di cư
  - Khủng hoảng môi trường  
  - Cứu trợ nhân đạo
- Hệ thống điểm đánh giá quyết định
- Phân tích tác động đa chiều (nhân đạo, kinh tế, xã hội, ngoại giao)

### 📝 Đăng ký tham gia
- Form đăng ký 3 bước tương tác
- Thu thập thông tin cá nhân và sở thích
- AI gợi ý chương trình phù hợp
- Tỷ lệ phù hợp cho từng đề xuất

### 👤 Hồ sơ cá nhân
- Thông tin cá nhân và thống kê
- Chứng chỉ và thành tích
- Lịch sử hoạt động
- Hệ thống level và điểm

### 🏆 Bảng xếp hạng
- Top 3 thành viên xuất sắc
- Bảng xếp hạng đầy đủ
- Bộ lọc theo thời gian và lĩnh vực
- Thống kê cộng đồng

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18** - Framework chính
- **Vite** - Build tool và dev server
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Router** - Client-side routing

### UI/UX
- **Responsive Design** - Tương thích mọi thiết bị
- **Modern UI** - Giao diện hiện đại với gradient và glass effect
- **Smooth Animations** - Chuyển động mượt mà
- **Accessibility** - Hỗ trợ người dùng khuyết tật

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+ 
- npm hoặc yarn

### Bước 1: Clone repository
```bash
git clone <repository-url>
cd virtual-global-citizen
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Bước 4: Build cho production
```bash
npm run build
```

## 📁 Cấu trúc dự án

```
virtual-global-citizen/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Programs.jsx
│   │   ├── Register.jsx
│   │   ├── Game.jsx
│   │   ├── Profile.jsx
│   │   └── Leaderboard.jsx
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Tính năng AI gợi ý

Hệ thống AI phân tích thông tin người dùng để gợi ý chương trình phù hợp:

### Thu thập dữ liệu
- Sở thích và lĩnh vực quan tâm
- Kinh nghiệm tình nguyện
- Thời gian có thể tham gia
- Động lực tham gia

### Thuật toán gợi ý
- Matching score dựa trên sở thích
- Đánh giá độ phù hợp về thời gian
- Phân tích kinh nghiệm và kỹ năng
- Cân nhắc động lực và mục tiêu

### Kết quả
- Danh sách chương trình được sắp xếp theo độ phù hợp
- Tỷ lệ phù hợp cho từng chương trình
- Giải thích lý do gợi ý

## 🎮 Webgame tương tác

### Tình huống 1: Khủng hoảng di cư
- **Mô tả**: Quyết định về việc tiếp nhận người tị nạn
- **Lựa chọn**: Mở cửa hoàn toàn / Tiếp nhận có điều kiện / Từ chối
- **Học hỏi**: Cân bằng giữa nhân đạo và khả năng đáp ứng

### Tình huống 2: Khủng hoảng môi trường
- **Mô tả**: Ứng phó với thảm họa môi trường
- **Lựa chọn**: Khắc phục ngay / Hợp tác quốc tế / Bỏ qua
- **Học hỏi**: Tầm quan trọng của hợp tác toàn cầu

### Tình huống 3: Cứu trợ nhân đạo
- **Mô tả**: Viện trợ cho quốc gia gặp nạn đói
- **Lựa chọn**: Viện trợ khẩn cấp / Hỗ trợ bền vững / 