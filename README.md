# Đăng ký thăm thân (PWA) – triển khai trên Vercel

Ứng dụng là trang tĩnh, không cần build.

## Cấu trúc
```
index.html            Ứng dụng
manifest.webmanifest  Khai báo PWA (tên, biểu tượng, lối tắt)
sw.js                 Service worker (chạy ngoại tuyến, cập nhật)
logo.png, icons/      Logo, biểu tượng và nền bản đồ (topo-*.png)
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
- Khi cập nhật `index.html`: sửa `VERSION` trong `sw.js` (ví dụ `tham-than-v5`; bản hiện tại là `tham-than-v4`) rồi triển khai lại; người dùng sẽ thấy nút "Cập nhật".

## Quy định thăm thân trong ứng dụng
- Mỗi ngày thăm chỉ có **một ca duy nhất 09:00–15:00** (không chia ca sáng / chiều). Đại đội trưởng chỉnh giờ và số lượt tối đa mỗi ngày tại **Cài đặt → Ca thăm duy nhất**.
- Thăm thân xong sớm thì hạ sĩ quan / binh sĩ **trực tiếp báo cáo cán bộ Đại đội** (hiển thị ở Lịch, Đăng ký, hộp thoại ngày, màn hình gửi đăng ký xong và bản in danh sách).
- Dữ liệu và bản sao lưu cũ (2 ca) được **tự chuyển sang 1 ca** khi mở bản mới: đăng ký cũ được giữ nguyên, sức chứa mỗi ngày bằng tổng hai ca cũ.

## Tìm kiếm và lọc danh sách hạ sĩ quan / binh sĩ
Áp dụng ở: Đăng ký, Tra cứu, Quyết định thủ công (ô chọn chiến sĩ), Quân số, Đánh giá tuần, Duyệt đăng ký.
- Gõ **không dấu** vẫn tìm được ("nguyen van an" → Nguyễn Văn An); nhiều từ khóa cách nhau bằng dấu cách. Tìm theo tên, lớp, tiểu đội, SĐT (Duyệt đăng ký: thêm người thăm, mã đăng ký).
- Lọc theo lớp, tiểu đội; Quân số có thêm cấp bậc, tình trạng thăm, cách sắp xếp; Đánh giá tuần có thêm trạng thái đánh giá.
- Ô tìm kiếm hiển thị số kết quả và nút **Xóa tìm kiếm / lọc**. Trong ô chọn chiến sĩ, nhấn Enter để chọn kết quả đầu tiên.
- Nút "Duyệt tất cả hợp lệ" và "Chưa đánh giá → Đạt" chỉ áp dụng cho danh sách **đang hiển thị**.

## Giao diện
Phông chữ Barlow Condensed và Bricolage Grotesque tải từ Google Fonts (đã được cho phép trong `vercel.json`); khi ngoại tuyến lần đầu, ứng dụng dùng phông dự phòng của máy.
