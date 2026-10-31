# Đăng ký thăm thân (PWA) – triển khai trên Vercel

Ứng dụng là trang tĩnh, không cần build.

## Cấu trúc
```
index.html            Ứng dụng
manifest.webmanifest  Khai báo PWA (tên, biểu tượng, lối tắt)
sw.js                 Service worker (chạy ngoại tuyến, cập nhật)
logo.png, icons/      Logo và biểu tượng
vercel.json           Header bảo mật, cache cho Vercel
```

## Cách 1 – Dùng giao diện web (không cần dòng lệnh)
1. Tạo kho GitHub mới, tải toàn bộ các file ở trên lên thư mục gốc của kho.
2. Vào https://vercel.com/new → **Import** kho vừa tạo.
3. **Framework Preset**: Other. Để trống Build Command và Output Directory (đã cấu hình trong `vercel.json`).
4. Bấm **Deploy**. Xong sẽ có địa chỉ dạng `https://ten-du-an.vercel.app`.

## Cách 2 – Dùng dòng lệnh
```bash
npm i -g vercel
cd thu-muc-chua-file
vercel login
vercel          # bản xem thử
vercel --prod   # bản chính thức
```

## Sau khi triển khai
- Mở địa chỉ `.vercel.app` (hoặc tên miền riêng) trên điện thoại:
  - **Android (Chrome)**: bấm nút "Cài app" ở góc trên.
  - **iPhone (Safari)**: Chia sẻ → Thêm vào MH chính.
- Mỗi địa chỉ (bản xem thử, bản chính thức, tên miền riêng) là một "kho dữ liệu" riêng của trình duyệt.
  Hãy chọn **một địa chỉ cố định** (nên gắn tên miền riêng trong Vercel → Settings → Domains) và chỉ cài ứng dụng từ địa chỉ đó.
- Đổi PIN mặc định (Đại đội trưởng `1234`, truy cập chung `0000`) ngay trong **Cài đặt** trước khi phát cho đơn vị.
- Khi cập nhật `index.html`: sửa `VERSION` trong `sw.js` (ví dụ `tham-than-v4`) rồi triển khai lại; người dùng sẽ thấy nút "Cập nhật".
