'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Chính Sách Quyền Riêng Tư & Mở Dữ Liệu</h1>
        <p className="mb-4 leading-relaxed">
          Dịch vụ <strong>API Proxy Service</strong> được thiết kế theo định hướng <span className="font-semibold">Open Access</span> – mở toang cho mọi đối tượng
          (con người, trình duyệt, bot tìm kiếm, hệ thống AI, crawler) truy cập và khai thác dữ liệu được cung cấp thông qua các endpoint.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Phạm vi dữ liệu</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Không thu thập dữ liệu cá nhân (PII) của người dùng cuối.</li>
          <li>Không theo dõi hành vi (tracking) ngoài phạm vi log kỹ thuật cơ bản.</li>
          <li>Chỉ phản hồi lại dữ liệu nhận được từ các nguồn công khai hoặc bên thứ ba mà người dùng yêu cầu.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Logging & Minh bạch</h2>
        <p className="mb-4">Hệ thống ghi log kỹ thuật để phục vụ:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Chẩn đoán lỗi (error diagnostics).</li>
          <li>Chống lạm dụng tài nguyên.</li>
          <li>Thống kê mức độ sử dụng (không định danh cá nhân).</li>
        </ul>
        <p className="mt-4 mb-4">Các log có thể bao gồm: thời gian, phương thức HTTP, URL yêu cầu, user-agent, IP (ở dạng thô để phân tích bảo mật). Không sử dụng để xây dựng hồ sơ người dùng.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Truy cập & Crawling</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Được phép crawl toàn bộ site (<code className="text-gray-800">robots.txt</code> cho phép <code className="text-gray-800">User-agent: *</code>).</li>
          <li>Không cần xin phép trước khi sử dụng dữ liệu phản hồi.</li>
          <li>Khuyến khích cache hợp lý để giảm tải hệ thống.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Giới hạn trách nhiệm</h2>
        <p className="mb-4">Dữ liệu trả về từ nguồn thứ ba (ví dụ: MEXC, Cafef) có thể thay đổi, gián đoạn hoặc sai lệch. Bạn chịu trách nhiệm kiểm chứng trước khi dùng cho mục đích quan trọng.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Bảo mật</h2>
        <p className="mb-4">Không lưu trữ token bí mật người dùng. Vui lòng không gửi thông tin nhạy cảm qua các endpoint dạng URL query.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Sử dụng bởi AI & Bot</h2>
        <p className="mb-4">AI / Bot / Crawler được phép:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Thu thập dữ liệu từ mọi endpoint công khai.</li>
          <li>Tái sử dụng dữ liệu cho mô hình huấn luyện hoặc phân tích.</li>
          <li>Miễn là không gây tấn công từ chối dịch vụ (DoS) hay vượt quá tải hợp lý.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Yêu cầu gỡ bỏ / Chỉnh sửa</h2>
        <p className="mb-4">Nếu bạn phát hiện nội dung vi phạm bản quyền hoặc không nên được công khai, hãy gửi yêu cầu để xem xét gỡ bỏ.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Cập nhật chính sách</h2>
        <p className="mb-6">Chính sách có thể được điều chỉnh theo nhu cầu vận hành. Phiên bản mới nhất luôn hiển thị tại trang này.</p>

        <div className="text-sm text-gray-600">Phiên bản: {new Date().toISOString().split('T')[0]}</div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">← Quay về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}
