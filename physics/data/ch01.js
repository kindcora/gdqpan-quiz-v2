window.VLDC_CHAPTERS = window.VLDC_CHAPTERS || [];
window.VLDC_CHAPTERS.push({
  "id": "ch01",
  "number": 1,
  "short": "Điện học",
  "title": "Điện học",
  "glossary": [
    {
      "k": "$q$",
      "mean": "điện tích điểm",
      "unit": "C",
      "note": "bội nguyên của $e=1{,}6\\times 10^{-19}$ C; $q_p=+e$, $q_e=-e$"
    },
    {
      "k": "$k$",
      "mean": "hằng số Coulomb",
      "unit": "N·m$^2$/C$^2$",
      "note": "$k=1/(4\\pi\\varepsilon_0)=9\\times 10^9$"
    },
    {
      "k": "$\\varepsilon_0$",
      "mean": "hằng số điện chân không",
      "unit": "C$^2$/(N·m$^2$)",
      "note": "bài giảng $\\approx 8{,}846\\times 10^{-12}$; ôn tập dùng $8{,}85\\times 10^{-12}$"
    },
    {
      "k": "$\\varepsilon$",
      "mean": "hằng số điện môi tương đối",
      "unit": "—",
      "note": "$\\varepsilon\\ge 1$; chân không / không khí $\\varepsilon=1$"
    },
    {
      "k": "$\\vec{F}$",
      "mean": "lực Coulomb",
      "unit": "N",
      "note": "cùng dấu đẩy, trái dấu hút; phương đường nối hai điện tích"
    },
    {
      "k": "$\\vec{E}$",
      "mean": "cường độ điện trường",
      "unit": "N/C = V/m",
      "note": "$\\vec{E}=\\vec{F}/q_0$ với $q_0$ thử dương"
    },
    {
      "k": "$\\vec{D}$",
      "mean": "vectơ điện cảm",
      "unit": "C/m$^2$",
      "note": "Trong điện môi tuyến tính, đẳng hướng: $\\vec D=\\varepsilon\\varepsilon_0\\vec E$. Tổng quát: $\\vec D=\\varepsilon_0\\vec E+\\vec P$."
    },
    {
      "k": "$\\Phi_e$",
      "mean": "điện thông (thông lượng $\\vec{D}$)",
      "unit": "C",
      "note": "$\\Phi_e=\\iint_S\\vec{D}\\cdot d\\vec{S}$"
    },
    {
      "k": "$V$",
      "mean": "điện thế",
      "unit": "V",
      "note": "$V=W/q_0$; gốc thường lấy vô hạn"
    },
    {
      "k": "$U$",
      "mean": "hiệu điện thế",
      "unit": "V",
      "note": "$U_{MN}=V_M-V_N=A_{MN}/q_0$; trường đều $U=Ed$"
    },
    {
      "k": "$\\sigma$",
      "mean": "mật độ điện mặt",
      "unit": "C/m$^2$",
      "note": "mặt phẳng vô hạn, bản tụ"
    },
    {
      "k": "$C$",
      "mean": "điện dung",
      "unit": "F",
      "note": "$C=Q/U$; tụ phẳng $C=\\varepsilon\\varepsilon_0 S/d$"
    },
    {
      "k": "$W$",
      "mean": "năng lượng điện trường / tụ",
      "unit": "J",
      "note": "$W=\\frac12 CU^2$"
    },
    {
      "k": "$\\omega_e$",
      "mean": "mật độ năng lượng điện",
      "unit": "J/m$^3$",
      "note": "$\\omega_e=\\vec{D}\\cdot\\vec{E}/2$"
    }
  ],
  "formulas": [
    {
      "name": "Định luật Coulomb (chân không)",
      "latex": "$$F=k\\dfrac{|q_1q_2|}{r^2},\\quad k=\\dfrac{1}{4\\pi\\varepsilon_0}\\approx9\\times10^9$$",
      "symbols": "",
      "sym": [
        {
          "k": "$F$",
          "mean": "độ lớn lực",
          "unit": "N"
        },
        {
          "k": "$q_1,q_2$",
          "mean": "điện tích điểm",
          "unit": "C"
        },
        {
          "k": "$r$",
          "mean": "khoảng cách",
          "unit": "m"
        },
        {
          "k": "$k$",
          "mean": "hằng số Coulomb",
          "unit": "N·m$^2$/C$^2$"
        }
      ],
      "when": "Hai điện tích điểm. Cùng dấu $F$ đẩy; trái dấu hút. Vectơ nằm trên đường nối."
    },
    {
      "name": "Coulomb trong điện môi đồng tính",
      "latex": "$$F=k\\dfrac{|q_1q_2|}{\\varepsilon r^2}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\varepsilon$",
          "mean": "hằng số điện môi tương đối",
          "unit": "—",
          "note": "chân không $=1$"
        }
      ],
      "when": "Môi trường đồng nhất, đẳng hướng. Độ lớn đề thi thường viết $F=k|q_1 q_2|/(\\varepsilon r^2)$."
    },
    {
      "name": "Cường độ điện trường điểm",
      "latex": "$$\\vec{E}=\\dfrac{\\vec{F}}{q_0},\\quad E=k\\dfrac{|Q|}{\\varepsilon r^2}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$q_0$",
          "mean": "điện tích thử dương",
          "unit": "C"
        },
        {
          "k": "$Q$",
          "mean": "điện tích nguồn",
          "unit": "C"
        }
      ],
      "when": "Điện tích điểm / quả cầu đồng chất bên ngoài ($r>R$). Cộng $\\vec{E}$ vectơ."
    },
    {
      "name": "Vectơ điện cảm & thông lượng",
      "latex": "$$\\vec{D}=\\varepsilon\\varepsilon_0\\vec{E},\\quad \\Phi_e=\\iint_S\\vec{D}\\cdot d\\vec{S}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\vec{D}$",
          "mean": "điện cảm",
          "unit": "C/m$^2$"
        },
        {
          "k": "$\\Phi_e$",
          "mean": "điện thông",
          "unit": "C"
        }
      ],
      "when": "Quan hệ $\\vec D=\\varepsilon\\varepsilon_0\\vec E$ áp dụng cho điện môi tuyến tính, đẳng hướng. Thông lượng có dấu theo pháp tuyến mặt."
    },
    {
      "name": "Định lý Oxtrogradxki–Gaux (O-G)",
      "latex": "$$\\oint_S\\vec D\\cdot d\\vec S=Q_{\\mathrm{tự\\ do}},\\qquad \\oint_S\\vec E\\cdot d\\vec S=\\dfrac{Q_{\\mathrm{tổng}}}{\\varepsilon_0}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$S$",
          "mean": "mặt kín",
          "unit": "—"
        },
        {
          "k": "$Q_{\\mathrm{tự\\ do}}$",
          "mean": "tổng đại số điện tích tự do trong mặt kín",
          "unit": "C"
        }
      ],
      "when": "Cả hai đều là dạng của định luật Gauss (Ostrogradsky–Gauss). Với E phải tính cả điện tích tự do và điện tích liên kết; với D chỉ tính điện tích tự do. Không phân biệt đúng/sai theo tên gọi giáo trình."
    },
    {
      "name": "Cầu dẫn / mặt cầu đều (O-G)",
      "latex": "$$r>R:\\ E=k\\dfrac{|q|}{\\varepsilon r^2};\\quad r<R:\\ E=0$$",
      "symbols": "",
      "sym": [
        {
          "k": "$R$",
          "mean": "bán kính mặt cầu",
          "unit": "m"
        },
        {
          "k": "$r$",
          "mean": "khoảng cách tới tâm",
          "unit": "m"
        }
      ],
      "when": "Điện tích phân bố đều trên mặt cầu dẫn. Điểm cách mặt $d$ thì $r=R+d$."
    },
    {
      "name": "Mặt phẳng vô hạn / hai bản trái dấu",
      "latex": "$$E_{\\mathrm{1\\ mặt}}=\\dfrac{|\\sigma|}{2\\varepsilon\\varepsilon_0},\\quad E_{\\mathrm{trong}}=\\dfrac{|\\sigma|}{\\varepsilon\\varepsilon_0},\\quad E_{\\mathrm{ngoài}}=0$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\sigma$",
          "mean": "mật độ điện mặt",
          "unit": "C/m$^2$"
        }
      ],
      "when": "Một mặt vô hạn: hệ số $2$. Hai mặt song song trái dấu (mô hình tụ): trong cộng, ngoài triệt."
    },
    {
      "name": "Điện thế & hiệu điện thế",
      "latex": "$$V=k\\dfrac{Q}{\\varepsilon r},\\quad U_{MN}=V_M-V_N,\\quad U=Ed\\ (\\text{trường đều})$$",
      "symbols": "",
      "sym": [
        {
          "k": "$V$",
          "mean": "điện thế (gốc vô hạn)",
          "unit": "V"
        },
        {
          "k": "$U$",
          "mean": "hiệu điện thế",
          "unit": "V"
        },
        {
          "k": "$d$",
          "mean": "chiếu khoảng cách lên phương $\\vec{E}$",
          "unit": "m"
        }
      ],
      "when": "Công tĩnh điện không phụ thuộc đường đi. $q<0\\Rightarrow V<0$. $E$ là độ lớn."
    },
    {
      "name": "Tụ điện",
      "latex": "$$C=\\dfrac{Q}{U}=\\dfrac{\\varepsilon\\varepsilon_0 S}{d}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$C$",
          "mean": "điện dung",
          "unit": "F"
        },
        {
          "k": "$S$",
          "mean": "diện tích bản",
          "unit": "m$^2$"
        },
        {
          "k": "$d$",
          "mean": "khoảng cách hai bản",
          "unit": "m"
        }
      ],
      "when": "Hai vật dẫn trái dấu, ngăn điện môi. Micro / phím máy tính: $d$ đổi $\\Rightarrow C$ đổi."
    },
    {
      "name": "Năng lượng điện trường",
      "latex": "$$W=\\dfrac12 CU^2,\\quad \\omega_e=\\dfrac{\\vec{D}\\cdot\\vec{E}}{2}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$W$",
          "mean": "năng lượng tụ / điện trường",
          "unit": "J"
        },
        {
          "k": "$\\omega_e$",
          "mean": "mật độ năng lượng",
          "unit": "J/m$^3$"
        }
      ],
      "when": "Nguồn cố định: $U$ giữ khi đổi $C$. Ngắt nguồn: $Q$ giữ. $W=\\int\\omega_e\\,dV$."
    }
  ],
  "traps": [
    {
      "title": "Gauss: phân biệt điện tích tự do và tổng điện tích",
      "text": " $\\oint\\vec D\\cdot d\\vec S=Q_{\\mathrm{tự\\ do}}$; $\\oint\\vec E\\cdot d\\vec S=Q_{\\mathrm{tổng}}/\\varepsilon_0$ vẫn đúng trong điện môi. Không tự thay $Q_{\\mathrm{tổng}}$ bằng $Q_{\\mathrm{tự\\ do}}$."
    },
    {
      "title": "Quên $\\varepsilon$ trong Coulomb / $E$",
      "text": " Trong điện môi: mẫu có $\\varepsilon r^2$. Không khí thường $\\varepsilon=1$ nên giống chân không."
    },
    {
      "title": "Cầu: khoảng cách tới tâm",
      "text": " “Cách mặt cầu $150$ cm” với $R=0{,}5$ m $\\Rightarrow r=2$ m, không phải $1{,}5$ m."
    },
    {
      "title": "Một mặt vs hai bản",
      "text": " Một mặt vô hạn: $E=|\\sigma|/(2\\varepsilon\\varepsilon_0)$. Tụ hai bản trái dấu: $E=|\\sigma|/(\\varepsilon\\varepsilon_0)$ ở giữa, $0$ bên ngoài."
    },
    {
      "title": "Độ lớn $E$ vs dấu $Q$",
      "text": " $E=k|Q|/(\\varepsilon r^2)$ là độ lớn (dương). Vectơ hướng ra nếu $Q>0$."
    },
    {
      "title": "Lồng Faraday",
      "text": " Khoang kín rỗng không chứa điện tích, có thành dẫn đẳng thế: E = 0 ở cân bằng tĩnh điện. Nếu có điện tích trong khoang, điện tích cảm ứng có thể xuất hiện trên mặt trong."
    },
    {
      "title": "Pin nối vs ngắt khi kéo bản tụ",
      "text": " Còn nối nguồn: $U$ cố định, $C\\propto 1/d$ $\\Rightarrow W=\\frac12 CU^2$ giảm khi $d$ tăng. Ngắt: $Q$ cố định."
    }
  ],
  "visual": {
    "html": "<p><strong>Đọc hình Coulomb.</strong> Hai điểm $q_1,q_2$: mũi tên $\\vec{F}_{12}$ và $\\vec{F}_{21}$ cùng đường nối, ngược chiều (định luật III). Độ lớn giảm $\\propto 1/r^2$.</p><p><strong>Cặp $\\vec{E}$ và $\\vec{D}$.</strong> Cùng phương, cùng chiều. Trong điện môi $D=\\varepsilon\\varepsilon_0 E$ vẫn “ôm” điện tích tự do qua O-G, trong khi $E$ bị suy giảm vì $\\varepsilon$.</p><ol><li>Mặt Gauss cầu đồng tâm: $|\\vec{D}|$ đều, $\\Phi_e=D\\cdot 4\\pi r^2=q_{\\mathrm{kín}}$.</li><li>Hai bản tụ: $\\vec{E}$ chỉ khác 0 giữa hai bản, vuông góc bản.</li><li>Lồng Faraday / màn điện: điện tích ngoài; trong lòng $E\\approx 0$ — che linh kiện, ô tô khi sét.</li></ol><p><strong>Ứng dụng DCCT.</strong> Máy lọc bụi tĩnh điện (hạt bụi nhiễm điện rồi hút vào bản); photocopy (trống tích điện + toner); lồng Faraday.</p><p>Lab: 2D Gauss/Coulomb + lồng; 3D mặt cầu dẫn rỗng.</p>"
  },
  "mcq": [
    {
      "level": "NB",
      "stem": "Công thức nào xác định <strong>độ lớn</strong> lực tương tác giữa hai điện tích điểm trong điện môi đồng tính? (sách bài tập DC1TT23)",
      "choices": {
        "A": "$F=k q_1 q_2/(\\varepsilon r^2)$ (không lấy trị tuyệt đối — có thể âm)",
        "B": "$F=k|q|/(\\varepsilon r^2)$",
        "C": "$F=k|q_1 q_2|/(\\varepsilon r)$",
        "D": "$F=k|q_1 q_2|/(\\varepsilon r^2)$"
      },
      "answer": "D",
      "whyCorrect": "Độ lớn Coulomb: $F=k|q_1 q_2|/(\\varepsilon r^2)$. Mẫu có $\\varepsilon$ và $r^2$.",
      "whyWrong": {
        "A": "Độ lớn không âm; A là dạng đại số/vectơ thô.",
        "B": "Thiếu một điện tích.",
        "C": "Mẫu phải $r^2$, không phải $r$."
      }
    },
    {
      "level": "NB",
      "stem": "Điện tích nguyên tố trong bài giảng UTT có độ lớn",
      "choices": {
        "A": "$e=1{,}6\\times 10^{-19}$ C",
        "B": "$e=1{,}6\\times 10^{-19}$ N",
        "C": "$e=9\\times 10^9$ C",
        "D": "$e=8{,}85\\times 10^{-12}$ C"
      },
      "answer": "A",
      "whyCorrect": "$e=1{,}6\\times 10^{-19}$ C. Proton $+e$, electron $-e$. Điện tích điểm là bội nguyên của $e$.",
      "whyWrong": {
        "B": "C là coulomb, không phải newton.",
        "C": "Đó là $k$.",
        "D": "Đó là $\\varepsilon_0$."
      }
    },
    {
      "level": "NB",
      "stem": "Đơn vị SI của cường độ điện trường $\\vec{E}$ là",
      "choices": {
        "A": "V/m (cũng N/C)",
        "B": "C/m$^2$",
        "C": "A/m",
        "D": "tesla"
      },
      "answer": "A",
      "whyCorrect": "$E=F/q$ cho N/C; $U=Ed$ cho V/m. Hai đơn vị trùng nhau.",
      "whyWrong": {
        "B": "Đó là $\\vec{D}$ hoặc $\\sigma$.",
        "C": "Đó là $H$.",
        "D": "Đó là $B$."
      }
    },
    {
      "level": "NB",
      "stem": "Trong điện môi tuyến tính, đẳng hướng, vectơ điện cảm liên hệ với $\\vec E$ theo",
      "choices": {
        "A": "$\\vec{D}=\\varepsilon\\varepsilon_0\\vec{E}$",
        "B": "$\\vec{D}=\\vec{E}/(\\varepsilon\\varepsilon_0)$",
        "C": "$\\vec{D}=\\varepsilon_0\\vec{E}/\\varepsilon$",
        "D": "$\\vec{D}=\\vec{E}\\times\\vec{B}$"
      },
      "answer": "A",
      "whyCorrect": "Công thức (1.9): $\\vec{D}=\\varepsilon\\varepsilon_0\\vec{E}$, đơn vị C/m$^2$, cùng phương chiều $\\vec{E}$.",
      "whyWrong": {
        "B": "Đảo.",
        "C": "Sai $\\varepsilon$.",
        "D": "Đó không phải điện cảm."
      }
    },
    {
      "level": "NB",
      "stem": "Định luật Gauss viết với vectơ điện cảm D qua mặt kín S là",
      "choices": {
        "A": "$\\oint_S\\vec D\\cdot d\\vec S=Q_{\\mathrm{tự\\ do}}$",
        "B": "$\\oint_S\\vec D\\cdot d\\vec S=Q_{\\mathrm{tổng}}/\\varepsilon_0$",
        "C": "$\\oint_S\\vec D\\cdot d\\vec S=0$ với mọi phân bố điện tích",
        "D": "$\\vec D\\cdot\\vec E=0$ mọi điểm"
      },
      "answer": "A",
      "whyCorrect": "Thông lượng D qua mặt kín bằng tổng đại số điện tích tự do bên trong. Dạng tương ứng với E là $\\oint_S\\vec E\\cdot d\\vec S=Q_{\\mathrm{tổng}}/\\varepsilon_0$, với cả điện tích tự do và liên kết.",
      "whyWrong": {
        "B": "Lẫn D với E và sai đơn vị: thông lượng D có đơn vị C.",
        "C": "Chỉ bằng 0 khi tổng điện tích tự do bên trong bằng 0.",
        "D": "Trong điện môi tuyến tính, đẳng hướng thông thường, D cùng hướng E."
      }
    },
    {
      "level": "TH",
      "stem": "Độ lớn điện trường do một mặt phẳng không dẫn, vô hạn, tích điện đều mật độ $\\sigma$ trong điện môi đồng nhất là",
      "choices": {
        "A": "$E=|\\sigma|/(\\varepsilon\\varepsilon_0)$",
        "B": "$E=|\\sigma|/(2\\varepsilon\\varepsilon_0)$",
        "C": "$E=\\sigma/(2\\varepsilon\\varepsilon_0)$ (không trị tuyệt đối — có thể âm)",
        "D": "$E=\\sigma/(\\varepsilon\\varepsilon_0)$"
      },
      "answer": "B",
      "whyCorrect": "Công thức (1.14): $E=|\\sigma|/(2\\varepsilon\\varepsilon_0)$, vuông góc mặt.",
      "whyWrong": {
        "A": "Đó là giữa hai bản trái dấu.",
        "C": "Độ lớn lấy $|\\sigma|$.",
        "D": "Thiếu $2$ và trị tuyệt đối."
      }
    },
    {
      "level": "TH",
      "stem": "Hai mặt phẳng vô hạn song song, mật độ $\\pm|\\sigma|$. Tại điểm <strong>giữa</strong> hai mặt",
      "choices": {
        "A": "$E=|\\sigma|/(\\varepsilon\\varepsilon_0)$",
        "B": "$E=0$",
        "C": "$E=|\\sigma|/(2\\varepsilon\\varepsilon_0)$",
        "D": "$E=k|q|/r^2$"
      },
      "answer": "A",
      "whyCorrect": "Hai trường cùng chiều cộng: mỗi cái $|\\sigma|/(2\\varepsilon\\varepsilon_0)$ $\\Rightarrow$ $|\\sigma|/(\\varepsilon\\varepsilon_0)$. Ngoài thì triệt.",
      "whyWrong": {
        "B": "Đó là bên ngoài hai mặt.",
        "C": "Một mặt.",
        "D": "Không phải điểm."
      }
    },
    {
      "level": "TH",
      "stem": "Vật dẫn cân bằng tĩnh điện: bên trong vật (kể cả lòng rỗng không chứa điện tích)",
      "choices": {
        "A": "$E=0$ trong phần kim loại và khoang kín không chứa điện tích; điện tích dư nằm trên mặt ngoài",
        "B": "$E=kQ/r^2$ như điểm",
        "C": "điện tích đều trong thể tích",
        "D": "$\\vec{D}=0$ nhưng $E\\neq 0$"
      },
      "answer": "A",
      "whyCorrect": "Vật dẫn liên thông cân bằng tĩnh điện là đẳng thế. Khoang kín không chứa điện tích cũng có điện thế không đổi; mặt trong không có điện tích cảm ứng trong trường hợp này.",
      "whyWrong": {
        "B": "Chỉ đúng ngoài quả cầu.",
        "C": "Điện tự do ra mặt.",
        "D": "Cân bằng tĩnh điện buộc E = 0 trong phần kim loại: nếu E khác 0 thì điện tích tự do còn dịch chuyển. Không áp dụng máy móc quan hệ điện môi tuyến tính cho kim loại."
      }
    },
    {
      "level": "TH",
      "stem": "Điện dung tụ phẳng",
      "choices": {
        "A": "$C=\\varepsilon\\varepsilon_0 S/d$",
        "B": "$C=\\varepsilon\\varepsilon_0 d/S$",
        "C": "$C=E/d$",
        "D": "$C=kS/d$"
      },
      "answer": "A",
      "whyCorrect": "$C=Q/U$ và $U=Ed$, $E=\\sigma/(\\varepsilon\\varepsilon_0)$, $\\sigma=Q/S$ $\\Rightarrow C=\\varepsilon\\varepsilon_0 S/d$.",
      "whyWrong": {
        "B": "Đảo $S$ và $d$.",
        "C": "$E/d$ không phải farad.",
        "D": "Thiếu $\\varepsilon_0$ đúng chỗ."
      }
    },
    {
      "level": "TH",
      "stem": "Lồng Faraday (màn điện) giúp",
      "choices": {
        "A": "che linh kiện khỏi điện trường tĩnh bên ngoài vì $E\\approx 0$ trong lòng dẫn rỗng",
        "B": "tăng $E$ bên trong để ion hóa không khí",
        "C": "tạo từ trường đều như ống dây",
        "D": "thay $\\varepsilon_0$ bằng $\\mu_0$"
      },
      "answer": "A",
      "whyCorrect": "Vỏ dẫn kín cân bằng tĩnh điện che điện trường tĩnh bên ngoài cho khoang không chứa điện tích. Khả năng chắn sóng hoặc xung biến thiên còn phụ thuộc vật liệu, khe hở và tần số.",
      "whyWrong": {
        "B": "Đó gần máy lọc bụi (corona ngoài), không phải lòng lồng.",
        "C": "Từ học.",
        "D": "Lẫn hằng số."
      }
    },
    {
      "level": "VD",
      "stem": "Hai điện tích $q_1=4\\times 10^{-8}$ C, $q_2=-6\\times 10^{-8}$ C cách $15$ cm trong không khí. Độ lớn lực tương tác ($k=9\\times 10^9$)",
      "choices": {
        "A": "$96\\times 10^{-5}$ N",
        "B": "$48\\times 10^{-5}$ N",
        "C": "$14{,}4\\times 10^{-5}$ N",
        "D": "$-96\\times 10^{-5}$ N"
      },
      "answer": "A",
      "whyCorrect": "$F=k|q_1 q_2|/r^2=9\\times 10^9\\cdot 24\\times 10^{-16}/0{,}0225=9{,}6\\times 10^{-4}=96\\times 10^{-5}$ N. Trái dấu nên hút, nhưng độ lớn dương.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $96\\times 10^{-5}$ N.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $96\\times 10^{-5}$ N.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $96\\times 10^{-5}$ N."
      }
    },
    {
      "level": "VD",
      "stem": "Điện tích $Q=-5\\times 10^{-9}$ C. Độ lớn $E$ trong không khí cách $Q$ một khoảng $30$ cm",
      "choices": {
        "A": "$150$ V/m",
        "B": "$500$ V/m",
        "C": "$-500$ V/m",
        "D": "$-150$ V/m"
      },
      "answer": "B",
      "whyCorrect": "$E=k|Q|/r^2=9\\times 10^9\\cdot 5\\times 10^{-9}/0{,}09=500$ V/m (độ lớn).",
      "whyWrong": {
        "A": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $500$ V/m.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $500$ V/m.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $500$ V/m."
      }
    },
    {
      "level": "VD",
      "stem": "Quả cầu cô lập có phân bố điện tích đối xứng cầu $R=0{,}5$ m, $q=-8\\times 10^{-5}$ C. Độ lớn $E$ tại điểm trong không khí cách <strong>mặt cầu</strong> $150$ cm",
      "choices": {
        "A": "$36\\times 10^4$ V/m",
        "B": "$-36\\times 10^4$ V/m",
        "C": "$18\\times 10^4$ V/m",
        "D": "$-18\\times 10^4$ V/m"
      },
      "answer": "C",
      "whyCorrect": "$r=R+1{,}5=2$ m. $E=k|q|/r^2=9\\times 10^9\\cdot 8\\times 10^{-5}/4=1{,}8\\times 10^5=18\\times 10^4$ V/m.",
      "whyWrong": {
        "A": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án C, $18\\times 10^4$ V/m.",
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án C, $18\\times 10^4$ V/m.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án C, $18\\times 10^4$ V/m."
      }
    },
    {
      "level": "VD",
      "stem": "Hai mặt phẳng song song trái dấu, $\\sigma=9\\times 10^{-8}$ C/m$^2$, $\\varepsilon=6$ giữa hai bản. $E$ giữa hai mặt ($\\varepsilon_0=8{,}85\\times 10^{-12}$)",
      "choices": {
        "A": "$1694{,}9$ V/m",
        "B": "$847{,}45$ V/m",
        "C": "$338{,}98$ V/m",
        "D": "$3{,}389\\times 10^5$ V/m"
      },
      "answer": "A",
      "whyCorrect": "$E=\\sigma/(\\varepsilon\\varepsilon_0)=9\\times10^{-8}/(6\\cdot8{,}85\\times10^{-12})=1694{,}915\\ldots$ V/m, làm tròn $1694{,}9$ V/m.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $1694{,}9$ V/m.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $1694{,}9$ V/m.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $1694{,}9$ V/m."
      }
    },
    {
      "level": "VD",
      "stem": "Tụ phẳng còn nối pin. Kéo hai bản để $d$ tăng gấp đôi. Năng lượng trữ $W=\\frac12 CU^2$",
      "choices": {
        "A": "không đổi",
        "B": "tăng gấp đôi",
        "C": "giảm $2$ lần",
        "D": "giảm $4$ lần"
      },
      "answer": "C",
      "whyCorrect": "$U$ pin giữ. $C\\propto 1/d$ giảm nửa $\\Rightarrow W$ giảm nửa.",
      "whyWrong": {
        "A": "Nhầm ngắt nguồn với $Q$ giữ rồi $W=Q^2/(2C)$ tăng.",
        "B": "Ngược.",
        "D": "$U^2$ không đổi, chỉ $C$ giảm $2$."
      }
    },
    {
      "level": "VD",
      "stem": "Hai điện tích $+q$ và $+q$ cách $2a$. Tại trung điểm, $|\\vec{E}|$ là",
      "choices": {
        "A": "$2kq/a^2$",
        "B": "$0$",
        "C": "$kq/a^2$",
        "D": "$4kq/a^2$"
      },
      "answer": "B",
      "whyCorrect": "Hai $\\vec{E}$ cùng độ lớn, ngược chiều trên đường nối $\\Rightarrow$ tổng $0$.",
      "whyWrong": {
        "A": "Cộng đại số.",
        "C": "Một phía.",
        "D": "Nhầm $r=a$ vs $2a$ rồi cộng."
      }
    },
    {
      "level": "TH",
      "stem": "Điện thế do điện tích điểm $Q$ (gốc vô hạn) là",
      "choices": {
        "A": "$V=kQ/(\\varepsilon r^2)$",
        "B": "$V=k|Q|/(\\varepsilon r)$",
        "C": "$V=kQ/(\\varepsilon r)$",
        "D": "$V=k|Q|/(\\varepsilon r^2)$"
      },
      "answer": "C",
      "whyCorrect": "$V$ vô hướng, mang dấu $Q$: $V=kQ/(\\varepsilon r)$. $Q<0\\Rightarrow V<0$.",
      "whyWrong": {
        "A": "Nhầm với $E$.",
        "B": "Trị tuyệt đối làm mất dấu thế.",
        "D": "Vừa $E$ vừa trị tuyệt đối."
      }
    },
    {
      "level": "TH",
      "stem": "Trong điện môi tuyến tính, không tổn hao, mật độ năng lượng điện trường là",
      "choices": {
        "A": "$\\omega_e=\\vec{D}\\cdot\\vec{E}/2$",
        "B": "$\\omega_e=\\vec{D}\\times\\vec{E}$",
        "C": "$\\omega_e=CU$",
        "D": "$\\omega_e=k q_1 q_2/r$"
      },
      "answer": "A",
      "whyCorrect": "$\\omega_e=\\vec{D}\\cdot\\vec{E}/2$ (J/m$^3$). $W=\\int\\omega_e\\,dV$. Tụ: $W=\\frac12 CU^2$ khớp trường đều giữa hai bản.",
      "whyWrong": {
        "B": "Tích có hướng, không phải mật độ năng lượng.",
        "C": "Thiếu $1/2$ và nhầm đơn vị.",
        "D": "Thế năng hai điểm."
      }
    },
    {
      "level": "VD",
      "stem": "Tụ phẳng $S=2$ cm$^2$, $d=1{,}5$ mm, $\\varepsilon=6$, $U=300$ V. Năng lượng trữ ($\\varepsilon_0=8{,}85\\times 10^{-12}$)",
      "choices": {
        "A": "$1{,}59\\times 10^{-7}$ J",
        "B": "$3{,}19\\times10^{-7}$ J",
        "C": "$6{,}36\\times 10^{-9}$ J",
        "D": "$3{,}18\\times 10^{-5}$ J"
      },
      "answer": "B",
      "whyCorrect": "Đổi $S=2\\times10^{-4}$ m$^2$, $d=1{,}5\\times10^{-3}$ m. $C=\\varepsilon\\varepsilon_0S/d=7{,}08\\times10^{-12}$ F. Vì $U^2=90000$ V$^2$, $W=\\tfrac12 CU^2=3{,}186\\times10^{-7}$ J $\\approx3{,}19\\times10^{-7}$ J. Chỉ nhân $1/2$ một lần.",
      "whyWrong": {
        "A": "Giá trị này nhỏ bằng một nửa kết quả đúng: đã chia 2 thêm một lần.",
        "C": "Sai phép đổi đơn vị hoặc lũy thừa; W = 3,186 × 10⁻⁷ J.",
        "D": "Sai bậc độ lớn; W ở bậc 10⁻⁷ J."
      }
    },
    {
      "level": "VDC",
      "stem": "Máy lọc bụi tĩnh điện (thảo luận DCCT) hoạt động chủ yếu vì",
      "choices": {
        "A": "hạt bụi bị ion hóa/nhiễm điện rồi chịu lực $q\\vec{E}$ hút vào bản thu",
        "B": "lực Lorentz $q\\vec{v}\\times\\vec{B}$ trong ống khói",
        "C": "cộng hưởng LC của khói",
        "D": "hiệu ứng quang điện trên bụi than"
      },
      "answer": "A",
      "whyCorrect": "Điện trường mạnh (thường corona) làm hạt nhiễm điện; lực Coulomb kéo hạt tới bản đối diện.",
      "whyWrong": {
        "B": "Từ học / TMS.",
        "C": "Module 4.",
        "D": "Module 6 — không phải nguyên lý lọc bụi chuẩn."
      }
    },
    {
      "level": "VDC",
      "stem": "Trong máy photocopy, trống cảm quang được tích điện rồi xả từng vùng theo ảnh. Bước “dính mực” dựa trên",
      "choices": {
        "A": "lực tĩnh điện giữa toner (nhiễm điện) và vùng trống còn điện tích",
        "B": "nam châm vĩnh cửu trong trống",
        "C": "sóng điện từ radio",
        "D": "công thoát $A$ của toner"
      },
      "answer": "A",
      "whyCorrect": "Toner trái dấu (hoặc cùng cơ chế Coulomb) bám vùng còn điện. Rồi chuyển sang giấy và nung.",
      "whyWrong": {
        "B": "Không phải nguyên lý electrostatic copy.",
        "C": "Không.",
        "D": "Nhầm quang điện với tĩnh điện."
      }
    },
    {
      "level": "TH",
      "stem": "Thay chân không bằng điện môi tuyến tính, đồng nhất lấp đầy không gian, $\\varepsilon>1$, giữ nguyên phân bố điện tích tự do và hình học. Khi đó",
      "choices": {
        "A": "$E$ giảm, $D$ (O-G) vẫn gắn $\\sum q_{\\mathrm{tự do}}$",
        "B": "$E$ tăng $\\varepsilon$ lần",
        "C": "$D=0$",
        "D": "Coulomb tăng $\\varepsilon$ lần"
      },
      "answer": "A",
      "whyCorrect": "$E$ bị suy vì phân cực; $F\\propto 1/\\varepsilon$. O-G cho $\\vec{D}$ với điện tích tự do.",
      "whyWrong": {
        "B": "Ngược.",
        "C": "Sai.",
        "D": "Lực giảm."
      }
    },
    {
      "level": "NB",
      "stem": "Hai điện tích cùng dấu",
      "choices": {
        "A": "hút nhau",
        "B": "đẩy nhau",
        "C": "không tương tác",
        "D": "tạo $E=0$ khắp không gian"
      },
      "answer": "B",
      "whyCorrect": "Coulomb: cùng dấu đẩy, trái dấu hút.",
      "whyWrong": {
        "A": "Khác dấu.",
        "C": "Có lực.",
        "D": "$E=0$ chỉ tại vài điểm đặc biệt."
      }
    },
    {
      "level": "VDC",
      "stem": "Phát biểu nào <strong>sai</strong>?",
      "choices": {
        "A": "Dọc đường đẳng thế, công lực tĩnh điện $A=q\\Delta V=0$",
        "B": "Toàn bộ vật dẫn cân bằng là một khối đẳng thế",
        "C": "Trong mọi điện môi, $\\oint\\vec E\\cdot d\\vec S=Q_{\\mathrm{tự\\ do}}/\\varepsilon_0$, không cần tính điện tích liên kết",
        "D": "Năng lượng tụ $W=\\frac12 CU^2$"
      },
      "answer": "C",
      "whyCorrect": "C sai vì đã dùng điện tích tự do thay cho tổng điện tích. Dạng tổng quát là $\\oint\\vec E\\cdot d\\vec S=Q_{\\mathrm{tổng}}/\\varepsilon_0$; với D là $Q_{\\mathrm{tự\\ do}}$. A, B, D đúng trong tĩnh điện với tụ tuyến tính.",
      "whyWrong": {
        "A": "Đúng — $\\vec{E}\\perp$ đẳng thế.",
        "B": "Đúng tính chất dẫn.",
        "D": "Đúng (1.26)."
      }
    }
  ],
  "essays": [
    {
      "kind": "Ứng dụng",
      "title": "Lồng Faraday / màn điện",
      "problem": "<p>Giải thích vì sao khoang kín, không chứa điện tích, bên trong vỏ kim loại cân bằng tĩnh điện được che khỏi điện trường tĩnh bên ngoài. Phân biệt với chắn sóng RF hoặc xung sét.</p>",
      "tip": "Dùng tính đẳng thế của thành khoang và tính duy nhất của nghiệm điện thế; thông lượng bằng 0 chưa đủ suy ra E = 0.",
      "steps": {
        "s1": "<p>Mô hình: vỏ dẫn kín liên thông, khoang không có điện tích, trạng thái cân bằng tĩnh điện.</p>",
        "s2": "<p>SI: $E$ (V/m), $q$ (C). Chiều: pháp tuyến ngoài mặt dẫn.</p>",
        "s3": "<p>Trong kim loại $\\vec E=0$, nên thành khoang có cùng điện thế $V_0$. Trong khoang không có điện tích, điện thế thỏa phương trình Laplace. Nghiệm $V=V_0$ thỏa điều kiện biên và là duy nhất, nên $\\vec E=-\\nabla V=0$. Chỉ từ $Q_{\\mathrm{kín}}=0$ không thể kết luận $E=0$: một điện trường đều cũng có thông lượng mặt kín bằng 0.</p>",
        "s4": "<p>Kết luận áp dụng cho khoang kín ở tĩnh điện. Chắn RF/xung sét là bài toán biến thiên theo thời gian, còn phụ thuộc độ dẫn, độ dày, khe hở và tần số; không suy ra mức bảo vệ chỉ từ Gauss.</p>"
      }
    },
    {
      "kind": "Công thức",
      "title": "Hai điện tích trong không khí",
      "problem": "<p>$q_1=4\\times 10^{-8}$ C, $q_2=-6\\times 10^{-8}$ C, $r=15$ cm. Tính độ lớn và nêu hút/đẩy. $k=9\\times 10^9$.</p>",
      "tip": "Đổi cm $\\to$ m. Độ lớn lấy $|q_1 q_2|$.",
      "steps": {
        "s1": "<p>Hai điện tích điểm, không khí $\\varepsilon=1$, trái dấu $\\Rightarrow$ hút.</p>",
        "s2": "<p>$r=0{,}15$ m. $k=9\\times 10^9$.</p>",
        "s3": "<p>$F=k|q_1 q_2|/r^2$.</p>",
        "s4": "<p>$F=9\\times 10^9\\cdot 4\\times 10^{-8}\\cdot 6\\times 10^{-8}/0{,}0225=9{,}6\\times 10^{-4}$ N, hút.</p>"
      }
    },
    {
      "kind": "O-G",
      "title": "Quả cầu dẫn và điểm ngoài",
      "problem": "<p>Một quả cầu dẫn cô lập trong không khí, cân bằng tĩnh điện và không có điện trường ngoài, có $R=0{,}5$ m, $q=-8\\times 10^{-5}$ C. Tính độ lớn $E$ tại điểm cách mặt cầu $150$ cm.</p>",
      "tip": "$r$ đo từ tâm. Ngoài cầu: như điện tích điểm tại tâm.",
      "steps": {
        "s1": "<p>Quả cầu dẫn cô lập, không có trường ngoài: điện tích phân bố đều trên mặt, hệ có đối xứng cầu. Điện trường trong phần dẫn bằng 0.</p>",
        "s2": "<p>$r=0{,}5+1{,}5=2$ m. $\\varepsilon=1$.</p>",
        "s3": "<p>O-G: $D\\cdot 4\\pi r^2=|q|$, $E=D/\\varepsilon_0=k|q|/r^2$ ($r>R$). Trong lòng $E=0$.</p>",
        "s4": "<p>$E=9\\times 10^9\\cdot 8\\times 10^{-5}/4=1{,}8\\times 10^5$ V/m, hướng vào tâm vì $q<0$.</p>"
      }
    },
    {
      "kind": "Tụ",
      "title": "Năng lượng tụ và micro/phím",
      "problem": "<p>Tụ $S=2$ cm$^2$, $d=1{,}5$ mm, $\\varepsilon=6$, $U=300$ V. Tính $C$ và $W$. Liên hệ micro: bản dao động theo âm thanh.</p>",
      "tip": "$S$ m$^2$, $d$ m. $W=\\frac12 CU^2$.",
      "steps": {
        "s1": "<p>Tụ phẳng, điện môi $\\varepsilon$, nối hiệu thế cố định.</p>",
        "s2": "<p>$S=2\\times 10^{-4}$ m$^2$, $d=1{,}5\\times 10^{-3}$ m, $\\varepsilon_0=8{,}85\\times 10^{-12}$.</p>",
        "s3": "<p>$C=\\varepsilon\\varepsilon_0S/d$, $W=\\tfrac12CU^2$. Phần tính số dùng U đã cho. Liên hệ micro tụ: nếu điện tích gần giữ trong một chu kỳ âm (mạch phân cực có trở kháng lớn), $d(t)$ làm $C(t)$ đổi và $u(t)=Q/C(t)$ đổi; đây là điều kiện mạch khác nguồn áp lý tưởng giữ U tuyệt đối.</p>",
        "s4": "<p>$C=7{,}08$ pF; $W=\\tfrac12\\times7{,}08\\times10^{-12}\\times300^2=3{,}186\\times10^{-7}$ J $\\approx3{,}19\\times10^{-7}$ J.</p>"
      }
    },
    {
      "kind": "Hai bản",
      "title": "Điện trường tụ có điện môi",
      "problem": "<p>$\\sigma=9\\times 10^{-8}$ C/m$^2$, $\\varepsilon=6$. Tính $E$ giữa hai bản trái dấu.</p>",
      "tip": "Không dùng hệ số $2$ (đó là một mặt).",
      "steps": {
        "s1": "<p>Mô hình hai mặt vô hạn $\\pm\\sigma$.</p>",
        "s2": "<p>$\\varepsilon_0=8{,}85\\times 10^{-12}$.</p>",
        "s3": "<p>$E=\\sigma/(\\varepsilon\\varepsilon_0)$; $D=\\sigma$ giữa hai bản (O-G hộp).</p>",
        "s4": "<p>$E\\approx 1{,}695\\times 10^3$ V/m.</p>"
      }
    },
    {
      "kind": "Ứng dụng",
      "title": "Máy lọc bụi tĩnh điện",
      "problem": "<p>Mô tả chuỗi: ion hóa $\\to$ hạt nhiễm $q$ $\\to$ lực $q\\vec{E}$ $\\to$ bám bản. Ước $F$ nếu $|q|=10^3 e$, $E=2\\times 10^5$ V/m.</p>",
      "tip": "$e=1{,}6\\times 10^{-19}$ C. $F=|q|E$.",
      "steps": {
        "s1": "<p>Ống khói: điện cực corona tạo ion; bụi dính điện tích; bản thu trái dấu.</p>",
        "s2": "<p>$q=10^3\\cdot 1{,}6\\times 10^{-19}=1{,}6\\times 10^{-16}$ C; $E=2\\times 10^5$ N/C.</p>",
        "s3": "<p>$\\vec{F}=q\\vec{E}$ (bỏ từ trường, $v$ nhỏ).</p>",
        "s4": "<p>$F=|q|E=3{,}2\\times10^{-11}$ N. Muốn so với trọng lực cần biết khối lượng: $F>mg$ khi $m<F/g\\approx3{,}3\\times10^{-12}$ kg (lấy $g=9{,}8$ m/s$^2$). Chưa có m thì chưa kết luận lực điện thắng trọng lực.</p>"
      }
    }
  ]
});
