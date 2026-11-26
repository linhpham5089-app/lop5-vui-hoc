"""
Dữ liệu mẫu cho chuyên mục Đố Vui Trí Tuệ & Giải Trí
Dành cho học sinh lớp 5: Đố mẹo, Đố chữ, Toán logic, Khoa học vui, Đố vui Tiếng Anh
"""

FUN_RIDDLES_SEED_DATA = [
    {
        "category": "Đố mẹo",
        "question": "Con gì càng to càng nhỏ?",
        "hint": "Nó sống ở dưới nước, có mai và có 2 chiếc càng rất đặc biệt!",
        "answer": "Con cua",
        "explanation": "Vì con cua có một chiếc 'càng to' và một chiếc 'càng nhỏ' đó nha! Đố chữ quá thông minh đúng không nào? 🦀"
    },
    {
        "category": "Đố mẹo",
        "question": "Cái gì người mua biết, người bán biết, người dùng không bao giờ biết?",
        "hint": "Một đồ vật mà khi dùng đến thì người đó đã không còn ở cõi đời nữa.",
        "answer": "Quan tài (hoặc Cỗ quan tài)",
        "explanation": "Người mua thì biết đi mua, người bán làm ra để bán, chỉ có người nằm bên trong (người dùng) là không thể biết được thôi! ⚰️"
    },
    {
        "category": "Đố mẹo",
        "question": "Cây cầu có trọng tải tối đa 10 tấn. Một chiếc xe tải chở hàng tổng cộng đúng 10 tấn chạy lên cầu. Giữa cầu có một con chim bồ câu bay đến đậu lên xe. Hỏi cây cầu có bị sập không?",
        "hint": "Trong lúc xe chạy từ đầu cầu đến giữa cầu thì xe đã tiêu hao bớt thứ gì nhỉ?",
        "answer": "Cầu không sập",
        "explanation": "Cầu không thể sập vì trong quá trình xe chạy từ đầu cầu ra giữa cầu, xe đã đốt cháy một lượng xăng/dầu nặng hơn trọng lượng của chú chim bồ câu rất nhiều rồi! 🕊️🚛"
    },
    {
        "category": "Đố mẹo",
        "question": "Quần gì rộng nhất thế giới mà không ai có thể mặc vừa?",
        "hint": "Tên một quần thể gồm rất nhiều hòn đảo trên biển.",
        "answer": "Quần đảo",
        "explanation": "Quần đảo là tập hợp các hòn đảo lớn nhỏ trên đại dương, làm sao mà mặc vào người được chứ! 🏝️"
    },
    {
        "category": "Đố chữ",
        "question": "Để nguyên lấp lánh trên trời,\nBỏ đầu thành quả thơm ngon mát lành.\nBỏ đuôi thì lại hóa ra,\nLoài hoa báo hiệu tết về nơi nơi.\n(Là những từ gì?)",
        "hint": "Từ gốc có 3 chữ cái, đêm về sáng lấp lánh trên bầu trời đêm.",
        "answer": "Sao, Cam, Mai",
        "explanation": "Để nguyên là 'Sao' (ngôi sao trên trời), bỏ đầu (S) thành 'Ao' hoặc theo câu đố: để nguyên 'Sao', đổi chữ hoặc chữ 'Mai' (hoa mai tết). Chính xác từ khóa là: Sao - Cam - Mai! 🌟🍊🌸"
    },
    {
        "category": "Đố chữ",
        "question": "Con gì đập thì sống, không đập thì chết?",
        "hint": "Nó nằm ngay trong lồng ngực bên trái của mỗi chúng ta đấy!",
        "answer": "Trái tim (hoặc Quả tim)",
        "explanation": "Trái tim phải đập liên hồi thì chúng ta mới sống khỏe mạnh được chứ, ngừng đập là toi ngay! ❤️"
    },
    {
        "category": "Đố chữ",
        "question": "Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?",
        "hint": "Một món ăn thơm lừng vào mùa đông vùng quê, hạt vàng óng ánh.",
        "answer": "Bắp ngô (hoặc Trái bắp, Quả ngô)",
        "explanation": "Bỏ lớp vỏ áo bên ngoài ra rồi nướng hạt bên trong; khi ăn thì gặm lớp hạt bên ngoài rồi bỏ cùi bắp ở bên trong đi! 🌽"
    },
    {
        "category": "Toán logic",
        "question": "Có 3 quả táo trên bàn, em lấy đi 2 quả. Hỏi em có mấy quả táo?",
        "hint": "Đọc thật kỹ: 'EM lấy đi...' chứ không hỏi trên bàn còn lại mấy quả nha!",
        "answer": "2 quả táo",
        "explanation": "Em lấy đi 2 quả thì trên tay em có đúng 2 quả táo chứ mấy! Bẫy toán học tư duy siêu hay phải không? 🍎🍎"
    },
    {
        "category": "Toán logic",
        "question": "Một gia đình có 2 người cha và 2 người con cùng đi câu cá. Mỗi người câu được đúng 1 con cá. Hỏi tại sao đem về nhà lại có tất cả 3 con cá mà không ai bị mất phần?",
        "hint": "Trong gia đình có 3 thế hệ cùng đi chung: Ông, Bố và...",
        "answer": "Có 3 người: Ông nội, Bố và Con trai",
        "explanation": "Gia đình có 3 người: Ông nội (là cha của bố), Bố (vừa là con của ông nội, vừa là cha của con trai) và Con trai. Như vậy có đúng 2 người cha và 2 người con, tổng cộng 3 người câu được 3 con cá! 🎣"
    },
    {
        "category": "Toán logic",
        "question": "Bác thợ mộc cưa một khúc gỗ dài thành 5 đoạn. Mỗi lần cưa mất đúng 6 phút. Giữa 2 lần cưa bác nghỉ tay 2 phút. Hỏi bác thợ mộc hoàn thành xong khúc gỗ trong bao nhiêu phút?",
        "hint": "Cưa làm 5 đoạn thì chỉ cần cưa mấy nhát cưa thôi nhỉ?",
        "answer": "30 phút (4 lần cưa và 3 lần nghỉ: 4x6 + 3x2 = 30)",
        "explanation": "Để chia làm 5 đoạn chỉ cần 4 nhát cưa. 4 lần cưa mất 4 x 6 = 24 phút. Giữa 4 lần cưa chỉ có 3 lần nghỉ (3 x 2 = 6 phút). Tổng cộng: 24 + 6 = 30 phút! 🪚"
    },
    {
        "category": "Khoa học vui",
        "question": "Tại sao loài chim hồng hạc khi ngủ hoặc nghỉ ngơi thường đứng bằng một chân?",
        "hint": "Liên quan đến việc giữ ấm cơ thể trong làn nước lạnh.",
        "answer": "Để giữ ấm cơ thể (giảm mất nhiệt)",
        "explanation": "Khoa học chứng minh chân chim không có lông và ngâm trong nước rất dễ mất nhiệt. Đứng co một chân sát bụng giúp chim hồng hạc giữ ấm cơ thể và đỡ mỏi cơ bắp hơn đấy! 🦩"
    },
    {
        "category": "Khoa học vui",
        "question": "Mặt trời mọc ở hướng Đông và lặn ở hướng Tây. Nhưng trên hành tinh nào trong Hệ Mặt Trời, Mặt trời lại mọc ở hướng Tây và lặn ở hướng Đông?",
        "hint": "Hành tinh thứ 2 tính từ Mặt trời, được mệnh danh là 'Sao Kim' hay 'Sao Hôm/Sao Mai'.",
        "answer": "Sao Kim (Venus)",
        "explanation": "Sao Kim tự quay quanh trục theo chiều ngược lại (theo chiều kim đồng hồ) so với Trái Đất và hầu hết các hành tinh khác, nên trên Sao Kim mặt trời sẽ mọc ở đằng Tây và lặn ở đằng Đông! 🪐"
    },
    {
        "category": "Đố vui Tiếng Anh",
        "question": "What has hands but cannot clap? (Cái gì có bàn tay/kim nhưng không thể vỗ tay?)",
        "hint": "Vật dụng báo giờ treo trên tường hoặc đeo ở cổ tay.",
        "answer": "A clock (hoặc A watch / Đồng hồ)",
        "explanation": "In English, 'clock hands' means the hour hand and minute hand (kim giờ, kim phút), but a clock cannot clap hands! ⏰👏"
    },
    {
        "category": "Đố vui Tiếng Anh",
        "question": "What letter of the alphabet has the most water? (Chữ cái nào trong bảng chữ cái tiếng Anh chứa nhiều nước nhất?)",
        "hint": "Phát âm chữ cái này nghe giống hệt từ 'Biển' trong tiếng Anh.",
        "answer": "The letter C (Sea)",
        "explanation": "Letter 'C' sounds exactly like 'Sea' (biển cả mênh mông nước)! Chơi chữ tiếng Anh siêu vui nhộn! 🌊🔤"
    },
    {
        "category": "Đố vui Tiếng Anh",
        "question": "Why is 6 afraid of 7? (Tại sao số 6 lại sợ số 7 nhỉ?)",
        "hint": "Phát âm tiếng Anh của cụm: 7 - 8 - 9 nghe giống như: 7 đã làm gì số 9?",
        "answer": "Because 7 8 9 (Because seven ate nine - Vì số 7 đã ăn thịt số 9)",
        "explanation": "Vì trong tiếng Anh, '7 8 9' phát âm giống hệt câu 'Seven ate nine' (Số 7 đã xơi tái số 9)! Nên số 6 mới khiếp sợ số 7 đấy haha! 😂🔢"
    },
    {
        "category": "Đố mẹo",
        "question": "Có một đàn vịt đi qua cầu. 1 con đi trước 2 con, 1 con đi sau 2 con, 1 con đi giữa 2 con. Hỏi đàn vịt có mấy con?",
        "hint": "Đừng vội làm phép tính cộng dồn nhé, thử xếp hàng xem sao!",
        "answer": "3 con vịt",
        "explanation": "Chỉ có 3 con vịt xếp hàng dọc đi nối đuôi nhau thôi: con thứ 1 đi trước 2 con, con thứ 3 đi sau 2 con, và con thứ 2 đi giữa 2 con! 🦆🦆🦆"
    }
]
