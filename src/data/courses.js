export const courses = [
  {
    id: "volunteer_program",
    title: "Chương trình thiện nguyện toàn diện",
    description: "Khóa học thiện nguyện chuyên sâu với 10 bài học chi tiết, bao gồm lý thuyết và thực hành các hoạt động thiện nguyện đa dạng. Hoàn thành khóa học sẽ được tính giờ thiện nguyện vào hồ sơ.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    duration: "2 tuần",
    level: "Trung cấp",
    category: "charity",
    rating: 4.9,
    enrolledCount: 450,
    volunteerHours: 20, // Số giờ thiện nguyện được tính
    lessons: [
      {
        id: "vol_lesson1",
        title: "🌟 Tổng quan về thiện nguyện và tác động xã hội",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" 
                 alt="Thiện nguyện" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>🌟 Tổng quan về thiện nguyện và tác động xã hội</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Thiện nguyện không chỉ là hành động cho đi mà còn là cách để xây dựng cộng đồng mạnh mẽ hơn.</p>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🎯 Định nghĩa và ý nghĩa của thiện nguyện</h4>
            <ul style="color: white; margin: 0;">
              <li>🤝 Thiện nguyện là hoạt động tự nguyện, không vì lợi ích cá nhân</li>
              <li>🌍 Mang lại lợi ích cho cộng đồng và xã hội</li>
              <li>📈 Phát triển kỹ năng cá nhân và mở rộng mạng lưới xã hội</li>
              <li>😊 Tạo cảm giác hạnh phúc và ý nghĩa trong cuộc sống</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🌍 Tác động của thiện nguyện đối với xã hội</h4>
            <ul style="color: white; margin: 0;">
              <li>⚖️ Giảm bất bình đẳng xã hội</li>
              <li>🤗 Tăng cường sự gắn kết cộng đồng</li>
              <li>💝 Phát triển văn hóa chia sẻ và tương thân tương ái</li>
              <li>🌱 Thúc đẩy phát triển bền vững</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🎨 Các lĩnh vực thiện nguyện chính</h4>
            <ul style="color: white; margin: 0;">
              <li>📚 Giáo dục: Dạy học, hỗ trợ học tập</li>
              <li>🏥 Y tế: Khám bệnh, tư vấn sức khỏe</li>
              <li>🌿 Môi trường: Bảo vệ môi trường, trồng cây</li>
              <li>👥 Xã hội: Hỗ trợ người già, trẻ em, người khuyết tật</li>
              <li>🏛️ Văn hóa: Bảo tồn di sản, phát triển văn hóa</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">💪 Lợi ích cá nhân từ hoạt động thiện nguyện</h4>
            <ul style="color: white; margin: 0;">
              <li>👑 Phát triển kỹ năng lãnh đạo và làm việc nhóm</li>
              <li>🎤 Tăng cường sự tự tin và khả năng giao tiếp</li>
              <li>🌏 Mở rộng kiến thức và trải nghiệm thực tế</li>
              <li>🧘 Cải thiện sức khỏe tinh thần và giảm stress</li>
            </ul>
          </div>
        `,
        duration: "25 phút",
        type: "text"
      },
      {
        id: "vol_lesson2",
        title: "🗣️ Kỹ năng giao tiếp và làm việc nhóm trong thiện nguyện",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" 
                 alt="Giao tiếp nhóm" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>🗣️ Kỹ năng giao tiếp và làm việc nhóm trong thiện nguyện</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Kỹ năng giao tiếp hiệu quả là chìa khóa thành công trong mọi hoạt động thiện nguyện.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🎧 Kỹ năng giao tiếp cơ bản</h4>
            <ul style="color: white; margin: 0;">
              <li>👂 Lắng nghe tích cực và đồng cảm</li>
              <li>👁️ Giao tiếp phi ngôn ngữ (ánh mắt, cử chỉ, tư thế)</li>
              <li>💬 Sử dụng ngôn ngữ phù hợp với đối tượng</li>
              <li>😌 Kiểm soát cảm xúc trong giao tiếp</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">👥 Giao tiếp với các nhóm đối tượng đặc biệt</h4>
            <ul style="color: white; margin: 0;">
              <li>👶 Trẻ em: Sử dụng ngôn ngữ đơn giản, kiên nhẫn</li>
              <li>👴 Người già: Nói chậm rõ ràng, tôn trọng</li>
              <li>♿ Người khuyết tật: Tế nhị, hỗ trợ phù hợp</li>
              <li>🌏 Người dân tộc thiểu số: Tôn trọng văn hóa, sử dụng phiên dịch nếu cần</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🤝 Làm việc nhóm hiệu quả</h4>
            <ul style="color: white; margin: 0;">
              <li>📋 Phân chia công việc rõ ràng</li>
              <li>🤗 Hỗ trợ lẫn nhau và chia sẻ kinh nghiệm</li>
              <li>⚖️ Giải quyết xung đột một cách xây dựng</li>
              <li>📊 Đánh giá và cải thiện quy trình làm việc</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🎭 Thực hành kỹ năng giao tiếp</h4>
            <p style="color: white; margin: 0;">Thực hiện các bài tập role-play để rèn luyện kỹ năng giao tiếp trong các tình huống thiện nguyện khác nhau.</p>
          </div>
        `,
        duration: "30 phút",
        type: "text"
      },
      {
        id: "vol_lesson3",
        title: "📋 Lập kế hoạch và tổ chức hoạt động thiện nguyện",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" 
                 alt="Lập kế hoạch" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>📋 Lập kế hoạch và tổ chức hoạt động thiện nguyện</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Một hoạt động thiện nguyện thành công cần có kế hoạch chi tiết và tổ chức chuyên nghiệp.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🎯 Xác định nhu cầu và mục tiêu</h4>
            <ul style="color: white; margin: 0;">
              <li>🔍 Khảo sát nhu cầu thực tế của cộng đồng</li>
              <li>📊 Xác định mục tiêu cụ thể và đo lường được</li>
              <li>💰 Đánh giá nguồn lực sẵn có</li>
              <li>👥 Xác định đối tượng hưởng lợi chính</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">📅 Lập kế hoạch chi tiết</h4>
            <ul style="color: white; margin: 0;">
              <li>⏰ Thời gian và địa điểm tổ chức</li>
              <li>👥 Nhân sự và phân công công việc</li>
              <li>💵 Ngân sách và nguồn lực cần thiết</li>
              <li>🛡️ Kế hoạch dự phòng và xử lý rủi ro</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🚀 Tổ chức thực hiện</h4>
            <ul style="color: white; margin: 0;">
              <li>📋 Phân công trách nhiệm rõ ràng</li>
              <li>📊 Thiết lập hệ thống báo cáo và giám sát</li>
              <li>🛡️ Đảm bảo an toàn cho tất cả người tham gia</li>
              <li>📝 Ghi chép và lưu trữ thông tin</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">📈 Đánh giá và báo cáo</h4>
            <ul style="color: white; margin: 0;">
              <li>💬 Thu thập phản hồi từ người tham gia</li>
              <li>📊 Đánh giá mức độ đạt được mục tiêu</li>
              <li>📚 Rút kinh nghiệm cho các hoạt động tiếp theo</li>
              <li>🌍 Chia sẻ kết quả với cộng đồng</li>
            </ul>
          </div>
        `,
        duration: "35 phút",
        type: "text"
      },
      {
        id: "vol_lesson4",
        title: "📚 Thiện nguyện trong lĩnh vực giáo dục",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" 
                 alt="Giáo dục" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>📚 Thiện nguyện trong lĩnh vực giáo dục</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Giáo dục là chìa khóa để phát triển cộng đồng bền vững và giảm bất bình đẳng xã hội.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🏫 Thực trạng giáo dục tại Việt Nam</h4>
            <ul style="color: white; margin: 0;">
              <li>🌆 Khoảng cách giáo dục giữa thành thị và nông thôn</li>
              <li>🏘️ Thiếu giáo viên và cơ sở vật chất tại vùng sâu vùng xa</li>
              <li>👶 Trẻ em có hoàn cảnh khó khăn khó tiếp cận giáo dục chất lượng</li>
              <li>📖 Nhu cầu hỗ trợ học tập cho học sinh yếu kém</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🎓 Các hình thức thiện nguyện giáo dục</h4>
            <ul style="color: white; margin: 0;">
              <li>👨‍🏫 Dạy học trực tiếp tại trường học</li>
              <li>💻 Dạy học online cho học sinh vùng xa</li>
              <li>📚 Hỗ trợ học tập cho học sinh yếu kém</li>
              <li>🎨 Tổ chức các hoạt động ngoại khóa</li>
              <li>🏛️ Hỗ trợ xây dựng thư viện và cơ sở vật chất</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">💡 Kỹ năng cần thiết cho tình nguyện viên giáo dục</h4>
            <ul style="color: white; margin: 0;">
              <li>📖 Kiến thức chuyên môn về môn học</li>
              <li>🎯 Kỹ năng sư phạm và truyền đạt</li>
              <li>❤️ Kiên nhẫn và tình yêu thương với trẻ em</li>
              <li>🔄 Khả năng thích ứng với môi trường giáo dục</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">📝 Thực hành: Soạn giáo án và phương pháp giảng dạy</h4>
            <p style="color: white; margin: 0;">Hướng dẫn cách soạn giáo án phù hợp với từng độ tuổi và trình độ học sinh.</p>
          </div>
        `,
        duration: "40 phút",
        type: "text"
      },
      {
        id: "vol_lesson5",
        title: "🏥 Thiện nguyện trong lĩnh vực y tế",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80" 
                 alt="Y tế" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>🏥 Thiện nguyện trong lĩnh vực y tế</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Thiện nguyện y tế đóng vai trò quan trọng trong việc chăm sóc sức khỏe cộng đồng.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🏥 Nhu cầu thiện nguyện y tế</h4>
            <ul style="color: white; margin: 0;">
              <li>💰 Người nghèo khó tiếp cận dịch vụ y tế chất lượng</li>
              <li>🏘️ Thiếu nhân lực y tế tại vùng sâu vùng xa</li>
              <li>💊 Nhu cầu tư vấn sức khỏe và phòng bệnh</li>
              <li>👴 Hỗ trợ chăm sóc người già và người khuyết tật</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🩺 Các hoạt động thiện nguyện y tế</h4>
            <ul style="color: white; margin: 0;">
              <li>👨‍⚕️ Khám bệnh miễn phí cho người nghèo</li>
              <li>💬 Tư vấn sức khỏe và dinh dưỡng</li>
              <li>🤗 Hỗ trợ chăm sóc bệnh nhân</li>
              <li>📢 Truyền thông giáo dục sức khỏe</li>
              <li>📦 Hỗ trợ hậu cần và quản lý bệnh viện</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">👥 Vai trò của tình nguyện viên không chuyên môn y tế</h4>
            <ul style="color: white; margin: 0;">
              <li>📝 Hỗ trợ ghi hồ sơ và quản lý bệnh nhân</li>
              <li>🤝 Hướng dẫn và hỗ trợ bệnh nhân</li>
              <li>🌏 Phiên dịch cho bệnh nhân dân tộc thiểu số</li>
              <li>🚗 Hỗ trợ hậu cần và vận chuyển</li>
              <li>💝 Chăm sóc tinh thần cho bệnh nhân</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🛡️ An toàn và đạo đức trong thiện nguyện y tế</h4>
            <ul style="color: white; margin: 0;">
              <li>⚠️ Tuân thủ quy định về an toàn y tế</li>
              <li>🔒 Bảo mật thông tin bệnh nhân</li>
              <li>🚫 Không can thiệp vào chuyên môn y tế</li>
              <li>👨‍⚕️ Tôn trọng quyết định của bác sĩ</li>
            </ul>
          </div>
        `,
        duration: "35 phút",
        type: "text"
      },
      {
        id: "vol_lesson6",
        title: "🌿 Thiện nguyện bảo vệ môi trường",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80" 
                 alt="Bảo vệ môi trường" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>🌿 Thiện nguyện bảo vệ môi trường</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Bảo vệ môi trường là trách nhiệm của mỗi công dân và cần sự tham gia của toàn xã hội.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">⚠️ Các vấn đề môi trường hiện tại</h4>
            <ul style="color: white; margin: 0;">
              <li>🌫️ Ô nhiễm không khí và nước</li>
              <li>🥤 Rác thải nhựa và chất thải rắn</li>
              <li>🌲 Phá rừng và suy thoái đa dạng sinh học</li>
              <li>🌡️ Biến đổi khí hậu và nước biển dâng</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🌱 Các hoạt động thiện nguyện môi trường</h4>
            <ul style="color: white; margin: 0;">
              <li>🌳 Trồng cây xanh và phủ xanh đô thị</li>
              <li>🗑️ Thu gom rác thải và làm sạch môi trường</li>
              <li>📢 Truyền thông nâng cao nhận thức</li>
              <li>🦁 Bảo vệ động vật hoang dã</li>
              <li>☀️ Phát triển năng lượng tái tạo</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">📋 Tổ chức hoạt động bảo vệ môi trường</h4>
            <ul style="color: white; margin: 0;">
              <li>📝 Lập kế hoạch chi tiết và an toàn</li>
              <li>🛠️ Chuẩn bị dụng cụ và trang thiết bị</li>
              <li>👥 Phân công công việc rõ ràng</li>
              <li>📊 Ghi chép và báo cáo kết quả</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">📝 Thực hành: Lập kế hoạch hoạt động môi trường</h4>
            <p style="color: white; margin: 0;">Hướng dẫn cách lập kế hoạch một hoạt động bảo vệ môi trường cụ thể.</p>
          </div>
        `,
        duration: "30 phút",
        type: "text"
      },
      {
        id: "vol_lesson7",
        title: "👴👶 Thiện nguyện hỗ trợ người già và trẻ em",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                 alt="Hỗ trợ người già và trẻ em" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>👴👶 Thiện nguyện hỗ trợ người già và trẻ em</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Người già và trẻ em là những đối tượng cần được quan tâm và hỗ trợ đặc biệt trong xã hội.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">👴 Nhu cầu của người già</h4>
            <ul style="color: white; margin: 0;">
              <li>🏥 Chăm sóc sức khỏe và dinh dưỡng</li>
              <li>🏠 Hỗ trợ sinh hoạt hàng ngày</li>
              <li>💬 Giao tiếp và tâm sự</li>
              <li>🎮 Tham gia hoạt động giải trí</li>
              <li>📚 Học tập và phát triển kỹ năng mới</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">👶 Nhu cầu của trẻ em</h4>
            <ul style="color: white; margin: 0;">
              <li>📚 Chăm sóc và giáo dục</li>
              <li>🎯 Vui chơi và phát triển thể chất</li>
              <li>📖 Hỗ trợ học tập</li>
              <li>💝 Chăm sóc tâm lý và tình cảm</li>
              <li>🛡️ Bảo vệ và an toàn</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🤝 Các hoạt động hỗ trợ</h4>
            <ul style="color: white; margin: 0;">
              <li>🏠 Thăm hỏi và chăm sóc người già</li>
              <li>🎓 Dạy học và vui chơi với trẻ em</li>
              <li>🎉 Tổ chức hoạt động giải trí</li>
              <li>🛠️ Hỗ trợ sinh hoạt hàng ngày</li>
              <li>💭 Tư vấn và hỗ trợ tâm lý</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">💡 Kỹ năng cần thiết</h4>
            <ul style="color: white; margin: 0;">
              <li>❤️ Kiên nhẫn và tình yêu thương</li>
              <li>🗣️ Kỹ năng giao tiếp phù hợp</li>
              <li>🏥 Kiến thức về chăm sóc sức khỏe</li>
              <li>🎯 Khả năng tổ chức hoạt động</li>
            </ul>
          </div>
        `,
        duration: "35 phút",
        type: "text"
      },
      {
        id: "vol_lesson8",
        title: "🚨 Thiện nguyện trong tình huống khẩn cấp",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" 
                 alt="Tình huống khẩn cấp" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>🚨 Thiện nguyện trong tình huống khẩn cấp</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Thiện nguyện trong tình huống khẩn cấp đòi hỏi sự chuẩn bị kỹ lưỡng và kỹ năng chuyên môn.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">⚠️ Các loại tình huống khẩn cấp</h4>
            <ul style="color: white; margin: 0;">
              <li>🌊 Thiên tai: bão lũ, động đất, sóng thần</li>
              <li>🦠 Dịch bệnh: COVID-19, dịch cúm</li>
              <li>🏭 Sự cố công nghiệp và môi trường</li>
              <li>⚔️ Xung đột và chiến tranh</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🆘 Vai trò của tình nguyện viên</h4>
            <ul style="color: white; margin: 0;">
              <li>🚑 Hỗ trợ cứu hộ và tìm kiếm</li>
              <li>📦 Phân phát viện trợ và nhu yếu phẩm</li>
              <li>🚌 Hỗ trợ di dời và sơ tán</li>
              <li>🏥 Chăm sóc y tế khẩn cấp</li>
              <li>💭 Tư vấn tâm lý cho nạn nhân</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">📋 Chuẩn bị cho tình huống khẩn cấp</h4>
            <ul style="color: white; margin: 0;">
              <li>🎓 Tham gia các khóa đào tạo cứu hộ</li>
              <li>🛠️ Chuẩn bị dụng cụ và trang thiết bị</li>
              <li>📱 Thiết lập mạng lưới liên lạc</li>
              <li>📝 Lập kế hoạch ứng phó</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🛡️ An toàn trong tình huống khẩn cấp</h4>
            <ul style="color: white; margin: 0;">
              <li>📋 Tuân thủ hướng dẫn của cơ quan chức năng</li>
              <li>🚫 Không tự ý hành động nguy hiểm</li>
              <li>🛡️ Bảo vệ sức khỏe và an toàn cá nhân</li>
              <li>💪 Hỗ trợ theo khả năng và chuyên môn</li>
            </ul>
          </div>
        `,
        duration: "30 phút",
        type: "text"
      },
      {
        id: "vol_lesson9",
        title: "📊 Đánh giá và phát triển bền vững hoạt động thiện nguyện",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" 
                 alt="Đánh giá và phát triển" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>📊 Đánh giá và phát triển bền vững hoạt động thiện nguyện</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Đánh giá hiệu quả và phát triển bền vững là yếu tố quan trọng để nâng cao chất lượng thiện nguyện.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">📈 Đánh giá hiệu quả hoạt động</h4>
            <ul style="color: white; margin: 0;">
              <li>🎯 Đo lường mức độ đạt được mục tiêu</li>
              <li>💬 Thu thập phản hồi từ người hưởng lợi</li>
              <li>⏰ Đánh giá tác động dài hạn</li>
              <li>💰 Phân tích chi phí và lợi ích</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🌱 Phát triển bền vững</h4>
            <ul style="color: white; margin: 0;">
              <li>🤝 Xây dựng mạng lưới tình nguyện viên</li>
              <li>🎓 Đào tạo và nâng cao năng lực</li>
              <li>💎 Huy động nguồn lực đa dạng</li>
              <li>🤝 Thiết lập quan hệ đối tác</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">💻 Công nghệ trong thiện nguyện</h4>
            <ul style="color: white; margin: 0;">
              <li>📱 Sử dụng mạng xã hội để kết nối</li>
              <li>🖥️ Ứng dụng công nghệ trong quản lý</li>
              <li>💳 Gây quỹ trực tuyến</li>
              <li>📊 Giám sát và báo cáo số hóa</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🏘️ Xây dựng cộng đồng thiện nguyện</h4>
            <ul style="color: white; margin: 0;">
              <li>🤗 Tạo môi trường hỗ trợ lẫn nhau</li>
              <li>📚 Chia sẻ kinh nghiệm và bài học</li>
              <li>👥 Khuyến khích sự tham gia của thanh niên</li>
              <li>🏆 Vinh danh và ghi nhận đóng góp</li>
            </ul>
          </div>
        `,
        duration: "35 phút",
        type: "text"
      },
      {
        id: "vol_lesson10",
        title: "🎯 Thực hành tổng hợp và dự án thiện nguyện",
        content: `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" 
                 alt="Thực hành tổng hợp" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          </div>
          
          <h3>🎯 Thực hành tổng hợp và dự án thiện nguyện</h3>
          <p style="font-size: 18px; color: #4a5568; line-height: 1.6;">Áp dụng tất cả kiến thức đã học vào một dự án thiện nguyện thực tế.</p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🎯 Lựa chọn dự án thiện nguyện</h4>
            <ul style="color: white; margin: 0;">
              <li>🔍 Xác định nhu cầu cộng đồng</li>
              <li>💪 Đánh giá khả năng và nguồn lực</li>
              <li>📋 Lập kế hoạch chi tiết</li>
              <li>📊 Thiết lập mục tiêu đo lường được</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🚀 Thực hiện dự án</h4>
            <ul style="color: white; margin: 0;">
              <li>👥 Tổ chức nhóm làm việc</li>
              <li>📋 Phân công trách nhiệm</li>
              <li>👀 Giám sát tiến độ</li>
              <li>🛠️ Xử lý các vấn đề phát sinh</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">📊 Báo cáo và đánh giá</h4>
            <ul style="color: white; margin: 0;">
              <li>📊 Thu thập dữ liệu và chứng cứ</li>
              <li>📈 Phân tích kết quả</li>
              <li>📝 Viết báo cáo chi tiết</li>
              <li>🤝 Chia sẻ kinh nghiệm</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: white; margin: 0 0 15px 0;">🌟 Hoạt động thiện nguyện thực tế</h4>
            <p style="color: white; margin: 0;">Tham gia một hoạt động thiện nguyện thực tế và ghi chép lại toàn bộ quá trình thực hiện.</p>
            <p style="color: white; margin: 10px 0 0 0;"><strong>Yêu cầu:</strong> Hoàn thành ít nhất 5 giờ thiện nguyện thực tế và viết báo cáo chi tiết.</p>
          </div>
        `,
        duration: "45 phút",
        type: "text"
      },
      {
        id: "vol_quiz",
        title: "Kiểm tra kiến thức tổng hợp",
        type: "quiz",
        questions: [
          {
            id: "vol_q1",
            question: "Nêu 3 lợi ích chính của hoạt động thiện nguyện đối với xã hội.",
            type: "text",
            answer: "Giảm bất bình đẳng xã hội, tăng cường sự gắn kết cộng đồng, thúc đẩy phát triển bền vững"
          },
          {
            id: "vol_q2",
            question: "Khi giao tiếp với người già, bạn cần lưu ý điều gì?",
            type: "text",
            answer: "Nói chậm rõ ràng, tôn trọng, kiên nhẫn, hỗ trợ đi lại an toàn"
          },
          {
            id: "vol_q3",
            question: "Trong hoạt động thiện nguyện y tế, tình nguyện viên không chuyên môn có thể làm gì?",
            type: "multiple_choice",
            options: [
              "Khám bệnh và kê đơn thuốc",
              "Hỗ trợ ghi hồ sơ và hướng dẫn bệnh nhân",
              "Thực hiện phẫu thuật",
              "Chẩn đoán bệnh"
            ],
            correctAnswer: 1
          },
          {
            id: "vol_q4",
            question: "Nêu 3 hoạt động thiện nguyện bảo vệ môi trường mà bạn có thể tham gia.",
            type: "text",
            answer: "Trồng cây xanh, thu gom rác thải, truyền thông nâng cao nhận thức"
          },
          {
            id: "vol_q5",
            question: "Khi lập kế hoạch hoạt động thiện nguyện, bạn cần xác định những yếu tố nào?",
            type: "text",
            answer: "Nhu cầu cộng đồng, mục tiêu cụ thể, nguồn lực sẵn có, thời gian và địa điểm"
          }
        ],
        duration: "20 phút"
      }
    ]
  },
  {
    id: "course1",
    title: "Trồng cây xanh - Vì môi trường tương lai",
    description: "Khóa học về ý nghĩa, cách tham gia và thực hành trồng cây xanh bảo vệ môi trường.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    duration: "1 tuần",
    level: "Cơ bản",
    category: "environment",
    rating: 4.8,
    enrolledCount: 320,
    lessons: [
      {
        id: "lesson1_1",
        title: "🌱 Tầm quan trọng của cây xanh trong đô thị",
        content: `
          <h3>🌱 Tầm quan trọng của cây xanh trong đô thị</h3>
          <p>Cây xanh giúp điều hòa không khí, giảm ô nhiễm, cải thiện sức khỏe cộng đồng.</p>
          <p>Là một phần không thể thiếu trong chiến lược phát triển đô thị bền vững.</p>
          <ul>
            <li>🌿 Lọc không khí, giảm bụi và khí độc</li>
            <li>🌡️ Điều hòa nhiệt độ, tạo bóng mát</li>
            <li>🔇 Giảm tiếng ồn, tạo không gian thư giãn</li>
            <li>🎨 Tăng giá trị thẩm mỹ cho đô thị</li>
          </ul>
        `,
        duration: "15 phút",
        type: "text"
      },
      {
        id: "lesson1_2",
        title: "🛠️ Hướng dẫn tham gia hoạt động trồng cây",
        content: `
          <h3>🛠️ Hướng dẫn tham gia hoạt động trồng cây</h3>
          <p><strong>📍 Địa điểm:</strong> Công viên Hồ Tây.</p>
          <h4>📋 Các bước thực hiện:</h4>
          <ul>
            <li>⛏️ Đào hố, trồng cây</li>
            <li>💧 Tưới nước</li>
            <li>📝 Ghi chép nhật ký cây</li>
          </ul>
          <h4>🎒 Chuẩn bị dụng cụ:</h4>
          <ul>
            <li>🧤 Găng tay làm vườn</li>
            <li>⛏️ Xẻng, cuốc nhỏ</li>
            <li>💧 Bình tưới nước</li>
            <li>📔 Sổ ghi chép</li>
          </ul>
        `,
        duration: "20 phút",
        type: "text"
      },
      {
        id: "lesson1_3",
        title: "🌳 Thực hành chăm sóc cây xanh",
        content: `
          <h3>🌳 Thực hành chăm sóc cây xanh</h3>
          <p>Thực hiện chăm sóc cây trong 1 tuần sau khi trồng.</p>
          <p>Chia sẻ hình ảnh/quá trình chăm sóc trên nền tảng khóa học.</p>
          <h4>📋 Quy trình thực hiện:</h4>
          <ol>
            <li>🌱 Tham gia buổi trồng cây tại công viên</li>
            <li>💧 Chăm sóc cây trong 1 tuần</li>
            <li>📸 Chụp ảnh quá trình chăm sóc</li>
            <li>📝 Viết báo cáo ngắn về trải nghiệm</li>
          </ol>
        `,
        duration: "25 phút",
        type: "text"
      },
      {
        id: "quiz1",
        title: "❓ Kiểm tra kiến thức về trồng cây",
        type: "quiz",
        questions: [
          {
            id: "q1_1",
            question: "Kể 2 lợi ích chính của việc trồng cây xanh ở đô thị.",
            type: "text",
            answer: "Điều hòa không khí và giảm ô nhiễm"
          },
          {
            id: "q1_2",
            question: "Việc nào sau đây không đúng khi trồng cây?",
            type: "multiple_choice",
            options: [
              "Tưới nước sau khi trồng",
              "Trồng vào buổi trưa nắng gắt",
              "Bón phân gốc định kỳ"
            ],
            correctAnswer: 1
          }
        ],
        duration: "10 phút"
      }
    ]
  },
  {
    id: "course2",
    title: "Dạy học cho trẻ em vùng cao",
    description: "Khóa học về thực trạng giáo dục vùng cao, cách tham gia dạy học online và thực hành soạn giáo án.",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
    duration: "1 tuần",
    level: "Cơ bản",
    category: "education",
    rating: 4.7,
    enrolledCount: 210,
    lessons: [
      {
        id: "lesson2_1",
        title: "🏔️ Thực trạng giáo dục vùng cao Việt Nam",
        content: `
          <h3>🏔️ Thực trạng giáo dục vùng cao Việt Nam</h3>
          <p>Thiếu giáo viên, thiếu tài liệu học tập, khó tiếp cận công nghệ.</p>
          <p>Vai trò của tình nguyện viên trong việc thu hẹp khoảng cách giáo dục.</p>
          <h4>📊 Các thách thức chính:</h4>
          <ul>
            <li>👨‍🏫 Thiếu giáo viên có chuyên môn</li>
            <li>📚 Thiếu tài liệu học tập phù hợp</li>
            <li>🌐 Hạ tầng internet không ổn định</li>
            <li>🚶 Trẻ em phải đi học xa nhà</li>
          </ul>
        `,
        duration: "18 phút",
        type: "text"
      },
      {
        id: "lesson2_2",
        title: "💻 Hướng dẫn tham gia dạy học online",
        content: `
          <h3>💻 Hướng dẫn tham gia dạy học online</h3>
          <p>Dạy online qua Zoom/Google Meet.</p>
          <p>Soạn bài ngắn gọn (15-20 phút), phù hợp độ tuổi tiểu học.</p>
          <h4>🛠️ Yêu cầu kỹ thuật:</h4>
          <ul>
            <li>💻 Máy tính có webcam và microphone</li>
            <li>🌐 Kết nối internet ổn định</li>
            <li>🗣️ Kỹ năng giao tiếp với trẻ em</li>
            <li>📖 Kiến thức cơ bản về môn học</li>
          </ul>
        `,
        duration: "22 phút",
        type: "text"
      },
      {
        id: "lesson2_3",
        title: "📝 Thực hành soạn giáo án dạy học",
        content: `
          <h3>📝 Thực hành soạn giáo án dạy học</h3>
          <p>Soạn giáo án 1 buổi dạy mẫu (tiếng Việt, toán, kỹ năng sống).</p>
          <p>Chia sẻ với nhóm học tập để nhận phản hồi.</p>
          <h4>📋 Quy trình thực hiện:</h4>
          <ol>
            <li>📚 Chọn môn học (tiếng Việt, toán, kỹ năng sống)</li>
            <li>✍️ Soạn giáo án 15-20 phút</li>
            <li>📎 Chuẩn bị tài liệu hỗ trợ</li>
            <li>🤝 Chia sẻ và nhận feedback</li>
          </ol>
        `,
        duration: "30 phút",
        type: "text"
      },
      {
        id: "quiz2",
        title: "❓ Kiểm tra kiến thức về dạy học vùng cao",
        type: "quiz",
        questions: [
          {
            id: "q2_1",
            question: "Những thách thức nào trẻ em vùng cao đang gặp phải?",
            type: "text",
            answer: "Thiếu giáo viên, thiếu tài liệu học tập, khó tiếp cận công nghệ"
          },
          {
            id: "q2_2",
            question: "Bạn nên làm gì nếu trẻ không có đường truyền internet ổn định?",
            type: "text",
            answer: "Chuẩn bị bài giảng offline, gửi tài liệu trước, sử dụng hình ảnh đơn giản"
          }
        ],
        duration: "10 phút"
      }
    ]
  },
  {
    id: "course3",
    title: "Khám bệnh miễn phí cho người nghèo",
    description: "Khóa học về ý nghĩa, vai trò và thực hành hỗ trợ hoạt động y tế thiện nguyện cho cộng đồng.",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80",
    duration: "1 tuần",
    level: "Cơ bản",
    category: "healthcare",
    rating: 4.7,
    enrolledCount: 180,
    lessons: [
      {
        id: "lesson3_1",
        title: "🏥 Ý nghĩa của hoạt động y tế thiện nguyện",
        content: `
          <h3>🏥 Ý nghĩa của hoạt động y tế thiện nguyện</h3>
          <p>Người nghèo thường không có điều kiện tiếp cận dịch vụ y tế. Phát hiện bệnh sớm giúp giảm chi phí điều trị.</p>
          <h4>🎯 Mục tiêu chính:</h4>
          <ul>
            <li>💊 Cung cấp dịch vụ y tế miễn phí cho người nghèo</li>
            <li>🔍 Phát hiện bệnh sớm để điều trị kịp thời</li>
            <li>📚 Nâng cao nhận thức về sức khỏe cộng đồng</li>
            <li>🤝 Tạo sự gắn kết trong cộng đồng</li>
          </ul>
        `,
        duration: "20 phút",
        type: "text"
      },
      {
        id: "lesson3_2",
        title: "👥 Vai trò và trách nhiệm của tình nguyện viên y tế",
        content: `
          <h3>👥 Vai trò và trách nhiệm của tình nguyện viên y tế</h3>
          <h4>📋 Các vai trò chính:</h4>
          <ul>
            <li>📝 Hỗ trợ ghi hồ sơ, hướng dẫn người dân</li>
            <li>🗣️ Phiên dịch (nếu cần)</li>
            <li>💊 Hỗ trợ hậu cần: phát thuốc, trông trẻ</li>
            <li>🚶 Hỗ trợ di chuyển bệnh nhân</li>
            <li>📞 Liên lạc và điều phối</li>
          </ul>
        `,
        duration: "25 phút",
        type: "text"
      },
      {
        id: "lesson3_3",
        title: "🩺 Thực hành tham gia hoạt động y tế thiện nguyện",
        content: `
          <h3>🩺 Thực hành tham gia hoạt động y tế thiện nguyện</h3>
          <h4>📋 Quy trình thực hiện:</h4>
          <ol>
            <li>📋 Đăng ký hỗ trợ tại một sự kiện khám bệnh gần nơi ở</li>
            <li>📝 Báo cáo trải nghiệm thực tế (có biểu mẫu đi kèm)</li>
            <li>📸 Chụp ảnh hoạt động (nếu được phép)</li>
            <li>💭 Chia sẻ cảm nhận và bài học rút ra</li>
          </ol>
        `,
        duration: "35 phút",
        type: "text"
      },
      {
        id: "quiz3",
        title: "❓ Kiểm tra kiến thức về y tế thiện nguyện",
        type: "quiz",
        questions: [
          { id: "q3_1", question: "Nêu 2 vai trò bạn có thể đảm nhận nếu không phải là bác sĩ.", type: "text", answer: "Hỗ trợ ghi hồ sơ và hướng dẫn bệnh nhân" },
          { id: "q3_2", question: "Điều gì cần lưu ý khi hướng dẫn bệnh nhân cao tuổi?", type: "text", answer: "Nói chậm rõ ràng, kiên nhẫn, hỗ trợ đi lại an toàn" }
        ],
        duration: "10 phút"
      }
    ]
  },
  {
    id: "course4",
    title: "Thu gom rác thải nhựa tại bãi biển",
    description: "Khóa học về vấn nạn rác nhựa đại dương, hướng dẫn tổ chức và thực hành thu gom rác thải nhựa.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    duration: "1 tuần",
    level: "Cơ bản",
    category: "environment",
    rating: 4.6,
    enrolledCount: 150,
    lessons: [
      {
        id: "lesson4_1",
        title: "🌊 Vấn nạn rác nhựa đại dương toàn cầu",
        content: `
          <h3>🌊 Vấn nạn rác nhựa đại dương toàn cầu</h3>
          <p>Mỗi năm có hàng triệu tấn nhựa đổ ra biển. Rác nhựa gây hại cho hệ sinh thái biển, sức khỏe con người.</p>
          <h4>⚠️ Tác động nghiêm trọng:</h4>
          <ul>
            <li>🐠 Gây hại cho sinh vật biển</li>
            <li>⏰ Phân hủy chậm (hàng trăm năm)</li>
            <li>🔗 Tích tụ trong chuỗi thức ăn</li>
            <li>🏖️ Ảnh hưởng đến du lịch và kinh tế</li>
          </ul>
        `,
        duration: "20 phút",
        type: "text"
      },
      {
        id: "lesson4_2",
        title: "🛠️ Hướng dẫn tổ chức hoạt động thu gom rác",
        content: `
          <h3>🛠️ Hướng dẫn tổ chức hoạt động thu gom rác</h3>
          <h4>📋 Quy trình thực hiện:</h4>
          <ul>
            <li>🧤 Đeo găng tay, mang bao rác phân loại</li>
            <li>👥 Chia nhóm làm việc hiệu quả</li>
            <li>📊 Ghi nhận số lượng rác thu được</li>
            <li>♻️ Phân loại rác đúng cách</li>
            <li>📸 Chụp ảnh trước và sau</li>
          </ul>
        `,
        duration: "25 phút",
        type: "text"
      },
      {
        id: "lesson4_3",
        title: "🏖️ Thực hành thu gom rác tại bãi biển",
        content: `
          <h3>🏖️ Thực hành thu gom rác tại bãi biển</h3>
          <h4>📋 Quy trình thực hiện:</h4>
          <ol>
            <li>📍 Tham gia hoặc tự tổ chức một buổi thu gom tại bờ hồ/bãi biển địa phương</li>
            <li>📊 Chia sẻ kết quả lên diễn đàn học viên</li>
            <li>📝 Ghi chép loại rác thu được</li>
            <li>💭 Chia sẻ cảm nhận và đề xuất</li>
          </ol>
        `,
        duration: "40 phút",
        type: "text"
      },
      {
        id: "quiz4",
        title: "❓ Kiểm tra kiến thức về bảo vệ môi trường biển",
        type: "quiz",
        questions: [
          { id: "q4_1", question: "Kể 3 loại rác nhựa phổ biến nhất ở bãi biển.", type: "text", answer: "Chai nhựa, túi nilon, ống hút nhựa" },
          { id: "q4_2", question: "Tại sao không nên đốt rác nhựa tại chỗ?", type: "text", answer: "Tạo khí độc, gây ô nhiễm không khí, nguy hiểm cho sức khỏe" }
        ],
        duration: "10 phút"
      }
    ]
  },
  {
    id: "course5",
    title: "Quyên góp sách cho thư viện cộng đồng",
    description: "Khóa học về ý nghĩa, cách quyên góp và thực hành hỗ trợ thư viện cộng đồng.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
    duration: "1 tuần",
    level: "Cơ bản",
    category: "education",
    rating: 4.7,
    enrolledCount: 170,
    lessons: [
      {
        id: "lesson5_1",
        title: "📚 Ý nghĩa của sách đối với sự phát triển trẻ em",
        content: `
          <h3>📚 Ý nghĩa của sách đối với sự phát triển trẻ em</h3>
          <p>Trẻ có thể tự học, khám phá thế giới dù không có internet. Sách giúp phát triển kỹ năng đọc, tưởng tượng, tư duy logic.</p>
          <h4>🎯 Lợi ích của việc đọc sách:</h4>
          <ul>
            <li>🧠 Phát triển tư duy và trí tưởng tượng</li>
            <li>📖 Cải thiện kỹ năng đọc hiểu</li>
            <li>🌍 Mở rộng kiến thức về thế giới</li>
            <li>💭 Phát triển khả năng tư duy logic</li>
          </ul>
        `,
        duration: "18 phút",
        type: "text"
      },
      {
        id: "lesson5_2",
        title: "🎁 Hướng dẫn quyên góp sách hiệu quả",
        content: `
          <h3>🎁 Hướng dẫn quyên góp sách hiệu quả</h3>
          <h4>📋 Tiêu chí sách quyên góp:</h4>
          <ul>
            <li>✨ Sách nên còn mới, không rách, không thiếu trang</li>
            <li>📚 Phân loại sách: truyện tranh, sách học tập, sách kỹ năng...</li>
            <li>🎯 Phù hợp với độ tuổi và trình độ</li>
            <li>📖 Nội dung tích cực, giáo dục</li>
          </ul>
        `,
        duration: "22 phút",
        type: "text"
      },
      {
        id: "lesson5_3",
        title: "📖 Thực hành quyên góp và chia sẻ sách",
        content: `
          <h3>📖 Thực hành quyên góp và chia sẻ sách</h3>
          <h4>📋 Quy trình thực hiện:</h4>
          <ol>
            <li>📚 Quyên góp ít nhất 3 cuốn sách</li>
            <li>✍️ Viết 1 đoạn giới thiệu ngắn về lý do chọn sách đó</li>
            <li>📸 Chụp ảnh sách quyên góp</li>
            <li>💭 Chia sẻ cảm nhận về việc quyên góp</li>
          </ol>
        `,
        duration: "30 phút",
        type: "text"
      },
      {
        id: "quiz5",
        title: "❓ Kiểm tra kiến thức về quyên góp sách",
        type: "quiz",
        questions: [
          { id: "q5_1", question: "Vì sao nên phân loại sách khi quyên góp?", type: "text", answer: "Để phù hợp với độ tuổi và nhu cầu của trẻ em" },
          { id: "q5_2", question: "Loại sách nào phù hợp với trẻ em 6-10 tuổi?", type: "text", answer: "Truyện tranh, sách học tập cơ bản, sách kỹ năng sống" }
        ],
        duration: "10 phút"
      }
    ]
  },
  {
    id: "course6",
    title: "Hỗ trợ người khuyết tật học nghề",
    description: "Khóa học về rào cản, vai trò tình nguyện viên và thực hành hỗ trợ người khuyết tật học nghề.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    duration: "1 tuần",
    level: "Cơ bản",
    category: "social",
    rating: 4.8,
    enrolledCount: 140,
    lessons: [
      {
        id: "lesson6_1",
        title: "♿ Rào cản nghề nghiệp của người khuyết tật",
        content: `
          <h3>♿ Rào cản nghề nghiệp của người khuyết tật</h3>
          <p>Thiếu tiếp cận đào tạo, thiết bị hỗ trợ. Phân biệt đối xử trong tuyển dụng.</p>
          <h4>🚧 Các rào cản chính:</h4>
          <ul>
            <li>🎓 Thiếu cơ hội tiếp cận đào tạo nghề</li>
            <li>🛠️ Thiếu thiết bị và công cụ hỗ trợ</li>
            <li>🚫 Phân biệt đối xử trong tuyển dụng</li>
            <li>🏢 Môi trường làm việc chưa thân thiện</li>
          </ul>
        `,
        duration: "20 phút",
        type: "text"
      },
      {
        id: "lesson6_2",
        title: "🤝 Vai trò và trách nhiệm của tình nguyện viên",
        content: `
          <h3>🤝 Vai trò và trách nhiệm của tình nguyện viên</h3>
          <h4>📋 Các vai trò chính:</h4>
          <ul>
            <li>💻 Dạy nghề cơ bản (tin học, thủ công, bán hàng...)</li>
            <li>🎯 Hỗ trợ định hướng nghề nghiệp, kỹ năng mềm</li>
            <li>📚 Cung cấp tài liệu học tập phù hợp</li>
            <li>🤝 Tạo môi trường học tập thân thiện</li>
          </ul>
        `,
        duration: "25 phút",
        type: "text"
      },
      {
        id: "lesson6_3",
        title: "📋 Thực hành hỗ trợ người khuyết tật học nghề",
        content: `
          <h3>📋 Thực hành hỗ trợ người khuyết tật học nghề</h3>
          <h4>📋 Quy trình thực hiện:</h4>
          <ol>
            <li>📝 Lên kế hoạch tổ chức một buổi chia sẻ nghề nghiệp</li>
            <li>🔍 Phân tích những điều cần lưu ý khi hỗ trợ người khuyết tật</li>
            <li>📚 Chuẩn bị tài liệu và phương pháp giảng dạy</li>
            <li>💭 Chia sẻ kinh nghiệm và bài học rút ra</li>
          </ol>
        `,
        duration: "35 phút",
        type: "text"
      },
      {
        id: "quiz6",
        title: "❓ Kiểm tra kiến thức về hỗ trợ người khuyết tật",
        type: "quiz",
        questions: [
          { id: "q6_1", question: "Liệt kê 2 nghề phổ biến mà người khuyết tật có thể học được.", type: "text", answer: "Tin học văn phòng và thủ công mỹ nghệ" },
          { id: "q6_2", question: "Khi hướng dẫn người khiếm thính, bạn nên làm gì?", type: "text", answer: "Sử dụng ngôn ngữ ký hiệu, viết chữ rõ ràng, sử dụng hình ảnh minh họa" }
        ],
        duration: "10 phút"
      }
    ]
  }
];

export const getCourseById = (courseId) => courses.find(course => course.id === courseId);
export const getLessonById = (courseId, lessonId) => {
  const course = getCourseById(courseId);
  if (!course) return null;
  return course.lessons.find(lesson => lesson.id === lessonId);
}; 