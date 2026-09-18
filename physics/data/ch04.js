window.VLDC_CHAPTERS = window.VLDC_CHAPTERS || [];
window.VLDC_CHAPTERS.push({
  "id": "ch04",
  "number": 4,
  "short": "Trường ĐT",
  "title": "Trường điện từ, dao động và sóng",
  "glossary": [
    {
      "k": "$\\vec{E}^*$",
      "mean": "điện trường xoáy",
      "unit": "V/m",
      "note": "$\\nabla\\times\\vec E=-\\partial\\vec B/\\partial t$; tuần hoàn có thể khác 0. Đường tròn khép kín xuất hiện trong mô hình đối xứng trục."
    },
    {
      "k": "$\\vec{J}_d$",
      "mean": "mật độ dòng điện dịch",
      "unit": "A/m$^2$",
      "note": "$\\vec{J}_d=\\partial\\vec{D}/\\partial t$"
    },
    {
      "k": "$I_{tp}$",
      "mean": "dòng toàn phần",
      "unit": "A",
      "note": "dẫn + dịch"
    },
    {
      "k": "$T_0$",
      "mean": "chu kỳ LC riêng",
      "unit": "s",
      "note": "$T_0=2\\pi\\sqrt{LC}$"
    },
    {
      "k": "$\\omega_0$",
      "mean": "tần số góc riêng",
      "unit": "rad/s",
      "note": "$\\omega_0=1/\\sqrt{LC}$"
    },
    {
      "k": "cộng hưởng",
      "mean": "đáp ứng cực đại khi $\\omega=\\omega_0$",
      "unit": "—",
      "note": "Cực đại dòng trong RLC nối tiếp với biên độ điện áp nguồn không đổi; cực đại điện áp từng phần tử có thể ở tần số khác."
    }
  ],
  "formulas": [
    {
      "name": "Maxwell I (luận điểm)",
      "latex": "$$\\text{từ trường biến thiên}\\ \\to\\ \\text{điện trường xoáy}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\vec{E}^*$",
          "mean": "điện trường xoáy",
          "unit": "V/m"
        }
      ],
      "when": "Điện trường cảm ứng có tuần hoàn theo Faraday. Không bắt buộc E thay đổi theo thời gian: dB/dt không đổi có thể cho E không đổi. Hình dạng đường sức phụ thuộc đối xứng và điều kiện biên."
    },
    {
      "name": "Maxwell–Faraday",
      "latex": "$$\\oint_L \\vec{E}^*\\cdot d\\vec{\\ell}=-\\iint_S \\dfrac{\\partial\\vec{B}}{\\partial t}\\cdot d\\vec{S},\\quad \\mathrm{rot}\\,\\vec{E}^*=-\\dfrac{\\partial\\vec{B}}{\\partial t}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$L$",
          "mean": "đường kín",
          "unit": "—"
        },
        {
          "k": "$S$",
          "mean": "mặt tựa $L$",
          "unit": "—"
        }
      ],
      "when": "Dạng tích phân / vi phân bài giảng (4.1)–(4.2). Góc radian nếu có $\\omega$."
    },
    {
      "name": "Maxwell II & dòng dịch",
      "latex": "$$\\vec{J}_d=\\dfrac{\\partial\\vec{D}}{\\partial t},\\quad \\oint_L\\vec{H}\\cdot d\\vec{\\ell}=\\iint_S\\left(\\vec{J}+\\dfrac{\\partial\\vec{D}}{\\partial t}\\right)\\cdot d\\vec{S}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\vec{J}$",
          "mean": "mật độ dòng dẫn",
          "unit": "A/m$^2$"
        },
        {
          "k": "$\\vec{D}$",
          "mean": "điện cảm",
          "unit": "C/m$^2$"
        }
      ],
      "when": "Dòng dịch tạo từ trường trong phương trình Maxwell–Ampère. Trong khe chân không của tụ lý tưởng không có dòng dẫn gây Joule; điện môi thực vẫn có thể có tổn hao."
    },
    {
      "name": "Mật độ năng lượng EM",
      "latex": "$$\\omega=\\dfrac{\\vec{D}\\cdot\\vec{E}}{2}+\\dfrac{\\vec{B}\\cdot\\vec{H}}{2}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\omega$",
          "mean": "mật độ năng lượng",
          "unit": "J/m$^3$"
        }
      ],
      "when": "Môi trường tuyến tính, không tán sắc, không tổn hao; W là tích phân mật độ năng lượng theo thể tích."
    },
    {
      "name": "LC điều hòa",
      "latex": "$$T_0=2\\pi\\sqrt{LC},\\quad f_0=\\dfrac{1}{2\\pi\\sqrt{LC}}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$L$",
          "mean": "tự cảm",
          "unit": "H"
        },
        {
          "k": "$C$",
          "mean": "điện dung",
          "unit": "F"
        }
      ],
      "when": "$R\\approx 0$. $q,i,u$ biến thiên điều hòa, lệch pha."
    },
    {
      "name": "Tắt dần & cộng hưởng",
      "latex": "$$\\text{RLC tự do nối tiếp: }0<R<2\\sqrt{L/C}\\ \\Rightarrow\\ \\text{dao động tắt dần};\\quad \\omega_{I\\max}=1/\\sqrt{LC}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\omega_0$",
          "mean": "$1/\\sqrt{LC}$",
          "unit": "rad/s"
        }
      ],
      "when": "Dòng cưỡng bức cực đại tại ω = 1/√(LC) khi điện áp nguồn có biên độ cố định. R quá lớn: quá tắt, không còn dao động tự do. Không đồng nhất cực đại dòng với cực đại điện áp trên tụ/cuộn."
    },
    {
      "name": "Sóng điện từ",
      "latex": "$$\\vec{E}\\perp\\vec{B}\\perp\\text{phương truyền},\\quad c=\\dfrac{1}{\\sqrt{\\varepsilon_0\\mu_0}}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$c$",
          "mean": "tốc độ chân không",
          "unit": "m/s",
          "note": "$3\\times 10^8$"
        }
      ],
      "when": "Sóng phẳng lan truyền trong chân không, vùng không nguồn; E và B cùng pha, E/B = c. Cấu hình trường gần hoặc sóng chồng có thể không có dạng hình học này."
    }
  ],
  "traps": [
    {
      "title": "Điện trường xoáy và tốc độ đổi B",
      "text": " Tuần hoàn $\\oint\\vec E\\cdot d\\vec\\ell=-d\\Phi_B/dt$. dB/dt khác 0 không đồng nghĩa E bắt buộc biến thiên theo thời gian."
    },
    {
      "title": "Dòng dịch không đốt dây",
      "text": " Dòng dịch trong chân không tạo từ trường nhưng không phải dòng điện tích dẫn xuyên khe. Điện môi thực có thể nóng do tổn hao; không kết luận mọi tụ xoay chiều đều không tỏa nhiệt."
    },
    {
      "title": "$T_0$ có $2\\pi$",
      "text": " $f_0=1/(2\\pi\\sqrt{LC})$ không phải $1/\\sqrt{LC}$ (đó là $\\omega_0/2\\pi$ vs $\\omega_0$)."
    },
    {
      "title": "Cộng hưởng",
      "text": " Khớp $\\omega$ nguồn với $\\omega_0$. Radio: chọn đài bằng $LC$."
    }
  ],
  "visual": {
    "html": "<p><strong>Maxwell I.</strong> $B$ tăng vào giấy $\\Rightarrow E^*$ vòng (chiều Lenz trên vòng thử).</p><p><strong>Maxwell II.</strong> Tụ đang nạp: $D$ giữa hai bản đổi $\\Rightarrow$ “dòng dịch” nối tiếp dòng dẫn trong dây.</p><p><strong>Sóng.</strong> $E$ đứng, $B$ ngang, lan theo $E\\times B$. Lab: LC + sóng 3D.</p>"
  },
  "mcq": [
    {
      "level": "NB",
      "stem": "Đặc điểm tổng quát của điện trường cảm ứng do từ trường biến thiên là",
      "choices": {
        "A": "Có tuần hoàn theo định luật Faraday, có thể khác 0",
        "B": "Luôn là điện trường thế Coulomb với tuần hoàn bằng 0",
        "C": "Bắt buộc thay đổi theo thời gian dù dB/dt không đổi",
        "D": "Không liên quan đến định luật Faraday"
      },
      "answer": "A",
      "whyCorrect": "$\\oint\\vec E\\cdot d\\vec\\ell=-d\\Phi_B/dt$. Trong cấu hình đối xứng trục, đường sức có thể là các vòng tròn. Nếu B tăng tuyến tính theo t thì E cảm ứng có thể không đổi theo t.",
      "whyWrong": {
        "B": "Trường cảm ứng nói chung không bảo toàn; không dùng một hiệu điện thế tĩnh duy nhất cho mọi đường đi.",
        "C": "E phụ thuộc dB/dt và hình học; dB/dt không đổi có thể cho E không đổi.",
        "D": "Chính định luật Faraday xác định tuần hoàn của trường cảm ứng."
      }
    },
    {
      "level": "NB",
      "stem": "Luận điểm Maxwell thứ hai",
      "choices": {
        "A": "Điện trường biến thiên đóng góp vào nguồn của từ trường thông qua dòng điện dịch",
        "B": "chỉ nam châm vĩnh cửu sinh $B$",
        "C": "không có dòng dịch",
        "D": "$\\mathrm{rot}\\,E^*=+\\partial B/\\partial t$"
      },
      "answer": "A",
      "whyCorrect": "$\\nabla\\times\\vec H=\\vec J+\\partial\\vec D/\\partial t$. Dòng dịch là nguồn của H; không suy ra H luôn phải biến thiên theo thời gian, vì $\\partial D/\\partial t$ có thể không đổi.",
      "whyWrong": {
        "B": "Thiếu.",
        "C": "Có $J_d=\\partial D/\\partial t$.",
        "D": "Sai dấu Faraday."
      }
    },
    {
      "level": "TH",
      "stem": "Maxwell–Faraday dạng tích phân (bài giảng)",
      "choices": {
        "A": "$\\oint E^*\\cdot dl=-\\iint \\partial B/\\partial t\\cdot dS$",
        "B": "$\\oint D\\cdot dS=\\sum q$",
        "C": "$\\oint H\\cdot dl=I_{\\mathrm{dẫn}}$ thôi (bỏ dịch)",
        "D": "$\\mathrm{rot}\\,B=0$ mọi lúc"
      },
      "answer": "A",
      "whyCorrect": "Công thức (4.1). Vi phân: $\\mathrm{rot}\\,E^*=-\\partial B/\\partial t$.",
      "whyWrong": {
        "B": "O-G module 1.",
        "C": "Ampère thiếu dòng dịch.",
        "D": "Sai."
      }
    },
    {
      "level": "TH",
      "stem": "Mật độ dòng điện dịch",
      "choices": {
        "A": "$J_d=\\partial D/\\partial t$",
        "B": "$J_d=\\sigma E$ (dẫn)",
        "C": "$J_d=\\rho v$ chỉ",
        "D": "$J_d=0$ giữa hai bản tụ AC"
      },
      "answer": "A",
      "whyCorrect": "$\\vec J_d=\\partial\\vec D/\\partial t$. Giữa hai bản tụ lý tưởng, dòng dịch có thể khác 0 khi D đang đổi; tại các thời điểm đạo hàm bằng 0 thì dòng dịch bằng 0.",
      "whyWrong": {
        "B": "Định luật Ohm dòng dẫn.",
        "C": "Vi mô dẫn.",
        "D": "Sai — chính chỗ có $J_d$."
      }
    },
    {
      "level": "TH",
      "stem": "Trong khe chân không của tụ điện lý tưởng đang nạp, dòng điện dịch",
      "choices": {
        "A": "Tạo từ trường nhưng không phải dòng điện tích dẫn qua khe gây nhiệt Joule",
        "B": "Là dòng electron dẫn xuyên khe chân không như trong dây đồng",
        "C": "Không tạo từ trường",
        "D": "Luôn trái chiều và khác độ lớn dòng trong dây nối tụ"
      },
      "answer": "A",
      "whyCorrect": "$I_d=d\\Phi_D/dt$ bằng dòng nạp trong mô hình tụ phẳng lý tưởng. Không có hạt tải dẫn xuyên khe chân không. Điện môi thực hoặc dây dẫn vẫn có thể có tổn hao.",
      "whyWrong": {
        "B": "Dòng dịch được định nghĩa bằng biến thiên D, không bằng chuyển dời điện tích dẫn qua khe.",
        "C": "Có đóng góp trong Maxwell–Ampère.",
        "D": "Trong mô hình tụ lý tưởng, dòng dịch giữa bản nối tiếp với dòng nạp và có cùng độ lớn."
      }
    },
    {
      "level": "TH",
      "stem": "Maxwell–Ampère (có dịch)",
      "choices": {
        "A": "$\\oint H\\cdot dl=\\iint(J+\\partial D/\\partial t)\\cdot dS$",
        "B": "$\\oint B\\cdot dl=\\mu_0\\sum q$",
        "C": "$\\mathrm{rot}\\,H=0$",
        "D": "$\\oint E\\cdot dl=Q/C$"
      },
      "answer": "A",
      "whyCorrect": "(4.8). Vi phân $\\mathrm{rot}\\,H=J+\\partial D/\\partial t$.",
      "whyWrong": {
        "B": "Lẫn O-G.",
        "C": "Thiếu nguồn.",
        "D": "Tụ tĩnh."
      }
    },
    {
      "level": "NB",
      "stem": "Chu kỳ dao động riêng LC ($R=0$)",
      "choices": {
        "A": "$T_0=2\\pi\\sqrt{LC}$",
        "B": "$T_0=2\\pi\\sqrt{L/C}$",
        "C": "$T_0=\\sqrt{LC}$",
        "D": "$T_0=1/(LC)$"
      },
      "answer": "A",
      "whyCorrect": "$f_0=1/(2\\pi\\sqrt{LC})$ $\\Rightarrow T_0=2\\pi\\sqrt{LC}$.",
      "whyWrong": {
        "B": "Nhầm Thomson khác.",
        "C": "Thiếu $2\\pi$.",
        "D": "Sai thứ nguyên."
      }
    },
    {
      "level": "VD",
      "stem": "$L=4$ mH, $C=10$ µF. $T_0=2\\pi\\sqrt{LC}$",
      "choices": {
        "A": "$4\\pi\\times 10^{-4}$ s",
        "B": "$4\\times 10^{-4}$ s",
        "C": "$2\\pi\\times 10^{-3}$ s",
        "D": "$10^{-3}$ s"
      },
      "answer": "A",
      "whyCorrect": "$LC=4\\times 10^{-3}\\cdot 10^{-5}=4\\times 10^{-8}$, $\\sqrt{LC}=2\\times 10^{-4}$, $T_0=4\\pi\\times 10^{-4}$ s.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $4\\pi\\times 10^{-4}$ s.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $4\\pi\\times 10^{-4}$ s.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $4\\pi\\times 10^{-4}$ s."
      }
    },
    {
      "level": "TH",
      "stem": "Mạch LC tự do nối tiếp có L, C dương. Để có dao động tắt dần thay vì dao động điều hòa lý tưởng, cần",
      "choices": {
        "A": "điện trở $0<R<2\\sqrt{L/C}$",
        "B": "bỏ $L$",
        "C": "bỏ $C$",
        "D": "$\\varepsilon=0$ bắt buộc"
      },
      "answer": "A",
      "whyCorrect": "Năng lượng mất qua R; còn dao động khi $R<2\\sqrt{L/C}$. R bằng hoặc lớn hơn ngưỡng cho tắt tới hạn/quá tắt, không phải dao động tắt dần.",
      "whyWrong": {
        "B": "Mất dao động điện từ.",
        "C": "Mất.",
        "D": "Không."
      }
    },
    {
      "level": "TH",
      "stem": "Cộng hưởng điện từ (mạch nối tiếp điển hình)",
      "choices": {
        "A": "khi $\\omega$ nguồn $=\\omega_0=1/\\sqrt{LC}$, dòng cực đại",
        "B": "khi $\\omega\\to 0$ mọi lúc",
        "C": "khi $R\\to\\infty$ dòng cực đại",
        "D": "không phụ thuộc $L,C$"
      },
      "answer": "A",
      "whyCorrect": "Nội dung 4.4.3. Radio chọn tần số.",
      "whyWrong": {
        "B": "Lệch cộng hưởng.",
        "C": "$R$ lớn giảm $I$.",
        "D": "Phụ thuộc."
      }
    },
    {
      "level": "TH",
      "stem": "Đối với sóng điện từ phẳng lan truyền trong chân không, vùng không nguồn",
      "choices": {
        "A": "$\\vec{E}\\perp\\vec{B}\\perp$ phương truyền; $c=1/\\sqrt{\\varepsilon_0\\mu_0}$",
        "B": "$E\\parallel B\\parallel$ truyền",
        "C": "chỉ có $E$, không $B$",
        "D": "tốc độ $330$ m/s"
      },
      "answer": "A",
      "whyCorrect": "Tính chất sóng EM bài giảng.",
      "whyWrong": {
        "B": "Tam diện.",
        "C": "Cả hai.",
        "D": "Âm thanh."
      }
    },
    {
      "level": "NB",
      "stem": "Thang sóng: ánh sáng nhìn thấy so với radio",
      "choices": {
        "A": "bước sóng ngắn hơn, tần số cao hơn",
        "B": "bước sóng dài hơn",
        "C": "không phải sóng EM",
        "D": "tốc độ khác hẳn trong chân không"
      },
      "answer": "A",
      "whyCorrect": "Cùng $c=\\lambda f$. Visible $\\sim 0{,}4$–$0{,}76$ µm (bài giảng).",
      "whyWrong": {
        "B": "Radio dài hơn.",
        "C": "Là EM.",
        "D": "Cùng $c$ chân không."
      }
    },
    {
      "level": "VD",
      "stem": "$\\omega_0=1/\\sqrt{LC}$. $L$ tăng $4$ lần, $C$ giữ, $f_0$",
      "choices": {
        "A": "giảm nửa",
        "B": "gấp đôi",
        "C": "giảm $4$",
        "D": "không đổi"
      },
      "answer": "A",
      "whyCorrect": "$f_0\\propto 1/\\sqrt{L}$.",
      "whyWrong": {
        "B": "Đảo.",
        "C": "Nhầm $1/L$.",
        "D": "Đổi $L$ thì đổi $f$."
      }
    },
    {
      "level": "VDC",
      "stem": "Thu/phát sóng (antenna + LC)",
      "choices": {
        "A": "mạch cộng hưởng chọn $f$; antenna ghép $E,B$ tự do",
        "B": "chỉ dây điện một chiều",
        "C": "O-G tĩnh đủ phát radio",
        "D": "không cần Maxwell II"
      },
      "answer": "A",
      "whyCorrect": "Nội dung 4.5.4. Phát: dao động LC $\\to$ dipole. Thu: cộng hưởng khớp đài.",
      "whyWrong": {
        "B": "DC không bức xạ hiệu quả.",
        "C": "Tĩnh không sóng.",
        "D": "Cần cặp phương trình."
      }
    },
    {
      "level": "TH",
      "stem": "Mật độ năng lượng trường điện từ trong môi trường tuyến tính, không tán sắc, không tổn hao là",
      "choices": {
        "A": "$\\omega=D\\cdot E/2+B\\cdot H/2$",
        "B": "chỉ $CU^2$ không từ",
        "C": "$\\omega=E\\times B$ (Poynting là mật độ năng lượng)",
        "D": "$\\omega=0$ vì sóng"
      },
      "answer": "A",
      "whyCorrect": "(4.11). Poynting $E\\times H$ là mật độ <em>dòng</em> năng lượng, không phải $\\omega$.",
      "whyWrong": {
        "B": "Thiếu từ.",
        "C": "Nhầm Poynting với mật độ.",
        "D": "Sóng mang năng lượng."
      }
    },
    {
      "level": "VD",
      "stem": "Giữa hai bản tụ đang nạp, dòng dẫn $I=0$ nhưng $H$ quanh tụ vẫn có vì",
      "choices": {
        "A": "dòng dịch $\\partial D/\\partial t$",
        "B": "nam châm giấu",
        "C": "O-G điện tích không đủ",
        "D": "$B=0$ bắt buộc"
      },
      "answer": "A",
      "whyCorrect": "Maxwell II: khép mạch Ampère.",
      "whyWrong": {
        "B": "Không cần.",
        "C": "O-G không tạo $H$.",
        "D": "Có $H$."
      }
    },
    {
      "level": "NB",
      "stem": "$\\mathrm{rot}\\,E^*=-\\partial B/\\partial t$ là",
      "choices": {
        "A": "Maxwell–Faraday vi phân",
        "B": "O-G",
        "C": "Coulomb",
        "D": "Ohm"
      },
      "answer": "A",
      "whyCorrect": "(4.2).",
      "whyWrong": {
        "B": "Module 1.",
        "C": "Tĩnh.",
        "D": "Mạch."
      }
    },
    {
      "level": "TH",
      "stem": "Trong mạch LC lý tưởng, năng lượng",
      "choices": {
        "A": "trao đổi giữa tụ và cuộn, tổng năng lượng không đổi",
        "B": "mất hết sau $1$ chu kỳ",
        "C": "chỉ nằm trên $R$",
        "D": "không liên quan $W=\\frac12 CU^2$ và $\\frac12 LI^2$"
      },
      "answer": "A",
      "whyCorrect": "Trong LC lý tưởng, $W=q^2/(2C)+Li^2/2$ không đổi. Hai thành phần điện và từ thay phiên tăng/giảm.",
      "whyWrong": {
        "B": "LC lý tưởng không có tổn hao; ngay cả có R cũng không nói năng lượng luôn mất hết đúng sau một chu kỳ.",
        "C": "$R=0$.",
        "D": "Đúng cặp đó."
      }
    },
    {
      "level": "VDC",
      "stem": "Phát biểu nào <strong>sai</strong>?",
      "choices": {
        "A": "dòng dịch giúp khép dòng trong mạch tụ xoay chiều",
        "B": "cộng hưởng dùng chọn tần số thu phát",
        "C": "Maxwell I: điện tích đứng yên sinh $E^*$ xoáy",
        "D": "$T_0=2\\pi\\sqrt{LC}$"
      },
      "answer": "C",
      "whyCorrect": "Điện tích đứng yên sinh $E$ tĩnh, không phải xoáy. Xoáy do $B(t)$.",
      "whyWrong": {
        "A": "Đúng.",
        "B": "Đúng.",
        "D": "Đúng."
      }
    },
    {
      "level": "VD",
      "stem": "$C=25$ pF, $L=10^{-4}$ H. $f_0$ cỡ",
      "choices": {
        "A": "$3{,}2$ MHz (radio)",
        "B": "$50$ Hz lưới",
        "C": "$3\\times10^8$ Hz",
        "D": "$0$"
      },
      "answer": "A",
      "whyCorrect": "$\\sqrt{LC}=\\sqrt{10^{-4}\\cdot 25\\times 10^{-12}}=5\\times 10^{-8}$, $2\\pi\\sqrt{LC}\\approx 3{,}14\\times 10^{-7}$, $f_0\\approx 3{,}2$ MHz.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}2$ MHz (radio).",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}2$ MHz (radio).",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $3{,}2$ MHz (radio)."
      }
    },
    {
      "level": "TH",
      "stem": "Sóng EM mang thông tin vì",
      "choices": {
        "A": "biên độ/tần số/pha $E,B$ điều chế được; thu bằng mạch cộng hưởng",
        "B": "chỉ hạt photon module 6, cổ điển cấm sóng",
        "C": "âm thanh trong dây",
        "D": "O-G tĩnh"
      },
      "answer": "A",
      "whyCorrect": "Thu phát 4.5.4. Lượng tử bổ sung module 6, không phủ nhận sóng Maxwell.",
      "whyWrong": {
        "B": "Cả hai mô hình.",
        "C": "Không.",
        "D": "Không."
      }
    },
    {
      "level": "NB",
      "stem": "Đơn vị $H$ trong Maxwell–Ampère vẫn là",
      "choices": {
        "A": "A/m",
        "B": "T",
        "C": "V",
        "D": "F"
      },
      "answer": "A",
      "whyCorrect": "Giữ cặp $H,B$ và $E,D$.",
      "whyWrong": {
        "B": "$B$.",
        "C": "Suất.",
        "D": "Tụ."
      }
    },
    {
      "level": "VD",
      "stem": "Tắt dần: biên độ $q$ giảm vì",
      "choices": {
        "A": "công tỏa trên $R$",
        "B": "$L$ âm",
        "C": "Maxwell cấm LC",
        "D": "$c$ đổi"
      },
      "answer": "A",
      "whyCorrect": "Nội dung 4.3.",
      "whyWrong": {
        "B": "Sai.",
        "C": "Sai.",
        "D": "Sai."
      }
    },
    {
      "level": "VDC",
      "stem": "Skin effect trên dây antenna / bếp từ liên quan Maxwell vì",
      "choices": {
        "A": "$\\partial B/\\partial t$ và $\\partial D/\\partial t$ + dẫn $\\sigma$ dồn dòng ra da ở cao tần",
        "B": "Coulomb tĩnh đều tiết diện",
        "C": "không có $H$",
        "D": "chỉ quang hình"
      },
      "answer": "A",
      "whyCorrect": "Cảm ứng + dẫn. Module 3–4 gặp nhau.",
      "whyWrong": {
        "B": "DC tần $0$.",
        "C": "Có $H$.",
        "D": "Sai."
      }
    }
  ],
  "essays": [
    {
      "kind": "Maxwell I",
      "title": "Điện trường xoáy",
      "problem": "<p>B biến thiên đều theo thời gian với $dB/dt=0{,}20$ T/s trong một vùng đối xứng trụ đủ rộng. Xét đường tròn đồng tâm bán kính $r=5$ cm, nằm hoàn toàn trong vùng B đều và vuông góc B. Tính độ lớn suất điện động và điện trường cảm ứng tiếp tuyến trên đường tròn.</p>",
      "tip": "Cần đối xứng trục để E có cùng độ lớn và tiếp tuyến trên đường tròn; Faraday một mình chỉ xác định tuần hoàn.",
      "steps": {
        "s1": "<p>Maxwell I: $B(t)\\to E^*$ xoáy.</p>",
        "s2": "<p>$A=\\pi r^2$, $r=0{,}05$ m.</p>",
        "s3": "<p>$|\\mathcal E|=\\pi r^2|dB/dt|$. Nhờ đối xứng, $2\\pi r|E|=|\\mathcal E|$, nên $|E|=r|dB/dt|/2$.</p>",
        "s4": "<p>$A=7{,}85\\times 10^{-3}$ m$^2$, $\\mathcal{E}=1{,}57\\times 10^{-3}$ V, $E^*\\approx 5{,}0\\times 10^{-3}$ V/m.</p>"
      }
    },
    {
      "kind": "Dòng dịch",
      "title": "Tụ đang nạp",
      "problem": "<p>Tụ phẳng $S=100$ cm$^2$, $dD/dt=0{,}02$ C/(m$^2$·s). Tính $I_d$.</p>",
      "tip": "$I_d=J_d S$.",
      "steps": {
        "s1": "<p>Giữa bản: không dòng dẫn, có $J_d=\\partial D/\\partial t$.</p>",
        "s2": "<p>$S=0{,}010$ m$^2$.</p>",
        "s3": "<p>$I_d=S\\,dD/dt$.</p>",
        "s4": "<p>$I_d=2{,}0\\times 10^{-4}$ A, bằng $I$ trong dây (nối tiếp).</p>"
      }
    },
    {
      "kind": "LC",
      "title": "Chu kỳ Thomson",
      "problem": "<p>$L=4{,}0$ mH, $C=1{,}0$ µF. Tính $T_0$, $f_0$, $\\omega_0$.</p>",
      "tip": "$T_0=2\\pi\\sqrt{LC}$.",
      "steps": {
        "s1": "<p>LC lý tưởng.</p>",
        "s2": "<p>$L=4{,}0\\times 10^{-3}$ H, $C=1{,}0\\times 10^{-6}$ F.</p>",
        "s3": "<p>$\\sqrt{LC}=\\sqrt{4{,}0\\times 10^{-9}}=6{,}32\\times 10^{-5}$ s (không phải $2\\times 10^{-4}$). $T_0=2\\pi\\sqrt{LC}$. $\\omega_0=1/\\sqrt{LC}$.</p>",
        "s4": "<p>$T_0\\approx 3{,}97\\times 10^{-4}$ s; $f_0\\approx 2{,}52$ kHz; $\\omega_0\\approx 1{,}58\\times 10^4$ rad/s.</p>"
      }
    },
    {
      "kind": "Cộng hưởng",
      "title": "Chọn đài radio",
      "problem": "<p>$L=0{,}20$ mH cố định. Muốn $f_0=1{,}0$ MHz. Tính $C$.</p>",
      "tip": "$C=1/(\\omega_0^2 L)$, $\\omega_0=2\\pi f$.",
      "steps": {
        "s1": "<p>Cộng hưởng thu.</p>",
        "s2": "<p>$f=10^6$ Hz, $L=2{,}0\\times 10^{-4}$ H.</p>",
        "s3": "<p>$C=1/(4\\pi^2 f^2 L)$.</p>",
        "s4": "<p>$C\\approx 1{,}27\\times 10^{-10}$ F $=127$ pF.</p>"
      }
    },
    {
      "kind": "Sóng",
      "title": "Thang EM",
      "problem": "<p>$f=100$ MHz (FM). Tính $\\lambda$ chân không. So với ánh sáng $500$ nm.</p>",
      "tip": "$c=\\lambda f$.",
      "steps": {
        "s1": "<p>Sóng EM, $c=3\\times 10^8$.</p>",
        "s2": "<p>$f=10^8$ Hz.</p>",
        "s3": "<p>$\\lambda=c/f$.</p>",
        "s4": "<p>$\\lambda=3{,}0$ m. Ánh sáng $5\\times 10^{-7}$ m — ngắn hơn $\\sim 6\\times 10^6$ lần.</p>"
      }
    },
    {
      "kind": "Ứng dụng",
      "title": "Phát / thu và Maxwell",
      "problem": "<p>Giải thích vì sao antenna cần dòng/điện tích <em>gia tốc</em> (biến thiên), liên hệ luận điểm I–II.</p>",
      "tip": "Tĩnh: gần, không bức xạ sóng đi xa.",
      "steps": {
        "s1": "<p>Dipole AC: $q(t)$, $I(t)$ $\\Rightarrow E(t), D(t), B(t)$.</p>",
        "s2": "<p>Tần số MHz–GHz.</p>",
        "s3": "<p>Maxwell liên hệ biến thiên không gian và thời gian của E, B. Trong chân không không nguồn, suy ra phương trình sóng với tốc độ $c=1/\\sqrt{\\varepsilon_0\\mu_0}$. Năng lượng phát đi do nguồn cấp cho anten, không phải hai trường tự tạo năng lượng.</p>",
        "s4": "<p>Thu: $E$ sóng tạo $\\mathcal{E}$ trên antenna, LC cộng hưởng lọc đài.</p>"
      }
    }
  ]
});
